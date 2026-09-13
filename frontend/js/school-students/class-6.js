/* =====================================================
   CLASS 6 - TALENT HUNT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= HOME BUTTON ================= */

    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {

            /*
             * school-students/class-6.html
             *
             * Agar index.html isi folder me hai:
             */
            window.location.href =
                "../index.html";

        });
    }


    /* ================= ASSESSMENT BUTTONS ================= */

    const startAssessment =
        document.getElementById("startAssessment");

    const assessmentBtn =
        document.getElementById("assessmentBtn");


    function openAssessment() {

        window.location.href =
        "../assessments/assessment-class-6.html";
    }


    if (startAssessment) {
        startAssessment.addEventListener(
            "click",
            openAssessment
        );
    }


    if (assessmentBtn) {
        assessmentBtn.addEventListener(
            "click",
            openAssessment
        );
    }


    /* ================= EXPLORE ACTIVITIES ================= */

    const exploreBtn =
        document.getElementById("exploreBtn");

    if (exploreBtn) {

        exploreBtn.addEventListener("click", function () {

            const activities =
                document.getElementById("activities");

            if (activities) {

                activities.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* ================= SUBJECT BUTTONS ================= */

    const subjectButtons =
        document.querySelectorAll(".subject-btn");

    subjectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const subject =
                this.dataset.subject;

            showMessage(
                subject + " learning section coming soon!"
            );

        });

    });


    /* ================= ACTIVITY BUTTONS ================= */

    const activityButtons =
        document.querySelectorAll(".activity-btn");

    activityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const activity =
                this.dataset.activity;

            showMessage(
                activity + " activity will start soon!"
            );

        });

    });


    /* ================= MESSAGE ================= */

    function showMessage(message) {

        /*
         * Simple temporary notification.
         * Agar common script.js me showToast()
         * already available hai to use karenge.
         */

        if (typeof showToast === "function") {

            showToast(message);

        } else {

            alert(message);

        }

    }

});