// https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342
const winston = require('winston')

// Defining the severity of levels.
// Can create log files with them,
// see or hide levels based on he running ENV
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    socket: 4,
    presence: 5,
    debug: 6,
}

// Sets the current severity based on the current
// NODE_ENV: show all the log levels if the server
// was run in development mode; otherwise, if it
// was run in production, show only warn and error 
// messages.
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    if(env = 'test') return 'error'
    return env === 'development' ? 'debug' : 'http'
}

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  }
  
  // Tell winston that you want to link the colors
  // defined above to the severity levels
  winston.addColors(colors)
  
  // Chose the aspect of the log customizing the log format.
  const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  )

  // Define which transports the logger must use to print out messages. 
  const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    //new winston.transports.File({
    //  filename: 'logs/error.log',
    //  level: 'error',
    //}),
    //new winston.transports.File({ filename: 'logs/all.log' }),
  ]
  
  // Create the logger instance that has to be exported 
  // and used to log messages.
  const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
  })

module.exports = logger