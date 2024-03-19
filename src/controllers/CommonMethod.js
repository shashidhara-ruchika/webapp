import { logger } from "../services/LoggerService.js";

export const handleMethodNotAllowed = async (req, res) => {
  logger.error(`Method Not Allowed: ${req.method}`);
  res.status(405).end();
  return res;
};
