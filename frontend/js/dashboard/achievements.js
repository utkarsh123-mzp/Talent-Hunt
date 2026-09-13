document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================== */

    const achievementGrid =
        document.getElementById("achievementGrid");

    const recentAchievements =
        document.getElementById("recentAchievements");

    const searchInput =
        document.getElementById("achievementSearch");

    const filterSelect =
        document.getElementById("achievementFilter");

    const totalAchievements =
        document.getElementById("totalAchievements");

    const competitionWins =
        document.getElementById("competitionWins");

    const certificateCount =
        document.getElementById("certificateCount");

    const badgeCount =
        document.getElementById("badgeCount");

    const studentName =
        document.getElementById("studentName");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".sidebar");


    /* =========================================
       ACHIEVEMENT DATA
    ========================================== */

    const achievements = [

        {
            id: 1,

            title: "Cricket Tournament Winner",

            type: "competition",

            description:
                "Won a college cricket tournament by demonstrating strong teamwork, leadership and competitive performance.",

            date: "Aug 24, 2026",

            icon: "ph-trophy",

            badge: "Winner",

            recent: true
        },


        {
            id: 2,

            title: "Oracle AI Foundation Certified",

            type: "certificate",

            description:
                "Successfully completed the Oracle AI Foundation certification and demonstrated foundational knowledge of Artificial Intelligence.",

            date: "Aug 18, 2026",

            icon: "ph-certificate",

            badge: "Certified",

            recent: true
        },


        {
            id: 3,

            title: "Python Programming Internship",

            type: "certificate",

            description:
                "Successfully completed a Python Programming Internship with hands-on programming tasks and project development.",

            date: "Aug 10, 2026",

            icon: "ph-code",

            badge: "Completed",

            recent: true
        },


        {
            id: 4,

            title: "SQL Assessment Excellence",

            type: "assessment",

            description:
                "Demonstrated strong SQL knowledge through assessment performance and problem-solving tasks.",

            date: "Aug 05, 2026",

            icon: "ph-database",

            badge: "Top Score",

            recent: true
        },


        {
            id: 5,

            title: "Data Analytics Skill Badge",

            type: "badge",

            description:
                "Earned a skill badge for demonstrating knowledge of data analytics, visualization and business intelligence.",

            date: "Jul 30, 2026",

            icon: "ph-chart-bar",

            badge: "Skill Badge",

            recent: false
        },


        {
            id: 6,

            title: "Web Development Achievement",

            type: "badge",

            description:
                "Demonstrated practical knowledge of HTML, CSS and JavaScript through web development projects.",

            date: "Jul 25, 2026",

            icon: "ph-browser",

            badge: "Achievement",

            recent: false
        },


        {
            id: 7,

            title: "Power BI Dashboard Project",

            type: "badge",

            description:
                "Created an interactive Power BI dashboard for analyzing business and operational data.",

            date: "Jul 18, 2026",

            icon: "ph-presentation-chart",

            badge: "Project",

            recent: false
        },


        {
            id: 8,

            title: "Leadership Recognition",

            type: "competition",

            description:
                "Recognized for leadership, coordination and team management during college activities.",

            date: "Jul 12, 2026",

            icon: "ph-users-three",

            badge: "Leadership",

            recent: false
        }

    ];


    /* =========================================
       TYPE LABEL
    ========================================== */

    function getTypeLabel(type) {

        const labels = {

            competition: "Competition",

            certificate: "Certificate",

            badge: "Badge",

            assessment: "Assessment"

        };

        return labels[type] || type;

    }


    /* =========================================
       CARD CLASS
    ========================================== */

    function getCardClass(type) {

        if (type === "competition") {

            return "competition-achievement";

        }

        if (type === "certificate") {

            return "certificate-card";

        }

        if (type === "assessment") {

            return "assessment-achievement";

        }

        return "";

    }


    /* =========================================
       CREATE CARD
    ========================================== */

    function createAchievementCard(achievement) {

        return `

            <article class="
                achievement-card
                ${getCardClass(achievement.type)}
            ">


                <span class="achievement-badge">

                    ${achievement.badge}

                </span>


                <div class="achievement-icon">

                    <i class="ph ${achievement.icon}"></i>

                </div>


                <h3>

                    ${achievement.title}

                </h3>


                <span class="achievement-type">

                    ${getTypeLabel(
                        achievement.type
                    )}

                </span>


                <p class="achievement-description">

                    ${achievement.description}

                </p>


                <div class="achievement-meta">


                    <div class="achievement-date">

                        <i class="ph ph-calendar"></i>

                        <span>
                            ${achievement.date}
                        </span>

                    </div>


                    <button
                        class="view-achievement-btn"
                        data-id="${achievement.id}"
                    >

                        View Details

                    </button>


                </div>


            </article>

        `;

    }


    /* =========================================
       FILTER ACHIEVEMENTS
    ========================================== */

    function getFilteredAchievements() {

        const search =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedType =
            filterSelect
                ? filterSelect.value
                : "all";


        return achievements.filter(
            achievement => {

                const searchableText = (

                    achievement.title +
                    " " +
                    achievement.description +
                    " " +
                    achievement.badge

                ).toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        search
                    );


                const matchesType =
                    selectedType === "all" ||
                    achievement.type ===
                        selectedType;


                return (
                    matchesSearch &&
                    matchesType
                );

            }
        );

    }


    /* =========================================
       RENDER ACHIEVEMENTS
    ========================================== */

    function renderAchievements() {

        const filtered =
            getFilteredAchievements();


        const recent =
            filtered.filter(
                achievement =>
                    achievement.recent
            );


        /* RECENT */

        if (recent.length > 0) {

            recentAchievements.innerHTML =
                recent
                    .map(createAchievementCard)
                    .join("");

        } else {

            recentAchievements.innerHTML = `

                <div class="achievement-empty">

                    <i class="ph ph-medal"></i>

                    <h3>
                        No Recent Achievements
                    </h3>

                    <p>
                        Try changing your search
                        or filter.
                    </p>

                </div>

            `;

        }


        /* ALL */

        if (filtered.length > 0) {

            achievementGrid.innerHTML =
                filtered
                    .map(createAchievementCard)
                    .join("");

        } else {

            achievementGrid.innerHTML = `

                <div class="achievement-empty">

                    <i class="ph ph-magnifying-glass"></i>

                    <h3>
                        No Achievements Found
                    </h3>

                    <p>
                        Try a different search
                        or filter.
                    </p>

                </div>

            `;

        }


        attachViewButtons();

    }


    /* =========================================
       UPDATE STATISTICS
    ========================================== */

    function updateStats() {

        if (totalAchievements) {

            totalAchievements.textContent =
                achievements.length;

        }


        if (competitionWins) {

            competitionWins.textContent =
                achievements.filter(
                    achievement =>
                        achievement.type ===
                        "competition"
                ).length;

        }


        if (certificateCount) {

            certificateCount.textContent =
                achievements.filter(
                    achievement =>
                        achievement.type ===
                        "certificate"
                ).length;

        }


        if (badgeCount) {

            badgeCount.textContent =
                achievements.filter(
                    achievement =>
                        achievement.type ===
                        "badge"
                ).length;

        }

    }


    /* =========================================
       VIEW DETAILS
    ========================================== */

    function viewAchievement(id) {

        const achievement =
            achievements.find(
                item =>
                    item.id === id
            );


        if (!achievement) return;


        alert(

            achievement.title +

            "\n\nType: " +
            getTypeLabel(
                achievement.type
            ) +

            "\nDate: " +
            achievement.date +

            "\nBadge: " +
            achievement.badge +

            "\n\n" +
            achievement.description

        );

    }


    /* =========================================
       VIEW BUTTON EVENTS
    ========================================== */

    function attachViewButtons() {

        document
            .querySelectorAll(
                ".view-achievement-btn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        viewAchievement(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            });

    }


    /* =========================================
       SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderAchievements
        );

    }


    /* =========================================
       FILTER
    ========================================== */

    if (filterSelect) {

        filterSelect.addEventListener(
            "change",
            renderAchievements
        );

    }


    /* =========================================
       MOBILE MENU
    ========================================== */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "studentName"
                );

                window.location.href =
                    "../index.html";

            }
        );

    }


    /* =========================================
       STUDENT NAME
    ========================================== */

    const storedName =
        localStorage.getItem(
            "studentName"
        );


    if (
        storedName &&
        studentName
    ) {

        studentName.textContent =
            storedName;

    }


    /* =========================================
       INITIAL LOAD
    ========================================== */

    renderAchievements();

    updateStats();

});