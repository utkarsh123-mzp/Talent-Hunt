import Organization from "../models/Organization.js";
import Opportunity from "../models/Opportunity.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getOrganizationProfile = async (req, res, next) => {
  try {
    let org = await Organization.findOne({ user: req.user._id });
    if (!org) {
      org = await Organization.create({
        user: req.user._id,
        organizationName: req.user.name,
        organizationType: "Educational Institution",
        eventInterest: "Coding Competitions"
      });
    }
    return successResponse(res, "Organization profile retrieved", { organization: org });
  } catch (error) {
    next(error);
  }
};

export const updateOrganizationProfile = async (req, res, next) => {
  try {
    const { organizationName, organizationType, website, eventInterest } = req.body;

    let org = await Organization.findOne({ user: req.user._id });
    if (!org) {
      org = new Organization({ user: req.user._id });
    }

    if (organizationName) {
      org.organizationName = organizationName.trim();
      await User.findByIdAndUpdate(req.user._id, { name: organizationName.trim() });
    }
    if (organizationType) org.organizationType = organizationType;
    if (website !== undefined) org.website = website.trim();
    if (eventInterest) org.eventInterest = eventInterest;

    await org.save();

    return successResponse(res, "Organization profile updated", { organization: org });
  } catch (error) {
    next(error);
  }
};

export const getOrganizationOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, "Organization opportunities retrieved", { opportunities });
  } catch (error) {
    next(error);
  }
};
