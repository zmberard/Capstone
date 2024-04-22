const express = require('express');
const { route } = require('./applicationRoutes');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

router.get('/courses', async (req, res) => {  
    const id = req.query.id; 
    if (!id) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
        
        let courses = await knex('report')
        .select("class_subject", "class_catalog", "class_descr", "grade", "class_status")
        .where('wid', id);
        
        // Set default status based on grade
        courses = courses.map(course => ({
        ...course,
        status: course.class_status || '',
        grade: course.grade || 'N/A',
        }));
    
        const response = { 
        courses,
        };
    
        console.log(response);
        res.json(response);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Server error');
    }  
});

router.post('/submitApplication', async (req, res) => {
    const { userData, additionalInfo, courses } = req.body;
    console.log('submitting application for wid: ' + userData.wid);  
    const now = new Date();  
    const formattedDateForDB = now.toISOString().slice(0, 19).replace('T', ' ');
    let message = 'Ope, nothing happened...';

    try {
        const existingApplication = await knex('applications')
            .where({
                wid: userData.wid,
                semester: 'Spring' //TODO: Change semester value here 
            })
            .first(); //first matching or null

       
        if (!existingApplication) { 
            await knex('applications').insert({
                wid: userData.wid,
                advisor: userData.advisor,
                semester: 'Spring',
                status: "Pending",
                notes: additionalInfo,
                waiver: false,
                d_update: formattedDateForDB
            });
            message = `Application Submitted ${now.toDateString()} ${now.toTimeString()}`;
        } else { 
            console.log('An application for this wid:', userData.wid, 'has already been submitted. Only updating notes and courses.'); 
            await knex('applications')
                .where({ wid: userData.wid, semester: 'Spring' })
                .update({
                    notes: additionalInfo, 
                });
            message = `An application exists for wid: ${userData.wid}. Updated course statuses and grades! ${now.toDateString()} ${now.toTimeString()}`
        }

        // Update courses in the report table
        await Promise.all(Object.entries(courses).map(([key, {status, grade}]) => {
            const [class_subject, class_catalog] = key.split('-');   
            return knex('report')
                .where({ wid: userData.wid, class_subject, class_catalog })
                .update({ class_status: status, grade, update_time: formattedDateForDB });
        }));
 
        res.status(200).json({ message: message });
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).send('Server error');
    }
});
 
module.exports = router;
