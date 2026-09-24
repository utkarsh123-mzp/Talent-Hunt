import express from "express";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterOpportunities,
  getRecruiterApplications
} from "../controllers/recruiter.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", requireRole("recruiter", "admin"), getRecruiterProfile);
router.put("/profile", requireRole("recruiter", "admin"), updateRecruiterProfile);
router.get("/opportunities", requireRole("recruiter", "admin"), getRecruiterOpportunities);
router.get("/applications", requireRole("recruiter", "admin"), getRecruiterApplications);

export default router;
