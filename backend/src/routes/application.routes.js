import express from "express";
import {
  getApplications,
  getApplicationById,
  withdrawApplication,
  updateApplicationStatus
} from "../controllers/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.delete("/:id", withdrawApplication);
router.put(
  "/:id/status",
  requireRole("recruiter", "organization", "admin"),
  updateApplicationStatus
);

export default router;
