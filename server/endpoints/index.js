/*
const express = require('express')
const router = express.Router()

// Load Configs
const requestLogger = require('../middleware/request-logger')

// Load Models
// const User = require('../models/user')

// Configure Logging
router.use(requestLogger)

// Get home page
router.get('/', async function(req, res, next){
    let data = {}
    if (req.session.user_id) {
        const user = await User.query().findById(req.session.user_id)

    if (!user) {
        req.session.destroy()
    } else {
      // check if advisor
        const roles = await user.relatedQuery('roles')
            .for(req.session.user_id)
            .select('name')

        data = {
            id: req.session.user_id,
            eid: user.eid,
            name: user.name,
            admin: roles.some((r) => r.name === 'advisor'),
        }
      }
    }
  res.render('index', { data: data })
} )

module.exports = router
*/