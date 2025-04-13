import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});
