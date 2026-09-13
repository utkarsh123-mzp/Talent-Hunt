/* =========================================================
   TALENTHUNT - RESUME ANALYZER
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


    const resumeInput =
        document.getElementById("resumeInput");

    const browseBtn =
        document.getElementById("browseBtn");

    const dropZone =
        document.getElementById("dropZone");

    const selectedFile =
        document.getElementById("selectedFile");

    const fileName =
        document.getElementById("fileName");

    const fileSize =
        document.getElementById("fileSize");

    const removeFile =
        document.getElementById("removeFile");

    const analyzeBtn =
        document.getElementById("analyzeBtn");

    const loadingCard =
        document.getElementById("loadingCard");

    const resultsSection =
        document.getElementById("resultsSection");

    const reanalyzeBtn =
        document.getElementById("reanalyzeBtn");

    const analyzeAgainBtn =
        document.getElementById("analyzeAgainBtn");


    let currentFile = null;


    /* =====================================================
       SIDEBAR
    ====================================================== */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (closeNotification) {

        closeNotification.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "show"
                );

            }
        );

    }


    document.addEventListener("click", (event) => {

        if (
            notificationPanel &&
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    });


    /* =====================================================
       BROWSE FILE
    ====================================================== */

    browseBtn.addEventListener(
        "click",
        () => {

            resumeInput.click();

        }
    );


    resumeInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (file) {

                validateAndSelectFile(file);

            }

        }
    );


    /* =====================================================
       FILE VALIDATION
    ====================================================== */

    function validateAndSelectFile(file) {

        const allowedTypes = [
            "pdf",
            "doc",
            "docx"
        ];

        const extension =
            file.name
                .split(".")
                .pop()
                .toLowerCase();


        if (!allowedTypes.includes(extension)) {

            alert(
                "Please upload a PDF, DOC or DOCX file."
            );

            resumeInput.value = "";

            return;
        }


        /* 5 MB */

        const maxSize =
            5 * 1024 * 1024;


        if (file.size > maxSize) {

            alert(
                "Resume size must be less than 5 MB."
            );

            resumeInput.value = "";

            return;
        }


        currentFile = file;

        displaySelectedFile(file);

    }


    /* =====================================================
       DISPLAY FILE
    ====================================================== */

    function displaySelectedFile(file) {

        fileName.textContent =
            file.name;

        fileSize.textContent =
            formatFileSize(file.size);

        selectedFile.classList.add(
            "show"
        );

        analyzeBtn.disabled = false;

    }


    /* =====================================================
       FILE SIZE
    ====================================================== */

    function formatFileSize(bytes) {

        if (bytes === 0) {

            return "0 Bytes";

        }


        const units = [
            "Bytes",
            "KB",
            "MB"
        ];


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(
                        1024,
                        index
                    )
                ).toFixed(2)
            )
            +
            " "
            +
            units[index]
        );

    }


    /* =====================================================
       REMOVE FILE
    ====================================================== */

    removeFile.addEventListener(
        "click",
        () => {

            resetFile();

        }
    );


    function resetFile() {

        currentFile = null;

        resumeInput.value = "";

        selectedFile.classList.remove(
            "show"
        );

        analyzeBtn.disabled = true;

        resultsSection.classList.remove(
            "show"
        );

    }


    /* =====================================================
       DRAG & DROP
    ====================================================== */

    [
        "dragenter",
        "dragover"
    ].forEach((eventName) => {

        dropZone.addEventListener(
            eventName,
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.add(
                    "dragover"
                );

            }
        );

    });


    [
        "dragleave",
        "drop"
    ].forEach((eventName) => {

        dropZone.addEventListener(
            eventName,
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.remove(
                    "dragover"
                );

            }
        );

    });


    dropZone.addEventListener(
        "drop",
        (event) => {

            const file =
                event.dataTransfer.files[0];

            if (file) {

                validateAndSelectFile(file);

            }

        }
    );


    /* =====================================================
       ANALYZE
    ====================================================== */

    analyzeBtn.addEventListener(
        "click",
        () => {

            if (!currentFile) {

                alert(
                    "Please upload your resume first."
                );

                return;
            }

            analyzeResume();

        }
    );


    /* =====================================================
       ANALYZE FUNCTION
    ====================================================== */

    function analyzeResume() {

        analyzeBtn.disabled = true;

        resultsSection.classList.remove(
            "show"
        );

        loadingCard.classList.add(
            "show"
        );


        loadingCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /*
         * Frontend demo analysis.
         *
         * Later this section can be connected
         * with backend / AI API.
         */

        setTimeout(() => {

            loadingCard.classList.remove(
                "show"
            );

            resultsSection.classList.add(
                "show"
            );

            analyzeBtn.disabled = false;


            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        }, 2200);

    }


    /* =====================================================
       RE-ANALYZE
    ====================================================== */

    reanalyzeBtn.addEventListener(
        "click",
        () => {

            if (!currentFile) {

                alert(
                    "Please upload your resume first."
                );

                return;
            }

            analyzeResume();

        }
    );


    /* =====================================================
       ANALYZE AGAIN
    ====================================================== */

    analyzeAgainBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


});