// Load Libraries
const express = require("express")
const router = express.Router();

// Load Middleware
var token = require('../middleware/token')
const requestLogger = require('../middleware/request-logger')

// Load Routers
const applyRouter = require('../endpoints/apply')
const emailRouter = require('../endpoints/email')
const profileRouter = require('../endpoints/profile')
const loginRouter = require('../endpoints/login')
const disableRouter = require('../endpoints/disabled')

// Load Token
route.use(token)

// Configure Logging (after token)
router.use(requestLogger)

router.use('/apply', applyRouter)
router.use('/email', emailRouter)
router.use('/profile', profileRouter)
router.use('/login', loginRouter)
router.use('/disabled', disableRouter)

// GET API Version and User Details
// May need to be changed to fit our project, taken from Russ' officehours-node in routes/api.js
router.get('/', function (req, res, next){
    res.json({
        version: 1.0,
        user_id: req.user_id,
        is_admin: req.is_admin ? 1 : 0,
    })
})

module.exports = router