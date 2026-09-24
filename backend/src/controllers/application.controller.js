import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";
import Notification from "../models/Notification.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Apply to an opportunity
 * @route   POST /api/opportunities/:id/apply
 * @access  Private (Student, Teacher)
 */
export const applyToOpportunity = async (req, res, next) => {
  try {
    const opportunityId = req.params.id;
    const { resumeId, notes } = req.body;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return errorResponse(res, "Opportunity not found", 404);
    }

    if (opportunity.status !== "active") {
      return errorResponse(res, "This opportunity is no longer accepting applications.", 400);
    }

    if (new Date(opportunity.deadline) < new Date()) {
      return errorResponse(res, "The deadline for this opportunity has passed.", 400);
    }

    // Check duplicate application
    const existing = await Application.findOne({
      user: req.user._id,
      opportunity: opportunityId
    });

    if (existing) {
      return errorResponse(res, "You have already applied for this opportunity.", 409);
    }

    const application = await Application.create({
      user: req.user._id,
      opportunity: opportunityId,
      role: req.user.role,
      resume: resumeId || null,
      notes: notes || "",
      status: "applied",
      appliedAt: new Date()
    });

    // Notify applicant
    await Notification.create({
      user: req.user._id,
      title: "Application Submitted",
      message: `Your application for "${opportunity.title}" at ${opportunity.organization} was submitted successfully.`,
      type: "application",
      link: "/frontend/html/dashboard/opportunities.html"
    });

    // Notify creator if creator is another user
    if (opportunity.createdBy && opportunity.createdBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: opportunity.createdBy,
        title: "New Application Received",
        message: `${req.user.name} applied for "${opportunity.title}".`,
        type: "application",
        link: "/frontend/html/opportunities/opportunities.html"
      });
    }

    return successResponse(res, "Application submitted successfully", { application }, 201);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, "You have already applied for this opportunity.", 409);
    }
    next(error);
  }
};

/**
 * @desc    Get applications (filtered by user role)
 * @route   GET /api/applications
 * @access  Private
 */
export const getApplications = async (req, res, next) => {
  try {
    const user = req.user;
    let applications = [];

    // Students & Teachers: see their own applications
    if (user.role === "student" || user.role === "teacher") {
      applications = await Application.find({ user: user._id })
        .populate("opportunity")
        .sort({ appliedAt: -1 });
    }
    // Recruiters & Organizations: see applications for their posted opportunities
    else if (user.role === "recruiter" || user.role === "organization") {
      const myOpportunities = await Opportunity.find({ createdBy: user._id }).select("_id");
      const oppIds = myOpportunities.map((o) => o._id);

      applications = await Application.find({ opportunity: { $in: oppIds } })
        .populate("opportunity")
        .populate("user", "name email phone role studentType")
        .populate("resume")
        .sort({ appliedAt: -1 });
    }
    // Admin: see all applications
    else if (user.role === "admin") {
      applications = await Application.find()
        .populate("opportunity")
        .populate("user", "name email phone role studentType")
        .sort({ appliedAt: -1 });
    }

    return successResponse(res, "Applications retrieved", {
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single application by ID
 * @route   GET /api/applications/:id
 * @access  Private
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("opportunity")
      .populate("user", "name email phone role studentType")
      .populate("resume");

    if (!application) {
      return errorResponse(res, "Application not found", 404);
    }

    // Access check: only applicant, opportunity creator, or admin
    const isApplicant = application.user._id.toString() === req.user._id.toString();
    const isCreator = application.opportunity?.createdBy?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isApplicant && !isCreator && !isAdmin) {
      return errorResponse(res, "Access denied to this application.", 403);
    }

    return successResponse(res, "Application retrieved", { application });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Withdraw application
 * @route   DELETE /api/applications/:id
 * @access  Private (Applicant or Admin)
 */
export const withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return errorResponse(res, "Application not found", 404);
    }

    if (application.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "You can only withdraw your own applications.", 403);
    }

    await Application.findByIdAndDelete(req.params.id);

    return successResponse(res, "Application withdrawn successfully", {});
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update application status
 * @route   PUT /api/applications/:id/status
 * @access  Private (Recruiter, Organization, Admin)
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["applied", "shortlisted", "interview", "selected", "rejected", "withdrawn"];

    if (!validStatuses.includes(status)) {
      return errorResponse(res, `Invalid status. Must be one of: ${validStatuses.join(", ")}`, 400);
    }

    const application = await Application.findById(req.params.id).populate("opportunity");
    if (!application) {
      return errorResponse(res, "Application not found", 404);
    }

    // Only opportunity creator or admin can update status
    const isCreator = application.opportunity?.createdBy?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAdmin) {
      return errorResponse(res, "Unauthorized. You cannot update application status for this opportunity.", 403);
    }

    application.status = status;
    await application.save();

    // Send notification to applicant
    await Notification.create({
      user: application.user,
      title: "Application Status Updated",
      message: `Your application status for "${application.opportunity?.title}" has been updated to "${status}".`,
      type: "application",
      link: "/frontend/html/dashboard/opportunities.html"
    });

    return successResponse(res, `Application status updated to ${status}`, { application });
  } catch (error) {
    next(error);
  }
};
