/* =========================================
   TALENT HUNT ADMIN
   TEACHER VERIFICATION
========================================= */


/* =========================
   SAMPLE DATA
========================= */

let teachers = [

    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        subject: "Mathematics",
        experience: "6 Years",
        documents: "3/3 Submitted",
        status: "pending"
    },

    {
        id: 2,
        name: "Priya Singh",
        email: "priya.singh@email.com",
        subject: "Physics",
        experience: "5 Years",
        documents: "3/3 Submitted",
        status: "pending"
    },

    {
        id: 3,
        name: "Amit Verma",
        email: "amit.verma@email.com",
        subject: "Chemistry",
        experience: "8 Years",
        documents: "3/3 Submitted",
        status: "review"
    },

    {
        id: 4,
        name: "Neha Gupta",
        email: "neha.gupta@email.com",
        subject: "English",
        experience: "4 Years",
        documents: "3/3 Submitted",
        status: "pending"
    },

    {
        id: 5,
        name: "Arjun Mehta",
        email: "arjun.mehta@email.com",
        subject: "Computer Science",
        experience: "7 Years",
        documents: "3/3 Submitted",
        status: "pending"
    }

];


let selectedTeacher = null;


/* =========================
   ELEMENTS
========================= */

const tableBody = document.getElementById("verificationTable");

const searchInput = document.getElementById("searchInput");

const subjectFilter = document.getElementById("subjectFilter");

const statusFilter = document.getElementById("statusFilter");

const resultCount = document.getElementById("resultCount");

const selectAll = document.getElementById("selectAll");

const modal = document.getElementById("verificationModal");

const closeModal = document.getElementById("closeModal");

const verifyBtn = document.getElementById("verifyBtn");

const rejectBtn = document.getElementById("rejectBtn");

const reviewBtn = document.getElementById("reviewBtn");

const refreshBtn = document.getElementById("refreshBtn");

const exportBtn = document.getElementById("exportBtn");

const logoutBtn = document.getElementById("logoutBtn");


/* =========================
   INITIAL RENDER
========================= */

renderTeachers();
updateStats();


/* =========================
   RENDER TEACHERS
========================= */

