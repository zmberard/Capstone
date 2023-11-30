const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Load models
const User = require('./models/user');
const Sentmail = require('./models/sentmain');

// Load middleware
const { auth, admin } = require('./middleware');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(auth);
app.use(admin);

// Function to send the emails
async function sendEmail(subject, to, cc, bcc, text, html, sentBy){
    try{
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: '${user.eid}@ksu.edu', // subject to change
                pass: 'password',
            },
        });
        const mailOptions = {
            from: '${user.eid}@ksu.edu', // subject to change, possibly to advisors email
            to, 
            cc,
            bcc,
            subject,
            text,
            html,
        };

        await transporter.sendMail(mailOptions);

        const sentmail = new Sentmail({
            subject,
            to,
            cc,
            bcc,
            html,
            sentBy,
        });

        // Fetch the user based on the email address
        const userApp = await User.findOrCreate({ email: to });

        if(userApp){
            sentmail.user = userApp._id;
        }

        await sentmail.save();

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Post route to send an email
app.post('/send-email', async (req, res) => {
    try{
        const user = req.user;

        if(user && user.admin) {
            const {
                subject,
                to,
                cc = '',
                bcc = '',
                text,
                html,
            } = req.body;
            // Send the email
            await sendEmail(subject, to, cc, bcc, text, html, user.eid);

            return res.status(200).json({ message: 'Email sent successfull'});
        } else {
            return res.status(403).json({ error: 'Not authorized to send emails' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});