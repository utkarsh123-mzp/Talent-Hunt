document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================== */

    const studentName =
        document.getElementById("studentName");

    const skillLevel =
        document.getElementById("skillLevel");

    const skillLevelText =
        document.getElementById("skillLevelText");

    const skillPercentage =
        document.getElementById("skillPercentage");

    const skillLevelProgress =
        document.getElementById("skillLevelProgress");

    const strongCount =
        document.getElementById("strongCount");

    const improveCount =
        document.getElementById("improveCount");

    const assessmentCount =
        document.getElementById("assessmentCount");

    const strongSkills =
        document.getElementById("strongSkills");

    const weakSkills =
        document.getElementById("weakSkills");

    const assessmentPerformance =
        document.getElementById(
            "assessmentPerformance"
        );

    const skillGaps =
        document.getElementById("skillGaps");

    const recommendations =
        document.getElementById("recommendations");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".sidebar");


    /* =========================================
       STUDENT NAME
    ========================================== */

    const savedName =
        localStorage.getItem("studentName");

    if (savedName && studentName) {

        studentName.textContent =
            savedName;

    }


    /* =========================================
       ASSESSMENT DATA
    ========================================== */

    const assessments = [

        {
            name: "Technical Skills",
            icon: "ph-code",
            skill: "Technical Skills"
        },

        {
            name: "Aptitude & Reasoning",
            icon: "ph-brain",
            skill: "Problem Solving"
        },

        {
            name: "Coding Challenge",
            icon: "ph-terminal-window",
            skill: "Coding"
        },

        {
            name: "Communication Skills",
            icon: "ph-chats",
            skill: "Communication"
        },

        {
            name: "Creativity & Innovation",
            icon: "ph-lightbulb",
            skill: "Creativity"
        },

        {
            name: "Data Analytics",
            icon: "ph-chart-bar",
            skill: "Data Analytics"
        }

    ];


    /* =========================================
       GET RESULTS
    ========================================== */

    const assessmentResults =
        JSON.parse(
            localStorage.getItem(
                "assessmentResults"
            )
        ) || {};


    /* =========================================
       COLLECT COMPLETED RESULTS
    ========================================== */

    const completed = assessments
        .filter(function (assessment) {

            const result =
                assessmentResults[
                    assessment.name
                ];

            return (
                result &&
                result.percentage !== undefined
            );

        })
        .map(function (assessment) {

            const result =
                assessmentResults[
                    assessment.name
                ];

            return {

                ...assessment,

                percentage:
                    Number(result.percentage),

                correct:
                    Number(result.correct || 0),

                total:
                    Number(result.total || 0)

            };

        });


    /* =========================================
       NO DATA
    ========================================== */

    if (completed.length === 0) {

        showEmpty();

        return;
    }


    /* =========================================
       OVERALL SCORE
    ========================================== */

    const totalScore =
        completed.reduce(
            function (sum, item) {

                return sum + item.percentage;

            },
            0
        );


    const overallScore =
        Math.round(
            totalScore / completed.length
        );


    /* =========================================
       UPDATE OVERVIEW
    ========================================== */

    skillPercentage.textContent =
        overallScore + "%";

    skillLevelProgress.style.width =
        overallScore + "%";

    assessmentCount.textContent =
        completed.length;


    /* =========================================
       SKILL LEVEL
    ========================================== */

    if (overallScore >= 80) {

        skillLevel.textContent =
            "Advanced";

        skillLevelText.textContent =
            "You demonstrate strong performance across your completed assessments.";

    }

    else if (overallScore >= 60) {

        skillLevel.textContent =
            "Intermediate";

        skillLevelText.textContent =
            "You have a good foundation. Focus on improving weaker areas.";

    }

    else if (overallScore >= 40) {

        skillLevel.textContent =
            "Developing";

        skillLevelText.textContent =
            "Your foundation is developing. Regular practice can improve your performance.";

    }

    else {

        skillLevel.textContent =
            "Beginner";

        skillLevelText.textContent =
            "Start with fundamental concepts and build your skills step by step.";

    }


    /* =========================================
       STRONG / WEAK
    ========================================== */

    const strong =
        completed.filter(function (item) {

            return item.percentage >= 70;

        });


    const weak =
        completed.filter(function (item) {

            return item.percentage < 60;

        });


    strongCount.textContent =
        strong.length;

    improveCount.textContent =
        weak.length;


    /* =========================================
       RENDER STRONG SKILLS
    ========================================== */

    if (strong.length === 0) {

        strongSkills.innerHTML = `

            <div class="analysis-empty">

                <i class="ph ph-chart-line-up"></i>

                <h3>
                    Keep Practicing
                </h3>

                <p>
                    Complete more assessments to
                    identify your strongest areas.
                </p>

            </div>

        `;

    }

    else {

        strongSkills.innerHTML =
            strong.map(function (item) {

                return `

                    <div class="skill-item">

                        <div class="skill-item-top">

                            <span class="skill-name">
                                ${item.skill}
                            </span>

                            <span class="skill-value">
                                ${item.percentage}%
                            </span>

                        </div>

                        <div class="skill-progress">

                            <div
                                class="skill-progress-fill"
                                style="width:${item.percentage}%;">
                            </div>

                        </div>

                    </div>

                `;

            }).join("");

    }


    /* =========================================
       RENDER WEAK SKILLS
    ========================================== */

    if (weak.length === 0) {

        weakSkills.innerHTML = `

            <div class="analysis-empty">

                <i class="ph ph-check-circle"></i>

                <h3>
                    Great Work!
                </h3>

                <p>
                    No major weak areas detected
                    from your completed assessments.
                </p>

            </div>

        `;

    }

    else {

        weakSkills.innerHTML =
            weak.map(function (item) {

                return `

                    <div class="skill-item">

                        <div class="skill-item-top">

                            <span class="skill-name">
                                ${item.skill}
                            </span>

                            <span class="skill-value">
                                ${item.percentage}%
                            </span>

                        </div>

                        <div class="skill-progress">

                            <div
                                class="skill-progress-fill"
                                style="width:${item.percentage}%;">
                            </div>

                        </div>

                    </div>

                `;

            }).join("");

    }


    /* =========================================
       ASSESSMENT PERFORMANCE
    ========================================== */

    assessmentPerformance.innerHTML =
        completed.map(function (item) {

            return `

                <div class="performance-card">

                    <div class="performance-top">

                        <div class="performance-title">

                            <div class="performance-icon">

                                <i class="ph ${item.icon}">
                                </i>

                            </div>

                            <h3>
                                ${item.name}
                            </h3>

                        </div>

                        <span class="performance-score">
                            ${item.percentage}%
                        </span>

                    </div>


                    <div class="performance-bar">

                        <div
                            class="performance-fill"
                            style="width:${item.percentage}%;">
                        </div>

                    </div>


                    <div class="performance-bottom">

                        <span>
                            ${item.correct} Correct
                        </span>

                        <span>
                            ${item.total} Questions
                        </span>

                    </div>

                </div>

            `;

        }).join("");


    /* =========================================
       SKILL GAPS
    ========================================== */

    const gaps =
        completed
        .filter(function (item) {

            return item.percentage < 70;

        })
        .sort(function (a, b) {

            return a.percentage -
                   b.percentage;

        });


    if (gaps.length === 0) {

        skillGaps.innerHTML = `

            <div class="analysis-empty">

                <i class="ph ph-check-circle"></i>

                <h3>
                    No Major Skill Gaps
                </h3>

                <p>
                    Your completed assessments
                    show consistent performance.
                </p>

            </div>

        `;

    }

    else {

        skillGaps.innerHTML =
            gaps.map(function (item) {

                return `

                    <div class="gap-card">

                        <div class="gap-card-top">

                            <div class="gap-icon">

                                <i class="ph ph-warning">
                                </i>

                            </div>

                            <h3>
                                ${item.skill}
                            </h3>

                        </div>

                        <p>
                            Current performance is
                            ${item.percentage}%. Improve
                            this area through regular
                            practice and targeted learning.
                        </p>

                    </div>

                `;

            }).join("");

    }


    /* =========================================
       RECOMMENDATIONS
    ========================================== */

    const recommendationData = [];


    gaps.forEach(function (item) {

        if (item.skill === "Technical Skills") {

            recommendationData.push({

                icon: "ph-code",

                title: "Practice Technical Concepts",

                text:
                    "Revise programming fundamentals, DBMS, APIs and core computer science concepts."

            });

        }


        if (item.skill === "Problem Solving") {

            recommendationData.push({

                icon: "ph-brain",

                title: "Improve Problem Solving",

                text:
                    "Practice logical reasoning, aptitude questions and algorithmic problems regularly."

            });

        }


        if (item.skill === "Coding") {

            recommendationData.push({

                icon: "ph-terminal-window",

                title: "Practice Coding",

                text:
                    "Solve coding problems regularly and focus on writing efficient solutions."

            });

        }


        if (item.skill === "Communication") {

            recommendationData.push({

                icon: "ph-chats",

                title: "Improve Communication",

                text:
                    "Practice speaking, technical explanations and interview-style communication."

            });

        }


        if (item.skill === "Creativity") {

            recommendationData.push({

                icon: "ph-lightbulb",

                title: "Develop Creativity",

                text:
                    "Work on projects, brainstorming activities and innovative problem-solving tasks."

            });

        }


        if (item.skill === "Data Analytics") {

            recommendationData.push({

                icon: "ph-chart-bar",

                title: "Practice Data Analytics",

                text:
                    "Improve your Excel, SQL, Power BI, Python and data interpretation skills."

            });

        }

    });


    /* Default recommendations */

    if (recommendationData.length === 0) {

        recommendationData.push(

            {
                icon: "ph-trophy",

                title: "Maintain Your Performance",

                text:
                    "Continue practicing and challenge yourself with advanced assessments."

            },

            {
                icon: "ph-code",

                title: "Build Real Projects",

                text:
                    "Apply your knowledge by building practical real-world projects."

            },

            {
                icon: "ph-medal",

                title: "Join Competitions",

                text:
                    "Participate in competitions to test your skills in real-world scenarios."

            }

        );

    }


    recommendations.innerHTML =
        recommendationData
        .slice(0, 6)
        .map(function (item) {

            return `

                <div class="recommendation-card">

                    <div class="recommendation-icon">

                        <i class="ph ${item.icon}">
                        </i>

                    </div>

                    <div>

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.text}
                        </p>

                    </div>

                </div>

            `;

        }).join("");


    /* =========================================
       EMPTY STATE
    ========================================== */

    function showEmpty() {

        skillLevel.textContent =
            "Not Available";

        skillLevelText.textContent =
            "Complete an assessment to generate your skill analysis.";

        skillPercentage.textContent =
            "0%";

        skillLevelProgress.style.width =
            "0%";

        assessmentCount.textContent =
            "0";

        strongCount.textContent =
            "0";

        improveCount.textContent =
            "0";


        strongSkills.innerHTML =
            emptyMessage();

        weakSkills.innerHTML =
            emptyMessage();

        assessmentPerformance.innerHTML =
            emptyMessage();

        skillGaps.innerHTML =
            emptyMessage();

        recommendations.innerHTML =
            emptyMessage();

    }


    function emptyMessage() {

        return `

            <div class="analysis-empty">

                <i class="ph ph-chart-line-up"></i>

                <h3>
                    No Data Available
                </h3>

                <p>
                    Complete an assessment to
                    generate your skill analysis.
                </p>

            </div>

        `;

    }


    /* =========================================
       LOGOUT
    ========================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "studentName"
                );

                window.location.href =
                    "../index.html";

            }
        );

    }


    /* =========================================
       MOBILE SIDEBAR
    ========================================== */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }

});