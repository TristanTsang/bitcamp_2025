import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  uploadResume,
  getUserResumes,
  getAllResumes,
} from "../controllers/resume.controller.js";
const router = express.Router();

router.post("/upload-resume", protectRoute, uploadResume);
router.get("/user-resumes", protectRoute, getUserResumes);
router.get("/all-resumes", getAllResumes);

export default router;
