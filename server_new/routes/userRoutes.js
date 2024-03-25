const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

//TODO: The end point should be changed to something like 'login' then use userContext to populate profile and application page
router.get('/getUserDetail', async (req, res) => {
    console.log('Getting User Details for EID: ' + req.query.id);
    const eid = req.query.id; 
    if (!eid) {
        console.log('No EID provided!');
        return res.status(400).send('EID is required');
    }
    try {
        const data = await knex('users')
                            .select('wid', 'first_name', 'last_name', 'email', 'advisor')
                            .whereRaw('lower(eid) = ?', [eid.toLowerCase()]);
        const query = knex('users')
                            .select('wid', 'first_name', 'last_name', 'email', 'advisor')
                            .whereRaw('lower(eid) = ?', [eid.toLowerCase()])
                            .toString();
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
    console.log('Getting User Details for EID: ' + req.query.id);
    const eid = req.query.id; 
    if (!eid) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
      const data = await knex('users')
                        .select('wid', 'first_name', 'last_name', 'email')
                        .whereRaw('lower(eid) = ?', [eid.toLowerCase()]);
      const query = knex('users').select('wid', 'first_name', 'last_name', 'email').whereRaw('lower(eid) = ?', [eid.toLowerCase()]).toString();
      console.log(query);  
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    }
});

module.exports = router;
