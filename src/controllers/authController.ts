import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import User from "../models/user.model";
import Role from "../models/role.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleName } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    const user = await User.create({ name, email, password, roleId: role.id });
    res
      .status(201)
      .json({ success: true, message: "User registered", userId: user.id });
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
