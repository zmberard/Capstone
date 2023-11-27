const express = require('express');
const router = express.Router();
const config = require('../configs/default')

router.get('/database-status', (req, res) => {
    const dbEnabled = config.dbEnabled;
    
    res.json({
        dbEnabled: dbEnabled,
        message: dbEnabled ? 'Database is enabled' : 'Database is disabled',
    });
});

module.exports = router;