import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";
import School from "./models/School.js";
import Recruiter from "./models/Recruiter.js";
import Organization from "./models/Organization.js";
import Opportunity from "./models/Opportunity.js";
import Assessment from "./models/Assessment.js";
import AssessmentResult from "./models/AssessmentResult.js";
import Skill from "./models/Skill.js";
import Achievement from "./models/Achievement.js";
import Notification from "./models/Notification.js";

const seedData = async () => {
  try {
    await connectDB();
    console.log("[Seed] Starting database wipe and seed...");

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Teacher.deleteMany({}),
      School.deleteMany({}),
      Recruiter.deleteMany({}),
      Organization.deleteMany({}),
      Opportunity.deleteMany({}),
      Assessment.deleteMany({}),
      AssessmentResult.deleteMany({}),
      Skill.deleteMany({}),
      Achievement.deleteMany({}),
      Notification.deleteMany({})
    ]);

    console.log("[Seed] Existing data cleared.");

    // ==========================================
    // 1. CREATE USERS & ROLES
    // Development-only credentials (Min 8 chars, mixed case/numbers)
    // ==========================================
    const password = "Password@123";

    // Admin
    const adminUser = await User.create({
      name: "TalentHunt Admin",
      email: "admin@talenthunt.com",
      password,
      role: "admin",
      phone: "+91 9876543210"
    });

    // College Student
    const studentUser = await User.create({
      name: "Utkarsh Upadhyay",
      email: "student@talenthunt.com",
      password,
      role: "student",
      studentType: "college",
      phone: "+91 9876543211"
    });

    // School Student
    const schoolStudentUser = await User.create({
      name: "Aarav Sharma",
      email: "schoolstudent@talenthunt.com",
      password,
      role: "student",
      studentType: "school",
      phone: "+91 9876543212"
    });

    // Teacher
    const teacherUser = await User.create({
      name: "Dr. Priya Verma",
      email: "teacher@talenthunt.com",
      password,
      role: "teacher",
      phone: "+91 9876543213"
    });

    // Recruiter
    const recruiterUser = await User.create({
      name: "Rohit Malhotra",
      email: "recruiter@talenthunt.com",
      password,
      role: "recruiter",
      phone: "+91 9876543214"
    });

    // Organization
    const orgUser = await User.create({
      name: "Tech Innovation Hub",
      email: "org@talenthunt.com",
      password,
      role: "organization",
      phone: "+91 9876543215"
    });

    // School
    const schoolUser = await User.create({
      name: "Delhi Public School",
      email: "school@talenthunt.com",
      password,
      role: "school",
      phone: "+91 9876543216"
    });

    // ==========================================
    // 2. CREATE PROFILES
    // ==========================================

    // College Student Profile
    const studentProfile = await Student.create({
      user: studentUser._id,
      name: studentUser.name,
      email: studentUser.email,
      phone: studentUser.phone,
      studentType: "college",
      institution: "Kashi Institute Of Technology",
      course: "B.Tech Computer Science & Engineering",
      branch: "Computer Science",
      year: "4th Year",
      cgpa: "8.4",
      city: "Varanasi",
      country: "India",
      bio: "Passionate full-stack developer eager to build resilient web applications.",
      targetRole: "software-developer",
      workPreference: "Remote",
      careerGoal: "Become a Senior Software Engineer specializing in distributed systems.",
      github: "https://github.com/utkarsh123-mzp",
      linkedin: "https://linkedin.com/in/utkarsh-dev",
      skills: ["Python", "JavaScript", "HTML", "CSS", "SQL", "React", "Node.js", "Git"],
      achievements: [
        {
          title: "1st Place - Inter-College Hackathon 2025",
          description: "Built an AI-assisted healthcare diagnosis dashboard.",
          category: "Hackathon",
          date: new Date("2025-11-15")
        },
        {
          title: "Certified Python Developer",
          description: "Scored in top 5% nationally.",
          category: "Certification",
          date: new Date("2026-01-10")
        }
      ],
      projects: [
        {
          title: "TalentHunt Platform",
          description: "Full-stack talent assessment and discovery engine.",
          link: "https://github.com/utkarsh123-mzp/Talent-Hunt"
        }
      ],
      talentScore: 78,
      placementReadiness: 82
    });

    // School Student Profile
    await Student.create({
      user: schoolStudentUser._id,
      name: schoolStudentUser.name,
      email: schoolStudentUser.email,
      phone: schoolStudentUser.phone,
      studentType: "school",
      institution: "St. Xavier Senior Secondary School",
      class: "Class 10",
      parentName: "Rajesh Sharma",
      city: "Lucknow",
      skills: ["Mathematics", "Science", "Basic Coding", "English"],
      talentScore: 72,
      placementReadiness: 65
    });

    // Teacher Profile
    await Teacher.create({
      user: teacherUser._id,
      applicationId: "TH-20260924-1001",
      name: teacherUser.name,
      email: teacherUser.email,
      phone: teacherUser.phone,
      city: "Lucknow",
      teachingCategory: "Mathematics & Computer Science",
      experience: "5+ Years",
      qualification: "Ph.D. in Computer Science",
      subject: "Mathematics",
      subjects: ["Mathematics", "Computer Science", "Python"],
      classLevel: "Class 9–12 & College",
      teachingMode: "Online",
      specialization: "Advanced Calculus & Data Structures",
      verificationStatus: "verified",
      currentStage: "completed",
      availability: "Weekdays 4 PM - 8 PM",
      bio: "Dedicated educator with 5+ years of coaching students for national Olympiads and placement exams.",
      earnings: {
        total: 72000,
        pending: 12000,
        withdrawn: 60000,
        history: [
          { month: "August 2026", amount: 24000, status: "completed" },
          { month: "September 2026", amount: 36000, status: "completed" }
        ]
      },
      classes: [
        { title: "Class 10 Mathematics Masterclass", subject: "Mathematics", studentCount: 24, schedule: "Mon, Wed, Fri 5 PM", status: "active" },
        { title: "Python for Beginners", subject: "Computer Science", studentCount: 18, schedule: "Tue, Thu 6 PM", status: "active" }
      ],
      students: [
        { name: "Aarav Sharma", class: "Class 10", subject: "Mathematics" },
        { name: "Riya Sen", class: "Class 10", subject: "Mathematics" }
      ]
    });

    // Recruiter Profile
    await Recruiter.create({
      user: recruiterUser._id,
      companyName: "TechNova Solutions",
      jobRole: "Lead Technical Recruiter",
      companyWebsite: "https://technova.example.com",
      industry: "Information Technology",
      contactInformation: {
        name: recruiterUser.name,
        email: recruiterUser.email,
        phone: recruiterUser.phone
      }
    });

    // Organization Profile
    await Organization.create({
      user: orgUser._id,
      organizationName: "Global Hackathon Network",
      organizationType: "Event Organizer",
      website: "https://globalhackathons.example.org",
      eventInterest: "Coding Competitions"
    });

    // School Profile
    await School.create({
      user: schoolUser._id,
      schoolName: "Delhi Public School",
      schoolType: "Private",
      city: "Delhi",
      website: "https://dps.example.edu",
      contactPerson: "Dr. S. K. Gupta",
      email: schoolUser.email,
      phone: schoolUser.phone
    });

    // ==========================================
    // 3. SEED SKILLS FOR STUDENT
    // ==========================================
    const skillsList = [
      { name: "JavaScript", score: 82, verified: true },
      { name: "Python", score: 85, verified: true },
      { name: "HTML & CSS", score: 88, verified: true },
      { name: "SQL", score: 74, verified: true },
      { name: "Data Structures & Algorithms", score: 70, verified: false },
      { name: "Problem Solving", score: 78, verified: true }
    ];

    for (const sk of skillsList) {
      await Skill.create({
        user: studentUser._id,
        name: sk.name,
        score: sk.score,
        verified: sk.verified,
        lastAssessedAt: new Date()
      });
    }

    // ==========================================
    // 4. SEED ASSESSMENTS
    // Preserving existing frontend questions
    // ==========================================
    const assessmentsData = [
      {
        title: "Technical Skills",
        category: "Software Development",
        targetAudience: "college",
        durationMinutes: 20,
        totalQuestions: 10,
        questions: [
          {
            question: "Which of the following is a programming language?",
            options: ["HTML", "Python", "CSS", "JSON"],
            answer: 1,
            skillCategory: "Programming"
          },
          {
            question: "Which data structure follows the LIFO principle?",
            options: ["Queue", "Array", "Stack", "Linked List"],
            answer: 2,
            skillCategory: "Data Structures"
          },
          {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "define", "def", "fun"],
            answer: 2,
            skillCategory: "Python"
          },
          {
            question: "Which technology is used to style a web page?",
            options: ["HTML", "CSS", "SQL", "Python"],
            answer: 1,
            skillCategory: "Web Development"
          },
          {
            question: "What does SQL stand for?",
            options: [
              "Structured Query Language",
              "Simple Query Language",
              "System Query Logic",
              "Structured Question Language"
            ],
            answer: 0,
            skillCategory: "DBMS"
          },
          {
            question: "Which protocol is commonly used to transfer web pages?",
            options: ["HTTP", "FTP", "SMTP", "SSH"],
            answer: 0,
            skillCategory: "Computer Networks"
          },
          {
            question: "Which JavaScript keyword declares a block-scoped variable?",
            options: ["var", "let", "define", "variable"],
            answer: 1,
            skillCategory: "JavaScript"
          },
          {
            question: "Which language is primarily used to retrieve data from relational databases?",
            options: ["HTML", "SQL", "CSS", "XML"],
            answer: 1,
            skillCategory: "DBMS"
          },
          {
            question: "Which of the following is an operating system?",
            options: ["MySQL", "Linux", "Python", "Git"],
            answer: 1,
            skillCategory: "Operating Systems"
          },
          {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
            answer: 2,
            skillCategory: "Algorithms"
          }
        ]
      },
      {
        title: "Aptitude & Reasoning",
        category: "Analytical Thinking",
        targetAudience: "college",
        durationMinutes: 15,
        totalQuestions: 5,
        questions: [
          {
            question: "If 5 + 3 = 8, what is 8 + 7?",
            options: ["12", "13", "15", "16"],
            answer: 2,
            skillCategory: "Quantitative"
          },
          {
            question: "What comes next in the sequence: 2, 4, 6, 8, ?",
            options: ["9", "10", "11", "12"],
            answer: 1,
            skillCategory: "Logical Reasoning"
          },
          {
            question: "What is 25% of 200?",
            options: ["25", "40", "50", "75"],
            answer: 2,
            skillCategory: "Quantitative"
          },
          {
            question: "If A is taller than B and B is taller than C, who is the shortest?",
            options: ["A", "B", "C", "Cannot determine"],
            answer: 2,
            skillCategory: "Logical Reasoning"
          },
          {
            question: "What is the average of 10, 20, and 30?",
            options: ["15", "20", "25", "30"],
            answer: 1,
            skillCategory: "Quantitative"
          }
        ]
      },
      {
        title: "Class 10 Science & Aptitude",
        category: "School Academics",
        targetAudience: "school",
        classLevel: "Class 10",
        durationMinutes: 15,
        totalQuestions: 5,
        questions: [
          {
            question: "What is the chemical formula of Water?",
            options: ["CO2", "H2O", "O2", "NaCl"],
            answer: 1,
            skillCategory: "Chemistry"
          },
          {
            question: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
            answer: 2,
            skillCategory: "Biology"
          },
          {
            question: "What is the SI unit of force?",
            options: ["Joule", "Pascal", "Newton", "Watt"],
            answer: 2,
            skillCategory: "Physics"
          },
          {
            question: "What is the value of acceleration due to gravity on Earth?",
            options: ["9.8 m/s²", "10.5 m/s²", "8.9 m/s²", "12 m/s²"],
            answer: 0,
            skillCategory: "Physics"
          },
          {
            question: "Which gas is evolved when acid reacts with active metal?",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
            answer: 2,
            skillCategory: "Chemistry"
          }
        ]
      }
    ];

    const createdAssessments = await Assessment.insertMany(assessmentsData);

    // Seed sample completed assessment result for student
    await AssessmentResult.create({
      user: studentUser._id,
      assessment: createdAssessments[0]._id,
      assessmentTitle: createdAssessments[0].title,
      score: 8,
      total: 10,
      percentage: 80,
      correctCount: 8,
      wrongCount: 2,
      unansweredCount: 0,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    });

    // ==========================================
    // 5. SEED OPPORTUNITIES
    // ==========================================
    const sampleOpportunities = [
      {
        title: "Software Developer Intern",
        description: "Work with a high-growth engineering team to build scalable full-stack web applications and solve real-world problems.",
        organization: "TechNova Solutions",
        type: "Internship",
        category: "software",
        location: "Remote",
        mode: "Work From Home",
        audience: "college",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        stipend: "₹20,000 / Month",
        skills: ["Python", "JavaScript", "SQL", "React"],
        eligibility: "Pre-final and Final year B.Tech/BCA/MCA students",
        link: "https://technova.example.com/careers",
        icon: "ph-code",
        recommended: true,
        createdBy: recruiterUser._id,
        status: "active"
      },
      {
        title: "Data Analyst Intern",
        description: "Analyze business metrics, generate automated reports and build interactive dashboards that drive executive decision making.",
        organization: "DataSphere Analytics",
        type: "Internship",
        category: "data",
        location: "Bangalore",
        mode: "Hybrid",
        audience: "college",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        stipend: "₹18,000 / Month",
        skills: ["Python", "SQL", "Power BI", "Excel"],
        eligibility: "Students with strong analytical and quantitative foundation",
        link: "https://datasphere.example.com/intern",
        icon: "ph-chart-bar",
        recommended: true,
        createdBy: recruiterUser._id,
        status: "active"
      },
      {
        title: "National Coding Challenge 2026",
        description: "Compete with 10,000+ top student developers across the nation. Win cash prizes and direct interview opportunities.",
        organization: "Global Hackathon Network",
        type: "Competition",
        category: "software",
        location: "Online",
        mode: "Online",
        audience: "all",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        fee: "Free Entry",
        stipend: "₹1,00,000 Prize Pool",
        skills: ["Algorithms", "Data Structures", "Problem Solving"],
        eligibility: "Open to all school and college students",
        link: "https://hackathon.example.org",
        icon: "ph-trophy",
        recommended: true,
        createdBy: orgUser._id,
        status: "active"
      },
      {
        title: "High School STEM Scholarship",
        description: "Financial grant and mentorship program for meritorious school students excelling in Science and Mathematics.",
        organization: "EduCare Foundation",
        type: "Scholarship",
        category: "general",
        location: "National",
        mode: "Online",
        audience: "school",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        fee: "Free",
        stipend: "₹50,000 Annual Grant",
        skills: ["Science", "Mathematics"],
        eligibility: "Class 8 to Class 10 students with 80%+ aggregate",
        link: "https://educare.example.org",
        icon: "ph-graduation-cap",
        recommended: false,
        createdBy: orgUser._id,
        status: "active"
      },
      {
        title: "Senior Mathematics Educator",
        description: "Teach Mathematics to school students (Class 9-10) with emphasis on conceptual clarity, problem solving, and CBSE/ICSE exam prep.",
        organization: "Delhi Public School",
        type: "Job",
        category: "teaching",
        location: "Lucknow",
        mode: "One-to-One",
        audience: "teacher",
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        fee: "₹15,000 / Month",
        stipend: "₹15,000 / Month",
        skills: ["Mathematics", "Pedagogy", "Curriculum Planning"],
        eligibility: "Graduates / Postgraduates in Mathematics with 2+ years teaching experience",
        link: "https://dps.example.edu/careers",
        icon: "ph-chalkboard-teacher",
        recommended: true,
        createdBy: schoolUser._id,
        status: "active"
      }
    ];

    await Opportunity.insertMany(sampleOpportunities);

    // ==========================================
    // 6. SEED NOTIFICATIONS
    // ==========================================
    await Notification.create([
      {
        user: studentUser._id,
        title: "Welcome to TalentHunt!",
        message: "Your profile is set up. Take your first assessment to unlock your Talent Score.",
        type: "system",
        link: "/frontend/html/dashboard/assessments.html"
      },
      {
        user: studentUser._id,
        title: "New Opportunity Match",
        message: "TechNova Solutions is hiring Software Developer Interns matching your skill profile.",
        type: "opportunity",
        link: "/frontend/html/dashboard/opportunities.html"
      }
    ]);

    console.log("\n=======================================================");
    console.log("       TALENTHUNT DATABASE SEED COMPLETED");
    console.log("=======================================================");
    console.log("Sample Users created (Password for all: Password@123):");
    console.log(" • Admin:        admin@talenthunt.com");
    console.log(" • College Dev:  student@talenthunt.com");
    console.log(" • School Dev:   schoolstudent@talenthunt.com");
    console.log(" • Teacher:      teacher@talenthunt.com");
    console.log(" • Recruiter:    recruiter@talenthunt.com");
    console.log(" • Organization: org@talenthunt.com");
    console.log(" • School:       school@talenthunt.com");
    console.log("Assessments created: 3");
    console.log("Opportunities created: 5");
    console.log("=======================================================\n");

    process.exit(0);
  } catch (err) {
    console.error("[Seed Error]", err);
    process.exit(1);
  }
};

seedData();
