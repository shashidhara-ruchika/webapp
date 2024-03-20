import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const wrapMessageWithColor = (message, level) => {
  let colorizeMessage;
  switch (level) {
    case "emergency":
    case "alert":
    case "critical":
      colorizeMessage = `\x1b[91m${message}\x1b[0m`; // bright red color
      break;
    case "error":
      colorizeMessage = `\x1b[31m${message}\x1b[0m`; // red color
      break;
    case "warn":
      colorizeMessage = `\x1b[33m${message}\x1b[0m`; // yellow color
      break;
    case "notice":
    case "info":
      colorizeMessage = `\x1b[32m${message}\x1b[0m`; // green color
      break;
    case "debug":
      colorizeMessage = `\x1b[36m${message}\x1b[0m`; // cyan color
      break;
    default:
      colorizeMessage = message;
  }
  return colorizeMessage;
};

const consoleFormat = format.printf(({ level, message, timestamp }) => {
  const coloredMessage = wrapMessageWithColor(
    `[${timestamp}] [${level.toUpperCase()}] webapp - ${message}`,
    level
  );
  return coloredMessage;
});

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: process.env.LOGGER_FILE_PATH,
      level: process.env.LOGGER_LEVEL,
    }),
    new transports.Console({
      format: consoleFormat,
      level: process.env.LOGGER_LEVEL,
    }),
  ],
});
