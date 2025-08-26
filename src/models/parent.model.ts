import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Student from "./student.model";

class Parent extends Model {
  public id!: number;
  public userId!: string;
  public phone!: string;
  public address?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Parent.init(
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
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
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
Parent.hasMany(Student, {
  foreignKey: "parentId",
  as: "Students",
});
Student.belongsTo(Parent, { foreignKey: "parentId", as: "Parent" });

export default Parent;
