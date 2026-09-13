// ==========================================
// TALENT HUNT - CLASS 7
// School Student Page JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // Mobile Menu
    // ------------------------------------------

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }


    // ------------------------------------------
    // Close Sidebar on Outside Click
    // ------------------------------------------

    document.addEventListener("click", (event) => {

        if (
            sidebar &&
            menuBtn &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            sidebar.classList.remove("active");
        }

    });


    // ------------------------------------------
    // Subject Cards
    // ------------------------------------------

    const subjectCards = document.querySelectorAll(".subject-card");

    subjectCards.forEach((card) => {

        card.addEventListener("click", () => {

            const subject = card.dataset.subject ||
                            card.querySelector("h3")?.textContent;

            if (subject) {
                console.log("Selected Subject:", subject);
            }

        });

    });


    // ------------------------------------------
    // Start Assessment Button
    // ------------------------------------------

    const assessmentButtons =
        document.querySelectorAll(".start-assessment");

    assessmentButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href =
                "../assessments/assessment-class-7.html";

        });

    });


    // ------------------------------------------
    // Assessment Page Button
    // ------------------------------------------

    const assessmentLink =
        document.querySelector("#assessmentLink");

    if (assessmentLink) {

        assessmentLink.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href =
                "../assessments/assessment-class-7.html";

        });

    }


    // ------------------------------------------
    // Back Button
    // ------------------------------------------

    const backButton =
        document.querySelector(".back-btn");

    if (backButton) {

        backButton.addEventListener("click", () => {
            window.history.back();
        });

    }


    // ------------------------------------------
    // Search Subjects
    // ------------------------------------------

    const searchInput =
        document.querySelector("#subjectSearch");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value.toLowerCase().trim();

            subjectCards.forEach((card) => {

                const text =
                    card.textContent.toLowerCase();

                if (text.includes(searchValue)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }


    // ------------------------------------------
    // View All Subjects
    // ------------------------------------------

    const viewAllBtn =
        document.querySelector(".view-all-btn");

    if (viewAllBtn) {

        viewAllBtn.addEventListener("click", () => {

            subjectCards.forEach((card) => {
                card.style.display = "";
            });

            if (searchInput) {
                searchInput.value = "";
            }

        });

    }


    // ------------------------------------------
    // Progress Animation
    // ------------------------------------------

    const progressBars =
        document.querySelectorAll(".progress-fill");

    progressBars.forEach((bar) => {

        const progress =
            bar.dataset.progress || "0";

        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 200);

    });


    // ------------------------------------------
    // Subject Progress
    // ------------------------------------------

    const progressText =
        document.querySelectorAll(".progress-text");

    progressText.forEach((text) => {

        const progress =
            text.dataset.progress || "0";

        text.textContent =
            `${progress}% Completed`;

    });


    // ------------------------------------------
    // Notification
    // ------------------------------------------

    const notificationBtn =
        document.querySelector(".notification-btn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            alert(
                "No new notifications for Class 7."
            );

        });

    }


    // ------------------------------------------
    // User Profile
    // ------------------------------------------

    const profileBtn =
        document.querySelector(".profile-btn");

    if (profileBtn) {

        profileBtn.addEventListener("click", () => {

            window.location.href =
                "../dashboard/student-profile.html";

        });

    }


    // ------------------------------------------
    // Save Last Visited Class
    // ------------------------------------------

    localStorage.setItem(
        "lastVisitedClass",
        "Class 7"
    );


    // ------------------------------------------
    // Console
    // ------------------------------------------

    console.log(
        "Talent Hunt - Class 7 loaded successfully."
    );

});