import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: process.env.JEST_WORKER_ID ? "stdout" : "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

export const infoLogger = log4js.getLogger();
infoLogger.level = "info";

export const errorLogger = log4js.getLogger();
errorLogger.level = "error";

export const debugLogger = log4js.getLogger();
debugLogger.level = "debug";
