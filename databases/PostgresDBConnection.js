import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { infoLogger, errorLogger } from "../services/LoggerService.js";

dotenv.config();

export const postgresDBConnection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    pool: {
      max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 5,
      min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE, 10) || 30000,
      idle: parseInt(process.env.DATABASE_POOL_IDLE, 10) || 10000,
    },
  }
);

export const testPostgresDBConnection = async () => {
  try {
    await postgresDBConnection.authenticate();
    infoLogger.info("Postgres Database Connection is successful");
    return true;
  } catch (error) {
    errorLogger.error("Unable to Connect to Postgres Database, Error:", error);
    return false;
  }
};

export const syncPostgresDBConnection = async () => {
  try {
    await postgresDBConnection.sync({
      force: JSON.parse(process.env.DROP_DATABASE) || false,
    });
    infoLogger.info("Postgres Database Sync is successful");
    return true;
  } catch (error) {
    errorLogger.error("Unable to Sync Postgres Database, Error:", error);
    return false;
  }
};
