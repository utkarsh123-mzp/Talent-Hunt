/**
 * Talent Score & Placement Readiness Calculation Engine
 * 
 * Formula Definition:
 * -------------------
 * 1. Assessment Performance (Weight: 60%)
 *    - Average percentage of all completed assessments.
 *    - If no assessments completed, default base is 0.
 * 
 * 2. Skill Proficiency (Weight: 30%)
 *    - Average score of student's verified and logged skills (0-100).
 * 
 * 3. Achievement & Profile Completeness Bonus (Weight: 10%)
 *    - 2 points per achievement logged (capped at 6 points).
 *    - 4 points for having completed profile (education, resume, target role).
 * 
 * Final Talent Score = Math.round((AssessmentAvg * 0.6) + (SkillAvg * 0.3) + Bonus)
 * Clamped between 0 and 100.
 * 
 * Placement Readiness Score = Math.round(
 *   (TalentScore * 0.5) + (ATSScore * 0.3) + (ProjectCountBonus * 0.2)
 * )
 */

export const calculateAssessmentAverage = (results = []) => {
  if (!results || results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + (Number(r.percentage) || 0), 0);
  return Math.round(total / results.length);
};

export const calculateSkillAverage = (skills = []) => {
  if (!skills || skills.length === 0) return 50; // default baseline
  const total = skills.reduce((sum, s) => {
    const score = typeof s === "object" ? (s.score || 50) : 60;
    return sum + score;
  }, 0);
  return Math.round(total / skills.length);
};

export const calculateTalentScore = ({ assessmentResults = [], skills = [], achievements = [], student = null }) => {
  const assessmentAvg = calculateAssessmentAverage(assessmentResults);
  const skillAvg = calculateSkillAverage(skills);

  // Bonus for achievements (max 6 points)
  const achievementBonus = Math.min((achievements?.length || 0) * 2, 6);

  // Profile completeness bonus (max 4 points)
  let profileBonus = 0;
  if (student) {
    if (student.institution && student.course) profileBonus += 2;
    if (student.resume) profileBonus += 1;
    if (student.targetRole) profileBonus += 1;
  }

  const bonus = achievementBonus + profileBonus;

  // Calculate weighted score
  let weightedScore = 0;
  if (assessmentResults.length > 0) {
    weightedScore = (assessmentAvg * 0.60) + (skillAvg * 0.30) + bonus;
  } else {
    // If no assessments yet, reflect skill baseline and bonus
    weightedScore = (skillAvg * 0.50) + bonus;
  }

  const finalScore = Math.min(100, Math.max(0, Math.round(weightedScore)));

  // Performance status message
  let statusMessage = "Complete assessments to build your score";
  if (assessmentResults.length > 0) {
    if (finalScore >= 80) statusMessage = "Excellent performance";
    else if (finalScore >= 60) statusMessage = "Good performance";
    else if (finalScore >= 40) statusMessage = "Keep improving your skills";
    else statusMessage = "More practice recommended";
  }

  return {
    talentScore: finalScore,
    assessmentAverage: assessmentAvg,
    skillAverage: skillAvg,
    completedAssessmentsCount: assessmentResults.length,
    statusMessage
  };
};

export const calculatePlacementReadiness = ({ talentScore = 0, resumeScore = 75, projectsCount = 0 }) => {
  const projectScore = Math.min(100, projectsCount * 25); // up to 4 projects = 100
  const readiness = (talentScore * 0.50) + (resumeScore * 0.30) + (projectScore * 0.20);
  return Math.min(100, Math.max(0, Math.round(readiness)));
};
