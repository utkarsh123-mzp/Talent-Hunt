document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".start-btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const assessmentType =
                this.getAttribute("data-assessment");

            // Save selected assessment
            localStorage.setItem(
                "selectedAssessment",
                assessmentType
            );

            // Open common assessment engine
            window.location.href = "assessment-test.html";

        });

    });

});