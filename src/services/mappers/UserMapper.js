export const mapUserToUserResponse = (user) => {
  if (user === null) {
    return null;
  }
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    account_created: user.account_created,
    account_updated: user.account_updated,
  };
};

export const mapUsertoReadableUser = (user) => {
  if (user === null) {
    return null;
  }
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    account_created: user.account_created,
    account_updated: user.account_updated,
    verified: user.verified,
    verification_token: user.verification_token,
    verification_expiry_timestamp: user.verification_expiry_timestamp,
  };
};
