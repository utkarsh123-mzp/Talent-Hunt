/* =====================================================
   INTERVIEWS PAGE
   Talent Hunt - Admin Portal
   ===================================================== */


/* =====================================================
   INTERVIEW DATA
   ===================================================== */

let interviews = [
    {
        id: 1,
        name: "Aarav Sharma",
        email: "aarav.sharma@gmail.com",
        subject: "Mathematics",
        date: "2026-09-10",
        time: "10:00",
        mode: "online",
        interviewer: "Priya Mehta",
        status: "scheduled"
    },

    {
        id: 2,
        name: "Priya Singh",
        email: "priya.singh@gmail.com",
        subject: "English",
        date: "2026-09-10",
        time: "11:30",
        mode: "online",
        interviewer: "Rahul Verma",
        status: "scheduled"
    },

    {
        id: 3,
        name: "Rahul Kumar",
        email: "rahul.kumar@gmail.com",
        subject: "Physics",
        date: "2026-09-11",
        time: "12:00",
        mode: "offline",
        interviewer: "Ankit Sharma",
        status: "scheduled"
    },

    {
        id: 4,
        name: "Neha Gupta",
        email: "neha.gupta@gmail.com",
        subject: "Chemistry",
        date: "2026-09-11",
        time: "14:00",
        mode: "online",
        interviewer: "Priya Mehta",
        status: "scheduled"
    },

    {
        id: 5,
        name: "Rohan Verma",
        email: "rohan.verma@gmail.com",
        subject: "Computer Science",
        date: "2026-09-06",
        time: "10:30",
        mode: "online",
        interviewer: "Amit Singh",
        status: "completed"
    },

    {
        id: 6,
        name: "Ananya Mishra",
        email: "ananya.mishra@gmail.com",
        subject: "Biology",
        date: "2026-09-05",
        time: "12:00",
        mode: "offline",
        interviewer: "Priya Mehta",
        status: "completed"
    },

    {
        id: 7,
        name: "Vivek Yadav",
        email: "vivek.yadav@gmail.com",
        subject: "Mathematics",
        date: "2026-09-04",
        time: "15:00",
        mode: "online",
        interviewer: "Rahul Verma",
        status: "pending"
    },

    {
        id: 8,
        name: "Simran Kaur",
        email: "simran.kaur@gmail.com",
        subject: "English",
        date: "2026-09-03",
        time: "11:00",
        mode: "online",
        interviewer: "Ankit Sharma",
        status: "pending"
    },

    {
        id: 9,
        name: "Aditya Patel",
        email: "aditya.patel@gmail.com",
        subject: "Physics",
        date: "2026-09-02",
        time: "13:00",
        mode: "offline",
        interviewer: "Amit Singh",
        status: "selected"
    },

    {
        id: 10,
        name: "Kavya Joshi",
        email: "kavya.joshi@gmail.com",
        subject: "Chemistry",
        date: "2026-09-01",
        time: "10:00",
        mode: "online",
        interviewer: "Priya Mehta",
        status: "selected"
    },

    {
        id: 11,
        name: "Mohit Tiwari",
        email: "mohit.tiwari@gmail.com",
        subject: "History",
        date: "2026-08-30",
        time: "12:30",
        mode: "online",
        interviewer: "Rahul Verma",
        status: "rejected"
    },

    {
        id: 12,
        name: "Sneha Agarwal",
        email: "sneha.agarwal@gmail.com",
        subject: "Geography",
        date: "2026-08-29",
        time: "14:30",
        mode: "offline",
        interviewer: "Ankit Sharma",
        status: "completed"
    }
];


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const tableBody = document.getElementById("interviewTableBody");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const modeFilter = document.getElementById("modeFilter");

const resetBtn = document.getElementById("resetBtn");

const resultCount = document.getElementById("resultCount");

const exportBtn = document.getElementById("exportBtn");

const scheduleInterviewBtn =
    document.getElementById("scheduleInterviewBtn");

const interviewModal =
    document.getElementById("interviewModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const interviewForm =
    document.getElementById("interviewForm");

const logoutBtn =
    document.getElementById("logoutBtn");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =====================================================
   STAT ELEMENTS
   ===================================================== */

const upcomingCount =
    document.getElementById("upcomingCount");

const completedCount =
    document.getElementById("completedCount");

const pendingCount =
    document.getElementById("pendingCount");

const selectedCount =
    document.getElementById("selectedCount");


/* =====================================================
   INITIALIZE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderInterviews();

    updateStats();

});


/* =====================================================
   RENDER INTERVIEWS
   ===================================================== */

function renderInterviews() {

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedMode =
        modeFilter.value;


    const filteredInterviews = interviews.filter(interview => {

        const matchesSearch =
            interview.name.toLowerCase().includes(searchValue) ||
            interview.email.toLowerCase().includes(searchValue) ||
            interview.subject.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            interview.status === selectedStatus;

        const matchesMode =
            selectedMode === "all" ||
            interview.mode === selectedMode;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesMode
        );

    });


    tableBody.innerHTML = "";


    if (filteredInterviews.length === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

        filteredInterviews.forEach(interview => {

            const row =
                createInterviewRow(interview);

            tableBody.appendChild(row);

        });

    }


    resultCount.textContent =
        `${filteredInterviews.length} interview${filteredInterviews.length !== 1 ? "s" : ""} found`;

}


