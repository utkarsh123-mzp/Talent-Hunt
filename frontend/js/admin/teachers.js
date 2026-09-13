/* =====================================================
   TALENT HUNT - ADMIN TEACHERS
   ===================================================== */


/* =====================================================
   TEACHER DATA
   ===================================================== */

const teachers = [
    {
        id: 1,
        name: "Ananya Sharma",
        email: "ananya.sharma@talenthunt.com",
        subject: "Mathematics",
        experience: "5 Years",
        students: 120,
        rating: 4.8,
        status: "active"
    },

    {
        id: 2,
        name: "Rahul Verma",
        email: "rahul.verma@talenthunt.com",
        subject: "Science",
        experience: "7 Years",
        students: 145,
        rating: 4.9,
        status: "active"
    },

    {
        id: 3,
        name: "Priya Singh",
        email: "priya.singh@talenthunt.com",
        subject: "English",
        experience: "4 Years",
        students: 96,
        rating: 4.7,
        status: "active"
    },

    {
        id: 4,
        name: "Amit Tiwari",
        email: "amit.tiwari@talenthunt.com",
        subject: "Computer Science",
        experience: "6 Years",
        students: 110,
        rating: 4.6,
        status: "leave"
    },

    {
        id: 5,
        name: "Neha Gupta",
        email: "neha.gupta@talenthunt.com",
        subject: "Physics",
        experience: "8 Years",
        students: 135,
        rating: 4.9,
        status: "active"
    },

    {
        id: 6,
        name: "Vikas Mishra",
        email: "vikas.mishra@talenthunt.com",
        subject: "Mathematics",
        experience: "3 Years",
        students: 75,
        rating: 4.5,
        status: "active"
    },

    {
        id: 7,
        name: "Pooja Yadav",
        email: "pooja.yadav@talenthunt.com",
        subject: "Science",
        experience: "5 Years",
        students: 102,
        rating: 4.7,
        status: "suspended"
    },

    {
        id: 8,
        name: "Rohit Kapoor",
        email: "rohit.kapoor@talenthunt.com",
        subject: "Computer Science",
        experience: "9 Years",
        students: 180,
        rating: 4.9,
        status: "active"
    },

    {
        id: 9,
        name: "Sneha Patel",
        email: "sneha.patel@talenthunt.com",
        subject: "English",
        experience: "4 Years",
        students: 88,
        rating: 4.6,
        status: "active"
    },

    {
        id: 10,
        name: "Arjun Mehta",
        email: "arjun.mehta@talenthunt.com",
        subject: "Physics",
        experience: "6 Years",
        students: 115,
        rating: 4.8,
        status: "active"
    },

    {
        id: 11,
        name: "Kavita Joshi",
        email: "kavita.joshi@talenthunt.com",
        subject: "Mathematics",
        experience: "10 Years",
        students: 200,
        rating: 4.9,
        status: "active"
    },

    {
        id: 12,
        name: "Saurabh Singh",
        email: "saurabh.singh@talenthunt.com",
        subject: "Science",
        experience: "2 Years",
        students: 54,
        rating: 4.4,
        status: "leave"
    }
];


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const tableBody = document.getElementById("teachersTableBody");

const searchInput = document.getElementById("teacherSearch");

const subjectFilter = document.getElementById("subjectFilter");

const statusFilter = document.getElementById("statusFilter");

const resetFilters = document.getElementById("resetFilters");

const teacherCount = document.getElementById("teacherCount");

const selectAll = document.getElementById("selectAll");

const exportBtn = document.getElementById("exportBtn");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");


/* =====================================================
   MODAL ELEMENTS
   ===================================================== */

const teacherModal = document.getElementById("teacherModal");

const closeModal = document.getElementById("closeModal");

const modalCloseBtn = document.getElementById("modalCloseBtn");

const modalName = document.getElementById("modalName");

const modalEmail = document.getElementById("modalEmail");

const modalSubject = document.getElementById("modalSubject");

const modalExperience = document.getElementById("modalExperience");

const modalStudents = document.getElementById("modalStudents");

const modalRating = document.getElementById("modalRating");

