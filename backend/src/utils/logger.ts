const winston = require("winston");
const { combine, timestamp, json, errors } = winston.format;
const path = require("path");

// ensure logs folder exists
const logsDir = path.resolve(__dirname, "../logs"); // adjust if needed
const fs = require("fs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

function createServiceLogger(serviceName: string) {
    return winston.createLogger({
        level: "info",
        format: combine(timestamp(), errors({ stack: true }), json()),
        transports: [
            new winston.transports.File({ filename: path.join(logsDir, `${serviceName}-standard.log`) }),
            new winston.transports.Console() // optional, good for dev
        ],
        defaultMeta: { service: serviceName },
        exceptionHandlers: [
            new winston.transports.File({ filename: path.join(logsDir, `${serviceName}-exceptions.log`) })
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: path.join(logsDir, `${serviceName}-rejections.log`) })
        ],
        exitOnError: false,
        silent: false
    });
}

const imapLogger = createServiceLogger("imap-service");
const esLogger = createServiceLogger("es-service");
const aiLogger = createServiceLogger("ai-service");

module.exports = { imapLogger, esLogger, aiLogger };
