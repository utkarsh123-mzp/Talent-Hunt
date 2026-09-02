/* =========================================
   TALENT HUNT - STUDENT PROFILE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const editProfileBtn = document.getElementById("editProfileBtn");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const addSkillBtn = document.getElementById("addSkillBtn");
    const skillInput = document.getElementById("skillInput");
    const skillTags = document.querySelector(".skill-tags");
    const changePhotoBtn = document.getElementById("changePhotoBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const profileName = document.getElementById("profileName");
    const topName = document.getElementById("topName");
    const profileInitial = document.getElementById("profileInitial");

    const editableFields = document.querySelectorAll(
        ".form-group input, .form-group select, textarea"
    );


    /* =========================================
       ORIGINAL VALUES
    ========================================= */

    let originalValues = {};

    function storeOriginalValues() {

        editableFields.forEach(field => {
            originalValues[field.id] = field.value;
        });

    }

    storeOriginalValues();


    /* =========================================
       EDIT PROFILE
    ========================================= */

    editProfileBtn.addEventListener("click", () => {

        editableFields.forEach(field => {
            field.disabled = false;
        });

        skillInput.disabled = false;
        addSkillBtn.disabled = false;

        editProfileBtn.innerHTML =
            '<i class="ph ph-pencil-simple"></i> Editing';

        editProfileBtn.classList.add("editing");

        alert("Profile editing enabled.");

    });


    /* =========================================
       SAVE PROFILE
    ========================================= */

    saveBtn.addEventListener("click", () => {

        const fullName = document.getElementById("fullName");

        if (!fullName.value.trim()) {

            alert("Please enter your full name.");

            fullName.focus();

            return;
        }


        // Save current values
        editableFields.forEach(field => {
            originalValues[field.id] = field.value;
        });


        // Update profile name
        profileName.textContent = fullName.value;
        topName.textContent = fullName.value.split(" ")[0];

        // Update avatar initial
        profileInitial.textContent =
            fullName.value.trim().charAt(0).toUpperCase();


        // Save demo data in localStorage
        localStorage.setItem(
            "studentName",
            fullName.value.split(" ")[0]
        );


        // Disable editing
        editableFields.forEach(field => {
            field.disabled = true;
        });


        skillInput.value = "";

        editProfileBtn.innerHTML =
            '<i class="ph ph-pencil-simple"></i> Edit Profile';

        editProfileBtn.classList.remove("editing");


        alert("Profile changes saved successfully!");


        console.log("Talent Hunt profile saved.");

    });


    /* =========================================
       CANCEL EDITING
    ========================================= */

    cancelBtn.addEventListener("click", () => {

        const confirmCancel = confirm(
            "Discard all unsaved changes?"
        );

        if (!confirmCancel) {
            return;
        }


        editableFields.forEach(field => {

            if (originalValues[field.id] !== undefined) {
                field.value = originalValues[field.id];
            }

            field.disabled = true;

        });


        skillInput.value = "";

        editProfileBtn.innerHTML =
            '<i class="ph ph-pencil-simple"></i> Edit Profile';

        editProfileBtn.classList.remove("editing");


        alert("Changes discarded.");

    });


    /* =========================================
       ADD SKILL
    ========================================= */

    function addSkill() {

        const skill = skillInput.value.trim();

        if (!skill) {

            alert("Please enter a skill.");

            skillInput.focus();

            return;
        }


        // Prevent duplicate skill
        const existingSkills =
            skillTags.querySelectorAll("span");

        for (const item of existingSkills) {

            const existingText =
                item.textContent.replace("×", "").trim();

            if (
                existingText.toLowerCase() ===
                skill.toLowerCase()
            ) {

                alert("This skill is already added.");

                skillInput.value = "";

                return;
            }
        }


        // Create skill tag
        const newSkill = document.createElement("span");

        newSkill.innerHTML = `
            ${escapeHtml(skill)}
            <button type="button" class="remove-skill">
                ×
            </button>
        `;


        skillTags.appendChild(newSkill);

        skillInput.value = "";

        skillInput.focus();

    }


    addSkillBtn.addEventListener("click", addSkill);


    /* =========================================
       ADD SKILL WITH ENTER
    ========================================= */

    skillInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            addSkill();

        }

    });


    /* =========================================
       REMOVE SKILL
    ========================================= */

    skillTags.addEventListener("click", event => {

        if (
            event.target.classList.contains(
                "remove-skill"
            )
        ) {

            const skillTag =
                event.target.closest("span");

            if (skillTag) {
                skillTag.remove();
            }

        }


        // Existing × buttons
        if (
            event.target.tagName === "BUTTON" &&
            !event.target.classList.contains("remove-skill")
        ) {

            const skillTag =
                event.target.closest("span");

            if (skillTag) {
                skillTag.remove();
            }

        }

    });


    /* =========================================
       PROFILE PHOTO
    ========================================= */

    changePhotoBtn.addEventListener("click", () => {

        const fileInput =
            document.createElement("input");

        fileInput.type = "file";
        fileInput.accept = "image/*";


        fileInput.addEventListener("change", event => {

            const file = event.target.files[0];

            if (!file) {
                return;
            }


            // Basic validation
            if (!file.type.startsWith("image/")) {

                alert("Please select a valid image.");

                return;
            }


            // Preview selected image
            const reader = new FileReader();

            reader.onload = function (e) {

                const profileAvatar =
                    document.querySelector(".profile-avatar");

                profileAvatar.style.backgroundImage =
                    `url("${e.target.result}")`;

                profileAvatar.style.backgroundSize =
                    "cover";

                profileAvatar.style.backgroundPosition =
                    "center";

                profileInitial.style.display =
                    "none";

            };

            reader.readAsDataURL(file);

        });


        fileInput.click();

    });


    /* =========================================
       LOGOUT
    ========================================= */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            localStorage.removeItem("studentName");

            window.location.href =
                "../login.html";

        }

    });


    /* =========================================
       NAVIGATION
    ========================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            // Allow actual dashboard/profile links
            if (
                href &&
                href !== "#" &&
                !href.startsWith("#")
            ) {
                return;
            }

            event.preventDefault();

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");


            const pageName =
                link.querySelector("span")?.textContent;

            if (pageName) {

                alert(
                    pageName +
                    " section will be available soon."
                );

            }

        });

    });


    /* =========================================
       HTML ESCAPE FUNCTION
    ========================================= */

    function escapeHtml(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }


    /* =========================================
       PAGE LOADED
    ========================================= */

    console.log(
        "Talent Hunt Student Profile loaded successfully."
    );

});