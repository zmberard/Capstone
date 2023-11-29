const mongoose = require('mongoose');

const sentmailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    cc: {
        type: String,
    },
    bcc: {
        type: String,
    },
    text: {
        type: String,
    },
    html: {
        type: String,
    },
    sentBy: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // reference user model
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Sentmail = mongoose.model('Sentmail', sentmailSchema);

module.exports = Sentmail;