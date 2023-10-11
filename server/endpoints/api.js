// Load Libraries
const express = require('express')
const router = express.Router();

// Load Middleware
// var token = require('../../..')
// const requestLogger = require('../../..')

// Load Routers
const applyRouter = require('./apply')
const emailRouter = require('./api/email')
const profileRouter = require('./api/profile')
const loginRouter = require('./api/login')

// Load Token or Cookie Middleware
// route.use(token or cookie)

// Configure Logging (after token)
// router.use(requestLogger)

router.use('/apply', applyRouter)
router.use('/email', emailRouter)
router.use('/profile', profileRouter)
router.use('/login', loginRouter)

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

// keeping for reference of the routers we need
/*
<Router>
            <Route> exact path = "/" component = { RootIndex } </Route>
            <Route> exact path = "/apply" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-applications.json" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application/:eid" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application-DARSUpdatedAt/:eid" component = { ApplyController } </Route>

            <Route> exact path = "/send-email" component = { ApplyController } </Route>

            <Route> exact path = "/profile", component = { ProfilesController } </Route>
            <Route> exact path = "/profile/update" component = { ProfilesController } </Route>
            
            <Route> exact path = "/isdisabled.json" component = { ApplyController} </Route>
            <Route> exact path = "/disable" component = { ApplyController } </Route>

            <Route> exact path = "/auth/login" component = { AuthController } </Route>
            <Route> exact path = "/auth/logout" component = { AuthController } </Route>
            <Route> exact path = "/auth/caslogout" component = { AuthController } </Route>
            <Route> exact path = "/auth/force" component = { AuthController } </Route>

            <Route> exact path = "/email-templates.json" component = { ApplyController } </Route>
            <Route> exact path = "/email-templates:id" component = { ApplyController } </Route>
            <Route> exact path = "/email-templates" component = { ApplyController } </Route>

            <Route> exact path = "/sentmails:eid" component = { ApplyController } </Route>
</Router> */