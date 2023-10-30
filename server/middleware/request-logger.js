// https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342
const morgan = require('morgan')
const logger = require('../configs/logger')

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) =>
      logger.http(message.substring(0, message.lastIndexOf('\n'))),
}

