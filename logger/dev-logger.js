const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize, errors } = format;
//s@ts-check

function devLogger() {
  const logFormat = printf(({ level, message, label, timestamp, stack }) => {
    return `${timestamp} [${label}] ${level}: ${stack || message}`;
  });
  return createLogger({
    format: combine(
      colorize(),
      label({ label: "ls!" }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),

    transports: [new transports.Console()],
  });
}

module.exports = devLogger;
