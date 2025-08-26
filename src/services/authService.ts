import bcrypt from "bcryptjs";

import Role from "../models/role.model";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt";

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

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  roleName: string
): Promise<{
  status: number;
  success: boolean;
  message: string;
  user?: User;
}> => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return { status: 400, success: false, message: "Email already exists" };
  }
  const role = await Role.findOne({ where: { name: roleName } });
  if (!role) {
    return { status: 400, success: false, message: "Invalid role" };
  }
  const hashedPassword = await hashPassword(password);
  console.log("hashedPassword", hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: role.id,
  });
  return { status: 201, success: true, message: "User registered", user };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  status: number;
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}> => {
  const user = await User.findOne({
    where: { email },
    include: {
      model: Role,
      as: "Role",
    },
  });

  if (!user) {
    return { status: 401, success: false, message: "Invalid email" };
  }

  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid) {
    return { status: 401, success: false, message: "Invalid credentials" };
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    status: 200,
    success: true,
    message: "Login successful",
    user,
    token,
  };
};
