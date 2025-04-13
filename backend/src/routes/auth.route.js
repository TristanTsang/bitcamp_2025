import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkAuth,
  logout,
  updateProfilePic,
  updateJobInterests,
  updateUsername,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);
router.post("/logout", logout);
router.put("/update-username", protectRoute, updateUsername);
router.put("/update-profile-pic", protectRoute, updateProfilePic);
router.put("/update-job-interests", protectRoute, updateJobInterests);
export default router;
