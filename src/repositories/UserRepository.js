import { PostgresDBConnectionRefused } from "../errors/CommonError.js";
import { User } from "../models/User.js";
import { logger } from "../services/LoggerService.js";

export const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    logger.debug(
      "[UserRepository] findUserByUsername User: " +
        JSON.stringify(user, null, 2)
    );
    return user;
  } catch (error) {
    console.log(error);
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    logger.error("Error finding user by username:\n" + error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    logger.debug(
      "[UserRepository] createUser User: " + JSON.stringify(newUser, null, 2)
    );
    return newUser;
  } catch (error) {
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    logger.error("Error creating user:\n" + error);
    throw error;
  }
};

export const saveUser = async (user) => {
  try {
    const updatedUser = await user.save();
    logger.debug(
      "[UserRepository] saveUser User: " + JSON.stringify(updatedUser, null, 2)
    );
    return updatedUser;
  } catch (error) {
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    logger.error("Error saving user:\n" + error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    logger.debug(
      "[UserRepository] findUserById User: " + JSON.stringify(user, null, 2)
    );
    return user;
  } catch (error) {
    console.log(error);
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    logger.error("Error finding user by id:\n" + error);
    throw error;
  }
};
