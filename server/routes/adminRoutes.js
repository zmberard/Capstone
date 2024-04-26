const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

router.post('/disable-applications', async (req, res) => {
    const { ids } = req.body; // Expect an array of IDs

    if (!ids || ids.length === 0) {
        return res.status(400).json({ message: 'No application IDs provided' });
    }

    try {
        const updateResponse = await knex('applications')
            .whereIn('wid', ids) // Assuming the column is named 'id'
            .update({ status: 'denied' });

        if (updateResponse) {
            res.json({ message: 'Applications disabled successfully', disabledIds: ids });
        } else {
            res.status(400).json({ message: 'No applications were disabled' });
        }
    } catch (err) {
        console.error('Error disabling applications:', err);
        res.status(500).send('Server error');
    }
});

router.post('/send-email', async (req, res) => {
    const { ids } = req.body; // Expect an array of IDs
    if (!ids || ids.length === 0) {
        return res.status(400).json({ message: 'No application IDs provided' });
    }

    try {
        const users = await knex('users')
            .join('applications', 'users.wid', '=', 'applications.wid')
            .whereIn('applications.wid', ids)
            .select('users.email'); 

        const emails = users.map(u => u.email);
 
        // Placeholder for email sending logic
        emails.forEach(email => {
            // sendEmailFunction(subject, email, body);
            console.log("Email: " + email);
        });

        res.json({ message: 'Emails sent successfully' });
    } catch (err) {
        console.error('Error sending emails:', err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
