/* =========================================================
   TALENT HUNT - TEACHER REGISTRATION
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // ELEMENTS
    // =====================================================

    const form =
        document.getElementById("teacherRegistrationForm");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const submitBtn =
        document.getElementById("submitBtn");

    const successModal =
        document.getElementById("successModal");

    const applicationIdElement =
        document.getElementById("applicationId");

    const continueBtn =
        document.getElementById("continueBtn");

    const phone =
        document.getElementById("phone");


    // =====================================================
    // PASSWORD SHOW / HIDE
    // =====================================================

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent = "Hide";

        } else {

            password.type = "password";

            togglePassword.textContent = "Show";

        }

    });


    // =====================================================
    // PHONE NUMBER VALIDATION
    // =====================================================

    phone.addEventListener("input", () => {

        phone.value = phone.value.replace(/\D/g, "");

    });


    // =====================================================
    // APPLICATION ID GENERATOR
    // =====================================================

    function generateApplicationId() {

        const date =
            new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, "");

        const random =
            Math.floor(1000 + Math.random() * 9000);

        return `TH-${date}-${random}`;

    }


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        // -----------------------------------------------
        // Password check
        // -----------------------------------------------

        if (password.value.length < 8) {

            alert(
                "Password must contain at least 8 characters."
            );

            password.focus();

            return;

        }


        // -----------------------------------------------
        // Confirm password
        // -----------------------------------------------

        if (password.value !== confirmPassword.value) {

            alert(
                "Password and Confirm Password do not match."
            );

            confirmPassword.focus();

            return;

        }


        // -----------------------------------------------
        // Phone validation
        // -----------------------------------------------

        if (phone.value.length !== 10) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            phone.focus();

            return;

        }


        // -----------------------------------------------
        // Form data
        // -----------------------------------------------

        const formData =
            new FormData(form);


        const applicationId =
            generateApplicationId();


        // -----------------------------------------------
        // Create application object
        // -----------------------------------------------

        const teacherApplication = {

            applicationId: applicationId,

            status: "pending-verification",

            currentStage: "registration",

            submittedAt:
                new Date().toISOString(),


            personal: {

                fullName:
                    formData.get("fullName"),

                email:
                    formData.get("email"),

                phone:
                    formData.get("phone"),

                dob:
                    formData.get("dob"),

                gender:
                    formData.get("gender"),

                city:
                    formData.get("city")

            },


            teaching: {

                category:
                    formData.get("teachingCategory"),

                experience:
                    formData.get("experience"),

                qualification:
                    formData.get("qualification"),

                subject:
                    formData.get("subject"),

                classLevel:
                    formData.get("classLevel"),

                teachingMode:
                    formData.get("teachingMode")

            },


            verification: {

                documentType:
                    formData.get("identityType"),

                documentNumber:
                    formData.get("identityNumber"),

                verified: false

            },


            process: {

                registration:
                    "completed",

                profile:
                    "pending",

                documents:
                    "pending",

                demo:
                    "pending",

                assessment:
                    "pending",

                interview:
                    "pending",

                hiring:
                    "pending"

            }

        };


        // =================================================
        // SAVE CURRENT TEACHER APPLICATION
        // =================================================

        localStorage.setItem(
            "talentHuntTeacherApplication",
            JSON.stringify(teacherApplication)
        );


        // =================================================
        // SAVE APPLICATION LIST
        // =================================================

        let applications =
            JSON.parse(
                localStorage.getItem(
                    "talentHuntTeacherApplications"
                )
            ) || [];


        applications.push(teacherApplication);


        localStorage.setItem(
            "talentHuntTeacherApplications",
            JSON.stringify(applications)
        );


        // =================================================
        // SHOW SUCCESS MODAL
        // =================================================

        applicationIdElement.textContent =
            applicationId;


        successModal.classList.add("show");


        // Disable button
        submitBtn.disabled = true;


        submitBtn.querySelector("span").textContent =
            "Application Submitted";


    });


    // =====================================================
    // CONTINUE TO PROFILE
    // =====================================================

    continueBtn.addEventListener("click", () => {

        window.location.href =
            "teacher-profile.html";

    });


});