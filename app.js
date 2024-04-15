import express from "express";
import {
  syncPostgresDBConnection,
  testPostgresDBConnection,
} from "./src/databases/PostgresDBConnection.js";
import { healthcheckRouter } from "./src/routes/HealthcheckRoute.js";
import { userRouter } from "./src/routes/UserRoute.js";
import { logger } from "./src/services/LoggerService.js";

export const app = express();
app.use(express.json());

testPostgresDBConnection()
  .then(() => {
    syncPostgresDBConnection();
  })
  .catch((error) => {
    logger.error("Error occured: " + error);
  });

app.use("/healthz", healthcheckRouter);
app.use("/v3/user", userRouter);

const PORT = process.env.port || 8080;
export const server = app.listen(PORT, () => {
  logger.info(`Server stared on port: ${PORT}`);
});

export const closeServer = (appServer) => {
  logger.warn("Closing server gracefully...");
  appServer.close(() => {
    logger.info("Server closed.");
  });
};
