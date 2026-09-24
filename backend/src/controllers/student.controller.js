import Student from "../models/Student.js";
import User from "../models/User.js";
import Skill from "../models/Skill.js";
import Achievement from "../models/Achievement.js";
import AssessmentResult from "../models/AssessmentResult.js";
import { calculateTalentScore, calculatePlacementReadiness } from "../services/talentScore.service.js";
import { analyzeSkillGap } from "../services/skillGap.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get current student's profile
 * @route   GET /api/students/profile
 * @access  Private (Student)
 */
export const getStudentProfile = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id });

    // Auto-create student profile if missing
    if (!student) {
      student = await Student.create({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || "",
        studentType: req.user.studentType || "college"
      });
    }

    // Refresh dynamic talent score calculation
    const results = await AssessmentResult.find({ user: req.user._id });
    const skills = await Skill.find({ user: req.user._id });
    const achievements = await Achievement.find({ user: req.user._id });

    const talentScoreData = calculateTalentScore({
      assessmentResults: results,
      skills,
      achievements,
      student
    });

    const placementReadiness = calculatePlacementReadiness({
      talentScore: talentScoreData.talentScore,
      resumeScore: 80,
      projectsCount: student.projects?.length || 0
    });

    // Update if changed
    if (student.talentScore !== talentScoreData.talentScore || student.placementReadiness !== placementReadiness) {
      student.talentScore = talentScoreData.talentScore;
      student.placementReadiness = placementReadiness;
      await student.save();
    }

    return successResponse(res, "Student profile retrieved", {
      student,
      talentScoreData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update current student profile
 * @route   PUT /api/students/profile
 * @access  Private (Student)
 */
export const updateStudentProfile = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      phone,
      dateOfBirth,
      gender,
      institution,
      course,
      branch,
      year,
      class: studentClass,
      cgpa,
      city,
      country,
      bio,
      profileImage,
      targetRole,
      workPreference,
      careerGoal,
      github,
      linkedin,
      portfolio,
      projects
    } = req.body;

    let student = await Student.findOne({ user: req.user._id });
    if (!student) {
      student = new Student({ user: req.user._id, email: req.user.email });
    }

    const updatedName = (name || fullName || student.name).trim();
    student.name = updatedName;

    if (phone !== undefined) student.phone = phone;
    if (dateOfBirth !== undefined) student.dateOfBirth = dateOfBirth;
    if (gender !== undefined) student.gender = gender;
    if (institution !== undefined) student.institution = institution;
    if (course !== undefined) student.course = course;
    if (branch !== undefined) student.branch = branch;
    if (year !== undefined) student.year = year;
    if (studentClass !== undefined) student.class = studentClass;
    if (cgpa !== undefined) student.cgpa = cgpa;
    if (city !== undefined) student.city = city;
    if (country !== undefined) student.country = country;
    if (bio !== undefined) student.bio = bio;
    if (profileImage !== undefined) student.profileImage = profileImage;
    if (targetRole !== undefined) student.targetRole = targetRole;
    if (workPreference !== undefined) student.workPreference = workPreference;
    if (careerGoal !== undefined) student.careerGoal = careerGoal;
    if (github !== undefined) student.github = github;
    if (linkedin !== undefined) student.linkedin = linkedin;
    if (portfolio !== undefined) student.portfolio = portfolio;
    if (projects !== undefined && Array.isArray(projects)) student.projects = projects;

    await student.save();

    // Keep User name synced
    await User.findByIdAndUpdate(req.user._id, { name: updatedName });

    return successResponse(res, "Profile updated successfully", { student });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get student skills
 * @route   GET /api/students/skills
 * @access  Private (Student)
 */
export const getStudentSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({ score: -1 });
    const student = await Student.findOne({ user: req.user._id });
    return successResponse(res, "Skills retrieved", {
      skills,
      profileSkills: student?.skills || []
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update or add student skills
 * @route   PUT /api/students/skills
 * @access  Private (Student)
 */
export const updateStudentSkills = async (req, res, next) => {
  try {
    const { skills, skillName, score } = req.body;

    let student = await Student.findOne({ user: req.user._id });
    if (!student) {
      student = await Student.create({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email
      });
    }

    // Single skill add or update
    if (skillName) {
      const cleanName = skillName.trim();
      let skillDoc = await Skill.findOne({ user: req.user._id, name: cleanName });
      if (skillDoc) {
        skillDoc.score = score !== undefined ? score : skillDoc.score;
        await skillDoc.save();
      } else {
        await Skill.create({
          user: req.user._id,
          name: cleanName,
          score: score !== undefined ? score : 65
        });
      }

      if (!student.skills.includes(cleanName)) {
        student.skills.push(cleanName);
        await student.save();
      }
    }

    // Bulk array update
    if (Array.isArray(skills)) {
      student.skills = skills.map((s) => (typeof s === "string" ? s.trim() : s.name.trim()));
      await student.save();

      // Ensure Skill documents exist
      for (const item of skills) {
        const name = typeof item === "string" ? item.trim() : item.name.trim();
        const itemScore = typeof item === "object" && item.score ? item.score : 65;
        await Skill.findOneAndUpdate(
          { user: req.user._id, name },
          { user: req.user._id, name, score: itemScore },
          { upsert: true, new: true }
        );
      }
    }

    const updatedSkills = await Skill.find({ user: req.user._id });
    return successResponse(res, "Skills updated successfully", {
      skills: updatedSkills,
      profileSkills: student.skills
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get student achievements
 * @route   GET /api/students/achievements
 * @access  Private (Student)
 */
export const getStudentAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ user: req.user._id }).sort({ date: -1 });
    return successResponse(res, "Achievements retrieved", { achievements });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add student achievement
 * @route   POST /api/students/achievements
 * @access  Private (Student)
 */
export const addStudentAchievement = async (req, res, next) => {
  try {
    const { title, description, category, date, certificateUrl } = req.body;

    if (!title) {
      return errorResponse(res, "Achievement title is required.", 400);
    }

    const achievement = await Achievement.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category || "Academic",
      date: date || new Date(),
      certificateUrl: certificateUrl || ""
    });

    // Also push into Student embedded array for quick access
    await Student.findOneAndUpdate(
      { user: req.user._id },
      { $push: { achievements: achievement } }
    );

    return successResponse(res, "Achievement added successfully", { achievement }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get student assessment results
 * @route   GET /api/students/results
 * @access  Private (Student)
 */
export const getStudentResults = async (req, res, next) => {
  try {
    const results = await AssessmentResult.find({ user: req.user._id }).sort({ completedAt: -1 });
    return successResponse(res, "Assessment results retrieved", { results });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get student talent score and placement stats
 * @route   GET /api/students/talent-score
 * @access  Private (Student)
 */
export const getStudentTalentScore = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    const results = await AssessmentResult.find({ user: req.user._id });
    const skills = await Skill.find({ user: req.user._id });
    const achievements = await Achievement.find({ user: req.user._id });

    const talentScoreData = calculateTalentScore({
      assessmentResults: results,
      skills,
      achievements,
      student
    });

    const placementReadiness = calculatePlacementReadiness({
      talentScore: talentScoreData.talentScore,
      resumeScore: 80,
      projectsCount: student?.projects?.length || 0
    });

    return successResponse(res, "Talent score calculated successfully", {
      ...talentScoreData,
      placementReadiness
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get skill gap analysis for target role
 * @route   GET /api/students/skill-gap
 * @access  Private (Student)
 */
export const getSkillGap = async (req, res, next) => {
  try {
    const role = req.query.role || "software-developer";
    const studentSkills = await Skill.find({ user: req.user._id });
    const assessmentResults = await AssessmentResult.find({ user: req.user._id });

    const analysis = analyzeSkillGap(role, studentSkills, assessmentResults);

    return successResponse(res, "Skill gap analysis retrieved", analysis);
  } catch (error) {
    next(error);
  }
};
