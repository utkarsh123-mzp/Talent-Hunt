import express from "express";
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from "../controllers/opportunity.controller.js";
import { applyToOpportunity } from "../controllers/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getOpportunities);
router.get("/:id", getOpportunityById);

// Protected routes
router.post(
  "/",
  protect,
  requireRole("recruiter", "organization", "admin"),
  createOpportunity
);

router.put(
  "/:id",
  protect,
  requireRole("recruiter", "organization", "admin"),
  updateOpportunity
);

router.delete(
  "/:id",
  protect,
  requireRole("recruiter", "organization", "admin"),
  deleteOpportunity
);

router.post(
  "/:id/apply",
  protect,
  requireRole("student", "teacher", "admin"),
  applyToOpportunity
);

export default router;
