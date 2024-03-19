import { logger } from "../services/LoggerService.js";

export const validateNoBody = async (req, res, next) => {
  if (
    (req.body && Object.keys(req.body).length > 0) ||
    req.get("Content-Type")
  ) {
    logger.error("Bad Request: No body should be present");
    res.status(400).end();
    return res;
  }
  next();
};

export const validateNoQueryParams = async (req, res, next) => {
  if (
    (req.query && Object.keys(req.query).length > 0) ||
    req.url.includes("?")
  ) {
    logger.error("Bad Request: No query params should be present");
    res.status(400).end();
    return res;
  }
  next();
};
