import { PostgresDBConnectionRefused } from "../errors/CommonError.js";
import { User } from "../models/User.js";
import { errorLogger } from "../services/LoggerService.js";

export const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    errorLogger.error("Error finding user by username:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    errorLogger.error("Error creating user:", error);
    throw error;
  }
};

export const saveUser = async (user) => {
  try {
    return await user.save();
  } catch (error) {
    if (error.name) {
      throw new PostgresDBConnectionRefused();
    }
    errorLogger.error("Error saving user:", error);
    throw error;
  }
};
