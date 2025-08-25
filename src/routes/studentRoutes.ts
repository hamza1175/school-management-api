import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
} from "../controllers/studentController";
import { authMiddleware } from "../middlewares/auth";

const studentRoutes = Router();

studentRoutes.get("/", authMiddleware, getAllStudents);
studentRoutes.get("/:id", authMiddleware, getStudentById);

export default studentRoutes;
