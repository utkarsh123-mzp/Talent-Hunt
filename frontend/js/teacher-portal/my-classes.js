/* =========================================
   TALENT HUNT
   TEACHER PORTAL - MY CLASSES
========================================= */


/* =========================================
   DEMO CLASS DATA
========================================= */

const classes = [

    {
        id: 1,
        subject: "Mathematics",
        title: "Class 10 Mathematics",
        subtitle: "CBSE Mathematics Program",

        students: 24,

        schedule: "Mon, Wed, Fri",
        time: "05:00 PM",

        type: "online",

        status: "active",

        duration: "1 Hour",

        level: "Class 10",

        location: "Online",

        description:
            "Mathematics classes for Class 10 students covering Algebra, Geometry, Trigonometry and other CBSE topics."
    },


    {
        id: 2,
        subject: "Physics",
        title: "Class 12 Physics",
        subtitle: "Board & Competitive Preparation",

        students: 18,

        schedule: "Tue, Thu, Sat",
        time: "06:00 PM",

        type: "online",

        status: "active",

        duration: "1.5 Hours",

        level: "Class 12",

        location: "Online",

        description:
            "Physics preparation for Class 12 students with focus on concepts, numerical problems and examination preparation."
    },


    {
        id: 3,
        subject: "Python",
        title: "Python Programming",
        subtitle: "Beginner Programming Course",

        students: 8,

        schedule: "Saturday",
        time: "10:00 AM",

        type: "one-to-one",

        status: "upcoming",

        duration: "1 Hour",

        level: "College",

        location: "One-to-One",

        description:
            "Personalized Python programming sessions for students who want to build programming fundamentals."
    },


    {
        id: 4,
        subject: "Computer Science",
        title: "Data Structures & Algorithms",
        subtitle: "College Student Program",

        students: 15,

        schedule: "Mon, Wed",
        time: "07:00 PM",

        type: "online",

        status: "active",

        duration: "1 Hour",

        level: "College",

        location: "Online",

        description:
            "Data Structures and Algorithms classes covering arrays, linked lists, stacks, queues, trees and algorithms."
    },


    {
        id: 5,
        subject: "English",
        title: "English Communication",
        subtitle: "Spoken English Program",

        students: 12,

        schedule: "Sunday",
        time: "11:00 AM",

        type: "offline",

        status: "upcoming",

        duration: "1 Hour",

        level: "All Levels",

        location: "Learning Center",

        description:
            "English communication and spoken English sessions for students looking to improve confidence and communication."
    },


    {
        id: 6,
        subject: "Science",
        title: "Class 8 Science",
        subtitle: "School Science Program",

        students: 20,

        schedule: "Mon, Thu",
        time: "04:00 PM",

        type: "offline",

        status: "completed",

        duration: "1 Hour",

        level: "Class 8",

        location: "Learning Center",

        description:
            "Science classes covering Physics, Chemistry and Biology fundamentals for Class 8 students."
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const classesContainer =
    document.getElementById("classesContainer");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const classTypeFilter =
    document.getElementById("classTypeFilter");

const statusFilter =
    document.getElementById("statusFilter");

const resultCount =
    document.getElementById("resultCount");

const clearFiltersBtn =
    document.getElementById("clearFiltersBtn");

const classModal =
    document.getElementById("classModal");

const modalClose =
    document.getElementById("modalClose");

const modalContent =
    document.getElementById("modalContent");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateSummary();

    renderClasses(classes);

});


/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary() {

    const total =
        classes.length;


    const active =
        classes.filter(
            item => item.status === "active"
        ).length;


    const upcoming =
        classes.filter(
            item => item.status === "upcoming"
        ).length;


    const totalStudents =
        classes.reduce(
            (sum, item) => sum + item.students,
            0
        );


    document.getElementById("totalClasses")
        .textContent = total;


    document.getElementById("activeClasses")
        .textContent = active;


    document.getElementById("upcomingClasses")
        .textContent = upcoming;


    document.getElementById("totalStudents")
        .textContent = totalStudents;
}


/* =========================================
   RENDER CLASSES
========================================= */

function renderClasses(data) {

    classesContainer.innerHTML = "";


    resultCount.textContent =
        `${data.length} ${data.length === 1 ? "Class" : "Classes"}`;


    if (data.length === 0) {

        classesContainer.style.display = "none";

        emptyState.style.display = "block";

        return;
    }


    classesContainer.style.display = "grid";

    emptyState.style.display = "none";


    data.forEach(item => {

        const card =
            createClassCard(item);

        classesContainer.appendChild(card);

    });
}


/* =========================================
   CREATE CLASS CARD
========================================= */

function createClassCard(item) {

    const card =
        document.createElement("article");

    card.className = "class-card";


    const icon =
        getSubjectIcon(item.subject);


    const statusText =
        capitalize(item.status);


    const typeText =
        formatType(item.type);


    card.innerHTML = `

        <div class="class-card-header">

            <div class="subject-icon">
                <i class="ph ${icon}"></i>
            </div>

            <span class="status-badge ${item.status}">
                ${statusText}
            </span>

        </div>


        <div class="class-card-body">

            <h3>${item.title}</h3>

            <p class="class-subtitle">
                ${item.subtitle}
            </p>


            <div class="class-details">

                <div class="detail-item">

                    <i class="ph ph-users"></i>

                    <div>
                        <span>Students</span>
                        <strong>${item.students}</strong>
                    </div>

                </div>


                <div class="detail-item">

                    <i class="ph ph-graduation-cap"></i>

                    <div>
                        <span>Level</span>
                        <strong>${item.level}</strong>
                    </div>

                </div>


                <div class="detail-item">

                    <i class="ph ph-calendar"></i>

                    <div>
                        <span>Schedule</span>
                        <strong>${item.schedule}</strong>
                    </div>

                </div>


                <div class="detail-item">

                    <i class="ph ph-clock"></i>

                    <div>
                        <span>Time</span>
                        <strong>${item.time}</strong>
                    </div>

                </div>

            </div>

        </div>


        <div class="class-card-footer">

            <span class="type-label">

                <i class="ph ${getTypeIcon(item.type)}"></i>

                ${typeText}

            </span>


            <div class="card-actions">

                <button
                    class="btn btn-secondary view-btn"
                    data-id="${item.id}">
                    View
                </button>


                ${
                    item.status === "active"
                    ?
                    `
                    <button
                        class="btn btn-primary start-btn"
                        data-id="${item.id}">
                        Start Class
                    </button>
                    `
                    :
                    ""
                }

            </div>

        </div>

    `;


    return card;
}


