document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================== */

    const opportunityGrid =
        document.getElementById("opportunityGrid");

    const recommendedGrid =
        document.getElementById("recommendedGrid");

    const applicationsGrid =
        document.getElementById("applicationsGrid");

    const searchInput =
        document.getElementById("opportunitySearch");

    const typeFilter =
        document.getElementById("opportunityType");

    const categoryFilter =
        document.getElementById("opportunityCategory");

    const availableCount =
        document.getElementById("availableCount");

    const recommendedCount =
        document.getElementById("recommendedCount");

    const appliedCount =
        document.getElementById("appliedCount");

    const savedCount =
        document.getElementById("savedCount");

    const studentName =
        document.getElementById("studentName");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".sidebar");


    /* =========================================
       OPPORTUNITY DATA
    ========================================== */

    const opportunities = [

        {
            id: 1,
            title: "Software Developer Intern",
            company: "TechNova Solutions",
            type: "internship",
            category: "software",

            description:
                "Work with a development team to build scalable software applications and solve real-world problems.",

            location: "Remote",
            mode: "Work From Home",
            deadline: "Sep 20, 2026",

            stipend: "₹20K / Month",

            icon: "ph-code",

            skills: [
                "Python",
                "JavaScript",
                "SQL"
            ],

            recommended: true
        },


        {
            id: 2,
            title: "Data Analyst Intern",
            company: "DataSphere Analytics",
            type: "internship",
            category: "data",

            description:
                "Analyze business data and create dashboards that help organizations make better decisions.",

            location: "Bangalore",
            mode: "Hybrid",
            deadline: "Sep 25, 2026",

            stipend: "₹18K / Month",

            icon: "ph-chart-bar",

            skills: [
                "SQL",
                "Excel",
                "Power BI"
            ],

            recommended: true
        },


        {
            id: 3,
            title: "Frontend Developer Intern",
            company: "PixelCraft Technologies",
            type: "internship",
            category: "web",

            description:
                "Build responsive and interactive web interfaces using modern frontend technologies.",

            location: "Remote",
            mode: "Work From Home",
            deadline: "Sep 28, 2026",

            stipend: "₹15K / Month",

            icon: "ph-browser",

            skills: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            recommended: true
        },


        {
            id: 4,
            title: "AI / ML Intern",
            company: "FutureMind AI",
            type: "internship",
            category: "ai",

            description:
                "Work on machine learning models and AI-powered applications with an experienced team.",

            location: "Hyderabad",
            mode: "Hybrid",
            deadline: "Oct 02, 2026",

            stipend: "₹25K / Month",

            icon: "ph-robot",

            skills: [
                "Python",
                "Machine Learning",
                "AI"
            ],

            recommended: false
        },


        {
            id: 5,
            title: "Junior Software Developer",
            company: "InnovateX Labs",
            type: "fulltime",
            category: "software",

            description:
                "Join our engineering team and contribute to production software applications.",

            location: "Noida",
            mode: "On Site",
            deadline: "Oct 05, 2026",

            stipend: "₹6 LPA",

            icon: "ph-laptop",

            skills: [
                "Java",
                "Python",
                "SQL"
            ],

            recommended: false
        },


        {
            id: 6,
            title: "UI/UX Design Intern",
            company: "CreativeStack",
            type: "internship",
            category: "design",

            description:
                "Design intuitive digital experiences and collaborate with developers and product teams.",

            location: "Mumbai",
            mode: "Hybrid",
            deadline: "Oct 08, 2026",

            stipend: "₹16K / Month",

            icon: "ph-paint-brush",

            skills: [
                "Figma",
                "UI/UX",
                "Prototyping"
            ],

            recommended: false
        },


        {
            id: 7,
            title: "Backend Developer Intern",
            company: "CloudBridge Technologies",
            type: "internship",
            category: "software",

            description:
                "Develop APIs and backend services while working with databases and cloud technologies.",

            location: "Pune",
            mode: "Hybrid",
            deadline: "Oct 12, 2026",

            stipend: "₹22K / Month",

            icon: "ph-database",

            skills: [
                "Node.js",
                "Express",
                "MongoDB"
            ],

            recommended: false
        },


        {
            id: 8,
            title: "Data Science Challenge",
            company: "InsightHub",

            type: "hackathon",
            category: "data",

            description:
                "Solve real-world data problems and demonstrate your analytical and machine learning skills.",

            location: "Online",
            mode: "Virtual",
            deadline: "Oct 15, 2026",

            stipend: "₹30,000 Prize",

            icon: "ph-chart-line-up",

            skills: [
                "Python",
                "Pandas",
                "Machine Learning"
            ],

            recommended: true
        }

    ];


    /* =========================================
       LOCAL STORAGE
    ========================================== */

    let savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "savedOpportunities"
            )
        ) || [];


    let appliedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "appliedOpportunities"
            )
        ) || [];


    /* =========================================
       CATEGORY LABEL
    ========================================== */

    function getCategoryName(category) {

        const names = {

            software: "Software Development",

            data: "Data Analytics",

            ai: "AI / ML",

            web: "Web Development",

            design: "UI / UX"

        };

        return names[category] || category;

    }


    /* =========================================
       TYPE LABEL
    ========================================== */

    function getTypeName(type) {

        const names = {

            internship: "Internship",

            fulltime: "Full Time",

            parttime: "Part Time",

            hackathon: "Hackathon"

        };

        return names[type] || type;

    }


    /* =========================================
       SAVE STATE
    ========================================== */

    function saveData() {

        localStorage.setItem(
            "savedOpportunities",
            JSON.stringify(savedOpportunities)
        );


        localStorage.setItem(
            "appliedOpportunities",
            JSON.stringify(appliedOpportunities)
        );

    }


    /* =========================================
       CARD HTML
    ========================================== */

    function createCard(opportunity) {

        const isSaved =
            savedOpportunities.includes(
                opportunity.id
            );


        const isApplied =
            appliedOpportunities.some(
                item =>
                    item.id === opportunity.id
            );


        return `

            <article
                class="opportunity-card
                ${opportunity.recommended
                    ? "recommended-card"
                    : ""}"
            >

                <div class="opportunity-card-top">

                    <span class="opportunity-type-badge">
                        ${getTypeName(
                            opportunity.type
                        )}
                    </span>


                    ${
                        opportunity.recommended
                        ? `
                            <span class="recommended-label">
                                <i class="ph ph-sparkle"></i>
                                Recommended
                            </span>
                        `
                        : ""
                    }


                    <button
                        class="opportunity-save
                        ${isSaved ? "saved" : ""}"
                        data-id="${opportunity.id}"
                        title="Save Opportunity"
                    >

                        <i class="ph
                            ${
                                isSaved
                                ? "ph-bookmark-simple-fill"
                                : "ph-bookmark-simple"
                            }">
                        </i>

                    </button>


                    <div class="opportunity-icon">

                        <i class="ph
                            ${opportunity.icon}">
                        </i>

                    </div>

                </div>


                <div class="opportunity-card-body">

                    <h3>
                        ${opportunity.title}
                    </h3>


                    <div class="opportunity-company">

                        ${opportunity.company}

                    </div>


                    <p class="opportunity-description">

                        ${opportunity.description}

                    </p>


                    <div class="opportunity-meta">

                        <div class="opportunity-meta-item">

                            <i class="ph ph-map-pin"></i>

                            <span>
                                ${opportunity.location}
                            </span>

                        </div>


                        <div class="opportunity-meta-item">

                            <i class="ph ph-calendar"></i>

                            <span>
                                ${opportunity.deadline}
                            </span>

                        </div>


                        <div class="opportunity-meta-item">

                            <i class="ph ph-buildings"></i>

                            <span>
                                ${opportunity.mode}
                            </span>

                        </div>


                        <div class="opportunity-meta-item">

                            <i class="ph ph-currency-inr"></i>

                            <span>
                                ${opportunity.stipend}
                            </span>

                        </div>

                    </div>


                    <div class="opportunity-skills">

                        ${opportunity.skills
                            .map(
                                skill => `
                                    <span class="opportunity-skill">
                                        ${skill}
                                    </span>
                                `
                            )
                            .join("")}

                    </div>


                    <div class="opportunity-actions">

                        <button
                            class="view-opportunity-btn"
                            data-id="${opportunity.id}"
                        >

                            View Details

                        </button>


                        <button
                            class="apply-opportunity-btn
                            ${isApplied ? "applied" : ""}"
                            data-id="${opportunity.id}"
                            ${isApplied ? "disabled" : ""}
                        >

                            ${
                                isApplied
                                ? "✓ Applied"
                                : "Apply Now"
                            }

                        </button>

                    </div>

                </div>

            </article>

        `;

    }


    /* =========================================
       FILTER OPPORTUNITIES
    ========================================== */

    function getFilteredOpportunities() {

        const search =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedType =
            typeFilter
                ? typeFilter.value
                : "all";


        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        return opportunities.filter(
            opportunity => {

                const searchableText = (

                    opportunity.title +
                    " " +
                    opportunity.company +
                    " " +
                    opportunity.description +
                    " " +
                    opportunity.skills.join(" ")

                ).toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        search
                    );


                const matchesType =
                    selectedType === "all" ||
                    opportunity.type ===
                        selectedType;


                const matchesCategory =
                    selectedCategory === "all" ||
                    opportunity.category ===
                        selectedCategory;


                return (
                    matchesSearch &&
                    matchesType &&
                    matchesCategory
                );

            }
        );

    }


    /* =========================================
       RENDER ALL
    ========================================== */

    function renderOpportunities() {

        const filtered =
            getFilteredOpportunities();


        const recommended =
            filtered.filter(
                opportunity =>
                    opportunity.recommended
            );


        if (recommended.length > 0) {

            recommendedGrid.innerHTML =
                recommended
                    .map(createCard)
                    .join("");

        } else {

            recommendedGrid.innerHTML = `

                <div class="opportunity-empty">

                    <i class="ph ph-sparkle"></i>

                    <h3>
                        No Recommendations Found
                    </h3>

                    <p>
                        Try changing your search
                        or filters.
                    </p>

                </div>

            `;

        }


        if (filtered.length > 0) {

            opportunityGrid.innerHTML =
                filtered
                    .map(createCard)
                    .join("");

        } else {

            opportunityGrid.innerHTML = `

                <div class="opportunity-empty">

                    <i class="ph ph-magnifying-glass"></i>

                    <h3>
                        No Opportunities Found
                    </h3>

                    <p>
                        Try a different search
                        or filter.
                    </p>

                </div>

            `;

        }


        attachCardEvents();

    }


    /* =========================================
       SAVE OPPORTUNITY
    ========================================== */

    function toggleSave(id) {

        if (
            savedOpportunities.includes(id)
        ) {

            savedOpportunities =
                savedOpportunities.filter(
                    savedId =>
                        savedId !== id
                );

        } else {

            savedOpportunities.push(id);

        }


        saveData();

        renderOpportunities();

        updateStats();

    }


    /* =========================================
       APPLY
    ========================================== */

    async function applyOpportunity(id) {

        const opportunity =
            opportunities.find(
                item =>
                    item.id === id
            );


        if (!opportunity) return;


        if (
            appliedOpportunities.some(
                item =>
                    item.id === id
            )
        ) {

            return;

        }

        if (window.TalentHuntAPI && opportunity._id) {
            try {
                await TalentHuntAPI.opportunities.apply(opportunity._id);
            } catch (err) {
                alert(err.message || "Failed to submit application");
                return;
            }
        }

        appliedOpportunities.push({

            id: opportunity.id,

            title: opportunity.title,

            company: opportunity.company,

            date: new Date()
                .toLocaleDateString(
                    "en-IN"
                ),

            status: "Under Review"

        });


        saveData();

        renderOpportunities();

        renderApplications();

        updateStats();


        alert(
            "Application submitted successfully!"
        );

    }



    /* =========================================
       VIEW DETAILS
    ========================================== */

    function viewDetails(id) {

        const opportunity =
            opportunities.find(
                item =>
                    item.id === id
            );


        if (!opportunity) return;


        alert(

            opportunity.title +

            "\n\nCompany: " +
            opportunity.company +

            "\n\nCategory: " +
            getCategoryName(
                opportunity.category
            ) +

            "\nType: " +
            getTypeName(
                opportunity.type
            ) +

            "\nLocation: " +
            opportunity.location +

            "\nMode: " +
            opportunity.mode +

            "\nDeadline: " +
            opportunity.deadline +

            "\nReward: " +
            opportunity.stipend +

            "\n\nSkills:\n" +
            opportunity.skills.join(
                " • "
            ) +

            "\n\n" +
            opportunity.description

        );

    }


    /* =========================================
       CARD EVENTS
    ========================================== */

    function attachCardEvents() {

        document
            .querySelectorAll(
                ".opportunity-save"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        toggleSave(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            });


        document
            .querySelectorAll(
                ".apply-opportunity-btn:not(.applied)"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        applyOpportunity(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            });


        document
            .querySelectorAll(
                ".view-opportunity-btn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        viewDetails(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            });

    }


    /* =========================================
       MY APPLICATIONS
    ========================================== */

    function renderApplications() {

        if (
            appliedOpportunities.length === 0
        ) {

            applicationsGrid.innerHTML = `

                <div class="opportunity-empty">

                    <i class="ph ph-paper-plane-tilt"></i>

                    <h3>
                        No Applications Yet
                    </h3>

                    <p>
                        Apply to an opportunity
                        to track it here.
                    </p>

                </div>

            `;

            return;

        }


        applicationsGrid.innerHTML =
            appliedOpportunities
                .map(
                    application => `

                        <div class="application-card">

                            <div class="application-info">

                                <div class="application-icon">

                                    <i class="ph ph-briefcase"></i>

                                </div>


                                <div>

                                    <h3>
                                        ${application.title}
                                    </h3>

                                    <p>
                                        ${application.company}
                                        · Applied
                                        ${application.date}
                                    </p>

                                </div>

                            </div>


                            <span class="application-status">

                                ${application.status}

                            </span>

                        </div>

                    `
                )
                .join("");

    }


    /* =========================================
       UPDATE STATS
    ========================================== */

    function updateStats() {

        if (availableCount) {

            availableCount.textContent =
                opportunities.length;

        }


        if (recommendedCount) {

            recommendedCount.textContent =
                opportunities.filter(
                    opportunity =>
                        opportunity.recommended
                ).length;

        }


        if (appliedCount) {

            appliedCount.textContent =
                appliedOpportunities.length;

        }


        if (savedCount) {

            savedCount.textContent =
                savedOpportunities.length;

        }

    }


    /* =========================================
       SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderOpportunities
        );

    }


    /* =========================================
       TYPE FILTER
    ========================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            renderOpportunities
        );

    }


    /* =========================================
       CATEGORY FILTER
    ========================================== */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            renderOpportunities
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
            async () => {
                if (window.TalentHuntAPI) {
                    try {
                        await TalentHuntAPI.auth.logout();
                    } catch (e) {
                        console.warn("Logout error:", e);
                    }
                }

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
       INITIAL LOAD & BACKEND SYNC
    ========================================== */

    async function initOpportunities() {
        if (window.TalentHuntAPI) {
            try {
                const me = await TalentHuntAPI.auth.getMe();
                if (me.data && me.data.user && studentName) {
                    studentName.textContent = me.data.user.name;
                }
            } catch (e) {}

            try {
                const res = await TalentHuntAPI.opportunities.getAll();
                if (res.data && res.data.opportunities && res.data.opportunities.length > 0) {
                    const backendOpps = res.data.opportunities.map((item, index) => ({
                        _id: item._id,
                        id: 5000 + index,
                        title: item.title,
                        company: item.organization || "Company",
                        type: (item.type || "internship").toLowerCase(),
                        category: (item.category || "software").toLowerCase(),
                        description: item.description,
                        location: item.location || "Remote",
                        mode: item.mode || "Online",
                        deadline: item.deadline ? new Date(item.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Ongoing",
                        stipend: item.salary || "Competitive",
                        icon: "ph-briefcase",
                        skills: item.skills || [],
                        recommended: true
                    }));

                    backendOpps.forEach(bo => {
                        if (!opportunities.some(o => o.title.toLowerCase() === bo.title.toLowerCase())) {
                            opportunities.unshift(bo);
                        }
                    });
                }
            } catch (e) {
                console.warn("Error fetching backend opportunities:", e);
            }

            try {
                const appRes = await TalentHuntAPI.applications.getMy();
                if (appRes.data && appRes.data.applications) {
                    appRes.data.applications.forEach(app => {
                        if (app.opportunity) {
                            const oppTitle = app.opportunity.title || "Opportunity";
                            const oppCompany = app.opportunity.organization || "Company";
                            if (!appliedOpportunities.some(item => item.title === oppTitle)) {
                                appliedOpportunities.push({
                                    id: app.opportunity._id,
                                    title: oppTitle,
                                    company: oppCompany,
                                    date: new Date(app.appliedAt).toLocaleDateString("en-IN"),
                                    status: app.status
                                });
                            }
                        }
                    });
                }
            } catch (e) {
                console.warn("Error fetching backend applications:", e);
            }
        }

        renderOpportunities();
        renderApplications();
        updateStats();
    }

    initOpportunities();

});