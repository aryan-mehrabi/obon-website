import "server-only";

import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const SALTROUND = 10;
  return bcrypt.hash(password, SALTROUND);
};
