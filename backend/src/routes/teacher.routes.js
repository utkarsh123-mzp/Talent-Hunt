import express from "express";
import {
  getTeacherProfile,
  updateTeacherProfile,
  getTeacherClasses,
  getTeacherStudents,
  getTeacherSchedule,
  getTeacherEarnings
} from "../controllers/teacher.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", requireRole("teacher", "admin"), getTeacherProfile);
router.put("/profile", requireRole("teacher", "admin"), updateTeacherProfile);

router.get("/classes", requireRole("teacher", "admin"), getTeacherClasses);
router.get("/students", requireRole("teacher", "admin"), getTeacherStudents);
router.get("/schedule", requireRole("teacher", "admin"), getTeacherSchedule);
router.get("/earnings", requireRole("teacher", "admin"), getTeacherEarnings);

export default router;
