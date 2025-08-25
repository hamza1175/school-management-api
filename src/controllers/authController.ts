import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import User from "../models/user.model";
import Role from "../models/role.model";
import { loginUser, registerUser } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("req.body", req.body);

    const { name, email, password, roleName } = req.body;
    if (!name || !email || !password || !roleName) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const response = await registerUser(name, email, password, roleName);
    if (!response.success) {
      res.status(response.status).json(response);
      return;
    }
    res.status(response.status).json(response);
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
    next(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const { email, password } = req.body;

    const response = await loginUser(email, password);
    if (!response.success) {
      res.status(response.status).json(response);
      return;
    }
    const { token } = response;
    if (!token) {
      res.status(500).json({ message: "Error logging in" });
      return;
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
