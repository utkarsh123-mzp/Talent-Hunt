/* =========================================================
   TALENTHUNT - PLACEMENT READINESS
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

    const recalculateBtn =
        document.getElementById("recalculateBtn");

    const readinessScore =
        document.getElementById("readinessScore");

    const scoreBar =
        document.getElementById("scoreBar");

    const scoreTitle =
        document.getElementById("scoreTitle");

    const scoreDescription =
        document.getElementById("scoreDescription");

    const readinessBadge =
        document.getElementById("readinessBadge");


    /* =====================================================
       ROLE DATA
    ====================================================== */

    const roleScores = {

        "software-developer": {
            technical: 78,
            coding: 72,
            aptitude: 68,
            resume: 82,
            interview: 70,
            communication: 63
        },

        "frontend-developer": {
            technical: 84,
            coding: 75,
            aptitude: 66,
            resume: 82,
            interview: 74,
            communication: 68
        },

        "backend-developer": {
            technical: 76,
            coding: 73,
            aptitude: 67,
            resume: 80,
            interview: 69,
            communication: 64
        },

        "data-analyst": {
            technical: 81,
            coding: 68,
            aptitude: 72,
            resume: 84,
            interview: 71,
            communication: 67
        },

        "full-stack": {
            technical: 80,
            coding: 74,
            aptitude: 67,
            resume: 81,
            interview: 71,
            communication: 64
        },

        "python-developer": {
            technical: 82,
            coding: 76,
            aptitude: 68,
            resume: 83,
            interview: 72,
            communication: 65
        }

    };


    /* =====================================================
       SIDEBAR
    ====================================================== */

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });


    /* =====================================================
       NOTIFICATIONS
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

            calculateReadiness();

        }
    );


    /* =====================================================
       CALCULATE READINESS
    ====================================================== */

    function calculateReadiness() {

        const role =
            targetRole.value;

        const scores =
            roleScores[role];


        if (!scores) {
            return;
        }


        const values =
            Object.values(scores);


        const total =
            values.reduce(
                (sum, value) =>
                    sum + value,
                0
            );


        const overall =
            Math.round(
                total / values.length
            );


        updateMainScore(
            overall
        );


        updateCategoryCards(
            scores
        );

    }


    /* =====================================================
       MAIN SCORE
    ====================================================== */

    function updateMainScore(score) {

        readinessScore.textContent =
            score;


        scoreBar.style.width =
            `${score}%`;


        updateRing(
            score
        );


        if (score >= 85) {

            readinessBadge.textContent =
                "Placement Ready";

            readinessBadge.style.background =
                "#e8faf4";

            readinessBadge.style.color =
                "#20b486";


            scoreTitle.textContent =
                "You are placement ready";


            scoreDescription.textContent =
                "Your preparation is strong across most important placement areas. Focus on company-specific preparation and interview practice.";

        }

        else if (score >= 70) {

            readinessBadge.textContent =
                "Almost Ready";

            readinessBadge.style.background =
                "#fff4dc";

            readinessBadge.style.color =
                "#f59e0b";


            scoreTitle.textContent =
                "You are almost placement ready";


            scoreDescription.textContent =
                "Strengthen your weaker areas and continue interview practice before applying.";

        }

        else if (score >= 55) {

            readinessBadge.textContent =
                "Needs Preparation";

            readinessBadge.style.background =
                "#fff4dc";

            readinessBadge.style.color =
                "#f59e0b";


            scoreTitle.textContent =
                "More preparation required";


            scoreDescription.textContent =
                "Build stronger fundamentals, improve coding practice and complete more assessments.";

        }

        else {

            readinessBadge.textContent =
                "Needs Improvement";

            readinessBadge.style.background =
                "#fff0f0";

            readinessBadge.style.color =
                "#ef5350";


            scoreTitle.textContent =
                "Focus on your fundamentals";


            scoreDescription.textContent =
                "You should strengthen your core skills before starting serious placement applications.";

        }

    }


    /* =====================================================
       SCORE RING
    ====================================================== */

    function updateRing(score) {

        const degrees =
            Math.round(
                score * 3.6
            );


        const ring =
            document.querySelector(
                ".score-ring"
            );


        ring.style.background =
            `conic-gradient(
                var(--primary) 0deg,
                var(--primary) ${degrees}deg,
                #eeeef5 ${degrees}deg,
                #eeeef5 360deg
            )`;

    }


    /* =====================================================
       CATEGORY CARDS
    ====================================================== */

    function updateCategoryCards(scores) {

        const categoryCards =
            document.querySelectorAll(
                ".category-card"
            );


        const keys = [
            "technical",
            "coding",
            "aptitude",
            "resume",
            "interview",
            "communication"
        ];


        categoryCards.forEach(
            (card, index) => {

                const score =
                    scores[keys[index]];


                if (
                    typeof score !==
                    "number"
                ) {
                    return;
                }


                const number =
                    card.querySelector(
                        ".category-top strong"
                    );


                const progress =
                    card.querySelector(
                        ".category-progress span"
                    );


                const status =
                    card.querySelector(
                        "small"
                    );


                number.textContent =
                    `${score}%`;


                progress.style.width =
                    `${score}%`;


                status.textContent =
                    getStatus(score);

            }
        );

    }


    /* =====================================================
       STATUS
    ====================================================== */

    function getStatus(score) {

        if (score >= 80) {
            return "Strong";
        }

        if (score >= 70) {
            return "Good";
        }

        if (score >= 60) {
            return "Needs Practice";
        }

        return "Critical Gap";

    }


    /* =====================================================
       CHECKLIST
    ====================================================== */

    const checklist =
        document.querySelectorAll(
            ".check-item input"
        );


    checklist.forEach(
        checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    updateChecklistProgress();

                }
            );

        }
    );


    function updateChecklistProgress() {

        const total =
            checklist.length;


        const completed =
            document.querySelectorAll(
                ".check-item input:checked"
            ).length;


        if (!total) {
            return;
        }


        const percentage =
            Math.round(
                (completed / total) * 100
            );


        console.log(
            `Recruiter checklist: ${percentage}% complete`
        );

    }


    /* =====================================================
       RECALCULATE
    ====================================================== */

    recalculateBtn.addEventListener(
        "click",
        () => {

            const originalText =
                recalculateBtn.textContent;


            recalculateBtn.textContent =
                "Calculating...";


            recalculateBtn.disabled =
                true;


            setTimeout(
                () => {

                    calculateReadiness();


                    recalculateBtn.textContent =
                        "✓ Readiness Updated";


                    setTimeout(
                        () => {

                            recalculateBtn.textContent =
                                originalText;

                            recalculateBtn.disabled =
                                false;

                        },
                        1200
                    );

                },
                900
            );

        }
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    calculateReadiness();

});