import { errorLogger } from "../services/LoggerService.js";

export const handleMethodNotAllowed = async (req, res) => {
  errorLogger.error(`Method Not Allowed: ${req.method}`);
  res.status(405).end();
  return res;
};
