let logger = require("winston");

const { format } = logger;
const MESSAGE = Symbol.for("message");
const jsonFormatter = (logEntry) => {
  if (true) {
    console.log(logEntry);
    if (logEntry.message[0] === "#AD") {
      logEntry[MESSAGE] = JSON.stringify({
        timestamp: new Date(),
        message: logEntry.message[3],
        action: logEntry.message[2],
        source: logEntry.message[1],
        level: logEntry.level,
      });
      return logEntry;
    }
  } else {
    return logEntry;
  }
};
//TODO modularize logger into a config file
let transport = new logger.transports.Console({
  level: process.env.LOG_LEVEL || "info",
  format: logger.format(jsonFormatter)(),
});

logger.configure({
  transports: [transport],
  format: format.combine(format.timestamp(), format.simple()),
});
logger.warning = logger.warn;
module.exports.logger = logger;

// format: combine(
//   label({ label: "ls!" }),
//   timestamp(),
//   errors({ stack: true }),
//   json()
// ),
