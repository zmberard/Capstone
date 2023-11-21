// DOUBLE CHECK THE SECRET KEY

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = retuire('jsonwebtoken')
const User = require('../models/user');

router.post('/login', async (req, res) => {
    try{
        const { eid, password } = req.body;
        
        // Validate the both eid and password are provided
        if(!eid || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find the user by eid in the database
        const user = await User.findOne({ eid });

        // Check if the user exists
        if(!user) {
            return res.status(400).json({ message: 'Invalide eid or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!passwordMatch){
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If everything is valid, create a JWT token for authentication
        const token = jwt.sign({ userId: user_id }, 'SECRET_KEY', { expiresIn: '1h' }); // need to double check the secret key

        // Send the token to the student
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Inernal Server Error' });
    }
});

module.exports = router;