const modalAvatar = document.getElementById("modalAvatar");

const modalStatusBtn = document.getElementById("modalStatusBtn");


/* =====================================================
   CONFIRM MODAL
   ===================================================== */

const confirmModal = document.getElementById("confirmModal");

const confirmTitle = document.getElementById("confirmTitle");

const confirmMessage = document.getElementById("confirmMessage");

const cancelConfirm = document.getElementById("cancelConfirm");

const confirmAction = document.getElementById("confirmAction");

let pendingAction = null;


/* =====================================================
   PAGINATION
   ===================================================== */

const rowsPerPage = 8;

let currentPage = 1;

let filteredTeachers = [...teachers];

let selectedTeacher = null;


/* =====================================================
   INITIALIZE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderTeachers();

    updateStatistics();

});


/* =====================================================
   GET INITIALS
   ===================================================== */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =====================================================
   STATUS TEXT
   ===================================================== */

function getStatusText(status) {

    const statusMap = {
        active: "Active",
        leave: "On Leave",
        suspended: "Suspended"
    };

    return statusMap[status] || status;

}


/* =====================================================
   RENDER TEACHERS
   ===================================================== */

function renderTeachers() {

    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const pageTeachers = filteredTeachers.slice(start, end);


    if (pageTeachers.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:40px;">
                    No teachers found.
                </td>
            </tr>
        `;

        teacherCount.textContent = "0 teachers found";

        return;
    }


    pageTeachers.forEach(teacher => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                <input
                    type="checkbox"
                    class="teacher-checkbox"
                    data-id="${teacher.id}"
                >
            </td>


            <td>

                <div class="teacher-info">

                    <div class="teacher-avatar">
                        ${getInitials(teacher.name)}
                    </div>

                    <div>
                        <div class="teacher-name">
                            ${teacher.name}
                        </div>

                        <div class="teacher-email">
                            ${teacher.email}
                        </div>
                    </div>

                </div>

            </td>


            <td>
                ${teacher.subject}
            </td>


            <td>
                ${teacher.experience}
            </td>


            <td>
                ${teacher.students}
            </td>


            <td>

                <div class="rating">

                    <i class="fa-solid fa-star"></i>

                    <strong>
                        ${teacher.rating}
                    </strong>

                </div>

            </td>


            <td>

                <span class="status ${teacher.status}">
                    ${getStatusText(teacher.status)}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        class="table-action view-btn"
                        data-id="${teacher.id}"
                        title="View Profile"
                    >
                        <i class="fa-regular fa-eye"></i>
                    </button>


                    <button
                        class="table-action status-btn"
                        data-id="${teacher.id}"
                        title="Change Status"
                    >
                        <i class="fa-solid fa-user-gear"></i>
                    </button>


                    <button
                        class="table-action delete delete-btn"
                        data-id="${teacher.id}"
                        title="Delete Teacher"
                    >
                        <i class="fa-regular fa-trash-can"></i>
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    teacherCount.textContent =
        `${filteredTeachers.length} teachers found`;


    updatePagination();

    attachRowEvents();

}


/* =====================================================
   ROW EVENTS
   ===================================================== */

function attachRowEvents() {

    document.querySelectorAll(".view-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            openTeacherModal(id);

        });

    });


    document.querySelectorAll(".status-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const teacher = teachers.find(item => item.id === id);

            if (!teacher) return;

            openConfirmModal(
                teacher,
                "status"
            );

        });

    });


    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const teacher = teachers.find(item => item.id === id);

            if (!teacher) return;

            openConfirmModal(
                teacher,
                "delete"
            );

        });

    });

}


/* =====================================================
   SEARCH
   ===================================================== */

searchInput.addEventListener("input", applyFilters);

subjectFilter.addEventListener("change", applyFilters);

statusFilter.addEventListener("change", applyFilters);


function applyFilters() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const subjectValue =
        subjectFilter.value;

    const statusValue =
        statusFilter.value;


    filteredTeachers = teachers.filter(teacher => {

        const matchesSearch =
            teacher.name.toLowerCase().includes(searchValue) ||
            teacher.email.toLowerCase().includes(searchValue) ||
            teacher.subject.toLowerCase().includes(searchValue);


        const matchesSubject =
            subjectValue === "all" ||
            teacher.subject === subjectValue;


        const matchesStatus =
            statusValue === "all" ||
            teacher.status === statusValue;


        return (
            matchesSearch &&
            matchesSubject &&
            matchesStatus
        );

    });


    currentPage = 1;

    renderTeachers();

}


/* =====================================================
   RESET FILTERS
   ===================================================== */

resetFilters.addEventListener("click", () => {

    searchInput.value = "";

    subjectFilter.value = "all";

    statusFilter.value = "all";

    filteredTeachers = [...teachers];

    currentPage = 1;

    renderTeachers();

});


/* =====================================================
   STATISTICS
   ===================================================== */

function updateStatistics() {

    const total =
        teachers.length;

    const active =
        teachers.filter(
            teacher => teacher.status === "active"
        ).length;

    const leave =
        teachers.filter(
            teacher => teacher.status === "leave"
        ).length;

    const suspended =
        teachers.filter(
            teacher => teacher.status === "suspended"
        ).length;


    document.getElementById("totalTeachers").textContent =
        String(total).padStart(2, "0");

    document.getElementById("activeTeachers").textContent =
        String(active).padStart(2, "0");

    document.getElementById("leaveTeachers").textContent =
        String(leave).padStart(2, "0");

    document.getElementById("suspendedTeachers").textContent =
        String(suspended).padStart(2, "0");

}


/* =====================================================
   VIEW TEACHER
   ===================================================== */

function openTeacherModal(id) {

    const teacher =
        teachers.find(item => item.id === id);

    if (!teacher) return;

    selectedTeacher = teacher;


    modalAvatar.textContent =
        getInitials(teacher.name);

    modalName.textContent =
        teacher.name;

    modalSubject.textContent =
        `${teacher.subject} Teacher`;

    modalEmail.textContent =
        teacher.email;

    modalExperience.textContent =
        teacher.experience;

    modalStudents.textContent =
        teacher.students;

    modalRating.textContent =
        `${teacher.rating} / 5`;


    modalStatusBtn.textContent =
        teacher.status === "suspended"
            ? "Activate Teacher"
            : "Change Status";


    teacherModal.classList.add("show");

}


/* =====================================================
   CLOSE TEACHER MODAL
   ===================================================== */

function closeTeacherModal() {

    teacherModal.classList.remove("show");

    selectedTeacher = null;

}


closeModal.addEventListener(
    "click",
    closeTeacherModal
);

modalCloseBtn.addEventListener(
    "click",
    closeTeacherModal
);


teacherModal.addEventListener("click", event => {

    if (event.target === teacherModal) {
        closeTeacherModal();
    }

});


/* =====================================================
   MODAL STATUS BUTTON
   ===================================================== */

modalStatusBtn.addEventListener("click", () => {

    if (!selectedTeacher) return;

    closeTeacherModal();

    openConfirmModal(
        selectedTeacher,
        "status"
    );

});


/* =====================================================
   CONFIRM MODAL
   ===================================================== */

function openConfirmModal(teacher, action) {

    selectedTeacher = teacher;

    pendingAction = action;


    if (action === "delete") {

        confirmTitle.textContent =
            "Delete Teacher?";

        confirmMessage.textContent =
            `Are you sure you want to remove ${teacher.name} from the teacher list?`;

        confirmAction.textContent =
            "Delete";

    } else {

        const nextStatus =
            teacher.status === "suspended"
                ? "activate"
                : "suspend";

        confirmTitle.textContent =
            `${capitalize(nextStatus)} Teacher?`;

        confirmMessage.textContent =
            `Are you sure you want to ${nextStatus} ${teacher.name}'s account?`;

        confirmAction.textContent =
            capitalize(nextStatus);

    }


    confirmModal.classList.add("show");

}


