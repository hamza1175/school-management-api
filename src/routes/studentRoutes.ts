import { NextFunction, Request, Response, Router } from "express";
import {
  getAllStudents,
  getStudentById,
} from "../controllers/studentController";
import { authMiddleware } from "../middlewares/auth";

const studentRoutes = Router();

interface AuthRequest extends Request {
  user?: any;
}

studentRoutes.get("/", authMiddleware(["admin", "teacher"]), getAllStudents);
studentRoutes.get(
  "/:id",
  authMiddleware(["admin", "teacher", "parent", "student"]),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const studentId = Number(req.params.id);

      //Restrict students to their own data
      if (req.user?.role === "student" && req.user?.id !== studentId) {
        res.status(403).json({
          success: false,
          message: "Student can only access their own data.",
        });
        return;
      }

      //Restricts parents to their child's data

      //Admin and Teachers can access any student data
      return getStudentById(req, res, next);
    } catch (error) {}
  }
);

export default studentRoutes;
