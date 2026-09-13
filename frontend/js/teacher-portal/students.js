/* =========================================
   TALENT HUNT
   TEACHER PORTAL - STUDENTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("studentSearch");
    const classFilter = document.getElementById("classFilter");
    const statusFilter = document.getElementById("statusFilter");

    const studentsContainer =
        document.getElementById("studentsContainer");

    const studentCards =
        document.querySelectorAll(".student-card");

    const studentCount =
        document.getElementById("studentCount");

    const emptyState =
        document.getElementById("emptyState");

    const gridViewBtn =
        document.getElementById("gridViewBtn");

    const listViewBtn =
        document.getElementById("listViewBtn");

    const modal =
        document.getElementById("studentModal");

    const modalClose =
        document.getElementById("modalClose");

    const closeStudentBtn =
        document.getElementById("closeStudentBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =========================================
       FILTER STUDENTS
    ========================================= */

    function filterStudents() {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        const classValue =
            classFilter.value;

        const statusValue =
            statusFilter.value;

        let visibleStudents = 0;

        studentCards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const studentClass =
                card.dataset.class;

            const status =
                card.dataset.status;

            const matchesSearch =
                name.includes(searchValue);

            const matchesClass =
                classValue === "all" ||
                studentClass === classValue;

            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;

            if (
                matchesSearch &&
                matchesClass &&
                matchesStatus
            ) {

                card.style.display = "";

                visibleStudents++;

            } else {

                card.style.display = "none";

            }

        });


        /* Update count */

        studentCount.textContent =
            `Showing ${visibleStudents} student${visibleStudents !== 1 ? "s" : ""}`;


        /* Empty state */

        if (visibleStudents === 0) {

            emptyState.classList.add("show");

            studentsContainer.style.display = "none";

        } else {

            emptyState.classList.remove("show");

            studentsContainer.style.display = "";

        }

    }


    searchInput.addEventListener(
        "input",
        filterStudents
    );

    classFilter.addEventListener(
        "change",
        filterStudents
    );

    statusFilter.addEventListener(
        "change",
        filterStudents
    );


    /* =========================================
       GRID VIEW
    ========================================= */

    gridViewBtn.addEventListener("click", () => {

        studentsContainer.classList.remove("list-view");

        gridViewBtn.classList.add("active");

        listViewBtn.classList.remove("active");

    });


    /* =========================================
       LIST VIEW
    ========================================= */

    listViewBtn.addEventListener("click", () => {

        studentsContainer.classList.add("list-view");

        listViewBtn.classList.add("active");

        gridViewBtn.classList.remove("active");

    });


    /* =========================================
       STUDENT MODAL DATA
    ========================================= */

    const studentData = {

        "Rahul Sharma": {
            initials: "RS",
            email: "rahul@example.com",
            course: "Python",
            progress: "85%",
            status: "Active",
            statusClass: "active"
        },

        "Priya Singh": {
            initials: "PS",
            email: "priya@example.com",
            course: "Web Development",
            progress: "72%",
            status: "Active",
            statusClass: "active"
        },

        "Aman Verma": {
            initials: "AV",
            email: "aman@example.com",
            course: "Data Analytics",
            progress: "91%",
            status: "Active",
            statusClass: "active"
        },

        "Neha Gupta": {
            initials: "NG",
            email: "neha@example.com",
            course: "SQL",
            progress: "64%",
            status: "Active",
            statusClass: "active"
        },

        "Arjun Yadav": {
            initials: "AY",
            email: "arjun@example.com",
            course: "Python",
            progress: "80%",
            status: "Active",
            statusClass: "active"
        },

        "Sneha Mishra": {
            initials: "SM",
            email: "sneha@example.com",
            course: "Web Development",
            progress: "48%",
            status: "Inactive",
            statusClass: "inactive"
        }

    };


    /* =========================================
       OPEN STUDENT MODAL
    ========================================= */

    document.querySelectorAll(".view-student").forEach(button => {

        button.addEventListener("click", () => {

            const studentName =
                button.dataset.student;

            const student =
                studentData[studentName];

            if (!student) return;


            document.getElementById(
                "modalAvatar"
            ).textContent = student.initials;


            document.getElementById(
                "modalStudentName"
            ).textContent = studentName;


            const statusElement =
                document.getElementById(
                    "modalStudentStatus"
                );

            statusElement.textContent =
                student.status;

            statusElement.className =
                `status ${student.statusClass}`;


            document.getElementById(
                "modalEmail"
            ).textContent = student.email;


            document.getElementById(
                "modalCourse"
            ).textContent = student.course;


            document.getElementById(
                "modalProgress"
            ).textContent = student.progress;


            modal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );

    closeStudentBtn.addEventListener(
        "click",
        closeModal
    );


    /* Close when clicking outside */

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeModal();

        }

    });


    /* Close with Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* =========================================
       MESSAGE STUDENT
    ========================================= */

    document.getElementById(
        "messageStudentBtn"
    ).addEventListener("click", () => {

        alert(
            "Messaging feature will be connected in the next phase."
        );

    });


    /* =========================================
       NOTIFICATION
    ========================================= */

    notificationBtn.addEventListener("click", () => {

        alert(
            "You have 2 new student notifications."
        );

    });


    /* =========================================
       LOGOUT
    ========================================= */

    logoutBtn.addEventListener("click", event => {

        event.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            alert("Logout functionality will be connected later.");

            // Future:
            // window.location.href = "../auth/login.html";

        }

    });


    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterStudents();

});