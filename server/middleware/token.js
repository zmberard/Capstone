// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// https://github.com/russfeld/officehours-node/blob/main/middlewares/token.js

const jwt = require('jsonwebtoken')

// Load logger
const logger = require('../configs/logger')

async function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.send.TOKEN_SECRET, async (err, user) =>  {

        if (err){
            if (err.name === 'TokenExpiredError'){
                return res.sendStatus(401)
            } else {
                logger.warn('API Token Parse Error - ' + err)
                return res.sendStatus(403)
            }
        }

        req.user = user
        // req.user_id = user.user_id
        // req.user_eid = user.eid
        // req.is_admin = user.is_admin
    })
}

module.exports = authenticateToken