/* =====================================================
   CREATE TABLE ROW
   ===================================================== */

function createInterviewRow(interview) {

    const row = document.createElement("tr");

    const initials =
        getInitials(interview.name);

    const formattedDate =
        formatDate(interview.date);

    const formattedTime =
        formatTime(interview.time);


    row.innerHTML = `

        <td>

            <div class="teacher-cell">

                <div class="teacher-avatar">
                    ${initials}
                </div>

                <div class="teacher-info">

                    <strong>
                        ${escapeHTML(interview.name)}
                    </strong>

                    <span>
                        ${escapeHTML(interview.email)}
                    </span>

                </div>

            </div>

        </td>


        <td>
            <span class="subject-name">
                ${escapeHTML(interview.subject)}
            </span>
        </td>


        <td>

            <div class="date-cell">

                <strong>
                    ${formattedDate}
                </strong>

                <span>
                    ${formattedTime}
                </span>

            </div>

        </td>


        <td>

            <span class="mode ${interview.mode}">
                ${capitalize(interview.mode)}
            </span>

        </td>


        <td>
            ${escapeHTML(interview.interviewer)}
        </td>


        <td>

            <span class="status ${interview.status}">
                ${formatStatus(interview.status)}
            </span>

        </td>


        <td>

            <div class="action-group">

                <button
                    class="action-btn primary"
                    title="View"
                    onclick="viewInterview(${interview.id})"
                >
                    👁
                </button>

                <button
                    class="action-btn"
                    title="Edit"
                    onclick="editInterview(${interview.id})"
                >
                    ✎
                </button>

            </div>

        </td>

    `;

    return row;
}


/* =====================================================
   STATS
   ===================================================== */

function updateStats() {

    const upcoming =
        interviews.filter(
            item => item.status === "scheduled"
        ).length;

    const completed =
        interviews.filter(
            item => item.status === "completed"
        ).length;

    const pending =
        interviews.filter(
            item => item.status === "pending"
        ).length;

    const selected =
        interviews.filter(
            item => item.status === "selected"
        ).length;


    upcomingCount.textContent =
        String(upcoming).padStart(2, "0");

    completedCount.textContent =
        String(completed).padStart(2, "0");

    pendingCount.textContent =
        String(pending).padStart(2, "0");

    selectedCount.textContent =
        String(selected).padStart(2, "0");
}


/* =====================================================
   SEARCH & FILTER
   ===================================================== */

searchInput.addEventListener(
    "input",
    renderInterviews
);

statusFilter.addEventListener(
    "change",
    renderInterviews
);

modeFilter.addEventListener(
    "change",
    renderInterviews
);


/* =====================================================
   RESET FILTERS
   ===================================================== */

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    statusFilter.value = "all";

    modeFilter.value = "all";

    renderInterviews();

});


/* =====================================================
   OPEN MODAL
   ===================================================== */

scheduleInterviewBtn.addEventListener(
    "click",
    openModal
);


function openModal() {

    interviewModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeInterviewModal() {

    interviewModal.classList.remove("show");

    document.body.style.overflow = "";

    interviewForm.reset();

}


closeModal.addEventListener(
    "click",
    closeInterviewModal
);

cancelModal.addEventListener(
    "click",
    closeInterviewModal
);


/* Close when clicking overlay */

interviewModal.addEventListener(
    "click",
    event => {

        if (event.target === interviewModal) {

            closeInterviewModal();

        }

    }
);


/* Close with Escape */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            interviewModal.classList.contains("show")
        ) {

            closeInterviewModal();

        }

    }
);


/* =====================================================
   SCHEDULE INTERVIEW
   ===================================================== */

interviewForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const teacherName =
            document.getElementById("teacherName").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const interviewer =
            document.getElementById("interviewer").value.trim();

        const date =
            document.getElementById("interviewDate").value;

        const time =
            document.getElementById("interviewTime").value;

        const mode =
            document.getElementById("interviewMode").value;


        if (
            !teacherName ||
            !subject ||
            !interviewer ||
            !date ||
            !time ||
            !mode
        ) {

            showToast(
                "Please fill all required fields."
            );

            return;

        }


        const newInterview = {

            id: Date.now(),

            name: teacherName,

            email: "New candidate",

            subject: subject,

            date: date,

            time: time,

            mode: mode,

            interviewer: interviewer,

            status: "scheduled"

        };


        interviews.unshift(newInterview);


        renderInterviews();

        updateStats();

        closeInterviewModal();


        showToast(
            "Interview scheduled successfully."
        );

    }
);


