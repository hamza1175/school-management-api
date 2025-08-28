import logger from "../logger";
import Parent from "../models/parent.model";
import Role from "../models/role.model";
import Student from "../models/student.model";
import User from "../models/user.model";
import { generateRandomPassword, hashPassword } from "../utils/passwordUtils";

// Get all students
export const getAllStudents = async () => {
  return await Student.findAll();
};

// Get student by ID
export const getStudentById = async (id: number) => {
  return await Student.findByPk(id);
};

// Register student
export const registerStudent = async (
  firstName: string,
  lastName: string,
  email: string,
  className: string,
  section: string,
  address: string,
  age: number,
  Bform: string,
  DOB: string,
  phone: string,
  parentEmail: string,
  parentPhone: string,
  parentAddress: string
): Promise<{
  status: number;
  success: boolean;
  message: string;
  student?: Student;
}> => {
  try {
    // const hashedPassword = await hashPassword(generateRandomPassword());
    const hashedPassword = await hashPassword("abc1234A!");

    const studentRole: Role | null = await Role.findOne({
      where: { name: "student" },
    });

    if (!studentRole) {
      return { status: 500, success: false, message: "Student role not found" };
    }
    const [user, isUserCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashedPassword, // will be used only when creating a new user
        roleId: studentRole?.id,
      },
    });

    if (isUserCreated) {
      //Send password with email
    }

    const parentRole: Role | null = await Role.findOne({
      where: { name: "parent" },
    });
    if (!parentRole) {
      return { status: 500, success: false, message: "Parent role not found" };
    }
    const hashedParentPassword = await hashPassword("abc1234A!");

    const [parentUser, isParentUserCreated] = await User.findOrCreate({
      where: { email: parentEmail },
      defaults: {
        email: parentEmail,
        password: hashedParentPassword, // will be used only when creating a new parent
        roleId: parentRole?.id,
      },
    });

    if (isParentUserCreated) {
      // Send password to parent
    }

    const [parentRecord, isParentRecordCreated] = await Parent.findOrCreate({
      where: { userId: parentUser?.id },
      defaults: {
        userId: parentUser?.id,
        phone: parentPhone,
        address: parentAddress,
      },
    });

    const existingStudent = await Student.findOne({
      where: { userId: user?.id },
    });
    if (existingStudent) {
      return {
        status: 409,
        success: false,
        message: "Student already exists.",
      };
    }
    const student = await Student.create({
      userId: Number(user?.id),
      firstName,
      lastName,
      class: className,
      section,
      address,
      age,
      Bform,
      DOB: new Date(DOB),
      phone,
      parentId: parentRecord?.id,
    });

    return {
      status: 201,
      success: true,
      message: "Student registered successfully",
      student,
    };
  } catch (error) {
    console.error("Error registering student:", error);
    logger.error("Error registering student:", error);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};
