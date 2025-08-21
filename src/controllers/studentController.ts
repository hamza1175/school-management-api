import { NextFunction, Request, Response } from "express";
import * as studentService from "../services/studentService";

// Get all students
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
    next(error);
  }
};

// Get student by ID
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await studentService.getStudentById(Number(req.params.id));

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
    next(error);
  }
};
