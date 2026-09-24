import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get teacher profile
 * @route   GET /api/teachers/profile
 * @access  Private (Teacher)
 */
export const getTeacherProfile = async (req, res, next) => {
  try {
    let teacher = await Teacher.findOne({ user: req.user._id });

    if (!teacher) {
      teacher = await Teacher.create({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || ""
      });
    }

    return successResponse(res, "Teacher profile retrieved", { teacher });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update teacher profile
 * @route   PUT /api/teachers/profile
 * @access  Private (Teacher)
 */
export const updateTeacherProfile = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      city,
      teachingCategory,
      experience,
      qualification,
      subject,
      subjects,
      classLevel,
      teachingMode,
      specialization,
      availability,
      bio,
      profileImage
    } = req.body;

    let teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) {
      teacher = new Teacher({ user: req.user._id, email: req.user.email });
    }

    if (name) {
      teacher.name = name.trim();
      await User.findByIdAndUpdate(req.user._id, { name: name.trim() });
    }
    if (phone !== undefined) teacher.phone = phone;
    if (city !== undefined) teacher.city = city;
    if (teachingCategory !== undefined) teacher.teachingCategory = teachingCategory;
    if (experience !== undefined) teacher.experience = experience;
    if (qualification !== undefined) teacher.qualification = qualification;
    if (subject !== undefined) teacher.subject = subject;
    if (subjects !== undefined && Array.isArray(subjects)) teacher.subjects = subjects;
    if (classLevel !== undefined) teacher.classLevel = classLevel;
    if (teachingMode !== undefined) teacher.teachingMode = teachingMode;
    if (specialization !== undefined) teacher.specialization = specialization;
    if (availability !== undefined) teacher.availability = availability;
    if (bio !== undefined) teacher.bio = bio;
    if (profileImage !== undefined) teacher.profileImage = profileImage;

    await teacher.save();

    return successResponse(res, "Teacher profile updated", { teacher });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get teacher classes
 * @route   GET /api/teachers/classes
 * @access  Private (Teacher)
 */
export const getTeacherClasses = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    return successResponse(res, "Teacher classes retrieved", {
      classes: teacher?.classes || []
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get teacher enrolled students
 * @route   GET /api/teachers/students
 * @access  Private (Teacher)
 */
export const getTeacherStudents = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    return successResponse(res, "Teacher students retrieved", {
      students: teacher?.students || []
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get teacher schedule
 * @route   GET /api/teachers/schedule
 * @access  Private (Teacher)
 */
export const getTeacherSchedule = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    return successResponse(res, "Teacher schedule retrieved", {
      schedule: teacher?.schedule || []
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get teacher earnings
 * @route   GET /api/teachers/earnings
 * @access  Private (Teacher)
 */
export const getTeacherEarnings = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    return successResponse(res, "Teacher earnings retrieved", {
      earnings: teacher?.earnings || { total: 0, pending: 0, withdrawn: 0, history: [] }
    });
  } catch (error) {
    next(error);
  }
};
