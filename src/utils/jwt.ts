import jwt from "jsonwebtoken";
import config from "../config/appConfig";

const JWT_SECRET = config.jwtSecret!;
const JWT_EXPIRES_IN = "1h"; // 1 hour expiry

export interface JwtPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
