import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const wrapMessageWithColor = (message, level) => {
  let colorizeMessage;
  switch (level) {
    case "error":
      colorizeMessage = `\x1b[31m${message}\x1b[0m`; // red color
      break;
    case "info":
      colorizeMessage = `\x1b[32m${message}\x1b[0m`; // green color
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
    new transports.File({ filename: process.env.LOGGER_FILE_PATH }),
    new transports.Console({ format: consoleFormat }),
  ],
});
