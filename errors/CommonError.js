export const POSTGRESQLDB_CONNECTION_REFUSED =
  "SequelizeConnectionRefusedError";

export class PostgresDBConnectionRefused extends Error {
  get message() {
    return "PostgresDB Connection Refused";
  }
  get name() {
    return POSTGRESQLDB_CONNECTION_REFUSED;
  }
  get statusCode() {
    return 503;
  }
}
