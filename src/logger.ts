import winston from "winston";
import path from "path";

const logDir = "logs"; // directory where logs will be stored

const logger = winston.createLogger({
  level: "info", // log level (error, warn, info, http, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    // Save all logs
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
    }),

    // Save only errors
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),

    // Show logs in console (during development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
