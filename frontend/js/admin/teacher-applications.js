/* =========================================
   TALENT HUNT
   ADMIN - TEACHER APPLICATIONS
========================================= */


/* =========================================
   APPLICATION DATA
========================================= */

let applications = [

    {
        id: "TH-2026-001",
        name: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        phone: "+91 98765 43210",
        subject: "Mathematics",
        experience: "5 Years",
        qualification: "M.Sc Mathematics",
        date: "08 Sep 2026",
        status: "pending",
        about:
            "Experienced mathematics teacher with strong classroom management and student mentoring skills."
    },

    {
        id: "TH-2026-002",
        name: "Priya Singh",
        email: "priya.singh@gmail.com",
        phone: "+91 98765 32109",
        subject: "Physics",
        experience: "4 Years",
        qualification: "M.Sc Physics",
        date: "07 Sep 2026",
        status: "pending",
        about:
            "Physics educator focused on practical learning, conceptual clarity and student engagement."
    },

    {
        id: "TH-2026-003",
        name: "Amit Verma",
        email: "amit.verma@gmail.com",
        phone: "+91 98123 45678",
        subject: "Computer Science",
        experience: "6 Years",
        qualification: "M.Tech Computer Science",
        date: "06 Sep 2026",
        status: "approved",
        about:
            "Computer Science teacher experienced in programming, web development and project-based learning."
    },

    {
        id: "TH-2026-004",
        name: "Neha Gupta",
        email: "neha.gupta@gmail.com",
        phone: "+91 97654 12345",
        subject: "Chemistry",
        experience: "3 Years",
        qualification: "M.Sc Chemistry",
        date: "05 Sep 2026",
        status: "pending",
        about:
            "Chemistry teacher interested in creating interactive lessons and improving student understanding."
    },

    {
        id: "TH-2026-005",
        name: "Vikas Mishra",
        email: "vikas.mishra@gmail.com",
        phone: "+91 98989 11223",
        subject: "English",
        experience: "7 Years",
        qualification: "M.A English",
        date: "04 Sep 2026",
        status: "rejected",
        about:
            "English educator with experience in communication skills, grammar and academic writing."
    },

    {
        id: "TH-2026-006",
        name: "Anjali Yadav",
        email: "anjali.yadav@gmail.com",
        phone: "+91 97555 44332",
        subject: "Mathematics",
        experience: "2 Years",
        qualification: "M.Sc Mathematics",
        date: "03 Sep 2026",
        status: "approved",
        about:
            "Young mathematics educator with a strong interest in digital teaching and personalized learning."
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const applicationsTable =
    document.getElementById("applicationsTable");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const subjectFilter =
    document.getElementById("subjectFilter");

const resultsCount =
    document.getElementById("resultsCount");

const emptyState =
    document.getElementById("emptyState");


/* MODAL */

const applicationModal =
    document.getElementById("applicationModal");

const closeModal =
    document.getElementById("closeModal");

const modalTeacherName =
    document.getElementById("modalTeacherName");

const modalApplicationId =
    document.getElementById("modalApplicationId");

const modalAvatar =
    document.getElementById("modalAvatar");

const modalEmail =
    document.getElementById("modalEmail");

const modalPhone =
    document.getElementById("modalPhone");

const modalSubject =
    document.getElementById("modalSubject");

const modalExperience =
    document.getElementById("modalExperience");

const modalQualification =
    document.getElementById("modalQualification");

const modalDate =
    document.getElementById("modalDate");

const modalAbout =
    document.getElementById("modalAbout");

const modalStatus =
    document.getElementById("modalStatus");

const modalApproveBtn =
    document.getElementById("modalApproveBtn");

const modalRejectBtn =
    document.getElementById("modalRejectBtn");


/* TOAST */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


let selectedApplication = null;


/* =========================================
   INITIAL LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderApplications();

    updateStatistics();

});


/* =========================================
   RENDER APPLICATIONS
========================================= */

function renderApplications() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedStatus =
        statusFilter.value;

    const selectedSubject =
        subjectFilter.value;


    const filteredApplications =
        applications.filter(application => {

            const matchesSearch =
                application.name.toLowerCase().includes(searchValue) ||
                application.subject.toLowerCase().includes(searchValue) ||
                application.id.toLowerCase().includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                application.status === selectedStatus;

            const matchesSubject =
                selectedSubject === "all" ||
                application.subject === selectedSubject;

            return matchesSearch &&
                matchesStatus &&
                matchesSubject;

        });


    applicationsTable.innerHTML = "";


    if (filteredApplications.length === 0) {

        emptyState.style.display = "block";

        document.querySelector(".table-wrapper").style.display =
            "none";

    } else {

        emptyState.style.display = "none";

        document.querySelector(".table-wrapper").style.display =
            "block";


        filteredApplications.forEach(application => {

            const row =
                document.createElement("tr");

            const initials =
                getInitials(application.name);

            row.innerHTML = `

                <td>

                    <div class="teacher-cell">

                        <div class="teacher-avatar">
                            ${initials}
                        </div>

                        <div>

                            <div class="teacher-name">
                                ${application.name}
                            </div>

                            <div class="teacher-email">
                                ${application.email}
                            </div>

                        </div>

                    </div>

                </td>


                <td>
                    <span class="application-id">
                        ${application.id}
                    </span>
                </td>


                <td>
                    ${application.subject}
                </td>


                <td>
                    ${application.experience}
                </td>


                <td>
                    ${application.date}
                </td>


                <td>
                    <span class="status ${application.status}">
                        ${formatStatus(application.status)}
                    </span>
                </td>


                <td>

                    <button
                        class="view-btn"
                        title="View Application"
                        data-id="${application.id}"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                </td>

            `;


            applicationsTable.appendChild(row);

        });


        /* VIEW BUTTON EVENTS */

        document
            .querySelectorAll(".view-btn")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        button.dataset.id;

                    openApplication(id);

                });

            });

    }


    resultsCount.textContent =
        `${filteredApplications.length} Application${filteredApplications.length !== 1 ? "s" : ""}`;

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener("input", () => {

    renderApplications();

});


