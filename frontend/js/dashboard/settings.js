/* =====================================================
   TALENT HUNT - SETTINGS JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const sidebar = document.getElementById("sidebar");

    const menuBtn = document.getElementById("menuBtn");

    const tabs = document.querySelectorAll(".setting-tab");

    const sections = document.querySelectorAll(".setting-section");

    const profileForm = document.getElementById("profileForm");

    const toast = document.getElementById("toast");

    const toastText = document.getElementById("toastText");


    /* =================================================
       TOAST
    ================================================= */

    function showToast(message) {

        if (!toast) return;

        toastText.textContent = message;

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =================================================
       MOBILE SIDEBAR
    ================================================= */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("active");

        });

    }


    /* =================================================
       SETTINGS TABS
    ================================================= */

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const sectionName =
                tab.getAttribute("data-section");


            /* Remove active */

            tabs.forEach(function (item) {

                item.classList.remove("active");

            });


            sections.forEach(function (section) {

                section.classList.remove("active");

            });


            /* Add active */

            tab.classList.add("active");


            const target =
                document.getElementById(sectionName);


            if (target) {

                target.classList.add("active");

            }


            /* URL hash */

            history.replaceState(
                null,
                "",
                "#" + sectionName
            );

        });

    });


    /* =================================================
       OPEN TAB FROM URL HASH
    ================================================= */

    function openHashSection() {

        const hash =
            window.location.hash.replace("#", "");


        if (!hash) return;


        const targetTab =
            document.querySelector(
                `.setting-tab[data-section="${hash}"]`
            );


        const targetSection =
            document.getElementById(hash);


        if (targetTab && targetSection) {

            tabs.forEach(function (tab) {

                tab.classList.remove("active");

            });


            sections.forEach(function (section) {

                section.classList.remove("active");

            });


            targetTab.classList.add("active");

            targetSection.classList.add("active");

        }

    }


    openHashSection();


    /* =================================================
       PROFILE DATA
    ================================================= */

    const profileFields = [

        "fullName",
        "email",
        "phone",
        "college",
        "course",
        "graduationYear",
        "bio"

    ];


    function loadProfile() {

        const savedProfile =
            JSON.parse(
                localStorage.getItem("talentHuntProfile")
            );


        if (!savedProfile) return;


        profileFields.forEach(function (field) {

            const element =
                document.getElementById(field);


            if (
                element &&
                savedProfile[field] !== undefined
            ) {

                element.value =
                    savedProfile[field];

            }

        });


        updateUserName(
            savedProfile.fullName || "Student"
        );

    }


    function updateUserName(name) {

        const profileName =
            document.getElementById("profileName");

        const topName =
            document.getElementById("topName");

        const profileAvatar =
            document.getElementById("profileAvatar");

        const topAvatar =
            document.getElementById("topAvatar");


        if (!name) {

            name = "Student";

        }


        if (profileName) {

            profileName.textContent = name;

        }


        if (topName) {

            topName.textContent = name;

        }


        const firstLetter =
            name.charAt(0).toUpperCase();


        if (profileAvatar) {

            profileAvatar.textContent =
                firstLetter;

        }


        if (topAvatar) {

            topAvatar.textContent =
                firstLetter;

        }

    }


    loadProfile();


    /* =================================================
       PROFILE SAVE
    ================================================= */

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const profileData = {};


                profileFields.forEach(function (field) {

                    const element =
                        document.getElementById(field);


                    if (element) {

                        profileData[field] =
                            element.value.trim();

                    }

                });


                if (
                    !profileData.fullName
                ) {

                    showToast(
                        "Please enter your full name."
                    );

                    return;

                }


                localStorage.setItem(
                    "talentHuntProfile",
                    JSON.stringify(profileData)
                );


                updateUserName(
                    profileData.fullName
                );


                showToast(
                    "Profile saved successfully!"
                );

            }
        );

    }


    /* =================================================
       PASSWORD SHOW / HIDE
    ================================================= */

    const passwordButtons =
        document.querySelectorAll(
            ".password-btn"
        );


    passwordButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );


                const input =
                    document.getElementById(
                        targetId
                    );


                const icon =
                    button.querySelector("i");


                if (!input) return;


                if (input.type === "password") {

                    input.type = "text";

                    if (icon) {

                        icon.className =
                            "ph ph-eye-slash";

                    }

                } else {

                    input.type = "password";

                    if (icon) {

                        icon.className =
                            "ph ph-eye";

                    }

                }

            }
        );

    });


    /* =================================================
       PASSWORD UPDATE
    ================================================= */

    const passwordBtn =
        document.getElementById(
            "passwordBtn"
        );


    if (passwordBtn) {

        passwordBtn.addEventListener(
            "click",
            function () {

                const currentPassword =
                    document.getElementById(
                        "currentPassword"
                    ).value;


                const newPassword =
                    document.getElementById(
                        "newPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                if (
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                ) {

                    showToast(
                        "Please fill all password fields."
                    );

                    return;

                }


                if (newPassword.length < 8) {

                    showToast(
                        "Password must contain at least 8 characters."
                    );

                    return;

                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    showToast(
                        "Passwords do not match."
                    );

                    return;

                }


                showToast(
                    "Password updated successfully!"
                );


                document.getElementById(
                    "currentPassword"
                ).value = "";


                document.getElementById(
                    "newPassword"
                ).value = "";


                document.getElementById(
                    "confirmPassword"
                ).value = "";

            }
        );

    }


    /* =================================================
       SETTINGS TOGGLES
    ================================================= */

    const toggleIds = [

        "recommendations",
        "competitionSuggestions",
        "careerUpdates",
        "pushNotifications",
        "emailNotifications",
        "deadlineReminders"

    ];


    function loadToggles() {

        toggleIds.forEach(function (id) {

            const checkbox =
                document.getElementById(id);


            if (!checkbox) return;


            const saved =
                localStorage.getItem(
                    "talentHunt_" + id
                );


            if (saved !== null) {

                checkbox.checked =
                    saved === "true";

            }


            checkbox.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "talentHunt_" + id,
                        checkbox.checked
                    );


                    showToast(
                        checkbox.checked
                            ? "Setting enabled."
                            : "Setting disabled."
                    );

                }
            );

        });

    }


    loadToggles();


    /* =================================================
       NOTIFICATION BUTTON
    ================================================= */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "No new notifications."
                );

            }
        );

    }


    /* =================================================
       DELETE ACCOUNT
    ================================================= */

    const deleteAccount =
        document.getElementById(
            "deleteAccount"
        );


    if (deleteAccount) {

        deleteAccount.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to delete your saved Talent Hunt settings?"
                    );


                if (!confirmed) return;


                localStorage.removeItem(
                    "talentHuntProfile"
                );


                toggleIds.forEach(function (id) {

                    localStorage.removeItem(
                        "talentHunt_" + id
                    );

                });


                showToast(
                    "Saved account settings deleted."
                );


                setTimeout(function () {

                    window.location.reload();

                }, 1500);

            }
        );

    }


    /* =================================================
       LOGOUT
    ================================================= */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Do you want to logout?"
                    );


                if (!confirmed) return;


                showToast(
                    "Logged out successfully."
                );


                setTimeout(function () {

                    window.location.href =
                        "../auth/login.html";

                }, 1000);

            }
        );

    }

});