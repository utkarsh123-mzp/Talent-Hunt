/* =========================================
   DEMO CLASS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const demoForm = document.getElementById("demoForm");

    const videoInput = document.getElementById("demoVideo");

    const uploadBox = document.getElementById("uploadBox");

    const selectedFile = document.getElementById("selectedFile");

    const fileName = document.getElementById("fileName");

    const fileSize = document.getElementById("fileSize");

    const removeFile = document.getElementById("removeFile");

    const description = document.getElementById("description");

    const charCount = document.getElementById("charCount");

    const saveDraft = document.getElementById("saveDraft");

    const toast = document.getElementById("toast");


    /* =========================================
       TOAST
    ========================================= */

    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    /* =========================================
       VIDEO UPLOAD
    ========================================= */

    videoInput.addEventListener("change", () => {

        const file = videoInput.files[0];

        if (!file) {
            return;
        }

        handleVideo(file);
    });


    function handleVideo(file) {

        const allowedTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime"
        ];

        const maxSize = 100 * 1024 * 1024;


        /* File type validation */

        if (!allowedTypes.includes(file.type)) {

            showToast(
                "Please upload MP4, MOV or WEBM video."
            );

            videoInput.value = "";

            return;
        }


        /* File size validation */

        if (file.size > maxSize) {

            showToast(
                "Video size must be less than 100 MB."
            );

            videoInput.value = "";

            return;
        }


        /* Display file */

        fileName.textContent = file.name;

        fileSize.textContent = formatFileSize(file.size);

        selectedFile.hidden = false;

        uploadBox.style.display = "none";

        showToast("Demo video selected successfully.");
    }


    /* =========================================
       FILE SIZE
    ========================================= */

    function formatFileSize(bytes) {

        if (bytes < 1024 * 1024) {

            return (
                (bytes / 1024).toFixed(1) +
                " KB"
            );
        }

        return (
            (bytes / (1024 * 1024)).toFixed(1) +
            " MB"
        );
    }


    /* =========================================
       REMOVE VIDEO
    ========================================= */

    removeFile.addEventListener("click", () => {

        videoInput.value = "";

        selectedFile.hidden = true;

        uploadBox.style.display = "flex";

        showToast("Demo video removed.");
    });


    /* =========================================
       DRAG & DROP
    ========================================= */

    uploadBox.addEventListener("dragover", (event) => {

        event.preventDefault();

        uploadBox.classList.add("dragover");
    });


    uploadBox.addEventListener("dragleave", () => {

        uploadBox.classList.remove("dragover");
    });


    uploadBox.addEventListener("drop", (event) => {

        event.preventDefault();

        uploadBox.classList.remove("dragover");

        const file = event.dataTransfer.files[0];

        if (!file) {
            return;
        }

        /*
         * Browser security does not allow directly
         * assigning a dropped file in every environment,
         * so we validate and display it here.
         */

        handleVideo(file);
    });


    /* =========================================
       CHARACTER COUNTER
    ========================================= */

    description.addEventListener("input", () => {

        charCount.textContent =
            description.value.length;
    });


    /* =========================================
       SAVE DRAFT
    ========================================= */

    saveDraft.addEventListener("click", () => {

        const draftData = {

            subject:
                document.getElementById("subject").value,

            classLevel:
                document.getElementById("classLevel").value,

            topic:
                document.getElementById("topic").value,

            mode:
                document.querySelector(
                    'input[name="mode"]:checked'
                )?.value || "",

            description:
                description.value,

            savedAt:
                new Date().toISOString()
        };


        localStorage.setItem(
            "teacherDemoDraft",
            JSON.stringify(draftData)
        );


        showToast(
            "Demo application saved as draft."
        );
    });


    /* =========================================
       LOAD DRAFT
    ========================================= */

    const savedDraft =
        localStorage.getItem("teacherDemoDraft");


    if (savedDraft) {

        try {

            const data =
                JSON.parse(savedDraft);


            if (data.subject) {

                document.getElementById(
                    "subject"
                ).value = data.subject;
            }


            if (data.classLevel) {

                document.getElementById(
                    "classLevel"
                ).value = data.classLevel;
            }


            if (data.topic) {

                document.getElementById(
                    "topic"
                ).value = data.topic;
            }


            if (data.mode) {

                const modeRadio =
                    document.querySelector(
                        `input[name="mode"][value="${data.mode}"]`
                    );

                if (modeRadio) {
                    modeRadio.checked = true;
                }
            }


            if (data.description) {

                description.value =
                    data.description;

                charCount.textContent =
                    data.description.length;
            }

        } catch (error) {

            console.log(
                "Could not load saved draft."
            );
        }
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    demoForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const subject =
            document.getElementById("subject").value;

        const classLevel =
            document.getElementById("classLevel").value;

        const topic =
            document.getElementById("topic").value;

        const mode =
            document.querySelector(
                'input[name="mode"]:checked'
            );


        /* Required validation */

        if (!subject) {

            showToast(
                "Please select a subject."
            );

            return;
        }


        if (!classLevel) {

            showToast(
                "Please select your class level."
            );

            return;
        }


        if (!topic.trim()) {

            showToast(
                "Please enter your demo topic."
            );

            return;
        }


        if (!mode) {

            showToast(
                "Please select a teaching mode."
            );

            return;
        }


        if (!videoInput.files.length) {

            showToast(
                "Please upload your demo class video."
            );

            return;
        }


        const confirmation =
            document.getElementById("confirmation");


        if (!confirmation.checked) {

            showToast(
                "Please confirm the information."
            );

            return;
        }


        /* =====================================
           DEMO APPLICATION OBJECT
        ===================================== */

        const demoApplication = {

            applicationType:
                "Teacher Demo Class",

            subject:
                subject,

            classLevel:
                classLevel,

            topic:
                topic,

            teachingMode:
                mode.value,

            description:
                description.value,

            videoName:
                videoInput.files[0].name,

            status:
                "Submitted",

            submittedAt:
                new Date().toISOString()
        };


        /*
         * Temporary frontend storage.
         *
         * Later this data will be sent to backend
         * and stored in database for admin review.
         */

        localStorage.setItem(
            "teacherDemoApplication",
            JSON.stringify(demoApplication)
        );


        /* Remove draft */

        localStorage.removeItem(
            "teacherDemoDraft"
        );


        showToast(
            "Demo class submitted successfully!"
        );


        /* Button state */

        const submitButton =
            demoForm.querySelector(
                ".submit-btn"
            );

        submitButton.textContent =
            "Demo Submitted ✓";

        submitButton.disabled = true;


        submitButton.style.opacity = "0.7";
        submitButton.style.cursor = "not-allowed";

    });

});