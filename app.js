import express from "express";
import {
  syncPostgresDBConnection,
  testPostgresDBConnection,
} from "./src/databases/PostgresDBConnection.js";
import { healthcheckRouter } from "./src/routes/HealthcheckRoute.js";
import { errorLogger, infoLogger } from "./src/services/LoggerService.js";
import { userRouter } from "./src/routes/UserRoute.js";

export const app = express();
app.use(express.json());

testPostgresDBConnection()
  .then(() => {
    syncPostgresDBConnection();
  })
  .catch((error) => {
    errorLogger.error("Error occured: ", error);
  });

app.use("/healthz", healthcheckRouter);
app.use("/v1/user", userRouter);

const PORT = process.env.port || 8080;
export const server = app.listen(PORT, () =>
  infoLogger.info(`Server stared on port: ${PORT}`)
);


export const closeServer = (appServer) => {
  infoLogger.info("Closing server gracefully...");
  appServer.close(() => {
    infoLogger.info("Server closed.");
  });
};
