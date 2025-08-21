import { Router } from "express";
import { getStudents } from "../controllers/studentController";
import { authenticateToken } from "../middlewares/auth";

const studentRoutes = Router();

studentRoutes.get("/", getStudents);

export default studentRoutes;
