import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Parent from "./parent.model";
import User from "./user.model";

interface StudentAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  grade?: string;
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
  public name!: string;
  public email!: string;
  public password!: string;
  public grade?: string;
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
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
    },
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
  }
);

Student.belongsTo(User, { foreignKey: "parentId", as: "Parent" });
// Student.belongsToMany(Class, { through: "StudentClass" });

export default Student;
