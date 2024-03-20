const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

router.get('/courses', async (req, res) => { 
    console.log('Courses endpoint hit');
    const id = req.query.id; 
    if (!id) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
        
        let courses = await knex('report')
        .select("class_subject", "class_catalog", "class_descr", "grade")
        .where('wid', id);
        
        // Set default status based on grade
        courses = courses.map(course => ({
        ...course,
        status: (course.grade && course.grade !== 'N/A') ? 'Complete' : 'In-Progress',   // might need status column in db table 
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

module.exports = router;