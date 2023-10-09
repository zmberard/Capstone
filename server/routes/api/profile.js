// Load Libraries
const express = require('express')
const router = express.Router()

// Load Models
//const User = require('../...')

router.get('/', async function (req, res, next){
    let user = await UserActivation.query().findById(req.user_id)
    res.json(user)
})

router.post('/', async function (req, res, next){
    try {
        await UserActivation.query().findById(req.user_is).patch({
            name: req.body.user.name, 
            contact_info: req.body.user.contact_info,
        })
        res.status(200)
        res.json({ message: 'profile saved' })
    } catch(error){
        res.status(422)
        res.json(error)
    }
})

module.exports = router