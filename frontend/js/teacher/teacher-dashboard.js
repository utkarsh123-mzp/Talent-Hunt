/* =========================================
   TEACHER DASHBOARD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "Teacher Dashboard Loaded"
        );


        /* =====================================
           ELEMENTS
        ====================================== */

        const menuBtn =
            document.getElementById(
                "menuBtn"
            );


        const sidebar =
            document.getElementById(
                "sidebar"
            );


        const overlay =
            document.getElementById(
                "sidebarOverlay"
            );


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        const notificationBtn =
            document.getElementById(
                "notificationBtn"
            );


        const markReadBtn =
            document.getElementById(
                "markReadBtn"
            );


        const completeProfileBtn =
            document.getElementById(
                "completeProfileBtn"
            );


        /* =====================================
           MOBILE SIDEBAR
        ====================================== */

        function openSidebar() {

            sidebar.classList.add(
                "open"
            );

            overlay.classList.add(
                "active"
            );

        }


        function closeSidebar() {

            sidebar.classList.remove(
                "open"
            );

            overlay.classList.remove(
                "active"
            );

        }


        if (menuBtn) {

            menuBtn.addEventListener(
                "click",
                function () {

                    if (
                        sidebar.classList.contains(
                            "open"
                        )
                    ) {

                        closeSidebar();

                    } else {

                        openSidebar();

                    }

                }
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeSidebar
            );

        }


        /* =====================================
           SIDEBAR NAVIGATION
        ====================================== */

        const navItems =
            document.querySelectorAll(
                ".nav-item"
            );


        navItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        navItems.forEach(
                            function (nav) {

                                nav.classList.remove(
                                    "active"
                                );

                            }
                        );


                        item.classList.add(
                            "active"
                        );


                        const section =
                            item.dataset.section;


                        handleNavigation(
                            section
                        );


                        closeSidebar();

                    }
                );

            }
        );


        /* =====================================
           NAVIGATION HANDLER
        ====================================== */

        function handleNavigation(
            section
        ) {

            switch (section) {

                case "dashboard":

                    showToast(
                        "You are already on Dashboard."
                    );

                    break;


                case "classes":
                    window.location.href = "../teacher-portal/my-classes.html";
                    break;


                case "students":
                    window.location.href = "../teacher-portal/students.html";
                    break;


                case "schedule":
                    window.location.href = "../teacher-portal/schedule.html";
                    break;


                case "earnings":
                    window.location.href = "../teacher-portal/earnings.html";
                    break;


                case "opportunities":
                    window.location.href = "../teacher-portal/opportunities.html";
                    break;


                case "profile":

                    window.location.href =
                        "teacher-profile.html";

                    break;

            }

        }


        /* =====================================
           VIEW ALL / QUICK ACTIONS
        ====================================== */

        const actionElements =
            document.querySelectorAll(
                "[data-action]"
            );


        actionElements.forEach(
            function (element) {

                element.addEventListener(
                    "click",
                    function () {

                        const action =
                            element.dataset.action;


                        handleNavigation(
                            action
                        );

                    }
                );

            }
        );


        /* =====================================
           OPPORTUNITY APPLY
        ====================================== */

        const applyButtons =
            document.querySelectorAll(
                ".apply-btn"
            );


        applyButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const opportunity =
                            button.dataset.opportunity;


                        const confirmApply =
                            confirm(
                                "Apply for " +
                                opportunity +
                                "?"
                            );


                        if (
                            !confirmApply
                        ) {

                            return;

                        }


                        button.textContent =
                            "Applied";


                        button.disabled =
                            true;


                        button.style.background =
                            "#ecfaf3";


                        button.style.color =
                            "#20a36a";


                        button.style.borderColor =
                            "#d4efdf";


                        saveOpportunity(
                            opportunity
                        );


                        showToast(
                            "Application submitted successfully!"
                        );

                    }
                );

            }
        );


        /* =====================================
           SAVE OPPORTUNITY
        ====================================== */

        function saveOpportunity(
            opportunity
        ) {

            let applications =
                JSON.parse(
                    localStorage.getItem(
                        "teacherOpportunityApplications"
                    )
                ) || [];


            applications.push({

                opportunity:
                    opportunity,

                appliedAt:
                    new Date().toISOString()

            });


            localStorage.setItem(
                "teacherOpportunityApplications",
                JSON.stringify(
                    applications
                )
            );

        }


        /* =====================================
           NOTIFICATION BUTTON
        ====================================== */

        if (notificationBtn) {

            notificationBtn.addEventListener(
                "click",
                function () {

                    showToast(
                        "You have 3 notifications."
                    );

                }
            );

        }


        /* =====================================
           MARK NOTIFICATIONS READ
        ====================================== */

        if (markReadBtn) {

            markReadBtn.addEventListener(
                "click",
                function () {

                    const unread =
                        document.querySelectorAll(
                            ".notification-item.unread"
                        );


                    unread.forEach(
                        function (item) {

                            item.classList.remove(
                                "unread"
                            );

                        }
                    );


                    const dot =
                        document.querySelector(
                            ".notification-dot"
                        );


                    if (dot) {

                        dot.style.display =
                            "none";

                    }


                    showToast(
                        "All notifications marked as read."
                    );

                }
            );

        }


        /* =====================================
           COMPLETE PROFILE
        ====================================== */

        if (completeProfileBtn) {

            completeProfileBtn.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "teacher-profile.html";

                }
            );

        }


        /* =====================================
           LOGOUT
        ====================================== */

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function () {

                    const confirmLogout =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (
                        !confirmLogout
                    ) {

                        return;

                    }


                    localStorage.removeItem(
                        "teacherSession"
                    );


                    localStorage.removeItem(
                        "teacherOnboarding"
                    );


                    showToast(
                        "Logging out..."
                    );


                    setTimeout(
                        function () {

                            /*
                             * Login page ka path
                             * apne project ke according
                             * update kar sakte ho.
                             */

                            window.location.href =
                                "../auth/login.html";

                        },
                        700
                    );

                }
            );

        }


        /* =====================================
           LOAD ONBOARDING DATA
        ====================================== */

        function loadTeacherData() {

            const data =
                JSON.parse(
                    localStorage.getItem(
                        "teacherOnboarding"
                    )
                );


            if (!data) {

                return;

            }


            /*
             * Teacher ka name future mein
             * backend/database se aayega.
             */

            const teacherNameElements =
                document.querySelectorAll(
                    ".teacher-mini-info strong"
                );


            teacherNameElements.forEach(
                function (element) {

                    if (data.name) {

                        element.textContent =
                            data.name;

                    }

                }
            );


            /*
             * Initials update
             */

            if (data.name) {

                const initials =
                    getInitials(
                        data.name
                    );


                const avatars =
                    document.querySelectorAll(
                        ".avatar"
                    );


                avatars.forEach(
                    function (avatar) {

                        avatar.textContent =
                            initials;

                    }
                );

            }

        }


        /* =====================================
           GET INITIALS
        ====================================== */

        function getInitials(
            name
        ) {

            const words =
                name.trim().split(" ");


            if (
                words.length === 1
            ) {

                return words[0]
                    .substring(0, 2)
                    .toUpperCase();

            }


            return (
                words[0][0] +
                words[words.length - 1][0]
            ).toUpperCase();

        }


        /* =====================================
           TOAST
        ====================================== */

        function showToast(
            message
        ) {

            const existing =
                document.querySelector(
                    ".dashboard-toast"
                );


            if (existing) {

                existing.remove();

            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "dashboard-toast";


            toast.textContent =
                message;


            Object.assign(
                toast.style,
                {

                    position: "fixed",

                    right: "25px",

                    bottom: "25px",

                    zIndex: "9999",

                    background: "#17172b",

                    color: "#ffffff",

                    padding: "12px 17px",

                    borderRadius: "9px",

                    fontSize: "10px",

                    fontWeight: "600",

                    boxShadow:
                        "0 10px 25px rgba(0,0,0,0.2)",

                    opacity: "1",

                    transition:
                        "opacity 0.3s ease"

                }
            );


            document.body.appendChild(
                toast
            );


            setTimeout(
                function () {

                    toast.style.opacity =
                        "0";


                    setTimeout(
                        function () {

                            toast.remove();

                        },
                        300
                    );

                },
                2200
            );

        }


        /* =====================================
           INITIALIZE
        ====================================== */

        loadTeacherData();

    }
);