const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../configs/config').knexConfig.development);

router.get('/applications', async (req, res) => {
    try {
        const applications = await knex('applications')
          .join('users', 'applications.wid', '=', 'users.wid')
          .select(
            'applications.record_id',
            'applications.wid',
            'users.advisor',
            'applications.semester',
            'applications.status',
            'applications.notes',
            'applications.waiver',
            'applications.d_update',
            'users.first_name',
            'users.last_name',
            'users.email',
            'users.eid', 
          );
        console.log(applications);
        res.json(applications);
      } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
