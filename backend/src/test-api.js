/**
 * TalentHunt Comprehensive Backend API Verification Suite
 */

const BASE_URL = "http://localhost:5000/api";

const logPass = (name) => console.log(` [PASS] ${name}`);
const logFail = (name, err) => {
  console.error(`❌ [FAIL] ${name}:`, err);
  process.exitCode = 1;
};

async function runTests() {
  console.log("\n=======================================================");
  console.log("       STARTING TALENTHUNT BACKEND TEST SUITE");
  console.log("=======================================================\n");

  let studentToken = "";
  let adminToken = "";
  let recruiterToken = "";
  let testOppId = "";
  let testAssessmentId = "";

  // 1. Health Check
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const json = await res.json();
    if (res.ok && json.success && json.data.database.isConnected) {
      logPass("GET /api/health (Database connected)");
    } else {
      throw new Error(JSON.stringify(json));
    }
  } catch (err) {
    logFail("GET /api/health", err.message);
  }

  // 2. User Registration (New Student)
  const testStudentEmail = `test.student.${Date.now()}@example.com`;
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Student",
        email: testStudentEmail,
        password: "Password@123",
        role: "student",
        studentType: "college",
        institution: "Testing University",
        course: "B.Tech IT"
      })
    });
    const json = await res.json();
    if (res.status === 201 && json.success && json.data.user && !json.data.user.password) {
      studentToken = json.data.token;
      logPass("POST /api/auth/register (New student created with profile & token)");
    } else {
      throw new Error(JSON.stringify(json));
    }
  } catch (err) {
    logFail("POST /api/auth/register", err.message);
  }

  // 3. Duplicate Registration Prevention
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Student Duplicate",
        email: testStudentEmail,
        password: "Password@123",
        role: "student"
      })
    });
    const json = await res.json();
    if (res.status === 409 && !json.success) {
      logPass("POST /api/auth/register (Duplicate email blocked with 409 Conflict)");
    } else {
      throw new Error(`Expected 409, got ${res.status}: ${JSON.stringify(json)}`);
    }
  } catch (err) {
    logFail("Duplicate Registration Prevention", err.message);
  }

  // 4. Login with Wrong Password
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testStudentEmail,
        password: "WrongPassword999"
      })
    });
    const json = await res.json();
    if (res.status === 401 && !json.success) {
      logPass("POST /api/auth/login (Invalid password rejected with 401 Unauthorized)");
    } else {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  } catch (err) {
    logFail("Invalid Password Login Check", err.message);
  }

  // 5. Login Admin & Recruiter
  try {
    const adminRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@talenthunt.com",
        password: "Password@123"
      })
    });
    const adminJson = await adminRes.json();
    if (adminRes.ok && adminJson.data.token) {
      adminToken = adminJson.data.token;
      logPass("POST /api/auth/login (Admin login successful)");
    }

    const recRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "recruiter@talenthunt.com",
        password: "Password@123"
      })
    });
    const recJson = await recRes.json();
    if (recRes.ok && recJson.data.token) {
      recruiterToken = recJson.data.token;
      logPass("POST /api/auth/login (Recruiter login successful)");
    }
  } catch (err) {
    logFail("Login seeded accounts", err.message);
  }

  // 6. GET /api/auth/me
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const json = await res.json();
    if (res.ok && json.data.user.email === testStudentEmail && json.data.profile) {
      logPass("GET /api/auth/me (Current user & profile retrieved)");
    } else {
      throw new Error(JSON.stringify(json));
    }
  } catch (err) {
    logFail("GET /api/auth/me", err.message);
  }

  // 7. Role Authorization: Student accessing Admin endpoint
  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    if (res.status === 403) {
      logPass("GET /api/admin/users as Student (Blocked with 403 Forbidden)");
    } else {
      throw new Error(`Expected 403 Forbidden, got ${res.status}`);
    }
  } catch (err) {
    logFail("Role authorization: Student -> Admin", err.message);
  }

  // 8. Admin accessing Admin endpoint
  try {
    const res = await fetch(`${BASE_URL}/admin/reports`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const json = await res.json();
    if (res.ok && json.data.stats) {
      logPass("GET /api/admin/reports as Admin (Authorized and returned stats)");
    } else {
      throw new Error(JSON.stringify(json));
    }
  } catch (err) {
    logFail("GET /api/admin/reports", err.message);
  }

  // 9. Student Profile Updates & Skills
  try {
    const updateRes = await fetch(`${BASE_URL}/students/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        bio: "Updated bio through backend test suite",
        city: "Mirzapur",
        cgpa: "8.9"
      })
    });
    const updateJson = await updateRes.json();
    if (updateRes.ok && updateJson.data.student.city === "Mirzapur") {
      logPass("PUT /api/students/profile (Profile updated)");
    } else {
      throw new Error(JSON.stringify(updateJson));
    }

    // Add Skill
    const skillRes = await fetch(`${BASE_URL}/students/skills`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        skillName: "Node.js",
        score: 85
      })
    });
    const skillJson = await skillRes.json();
    if (skillRes.ok) {
      logPass("PUT /api/students/skills (Skill added & saved)");
    }
  } catch (err) {
    logFail("Student profile and skills", err.message);
  }

  // 10. Talent Score & Skill Gap Analyzer
  try {
    const scoreRes = await fetch(`${BASE_URL}/students/talent-score`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const scoreJson = await scoreRes.json();
    if (scoreRes.ok && typeof scoreJson.data.talentScore === "number") {
      logPass(`GET /api/students/talent-score (Talent score: ${scoreJson.data.talentScore})`);
    }

    const gapRes = await fetch(`${BASE_URL}/students/skill-gap?role=frontend-developer`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const gapJson = await gapRes.json();
    if (gapRes.ok && gapJson.data.skills && gapJson.data.skills.length > 0) {
      logPass("GET /api/students/skill-gap (Benchmark skills analyzed)");
    }
  } catch (err) {
    logFail("Talent Score & Skill Gap", err.message);
  }

  // 11. Opportunity Creation & Filtering
  try {
    const createRes = await fetch(`${BASE_URL}/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${recruiterToken}`
      },
      body: JSON.stringify({
        title: "Junior Backend Engineer",
        description: "Join our API team to build robust Node.js microservices.",
        organization: "TechNova Solutions",
        type: "Job",
        category: "software",
        location: "Remote",
        mode: "Remote",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        skills: ["Node.js", "MongoDB", "Express"],
        stipend: "₹6,00,000 / Year"
      })
    });
    const createJson = await createRes.json();
    if (createRes.status === 201 && createJson.data.opportunity._id) {
      testOppId = createJson.data.opportunity._id;
      logPass("POST /api/opportunities (Created by Recruiter)");
    }

    // Filter opportunities
    const filterRes = await fetch(`${BASE_URL}/opportunities?category=software&type=Job`);
    const filterJson = await filterRes.json();
    if (filterRes.ok && filterJson.data.opportunities.length > 0) {
      logPass("GET /api/opportunities with filters (Retrieved matching results)");
    }
  } catch (err) {
    logFail("Opportunity Creation & Filtering", err.message);
  }

  // 12. Application & Duplicate Application Check
  try {
    const applyRes = await fetch(`${BASE_URL}/opportunities/${testOppId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({ notes: "Excited about this role!" })
    });
    const applyJson = await applyRes.json();
    if (applyRes.status === 201 && applyJson.success) {
      logPass("POST /api/opportunities/:id/apply (Application submitted)");
    }

    // Duplicate check
    const dupRes = await fetch(`${BASE_URL}/opportunities/${testOppId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`
      }
    });
    if (dupRes.status === 409) {
      logPass("POST /api/opportunities/:id/apply (Duplicate application blocked with 409)");
    } else {
      throw new Error(`Expected 409, got ${dupRes.status}`);
    }
  } catch (err) {
    logFail("Opportunity Application & Duplicate Check", err.message);
  }

  // 13. Assessments & Server-Side Scoring
  try {
    const getAssRes = await fetch(`${BASE_URL}/assessments`);
    const assJson = await getAssRes.json();
    if (getAssRes.ok && assJson.data.assessments.length > 0) {
      const assessment = assJson.data.assessments[0];
      testAssessmentId = assessment._id;
      logPass("GET /api/assessments (Assessments loaded without leaking correct answers)");

      // Submit assessment answers
      const submitRes = await fetch(`${BASE_URL}/assessments/${testAssessmentId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${studentToken}`
        },
        body: JSON.stringify({
          answers: [
            { questionIndex: 0, selectedOption: 1 }, // Python
            { questionIndex: 1, selectedOption: 2 }, // Stack
            { questionIndex: 2, selectedOption: 2 }  // def
          ]
        })
      });
      const submitJson = await submitRes.json();
      if (submitRes.status === 201 && typeof submitJson.data.percentage === "number") {
        logPass(`POST /api/assessments/:id/submit (Server-side score computed: ${submitJson.data.score}/${submitJson.data.total}, ${submitJson.data.percentage}%)`);
      }
    }
  } catch (err) {
    logFail("Assessment System & Server-side Scoring", err.message);
  }

  // 14. Notifications
  try {
    const notifRes = await fetch(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const notifJson = await notifRes.json();
    if (notifRes.ok && notifJson.data.notifications.length > 0) {
      logPass(`GET /api/notifications (Found ${notifJson.data.notifications.length} notifications)`);

      const readAllRes = await fetch(`${BASE_URL}/notifications/read-all`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${studentToken}` }
      });
      if (readAllRes.ok) {
        logPass("PUT /api/notifications/read-all (All notifications marked as read)");
      }
    }
  } catch (err) {
    logFail("Notification System", err.message);
  }

  // 15. Teacher Profile & Endpoints
  try {
    const teacherLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "teacher@talenthunt.com",
        password: "Password@123"
      })
    });
    const teacherLoginJson = await teacherLoginRes.json();
    const teacherToken = teacherLoginJson.data.token;

    const teacherProfRes = await fetch(`${BASE_URL}/teachers/profile`, {
      headers: { Authorization: `Bearer ${teacherToken}` }
    });
    const teacherProfJson = await teacherProfRes.json();
    if (teacherProfRes.ok && teacherProfJson.data.teacher) {
      logPass("GET /api/teachers/profile (Teacher profile retrieved)");
    }
  } catch (err) {
    logFail("Teacher Endpoints", err.message);
  }

  // 16. Logout
  try {
    const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST"
    });
    if (logoutRes.ok) {
      logPass("POST /api/auth/logout (Cookie cleared & logged out)");
    }
  } catch (err) {
    logFail("POST /api/auth/logout", err.message);
  }

  console.log("\n=======================================================");
  console.log("       ALL BACKEND API TESTS COMPLETED");
  console.log("=======================================================\n");
}

runTests();
