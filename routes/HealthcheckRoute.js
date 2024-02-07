import express from "express";
import { performPostgresDBHealthcheck } from "../controllers/HealthcheckController.js";
import { setHealthcheckHeaders } from "../middlewares/HealthcheckMiddleware.js";
import {
  validateNoBody,
  validateNoQueryParams,
} from "../middlewares/CommonMiddleware.js";
import { handleMethodNotAllowed } from "../controllers/CommonMethod.js";

export const healthcheckRouter = express.Router();

healthcheckRouter.head("/", setHealthcheckHeaders, handleMethodNotAllowed);

healthcheckRouter.get(
  "/",
  setHealthcheckHeaders,
  validateNoQueryParams,
  validateNoBody,
  performPostgresDBHealthcheck
);

healthcheckRouter.post("/", setHealthcheckHeaders, handleMethodNotAllowed);
healthcheckRouter.put("/", setHealthcheckHeaders, handleMethodNotAllowed);
healthcheckRouter.delete("/", setHealthcheckHeaders, handleMethodNotAllowed);
healthcheckRouter.patch("/", setHealthcheckHeaders, handleMethodNotAllowed);
healthcheckRouter.options("/", setHealthcheckHeaders, handleMethodNotAllowed);
