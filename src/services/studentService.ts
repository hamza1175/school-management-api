import Student from "../models/student.model";

// Get all students
export const getAllStudents = async () => {
  return await Student.findAll();
};

// Get student by ID
export const getStudentById = async (id: number) => {
  return await Student.findByPk(id);
};
