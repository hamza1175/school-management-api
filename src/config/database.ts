import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from "./appConfig";

dotenv.config();

const sequelize = new Sequelize(
  config.db.database!,
  config.db.user!,
  config.db.password!,
  {
    port: Number(config.db.port) || 3306,
    host: config.db.host,
    dialect: "mysql",
  }
);

export default sequelize;
