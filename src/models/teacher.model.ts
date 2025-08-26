import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface TeacherAttributes {
  id: number;
  userId: string;
  address?: string;
  age?: number;
  CNIC?: string;
  DOB?: Date;
  phone?: string;
  qualification?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TeacherCreationAttributes = Optional<TeacherAttributes, "id">;

class Teacher
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public id!: number;
  public userId!: string;
  public address?: string;
  public CNIC?: string;
  public age?: number;
  public qualification?: string;
  public DOB?: Date;
  public phone?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Teacher.init(
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
    address: {
      type: DataTypes.STRING(255),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    CNIC: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    qualification: {
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
    modelName: "Teacher",
    tableName: "Teachers",
    timestamps: true,
  }
);

export default Teacher;
