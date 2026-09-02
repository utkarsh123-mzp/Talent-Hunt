/* =========================================
   TALENT HUNT - STUDENT DASHBOARD JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const studentName = document.getElementById("studentName");
    const welcomeName = document.getElementById("welcomeName");


    /* =========================================
       STUDENT NAME
    ========================================= */

    // Demo student name
    const savedName = localStorage.getItem("studentName");

    if (savedName) {
        studentName.textContent = savedName;
        welcomeName.textContent = savedName + "!";
    }


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    let overlay = document.querySelector(".sidebar-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("sidebar-overlay");

        document.body.appendChild(overlay);
    }


    // Open sidebar
    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

            overlay.classList.toggle(
                "active",
                sidebar.classList.contains("open")
            );

        });

    }


    // Close sidebar when overlay clicked
    overlay.addEventListener("click", () => {

        sidebar.classList.remove("open");

        overlay.classList.remove("active");

    });


    /* =========================================
       SIDEBAR NAVIGATION
    ========================================= */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            // Close mobile sidebar
            sidebar.classList.remove("open");
            overlay.classList.remove("active");

        });

    });


    /* =========================================
       LOGOUT
    ========================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {

                // Clear login-related demo data
                localStorage.removeItem("studentName");

                window.location.href = "../login.html";

            }

        });

    }


    /* =========================================
       NOTIFICATION BUTTON
    ========================================= */

    const notificationBtn = document.querySelector(".icon-btn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            alert(
                "You have 3 new notifications.\n\n" +
                "• New coding competition available\n" +
                "• Python assessment result published\n" +
                "• New skill recommendation available"
            );

        });

    }


    /* =========================================
       PROFILE CLICK
    ========================================= */

    const userProfile = document.querySelector(".user-profile");

    if (userProfile) {

        userProfile.addEventListener("click", () => {

            alert(
                "Student Profile\n\n" +
                "Name: " + studentName.textContent + "\n" +
                "Role: Student"
            );

        });

    }


    /* =========================================
       COMPETITION BUTTON
    ========================================= */

    const competitionBtn = document.querySelector(
        ".primary-btn"
    );

    if (competitionBtn) {

        competitionBtn.addEventListener("click", () => {

            alert(
                "National Coding Challenge\n\n" +
                "Competition details will be available soon."
            );

        });

    }


    /* =========================================
       RECOMMENDATION BUTTONS
    ========================================= */

    const recommendationButtons =
        document.querySelectorAll(
            ".recommendation-footer button"
        );

    recommendationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(
                ".recommendation-card"
            );

            const title = card.querySelector("h4");

            if (title) {

                alert(
                    "Opening recommendation:\n\n" +
                    title.textContent
                );

            }

        });

    });


    /* =========================================
       MORE BUTTON
    ========================================= */

    const moreBtn = document.querySelector(".more-btn");

    if (moreBtn) {

        moreBtn.addEventListener("click", () => {

            alert(
                "Progress details will be expanded here."
            );

        });

    }


    /* =========================================
       VIEW ALL LINKS
    ========================================= */

    const viewAllLinks = document.querySelectorAll(
        ".section-heading a, .activity-card .card-header a"
    );

    viewAllLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            alert(
                "More content will be available here."
            );

        });

    });


    /* =========================================
       DASHBOARD LOADED
    ========================================= */

    console.log(
        "Talent Hunt Student Dashboard loaded successfully."
    );

});