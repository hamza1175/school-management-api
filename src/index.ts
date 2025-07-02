import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import studentRoutes from "./routes/studentRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.use("/api/students", studentRoutes);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
