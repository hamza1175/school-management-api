import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface StudentAttributes {
  id: number;
  userId: number;
  parentId: number;
  rollNo?: number;
  firstName: string;
  lastName: string;
  class: string;
  section: string;
  address?: string;
  age?: number;
  Bform?: string;
  DOB?: Date;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type StudentCreationAttributes = Optional<StudentAttributes, "id">;

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public userId!: number;
  public parentId!: number;
  public firstName!: string;
  public lastName!: string;
  public rollNo!: number;
  public class!: string;
  public section!: string;
  public address?: string;
  public age?: number;
  public Bform?: string;
  public DOB?: Date;
  public phone?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    rollNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: { type: DataTypes.STRING, allowNull: false },
    address: {
      type: DataTypes.STRING(255),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    Bform: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Parents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "Students",
    timestamps: true,
    hooks: {
      beforeCreate: async (student: Student) => {
        const lastStudent = await Student.findOne({
          order: [["rollNo", "DESC"]],
        });
        const startNumber = 0; // starting rollNo
        student.rollNo = lastStudent ? lastStudent.rollNo + 1 : startNumber + 1;
      },
    },
  }
);

export default Student;