/* =====================================================
   CONFIRM ACTION
   ===================================================== */

confirmAction.addEventListener("click", () => {

    if (!selectedTeacher) return;


    if (pendingAction === "delete") {

        const index =
            teachers.findIndex(
                teacher => teacher.id === selectedTeacher.id
            );

        if (index !== -1) {

            teachers.splice(index, 1);

        }

        showToast(
            `${selectedTeacher.name} has been removed.`
        );

    }


    if (pendingAction === "status") {

        if (
            selectedTeacher.status === "suspended"
        ) {

            selectedTeacher.status = "active";

            showToast(
                `${selectedTeacher.name} is now active.`
            );

        } else {

            selectedTeacher.status = "suspended";

            showToast(
                `${selectedTeacher.name} has been suspended.`
            );

        }

    }


    filteredTeachers = [...teachers];

    currentPage = 1;

    closeConfirmModal();

    updateStatistics();

    renderTeachers();

});


/* =====================================================
   CANCEL CONFIRM
   ===================================================== */

cancelConfirm.addEventListener(
    "click",
    closeConfirmModal
);


confirmModal.addEventListener("click", event => {

    if (event.target === confirmModal) {

        closeConfirmModal();

    }

});


function closeConfirmModal() {

    confirmModal.classList.remove("show");

    selectedTeacher = null;

    pendingAction = null;

}


