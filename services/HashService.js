import { hash, compare } from "bcrypt";

export const generateHash = (str) => {
  return hash(str, 10);
};

export const compareHashes = async (plaintextPassword, hash) => {
  return await compare(plaintextPassword, hash);
};
