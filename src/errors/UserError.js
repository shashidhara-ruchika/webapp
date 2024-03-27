export const ERROR_USER_ALREADY_EXISTS = "UserAlreadyExists";
export class UserAlreadyExists extends Error {
  get message() {
    return "User already exists";
  }
  get name() {
    return ERROR_USER_ALREADY_EXISTS;
  }
  get statusCode() {
    return 400;
  }
}

export const ERROR_USER_FROM_REQUEST_NOT_FOUND = "UserNotFound";
export class UserNotFound extends Error {
  get message() {
    return "User not found";
  }
  get name() {
    return ERROR_USER_FROM_REQUEST_NOT_FOUND;
  }
  get statusCode() {
    return 401;
  }
}

export const ERROR_USER_VERIFICATION_LINK_EXPIRED =
  "UserVerificationLinkExpired";
export class UserVerificationLinkExpired extends Error {
  get message() {
    return "User Verification Link Expired";
  }
  get name() {
    return ERROR_USER_VERIFICATION_LINK_EXPIRED;
  }
  get statusCode() {
    return 410;
  }
}
