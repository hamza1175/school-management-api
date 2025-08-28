import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValid = await bcrypt.compare(plainPassword.trim(), hashedPassword);
  return isValid;
};

export const generateRandomPassword = (): string => {
  return Math.random().toString(36).slice(-8);
};
