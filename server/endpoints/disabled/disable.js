const config = require('../configs/default');
const express = require('express');
const router = express.Router();

router.post('/disable', (req, res) => {
    const disabled = req.body.disable;

    if (disabled === 0 || disabled === 1){
        config.database.enabled = disabled === 1;

        return res.json({
            disabeld: config.databse.enabled,
            message: 'Feature is ${config.database.enabled ? "disabled" : "enabled"}',
        });
    } else {
        return res.status(400).json("unrecognized Value!");
    }
});

module.exports = router;