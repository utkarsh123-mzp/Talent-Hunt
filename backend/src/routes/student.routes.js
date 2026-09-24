import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentSkills,
  updateStudentSkills,
  getStudentAchievements,
  addStudentAchievement,
  getStudentResults,
  getStudentTalentScore,
  getSkillGap
} from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", requireRole("student", "admin"), getStudentProfile);
router.put("/profile", requireRole("student", "admin"), updateStudentProfile);

router.get("/skills", requireRole("student", "admin"), getStudentSkills);
router.put("/skills", requireRole("student", "admin"), updateStudentSkills);

router.get("/achievements", requireRole("student", "admin"), getStudentAchievements);
router.post("/achievements", requireRole("student", "admin"), addStudentAchievement);

router.get("/results", requireRole("student", "admin"), getStudentResults);
router.get("/talent-score", requireRole("student", "admin"), getStudentTalentScore);
router.get("/skill-gap", requireRole("student", "admin"), getSkillGap);

export default router;
