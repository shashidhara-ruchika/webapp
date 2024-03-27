import {
  UserAlreadyExists,
  UserNotFound,
  UserVerificationLinkExpired,
} from "../errors/UserError.js";
import {
  findUserByUsername,
  createUser,
  saveUser,
  findUserById,
} from "../repositories/UserRepository.js";
import { generateHash } from "./HashService.js";
import { logger } from "./LoggerService.js";
import { publishMessage } from "./PubSubService.js";
import { mapUserToUserResponse } from "./mappers/UserMapper.js";

export const createANewUser = async (userDetails) => {
  const oldUserObject = await findUserByUsername(userDetails.username);

  if (oldUserObject != null) {
    throw new UserAlreadyExists();
  }

  userDetails.password = await generateHash(userDetails.password);

  const newUser = await createUser(userDetails);

  await publishMessage(process.env.TOPIC_VERIFY_EMAIL, {
    id: newUser.id,
    email: newUser.username,
  });

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

  logger.info("Updated User:\n" + JSON.stringify(updatedUser, null, 2));
};

export const verifyUserByUserID = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  if (user.verified) {
    logger.warn("User Already Verified: " + userId);
    return;
  }

  const currentTimestamp = new Date().getTime();
  logger.debug(
    "Current Timestamp: " +
      currentTimestamp +
      "Verification Email Sent Timestamp: " +
      user.verification_email_sent_timestamp
  );

  if (
    currentTimestamp - user.verification_email_sent_timestamp >
    process.env.VERIFY_EMAIL_EXPIRY_SECONDS * 1000
  ) {
    throw new UserVerificationLinkExpired();
  } else {
    user.verified = true;
    const updatedUser = await saveUser(user);
    logger.info("User Verified: " + userId);
  }
};
