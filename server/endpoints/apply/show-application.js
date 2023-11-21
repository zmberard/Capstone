// load Models
const Course = require('../models/courseHistory');

async function showApplication(req, res){
    try{
        // step 1 fetch course data from db
        const courses = await Course.find({ userId: req.user.id });

        // step 2 calculate the pre-professional GPA
        const preprofessionalGPA = calculateGPA(courses);

        // step 3 populate an application object
        var form = {
            eid: req.users.eid,
            preprofessionalGPA,
            courses: coursehistory.map(coursehistory => ({
                name: coursehistory.name,
                grade: coursehistory.grade,
                hours: coursehistory.hours
            }))
        };
        // step 4 send the application object to the client
        res.json(form);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// helper function to calculate GPA
function calculateGPA(courses) {
    if (courses.length === 0) {
        return 0; // default GPA for when no courses are added
    }

    const totalPoints = courses.reduce((sum, course) => sum + (course.grade * course.hours), 0);
    const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);

    return totalPoints / totalHours;
}

module.exports = showApplication;