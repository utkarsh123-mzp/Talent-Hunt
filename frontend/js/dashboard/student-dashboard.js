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
    const talentScore =
        document.getElementById("talentScore");

    const talentPerformance =
        document.getElementById("talentPerformance");


    /* =========================================
       STUDENT DATA & TALENT SCORE FROM BACKEND
    ========================================= */

    async function loadStudentDashboard() {
        try {
            const api = window.TalentHuntAPI;
            if (!api) return;

            // Fetch profile and talent score in parallel
            const [profileRes, scoreRes] = await Promise.allSettled([
                api.students.getProfile(),
                api.students.getTalentScore()
            ]);

            if (profileRes.status === "fulfilled" && profileRes.value.data) {
                const student = profileRes.value.data.student;
                const firstName = (student.name || "Student").split(" ")[0];
                if (studentName) studentName.textContent = firstName;
                if (welcomeName) welcomeName.textContent = firstName + "!";
            } else {
                const user = api.auth.getUser();
                if (user && user.name) {
                    const firstName = user.name.split(" ")[0];
                    if (studentName) studentName.textContent = firstName;
                    if (welcomeName) welcomeName.textContent = firstName + "!";
                }
            }

            if (scoreRes.status === "fulfilled" && scoreRes.value.data) {
                const data = scoreRes.value.data;
                if (talentScore) talentScore.textContent = data.talentScore;

                if (talentPerformance) {
                    talentPerformance.innerHTML = `
                        <i class="ph ph-trend-up"></i>
                        ${data.statusMessage || "Keep improving your skills"}
                    `;
                }
            }
        } catch (error) {
            console.warn("[Dashboard Error] Backend sync warning:", error.message);
        }
    }

    loadStudentDashboard();
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

        logoutBtn.addEventListener("click", async () => {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {
                if (window.TalentHuntAPI) {
                    await window.TalentHuntAPI.auth.logout();
                } else {
                    localStorage.clear();
                }
                window.location.href = "../auth/login.html";
            }

        });

    }


    /* =========================================
       NOTIFICATION BUTTON
    ========================================= */

    const notificationBtn = document.querySelector(".icon-btn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", async () => {
            try {
                if (window.TalentHuntAPI) {
                    const res = await window.TalentHuntAPI.notifications.getAll();
                    const notifs = res.data.notifications || [];
                    if (notifs.length === 0) {
                        alert("You have no new notifications right now.");
                    } else {
                        const messages = notifs.slice(0, 4).map(n => `• ${n.title}: ${n.message}`).join("\n\n");
                        alert(`Your Notifications (${res.data.unreadCount || notifs.length} unread):\n\n${messages}`);
                    }
                } else {
                    alert("Notification system connected.");
                }
            } catch (err) {
                alert("You have no new notifications right now.");
            }
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