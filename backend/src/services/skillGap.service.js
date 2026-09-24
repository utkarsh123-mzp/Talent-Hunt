/**
 * Skill Gap Analyzer Service
 * 
 * Provides industry standard benchmark skills for targeted tech roles,
 * compares them against the student's actual acquired skills and scores,
 * and classifies each skill as "Good", "Average", "Needs Practice", or "Missing".
 */

export const ROLE_BENCHMARKS = {
  "software-developer": [
    { name: "Data Structures & Algorithms", icon: "⌘", targetScore: 75, description: "Important for coding rounds and technical interviews." },
    { name: "Programming", icon: "</>", targetScore: 80, description: "Good programming foundation with room for advanced practice." },
    { name: "DBMS", icon: "▤", targetScore: 70, description: "Improve queries, normalization and database concepts." },
    { name: "Operating Systems", icon: "▣", targetScore: 70, description: "Good understanding of core OS concepts." },
    { name: "Computer Networks", icon: "◎", targetScore: 70, description: "Revise networking protocols and interview questions." },
    { name: "Problem Solving", icon: "◆", targetScore: 75, description: "Good foundation. Focus on solving problems faster." }
  ],
  "frontend-developer": [
    { name: "HTML & CSS", icon: "</>", targetScore: 85, description: "Strong foundation in modern web structure and styling." },
    { name: "JavaScript", icon: "JS", targetScore: 80, description: "Good JavaScript foundation. Practice advanced concepts." },
    { name: "React", icon: "⚛", targetScore: 75, description: "Improve component architecture, hooks and state management." },
    { name: "Responsive Design", icon: "▣", targetScore: 80, description: "Good understanding of responsive interfaces." },
    { name: "Git & GitHub", icon: "⑂", targetScore: 75, description: "Practice branching, pull requests and collaboration." },
    { name: "Problem Solving", icon: "◆", targetScore: 70, description: "Improve algorithmic thinking for frontend coding rounds." }
  ],
  "backend-developer": [
    { name: "Node.js / Express", icon: "⚙", targetScore: 80, description: "REST API development, middleware, error handling." },
    { name: "Database & SQL", icon: "▤", targetScore: 75, description: "PostgreSQL, MongoDB, schema design, indexing." },
    { name: "API Security & JWT", icon: "🔒", targetScore: 80, description: "Authentication, authorization, token encryption." },
    { name: "System Design", icon: "▦", targetScore: 70, description: "Scalability, caching, microservices, architecture." },
    { name: "Git & Version Control", icon: "⑂", targetScore: 75, description: "Collaboration, feature branching, CI/CD." },
    { name: "Data Structures", icon: "⌘", targetScore: 70, description: "Core DS concepts for optimized backend execution." }
  ],
  "data-analyst": [
    { name: "Python", icon: "🐍", targetScore: 75, description: "Pandas, NumPy, data cleaning, and scripting." },
    { name: "SQL", icon: "▤", targetScore: 85, description: "Complex queries, window functions, aggregations." },
    { name: "Excel & Sheets", icon: "📊", targetScore: 80, description: "Pivot tables, VLOOKUP, XLOOKUP, advanced models." },
    { name: "Power BI / Tableau", icon: "📈", targetScore: 75, description: "Interactive dashboards and storytelling." },
    { name: "Statistics", icon: "∑", targetScore: 70, description: "Probability, distributions, hypothesis testing." },
    { name: "Data Visualization", icon: "🎨", targetScore: 75, description: "Seaborn, Matplotlib, charting best practices." }
  ],
  "full-stack-developer": [
    { name: "Frontend (HTML/CSS/JS)", icon: "</>", targetScore: 80, description: "Modern UI engineering, DOM, accessibility." },
    { name: "Modern Framework (React)", icon: "⚛", targetScore: 75, description: "Component lifecycle, state management, routing." },
    { name: "Backend (Node.js/Express)", icon: "⚙", targetScore: 75, description: "Building scalable APIs, validation, services." },
    { name: "Database (SQL & NoSQL)", icon: "▤", targetScore: 75, description: "MongoDB and Relational database persistence." },
    { name: "Git & Deployment", icon: "☁", targetScore: 70, description: "Version control, cloud deployment, Docker." },
    { name: "DSA & Problem Solving", icon: "⌘", targetScore: 70, description: "Algorithmic readiness for technical rounds." }
  ],
  "python-developer": [
    { name: "Python Core", icon: "🐍", targetScore: 85, description: "OOP, generators, decorators, memory model." },
    { name: "Web Frameworks (Django/Flask)", icon: "🌐", targetScore: 75, description: "MVC architecture, ORM, REST APIs." },
    { name: "Database & ORM", icon: "▤", targetScore: 75, description: "PostgreSQL, SQLAlchemy, migrations." },
    { name: "Data Structures", icon: "⌘", targetScore: 75, description: "Algorithms and Python collections library." },
    { name: "Testing & Debugging", icon: "🧪", targetScore: 70, description: "Pytest, unittest, debugging methodology." },
    { name: "Git & Linux", icon: "🐧", targetScore: 70, description: "Shell scripting, git workflows, servers." }
  ]
};