/* =====================================================
   PAGINATION
   ===================================================== */

function updatePagination() {

    const totalPages =
        Math.ceil(
            filteredTeachers.length / rowsPerPage
        );


    const prevPage =
        document.getElementById("prevPage");

    const nextPage =
        document.getElementById("nextPage");


    prevPage.disabled =
        currentPage === 1;

    nextPage.disabled =
        currentPage >= totalPages;


    const start =
        filteredTeachers.length === 0
            ? 0
            : (currentPage - 1) * rowsPerPage + 1;

    const end =
        Math.min(
            currentPage * rowsPerPage,
            filteredTeachers.length
        );


    document.getElementById("paginationInfo").textContent =
        `Showing ${start}–${end} of ${filteredTeachers.length} teachers`;

}


/* =====================================================
   PREVIOUS PAGE
   ===================================================== */

document
    .getElementById("prevPage")
    .addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            renderTeachers();

        }

    });


/* =====================================================
   NEXT PAGE
   ===================================================== */

document
    .getElementById("nextPage")
    .addEventListener("click", () => {

        const totalPages =
            Math.ceil(
                filteredTeachers.length / rowsPerPage
            );

        if (currentPage < totalPages) {

            currentPage++;

            renderTeachers();

        }

    });


/* =====================================================
   SELECT ALL
   ===================================================== */

selectAll.addEventListener("change", () => {

    document
        .querySelectorAll(".teacher-checkbox")
        .forEach(checkbox => {

            checkbox.checked =
                selectAll.checked;

        });

});


/* =====================================================
   EXPORT TEACHERS
   ===================================================== */

exportBtn.addEventListener("click", () => {

    if (teachers.length === 0) {

        showToast("No teacher data available.");

        return;

    }


    let csv =
        "Name,Email,Subject,Experience,Students,Rating,Status\n";


    teachers.forEach(teacher => {

        csv +=
            `"${teacher.name}",` +
            `"${teacher.email}",` +
            `"${teacher.subject}",` +
            `"${teacher.experience}",` +
            `"${teacher.students}",` +
            `"${teacher.rating}",` +
            `"${getStatusText(teacher.status)}"\n`;

    });


    const blob =
        new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "talent-hunt-teachers.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    showToast(
        "Teacher data exported successfully."
    );

});


/* =====================================================
   ADD TEACHER
   ===================================================== */

const addTeacherBtn =
    document.getElementById("addTeacherBtn");


addTeacherBtn.addEventListener("click", () => {

    showToast(
        "Add Teacher module will be connected next."
    );

});


/* =====================================================
   LOGOUT
   ===================================================== */

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", () => {

    const confirmed =
        confirm("Are you sure you want to logout?");

    if (confirmed) {

        window.location.href =
            "../auth/login.html";

    }

});


/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.querySelector(".admin-sidebar");


if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/* =====================================================
   TOAST
   ===================================================== */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =====================================================
   CAPITALIZE
   ===================================================== */

function capitalize(value) {

    return value.charAt(0).toUpperCase() +
        value.slice(1);

}