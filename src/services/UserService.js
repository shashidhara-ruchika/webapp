import { UserAlreadyExists, UserNotFound } from "../errors/UserError.js";
import {
  findUserByUsername,
  createUser,
  saveUser,
} from "../repositories/UserRepository.js";
import { generateHash } from "./HashService.js";
import { logger } from "./LoggerService.js";
import { mapUserToUserResponse } from "./mappers/UserMapper.js";

export const createANewUser = async (userDetails) => {
  const oldUserObject = await findUserByUsername(userDetails.username);

  if (oldUserObject != null) {
    throw new UserAlreadyExists();
  }

  userDetails.password = await generateHash(userDetails.password);

  const newUser = await createUser(userDetails);

  return mapUserToUserResponse(newUser.toJSON());
};

export const getSelfUser = (user) => {
  if (!user) {
    throw new UserNotFound();
  }
  return mapUserToUserResponse(user.toJSON());
};

export const updateSelfUser = async (user, userDetails) => {
  if (!user) {
    throw new UserNotFound();
  }

  if (userDetails.first_name != null) {
    user.first_name = userDetails.first_name;
  }

  if (userDetails.last_name != null) {
    user.last_name = userDetails.last_name;
  }

  if (userDetails.password != null) {
    user.password = await generateHash(userDetails.password);
  }

  const updatedUser = await saveUser(user);

  logger.info("Updated User:\n" + updatedUser.toJSON());
};
