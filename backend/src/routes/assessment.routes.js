import express from "express";
import {
  getAssessments,
  getAssessmentById,
  submitAssessment,
  getAssessmentResults
} from "../controllers/assessment.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getAssessments);
router.get("/:id", getAssessmentById);

router.post("/:id/submit", protect, requireRole("student", "admin"), submitAssessment);
router.get("/:id/results", protect, getAssessmentResults);

export default router;
