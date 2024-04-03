import {
  UserAlreadyExists,
  UserNotFound,
  UserVerificationLinkExpired,
  UserVerificationTimestampNull,
} from "../errors/UserError.js";
import {
  findUserByUsername,
  createUser,
  saveUser,
  findUserByVerificationToken,
} from "../repositories/UserRepository.js";
import { generateHash } from "./HashService.js";
import { logger } from "./LoggerService.js";
import { publishMessage } from "./PubSubService.js";
import {
  mapUserToUserResponse,
  mapUsertoReadableUser,
} from "./mappers/UserMapper.js";
import { v4 as uuidv4 } from "uuid";

export const createANewUser = async (userDetails) => {
  const oldUserObject = await findUserByUsername(userDetails.username);

  if (oldUserObject != null) {
    throw new UserAlreadyExists();
  }

  userDetails.password = await generateHash(userDetails.password);
  userDetails.verification_token = uuidv4();
  // userDetails.verification_expiry_timestamp = new Date(
  //   new Date().getTime() + process.env.VERIFY_EMAIL_EXPIRY_SECONDS * 1000
  // );

  const newUser = await createUser(userDetails);

  await publishMessage(process.env.TOPIC_VERIFY_EMAIL, {
    token: newUser.verification_token,
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

  logger.info(
    "Updated User:\n" + JSON.stringify(mapUsertoReadableUser(user), null, 2)
  );
};

export const verifyUserByUserToken = async (userToken) => {
  const user = await findUserByVerificationToken(userToken);

  if (!user) {
    throw new UserNotFound();
  }

  if (user.verified) {
    logger.warn(`User ${user.id} already Verified: ` + userToken);
    return;
  }

  if (user.verification_expiry_timestamp == null) {
    logger.warn(`User ${user.id} verification timestamp is null`);
    throw new UserVerificationTimestampNull();
  }

  const currentTimestamp = new Date().getTime();
  const expiryTimestamp = user.verification_expiry_timestamp.getTime();
  logger.debug(
    "Current Timestamp: " +
      currentTimestamp +
      " Verification Expiry Timestamp: " +
      expiryTimestamp
  );

  if (currentTimestamp > expiryTimestamp) {
    throw new UserVerificationLinkExpired();
  } else {
    user.verified = true;
    const updatedUser = await saveUser(user);
    logger.info(`User ${user.id} Verified from token: ` + userToken);
  }
};
