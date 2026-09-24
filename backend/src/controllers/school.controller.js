import School from "../models/School.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getSchoolProfile = async (req, res, next) => {
  try {
    let school = await School.findOne({ user: req.user._id });
    if (!school) {
      school = await School.create({
        user: req.user._id,
        schoolName: req.user.name,
        email: req.user.email,
        phone: req.user.phone || "",
        city: "Default City"
      });
    }
    return successResponse(res, "School profile retrieved", { school });
  } catch (error) {
    next(error);
  }
};

export const updateSchoolProfile = async (req, res, next) => {
  try {
    const { schoolName, schoolType, city, website, contactPerson, phone } = req.body;

    let school = await School.findOne({ user: req.user._id });
    if (!school) {
      school = new School({ user: req.user._id, email: req.user.email });
    }

    if (schoolName) {
      school.schoolName = schoolName.trim();
      await User.findByIdAndUpdate(req.user._id, { name: schoolName.trim() });
    }
    if (schoolType) school.schoolType = schoolType;
    if (city) school.city = city.trim();
    if (website !== undefined) school.website = website.trim();
    if (contactPerson) school.contactPerson = contactPerson.trim();
    if (phone !== undefined) school.phone = phone.trim();

    await school.save();

    return successResponse(res, "School profile updated", { school });
  } catch (error) {
    next(error);
  }
};
