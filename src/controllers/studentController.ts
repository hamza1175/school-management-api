import { NextFunction, Request, Response } from "express";
import * as studentService from "../services/studentService";

// Create student
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      className,
      section,
      address,
      age,
      Bform,
      DOB,
      phone,
      parentEmail,
      parentPhone,
      parentAddress,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !className ||
      !section ||
      !address ||
      !age ||
      !Bform ||
      !DOB ||
      !phone ||
      !parentEmail ||
      !parentPhone ||
      !parentAddress
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const response = await studentService.registerStudent(
      firstName,
      lastName,
      email,
      className,
      section,
      address,
      age,
      Bform,
      DOB,
      phone,
      parentEmail,
      parentPhone,
      parentAddress
    );
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
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
    next(error);
  }
};
