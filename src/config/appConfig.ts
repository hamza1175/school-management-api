require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
