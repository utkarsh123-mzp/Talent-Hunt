import express from "express";
import {
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  verifyTeacher,
  getAllRecruiters,
  getAllOrganizations,
  getAllOpportunities,
  getAllApplications,
  getAdminReports,
  createAssessment
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

// Strict admin protection
router.use(protect, requireRole("admin"));

router.get("/users", getAllUsers);
router.get("/students", getAllStudents);
router.get("/teachers", getAllTeachers);
router.put("/teachers/:id/verify", verifyTeacher);
router.get("/recruiters", getAllRecruiters);
router.get("/organizations", getAllOrganizations);
router.get("/opportunities", getAllOpportunities);
router.get("/applications", getAllApplications);
router.get("/reports", getAdminReports);
router.post("/assessments", createAssessment);

export default router;
