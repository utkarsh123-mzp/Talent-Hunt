document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const overallScore =
        document.getElementById("overallScore");

    const overallProgress =
        document.getElementById("overallProgress");

    const scoreStatus =
        document.getElementById("scoreStatus");

    const completedCount =
        document.getElementById("completedCount");

    const assessmentScoreGrid =
        document.getElementById("assessmentScoreGrid");

    const suggestionsGrid =
        document.getElementById("suggestionsGrid");

    const studentName =
        document.getElementById("studentName");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =========================================
       STUDENT NAME
    ========================================= */

    const savedName =
        localStorage.getItem("studentName");

    if (savedName && studentName) {
        studentName.textContent = savedName;
    }


    /* =========================================
       ASSESSMENT CONFIGURATION
    ========================================= */

    const assessments = [

        {
            name: "Technical Skills",
            icon: "ph-code"
        },

        {
            name: "Aptitude & Reasoning",
            icon: "ph-brain"
        },

        {
            name: "Coding Challenge",
            icon: "ph-terminal-window"
        },

        {
            name: "Communication Skills",
            icon: "ph-chats"
        },

        {
            name: "Creativity & Innovation",
            icon: "ph-lightbulb"
        },

        {
            name: "Data Analytics",
            icon: "ph-chart-bar"
        }

    ];


    /* =========================================
       GET SAVED RESULTS
    ========================================= */

    const assessmentResults =
        JSON.parse(
            localStorage.getItem("assessmentResults")
        ) || {};


    /*
       Compatibility with old Technical
       Assessment storage
    */

    const oldTechnicalScore =
        localStorage.getItem(
            "technicalAssessmentScore"
        );

    const oldTechnicalCorrect =
        localStorage.getItem(
            "technicalAssessmentCorrect"
        );


    if (
        !assessmentResults["Technical Skills"] &&
        oldTechnicalScore !== null
    ) {

        assessmentResults["Technical Skills"] = {

            score: Number(oldTechnicalCorrect || 0),

            total: 10,

            percentage: Number(oldTechnicalScore),

            correct: Number(
                oldTechnicalCorrect || 0
            ),

            wrong: 0,

            unanswered: 0

        };

    }


    /* =========================================
       FIND COMPLETED ASSESSMENTS
    ========================================= */

    const completedAssessments =
        assessments.filter(function (assessment) {

            return (
                assessmentResults[assessment.name] &&
                assessmentResults[assessment.name]
                    .percentage !== undefined
            );

        });


    /* =========================================
       NO ASSESSMENT
    ========================================= */

    if (completedAssessments.length === 0) {

        showEmptyState();

        showSuggestions(0);

        return;
    }


    /* =========================================
       CALCULATE OVERALL SCORE
    ========================================= */

    let totalPercentage = 0;

    completedAssessments.forEach(
        function (assessment) {

            totalPercentage +=
                Number(
                    assessmentResults[
                        assessment.name
                    ].percentage
                );

        }
    );


    const talentScore =
        Math.round(
            totalPercentage /
            completedAssessments.length
        );


    /* =========================================
       UPDATE OVERALL SCORE
    ========================================= */

    overallScore.textContent =
        talentScore;

    overallProgress.style.width =
        talentScore + "%";


    completedCount.textContent =
        completedAssessments.length +
        (
            completedAssessments.length === 1
                ? " Assessment"
                : " Assessments"
        );


    /* =========================================
       SCORE STATUS
    ========================================= */

    if (talentScore >= 80) {

        scoreStatus.textContent =
            "Excellent performance";

    }
    else if (talentScore >= 60) {

        scoreStatus.textContent =
            "Good performance";

    }
    else if (talentScore >= 40) {

        scoreStatus.textContent =
            "Average performance";

    }
    else {

        scoreStatus.textContent =
            "Needs improvement";

    }


    /* =========================================
       GENERATE ASSESSMENT CARDS
    ========================================= */

    renderAssessmentCards();


    /* =========================================
       AI SUGGESTIONS
    ========================================= */

    showSuggestions(talentScore);


    /* =========================================
       RENDER ASSESSMENT CARDS
    ========================================= */

    function renderAssessmentCards() {

        assessmentScoreGrid.innerHTML = "";


        assessments.forEach(
            function (assessment) {

                const result =
                    assessmentResults[
                        assessment.name
                    ];


                const completed =
                    result &&
                    result.percentage !== undefined;


                const percentage =
                    completed
                        ? Number(result.percentage)
                        : 0;


                const correct =
                    completed
                        ? Number(result.correct || 0)
                        : 0;


                const total =
                    completed
                        ? Number(result.total || 0)
                        : 0;


                const card =
                    document.createElement("div");


                card.className =
                    "assessment-score-card" +
                    (
                        completed
                            ? ""
                            : " not-completed"
                    );


                if (completed) {

                    card.innerHTML = `

                        <div class="assessment-card-top">

                            <div class="assessment-title">

                                <div class="assessment-icon">

                                    <i class="ph ${assessment.icon}">
                                    </i>

                                </div>

                                <div>

                                    <h3>
                                        ${assessment.name}
                                    </h3>

                                </div>

                            </div>


                            <div class="assessment-score">

                                ${percentage}%

                            </div>

                        </div>


                        <div class="assessment-progress">

                            <div class="assessment-progress-track">

                                <div
                                    class="assessment-progress-fill"
                                    style="width: ${percentage}%;">
                                </div>

                            </div>

                        </div>


                        <div class="assessment-details">

                            <span>

                                <i class="ph ph-check-circle">
                                </i>

                                ${correct} Correct

                            </span>


                            <span>

                                ${total} Questions

                            </span>

                        </div>

                    `;

                }
                else {

                    card.innerHTML = `

                        <div class="assessment-card-top">

                            <div class="assessment-title">

                                <div class="assessment-icon">

                                    <i class="ph ${assessment.icon}">
                                    </i>

                                </div>

                                <div>

                                    <h3>
                                        ${assessment.name}
                                    </h3>

                                </div>

                            </div>


                            <div class="assessment-score">

                                —

                            </div>

                        </div>


                        <div class="assessment-progress">

                            <div class="assessment-progress-track">

                                <div
                                    class="assessment-progress-fill"
                                    style="width: 0%;">
                                </div>

                            </div>

                        </div>


                        <div class="assessment-details">

                            <span>
                                Not Completed
                            </span>

                            <a
                                href="assessments.html"
                                style="color: var(--primary); font-weight: 600;">
                                Take Test
                            </a>

                        </div>

                    `;

                }


                assessmentScoreGrid.appendChild(card);

            }
        );

    }


    /* =========================================
       EMPTY STATE
    ========================================= */

    function showEmptyState() {

        overallScore.textContent = "0";

        overallProgress.style.width = "0%";

        scoreStatus.textContent =
            "No assessments completed";

        completedCount.textContent =
            "0 Assessments";


        assessmentScoreGrid.innerHTML = `

            <div class="empty-score">

                <i class="ph ph-clipboard-text">
                </i>

                <h3>
                    No Assessment Completed
                </h3>

                <p>
                    Complete your first assessment
                    to generate your Talent Score.
                </p>

                <a
                    href="assessments.html"
                    class="take-assessment-btn">

                    <i class="ph ph-plus"></i>

                    Take Assessment

                </a>

            </div>

        `;

    }


    /* =========================================
       AI SUGGESTIONS
    ========================================= */

    function showSuggestions(score) {

        if (score >= 80) {

            suggestionsGrid.innerHTML = `

                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-trophy"></i>
                    </div>

                    <div>

                        <h3>
                            Excellent Performance
                        </h3>

                        <p>
                            Your overall performance is strong.
                            Focus on advanced challenges and
                            competitions to reach the next level.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-code"></i>
                    </div>

                    <div>

                        <h3>
                            Build Real Projects
                        </h3>

                        <p>
                            Apply your skills by creating
                            real-world projects and adding
                            them to your profile.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-medal"></i>
                    </div>

                    <div>

                        <h3>
                            Explore Competitions
                        </h3>

                        <p>
                            Participate in competitions to
                            showcase your abilities and
                            gain recognition.
                        </p>

                    </div>

                </div>

            `;

        }

        else if (score >= 60) {

            suggestionsGrid.innerHTML = `

                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-chart-line-up"></i>
                    </div>

                    <div>

                        <h3>
                            Keep Improving
                        </h3>

                        <p>
                            You have a good foundation.
                            Continue practicing regularly
                            to improve your score.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-brain"></i>
                    </div>

                    <div>

                        <h3>
                            Practice Problem Solving
                        </h3>

                        <p>
                            Focus on logical reasoning,
                            coding problems and
                            data structures.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-target"></i>
                    </div>

                    <div>

                        <h3>
                            Complete More Assessments
                        </h3>

                        <p>
                            Attempt more skill assessments
                            to create a stronger talent profile.
                        </p>

                    </div>

                </div>

            `;

        }

        else {

            suggestionsGrid.innerHTML = `

                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-book-open"></i>
                    </div>

                    <div>

                        <h3>
                            Strengthen Your Basics
                        </h3>

                        <p>
                            Focus on fundamental concepts
                            before moving towards advanced topics.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-code"></i>
                    </div>

                    <div>

                        <h3>
                            Practice Regularly
                        </h3>

                        <p>
                            Solve small problems consistently
                            to improve your technical confidence.
                        </p>

                    </div>

                </div>


                <div class="suggestion-card">

                    <div class="suggestion-icon">
                        <i class="ph ph-target"></i>
                    </div>

                    <div>

                        <h3>
                            Complete More Tests
                        </h3>

                        <p>
                            Complete different assessments
                            to identify your strongest skill areas.
                        </p>

                    </div>

                </div>

            `;

        }

    }


    /* =========================================
       LOGOUT
    ========================================= */

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
    ========================================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }

});