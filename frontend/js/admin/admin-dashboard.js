/* =====================================================
   TALENT HUNT — ADMIN DASHBOARD JS
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");

    const logoutBtn = document.getElementById("logoutBtn");
    const notificationBtn = document.getElementById("notificationBtn");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");


    /* =================================================
       MOBILE SIDEBAR
       ================================================= */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =================================================
       TOAST
       ================================================= */

    function showToast(message) {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =================================================
       ADMIN NAVIGATION
       ================================================= */

    const navigationItems =
        document.querySelectorAll("[data-section]");

    navigationItems.forEach(item => {

        item.addEventListener("click", (event) => {

            event.preventDefault();

            const section = item.dataset.section;

            if (!section) return;


            const sectionRoutes = {
                applications: "teacher-applications.html",
                verification: "verification.html",
                demo: "demo-reviews.html",
                interviews: "interviews.html",
                hiring: "hiring.html",
                onboarding: "onboarding.html",
                teachers: "teachers.html",
                reports: "reports.html"
            };

            if (sectionRoutes[section]) {
                window.location.href = sectionRoutes[section];
                return;
            }


            /* Close mobile sidebar */

            if (window.innerWidth <= 800) {

                sidebar.classList.remove("open");

            }

        });

    });


    /* =================================================
       NOTIFICATION
       ================================================= */

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            showToast(
                "You have 8 pending teacher applications."
            );

        });

    }


    /* =================================================
       LOGOUT
       ================================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout =
                confirm("Are you sure you want to logout?");

            if (!confirmLogout) return;


            showToast("Logging out...");


            /*
             * Backend authentication connect होने के बाद
             * यहाँ actual logout URL लगाया जाएगा.
             */

            setTimeout(() => {

                window.location.href =
                    "../auth/login.html";

            }, 1200);

        });

    }


    /* =================================================
       ROW ACTIONS
       ================================================= */

    const rowActions =
        document.querySelectorAll(".row-action");

    rowActions.forEach(button => {

        button.addEventListener("click", () => {

            window.location.href = "teacher-applications.html";

        });

    });


    /* =================================================
       INITIAL LOAD
       ================================================= */

    console.log(
        "Talent Hunt Admin Dashboard loaded successfully."
    );

});