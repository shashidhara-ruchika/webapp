import { testPostgresDBConnection } from "../databases/PostgresDBConnection.js";

export const performPostgresDBHealthcheck = async (req, res) => {
  const isDBConnected = await testPostgresDBConnection();

  if (isDBConnected) {
    res.status(200).end();
  } else {
    res.status(503).end();
  }
  return res;
};
