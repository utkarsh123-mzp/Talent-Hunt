/* =========================================
   TEACHER HIRING PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Teacher Hiring Page Loaded");


    /* =====================================
       APPLICATION DATA
    ====================================== */

    const hiringData = {

        applicationId: "TH-2026-00124",

        teacherName: "Teacher Applicant",

        subject: "Mathematics Teacher",

        teachingClasses: "Class 5 - 10",

        experience: "3+ Years",

        interviewStatus: "completed",

        hiringStatus: "pending"

    };


    /* =====================================
       GET ELEMENTS
    ====================================== */

    const statusText =
        document.getElementById("statusText");

    const statusPill =
        document.getElementById("statusPill");

    const hiringTitle =
        document.getElementById("hiringTitle");

    const statusMessage =
        document.getElementById("statusMessage");

    const reviewStatus =
        document.getElementById("reviewStatus");

    const finalDecision =
        document.getElementById("finalDecision");

    const progressPercent =
        document.getElementById("progressPercent");

    const applicationId =
        document.getElementById("applicationId");

    const teacherName =
        document.getElementById("teacherName");

    const teacherSubject =
        document.getElementById("teacherSubject");

    const teacherAvatar =
        document.getElementById("teacherAvatar");

    const actionTitle =
        document.getElementById("actionTitle");

    const actionDescription =
        document.getElementById("actionDescription");

    const continueBtn =
        document.getElementById("continueBtn");


    /* =====================================
       LOAD BASIC DATA
    ====================================== */

    function loadData() {

        applicationId.textContent =
            hiringData.applicationId;

        teacherName.textContent =
            hiringData.teacherName;

        teacherSubject.textContent =
            hiringData.subject;


        /*
         * Teacher name ka first letter
         */

        if (hiringData.teacherName) {

            teacherAvatar.textContent =
                hiringData.teacherName
                    .charAt(0)
                    .toUpperCase();

        }


        updateHiringStatus();

    }


    /* =====================================
       UPDATE HIRING STATUS
    ====================================== */

    function updateHiringStatus() {

        const status =
            hiringData.hiringStatus;


        /* =================================
           PENDING
        ================================== */

        if (status === "pending") {

            statusText.textContent =
                "Decision Pending";

            hiringTitle.textContent =
                "Final Review";

            reviewStatus.textContent =
                "In Progress";

            finalDecision.textContent =
                "Pending";

            progressPercent.textContent =
                "90%";


            statusPill.style.background =
                "#fff7e9";

            statusPill.style.color =
                "#a86c12";


            statusMessage.innerHTML = `

                <div class="message-icon">
                    ⏳
                </div>

                <div>

                    <h3>
                        Hiring Decision Pending
                    </h3>

                    <p>
                        Your interview has been completed.
                        Our hiring team is currently reviewing
                        your complete application.
                    </p>

                </div>

            `;


            actionTitle.textContent =
                "Please wait for the hiring decision";

            actionDescription.textContent =
                "You will be notified when the hiring team updates your application.";

            continueBtn.disabled = true;

        }


        /* =================================
           SELECTED
        ================================== */

        else if (status === "selected") {

            statusText.textContent =
                "Selected";

            hiringTitle.textContent =
                "Congratulations!";

            reviewStatus.textContent =
                "Completed";

            finalDecision.textContent =
                "✓ Selected";

            progressPercent.textContent =
                "100%";


            statusPill.style.background =
                "#edf9f3";

            statusPill.style.color =
                "#16865a";


            statusMessage.innerHTML = `

                <div
                    class="message-icon"
                    style="
                        background:#dff6ea;
                    "
                >
                    🎉
                </div>

                <div>

                    <h3>
                        Congratulations! You are Selected
                    </h3>

                    <p>
                        You have successfully cleared the
                        teacher hiring process. You can now
                        continue to the onboarding stage.
                    </p>

                </div>

            `;


            actionTitle.textContent =
                "Complete your onboarding";

            actionDescription.textContent =
                "Continue to complete the required onboarding process.";

            continueBtn.disabled = false;

            continueBtn.textContent =
                "Start Onboarding";

        }


        /* =================================
           REJECTED
        ================================== */

        else if (status === "rejected") {

            statusText.textContent =
                "Application Update";

            hiringTitle.textContent =
                "Selection Not Proceeding";

            reviewStatus.textContent =
                "Completed";

            finalDecision.textContent =
                "Not Selected";

            progressPercent.textContent =
                "90%";


            statusPill.style.background =
                "#fff0f0";

            statusPill.style.color =
                "#c94a4a";


            statusMessage.innerHTML = `

                <div
                    class="message-icon"
                    style="
                        background:#ffe1e1;
                    "
                >
                    ℹ️
                </div>

                <div>

                    <h3>
                        Thank You for Applying
                    </h3>

                    <p>
                        Thank you for your interest in Talent Hunt.
                        Your application was not selected at this
                        stage.
                    </p>

                </div>

            `;


            actionTitle.textContent =
                "Application process completed";

            actionDescription.textContent =
                "You may apply again when new teaching opportunities become available.";

            continueBtn.disabled = true;

        }

    }


    /* =====================================
       CONTINUE BUTTON
    ====================================== */

    continueBtn.addEventListener(
        "click",
        function () {

            if (
                hiringData.hiringStatus ===
                "selected"
            ) {

                /*
                 * Future:
                 * onboarding.html
                 */

                showNotification(
                    "Onboarding module will open here."
                );

            }

        }
    );


    /* =====================================
       LOGOUT
    ====================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                localStorage.removeItem(
                    "teacherSession"
                );


                /*
                 * Apne actual login path ke
                 * according change kar sakte ho.
                 */

                window.location.href =
                    "../auth/login.html";

            }

        }
    );


    /* =====================================
       NOTIFICATION
    ====================================== */

    function showNotification(message) {

        const notification =
            document.createElement("div");


        notification.textContent =
            message;


        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.right =
            "25px";

        notification.style.background =
            "#17172b";

        notification.style.color =
            "white";

        notification.style.padding =
            "13px 18px";

        notification.style.borderRadius =
            "10px";

        notification.style.fontSize =
            "12px";

        notification.style.fontWeight =
            "600";

        notification.style.zIndex =
            "9999";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.2)";


        document.body.appendChild(
            notification
        );


        setTimeout(function () {

            notification.style.opacity =
                "0";

            notification.style.transition =
                "0.3s";


            setTimeout(function () {

                notification.remove();

            }, 300);

        }, 2500);

    }


    /* =====================================
       INITIALIZE
    ====================================== */

    loadData();

});