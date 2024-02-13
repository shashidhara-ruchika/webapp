import express from "express";
import {
  syncPostgresDBConnection,
  testPostgresDBConnection,
} from "./databases/PostgresDBConnection.js";
import { healthcheckRouter } from "./routes/HealthcheckRoute.js";
import { errorLogger, infoLogger } from "./services/LoggerService.js";
import { userRouter } from "./routes/UserRoute.js";

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
    // process.exit(0); // Exiting the process
  });
};

// export const closeServer = (appServer) => {
//   return new Promise((resolve, reject) => {
//     if (!appServer) {
//       reject(new Error('No server provided to close'));
//     }
//     infoLogger.info("Closing server gracefully...");
//     appServer.close((error) => {
//       if (error) {
//         reject(error);
//       } else {
//         infoLogger.info("Server closed.");
//         resolve();
//       }
//     });
//   });
// };


// Listen for SIGINT (Ctrl+C) event
process.on("SIGINT", () => {
  closeServer(server);
});

// Listen for SIGTERM event
process.on("SIGTERM", () => {
  closeServer(server);
});
