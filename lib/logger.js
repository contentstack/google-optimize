const winston = require("winston");
const fs = require("fs");
const DailyRotateFile = require("winston-daily-rotate-file");

!fs.existsSync(config.log.path.split("/")[0]) && fs.mkdirSync(config.log.path.split("/")[0]);

const logTransport = {
	transports: [
		new DailyRotateFile({
			level: "debug",
			filename: config.log.path,
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
			maxSize: "20m",
			maxFiles: "14d",

		}),
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.simple()
			),
		}),
	],
	exitOnError: false,
};

const debugLogger = winston.createLogger(logTransport);
debugLogger.emitErrs = false;

const stream = {
	write: function(message) {
		debugLogger.info(message);
	},
};

module.exports = debugLogger;
module.exports.stream = stream;