function renderTeachers() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedSubject =
        subjectFilter.value;

    const selectedStatus =
        statusFilter.value;


    const filteredTeachers = teachers.filter(teacher => {

        const matchesSearch =
            teacher.name.toLowerCase().includes(searchValue) ||
            teacher.email.toLowerCase().includes(searchValue) ||
            teacher.subject.toLowerCase().includes(searchValue);


        const matchesSubject =
            selectedSubject === "all" ||
            teacher.subject === selectedSubject;


        const matchesStatus =
            selectedStatus === "all" ||
            teacher.status === selectedStatus;


        return (
            matchesSearch &&
            matchesSubject &&
            matchesStatus
        );

    });


    tableBody.innerHTML = "";


    if (filteredTeachers.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    No teachers found
                </td>
            </tr>
        `;

        resultCount.textContent = "0 teachers found";

        return;
    }


    filteredTeachers.forEach(teacher => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                <input
                    type="checkbox"
                    class="teacher-checkbox"
                    value="${teacher.id}"
                >
            </td>


            <td>

                <div class="teacher-cell">

                    <div class="teacher-avatar">
                        ${getInitials(teacher.name)}
                    </div>

                    <div>
                        <span class="teacher-name">
                            ${teacher.name}
                        </span>

                        <span class="teacher-email">
                            ${teacher.email}
                        </span>
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
                <span class="document-status">
                    <i class="fa-solid fa-circle-check"></i>
                    ${teacher.documents}
                </span>
            </td>


            <td>
                ${getStatusHTML(teacher.status)}
            </td>


            <td>

                <button
                    class="action-btn"
                    data-id="${teacher.id}"
                >
                    Review
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    resultCount.textContent =
        `${filteredTeachers.length} teacher${filteredTeachers.length !== 1 ? "s" : ""} found`;


    attachReviewButtons();

}


/* =========================
   INITIALS
========================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================
   STATUS HTML
========================= */

function getStatusHTML(status) {

    const statusText = {

        pending: "Pending",

        review: "Under Review",

        verified: "Verified",

        rejected: "Rejected"

    };


    const icons = {

        pending: "fa-clock",

        review: "fa-magnifying-glass",

        verified: "fa-check",

        rejected: "fa-xmark"

    };


    return `
        <span class="status ${status}">
            <i class="fa-solid ${icons[status]}"></i>
            ${statusText[status]}
        </span>
    `;

}


/* =========================
   REVIEW BUTTONS
========================= */

function attachReviewButtons() {

    const buttons =
        document.querySelectorAll(".action-btn");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            openVerificationModal(id);

        });

    });

}


/* =========================
   OPEN MODAL
========================= */

function openVerificationModal(id) {

    selectedTeacher =
        teachers.find(teacher => teacher.id === id);


    if (!selectedTeacher) return;


    document.getElementById("modalTeacherName").textContent =
        selectedTeacher.name;

    document.getElementById("modalEmail").textContent =
        selectedTeacher.email;

    document.getElementById("modalSubject").textContent =
        selectedTeacher.subject;

    document.getElementById("modalExperience").textContent =
        selectedTeacher.experience;


    modal.classList.add("show");

}


/* =========================
   CLOSE MODAL
========================= */

function closeVerificationModal() {

    modal.classList.remove("show");

    selectedTeacher = null;

}


closeModal.addEventListener(
    "click",
    closeVerificationModal
);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeVerificationModal();

    }

});


/* =========================
   VERIFY TEACHER
========================= */

verifyBtn.addEventListener("click", () => {

    if (!selectedTeacher) return;


    selectedTeacher.status = "verified";


    showNotification(
        `${selectedTeacher.name} has been verified successfully.`
    );


    closeVerificationModal();

    renderTeachers();

    updateStats();

});


/* =========================
   REJECT TEACHER
========================= */

rejectBtn.addEventListener("click", () => {

    if (!selectedTeacher) return;


    const confirmReject =
        confirm(
            `Are you sure you want to reject ${selectedTeacher.name}?`
        );


    if (!confirmReject) return;


    selectedTeacher.status = "rejected";


    showNotification(
        `${selectedTeacher.name} has been rejected.`
    );


    closeVerificationModal();

    renderTeachers();

    updateStats();

});


/* =========================
   MARK UNDER REVIEW
========================= */

reviewBtn.addEventListener("click", () => {

    if (!selectedTeacher) return;


    selectedTeacher.status = "review";


    showNotification(
        `${selectedTeacher.name} moved to Under Review.`
    );


    closeVerificationModal();

    renderTeachers();

    updateStats();

});


/* =========================
   UPDATE STATS
========================= */

function updateStats() {

    const pending =
        teachers.filter(
            teacher => teacher.status === "pending"
        ).length;


    const review =
        teachers.filter(
            teacher => teacher.status === "review"
        ).length;


    const verified =
        teachers.filter(
            teacher => teacher.status === "verified"
        ).length;


    const rejected =
        teachers.filter(
            teacher => teacher.status === "rejected"
        ).length;


    document.getElementById("pendingCount").textContent =
        String(pending).padStart(2, "0");

    document.getElementById("reviewCount").textContent =
        String(review).padStart(2, "0");

    document.getElementById("verifiedCount").textContent =
        String(verified).padStart(2, "0");

    document.getElementById("rejectedCount").textContent =
        String(rejected).padStart(2, "0");

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    renderTeachers
);


/* =========================
   FILTERS
========================= */

subjectFilter.addEventListener(
    "change",
    renderTeachers
);


statusFilter.addEventListener(
    "change",
    renderTeachers
);


/* =========================
   SELECT ALL
========================= */

selectAll.addEventListener("change", () => {

    const checkboxes =
        document.querySelectorAll(".teacher-checkbox");


    checkboxes.forEach(
        checkbox => {
            checkbox.checked =
                selectAll.checked;
        }
    );

});


/* =========================
   REFRESH
========================= */

refreshBtn.addEventListener("click", () => {

    searchInput.value = "";

    subjectFilter.value = "all";

    statusFilter.value = "all";

    renderTeachers();

    updateStats();

    showNotification(
        "Verification data refreshed."
    );

});


/* =========================
   EXPORT
========================= */

exportBtn.addEventListener("click", () => {

    const headers = [
        "Teacher",
        "Email",
        "Subject",
        "Experience",
        "Documents",
        "Status"
    ];


    const rows = teachers.map(teacher => [

        teacher.name,
        teacher.email,
        teacher.subject,
        teacher.experience,
        teacher.documents,
        teacher.status

    ]);


    let csv =
        headers.join(",") + "\n";


    rows.forEach(row => {

        csv +=
            row.map(value =>
                `"${value}"`
            ).join(",") + "\n";

    });


    const blob =
        new Blob([csv], {
            type: "text/csv"
        });


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "teacher-verification.csv";

    link.click();


    URL.revokeObjectURL(url);

});


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", () => {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (confirmLogout) {

        window.location.href =
            "../auth/login.html";

    }

});


/* =========================
   NOTIFICATION
========================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.bottom =
        "25px";

    notification.style.right =
        "25px";

    notification.style.background =
        "#09243a";

    notification.style.color =
        "#fff";

    notification.style.padding =
        "13px 18px";

    notification.style.borderRadius =
        "9px";

    notification.style.fontSize =
        "12px";

    notification.style.zIndex =
        "2000";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.15)";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.remove();

    }, 2500);

}