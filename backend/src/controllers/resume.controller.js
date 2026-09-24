import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import Student from "../models/Student.js";
import { extractResumeText, analyzeResumeContent } from "../services/resumeAnalyzer.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Upload a resume file
 * @route   POST /api/resumes
 * @access  Private (Student, Teacher, All)
 */
export const uploadResumeFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, "Please select and upload a valid resume file (PDF, DOC, DOCX).", 400);
    }

    const { originalname, filename, path: filePath, mimetype, size } = req.file;

    // Extract text from uploaded document
    const extractedText = await extractResumeText(filePath, mimetype);

    // Initial basic ATS analysis
    const analysis = await analyzeResumeContent(extractedText, originalname);

    const resume = await Resume.create({
      user: req.user._id,
      originalName: originalname,
      fileName: filename,
      filePath,
      mimeType: mimetype,
      size,
      parsedText: extractedText.slice(0, 5000), // store up to 5000 characters
      analysisResult: analysis
    });

    // Link resume to Student profile if role is student
    if (req.user.role === "student") {
      await Student.findOneAndUpdate(
        { user: req.user._id },
        { resume: `/uploads/resumes/${filename}` }
      );
    }

    return successResponse(
      res,
      "Resume uploaded and parsed successfully",
      {
        resume: {
          id: resume._id,
          originalName: resume.originalName,
          fileName: resume.fileName,
          size: resume.size,
          createdAt: resume.createdAt,
          analysis: resume.analysisResult
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's uploaded resumes
 * @route   GET /api/resumes
 * @access  Private
 */
export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, "Resumes retrieved", { resumes });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single resume with analysis
 * @route   GET /api/resumes/:id
 * @access  Private
 */
export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return errorResponse(res, "Resume not found", 404);
    }

    if (resume.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "Access denied to this resume", 403);
    }

    return successResponse(res, "Resume retrieved", { resume });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Trigger/Re-run resume analysis
 * @route   POST /api/resumes/:id/analyze
 * @access  Private
 */
export const analyzeResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return errorResponse(res, "Resume not found", 404);
    }

    if (resume.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "Access denied to this resume", 403);
    }

    let text = resume.parsedText;
    if (!text && fs.existsSync(resume.filePath)) {
      text = await extractResumeText(resume.filePath, resume.mimeType);
      resume.parsedText = text.slice(0, 5000);
    }

    const analysis = await analyzeResumeContent(text || "", resume.originalName);

    resume.analysisResult = analysis;
    await resume.save();

    return successResponse(res, "Resume analysis complete", {
      resumeId: resume._id,
      analysis
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a resume
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return errorResponse(res, "Resume not found", 404);
    }

    if (resume.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "Access denied", 403);
    }

    // Attempt to delete physical file from disk
    if (fs.existsSync(resume.filePath)) {
      try {
        fs.unlinkSync(resume.filePath);
      } catch (fileErr) {
        console.warn("[File Deletion Warning]", fileErr.message);
      }
    }

    await Resume.findByIdAndDelete(req.params.id);

    return successResponse(res, "Resume deleted successfully", {});
  } catch (error) {
    next(error);
  }
};
