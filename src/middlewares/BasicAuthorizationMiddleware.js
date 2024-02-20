import { POSTGRESQLDB_CONNECTION_REFUSED } from "../errors/CommonError.js";
import { findUserByUsername } from "../repositories/UserRepository.js";
import { compareHashes } from "../services/HashService.js";
import { errorLogger } from "../services/LoggerService.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      errorLogger.error(
        "Unauthorized: Invalid or Missing Authorization Header"
      );
      res
        .status(401)
        .json({
          message: "Unauthorized: Invalid or Missing Authorization Header",
        })
        .end();
      return res;
    }

    const base64credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    if (!username || !password) {
      errorLogger.error(
        "Unauthorized: Invalid or Missing Authorization Header"
      );
      res
        .status(401)
        .json({
          message: "Unauthorized: Invalid or Missing Authorization Header",
        })
        .end();
      return res;
    }

    const user = await findUserByUsername(username);

    if (user == null) {
      errorLogger.error(
        "Unauthorized: Invalid or Missing Authorization Header"
      );
      res
        .status(401)
        .json({
          message: "Unauthorized: Invalid or Missing Authorization Header",
        })
        .end();
      return res;
    }

    const passwordsMatch = await compareHashes(password, user.password);
    if (!passwordsMatch) {
      errorLogger.error(
        "Unauthorized: Invalid or Missing Authorization Header"
      );
      res
        .status(401)
        .json({
          message: "Unauthorized: Invalid or Missing Authorization Header",
        })
        .end();
      return res;
    }

    req.user = user;
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      errorLogger.error("Service Unavailable: Error:\n", error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    errorLogger.error(
      "Internal Server Error: Something went wrong\nError: ",
      error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }

  next();
};

const throwAuthError = async (req, res, next) => {};
