import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import sequelize from "./config/database";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { studentRoutes, authRoutes } from "./routes";
import logger from "./logger";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json()); //parse application/json and assign to req.body
app.use(express.urlencoded({ extended: true })); //for parsing form data with type application/x-www-form-urlencoded and assign to req.body
app.use(helmet());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()), // pass logs to winston
    },
  })
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

//Routes
app.use("/api/user", authRoutes);
app.use("/api/student", studentRoutes);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

// Database Connection
sequelize
  .sync()
  .then(() => {
    console.log("Connected to MySQL");
    logger.info("Connected to MySQL");
  })
  .catch((err: Error) => {
    console.error("MySQL connection error:", err);
    logger.error("MySQL connection error:", err);
  });

export default app;
