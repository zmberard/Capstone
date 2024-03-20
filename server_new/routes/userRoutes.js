const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

//TODO: The end point should be changed to something like 'login' then use userContext to populate profile and application page
router.get('/getUserDetail', async (req, res) => {
    console.log('Profile endpoint hit');
    console.log('QUERY ID: ' + req.query.id);
    const id = req.query.id; 
    if (!id) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
        const data = await knex('users').select('wid', 'first_name', 'last_name', 'email', 'advisor').where('wid', id);
        const query = knex('users').select('wid', 'first_name', 'last_name', 'email', 'advisor').where('wid', id).toString();
        console.log(query);  
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
    }
});

//This endpoint can be removed, it was used for profileForm 
router.get('/profile', async (req, res) => {
    console.log('Profile endpoint hit');
    console.log('QUERY ID: ' + req.query.id);
    const id = req.query.id; 
    if (!id) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
      const data = await knex('users').select('wid', 'first_name', 'last_name', 'email').where('wid', id);
      const query = knex('users').select('wid', 'first_name', 'last_name', 'email').where('wid', id).toString();
      console.log(query);  
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    }
});

module.exports = router;