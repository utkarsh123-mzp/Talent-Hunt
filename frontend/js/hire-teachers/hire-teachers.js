/* =====================================================
   TEACHER HIRING PORTAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const applicationSection =
        document.getElementById("applicationSection");

    const startApplicationBtn =
        document.getElementById("startApplicationBtn");

    const checkStatusBtn =
        document.getElementById("checkStatusBtn");

    const teacherLoginBtn =
        document.getElementById("teacherLoginBtn");

    const steps =
        document.querySelectorAll(".application-step");

    const formSteps =
        document.querySelectorAll(".form-step");

    const nextButtons =
        document.querySelectorAll(".next-btn");

    const prevButtons =
        document.querySelectorAll(".prev-btn");

    const previewProgress =
        document.getElementById("previewProgress");

    const previewProgressBar =
        document.getElementById("previewProgressBar");

    const submitApplicationBtn =
        document.getElementById("submitApplicationBtn");

    const successScreen =
        document.getElementById("successScreen");

    const applicationId =
        document.getElementById("applicationId");

    const copyApplicationId =
        document.getElementById("copyApplicationId");

    const viewApplicationBtn =
        document.getElementById("viewApplicationBtn");

    const statusModal =
        document.getElementById("statusModal");

    const closeStatusModal =
        document.getElementById("closeStatusModal");

    const searchStatusBtn =
        document.getElementById("searchStatusBtn");

    const statusResult =
        document.getElementById("statusResult");

    const agreement =
        document.getElementById("agreement");


    /* =================================================
       STATE
    ================================================= */

    let currentStep = 1;

    let generatedApplicationId = "";


    /* =================================================
       START APPLICATION
    ================================================= */

    startApplicationBtn.addEventListener("click", () => {

        applicationSection.scrollIntoView({
            behavior: "smooth"
        });

    });


    /* =================================================
       TEACHER LOGIN
    ================================================= */

    teacherLoginBtn.addEventListener("click", () => {

        showToast(
            "Teacher login will be connected with the backend later.",
            "info"
        );

    });


    /* =================================================
       STEP NAVIGATION
    ================================================= */

    function showStep(stepNumber) {

        currentStep = stepNumber;


        /* Form */

        formSteps.forEach(step => {

            step.classList.remove("active");

            if (
                Number(step.dataset.formStep) === stepNumber
            ) {
                step.classList.add("active");
            }

        });


        /* Sidebar */

        steps.forEach(step => {

            const number =
                Number(step.dataset.step);

            step.classList.remove("active");

            if (number === stepNumber) {

                step.classList.add("active");

            }

            if (number < stepNumber) {

                step.classList.add("completed");

            }

        });


        updateProgress();


        applicationSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        if (stepNumber === 6) {

            generateReview();

        }

    }


    /* =================================================
       SIDEBAR CLICK
    ================================================= */

    steps.forEach(step => {

        step.addEventListener("click", () => {

            const requestedStep =
                Number(step.dataset.step);

            /*
             * Allow navigation only to completed
             * steps or the current step.
             */

            if (requestedStep <= currentStep) {

                showStep(requestedStep);

            }

        });

    });


    /* =================================================
       NEXT BUTTONS
    ================================================= */

    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            const nextStep =
                Number(button.dataset.next);

            if (!validateStep(currentStep)) {
                return;
            }

            showStep(nextStep);

        });

    });


    /* =================================================
       PREVIOUS BUTTONS
    ================================================= */

    prevButtons.forEach(button => {

        button.addEventListener("click", () => {

            const previousStep =
                Number(button.dataset.prev);

            showStep(previousStep);

        });

    });


    /* =================================================
       VALIDATION
    ================================================= */

    function validateStep(step) {


        if (step === 1) {

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const mobile =
                document.getElementById("mobile").value.trim();

            const city =
                document.getElementById("city").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            if (
                !fullName ||
                !email ||
                !mobile ||
                !city ||
                !password ||
                !confirmPassword
            ) {

                showToast(
                    "Please complete all required fields.",
                    "error"
                );

                return false;

            }


            if (!validateEmail(email)) {

                showToast(
                    "Please enter a valid email address.",
                    "error"
                );

                return false;

            }


            if (mobile.length !== 10) {

                showToast(
                    "Please enter a valid 10-digit mobile number.",
                    "error"
                );

                return false;

            }


            if (password.length < 6) {

                showToast(
                    "Password should contain at least 6 characters.",
                    "error"
                );

                return false;

            }


            if (password !== confirmPassword) {

                showToast(
                    "Passwords do not match.",
                    "error"
                );

                return false;

            }

        }


        if (step === 2) {

            const identityType =
                document.getElementById("identityType").value;

            const identityNumber =
                document.getElementById("identityNumber").value.trim();


            if (!identityType || !identityNumber) {

                showToast(
                    "Please enter your identity details.",
                    "error"
                );

                return false;

            }

        }


        if (step === 3) {

            const qualification =
                document.getElementById("qualification").value;

            const experience =
                document.getElementById("experience").value;

            const subject =
                document.getElementById("subject").value.trim();

            const teachingLevel =
                document.getElementById("teachingLevel").value;


            if (
                !qualification ||
                !experience ||
                !subject ||
                !teachingLevel
            ) {

                showToast(
                    "Please complete your teacher profile.",
                    "error"
                );

                return false;

            }


            const modes =
                document.querySelectorAll(
                    'input[name="mode"]:checked'
                );


            if (modes.length === 0) {

                showToast(
                    "Please select at least one teaching mode.",
                    "error"
                );

                return false;

            }

        }


        if (step === 4) {

            const resume =
                document.getElementById("resumeFile").files.length;

            if (!resume) {

                showToast(
                    "Please upload your resume.",
                    "error"
                );

                return false;

            }

        }


        if (step === 5) {

            const video =
                document.getElementById("demoVideo").files.length;

            if (!video) {

                showToast(
                    "Please upload your demo class video.",
                    "error"
                );

                return false;

            }

        }


        return true;

    }


    /* =================================================
       EMAIL VALIDATION
    ================================================= */

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =================================================
       PROGRESS
    ================================================= */

    function updateProgress() {

        const progress =
            Math.round(
                ((currentStep - 1) / 5) * 100
            );

        previewProgress.textContent =
            `${progress}%`;

        previewProgressBar.style.width =
            `${progress}%`;

    }


    /* =================================================
       FILE NAME DISPLAY
    ================================================= */

    const resumeFile =
        document.getElementById("resumeFile");

    const certificateFile =
        document.getElementById("certificateFile");

    const demoVideo =
        document.getElementById("demoVideo");

    const identityFile =
        document.getElementById("identityFile");


    resumeFile.addEventListener("change", () => {

        updateFileName(
            resumeFile,
            "resumeName"
        );

    });


    certificateFile.addEventListener("change", () => {

        updateFileName(
            certificateFile,
            "certificateName"
        );

    });


    demoVideo.addEventListener("change", () => {

        if (demoVideo.files.length > 0) {

            document.getElementById(
                "demoFileName"
            ).textContent =
                demoVideo.files[0].name;

        }

    });


    identityFile.addEventListener("change", () => {

        if (identityFile.files.length > 0) {

            showToast(
                "Identity document selected.",
                "success"
            );

        }

    });


    function updateFileName(input, targetId) {

        const target =
            document.getElementById(targetId);

        if (input.files.length > 0) {

            target.textContent =
                input.files[0].name;

        } else {

            target.textContent =
                "No file selected";

        }

    }


    /* =================================================
       GENERATE REVIEW
    ================================================= */

    function generateReview() {

        const fullName =
            document.getElementById("fullName").value || "Not provided";

        const email =
            document.getElementById("email").value || "Not provided";

        const mobile =
            document.getElementById("mobile").value || "Not provided";

        const city =
            document.getElementById("city").value || "Not provided";

        const qualification =
            document.getElementById("qualification").value || "Not provided";

        const experience =
            document.getElementById("experience").value || "Not provided";

        const subject =
            document.getElementById("subject").value || "Not provided";

        const level =
            document.getElementById("teachingLevel").value || "Not provided";

        const fee =
            document.getElementById("fee").value;

        const availability =
            document.getElementById("availability").value ||
            "Not provided";


        const modes =
            Array.from(
                document.querySelectorAll(
                    'input[name="mode"]:checked'
                )
            ).map(
                checkbox => checkbox.value
            ).join(", ");


        const resume =
            document.getElementById("resumeFile").files.length
                ? document.getElementById("resumeFile").files[0].name
                : "Not uploaded";


        const demo =
            document.getElementById("demoVideo").files.length
                ? document.getElementById("demoVideo").files[0].name
                : "Not uploaded";


        document.getElementById("reviewBox").innerHTML = `

            <div class="review-item">
                <span>Full Name</span>
                <strong>${escapeHTML(fullName)}</strong>
            </div>

            <div class="review-item">
                <span>Email</span>
                <strong>${escapeHTML(email)}</strong>
            </div>

            <div class="review-item">
                <span>Mobile</span>
                <strong>${escapeHTML(mobile)}</strong>
            </div>

            <div class="review-item">
                <span>City</span>
                <strong>${escapeHTML(city)}</strong>
            </div>

            <div class="review-item">
                <span>Qualification</span>
                <strong>${escapeHTML(qualification)}</strong>
            </div>

            <div class="review-item">
                <span>Experience</span>
                <strong>${escapeHTML(experience)}</strong>
            </div>

            <div class="review-item">
                <span>Subject</span>
                <strong>${escapeHTML(subject)}</strong>
            </div>

            <div class="review-item">
                <span>Teaching Level</span>
                <strong>${escapeHTML(level)}</strong>
            </div>

            <div class="review-item">
                <span>Teaching Mode</span>
                <strong>${escapeHTML(modes || "Not selected")}</strong>
            </div>

            <div class="review-item">
                <span>Expected Fee</span>
                <strong>
                    ${fee ? "₹" + escapeHTML(fee) + " / hour" : "Not provided"}
                </strong>
            </div>

            <div class="review-item">
                <span>Availability</span>
                <strong>${escapeHTML(availability)}</strong>
            </div>

            <div class="review-item">
                <span>Resume</span>
                <strong>${escapeHTML(resume)}</strong>
            </div>

            <div class="review-item full">
                <span>Demo Class</span>
                <strong>${escapeHTML(demo)}</strong>
            </div>

        `;

    }


    /* =================================================
       SUBMIT APPLICATION
    ================================================= */

    submitApplicationBtn.addEventListener(
        "click",
        submitApplication
    );


    function submitApplication() {

        if (!agreement.checked) {

            showToast(
                "Please accept the confirmation before submitting.",
                "error"
            );

            return;

        }


        generatedApplicationId =
            generateApplicationId();


        /*
         * Frontend demo storage.
         *
         * In the real application this data must be
         * sent to the PHP/MySQL backend.
         */

        const applicationData = {

            applicationId:
                generatedApplicationId,

            fullName:
                document.getElementById("fullName").value,

            email:
                document.getElementById("email").value,

            mobile:
                document.getElementById("mobile").value,

            city:
                document.getElementById("city").value,

            subject:
                document.getElementById("subject").value,

            level:
                document.getElementById("teachingLevel").value,

            status:
                "Under Review",

            submittedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "teacherApplication",
            JSON.stringify(applicationData)
        );


        applicationId.textContent =
            generatedApplicationId;


        document.querySelector(
            ".application-sidebar"
        ).style.display = "none";


        document.querySelector(
            ".section-heading"
        ).style.display = "none";


        document.querySelectorAll(
            ".form-step"
        ).forEach(step => {

            step.style.display = "none";

        });


        successScreen.classList.add("active");


        updatePreviewAfterSubmit();


        showToast(
            "Application submitted successfully!",
            "success"
        );

    }


    /* =================================================
       APPLICATION ID
    ================================================= */

    function generateApplicationId() {

        const random =
            Math.floor(
                100000 + Math.random() * 900000
            );

        return `TEA-${random}`;

    }


    /* =================================================
       COPY APPLICATION ID
    ================================================= */

    copyApplicationId.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    generatedApplicationId
                );

                showToast(
                    "Application ID copied.",
                    "success"
                );

            } catch {

                showToast(
                    "Unable to copy application ID.",
                    "error"
                );

            }

        }
    );


    /* =================================================
       VIEW APPLICATION
    ================================================= */

    viewApplicationBtn.addEventListener(
        "click",
        () => {

            openStatusModal();

            document.getElementById(
                "statusApplicationId"
            ).value =
                generatedApplicationId;

            searchApplicationStatus();

        }
    );


    /* =================================================
       STATUS MODAL
    ================================================= */

    checkStatusBtn.addEventListener(
        "click",
        openStatusModal
    );


    function openStatusModal() {

        statusModal.classList.add("active");

        statusResult.classList.remove("active");

    }


    closeStatusModal.addEventListener(
        "click",
        () => {

            statusModal.classList.remove("active");

        }
    );


    statusModal.addEventListener(
        "click",
        event => {

            if (event.target === statusModal) {

                statusModal.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =================================================
       SEARCH STATUS
    ================================================= */

    searchStatusBtn.addEventListener(
        "click",
        searchApplicationStatus
    );


    function searchApplicationStatus() {

        const enteredId =
            document
                .getElementById(
                    "statusApplicationId"
                )
                .value
                .trim()
                .toUpperCase();


        if (!enteredId) {

            showToast(
                "Please enter your application ID.",
                "error"
            );

            return;

        }


        const savedApplication =
            JSON.parse(
                localStorage.getItem(
                    "teacherApplication"
                )
            );


        if (
            savedApplication &&
            savedApplication.applicationId === enteredId
        ) {

            statusResult.classList.add(
                "active"
            );

            return;

        }


        showToast(
            "Application ID not found in this demo.",
            "error"
        );

    }


    /* =================================================
       UPDATE PREVIEW
    ================================================= */

    function updatePreviewAfterSubmit() {

        previewProgress.textContent = "100%";

        previewProgressBar.style.width = "100%";


        document
            .querySelectorAll(".step-icon")
            .forEach(icon => {

                icon.classList.add("completed");

            });

    }


    /* =================================================
       TOAST
    ================================================= */

    function showToast(message, type = "info") {

        const existingToast =
            document.querySelector(
                ".custom-toast"
            );

        if (existingToast) {

            existingToast.remove();

        }


        const toast =
            document.createElement("div");

        toast.className =
            `custom-toast toast-${type}`;


        let icon = "ph-info";

        if (type === "success") {
            icon = "ph-check-circle";
        }

        if (type === "error") {
            icon = "ph-warning-circle";
        }


        toast.innerHTML = `

            <i class="ph ${icon}"></i>

            <span>
                ${escapeHTML(message)}
            </span>

        `;


        Object.assign(
            toast.style,
            {

                position: "fixed",

                right: "20px",

                bottom: "20px",

                zIndex: "5000",

                display: "flex",

                alignItems: "center",

                gap: "9px",

                padding: "13px 17px",

                borderRadius: "10px",

                background: "#0f172a",

                color: "white",

                boxShadow:
                    "0 15px 40px rgba(0,0,0,.18)",

                fontSize: "12px",

                fontWeight: "600",

                animation:
                    "toastIn .3s ease"

            }

        );


        document.body.appendChild(toast);


        setTimeout(() => {

            toast.remove();

        }, 3200);

    }


    /* =================================================
       ESCAPE HTML
    ================================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =================================================
       MOBILE / KEYBOARD
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                statusModal.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =================================================
       INITIALIZE
    ================================================= */

    updateProgress();

});