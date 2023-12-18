const winston = require('winston');

const levels = {
    error: 0,
    warning: 1,
    info: 2,
}

const logger = winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.printf(({ message, level }) => {
            let res = '[' + level.toLowerCase() + '] - ' + new Date().toISOString() + ' : ' + message
            console.log(res);
            return res;
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'warning.log', level: 'warning' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' })
    ]
});

module.exports = logger;