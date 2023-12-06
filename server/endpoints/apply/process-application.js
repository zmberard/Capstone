// This route should process any additional information
// the student may add to their application aswell as 
// sending the new information to the database.

const express = require('express');
const router = express.Router();

// Load model
const Application = require('../models/application');

// Route to process a new application
router.post('/process', async (req, res) => {
    try{
        // Assuming the request body contains the application data
        const {eid, preprofessionalGPA, courses } = req.body;

        // Validate the incoming data
        if(!eid || ! preprofessionalGPA || !courses){ //  || !Array.isArray(courses)
            return res.status(400).json({ message: 'Invalid data format' });
        }
        // Validate eid is a string
        if(typeof eid !== 'string' || eid.trim() === ''){
            return res.status(400).json({ message: 'eid must be a non-empty string' });
        }
        // Validate gpa is a number
        if(typeof preprofessionalGPA !== 'number' || preprofessionalGPA < 0 || preprofessionalGPA > 4){
            return res.status(400).json({ message: 'Pre-Professional GPA must be a number between 0 and 4' });
        }
        // validate courses are present and are objects
        for(const course of courses) {
            if (!course || typeof course !== 'object'){
                return res.status(400).json({ message: 'Invalid course format '});
            }
            // All constants of the courses
            const { name, grade, hours, semester, completed } = course;
            // Validate the name is a string
            if (typeof name !== 'string' || name.trim() === ''){
                return res.status(400).json({ message: 'Course name must be a non-empty string' });
            }
            // Validate the grade is a number
            if(typeof grade !== 'number' || grade < 1 || grade > 4){
                return res.status(400).json({ message: 'Course grade must be a number between 1 and 4' });
            }
            // Validate the hours of the course are a number
            if(typeof hours !== 'number' || hours < 0 ){
                return res.status(400).json({ message: 'Course hours must be a 0 or more' });
            }
            // Validate the semester they took the course is a number - subject to change to string for readability
            if(typeof semester !== 'number' || semester <= 0 ){
                return res.status(400).json({ message: 'Course semester must be a positive number' });
            }
            // Validate that the completed section is selected to true or false / completed or not completed
            if(typeof completed !== 'boolean'){
                return res.status(400).json({ message: 'Complete must be true or false' });
            }
        }

        // Create a new Application instance
        const application = new Application({
            eid,
            preprofessionalGPA,
            courses
        });

        // Sate the application to the database
        const savedApplication = await application.save();

        res.status(201).json(savedApplication);
    }
    // Error message 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;