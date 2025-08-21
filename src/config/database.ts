import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from "./appConfig";

dotenv.config();

const sequelize = new Sequelize(
  config.db.database!,
  config.db.user!,
  config.db.password!,
  {
    host: config.db.host,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
