// Load library
const mongoose = require('mongoose');

// What is required in the email for the template, user 
// and the content of the email
const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;