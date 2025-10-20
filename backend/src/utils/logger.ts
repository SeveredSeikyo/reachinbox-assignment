const winston = require("winston");
const { combine, timestamp, json, errors } = winston.format;


// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }



const imapLogger = winston.createLogger({
    level: "info",
    // format: winston.format.json(),
    format: combine(timestamp(), errors({ stack: true }), json()),
    // transports: [ new winston.transports.Console() ]
    transports: [ new winston.transports.File({filename: "standard.log"})],
    defaultMeta: { service: "imap-service "},
    exceptionHandlers: [
        new winston.transports.File({filename: "exceptions.log"})
    ],
    rejectionHandlers: [
        new winston.transports.File({filename: "rejections.log"})
    ],
    exitOnError: false, 
    silent: false
});

const esLogger = winston.createLogger({
    level: "info",
    // format: winston.format.json(),
    format: combine(timestamp(), errors({ stack: true }), json()),
    // transports: [ new winston.transports.Console() ]
    transports: [ new winston.transports.File({filename: "standard.log"})],
    defaultMeta: { service: "es-service "},
    exceptionHandlers: [
        new winston.transports.File({filename: "exceptions.log"})
    ],
    rejectionHandlers: [
        new winston.transports.File({filename: "rejections.log"})
    ],
    exitOnError: false, 
    silent: false
});

const aiLogger = winston.createLogger({
    level: "info",
    // format: winston.format.json(),
    format: combine(timestamp(), errors({ stack: true }), json()),
    // transports: [ new winston.transports.Console() ]
    transports: [ new winston.transports.File({filename: "standard.log"})],
    defaultMeta: { service: "ai-service "},
    exceptionHandlers: [
        new winston.transports.File({filename: "exceptions.log"})
    ],
    rejectionHandlers: [
        new winston.transports.File({filename: "rejections.log"})
    ],
    exitOnError: false, 
    silent: false
});

module.exports = {imapLogger, esLogger, aiLogger};