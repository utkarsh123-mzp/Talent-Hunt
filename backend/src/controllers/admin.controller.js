import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Recruiter from "../models/Recruiter.js";
import Organization from "../models/Organization.js";
import Opportunity from "../models/Opportunity.js";
import Application from "../models/Application.js";
import Assessment from "../models/Assessment.js";
import AssessmentResult from "../models/AssessmentResult.js";
import Notification from "../models/Notification.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get all users with optional role filtering
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
    return successResponse(res, "Users retrieved", { count: users.length, users });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all students
 * @route   GET /api/admin/students
 * @access  Private (Admin)
 */
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate("user", "isActive createdAt").sort({ createdAt: -1 });
    return successResponse(res, "Students retrieved", { count: students.length, students });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all teachers
 * @route   GET /api/admin/teachers
 * @access  Private (Admin)
 */
export const getAllTeachers = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.verificationStatus = status;

    const teachers = await Teacher.find(filter).populate("user", "isActive createdAt").sort({ createdAt: -1 });
    return successResponse(res, "Teachers retrieved", { count: teachers.length, teachers });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify or reject a teacher application
 * @route   PUT /api/admin/teachers/:id/verify
 * @access  Private (Admin)
 */
export const verifyTeacher = async (req, res, next) => {
  try {
    const { status = "verified", notes = "" } = req.body;

    if (!["verified", "rejected", "pending-verification"].includes(status)) {
      return errorResponse(res, "Status must be 'verified', 'rejected', or 'pending-verification'.", 400);
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return errorResponse(res, "Teacher profile not found", 404);
    }

    teacher.verificationStatus = status;
    if (status === "verified") {
      teacher.currentStage = "completed";
    }
    await teacher.save();

    // Send notification to teacher
    await Notification.create({
      user: teacher.user,
      title: `Teacher Profile ${status === "verified" ? "Verified" : "Update"}`,
      message: `Your educator profile verification status is now: ${status}. ${notes}`,
      type: "teacher",
      link: "/frontend/html/teacher-portal/my-profile.html"
    });

    return successResponse(res, `Teacher profile marked as ${status}`, { teacher });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all recruiters
 * @route   GET /api/admin/recruiters
 * @access  Private (Admin)
 */
export const getAllRecruiters = async (req, res, next) => {
  try {
    const recruiters = await Recruiter.find().populate("user", "isActive createdAt").sort({ createdAt: -1 });
    return successResponse(res, "Recruiters retrieved", { count: recruiters.length, recruiters });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all organizations
 * @route   GET /api/admin/organizations
 * @access  Private (Admin)
 */
export const getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.find().populate("user", "isActive createdAt").sort({ createdAt: -1 });
    return successResponse(res, "Organizations retrieved", { count: organizations.length, organizations });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all opportunities (admin)
 * @route   GET /api/admin/opportunities
 * @access  Private (Admin)
 */
export const getAllOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });
    return successResponse(res, "All opportunities retrieved", { count: opportunities.length, opportunities });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all applications (admin)
 * @route   GET /api/admin/applications
 * @access  Private (Admin)
 */
export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("opportunity")
      .populate("user", "name email phone role studentType")
      .sort({ appliedAt: -1 });
    return successResponse(res, "All applications retrieved", { count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin high-level metrics and reports
 * @route   GET /api/admin/reports
 * @access  Private (Admin)
 */
export const getAdminReports = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      verifiedTeachers,
      totalOpportunities,
      totalApplications,
      totalAssessmentsTaken
    ] = await Promise.all([
      User.countDocuments(),
      Student.countDocuments(),
      Teacher.countDocuments(),
      Teacher.countDocuments({ verificationStatus: "verified" }),
      Opportunity.countDocuments(),
      Application.countDocuments(),
      AssessmentResult.countDocuments()
    ]);

    const recentApplications = await Application.find()
      .populate("opportunity", "title organization")
      .populate("user", "name email")
      .sort({ appliedAt: -1 })
      .limit(5);

    return successResponse(res, "System report statistics retrieved", {
      stats: {
        totalUsers,
        totalStudents,
        totalTeachers,
        verifiedTeachers,
        pendingTeacherVerifications: totalTeachers - verifiedTeachers,
        totalOpportunities,
        totalApplications,
        totalAssessmentsTaken
      },
      recentApplications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new assessment (Admin)
 * @route   POST /api/admin/assessments
 * @access  Private (Admin)
 */
export const createAssessment = async (req, res, next) => {
  try {
    const { title, category, targetAudience, classLevel, durationMinutes, questions } = req.body;

    if (!title || !category || !questions || !Array.isArray(questions) || questions.length === 0) {
      return errorResponse(res, "Title, category, and questions array are required.", 400);
    }

    const assessment = await Assessment.create({
      title: title.trim(),
      category: category.trim(),
      targetAudience: targetAudience || "college",
      classLevel: classLevel || "",
      durationMinutes: durationMinutes || 20,
      totalQuestions: questions.length,
      questions
    });

    return successResponse(res, "Assessment created successfully", { assessment }, 201);
  } catch (error) {
    next(error);
  }
};
