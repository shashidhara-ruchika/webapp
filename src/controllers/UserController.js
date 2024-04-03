import { POSTGRESQLDB_CONNECTION_REFUSED } from "../errors/CommonError.js";
import {
  ERROR_USER_ALREADY_EXISTS,
  ERROR_USER_FROM_REQUEST_NOT_FOUND,
  ERROR_USER_VERIFICATION_LINK_EXPIRED,
  ERROR_USER_VERIFICATION_TIMESTAMP_NULL,
} from "../errors/UserError.js";
import { logger } from "../services/LoggerService.js";
import {
  createANewUser,
  getSelfUser,
  updateSelfUser,
  verifyUserByUserToken,
} from "../services/UserService.js";

export const createAUser = async (req, res) => {
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    username: req.body.username,
  };

  try {
    const user = await createANewUser(newUser);
    return res.status(201).json(user).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      logger.error("Service Unavailable: Error:\n" + error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_ALREADY_EXISTS) {
      logger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    logger.error(
      "Internal Server Error: Something went wrong\nError: " + error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const getSelfUserDetails = async (req, res) => {
  try {
    return res.status(200).json(getSelfUser(req.user)).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      logger.error("Service Unavailable: Error:\n" + error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_FROM_REQUEST_NOT_FOUND) {
      logger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    logger.error(
      "Internal Server Error: Something went wrong\nError: " + error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const updateSelfUserDetails = async (req, res, next) => {
  try {
    await updateSelfUser(req.user, req.body);
    return res.status(204).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      logger.error("Service Unavailable: Error:\n" + error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_FROM_REQUEST_NOT_FOUND) {
      logger.error(error.message);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    logger.error(
      "Internal Server Error: Something went wrong\nError: " + error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const verifyUser = async (req, res) => {
  try {
    const userToken = req.params.id;
    await verifyUserByUserToken(userToken);
    return res.status(200).json({ message: "User verification sucess!" }).end();
  } catch (error) {
    if (error.name == POSTGRESQLDB_CONNECTION_REFUSED) {
      logger.error("Service Unavailable: Error:\n" + error);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_FROM_REQUEST_NOT_FOUND) {
      logger.error(error.message + " " + req.params.id);
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_VERIFICATION_LINK_EXPIRED) {
      logger.error(
        "Verification Link Expired " + error.message + " " + req.params.id
      );
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    if (error.name == ERROR_USER_VERIFICATION_TIMESTAMP_NULL) {
      logger.error(
        "Verification Timestamp Null " + error.message + " " + req.params.id
      );
      return res
        .status(error.statusCode)
        .json({ message: error.message })
        .end();
    }
    logger.error(
      "Internal Server Error: Something went wrong\nError: " + error
    );
    return res.status(500).json({ message: "Something went wrong" }).end();
  }
};