/* =========================================
   SUBJECT ICON
========================================= */

function getSubjectIcon(subject) {

    const icons = {

        "Mathematics":
            "ph-function",

        "Physics":
            "ph-atom",

        "Python":
            "ph-code",

        "Computer Science":
            "ph-desktop",

        "English":
            "ph-translate",

        "Science":
            "ph-flask"

    };


    return icons[subject] || "ph-book-open";
}


/* =========================================
   TYPE ICON
========================================= */

function getTypeIcon(type) {

    if (type === "online") {

        return "ph-video-camera";

    }

    if (type === "offline") {

        return "ph-buildings";

    }

    return "ph-user";
}


/* =========================================
   FORMAT TYPE
========================================= */

function formatType(type) {

    if (type === "one-to-one") {

        return "One-to-One";

    }

    return capitalize(type);

}


/* =========================================
   CAPITALIZE
========================================= */

function capitalize(value) {

    return value.charAt(0).toUpperCase()
        + value.slice(1);

}


/* =========================================
   FILTER CLASSES
========================================= */

function filterClasses() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const type =
        classTypeFilter.value;


    const status =
        statusFilter.value;


    const filtered =
        classes.filter(item => {


            const matchesSearch =

                item.title
                    .toLowerCase()
                    .includes(search)

                ||

                item.subject
                    .toLowerCase()
                    .includes(search)

                ||

                item.level
                    .toLowerCase()
                    .includes(search);


            const matchesType =
                type === "all"
                ||
                item.type === type;


            const matchesStatus =
                status === "all"
                ||
                item.status === status;


            return (
                matchesSearch
                &&
                matchesType
                &&
                matchesStatus
            );

        });


    renderClasses(filtered);
}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    filterClasses
);


/* =========================================
   TYPE FILTER
========================================= */

classTypeFilter.addEventListener(
    "change",
    filterClasses
);


/* =========================================
   STATUS FILTER
========================================= */

statusFilter.addEventListener(
    "change",
    filterClasses
);


/* =========================================
   CLEAR FILTERS
========================================= */

clearFiltersBtn.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        classTypeFilter.value = "all";

        statusFilter.value = "all";

        renderClasses(classes);

    }
);


/* =========================================
   VIEW CLASS
========================================= */

classesContainer.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest(".view-btn");


        if (!viewButton) return;


        const id =
            Number(viewButton.dataset.id);


        const selectedClass =
            classes.find(
                item => item.id === id
            );


        if (selectedClass) {

            openClassModal(selectedClass);

        }

    }
);


/* =========================================
   START CLASS
========================================= */

classesContainer.addEventListener(
    "click",
    event => {

        const startButton =
            event.target.closest(".start-btn");


        if (!startButton) return;


        const id =
            Number(startButton.dataset.id);


        const selectedClass =
            classes.find(
                item => item.id === id
            );


        if (!selectedClass) return;


        alert(
            `Starting ${selectedClass.title}...`
        );

    }
);


/* =========================================
   OPEN MODAL
========================================= */

function openClassModal(item) {

    modalContent.innerHTML = `

        <h2 class="modal-title">
            ${item.title}
        </h2>

        <p class="modal-subtitle">
            ${item.subtitle}
        </p>


        <div class="modal-details">

            <div class="modal-detail">
                <span>Subject</span>
                <strong>${item.subject}</strong>
            </div>


            <div class="modal-detail">
                <span>Status</span>
                <strong>${capitalize(item.status)}</strong>
            </div>


            <div class="modal-detail">
                <span>Students</span>
                <strong>${item.students}</strong>
            </div>


            <div class="modal-detail">
                <span>Level</span>
                <strong>${item.level}</strong>
            </div>


            <div class="modal-detail">
                <span>Schedule</span>
                <strong>${item.schedule}</strong>
            </div>


            <div class="modal-detail">
                <span>Time</span>
                <strong>${item.time}</strong>
            </div>


            <div class="modal-detail">
                <span>Duration</span>
                <strong>${item.duration}</strong>
            </div>


            <div class="modal-detail">
                <span>Mode</span>
                <strong>${item.location}</strong>
            </div>

        </div>


        <div style="
            margin-top:20px;
            padding:15px;
            background:#f9fafb;
            border-radius:10px;
        ">

            <span style="
                font-size:10px;
                color:#6b7280;
            ">
                CLASS DESCRIPTION
            </span>

            <p style="
                margin-top:7px;
                font-size:12px;
                line-height:1.7;
                color:#4b5563;
            ">
                ${item.description}
            </p>

        </div>

    `;


    classModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    classModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


classModal.addEventListener(
    "click",
    event => {

        if (event.target === classModal) {

            closeModal();

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================
   MOBILE SIDEBAR
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("show");

    }
);


/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener(
    "click",
    event => {

        event.preventDefault();

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            /*
             * Later we will connect this
             * with actual authentication.
             */

            window.location.href =
                "../auth/login.html";

        }

    }
);