const winston  = require('winston');

const loggingConfiguration = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/example.log',
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${info.timestamp} : ${info.message}`)
    )
};

module.exports = winston.createLogger(loggingConfiguration);
