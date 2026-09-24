import express from "express";
import {
  uploadResumeFile,
  getResumes,
  getResumeById,
  analyzeResumeById,
  deleteResume
} from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadResume } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", uploadResume.single("resume"), uploadResumeFile);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.post("/:id/analyze", analyzeResumeById);
router.delete("/:id", deleteResume);

export default router;
