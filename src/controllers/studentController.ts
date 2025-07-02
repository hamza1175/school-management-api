import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Student } from "../models/Student";

export const getStudents = async (req: Request, res: Response) => {
  try {
    console.log("Fetching students...");

    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const student = studentRepository.create(req.body);
    const result = await studentRepository.save(student);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};