/* =====================================================
   VIEW INTERVIEW
   ===================================================== */

function viewInterview(id) {

    const interview =
        interviews.find(item => item.id === id);


    if (!interview) {
        return;
    }


    alert(
        `Interview Details\n\n` +
        `Teacher: ${interview.name}\n` +
        `Subject: ${interview.subject}\n` +
        `Date: ${formatDate(interview.date)}\n` +
        `Time: ${formatTime(interview.time)}\n` +
        `Mode: ${capitalize(interview.mode)}\n` +
        `Interviewer: ${interview.interviewer}\n` +
        `Status: ${formatStatus(interview.status)}`
    );

}


/* =====================================================
   EDIT INTERVIEW
   ===================================================== */

function editInterview(id) {

    const interview =
        interviews.find(item => item.id === id);


    if (!interview) {
        return;
    }


    document.getElementById("teacherName").value =
        interview.name;

    document.getElementById("subject").value =
        interview.subject;

    document.getElementById("interviewer").value =
        interview.interviewer;

    document.getElementById("interviewDate").value =
        interview.date;

    document.getElementById("interviewTime").value =
        interview.time;

    document.getElementById("interviewMode").value =
        interview.mode;


    openModal();


    interviewForm.dataset.editingId =
        String(id);

}


/* =====================================================
   HANDLE EDIT / CREATE FORM
   ===================================================== */

interviewForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const editingId =
            interviewForm.dataset.editingId;


        if (editingId) {

            const interview =
                interviews.find(
                    item => item.id === Number(editingId)
                );


            if (interview) {

                interview.name =
                    document.getElementById("teacherName").value.trim();

                interview.subject =
                    document.getElementById("subject").value.trim();

                interview.interviewer =
                    document.getElementById("interviewer").value.trim();

                interview.date =
                    document.getElementById("interviewDate").value;

                interview.time =
                    document.getElementById("interviewTime").value;

                interview.mode =
                    document.getElementById("interviewMode").value;


                delete interviewForm.dataset.editingId;


                renderInterviews();

                updateStats();

                closeInterviewModal();


                showToast(
                    "Interview updated successfully."
                );

            }

        } else {

            createNewInterview();

        }

    }
);


/* =====================================================
   CREATE NEW INTERVIEW
   ===================================================== */

function createNewInterview() {

    const teacherName =
        document.getElementById("teacherName").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const interviewer =
        document.getElementById("interviewer").value.trim();

    const date =
        document.getElementById("interviewDate").value;

    const time =
        document.getElementById("interviewTime").value;

    const mode =
        document.getElementById("interviewMode").value;


    if (
        !teacherName ||
        !subject ||
        !interviewer ||
        !date ||
        !time ||
        !mode
    ) {

        showToast(
            "Please fill all required fields."
        );

        return;

    }


    interviews.unshift({

        id: Date.now(),

        name: teacherName,

        email: "New candidate",

        subject: subject,

        date: date,

        time: time,

        mode: mode,

        interviewer: interviewer,

        status: "scheduled"

    });


    renderInterviews();

    updateStats();

    closeInterviewModal();


    showToast(
        "Interview scheduled successfully."
    );

}


/* =====================================================
   EXPORT
   ===================================================== */

exportBtn.addEventListener(
    "click",
    exportInterviews
);


function exportInterviews() {

    if (interviews.length === 0) {

        showToast("No interview data available.");

        return;

    }


    const headers = [
        "Teacher",
        "Email",
        "Subject",
        "Date",
        "Time",
        "Mode",
        "Interviewer",
        "Status"
    ];


    const rows = interviews.map(item => [

        item.name,

        item.email,

        item.subject,

        item.date,

        item.time,

        item.mode,

        item.interviewer,

        item.status

    ]);


    const csvContent = [

        headers,

        ...rows

    ]

        .map(row =>
            row
                .map(value =>
                    `"${String(value).replace(/"/g, '""')}"`
                )
                .join(",")
        )

        .join("\n");


    const blob =
        new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "talent-hunt-interviews.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    showToast(
        "Interview data exported."
    );

}


/* =====================================================
   LOGOUT
   ===================================================== */

logoutBtn.addEventListener(
    "click",
    () => {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            window.location.href =
                "../index.html";

        }

    }
);


/* =====================================================
   TOAST
   ===================================================== */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   HELPER FUNCTIONS
   ===================================================== */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


function capitalize(value) {

    return value.charAt(0).toUpperCase() +
        value.slice(1);

}


function formatStatus(status) {

    const statusMap = {

        scheduled: "Scheduled",

        completed: "Completed",

        pending: "Pending Review",

        selected: "Selected",

        rejected: "Rejected"

    };


    return statusMap[status] || status;

}


function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatTime(timeString) {

    const [hours, minutes] =
        timeString.split(":");

    const date =
        new Date();

    date.setHours(
        Number(hours),
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }
    );

}


/* =====================================================
   SECURITY HELPER
   ===================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}