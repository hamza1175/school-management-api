import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AdminAttributes {
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

type AdminCreationAttributes = Optional<AdminAttributes, "id">;

class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
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

Admin.init(
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
    modelName: "Admin",
    tableName: "Admin",
    timestamps: true,
  }
);

export default Admin;
