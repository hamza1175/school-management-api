import { Router } from "express";
import { register, login } from "../controllers/authController";

const authRoutes = Router();
console.log("authRoutes");

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
