/* =========================================================
   TALENTHUNT - SKILL GAP ANALYZER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotification =
        document.getElementById("closeNotification");

    const targetRole =
        document.getElementById("targetRole");

    const skillsGrid =
        document.getElementById("skillsGrid");

    const reassessBtn =
        document.getElementById("reassessBtn");


    /* =====================================================
       SKILL DATA
    ====================================================== */

    const roleSkills = {

        "software-developer": [

            {
                name: "Data Structures & Algorithms",
                icon: "⌘",
                score: 52,
                description:
                    "Important for coding rounds and technical interviews."
            },

            {
                name: "Programming",
                icon: "</>",
                score: 78,
                description:
                    "Good programming foundation with room for advanced practice."
            },

            {
                name: "DBMS",
                icon: "▤",
                score: 64,
                description:
                    "Improve queries, normalization and database concepts."
            },

            {
                name: "Operating Systems",
                icon: "▣",
                score: 71,
                description:
                    "Good understanding of core OS concepts."
            },

            {
                name: "Computer Networks",
                icon: "◎",
                score: 68,
                description:
                    "Revise networking protocols and interview questions."
            },

            {
                name: "Problem Solving",
                icon: "◆",
                score: 74,
                description:
                    "Good foundation. Focus on solving problems faster."
            }

        ],


        "frontend-developer": [

            {
                name: "HTML & CSS",
                icon: "</>",
                score: 88,
                description:
                    "Strong foundation in modern web structure and styling."
            },

            {
                name: "JavaScript",
                icon: "JS",
                score: 76,
                description:
                    "Good JavaScript foundation. Practice advanced concepts."
            },

            {
                name: "React",
                icon: "⚛",
                score: 62,
                description:
                    "Improve component architecture, hooks and state management."
            },

            {
                name: "Responsive Design",
                icon: "▣",
                score: 81,
                description:
                    "Good understanding of responsive interfaces."
            },

            {
                name: "Git & GitHub",
                icon: "⑂",
                score: 73,
                description:
                    "Practice branching, pull requests and collaboration."
            },

            {
                name: "Problem Solving",
                icon: "◆",
                score: 70,
                description:
                    "Improve algorithmic thinking for frontend coding rounds."
            }

        ],


        "backend-developer": [

            {
                name: "Programming",
                icon: "</>",
                score: 78,
                description:
                    "Strong programming foundation."
            },

            {
                name: "Node.js",
                icon: "N",
                score: 64,
                description:
                    "Practice backend architecture and asynchronous programming."
            },

            {
                name: "APIs",
                icon: "↔",
                score: 71,
                description:
                    "Good understanding of API fundamentals."
            },

            {
                name: "DBMS & SQL",
                icon: "▤",
                score: 67,
                description:
                    "Improve complex queries and database design."
            },

            {
                name: "System Design",
                icon: "◫",
                score: 48,
                description:
                    "Begin learning scalable system design concepts."
            },

            {
                name: "Problem Solving",
                icon: "◆",
                score: 72,
                description:
                    "Continue practicing coding problems."
            }

        ],


        "data-analyst": [

            {
                name: "SQL",
                icon: "▤",
                score: 78,
                description:
                    "Good SQL foundation. Practice advanced analytical queries."
            },

            {
                name: "Excel",
                icon: "▦",
                score: 84,
                description:
                    "Strong spreadsheet and data manipulation skills."
            },

            {
                name: "Power BI",
                icon: "◫",
                score: 76,
                description:
                    "Good dashboarding foundation. Improve DAX."
            },

            {
                name: "Python",
                icon: "Py",
                score: 69,
                description:
                    "Practice Pandas, NumPy and data analysis workflows."
            },

            {
                name: "Statistics",
                icon: "Σ",
                score: 57,
                description:
                    "Revise probability, distributions and descriptive statistics."
            },

            {
                name: "Data Visualization",
                icon: "▥",
                score: 81,
                description:
                    "Strong visualization foundation."
            }

        ],


        "full-stack": [

            {
                name: "HTML & CSS",
                icon: "</>",
                score: 88,
                description:
                    "Strong frontend foundation."
            },

            {
                name: "JavaScript",
                icon: "JS",
                score: 76,
                description:
                    "Good JavaScript knowledge."
            },

            {
                name: "React",
                icon: "⚛",
                score: 64,
                description:
                    "Practice advanced React patterns."
            },

            {
                name: "Node.js",
                icon: "N",
                score: 61,
                description:
                    "Improve backend development skills."
            },

            {
                name: "Database",
                icon: "▤",
                score: 67,
                description:
                    "Practice database design and advanced SQL."
            },

            {
                name: "Git & GitHub",
                icon: "⑂",
                score: 74,
                description:
                    "Good collaboration fundamentals."
            }

        ],


        "python-developer": [

            {
                name: "Python",
                icon: "Py",
                score: 82,
                description:
                    "Strong Python foundation."
            },

            {
                name: "DSA",
                icon: "⌘",
                score: 58,
                description:
                    "Practice algorithms and data structures."
            },

            {
                name: "OOP",
                icon: "◎",
                score: 72,
                description:
                    "Good understanding of object-oriented concepts."
            },

            {
                name: "SQL",
                icon: "▤",
                score: 74,
                description:
                    "Good SQL foundation."
            },

            {
                name: "APIs",
                icon: "↔",
                score: 66,
                description:
                    "Practice REST API development."
            },

            {
                name: "Problem Solving",
                icon: "◆",
                score: 70,
                description:
                    "Improve coding speed and problem-solving accuracy."
            }

        ]

    };


    /* =====================================================
       SIDEBAR
    ====================================================== */

    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    closeNotification.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !notificationPanel.contains(event.target) &&
                !notificationBtn.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       ROLE CHANGE
    ====================================================== */

    targetRole.addEventListener(
        "change",
        () => {

            renderSkills();

        }
    );


    /* =====================================================
       RENDER SKILLS
    ====================================================== */

    async function renderSkills() {

        const role =
            targetRole.value;

        let skills = roleSkills[role] || [];

        // Fetch evaluated skill gap from backend
        try {
            if (window.TalentHuntAPI && window.TalentHuntAPI.auth.isAuthenticated()) {
                const res = await window.TalentHuntAPI.students.getSkillGap(role);
                if (res.data && res.data.skills) {
                    skills = res.data.skills;
                }
            }
        } catch (err) {
            console.warn("[Skill Gap Backend Notice]", err.message);
        }


        skillsGrid.innerHTML = "";


        skills.forEach(
            skill => {

                const status =
                    getSkillStatus(
                        skill.score
                    );


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "skill-card";


                card.innerHTML = `

                    <div class="skill-top">

                        <div class="skill-name">

                            <span class="skill-icon">
                                ${skill.icon}
                            </span>

                            <strong>
                                ${skill.name}
                            </strong>

                        </div>

                        <span
                            class="skill-status ${status.className}">
                            ${status.label}
                        </span>

                    </div>


                    <div class="skill-progress">

                        <span
                            style="width: ${skill.score}%;">
                        </span>

                    </div>


                    <p>
                        ${skill.description}
                    </p>

                `;


                const scoreElement =
                    document.createElement(
                        "span"
                    );


                scoreElement.className =
                    "skill-score";


                scoreElement.textContent =
                    `${skill.score}%`;


                card
                    .querySelector(".skill-top")
                    .appendChild(
                        scoreElement
                    );


                skillsGrid.appendChild(
                    card
                );

            }
        );


        updateSummary(
            skills
        );


        updateOverallScore(
            skills
        );

    }


    /* =====================================================
       STATUS
    ====================================================== */

    function getSkillStatus(score) {

        if (score >= 75) {

            return {

                label: "Strong",

                className: "strong"

            };

        }


        if (score >= 60) {

            return {

                label: "Needs Practice",

                className: "medium"

            };

        }


        return {

            label: "Critical Gap",

            className: "weak"

        };

    }


    /* =====================================================
       SUMMARY
    ====================================================== */

    function updateSummary(skills) {

        const strong =
            skills.filter(
                skill =>
                    skill.score >= 75
            ).length;


        const medium =
            skills.filter(
                skill =>
                    skill.score >= 60 &&
                    skill.score < 75
            ).length;


        const weak =
            skills.filter(
                skill =>
                    skill.score < 60
            ).length;


        document.getElementById(
            "strongCount"
        ).textContent = strong;


        document.getElementById(
            "mediumCount"
        ).textContent = medium;


        document.getElementById(
            "weakCount"
        ).textContent = weak;

    }


    /* =====================================================
       OVERALL SCORE
    ====================================================== */

    function updateOverallScore(skills) {

        if (!skills.length) {
            return;
        }


        const total =
            skills.reduce(
                (sum, skill) =>
                    sum + skill.score,
                0
            );


        const average =
            Math.round(
                total / skills.length
            );


        document.getElementById(
            "overallScore"
        ).textContent =
            average;


        document.getElementById(
            "overallProgress"
        ).style.width =
            `${average}%`;


        const title =
            document.getElementById(
                "scoreTitle"
            );

        const description =
            document.getElementById(
                "scoreDescription"
            );


        if (average >= 85) {

            title.textContent =
                "Excellent Readiness";

            description.textContent =
                "Your skill foundation is strong. Focus on advanced interview preparation and real-world projects.";

        }

        else if (average >= 70) {

            title.textContent =
                "Good Foundation";

            description.textContent =
                "You have a solid foundation but still have some important areas to improve before placement.";

        }

        else if (average >= 55) {

            title.textContent =
                "Needs Improvement";

            description.textContent =
                "You have the basics, but consistent practice is required before you become placement-ready.";

        }

        else {

            title.textContent =
                "Major Skill Gaps";

            description.textContent =
                "Focus on your fundamentals and build a consistent preparation routine.";

        }


        updateStatusBadge(
            average
        );

    }


    /* =====================================================
       STATUS BADGE
    ====================================================== */

    function updateStatusBadge(score) {

        const badge =
            document.querySelector(
                ".score-status"
            );


        if (score >= 85) {

            badge.textContent =
                "Excellent";

            badge.style.background =
                "#e8faf4";

            badge.style.color =
                "#20b486";

        }

        else if (score >= 70) {

            badge.textContent =
                "Good";

            badge.style.background =
                "#e8faf4";

            badge.style.color =
                "#20b486";

        }

        else if (score >= 55) {

            badge.textContent =
                "Needs Work";

            badge.style.background =
                "#fff4dc";

            badge.style.color =
                "#f59e0b";

        }

        else {

            badge.textContent =
                "Critical";

            badge.style.background =
                "#fff0f0";

            badge.style.color =
                "#ef5350";

        }

    }


    /* =====================================================
       RE-ASSESS
    ====================================================== */

    reassessBtn.addEventListener(
        "click",
        () => {

            const originalText =
                reassessBtn.textContent;


            reassessBtn.textContent =
                "Analyzing...";


            reassessBtn.disabled =
                true;


            setTimeout(
                () => {

                    renderSkills();


                    reassessBtn.textContent =
                        originalText;


                    reassessBtn.disabled =
                        false;


                    alert(
                        "Skill analysis updated successfully!"
                    );

                },
                900
            );

        }
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    renderSkills();

});