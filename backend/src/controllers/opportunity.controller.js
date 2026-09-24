import Opportunity from "../models/Opportunity.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get all opportunities with filtering & search
 * @route   GET /api/opportunities
 * @access  Public / Private
 */
export const getOpportunities = async (req, res, next) => {
  try {
    const {
      type,
      category,
      location,
      mode,
      audience,
      skills,
      search,
      status = "active",
      page = 1,
      limit = 50
    } = req.query;

    const query = {};

    if (status !== "all") {
      query.status = status;
    }

    if (type && type !== "all" && type !== "school-all") {
      query.type = new RegExp(`^${type}$`, "i");
    }

    if (category && category !== "all") {
      query.category = new RegExp(`^${category}$`, "i");
    }

    if (mode && mode !== "all") {
      query.mode = new RegExp(`^${mode}$`, "i");
    }

    if (audience && audience !== "all") {
      query.audience = { $in: [audience, "all"] };
    }

    if (location && location !== "all") {
      query.location = new RegExp(location, "i");
    }

    if (skills) {
      const skillsArray = skills.split(",").map((s) => s.trim());
      query.skills = { $in: skillsArray.map((s) => new RegExp(s, "i")) };
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { organization: new RegExp(search, "i") },
        { skills: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Opportunity.countDocuments(query);
    const opportunities = await Opportunity.find(query)
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return successResponse(res, "Opportunities retrieved", {
      total,
      page: Number(page),
      limit: Number(limit),
      count: opportunities.length,
      opportunities
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single opportunity by ID
 * @route   GET /api/opportunities/:id
 * @access  Public / Private
 */
export const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!opportunity) {
      return errorResponse(res, "Opportunity not found", 404);
    }

    return successResponse(res, "Opportunity retrieved", { opportunity });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new opportunity
 * @route   POST /api/opportunities
 * @access  Private (Recruiter, Organization, Admin)
 */
export const createOpportunity = async (req, res, next) => {
  try {
    const {
      title,
      description,
      organization,
      type,
      category,
      location,
      mode,
      audience,
      deadline,
      stipend,
      fee,
      skills,
      eligibility,
      link,
      recommended
    } = req.body;

    if (!title || !description || !type || !category || !deadline) {
      return errorResponse(
        res,
        "Title, description, type, category, and deadline are required.",
        400
      );
    }

    const orgName = organization || req.user.name || "TalentHunt Partner";

    const opportunity = await Opportunity.create({
      title: title.trim(),
      description: description.trim(),
      organization: orgName,
      type,
      category,
      location: location || "Remote",
      mode: mode || "Remote",
      audience: audience || "college",
      deadline: new Date(deadline),
      stipend: stipend || "",
      fee: fee || "",
      skills: Array.isArray(skills) ? skills : typeof skills === "string" ? skills.split(",").map((s) => s.trim()) : [],
      eligibility: eligibility || "Open to eligible students",
      link: link || "",
      recommended: Boolean(recommended),
      createdBy: req.user._id,
      status: "active"
    });

    return successResponse(res, "Opportunity created successfully", { opportunity }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an opportunity
 * @route   PUT /api/opportunities/:id
 * @access  Private (Owner or Admin)
 */
export const updateOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return errorResponse(res, "Opportunity not found", 404);
    }

    // Authorization check: only owner or admin can modify
    if (opportunity.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "Unauthorized. You cannot edit opportunities created by another user.", 403);
    }

    const updateFields = req.body;
    if (updateFields.skills && typeof updateFields.skills === "string") {
      updateFields.skills = updateFields.skills.split(",").map((s) => s.trim());
    }

    const updated = await Opportunity.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    return successResponse(res, "Opportunity updated successfully", { opportunity: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an opportunity
 * @route   DELETE /api/opportunities/:id
 * @access  Private (Owner or Admin)
 */
export const deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return errorResponse(res, "Opportunity not found", 404);
    }

    if (opportunity.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return errorResponse(res, "Unauthorized. You cannot delete opportunities created by another user.", 403);
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    return successResponse(res, "Opportunity deleted successfully", {});
  } catch (error) {
    next(error);
  }
};
