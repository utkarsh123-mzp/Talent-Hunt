// =====================================================
// TALENT HUNT - CLASS 8
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // ================= ELEMENTS =================

    const assessmentBtn =
        document.getElementById("assessmentBtn");

    const assessmentBannerBtn =
        document.getElementById(
            "assessmentBannerBtn"
        );

    const exploreBtn =
        document.getElementById("exploreBtn");

    const subjectsSection =
        document.getElementById("subjects");

    const subjectSearch =
        document.getElementById("subjectSearch");

    const subjectCards =
        document.querySelectorAll(".subject-card");

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const profileBtn =
        document.getElementById(
            "profileBtn"
        );


    // ================= ASSESSMENT =================

    function openAssessment() {

        window.location.href =
            "../assessments/assessment-class-8.html";

    }


    if (assessmentBtn) {

        assessmentBtn.addEventListener(
            "click",
            openAssessment
        );

    }


    if (assessmentBannerBtn) {

        assessmentBannerBtn.addEventListener(
            "click",
            openAssessment
        );

    }


    // ================= EXPLORE SUBJECTS =================

    if (exploreBtn) {

        exploreBtn.addEventListener(
            "click",
            () => {

                subjectsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }


    // ================= SUBJECT CARDS =================

    subjectCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const subject =
                    card.dataset.subject;

                console.log(
                    `Selected Subject: ${subject}`
                );

                // Future subject pages can be
                // connected here.

            }
        );

    });


    // ================= SEARCH =================

    if (subjectSearch) {

        subjectSearch.addEventListener(
            "input",
            () => {

                const searchValue =
                    subjectSearch.value
                        .toLowerCase()
                        .trim();


                subjectCards.forEach(card => {

                    const subject =
                        card.dataset.subject
                            .toLowerCase();


                    if (
                        subject.includes(
                            searchValue
                        )
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                });

            }
        );

    }


    // ================= NOTIFICATION =================

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                alert(
                    "No new notifications."
                );

            }
        );

    }


    // ================= PROFILE =================

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                // Profile page can be connected later.

                window.location.href =
                    "../dashboard/student-profile.html";

            }
        );

    }


    // ================= LOCAL STORAGE =================

    localStorage.setItem(
        "lastVisitedClass",
        "Class 8"
    );


    // ================= PAGE LOADED =================

    console.log(
        "Talent Hunt - Class 8 loaded successfully."
    );

});