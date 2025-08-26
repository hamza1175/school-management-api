import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/appConfig";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";
import Role from "../models/role.model";

const JWT_SECRET = config.jwtSecret!;

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      res.status(401).json({ message: "Access token missing" });
      return;
    }

    try {
      const decoded = verifyToken(token);
      console.log("[auth] decoded", decoded);

      const user: any = await User.findByPk(decoded.id, {
        include: {
          model: Role,
          as: "Role",
        },
      });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }
      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(user.Role.name)) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }
      req.user.role = user.Role.name;
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired token", error: err });
      return;
    }
  };
};
