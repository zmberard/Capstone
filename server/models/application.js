const mongoose = require('mongoose')

// Schema for the course's information
const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    grade:{
        type: Number,
        required: true,
    },
    hours:{
        type: Number,
        required: true,
    },
    semester:{
        type: Number,
        required: true,
    },
    completed:{
        type: Boolean,
        required: true,
    },
});

// Schema for the application information
const applicationSchema = new mongoose.Schema({
    eid:{
        type: String,
        required: true,
    },
    preprofessionalGPA:{
        type: Number,
        required: true,
    },
    courses:{
        type: [courseSchema],
        required: true,
    },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;