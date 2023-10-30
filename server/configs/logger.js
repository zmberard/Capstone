const winston = require('winston')

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    socket: 4,
    presence: 5,
    debug: 6,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    if(env = 'test') return 'error'
    return env === 'development' ? 'debug' : 'http'
}




module.exports = logger