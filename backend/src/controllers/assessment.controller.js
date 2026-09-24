import Assessment from "../models/Assessment.js";
import AssessmentResult from "../models/AssessmentResult.js";
import Student from "../models/Student.js";
import Skill from "../models/Skill.js";
import Notification from "../models/Notification.js";
import { calculateTalentScore } from "../services/talentScore.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get all active assessments (sanitized without answers)
 * @route   GET /api/assessments
 * @access  Public / Private
 */
export const getAssessments = async (req, res, next) => {
  try {
    const { audience, category, classLevel } = req.query;
    const filter = { isActive: true };

    if (audience && audience !== "all") {
      filter.targetAudience = { $in: [audience, "all"] };
    }
    if (category) {
      filter.category = new RegExp(category, "i");
    }
    if (classLevel) {
      filter.classLevel = classLevel;
    }

    const assessments = await Assessment.find(filter)
      .select("-questions.answer -questions.explanation")
      .sort({ createdAt: -1 });

    return successResponse(res, "Assessments retrieved", { assessments });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single assessment by ID without answers
 * @route   GET /api/assessments/:id
 * @access  Private
 */
export const getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .select("-questions.answer -questions.explanation");

    if (!assessment) {
      return errorResponse(res, "Assessment not found", 404);
    }

    return successResponse(res, "Assessment details retrieved", { assessment });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit assessment answers & calculate score SERVER-SIDE
 * @route   POST /api/assessments/:id/submit
 * @access  Private (Student)
 */
export const submitAssessment = async (req, res, next) => {
  try {
    const assessmentId = req.params.id;
    const { answers = [] } = req.body;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return errorResponse(res, "Assessment not found", 404);
    }

    const totalQuestions = assessment.questions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const processedAnswers = [];

    // Evaluate answers strictly on the server
    assessment.questions.forEach((q, index) => {
      // Find submission for this question index
      const submitted = answers.find(
        (a) => a.questionIndex === index || a.questionIndex === Number(index)
      );

      const selectedOption = submitted !== undefined && submitted.selectedOption !== null && submitted.selectedOption !== undefined
        ? Number(submitted.selectedOption)
        : null;

      if (selectedOption === null || isNaN(selectedOption)) {
        unansweredCount++;
        processedAnswers.push({
          questionIndex: index,
          selectedOption: -1,
          correctOption: q.answer,
          isCorrect: false
        });
      } else if (selectedOption === q.answer) {
        correctCount++;
        processedAnswers.push({
          questionIndex: index,
          selectedOption,
          correctOption: q.answer,
          isCorrect: true
        });
      } else {
        wrongCount++;
        processedAnswers.push({
          questionIndex: index,
          selectedOption,
          correctOption: q.answer,
          isCorrect: false
        });
      }
    });

    const score = correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Save assessment result
    const result = await AssessmentResult.create({
      user: req.user._id,
      assessment: assessment._id,
      assessmentTitle: assessment.title,
      score,
      total: totalQuestions,
      percentage,
      correctCount,
      wrongCount,
      unansweredCount,
      answers: processedAnswers,
      completedAt: new Date()
    });

    // Update relevant skill score
    let skillCategory = assessment.title;
    if (skillCategory.includes("Technical")) skillCategory = "Technical Skills";
    if (skillCategory.includes("Aptitude")) skillCategory = "Aptitude & Reasoning";
    if (skillCategory.includes("Coding")) skillCategory = "Coding Challenge";
    if (skillCategory.includes("Data")) skillCategory = "Data Analytics";

    await Skill.findOneAndUpdate(
      { user: req.user._id, name: skillCategory },
      {
        user: req.user._id,
        name: skillCategory,
        score: percentage,
        verified: percentage >= 60,
        lastAssessedAt: new Date()
      },
      { upsert: true, new: true }
    );

    // Recompute talent score for student
    const student = await Student.findOne({ user: req.user._id });
    if (student) {
      const allResults = await AssessmentResult.find({ user: req.user._id });
      const allSkills = await Skill.find({ user: req.user._id });

      const talentData = calculateTalentScore({
        assessmentResults: allResults,
        skills: allSkills,
        achievements: student.achievements,
        student
      });

      student.talentScore = talentData.talentScore;
      await student.save();
    }

    // Trigger notification
    await Notification.create({
      user: req.user._id,
      title: "Assessment Result Published",
      message: `You scored ${percentage}% (${correctCount}/${totalQuestions}) in "${assessment.title}".`,
      type: "assessment",
      link: "/frontend/html/dashboard/talent-score.html"
    });

    return successResponse(
      res,
      "Assessment submitted and scored successfully",
      {
        resultId: result._id,
        assessmentTitle: assessment.title,
        score,
        total: totalQuestions,
        percentage,
        correctCount,
        wrongCount,
        unansweredCount
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get assessment result details by assessment ID
 * @route   GET /api/assessments/:id/results
 * @access  Private (Owner or Admin)
 */
export const getAssessmentResults = async (req, res, next) => {
  try {
    const results = await AssessmentResult.find({
      assessment: req.params.id,
      user: req.user._id
    }).sort({ completedAt: -1 });

    return successResponse(res, "Assessment results retrieved", { results });
  } catch (error) {
    next(error);
  }
};
