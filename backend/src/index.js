import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js";

import { connectDB } from "./lib/db.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});
