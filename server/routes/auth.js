// Load libraries
const express = require('express');
const cas = require('../configs/cas');
const router = express.Router();
// const jwt or cookie = require('jsonwebtoken') or the cookie one

// Load Configurations
// const token = require('../.../...')
// const requestLogger = require('../.../...')

// Load Models
// const User = require('../../..')

// Configure Logging
// router.use(requestLogger)

// Handle Logins
router.get('/login', async function (req, res, next){
    if (!req.session.user_id){
        let eid = ''
        /*
        if(req.query.eid && process.env.FORCE_AUTH === 'true'){
            // force authentication enabled, use eID from query
            eid = req.query.eid
        } else {
            // put below just if and else statements in here
        }
        */
        if(req.session[cas.session_name] === undefined){
            // CAS is not authenticated, so redirect

            req.url = req.originalUrl
            cas.bounce_redirect(req, res, next)
            return
        } else {
            // CAS is authenticated, get eID from session
            eid = req.session[cas.session_name]
        }
        if(eid && eid.length != 0){
            // Find or Create User for eID
            let user = await User.findOrCreate(eid)
            // Store User ID in session
            req.session.user_id = user.user_id
            req.session.user_eid = eid
        }
    }
    // Redirect to Homepage
    res.redirect('/')
})

router.get('/logout', async function(req, res, next){
    // not sure if needed depending on if we use cookies or tokens
    //if(req.session.user_id){
    //    await User.clearRefreshToken(req.session.user_id)
    //}
    if(req.session[cas.session_name]){
        cas.logout(req,res,next)
    } else{
        req.session.destroy()
        res.redirect('/')
    }
})

module.exports = router