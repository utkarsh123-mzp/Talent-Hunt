import express from "express";
import {
  getOrganizationProfile,
  updateOrganizationProfile,
  getOrganizationOpportunities
} from "../controllers/organization.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", requireRole("organization", "admin"), getOrganizationProfile);
router.put("/profile", requireRole("organization", "admin"), updateOrganizationProfile);
router.get("/opportunities", requireRole("organization", "admin"), getOrganizationOpportunities);

export default router;
