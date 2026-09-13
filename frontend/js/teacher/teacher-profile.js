/* =========================================
   TEACHER PROFILE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("teacherProfileForm");

    const saveDraftBtn = document.getElementById("saveDraftBtn");

    const progressPercent =
        document.getElementById("progressPercent");

    const resumeInput =
        document.getElementById("resume");

    const certificateInput =
        document.getElementById("certificate");

    const resumeName =
        document.getElementById("resumeName");

    const certificateName =
        document.getElementById("certificateName");

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const closeToast =
        document.getElementById("closeToast");


    /* =========================================
       TOAST FUNCTION
    ========================================= */

    function showToast(title, message) {

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }


    closeToast.addEventListener("click", () => {
        toast.classList.remove("show");
    });


    /* =========================================
       FILE NAME
    ========================================= */

    resumeInput.addEventListener("change", () => {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            resumeName.textContent = file.name;

            updateProgress();
        }

    });


    certificateInput.addEventListener("change", () => {

        if (certificateInput.files.length > 0) {

            const file = certificateInput.files[0];

            certificateName.textContent = file.name;

            updateProgress();
        }

    });


    /* =========================================
       FILE SIZE VALIDATION
    ========================================= */

    function validateFile(file) {

        if (!file) {
            return true;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            showToast(
                "File Too Large",
                "Please upload a file smaller than 5 MB."
            );

            return false;
        }

        return true;
    }


    resumeInput.addEventListener("change", () => {

        if (!validateFile(resumeInput.files[0])) {

            resumeInput.value = "";

            resumeName.textContent = "PDF, DOC or DOCX";
        }

    });


    certificateInput.addEventListener("change", () => {

        if (!validateFile(certificateInput.files[0])) {

            certificateInput.value = "";

            certificateName.textContent = "PDF, JPG or PNG";
        }

    });


    /* =========================================
       PROGRESS CALCULATION
    ========================================= */

    function updateProgress() {

        let completed = 0;

        let total = 0;


        // Required text/select fields

        const requiredFields = form.querySelectorAll(
            "input[required], select[required]"
        );


        requiredFields.forEach(field => {

            // Checkbox handled separately
            if (
                field.type === "checkbox" ||
                field.type === "file"
            ) {
                return;
            }

            total++;

            if (field.value.trim() !== "") {
                completed++;
            }

        });


        // Subject selection

        total++;

        const subjects =
            document.querySelectorAll(
                'input[name="subjects"]:checked'
            );

        if (subjects.length > 0) {
            completed++;
        }


        // Classes selection

        total++;

        const classes =
            document.querySelectorAll(
                'input[name="classes"]:checked'
            );

        if (classes.length > 0) {
            completed++;
        }


        // Resume

        total++;

        if (resumeInput.files.length > 0) {
            completed++;
        }


        // Certificate is optional
        // so it is not included in required progress


        // Agreement

        total++;

        const agreement =
            document.getElementById("agreement");

        if (agreement.checked) {
            completed++;
        }


        const percentage =
            Math.round((completed / total) * 100);


        progressPercent.textContent =
            `${percentage}%`;
    }


    /* =========================================
       WATCH FORM CHANGES
    ========================================= */

    form.addEventListener("input", updateProgress);

    form.addEventListener("change", updateProgress);


    /* =========================================
       SAVE PROFILE DATA
    ========================================= */

    function getProfileData() {

        const selectedSubjects =
            Array.from(
                document.querySelectorAll(
                    'input[name="subjects"]:checked'
                )
            ).map(item => item.value);


        const selectedClasses =
            Array.from(
                document.querySelectorAll(
                    'input[name="classes"]:checked'
                )
            ).map(item => item.value);


        return {

            fullName:
                document.getElementById("fullName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            city:
                document.getElementById("city").value,

            highestQualification:
                document.getElementById(
                    "highestQualification"
                ).value,

            specialization:
                document.getElementById(
                    "specialization"
                ).value,

            experience:
                document.getElementById(
                    "experience"
                ).value,

            teachingType:
                document.getElementById(
                    "teachingType"
                ).value,

            subjects: selectedSubjects,

            classes: selectedClasses,

            teachingBio:
                document.getElementById(
                    "teachingBio"
                ).value,

            availability:
                document.getElementById(
                    "availability"
                ).value,

            hours:
                document.getElementById(
                    "hours"
                ).value,

            price:
                document.getElementById(
                    "price"
                ).value,

            location:
                document.getElementById(
                    "location"
                ).value,

            resume:
                resumeInput.files.length > 0
                    ? resumeInput.files[0].name
                    : "",

            certificate:
                certificateInput.files.length > 0
                    ? certificateInput.files[0].name
                    : "",

            lastUpdated:
                new Date().toISOString()
        };
    }


    /* =========================================
       SAVE DRAFT
    ========================================= */

    saveDraftBtn.addEventListener("click", () => {

        const profileData = getProfileData();

        localStorage.setItem(
            "teacherProfileDraft",
            JSON.stringify(profileData)
        );

        showToast(
            "Draft Saved",
            "Your teacher profile has been saved locally."
        );

    });


    /* =========================================
       LOAD DRAFT
    ========================================= */

    function loadDraft() {

        const savedData =
            localStorage.getItem(
                "teacherProfileDraft"
            );

        if (!savedData) {
            return;
        }

        try {

            const data =
                JSON.parse(savedData);


            if (data.fullName)
                document.getElementById("fullName").value =
                    data.fullName;

            if (data.email)
                document.getElementById("email").value =
                    data.email;

            if (data.phone)
                document.getElementById("phone").value =
                    data.phone;

            if (data.city)
                document.getElementById("city").value =
                    data.city;

            if (data.highestQualification)
                document.getElementById(
                    "highestQualification"
                ).value =
                    data.highestQualification;

            if (data.specialization)
                document.getElementById(
                    "specialization"
                ).value =
                    data.specialization;

            if (data.experience)
                document.getElementById("experience").value =
                    data.experience;

            if (data.teachingType)
                document.getElementById(
                    "teachingType"
                ).value =
                    data.teachingType;

            if (data.teachingBio)
                document.getElementById(
                    "teachingBio"
                ).value =
                    data.teachingBio;

            if (data.availability)
                document.getElementById(
                    "availability"
                ).value =
                    data.availability;

            if (data.hours)
                document.getElementById("hours").value =
                    data.hours;

            if (data.price)
                document.getElementById("price").value =
                    data.price;

            if (data.location)
                document.getElementById("location").value =
                    data.location;


            // Subjects

            if (Array.isArray(data.subjects)) {

                data.subjects.forEach(subject => {

                    const checkbox =
                        document.querySelector(
                            `input[name="subjects"][value="${subject}"]`
                        );

                    if (checkbox) {
                        checkbox.checked = true;
                    }

                });

            }


            // Classes

            if (Array.isArray(data.classes)) {

                data.classes.forEach(classValue => {

                    const checkbox =
                        document.querySelector(
                            `input[name="classes"][value="${classValue}"]`
                        );

                    if (checkbox) {
                        checkbox.checked = true;
                    }

                });

            }


            updateProgress();

            showToast(
                "Draft Restored",
                "Your previously saved information has been loaded."
            );

        } catch (error) {

            console.error(
                "Unable to load teacher profile:",
                error
            );

        }

    }


    /* =========================================
       PHONE NUMBER
    ========================================= */

    const phoneInput =
        document.getElementById("phone");

    phoneInput.addEventListener("input", () => {

        phoneInput.value =
            phoneInput.value.replace(/\D/g, "");

    });


    /* =========================================
       FORM SUBMIT
    ========================================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const subjects =
            document.querySelectorAll(
                'input[name="subjects"]:checked'
            );

        const classes =
            document.querySelectorAll(
                'input[name="classes"]:checked'
            );


        if (subjects.length === 0) {

            showToast(
                "Subject Required",
                "Please select at least one subject."
            );

            return;
        }


        if (classes.length === 0) {

            showToast(
                "Class Required",
                "Please select at least one class."
            );

            return;
        }


        if (!resumeInput.files.length) {

            showToast(
                "Resume Required",
                "Please upload your resume."
            );

            return;
        }


        if (!document.getElementById("agreement").checked) {

            showToast(
                "Confirmation Required",
                "Please confirm the information provided."
            );

            return;
        }


        const profileData = getProfileData();


        /*
         * Frontend prototype:
         * Save application data locally.
         *
         * Later this will be replaced with
         * backend/API/database integration.
         */

        localStorage.setItem(
            "teacherProfile",
            JSON.stringify(profileData)
        );


        localStorage.setItem(
            "teacherApplicationStatus",
            "profile-completed"
        );


        showToast(
            "Profile Completed",
            "Your profile is ready for the Demo Class step."
        );


        /*
         * Demo Class page will be connected
         * after we create that module.
         */

        setTimeout(() => {

            // Future page:
            // window.location.href =
            // "demo.html";

        }, 1800);

    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadDraft();

    updateProgress();

});