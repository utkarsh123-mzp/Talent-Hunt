/* =========================================
   TALENT HUNT
   TEACHER PORTAL - SCHEDULE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const openScheduleBtn =
        document.getElementById("openScheduleBtn");

    const scheduleModal =
        document.getElementById("scheduleModal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelBtn =
        document.getElementById("cancelBtn");

    const scheduleForm =
        document.getElementById("scheduleForm");

    const weekViewBtn =
        document.getElementById("weekViewBtn");

    const listViewBtn =
        document.getElementById("listViewBtn");

    const calendarContainer =
        document.getElementById("calendarContainer");

    const listViewContainer =
        document.getElementById("listViewContainer");

    const previousWeek =
        document.getElementById("previousWeek");

    const nextWeek =
        document.getElementById("nextWeek");

    const todayBtn =
        document.getElementById("todayBtn");

    const weekRange =
        document.getElementById("weekRange");

    const weekTitle =
        document.getElementById("weekTitle");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =========================================
       OPEN MODAL
    ========================================= */

    openScheduleBtn.addEventListener("click", () => {

        scheduleModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeScheduleModal() {

        scheduleModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    closeModal.addEventListener(
        "click",
        closeScheduleModal
    );

    cancelBtn.addEventListener(
        "click",
        closeScheduleModal
    );


    scheduleModal.addEventListener("click", (event) => {

        if (event.target === scheduleModal) {

            closeScheduleModal();

        }

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeScheduleModal();

        }

    });


    /* =========================================
       FORM SUBMIT
    ========================================= */

    scheduleForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const subject =
            document.getElementById("subject").value;

        const batch =
            document.getElementById("batch").value;

        const date =
            document.getElementById("classDate").value;

        const startTime =
            document.getElementById("startTime").value;

        const endTime =
            document.getElementById("endTime").value;

        const mode =
            document.getElementById("classMode").value;

        const location =
            document.getElementById("location").value;


        /* Validate time */

        if (startTime >= endTime) {

            alert(
                "End time must be later than start time."
            );

            return;

        }


        /* Validate online location */

        if (
            mode === "Online" &&
            location.trim() === ""
        ) {

            alert(
                "Please enter the meeting link for an online class."
            );

            return;

        }


        alert(
            `Class scheduled successfully!\n\n` +
            `Subject: ${subject}\n` +
            `Class: ${batch}\n` +
            `Date: ${date}\n` +
            `Time: ${startTime} - ${endTime}\n` +
            `Mode: ${mode}`
        );


        scheduleForm.reset();

        closeScheduleModal();

    });


    /* =========================================
       WEEK / LIST VIEW
    ========================================= */

    weekViewBtn.addEventListener("click", () => {

        weekViewBtn.classList.add("active");

        listViewBtn.classList.remove("active");

        calendarContainer.classList.remove("hide");

        listViewContainer.classList.remove("show");

    });


    listViewBtn.addEventListener("click", () => {

        listViewBtn.classList.add("active");

        weekViewBtn.classList.remove("active");

        calendarContainer.classList.add("hide");

        listViewContainer.classList.add("show");

    });


    /* =========================================
       WEEK NAVIGATION
    ========================================= */

    let currentWeekOffset = 0;


    function updateWeek() {

        if (currentWeekOffset === 0) {

            weekTitle.textContent = "This Week";

            weekRange.textContent =
                "07 Sep - 13 Sep 2026";

        }

        else if (currentWeekOffset === -1) {

            weekTitle.textContent = "Previous Week";

            weekRange.textContent =
                "31 Aug - 06 Sep 2026";

        }

        else if (currentWeekOffset === 1) {

            weekTitle.textContent = "Next Week";

            weekRange.textContent =
                "14 Sep - 20 Sep 2026";

        }

        else {

            weekTitle.textContent =
                currentWeekOffset > 0
                    ? `${currentWeekOffset} Weeks Ahead`
                    : `${Math.abs(currentWeekOffset)} Weeks Ago`;

            weekRange.textContent =
                "Schedule will be updated";
        }

    }


    previousWeek.addEventListener("click", () => {

        currentWeekOffset--;

        updateWeek();

    });


    nextWeek.addEventListener("click", () => {

        currentWeekOffset++;

        updateWeek();

    });


    todayBtn.addEventListener("click", () => {

        currentWeekOffset = 0;

        updateWeek();

    });


    /* =========================================
       EVENT CLICK
    ========================================= */

    document.querySelectorAll(".class-event").forEach(event => {

        event.addEventListener("click", () => {

            const subject =
                event.querySelector("strong")?.textContent ||
                "Class";

            const batch =
                event.querySelector("span")?.textContent ||
                "";

            const time =
                event.querySelector("small")?.textContent ||
                "";

            alert(
                `${subject}\n${batch}\n${time}`
            );

        });

    });


    /* =========================================
       NOTIFICATION
    ========================================= */

    notificationBtn.addEventListener("click", () => {

        alert(
            "You have 2 upcoming class notifications."
        );

    });


    /* =========================================
       LOGOUT
    ========================================= */

    logoutBtn.addEventListener("click", (event) => {

        event.preventDefault();

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );

        if (confirmLogout) {

            alert(
                "Logout functionality will be connected later."
            );

        }

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    updateWeek();

});