// may not need this, however with the implementation below
// below we can send an html file or render a view that 
// contains the login form

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login') // the login view or HTML file
});

module.exports = router;