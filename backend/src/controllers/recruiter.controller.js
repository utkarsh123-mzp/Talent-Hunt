import Recruiter from "../models/Recruiter.js";
import Opportunity from "../models/Opportunity.js";
import Application from "../models/Application.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getRecruiterProfile = async (req, res, next) => {
  try {
    let recruiter = await Recruiter.findOne({ user: req.user._id });
    if (!recruiter) {
      recruiter = await Recruiter.create({
        user: req.user._id,
        companyName: req.user.name,
        jobRole: "Hiring Manager",
        industry: "Information Technology",
        contactInformation: {
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone || ""
        }
      });
    }
    return successResponse(res, "Recruiter profile retrieved", { recruiter });
  } catch (error) {
    next(error);
  }
};

export const updateRecruiterProfile = async (req, res, next) => {
  try {
    const { companyName, jobRole, companyWebsite, industry, contactInformation } = req.body;

    let recruiter = await Recruiter.findOne({ user: req.user._id });
    if (!recruiter) {
      recruiter = new Recruiter({ user: req.user._id });
    }

    if (companyName) {
      recruiter.companyName = companyName.trim();
      await User.findByIdAndUpdate(req.user._id, { name: companyName.trim() });
    }
    if (jobRole) recruiter.jobRole = jobRole.trim();
    if (companyWebsite !== undefined) recruiter.companyWebsite = companyWebsite.trim();
    if (industry) recruiter.industry = industry.trim();
    if (contactInformation) {
      recruiter.contactInformation = {
        ...recruiter.contactInformation,
        ...contactInformation
      };
    }

    await recruiter.save();

    return successResponse(res, "Recruiter profile updated", { recruiter });
  } catch (error) {
    next(error);
  }
};

export const getRecruiterOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, "Posted opportunities retrieved", { opportunities });
  } catch (error) {
    next(error);
  }
};

export const getRecruiterApplications = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({ createdBy: req.user._id }).select("_id");
    const oppIds = opportunities.map((o) => o._id);

    const applications = await Application.find({ opportunity: { $in: oppIds } })
      .populate("opportunity")
      .populate("user", "name email phone role studentType")
      .populate("resume")
      .sort({ appliedAt: -1 });

    return successResponse(res, "Received applications retrieved", { applications });
  } catch (error) {
    next(error);
  }
};