/* =========================================
   FILTERS
========================================= */

statusFilter.addEventListener("change", () => {

    renderApplications();

});


subjectFilter.addEventListener("change", () => {

    renderApplications();

});


/* =========================================
   OPEN APPLICATION
========================================= */

function openApplication(id) {

    selectedApplication =
        applications.find(
            application => application.id === id
        );


    if (!selectedApplication) {
        return;
    }


    modalTeacherName.textContent =
        selectedApplication.name;

    modalApplicationId.textContent =
        `Application #${selectedApplication.id}`;

    modalAvatar.textContent =
        getInitials(selectedApplication.name);

    modalEmail.textContent =
        selectedApplication.email;

    modalPhone.textContent =
        selectedApplication.phone;

    modalSubject.textContent =
        selectedApplication.subject;

    modalExperience.textContent =
        selectedApplication.experience;

    modalQualification.textContent =
        selectedApplication.qualification;

    modalDate.textContent =
        selectedApplication.date;

    modalAbout.textContent =
        selectedApplication.about;


    updateModalStatus();


    applicationModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================
   UPDATE MODAL STATUS
========================================= */

function updateModalStatus() {

    const status =
        selectedApplication.status;


    modalStatus.className =
        `modal-status ${status}`;


    modalStatus.innerHTML = `

        <span class="status-dot"></span>

        ${formatStatus(status)}

    `;


    if (status === "approved") {

        modalApproveBtn.style.display = "none";
        modalRejectBtn.style.display = "flex";

    }

    else if (status === "rejected") {

        modalRejectBtn.style.display = "none";
        modalApproveBtn.style.display = "flex";

    }

    else {

        modalApproveBtn.style.display = "flex";
        modalRejectBtn.style.display = "flex";

    }

}


/* =========================================
   APPROVE APPLICATION
========================================= */

modalApproveBtn.addEventListener("click", () => {

    if (!selectedApplication) {
        return;
    }


    selectedApplication.status =
        "approved";


    updateModalStatus();

    renderApplications();

    updateStatistics();


    showToast(
        "Application Approved",
        `${selectedApplication.name} has been approved successfully.`
    );

});


/* =========================================
   REJECT APPLICATION
========================================= */

modalRejectBtn.addEventListener("click", () => {

    if (!selectedApplication) {
        return;
    }


    const confirmReject =
        confirm(
            `Are you sure you want to reject ${selectedApplication.name}'s application?`
        );


    if (!confirmReject) {
        return;
    }


    selectedApplication.status =
        "rejected";


    updateModalStatus();

    renderApplications();

    updateStatistics();


    showToast(
        "Application Rejected",
        `${selectedApplication.name}'s application has been rejected.`
    );

});


/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener("click", closeApplicationModal);


applicationModal.addEventListener("click", event => {

    if (event.target === applicationModal) {

        closeApplicationModal();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeApplicationModal();

    }

});


function closeApplicationModal() {

    applicationModal.classList.remove("show");

    document.body.style.overflow = "";

    selectedApplication = null;

}


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    const total =
        applications.length;


    const pending =
        applications.filter(
            item => item.status === "pending"
        ).length;


    const approved =
        applications.filter(
            item => item.status === "approved"
        ).length;


    const rejected =
        applications.filter(
            item => item.status === "rejected"
        ).length;


    document.getElementById("totalApplications")
        .textContent = String(total).padStart(2, "0");


    document.getElementById("pendingApplications")
        .textContent = String(pending).padStart(2, "0");


    document.getElementById("approvedApplications")
        .textContent = String(approved).padStart(2, "0");


    document.getElementById("rejectedApplications")
        .textContent = String(rejected).padStart(2, "0");

}


/* =========================================
   FORMAT STATUS
========================================= */

function formatStatus(status) {

    return status
        .charAt(0)
        .toUpperCase() +
        status.slice(1);

}


/* =========================================
   GET INITIALS
========================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


/* =========================================
   TOAST
========================================= */

function showToast(title, message) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   EXPORT APPLICATIONS
========================================= */

document
    .getElementById("exportBtn")
    .addEventListener("click", () => {

        let csv =
            "Application ID,Teacher,Email,Subject,Experience,Date,Status\n";


        applications.forEach(application => {

            csv +=
                `"${application.id}",` +
                `"${application.name}",` +
                `"${application.email}",` +
                `"${application.subject}",` +
                `"${application.experience}",` +
                `"${application.date}",` +
                `"${application.status}"\n`;

        });


        const blob =
            new Blob(
                [csv],
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
            "teacher-applications.csv";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "Export Complete",
            "Teacher applications have been exported."
        );

    });


/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebar =
    document.querySelector(".sidebar");


mobileMenuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if (confirmLogout) {

            window.location.href =
                "../auth/login.html";

        }

    });