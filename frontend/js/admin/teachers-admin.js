/* =====================================================
   TEACHERS MANAGEMENT
   Talent Hunt Admin Portal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= TEACHER DATA ================= */

    const teachers = [

        {
            id: 1,
            name: "Anjali Sharma",
            email: "anjali.sharma@email.com",
            subject: "Mathematics",
            classes: "Class 9 - 12",
            experience: "5 Years",
            status: "active",
            joiningDate: "12 Sep 2026",
            qualification: "M.Sc Mathematics",
            mode: "Online / Offline"
        },

        {
            id: 2,
            name: "Rahul Verma",
            email: "rahul.verma@email.com",
            subject: "Physics",
            classes: "Class 11 - 12",
            experience: "7 Years",
            status: "active",
            joiningDate: "14 Sep 2026",
            qualification: "M.Sc Physics",
            mode: "Online"
        },

        {
            id: 3,
            name: "Priya Singh",
            email: "priya.singh@email.com",
            subject: "Chemistry",
            classes: "Class 9 - 12",
            experience: "4 Years",
            status: "active",
            joiningDate: "16 Sep 2026",
            qualification: "M.Sc Chemistry",
            mode: "Online / Offline"
        },

        {
            id: 4,
            name: "Amit Kumar",
            email: "amit.kumar@email.com",
            subject: "Computer Science",
            classes: "Class 9 - 12",
            experience: "6 Years",
            status: "active",
            joiningDate: "18 Sep 2026",
            qualification: "M.Tech Computer Science",
            mode: "Online"
        },

        {
            id: 5,
            name: "Neha Gupta",
            email: "neha.gupta@email.com",
            subject: "English",
            classes: "Class 6 - 12",
            experience: "3 Years",
            status: "active",
            joiningDate: "19 Sep 2026",
            qualification: "M.A English",
            mode: "Online / Offline"
        },

        {
            id: 6,
            name: "Vikas Yadav",
            email: "vikas.yadav@email.com",
            subject: "Biology",
            classes: "Class 11 - 12",
            experience: "5 Years",
            status: "leave",
            joiningDate: "20 Sep 2026",
            qualification: "M.Sc Biology",
            mode: "Offline"
        },

        {
            id: 7,
            name: "Sneha Mishra",
            email: "sneha.mishra@email.com",
            subject: "Mathematics",
            classes: "Class 6 - 10",
            experience: "2 Years",
            status: "active",
            joiningDate: "22 Sep 2026",
            qualification: "B.Sc Mathematics",
            mode: "Online"
        },

        {
            id: 8,
            name: "Rohit Pandey",
            email: "rohit.pandey@email.com",
            subject: "Physics",
            classes: "Class 9 - 12",
            experience: "1 Year",
            status: "inactive",
            joiningDate: "25 Sep 2026",
            qualification: "B.Sc Physics",
            mode: "Online"
        }

    ];


    /* ================= ELEMENTS ================= */

    const tableBody =
        document.getElementById("teachersTable");

    const searchInput =
        document.getElementById("searchInput");

    const subjectFilter =
        document.getElementById("subjectFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const resetBtn =
        document.getElementById("resetBtn");

    const selectAll =
        document.getElementById("selectAll");

    const resultCount =
        document.getElementById("resultCount");

    const totalTeachers =
        document.getElementById("totalTeachers");

    const activeTeachers =
        document.getElementById("activeTeachers");

    const leaveTeachers =
        document.getElementById("leaveTeachers");

    const inactiveTeachers =
        document.getElementById("inactiveTeachers");

    const profileModal =
        document.getElementById("profileModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalAvatar =
        document.getElementById("modalAvatar");

    const modalName =
        document.getElementById("modalName");

    const modalEmail =
        document.getElementById("modalEmail");

    const modalSubject =
        document.getElementById("modalSubject");

    const modalClasses =
        document.getElementById("modalClasses");

    const modalExperience =
        document.getElementById("modalExperience");

    const modalJoining =
        document.getElementById("modalJoining");

    const modalQualification =
        document.getElementById("modalQualification");

    const modalMode =
        document.getElementById("modalMode");

    const modalStatus =
        document.getElementById("modalStatus");

    const toggleStatusBtn =
        document.getElementById("toggleStatusBtn");

    const viewProfileBtn =
        document.getElementById("viewProfileBtn");

    const exportBtn =
        document.getElementById("exportBtn");

    const addTeacherBtn =
        document.getElementById("addTeacherBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const profileBtn =
        document.getElementById("profileBtn");

    const helpBox =
        document.getElementById("helpBox");


    let selectedTeacherId = null;


    /* ================= INITIAL LOAD ================= */

    renderTeachers(teachers);
    updateStats();


    /* ================= RENDER TEACHERS ================= */

    function renderTeachers(data) {

        tableBody.innerHTML = "";

        resultCount.textContent =
            `${data.length} teacher${data.length !== 1 ? "s" : ""} found`;

        selectAll.checked = false;


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

            const row =
                document.createElement("tr");

            const initials =
                getInitials(teacher.name);


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


                <td>
                    ${teacher.subject}
                </td>


                <td>
                    ${teacher.classes}
                </td>


                <td>
                    ${teacher.experience}
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
                        title="View Teacher"
                    >
                        ⋮
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        attachViewEvents();
    }


    /* ================= VIEW EVENTS ================= */

    function attachViewEvents() {

        const buttons =
            document.querySelectorAll(".view-btn");


        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                openProfile(id);

            });

        });

    }


    /* ================= OPEN PROFILE ================= */

    function openProfile(id) {

        const teacher =
            teachers.find(item => item.id === id);


        if (!teacher) {
            return;
        }


        selectedTeacherId = id;


        modalAvatar.textContent =
            getInitials(teacher.name);

        modalName.textContent =
            teacher.name;

        modalEmail.textContent =
            teacher.email;

        modalSubject.textContent =
            teacher.subject;

        modalClasses.textContent =
            teacher.classes;

        modalExperience.textContent =
            teacher.experience;

        modalJoining.textContent =
            teacher.joiningDate;

        modalQualification.textContent =
            teacher.qualification;

        modalMode.textContent =
            teacher.mode;

        modalStatus.textContent =
            formatStatus(teacher.status);


        if (teacher.status === "inactive") {

            toggleStatusBtn.textContent =
                "Activate Teacher";

        } else {

            toggleStatusBtn.textContent =
                "Change Status";

        }


        profileModal.classList.add("show");
    }


    /* ================= CLOSE PROFILE ================= */

    function closeProfile() {

        profileModal.classList.remove("show");

        selectedTeacherId = null;
    }


    modalClose.addEventListener(
        "click",
        closeProfile
    );


    profileModal.addEventListener(
        "click",
        event => {

            if (event.target === profileModal) {
                closeProfile();
            }

        }
    );


    /* ================= SEARCH ================= */

    searchInput.addEventListener(
        "input",
        applyFilters
    );


    subjectFilter.addEventListener(
        "change",
        applyFilters
    );


    statusFilter.addEventListener(
        "change",
        applyFilters
    );


    function applyFilters() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        const subject =
            subjectFilter.value;

        const status =
            statusFilter.value;


        const filtered =
            teachers.filter(teacher => {

                const matchesSearch =
                    teacher.name
                        .toLowerCase()
                        .includes(search) ||

                    teacher.email
                        .toLowerCase()
                        .includes(search) ||

                    teacher.subject
                        .toLowerCase()
                        .includes(search);


                const matchesSubject =
                    subject === "all" ||
                    teacher.subject === subject;


                const matchesStatus =
                    status === "all" ||
                    teacher.status === status;


                return (
                    matchesSearch &&
                    matchesSubject &&
                    matchesStatus
                );

            });


        renderTeachers(filtered);
    }


    /* ================= RESET ================= */

    resetBtn.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            subjectFilter.value = "all";

            statusFilter.value = "all";

            renderTeachers(teachers);

        }
    );


    /* ================= SELECT ALL ================= */

    selectAll.addEventListener(
        "change",
        () => {

            const checkboxes =
                document.querySelectorAll(
                    ".teacher-checkbox"
                );


            checkboxes.forEach(
                checkbox => {

                    checkbox.checked =
                        selectAll.checked;

                }
            );

        }
    );


    /* ================= CHANGE STATUS ================= */

    toggleStatusBtn.addEventListener(
        "click",
        () => {

            if (!selectedTeacherId) {
                return;
            }


            const teacher =
                teachers.find(
                    item =>
                        item.id === selectedTeacherId
                );


            if (!teacher) {
                return;
            }


            if (teacher.status === "active") {

                teacher.status = "inactive";

            } else {

                teacher.status = "active";

            }


            updateStats();

            applyFilters();

            closeProfile();


            showToast(
                `${teacher.name} status updated to ${formatStatus(teacher.status)}.`
            );

        }
    );


    /* ================= FULL PROFILE ================= */

    viewProfileBtn.addEventListener(
        "click",
        () => {

            if (!selectedTeacherId) {
                return;
            }


            const teacher =
                teachers.find(
                    item =>
                        item.id === selectedTeacherId
                );


            if (!teacher) {
                return;
            }


            showToast(
                `Full profile for ${teacher.name} will open here.`
            );

        }
    );


    /* ================= ADD TEACHER ================= */

    addTeacherBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Teacher creation form will be available here."
            );

        }
    );


    /* ================= EXPORT ================= */

    exportBtn.addEventListener(
        "click",
        () => {

            const header =
                "Teacher,Email,Subject,Classes,Experience,Status,Joining Date";


            const rows =
                teachers.map(teacher => {

                    return [

                        teacher.name,

                        teacher.email,

                        teacher.subject,

                        teacher.classes,

                        teacher.experience,

                        formatStatus(teacher.status),

                        teacher.joiningDate

                    ].join(",");

                });


            const csv =
                [header, ...rows].join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
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

        }
    );


    /* ================= STATS ================= */

    function updateStats() {

        const total =
            teachers.length;


        const active =
            teachers.filter(
                teacher =>
                    teacher.status === "active"
            ).length;


        const leave =
            teachers.filter(
                teacher =>
                    teacher.status === "leave"
            ).length;


        const inactive =
            teachers.filter(
                teacher =>
                    teacher.status === "inactive"
            ).length;


        totalTeachers.textContent =
            String(total).padStart(2, "0");

        activeTeachers.textContent =
            String(active).padStart(2, "0");

        leaveTeachers.textContent =
            String(leave).padStart(2, "0");

        inactiveTeachers.textContent =
            String(inactive).padStart(2, "0");

    }


    /* ================= PROFILE ================= */

    profileBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Admin profile menu."
            );

        }
    );


    /* ================= HELP ================= */

    helpBox.addEventListener(
        "click",
        () => {

            showToast(
                "Support center opened."
            );

        }
    );


    /* ================= LOGOUT ================= */

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                window.location.href =
                    "../auth/login.html";

            }

        }
    );


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

            active: "Active",

            leave: "On Leave",

            inactive: "Inactive"

        };


        return statusMap[status] || status;
    }


    function showToast(message) {

        const oldToast =
            document.querySelector(
                ".toast-message"
            );


        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "toast-message";


        toast.textContent =
            message;


        Object.assign(
            toast.style,
            {
                position: "fixed",
                bottom: "25px",
                right: "25px",
                padding: "13px 18px",
                background: "#111827",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "13px",
                zIndex: "2000",
                boxShadow:
                    "0 8px 25px rgba(0,0,0,.15)"
            }
        );


        document.body.appendChild(toast);


        setTimeout(
            () => {
                toast.remove();
            },
            2500
        );

    }

});