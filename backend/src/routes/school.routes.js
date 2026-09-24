import express from "express";
import { getSchoolProfile, updateSchoolProfile } from "../controllers/school.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", requireRole("school", "admin"), getSchoolProfile);
router.put("/profile", requireRole("school", "admin"), updateSchoolProfile);

export default router;
