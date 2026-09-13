// =====================================================
// TALENT HUNT
// CLASS 10 - HIGH SCHOOL BOARD
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

const subjectsSection =
    document.getElementById("subjects");

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

        subjectsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ================= ASSESSMENT =================

function openAssessment() {

    window.location.href =
        "../assessments/assessment-class-10.html";

}


assessmentBtn.addEventListener(
    "click",
    openAssessment
);


ctaAssessmentBtn.addEventListener(
    "click",
    openAssessment
);


// ================= SUBJECTS =================

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
             * Individual subject pages
             * can be connected here later.
             */

            alert(
                `${subject} - Class 10\n\nLearning content for this subject will be available here.`
            );

        }
    );

});


// ================= SCROLL REVEAL =================

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


subjectCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "opacity 0.55s ease, transform 0.55s ease";


    revealObserver.observe(card);

});


// ================= MAKE VISIBLE =================

const style =
    document.createElement("style");


style.textContent = `

    .subject-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;


document.head.appendChild(style);


// ================= ACTIVE SUBJECT =================

subjectCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            subjectCards.forEach(
                other => {

                    if (
                        other !== card
                    ) {

                        other.style.opacity =
                            "0.65";

                    }

                }
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            subjectCards.forEach(
                other => {

                    other.style.opacity =
                        "1";

                }
            );

        }
    );

});