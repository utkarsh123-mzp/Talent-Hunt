/* =========================================
   TALENT HUNT
   TEACHER PORTAL - OPPORTUNITIES JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const searchInput =
        document.getElementById("searchInput");

    const subjectFilter =
        document.getElementById("subjectFilter");

    const modeFilter =
        document.getElementById("modeFilter");

    const classFilter =
        document.getElementById("classFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const resetFilters =
        document.getElementById("resetFilters");

    const opportunityCards =
        document.querySelectorAll(".opportunity-card");

    const opportunitiesGrid =
        document.getElementById("opportunitiesGrid");

    const noResults =
        document.getElementById("noResults");


    /* =========================================
       MODAL ELEMENTS
    ========================================= */

    const opportunityModal =
        document.getElementById("opportunityModal");

    const closeOpportunity =
        document.getElementById("closeOpportunity");

    const applyBtn =
        document.getElementById("applyBtn");

    const saveOpportunity =
        document.getElementById("saveOpportunity");

    const successModal =
        document.getElementById("successModal");

    const successClose =
        document.getElementById("successClose");


    /* =========================================
       MODAL DATA
    ========================================= */

    const opportunities = {

        1: {
            title: "Mathematics Teacher",
            organization: "School Student Program",
            subject: "Mathematics",
            className: "Class 9–10",
            mode: "One-to-One",
            location: "Lucknow",
            schedule: "Evening",
            duration: "6 Months",
            fee: "₹12,000/month",
            description:
                "Teach Mathematics to school students with a focus on concept clarity, problem solving and examination preparation."
        },

        2: {
            title: "Full Stack Development Mentor",
            organization: "College Skill Program",
            subject: "Computer Science",
            className: "College",
            mode: "Online",
            location: "Online",
            schedule: "Flexible",
            duration: "4 Months",
            fee: "₹18,000/month",
            description:
                "Guide college students through frontend, backend and full stack development with practical projects and coding practice."
        },

        3: {
            title: "Science Teacher",
            organization: "Home Centre Program",
            subject: "Science",
            className: "Class 5–8",
            mode: "Home Centre",
            location: "Kanpur",
            schedule: "Morning",
            duration: "6 Months",
            fee: "₹10,000/month",
            description:
                "Help school students build strong Science fundamentals through interactive explanations, examples and regular practice."
        },

        4: {
            title: "English Communication Teacher",
            organization: "Student Development Program",
            subject: "English",
            className: "Class 9–10",
            mode: "One-to-One",
            location: "Varanasi",
            schedule: "Evening",
            duration: "3 Months",
            fee: "₹9,000/month",
            description:
                "Help students improve English communication, vocabulary, confidence, speaking and presentation skills."
        },

        5: {
            title: "Data Analytics Mentor",
            organization: "College Career Program",
            subject: "Data Analytics",
            className: "College",
            mode: "Online",
            location: "Online",
            schedule: "Flexible",
            duration: "6 Months",
            fee: "₹20,000/month",
            description:
                "Mentor college students in Excel, SQL, Power BI, Python and data analytics projects for career development."
        },

        6: {
            title: "Quantitative Aptitude Mentor",
            organization: "College Placement Program",
            subject: "Mathematics",
            className: "College",
            mode: "Offline",
            location: "Prayagraj",
            schedule: "Weekend",
            duration: "3 Months",
            fee: "₹15,000/month",
            description:
                "Prepare college students for quantitative aptitude, logical problem solving and placement-oriented examinations."
        }

    };


    /* =========================================
       OPEN OPPORTUNITY
    ========================================= */

    function openOpportunity(id) {

        const data =
            opportunities[id];

        if (!data) {
            return;
        }


        document.getElementById("modalTitle")
            .textContent = data.title;

        document.getElementById("modalOrganization")
            .textContent = data.organization;

        document.getElementById("modalSubject")
            .textContent = data.subject;

        document.getElementById("modalClass")
            .textContent = data.className;

        document.getElementById("modalMode")
            .textContent = data.mode;

        document.getElementById("modalLocation")
            .textContent = data.location;

        document.getElementById("modalSchedule")
            .textContent = data.schedule;

        document.getElementById("modalDuration")
            .textContent = data.duration;

        document.getElementById("modalFee")
            .textContent = data.fee;

        document.getElementById("modalDescription")
            .textContent = data.description;


        applyBtn.dataset.id = id;

        saveOpportunity.dataset.id = id;


        opportunityModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =========================================
       CLOSE OPPORTUNITY
    ========================================= */

    function closeOpportunityModal() {

        opportunityModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    closeOpportunity.addEventListener(
        "click",
        closeOpportunityModal
    );


    opportunityModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === opportunityModal
            ) {

                closeOpportunityModal();

            }

        }
    );


    /* =========================================
       VIEW DETAILS BUTTONS
    ========================================= */

    document
        .querySelectorAll(".view-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    openOpportunity(id);

                }
            );

        });


    /* =========================================
       APPLY NOW
    ========================================= */

    applyBtn.addEventListener(
        "click",
        async () => {

            const id =
                applyBtn.dataset.id;

            const data =
                opportunities[id];

            if (!data) {
                return;
            }


            const confirmApply =
                confirm(
                    `Apply for "${data.title}"?\n\n` +
                    `Your teacher profile and application details will be submitted for review.`
                );


            if (!confirmApply) {
                return;
            }

            if (window.TalentHuntAPI && data._id) {
                try {
                    await TalentHuntAPI.opportunities.apply(data._id);
                } catch (err) {
                    alert(err.message || "Failed to apply");
                    return;
                }
            }


            closeOpportunityModal();

            successModal.classList.add("show");

            document.body.style.overflow = "hidden";


            updateApplicationStats();

        }
    );


    /* =========================================
       SUCCESS MODAL
    ========================================= */

    successClose.addEventListener(
        "click",
        () => {

            successModal.classList.remove("show");

            document.body.style.overflow = "";

        }
    );


    successModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === successModal
            ) {

                successModal.classList.remove("show");

                document.body.style.overflow = "";

            }

        }
    );


    /* =========================================
       SAVE OPPORTUNITY
    ========================================= */

    saveOpportunity.addEventListener(
        "click",
        () => {

            const id =
                saveOpportunity.dataset.id;

            const data =
                opportunities[id];

            if (!data) {
                return;
            }


            saveOpportunity.innerHTML =
                '<i class="fa-solid fa-bookmark"></i> Saved';

            saveOpportunity.style.color =
                "#4f46e5";


            alert(
                `"${data.title}" has been saved.`
            );

        }
    );


    /* =========================================
       FILTER FUNCTION
    ========================================= */

    function filterOpportunities() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();

        const selectedSubject =
            subjectFilter.value;

        const selectedMode =
            modeFilter.value;

        const selectedClass =
            classFilter.value;


        let visibleCount = 0;


        opportunityCards.forEach(card => {

            const subject =
                card.dataset.subject;

            const mode =
                card.dataset.mode;

            const classType =
                card.dataset.class;

            const title =
                card.dataset.title.toLowerCase();

            const location =
                card.dataset.location.toLowerCase();


            const searchMatch =
                searchTerm === "" ||
                title.includes(searchTerm) ||
                location.includes(searchTerm) ||
                subject.includes(searchTerm);


            const subjectMatch =
                selectedSubject === "all" ||
                subject === selectedSubject;


            const modeMatch =
                selectedMode === "all" ||
                mode === selectedMode;


            const classMatch =
                selectedClass === "all" ||
                classType === selectedClass;


            if (
                searchMatch &&
                subjectMatch &&
                modeMatch &&
                classMatch
            ) {

                card.style.display = "flex";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            noResults.classList.add("show");

            opportunitiesGrid.style.display =
                "none";

        } else {

            noResults.classList.remove("show");

            opportunitiesGrid.style.display =
                "grid";

        }

    }


    /* =========================================
       FILTER EVENTS
    ========================================= */

    searchInput.addEventListener(
        "input",
        filterOpportunities
    );


    subjectFilter.addEventListener(
        "change",
        filterOpportunities
    );


    modeFilter.addEventListener(
        "change",
        filterOpportunities
    );


    classFilter.addEventListener(
        "change",
        filterOpportunities
    );


    /* =========================================
       RESET FILTERS
    ========================================= */

    resetFilters.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            subjectFilter.value = "all";

            modeFilter.value = "all";

            classFilter.value = "all";

            filterOpportunities();

        }
    );


    /* =========================================
       SORT
    ========================================= */

    sortFilter.addEventListener(
        "change",
        () => {

            const cards =
                Array.from(opportunityCards);


            if (
                sortFilter.value === "fee-high"
            ) {

                cards.sort(
                    (a, b) =>
                        Number(b.dataset.fee) -
                        Number(a.dataset.fee)
                );

            }


            if (
                sortFilter.value === "fee-low"
            ) {

                cards.sort(
                    (a, b) =>
                        Number(a.dataset.fee) -
                        Number(b.dataset.fee)
                );

            }


            if (
                sortFilter.value === "recent"
            ) {

                cards.sort(
                    (a, b) =>
                        Number(a.dataset.id || 0) -
                        Number(b.dataset.id || 0)
                );

            }


            cards.forEach(card => {

                opportunitiesGrid.appendChild(card);

            });

        }
    );


    /* =========================================
       APPLICATION STATS
    ========================================= */

    function updateApplicationStats() {

        const appliedCount =
            document.getElementById("appliedCount");

        const current =
            Number(appliedCount.textContent);

        appliedCount.textContent =
            current + 1;

    }


    /* =========================================
       MY APPLICATIONS
    ========================================= */

    document
        .getElementById("applicationsBtn")
        .addEventListener(
            "click",
            () => {

                document
                    .querySelector(".applications-section")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


    /* =========================================
       NOTIFICATIONS
    ========================================= */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            () => {

                alert(
                    "You have 2 new opportunity notifications."
                );

            }
        );


    /* =========================================
       LOGOUT
    ========================================= */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            async (event) => {

                event.preventDefault();


                const confirmation =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmation) {

                    if (window.TalentHuntAPI) {
                        try {
                            await TalentHuntAPI.auth.logout();
                        } catch (e) {
                            console.warn("Logout error:", e);
                        }
                    }

                    window.location.href =
                        "../../html/auth/login.html";

                }

            }
        );


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                opportunityModal.classList.remove(
                    "show"
                );

                successModal.classList.remove(
                    "show"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    console.log(
        "Talent Hunt Opportunities loaded successfully."
    );

});