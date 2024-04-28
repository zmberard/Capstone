const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

router.post('/disableApplications', async (req, res) => {
    const { ids } = req.body; // Expect an array of IDs

    if (!ids || ids.length === 0) {
        return res.status(400).json({ message: 'No application IDs provided' });
    }

    try {
        const updateResponse = await knex('applications')
            .whereIn('wid', ids)  
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

router.post('/sendEmail', async (req, res) => {
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

router.post('/saveNotes', async (req, res) => {
    const appId = req.query.appId; // Correctly access the appId from the query parameters
    const { notes } = req.body;
    const now = new Date();
    const formattedDateForDB = now.toISOString().slice(0, 19).replace('T', ' ');

    try {
        const existingNotes = await knex('applications')
            .where('wid', appId) // Correct the identifier key
            .select('notes')
            .first();

        const updatedNotes = `${formattedDateForDB}\n${notes}`;

        await knex('applications')
            .where('wid', appId) // Use `where`, not `whereIn` for a single ID
            .update({ notes: updatedNotes,
                      d_update: formattedDateForDB });
        console.log("notes saved!");
        res.status(200).json({ message: `Notes updated successfully for wid: ${appId}.` });
    } catch (err) {
        console.error('Error updating notes:', err);
        res.status(500).json({ message: `Failed to update notes for wid: ${appId}.` });
    }
});
module.exports = router;
