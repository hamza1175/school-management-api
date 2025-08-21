import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Student from "./student.model";

class Parent extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public address?: string;
  public studentId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Parent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Students",
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
    modelName: "Parent",
    tableName: "Parents",
    timestamps: true,
  }
);

// Association
Student.hasOne(Parent, {
  foreignKey: "studentId",
});
Parent.belongsTo(Student, {
  foreignKey: "studentId",
});

export default Parent;
