document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================== */

    const competitionGrid =
        document.getElementById("competitionGrid");

    const myCompetitionGrid =
        document.getElementById("myCompetitionGrid");

    const searchInput =
        document.getElementById("competitionSearch");

    const filterSelect =
        document.getElementById("competitionFilter");

    const availableCount =
        document.getElementById("availableCount");

    const upcomingCount =
        document.getElementById("upcomingCount");

    const joinedCount =
        document.getElementById("joinedCount");

    const achievementCount =
        document.getElementById("achievementCount");

    const studentName =
        document.getElementById("studentName");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".sidebar");


    /* =========================================
       STUDENT NAME
    ========================================== */

    const savedName =
        localStorage.getItem("studentName");

    if (savedName && studentName) {
        studentName.textContent = savedName;
    }


    /* =========================================
       COMPETITION DATA
    ========================================== */

    const competitions = [

        {
            id: 1,
            title: "CodeSprint Challenge",
            category: "coding",
            description:
                "Solve programming problems and demonstrate your coding and problem-solving skills.",
            icon: "ph-code",
            status: "Open",
            participants: 128,
            date: "Sep 15, 2026",
            duration: "2 Hours",
            prize: "₹25,000",
            skills: [
                "Python",
                "DSA",
                "Problem Solving"
            ]
        },

        {
            id: 2,
            title: "Data Analytics Challenge",
            category: "data",
            description:
                "Analyze real-world datasets and create meaningful data-driven insights.",
            icon: "ph-chart-bar",
            status: "Open",
            participants: 96,
            date: "Sep 20, 2026",
            duration: "3 Hours",
            prize: "₹20,000",
            skills: [
                "SQL",
                "Power BI",
                "Excel"
            ]
        },

        {
            id: 3,
            title: "UI/UX Design Contest",
            category: "design",
            description:
                "Create an engaging digital experience and showcase your design thinking.",
            icon: "ph-paint-brush",
            status: "Open",
            participants: 74,
            date: "Sep 25, 2026",
            duration: "4 Hours",
            prize: "₹15,000",
            skills: [
                "UI/UX",
                "Figma",
                "Design"
            ]
        },

        {
            id: 4,
            title: "Innovation Hackathon",
            category: "innovation",
            description:
                "Build an innovative solution to solve a real-world problem.",
            icon: "ph-lightbulb",
            status: "Upcoming",
            participants: 210,
            date: "Oct 05, 2026",
            duration: "24 Hours",
            prize: "₹50,000",
            skills: [
                "Innovation",
                "Technology",
                "Teamwork"
            ]
        },

        {
            id: 5,
            title: "Web Development Cup",
            category: "coding",
            description:
                "Build a modern responsive website using your frontend development skills.",
            icon: "ph-globe",
            status: "Open",
            participants: 112,
            date: "Oct 10, 2026",
            duration: "6 Hours",
            prize: "₹18,000",
            skills: [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },

        {
            id: 6,
            title: "AI & Future Tech Challenge",
            category: "innovation",
            description:
                "Explore artificial intelligence and create a solution for the future.",
            icon: "ph-robot",
            status: "Upcoming",
            participants: 156,
            date: "Oct 18, 2026",
            duration: "12 Hours",
            prize: "₹35,000",
            skills: [
                "AI",
                "Python",
                "Machine Learning"
            ]
        }

    ];


    /* =========================================
       LOCAL STORAGE
    ========================================== */

    let joinedCompetitions =
        JSON.parse(
            localStorage.getItem(
                "joinedCompetitions"
            )
        ) || [];


    /* =========================================
       RENDER COMPETITIONS
    ========================================== */

    function renderCompetitions() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        const selectedCategory =
            filterSelect
                ? filterSelect.value
                : "all";


        const filtered =
            competitions.filter(function (competition) {

                const matchesSearch =
                    competition.title
                        .toLowerCase()
                        .includes(searchTerm) ||

                    competition.description
                        .toLowerCase()
                        .includes(searchTerm) ||

                    competition.skills.some(
                        function (skill) {

                            return skill
                                .toLowerCase()
                                .includes(searchTerm);

                        }
                    );


                const matchesCategory =
                    selectedCategory === "all" ||
                    competition.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        if (filtered.length === 0) {

            competitionGrid.innerHTML = `

                <div class="competition-empty">

                    <i class="ph ph-magnifying-glass"></i>

                    <h3>
                        No Competitions Found
                    </h3>

                    <p>
                        Try changing your search
                        or category filter.
                    </p>

                </div>

            `;

            return;
        }


        competitionGrid.innerHTML =
            filtered.map(function (competition) {

                const isJoined =
                    joinedCompetitions.includes(
                        competition.id
                    );


                return `

                    <div class="competition-card">

                        <div class="competition-card-top">

                            <span class="competition-category">
                                ${getCategoryName(
                                    competition.category
                                )}
                            </span>


                            <div class="competition-icon">

                                <i class="ph ${competition.icon}">
                                </i>

                            </div>


                            <span class="competition-status">

                                ${competition.status}

                            </span>

                        </div>


                        <div class="competition-card-body">

                            <h3>
                                ${competition.title}
                            </h3>


                            <p class="competition-description">

                                ${competition.description}

                            </p>


                            <div class="competition-meta">

                                <div class="meta-item">

                                    <i class="ph ph-calendar"></i>

                                    <span>
                                        ${competition.date}
                                    </span>

                                </div>


                                <div class="meta-item">

                                    <i class="ph ph-clock"></i>

                                    <span>
                                        ${competition.duration}
                                    </span>

                                </div>


                                <div class="meta-item">

                                    <i class="ph ph-users"></i>

                                    <span>
                                        ${competition.participants}
                                        Participants
                                    </span>

                                </div>


                                <div class="meta-item">

                                    <i class="ph ph-currency-inr"></i>

                                    <span>
                                        ${competition.prize}
                                    </span>

                                </div>

                            </div>


                            <div class="competition-skills">

                                ${competition.skills
                                    .map(function (skill) {

                                        return `

                                            <span class="skill-tag">
                                                ${skill}
                                            </span>

                                        `;

                                    })
                                    .join("")}

                            </div>


                            <button
                                class="join-btn
                                ${isJoined ? "joined" : ""}"
                                data-id="${competition.id}"
                                ${isJoined ? "disabled" : ""}
                            >

                                <i class="ph
                                    ${isJoined
                                        ? "ph-check"
                                        : "ph-plus"}">
                                </i>

                                ${isJoined
                                    ? "Joined"
                                    : "Join Competition"}

                            </button>

                        </div>

                    </div>

                `;

            }).join("");


        attachJoinEvents();

    }


    /* =========================================
       CATEGORY NAME
    ========================================== */

    function getCategoryName(category) {

        const categories = {

            coding: "Coding",

            data: "Data Analytics",

            design: "Design",

            innovation: "Innovation"

        };

        return categories[category] ||
               "Competition";
    }


    /* =========================================
       JOIN COMPETITION
    ========================================== */

    function attachJoinEvents() {

        const joinButtons =
            document.querySelectorAll(
                ".join-btn:not(.joined)"
            );


        joinButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );


                    if (
                        !joinedCompetitions
                            .includes(id)
                    ) {

                        joinedCompetitions.push(id);


                        localStorage.setItem(
                            "joinedCompetitions",
                            JSON.stringify(
                                joinedCompetitions
                            )
                        );


                        renderCompetitions();

                        renderMyCompetitions();

                        updateStats();


                        alert(
                            "You joined the competition successfully!"
                        );

                    }

                }
            );

        });

    }


    /* =========================================
       MY COMPETITIONS
    ========================================== */

    function renderMyCompetitions() {

        const myCompetitions =
            competitions.filter(
                function (competition) {

                    return joinedCompetitions
                        .includes(
                            competition.id
                        );

                }
            );


        if (myCompetitions.length === 0) {

            myCompetitionGrid.innerHTML = `

                <div class="competition-empty">

                    <i class="ph ph-trophy"></i>

                    <h3>
                        No Competitions Joined
                    </h3>

                    <p>
                        Join a competition to see
                        it here.
                    </p>

                </div>

            `;

            return;
        }


        myCompetitionGrid.innerHTML =
            myCompetitions.map(
                function (competition) {

                    return `

                        <div class="my-competition-card">

                            <div class="my-competition-info">

                                <div class="my-competition-icon">

                                    <i class="ph
                                        ${competition.icon}">
                                    </i>

                                </div>


                                <div>

                                    <h3>
                                        ${competition.title}
                                    </h3>

                                    <p>
                                        ${competition.date}
                                        ·
                                        ${competition.status}
                                    </p>

                                </div>

                            </div>


                            <button
                                class="view-btn"
                                data-id="${competition.id}"
                            >

                                View Details

                            </button>

                        </div>

                    `;

                }
            ).join("");


        attachViewEvents();

    }


    /* =========================================
       VIEW DETAILS
    ========================================== */

    function attachViewEvents() {

        const viewButtons =
            document.querySelectorAll(
                ".view-btn"
            );


        viewButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );


                    const competition =
                        competitions.find(
                            function (item) {

                                return item.id === id;

                            }
                        );


                    if (competition) {

                        alert(

                            competition.title +
                            "\n\n" +

                            competition.description +
                            "\n\n" +

                            "Date: " +
                            competition.date +

                            "\nDuration: " +
                            competition.duration +

                            "\nPrize: " +
                            competition.prize

                        );

                    }

                }
            );

        });

    }


    /* =========================================
       UPDATE STATISTICS
    ========================================== */

    function updateStats() {

        const available =
            competitions.filter(
                function (competition) {

                    return competition.status ===
                        "Open";

                }
            ).length;


        const upcoming =
            competitions.filter(
                function (competition) {

                    return competition.status ===
                        "Upcoming";

                }
            ).length;


        if (availableCount) {

            availableCount.textContent =
                available;

        }


        if (upcomingCount) {

            upcomingCount.textContent =
                upcoming;

        }


        if (joinedCount) {

            joinedCount.textContent =
                joinedCompetitions.length;

        }


        if (achievementCount) {

            const achievements =
                JSON.parse(
                    localStorage.getItem(
                        "achievements"
                    )
                ) || [];

            achievementCount.textContent =
                achievements.length;

        }

    }


    /* =========================================
       SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                renderCompetitions();

            }
        );

    }


    /* =========================================
       FILTER
    ========================================== */

    if (filterSelect) {

        filterSelect.addEventListener(
            "change",
            function () {

                renderCompetitions();

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "studentName"
                );

                window.location.href =
                    "../index.html";

            }
        );

    }


    /* =========================================
       MOBILE SIDEBAR
    ========================================== */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================== */

    renderCompetitions();

    renderMyCompetitions();

    updateStats();

});