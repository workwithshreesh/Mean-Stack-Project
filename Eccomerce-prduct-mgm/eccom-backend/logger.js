const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) =>
      `${timestamp} ${level.toUpperCase()} ${message}`
    )
  ),
  transports: [
    new winston.transports.File({ filename: "soc.log" }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
