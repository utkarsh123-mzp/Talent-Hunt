/* =========================================================
   TALENTHUNT - COLLEGE PROFILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotification =
        document.getElementById("closeNotification");

    const saveBtn =
        document.getElementById("saveBtn");

    const resetBtn =
        document.getElementById("resetBtn");

    const toast =
        document.getElementById("toast");

    const completionPercentage =
        document.getElementById("completionPercentage");

    const completionBar =
        document.getElementById("completionBar");


    /* =====================================================
       SIDEBAR
    ====================================================== */

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    closeNotification.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !notificationPanel.contains(event.target) &&
                !notificationBtn.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       EDIT SECTIONS
    ====================================================== */

    const editButtons =
        document.querySelectorAll(
            ".edit-btn"
        );


    editButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;


                    const sectionElement =
                        button.closest(
                            ".profile-section"
                        );


                    if (!sectionElement) {
                        return;
                    }


                    const fields =
                        sectionElement.querySelectorAll(
                            "input, select, textarea"
                        );


                    const isEditing =
                        button.classList.contains(
                            "editing"
                        );


                    fields.forEach(
                        field => {

                            field.disabled =
                                isEditing;

                        }
                    );


                    if (isEditing) {

                        button.innerHTML =
                            "✎ Edit";

                        button.classList.remove(
                            "editing"
                        );

                        showToast(
                            `${capitalize(section)} details locked`
                        );

                    } else {

                        button.innerHTML =
                            "✓ Done";

                        button.classList.add(
                            "editing"
                        );


                        if (fields.length > 0) {
                            fields[0].focus();
                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       SKILLS
    ====================================================== */

    const editSkills =
        document.getElementById(
            "editSkills"
        );

    const addSkillBox =
        document.getElementById(
            "addSkillBox"
        );

    const skillInput =
        document.getElementById(
            "skillInput"
        );

    const addSkillBtn =
        document.getElementById(
            "addSkillBtn"
        );

    const skillsContainer =
        document.querySelector(
            ".skills-container"
        );


    editSkills.addEventListener(
        "click",
        () => {

            addSkillBox.classList.toggle(
                "show"
            );


            if (
                addSkillBox.classList.contains(
                    "show"
                )
            ) {

                editSkills.innerHTML =
                    "✓ Done";

                skillInput.focus();

            } else {

                editSkills.innerHTML =
                    "✎ Edit";

            }

        }
    );


    addSkillBtn.addEventListener(
        "click",
        addSkill
    );


    skillInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                addSkill();

            }

        }
    );


    function addSkill() {

        const skill =
            skillInput.value.trim();


        if (!skill) {

            showToast(
                "Please enter a skill"
            );

            return;

        }


        const existingSkills =
            Array.from(
                document.querySelectorAll(
                    ".skill-item span"
                )
            ).map(
                element =>
                    element.textContent
                        .trim()
                        .toLowerCase()
            );


        if (
            existingSkills.includes(
                skill.toLowerCase()
            )
        ) {

            showToast(
                "Skill already exists"
            );

            skillInput.value = "";

            return;

        }


        const skillElement =
            document.createElement(
                "div"
            );


        skillElement.className =
            "skill-item";


        skillElement.innerHTML = `
            <span>${escapeHTML(skill)}</span>
            <button class="remove-skill" type="button">×</button>
        `;


        skillsContainer.appendChild(
            skillElement
        );


        skillInput.value = "";


        attachSkillRemove(
            skillElement.querySelector(
                ".remove-skill"
            )
        );


        updateCompletion();


        showToast(
            `${skill} added`
        );

    }


    /* =====================================================
       REMOVE SKILL
    ====================================================== */

    document
        .querySelectorAll(
            ".remove-skill"
        )
        .forEach(
            button => {

                attachSkillRemove(
                    button
                );

            }
        );


    function attachSkillRemove(button) {

        button.addEventListener(
            "click",
            () => {

                const skill =
                    button
                        .parentElement
                        .querySelector(
                            "span"
                        )
                        .textContent;


                button.parentElement.remove();


                updateCompletion();


                showToast(
                    `${skill} removed`
                );

            }
        );

    }


    /* =====================================================
       PROJECTS
    ====================================================== */

    const addProjectBtn =
        document.getElementById(
            "addProjectBtn"
        );

    const projectsContainer =
        document.getElementById(
            "projectsContainer"
        );


    addProjectBtn.addEventListener(
        "click",
        () => {

            const projectName =
                prompt(
                    "Enter project name:"
                );


            if (!projectName) {
                return;
            }


            const projectDescription =
                prompt(
                    "Enter project description:"
                );


            if (!projectDescription) {
                return;
            }


            const project =
                document.createElement(
                    "article"
                );


            project.className =
                "project-card";


            project.innerHTML = `
                <div class="project-icon">
                    💻
                </div>

                <div class="project-content">

                    <h3>
                        ${escapeHTML(projectName)}
                    </h3>

                    <p>
                        ${escapeHTML(projectDescription)}
                    </p>

                    <div class="project-tags">
                        <span>New Project</span>
                    </div>

                </div>

                <button
                    class="project-delete"
                    type="button">
                    ×
                </button>
            `;


            projectsContainer.appendChild(
                project
            );


            attachProjectDelete(
                project.querySelector(
                    ".project-delete"
                )
            );


            updateCompletion();


            showToast(
                "Project added successfully"
            );

        }
    );


    /* =====================================================
       DELETE PROJECT
    ====================================================== */

    document
        .querySelectorAll(
            ".project-delete"
        )
        .forEach(
            button => {

                attachProjectDelete(
                    button
                );

            }
        );


    function attachProjectDelete(button) {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".project-card"
                    );


                if (!card) {
                    return;
                }


                const confirmed =
                    confirm(
                        "Remove this project from your profile?"
                    );


                if (!confirmed) {
                    return;
                }


                card.remove();


                updateCompletion();


                showToast(
                    "Project removed"
                );

            }
        );

    }


    /* =====================================================
       SAVE PROFILE
    ====================================================== */

    saveBtn.addEventListener(
        "click",
        () => {

            saveProfileData();


            saveBtn.textContent =
                "✓ Profile Saved";


            setTimeout(
                () => {

                    saveBtn.textContent =
                        "Save Profile";

                },
                1500
            );


            showToast(
                "Profile saved successfully"
            );

        }
    );


    function saveProfileData() {

        const profileData = {

            name:
                document.getElementById(
                    "fullName"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            phone:
                document.getElementById(
                    "phone"
                ).value,

            location:
                document.getElementById(
                    "location"
                ).value,

            college:
                document.getElementById(
                    "college"
                ).value,

            degree:
                document.getElementById(
                    "degree"
                ).value,

            branch:
                document.getElementById(
                    "branch"
                ).value,

            graduation:
                document.getElementById(
                    "graduation"
                ).value,

            targetRole:
                document.getElementById(
                    "targetRole"
                ).value,

            workPreference:
                document.getElementById(
                    "workPreference"
                ).value,

            careerGoal:
                document.getElementById(
                    "careerGoal"
                ).value,

            github:
                document.getElementById(
                    "github"
                ).value,

            linkedin:
                document.getElementById(
                    "linkedin"
                ).value,

            portfolio:
                document.getElementById(
                    "portfolio"
                ).value

        };


        localStorage.setItem(
            "talentHuntProfile",
            JSON.stringify(
                profileData
            )
        );

    }


    /* =====================================================
       LOAD PROFILE
    ====================================================== */

    loadProfile();


    function loadProfile() {

        const saved =
            localStorage.getItem(
                "talentHuntProfile"
            );


        if (!saved) {
            return;
        }


        try {

            const data =
                JSON.parse(saved);


            const fields = {

                fullName: data.name,

                email: data.email,

                phone: data.phone,

                location: data.location,

                college: data.college,

                degree: data.degree,

                branch: data.branch,

                graduation: data.graduation,

                targetRole: data.targetRole,

                workPreference:
                    data.workPreference,

                careerGoal:
                    data.careerGoal,

                github: data.github,

                linkedin: data.linkedin,

                portfolio: data.portfolio

            };


            Object.entries(fields)
                .forEach(
                    ([id, value]) => {

                        const field =
                            document.getElementById(
                                id
                            );


                        if (
                            field &&
                            value !== undefined
                        ) {

                            field.value =
                                value;

                        }

                    }
                );


            updateHeaderName();

        } catch (error) {

            console.error(
                "Profile data could not be loaded.",
                error
            );

        }

    }


    /* =====================================================
       RESET
    ====================================================== */

    resetBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Reset unsaved profile changes?"
                );


            if (!confirmed) {
                return;
            }


            window.location.reload();

        }
    );


    /* =====================================================
       HEADER NAME
    ====================================================== */

    const fullName =
        document.getElementById(
            "fullName"
        );


    fullName.addEventListener(
        "input",
        updateHeaderName
    );


    function updateHeaderName() {

        const name =
            fullName.value.trim();


        const profileName =
            document.getElementById(
                "profileName"
            );


        if (name) {

            profileName.textContent =
                name;

        }

    }


    /* =====================================================
       PROFILE COMPLETION
    ====================================================== */

    const completionFields = [

        "fullName",
        "email",
        "phone",
        "location",
        "college",
        "degree",
        "branch",
        "graduation",
        "targetRole",
        "workPreference",
        "careerGoal",
        "github",
        "linkedin",
        "portfolio"

    ];


    completionFields.forEach(
        id => {

            const field =
                document.getElementById(
                    id
                );


            if (field) {

                field.addEventListener(
                    "input",
                    updateCompletion
                );

                field.addEventListener(
                    "change",
                    updateCompletion
                );

            }

        }
    );


    function updateCompletion() {

        let completed = 0;


        completionFields.forEach(
            id => {

                const field =
                    document.getElementById(
                        id
                    );


                if (
                    field &&
                    field.value.trim()
                ) {

                    completed++;

                }

            }
        );


        const skills =
            document.querySelectorAll(
                ".skill-item"
            ).length;


        const projects =
            document.querySelectorAll(
                ".project-card"
            ).length;


        if (skills > 0) {
            completed++;
        }


        if (projects > 0) {
            completed++;
        }


        const total =
            completionFields.length + 2;


        const percentage =
            Math.round(
                (completed / total) * 100
            );


        completionPercentage.textContent =
            `${percentage}%`;


        completionBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer;


    function showToast(message) {

        clearTimeout(
            toastTimer
        );


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


    /* =====================================================
       HELPERS
    ====================================================== */

    function capitalize(text) {

        if (!text) {
            return "";
        }


        return text.charAt(0).toUpperCase() +
            text.slice(1);

    }


    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       INITIALIZATION
    ====================================================== */

    updateCompletion();

});