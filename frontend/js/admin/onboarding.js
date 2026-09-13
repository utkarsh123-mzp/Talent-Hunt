/* =====================================================
   ONBOARDING PAGE
   Talent Hunt Admin Portal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const teachers = [
        {
            id: 1,
            name: "Anjali Sharma",
            email: "anjali.sharma@email.com",
            subject: "Mathematics",
            joiningDate: "12 Sep 2026",
            progress: 100,
            status: "completed"
        },
        {
            id: 2,
            name: "Rahul Verma",
            email: "rahul.verma@email.com",
            subject: "Physics",
            joiningDate: "14 Sep 2026",
            progress: 100,
            status: "completed"
        },
        {
            id: 3,
            name: "Priya Singh",
            email: "priya.singh@email.com",
            subject: "Chemistry",
            joiningDate: "16 Sep 2026",
            progress: 100,
            status: "completed"
        },
        {
            id: 4,
            name: "Amit Kumar",
            email: "amit.kumar@email.com",
            subject: "Computer Science",
            joiningDate: "18 Sep 2026",
            progress: 100,
            status: "completed"
        },
        {
            id: 5,
            name: "Neha Gupta",
            email: "neha.gupta@email.com",
            subject: "English",
            joiningDate: "19 Sep 2026",
            progress: 100,
            status: "completed"
        },
        {
            id: 6,
            name: "Vikas Yadav",
            email: "vikas.yadav@email.com",
            subject: "Biology",
            joiningDate: "20 Sep 2026",
            progress: 65,
            status: "progress"
        },
        {
            id: 7,
            name: "Sneha Mishra",
            email: "sneha.mishra@email.com",
            subject: "Hindi",
            joiningDate: "22 Sep 2026",
            progress: 40,
            status: "progress"
        },
        {
            id: 8,
            name: "Rohit Pandey",
            email: "rohit.pandey@email.com",
            subject: "Social Science",
            joiningDate: "25 Sep 2026",
            progress: 15,
            status: "pending"
        }
    ];


    /* ================= ELEMENTS ================= */

    const tableBody = document.getElementById("onboardingTable");
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const resetBtn = document.getElementById("resetBtn");
    const selectAll = document.getElementById("selectAll");
    const resultCount = document.getElementById("resultCount");

    const totalOnboarding = document.getElementById("totalOnboarding");
    const completedCount = document.getElementById("completedCount");
    const progressCount = document.getElementById("progressCount");
    const pendingCount = document.getElementById("pendingCount");

    const modal = document.getElementById("detailsModal");
    const modalClose = document.getElementById("modalClose");

    const modalTeacherName = document.getElementById("modalTeacherName");
    const modalEmail = document.getElementById("modalEmail");
    const modalSubject = document.getElementById("modalSubject");
    const modalJoining = document.getElementById("modalJoining");
    const modalStatus = document.getElementById("modalStatus");
    const modalProgress = document.getElementById("modalProgress");
    const modalProgressBar = document.getElementById("modalProgressBar");
    const completeBtn = document.getElementById("completeBtn");

    const exportBtn = document.getElementById("exportBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const addTeacherBtn = document.getElementById("addTeacherBtn");


    let selectedTeacherId = null;


    /* ================= INITIAL RENDER ================= */

    renderTeachers(teachers);
    updateStats();


    /* ================= RENDER TABLE ================= */

    function renderTeachers(data) {

        tableBody.innerHTML = "";

        resultCount.textContent =
            `${data.length} teacher${data.length !== 1 ? "s" : ""} found`;

        if (data.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-row">
                        No teachers found.
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach(teacher => {

            const row = document.createElement("tr");

            const initials = getInitials(teacher.name);

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
                            ${initials}
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

                <td>${teacher.subject}</td>

                <td>${teacher.joiningDate}</td>

                <td>
                    <div class="progress-container">

                        <div class="progress-top">
                            <span>Progress</span>
                            <strong>${teacher.progress}%</strong>
                        </div>

                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width:${teacher.progress}%"
                            ></div>
                        </div>

                    </div>
                </td>

                <td>
                    <span class="status ${teacher.status}">
                        ${formatStatus(teacher.status)}
                    </span>
                </td>

                <td>
                    <button
                        class="action-btn view-btn"
                        data-id="${teacher.id}"
                        title="View Details"
                    >
                        ⋮
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        attachViewEvents();
    }


    /* ================= VIEW DETAILS ================= */

    function attachViewEvents() {

        const buttons = document.querySelectorAll(".view-btn");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                openTeacherModal(id);
            });
        });
    }


    function openTeacherModal(id) {

        const teacher = teachers.find(item => item.id === id);

        if (!teacher) {
            return;
        }

        selectedTeacherId = id;

        modalTeacherName.textContent = teacher.name;
        modalEmail.textContent = teacher.email;
        modalSubject.textContent = teacher.subject;
        modalJoining.textContent = teacher.joiningDate;
        modalStatus.textContent = formatStatus(teacher.status);

        modalProgress.textContent = `${teacher.progress}%`;
        modalProgressBar.style.width = `${teacher.progress}%`;

        if (teacher.status === "completed") {

            completeBtn.textContent = "Onboarding Completed";
            completeBtn.disabled = true;

        } else {

            completeBtn.textContent = "Mark as Completed";
            completeBtn.disabled = false;
        }

        modal.classList.add("show");
    }


    /* ================= CLOSE MODAL ================= */

    function closeModal() {

        modal.classList.remove("show");
        selectedTeacherId = null;
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }
    });


    /* ================= COMPLETE ONBOARDING ================= */

    completeBtn.addEventListener("click", () => {

        if (!selectedTeacherId) {
            return;
        }

        const teacher = teachers.find(
            item => item.id === selectedTeacherId
        );

        if (!teacher) {
            return;
        }

        teacher.progress = 100;
        teacher.status = "completed";

        updateStats();

        applyFilters();

        closeModal();

        showMessage(
            `${teacher.name} onboarding completed successfully.`
        );
    });


    /* ================= SEARCH ================= */

    searchInput.addEventListener("input", applyFilters);

    statusFilter.addEventListener("change", applyFilters);


    function applyFilters() {

        const searchValue =
            searchInput.value.trim().toLowerCase();

        const selectedStatus =
            statusFilter.value;

        const filteredTeachers = teachers.filter(teacher => {

            const matchesSearch =
                teacher.name.toLowerCase().includes(searchValue) ||
                teacher.email.toLowerCase().includes(searchValue) ||
                teacher.subject.toLowerCase().includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                teacher.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        renderTeachers(filteredTeachers);
    }


    /* ================= RESET ================= */

    resetBtn.addEventListener("click", () => {

        searchInput.value = "";
        statusFilter.value = "all";

        selectAll.checked = false;

        renderTeachers(teachers);
    });


    /* ================= SELECT ALL ================= */

    selectAll.addEventListener("change", () => {

        const checkboxes =
            document.querySelectorAll(".teacher-checkbox");

        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    });


    /* ================= STATS ================= */

    function updateStats() {

        const total = teachers.length;

        const completed =
            teachers.filter(
                teacher => teacher.status === "completed"
            ).length;

        const progress =
            teachers.filter(
                teacher => teacher.status === "progress"
            ).length;

        const pending =
            teachers.filter(
                teacher => teacher.status === "pending"
            ).length;

        totalOnboarding.textContent =
            String(total).padStart(2, "0");

        completedCount.textContent =
            String(completed).padStart(2, "0");

        progressCount.textContent =
            String(progress).padStart(2, "0");

        pendingCount.textContent =
            String(pending).padStart(2, "0");
    }


    /* ================= EXPORT ================= */

    exportBtn.addEventListener("click", () => {

        const header =
            "Teacher,Email,Subject,Joining Date,Progress,Status";

        const rows = teachers.map(teacher => {

            return [
                teacher.name,
                teacher.email,
                teacher.subject,
                teacher.joiningDate,
                `${teacher.progress}%`,
                formatStatus(teacher.status)
            ].join(",");
        });

        const csv =
            [header, ...rows].join("\n");

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = "talent-hunt-onboarding.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    });


    /* ================= ADD TEACHER ================= */

    addTeacherBtn.addEventListener("click", () => {

        showMessage(
            "Teacher onboarding form will be available here."
        );
    });


    /* ================= LOGOUT ================= */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href =
                "../auth/login.html";
        }
    });


    /* ================= PROFILE ================= */

    document
        .getElementById("profileBtn")
        .addEventListener("click", () => {

            showMessage("Admin profile menu.");
        });


    /* ================= HELP ================= */

    document
        .querySelector(".help-box")
        .addEventListener("click", () => {

            showMessage("Support center opened.");
        });


    /* ================= HELPERS ================= */

    function getInitials(name) {

        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }


    function formatStatus(status) {

        const statusMap = {
            completed: "Completed",
            progress: "In Progress",
            pending: "Pending"
        };

        return statusMap[status] || status;
    }


    function showMessage(message) {

        const existing =
            document.querySelector(".toast-message");

        if (existing) {
            existing.remove();
        }

        const toast =
            document.createElement("div");

        toast.className = "toast-message";
        toast.textContent = message;

        Object.assign(toast.style, {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            padding: "13px 18px",
            background: "#111827",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "13px",
            zIndex: "2000",
            boxShadow: "0 8px 25px rgba(0,0,0,.15)"
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2500);
    }

});