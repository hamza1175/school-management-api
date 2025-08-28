import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";
import Parent from "./parent.model";
import Student from "./student.model";
import Teacher from "./teacher.model";
import Admin from "./admin.model";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public roleId!: number;

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

User.hasOne(Parent, { foreignKey: "userId" });
Parent.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Student, { foreignKey: "userId" });
Student.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Teacher, { foreignKey: "userId" });
Teacher.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Admin, { foreignKey: "userId" });
Admin.belongsTo(User, { foreignKey: "userId" });

export default User;
