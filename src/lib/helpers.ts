import { SHA256 as sha256 } from "crypto-js";

export const hashPassword = (password: string): string => {
  return sha256(password).toString();
};
