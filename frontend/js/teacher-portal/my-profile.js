/* =====================================================
   MY PROFILE - TEACHER PORTAL
===================================================== */


/* =====================================================
   DEFAULT TEACHER DATA
===================================================== */

const defaultTeacher = {

    name: "Teacher Name",

    email: "teacher@example.com",

    phone: "+91 98765 43210",

    city: "Varanasi",

    subject: "Mathematics Teacher",

    experience: "3",

    fee: "₹500 / hour",

    mode: "Online & Offline"

};


/* =====================================================
   GET SAVED PROFILE
===================================================== */

let teacherProfile =
    JSON.parse(localStorage.getItem("teacherProfile"))
    || defaultTeacher;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const profileModal =
    document.getElementById("profileModal");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const profileForm =
    document.getElementById("profileForm");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =====================================================
   DISPLAY PROFILE
===================================================== */

function displayProfile() {

    const firstLetter =
        teacherProfile.name
            .trim()
            .charAt(0)
            .toUpperCase() || "T";


    /* Hero */

    document.getElementById("displayName").textContent =
        teacherProfile.name;

    document.getElementById("displaySubject").textContent =
        teacherProfile.subject;

    document.getElementById("displayExperience").textContent =
        teacherProfile.experience;


    /* Header */

    document.getElementById("headerTeacherName").textContent =
        teacherProfile.name;


    /* Avatar */

    document.getElementById("profileAvatar").textContent =
        firstLetter;

    document.querySelector(".mini-avatar").textContent =
        firstLetter;


    /* Personal Information */

    document.getElementById("infoName").textContent =
        teacherProfile.name;

    document.getElementById("infoEmail").textContent =
        teacherProfile.email;

    document.getElementById("infoPhone").textContent =
        teacherProfile.phone;

    document.getElementById("infoCity").textContent =
        teacherProfile.city;

    document.getElementById("infoMode").textContent =
        teacherProfile.mode;


    /* Teaching Information */

    document.getElementById("experienceValue").textContent =
        teacherProfile.experience;

    document.getElementById("feeValue").textContent =
        teacherProfile.fee;

}


/* =====================================================
   OPEN MODAL
===================================================== */

function openProfileModal() {

    document.getElementById("name").value =
        teacherProfile.name;

    document.getElementById("email").value =
        teacherProfile.email;

    document.getElementById("phone").value =
        teacherProfile.phone;

    document.getElementById("city").value =
        teacherProfile.city;

    document.getElementById("subject").value =
        teacherProfile.subject;

    document.getElementById("experience").value =
        teacherProfile.experience;

    document.getElementById("fee").value =
        teacherProfile.fee;

    document.getElementById("mode").value =
        teacherProfile.mode;


    profileModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeProfileModal() {

    profileModal.classList.remove("show");

    document.body.style.overflow = "";
}


/* =====================================================
   EDIT BUTTON
===================================================== */

editProfileBtn.addEventListener(
    "click",
    openProfileModal
);


/* =====================================================
   CLOSE BUTTON
===================================================== */

closeModal.addEventListener(
    "click",
    closeProfileModal
);

cancelBtn.addEventListener(
    "click",
    closeProfileModal
);


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

profileModal.addEventListener(
    "click",
    function (event) {

        if (event.target === profileModal) {

            closeProfileModal();

        }

    }
);


/* =====================================================
   SAVE PROFILE
===================================================== */

profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        teacherProfile = {

            name:
                document.getElementById("name").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            city:
                document.getElementById("city").value.trim(),

            subject:
                document.getElementById("subject").value.trim(),

            experience:
                document.getElementById("experience").value,

            fee:
                document.getElementById("fee").value.trim(),

            mode:
                document.getElementById("mode").value

        };


        /* Save locally */

        localStorage.setItem(
            "teacherProfile",
            JSON.stringify(teacherProfile)
        );


        /* Update UI */

        displayProfile();


        /* Close modal */

        closeProfileModal();


        /* Success message */

        showNotification(
            "Profile updated successfully!"
        );

    }
);


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "profile-notification";

    notification.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;


    notification.style.position = "fixed";
    notification.style.right = "25px";
    notification.style.bottom = "25px";
    notification.style.background = "#20283a";
    notification.style.color = "#ffffff";
    notification.style.padding = "13px 17px";
    notification.style.borderRadius = "9px";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "9px";
    notification.style.fontSize = "12px";
    notification.style.zIndex = "2000";
    notification.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.15)";


    document.body.appendChild(notification);


    setTimeout(
        function () {

            notification.remove();

        },
        2500
    );

}


/* =====================================================
   DOCUMENT BUTTONS
===================================================== */

const documentButtons =
    document.querySelectorAll(".view-document");

documentButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                showNotification(
                    "Document preview will be available soon."
                );

            }
        );

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutBtn.addEventListener(
    "click",
    function () {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

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


/* =====================================================
   INITIAL LOAD
===================================================== */

displayProfile();