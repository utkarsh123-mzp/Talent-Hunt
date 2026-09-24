import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import School from "../models/School.js";
import Recruiter from "../models/Recruiter.js";
import Organization from "../models/Organization.js";
import { generateToken, setAuthCookie, clearAuthCookie } from "../utils/generateToken.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Register a new user with corresponding role profile
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      email,
      password,
      role,
      studentType,
      phone,
      // Student specific
      institution,
      course,
      branch,
      year,
      class: studentClass,
      parentName,
      cgpa,
      city,
      // School specific
      schoolName,
      schoolType,
      schoolWebsite,
      // Recruiter specific
      companyName,
      jobRole,
      companyWebsite,
      industry,
      // Organization specific
      organizationName,
      organizationType,
      organizationWebsite,
      eventInterest,
      // Teacher specific
      teachingCategory,
      experience,
      qualification,
      subject,
      classLevel,
      teachingMode,
      identityType,
      identityNumber
    } = req.body;

    const displayName = (name || fullName || "").trim();
    if (!displayName) {
      return errorResponse(res, "Full name is required.", 400);
    }

    if (!email || !password || !role) {
      return errorResponse(res, "Email, password, and role are required.", 400);
    }

    if (password.length < 8) {
      return errorResponse(res, "Password must be at least 8 characters long.", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return errorResponse(res, "An account with this email address already exists.", 409);
    }

    // Determine student type if student
    const effectiveStudentType = role === "student" ? (studentType || "college") : null;

    // Create User
    const user = new User({
      name: displayName,
      email: normalizedEmail,
      password,
      role,
      studentType: effectiveStudentType,
      phone: phone || ""
    });

    await user.save();

    // Create corresponding profile based on role
    if (role === "student") {
      await Student.create({
        user: user._id,
        name: displayName,
        email: normalizedEmail,
        phone: phone || "",
        studentType: effectiveStudentType,
        institution: institution || "",
        course: course || "",
        branch: branch || "",
        year: year || "",
        class: studentClass || "",
        parentName: parentName || "",
        cgpa: cgpa || "",
        city: city || ""
      });
    } else if (role === "teacher") {
      const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedAppId = `TH-${datePrefix}-${randomSuffix}`;

      await Teacher.create({
        user: user._id,
        applicationId: generatedAppId,
        name: displayName,
        email: normalizedEmail,
        phone: phone || "",
        city: city || "",
        teachingCategory: teachingCategory || "",
        experience: experience || "",
        qualification: qualification || "",
        subject: subject || "",
        subjects: subject ? [subject] : [],
        classLevel: classLevel || "",
        teachingMode: teachingMode || "Online",
        identityType: identityType || "",
        identityNumber: identityNumber || ""
      });
    } else if (role === "school") {
      await School.create({
        user: user._id,
        schoolName: schoolName || displayName,
        schoolType: schoolType || "Private",
        city: city || "",
        website: schoolWebsite || "",
        contactPerson: displayName,
        email: normalizedEmail,
        phone: phone || ""
      });
    } else if (role === "recruiter") {
      await Recruiter.create({
        user: user._id,
        companyName: companyName || displayName,
        jobRole: jobRole || "Technical Recruiter",
        companyWebsite: companyWebsite || "",
        industry: industry || "Information Technology",
        contactInformation: {
          name: displayName,
          email: normalizedEmail,
          phone: phone || ""
        }
      });
    } else if (role === "organization") {
      await Organization.create({
        user: user._id,
        organizationName: organizationName || displayName,
        organizationType: organizationType || "Educational Institution",
        website: organizationWebsite || "",
        eventInterest: eventInterest || "Coding Competitions"
      });
    }

    const token = generateToken(user._id, user.role);
    setAuthCookie(res, token);

    return successResponse(
      res,
      "Registration successful",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentType: user.studentType,
          phone: user.phone
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Please provide email and password.", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return errorResponse(res, "Invalid email or password.", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, "Invalid email or password.", 401);
    }

    if (!user.isActive) {
      return errorResponse(res, "Your account has been deactivated. Please contact support.", 403);
    }

    const token = generateToken(user._id, user.role);
    setAuthCookie(res, token);

    return successResponse(
      res,
      "Login successful",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentType: user.studentType,
          phone: user.phone
        }
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    let profile = null;

    if (user.role === "student") {
      profile = await Student.findOne({ user: user._id });
    } else if (user.role === "teacher") {
      profile = await Teacher.findOne({ user: user._id });
    } else if (user.role === "school") {
      profile = await School.findOne({ user: user._id });
    } else if (user.role === "recruiter") {
      profile = await Recruiter.findOne({ user: user._id });
    } else if (user.role === "organization") {
      profile = await Organization.findOne({ user: user._id });
    }

    return successResponse(
      res,
      "User profile retrieved",
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentType: user.studentType,
          phone: user.phone
        },
        profile
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log user out & clear cookie
 * @route   POST /api/auth/logout
 * @access  Private / Public
 */
export const logout = async (req, res) => {
  clearAuthCookie(res);
  return successResponse(res, "Successfully logged out", {});
};
