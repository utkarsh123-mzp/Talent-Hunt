// =====================================================
// TALENT HUNT - CLASS 9
// =====================================================


// ================= ELEMENTS =================

const homeBtn =
    document.getElementById("homeBtn");

const startLearningBtn =
    document.getElementById(
        "startLearningBtn"
    );

const assessmentBtn =
    document.getElementById(
        "assessmentBtn"
    );

const ctaAssessmentBtn =
    document.getElementById(
        "ctaAssessmentBtn"
    );

const subjectCards =
    document.querySelectorAll(
        ".subject-card"
    );


// ================= HOME =================

homeBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "../index.html";

    }
);


// ================= START LEARNING =================

startLearningBtn.addEventListener(
    "click",
    () => {

        document.getElementById(
            "subjects"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ================= ASSESSMENT =================

function openAssessment() {

    window.location.href =
        "../assessments/assessment-class-9.html";

}


assessmentBtn.addEventListener(
    "click",
    openAssessment
);


ctaAssessmentBtn.addEventListener(
    "click",
    openAssessment
);


// ================= SUBJECT CARDS =================

subjectCards.forEach(card => {

    const exploreBtn =
        card.querySelector(
            ".explore-btn"
        );


    exploreBtn.addEventListener(
        "click",
        () => {

            const subject =
                card.dataset.subject;


            /*
             * Subject pages can be connected here
             * when individual subject pages are created.
             */

            console.log(
                `Opening ${subject} for Class 9`
            );


            alert(
                `${subject} - Class 9\n\nSubject learning content will be available here.`
            );

        }
    );

});


// ================= CARD HOVER ACCESSIBILITY =================

subjectCards.forEach(card => {

    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                const button =
                    card.querySelector(
                        ".explore-btn"
                    );

                button.click();

            }

        }
    );

});


// ================= SCROLL ANIMATION =================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


subjectCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(card);

});