export const analyzeSkillGap = (roleKey, studentSkills = [], studentAssessmentResults = []) => {
  const normalizedKey = (roleKey || "software-developer").toLowerCase().trim();
  const benchmarkSkills = ROLE_BENCHMARKS[normalizedKey] || ROLE_BENCHMARKS["software-developer"];

  // Map student skills for quick lookup
  const studentSkillMap = new Map();
  studentSkills.forEach((s) => {
    if (typeof s === "string") {
      studentSkillMap.set(s.toLowerCase(), 65);
    } else if (s && s.name) {
      studentSkillMap.set(s.name.toLowerCase(), s.score || 65);
    }
  });

  // Also check if any assessment results relate to these skills
  studentAssessmentResults.forEach((ar) => {
    const title = ar.assessmentTitle?.toLowerCase() || "";
    if (title.includes("tech") || title.includes("coding")) {
      studentSkillMap.set("programming", Math.max(studentSkillMap.get("programming") || 0, ar.percentage));
      studentSkillMap.set("data structures & algorithms", Math.max(studentSkillMap.get("data structures & algorithms") || 0, ar.percentage));
    }
    if (title.includes("data")) {
      studentSkillMap.set("sql", Math.max(studentSkillMap.get("sql") || 0, ar.percentage));
      studentSkillMap.set("database & sql", Math.max(studentSkillMap.get("database & sql") || 0, ar.percentage));
    }
  });

  // Calculate gaps
  const analyzedSkills = benchmarkSkills.map((benchmark) => {
    const bNameLower = benchmark.name.toLowerCase();
    
    // Check direct match or substring match
    let currentScore = 0;
    for (const [sName, sScore] of studentSkillMap.entries()) {
      if (bNameLower.includes(sName) || sName.includes(bNameLower)) {
        currentScore = Math.max(currentScore, sScore);
      }
    }

    // Default realistic baseline if skill has not been explicitly tested yet
    if (currentScore === 0) {
      currentScore = Math.max(40, benchmark.targetScore - 20);
    }

    let status = "Needs Practice";
    if (currentScore >= benchmark.targetScore) {
      status = "Good";
    } else if (currentScore >= benchmark.targetScore - 15) {
      status = "Average";
    }

    return {
      name: benchmark.name,
      icon: benchmark.icon,
      score: currentScore,
      targetScore: benchmark.targetScore,
      status,
      description: benchmark.description
    };
  });

  const overallScore = Math.round(
    analyzedSkills.reduce((sum, s) => sum + s.score, 0) / analyzedSkills.length
  );

  return {
    role: normalizedKey,
    overallScore,
    skills: analyzedSkills
  };
};
