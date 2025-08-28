import { NextFunction, Request, Response, Router } from "express";
import {
  register,
  getAllStudents,
  getStudentById,
} from "../controllers/studentController";
import { authMiddleware } from "../middlewares/auth";
import Student from "../models/student.model";
import Parent from "../models/parent.model";

const studentRoutes = Router();

interface AuthRequest extends Request {
  user?: any;
}

studentRoutes.post("/register", authMiddleware(["admin"]), register);
studentRoutes.get("/", authMiddleware(["admin", "teacher"]), getAllStudents);
studentRoutes.get(
  "/:id",
  authMiddleware(["admin", "teacher", "parent", "student"]),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const studentId = Number(req.params.id);
      console.log("========req.user", req.user);

      // Restrict students to their own data
      if (req.user?.role === "student") {
        const student = await Student.findOne({
          where: { id: studentId, userId: req.user.id }, // ensure this student belongs to the logged-in user
        });

        if (!student) {
          res.status(403).json({
            success: false,
            message: "Students can only access their own data.",
          });
          return;
        }
      }

      //Restricts parents to their child's data
      if (req.user?.role === "parent") {
        const parent = await Parent.findOne({
          where: { userId: req.user?.id },
        });
        console.log("======parent", parent);
        if (!parent) {
          res.status(404).json({
            success: false,
            message: "Parent not found.",
          });
          return;
        }

        const student = await Student.findOne({
          where: { id: studentId, parentId: parent.id },
        });
        console.log("===========student", student);

        if (!student) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to access this student's data.",
          });
          return;
        }
      }

      //Admin and Teachers can access any student data
      return getStudentById(req, res, next);
    } catch (error) {}
  }
);

export default studentRoutes;
