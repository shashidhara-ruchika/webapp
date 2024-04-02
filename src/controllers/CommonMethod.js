import { logger } from "../services/LoggerService.js";

export const handleMethodNotAllowed = async (req, res) => {
  logger.warn(`[Method Not Allowed] ${req.method} ${req.originalUrl}`);
  res.status(405).end();
  return res;
};
