document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".start-btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const assessmentType = this.getAttribute("data-assessment");

            console.log("Assessment:", assessmentType);

            // Technical Skills
            if (assessmentType === "Technical Skills") {

                localStorage.setItem(
                    "selectedAssessment",
                    assessmentType
                );

                window.location.href = "assessment-test.html";
                return;
            }

            // Other assessments
            if (assessmentType === "Aptitude & Reasoning") {
                alert("Aptitude & Reasoning assessment coming soon.");
                return;
            }

            if (assessmentType === "Coding Challenge") {
                alert("Coding Challenge coming soon.");
                return;
            }

            if (assessmentType === "Communication Skills") {
                alert("Communication Skills assessment coming soon.");
                return;
            }

            if (assessmentType === "Creativity & Innovation") {
                alert("Creativity & Innovation assessment coming soon.");
                return;
            }

            if (assessmentType === "Data Analytics") {
                alert("Data Analytics assessment coming soon.");
                return;
            }

            alert("Assessment not available.");
        });

    });

});