/* =========================================
   TEACHER INTERVIEW PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Teacher Interview Page Loaded");


    /* =====================================
       APPLICATION DATA
    ====================================== */

    const interviewData = {

        applicationId: "TH-2026-00124",

        subject: "Mathematics",

        teachingLevel: "Class 5 - 10",

        experience: "3+ Years",

        status: "pending",

        interview: {

            type: "Online Interview",

            date: null,

            time: null,

            mode: "Video Call",

            meetingLink: null

        }

    };


    /* =====================================
       ELEMENTS
    ====================================== */

    const statusText =
        document.getElementById("statusText");

    const applicationStatus =
        document.getElementById("applicationStatus");

    const interviewTitle =
        document.getElementById("interviewTitle");

    const interviewMessage =
        document.getElementById("interviewMessage");

    const interviewType =
        document.getElementById("interviewType");

    const interviewDate =
        document.getElementById("interviewDate");

    const interviewTime =
        document.getElementById("interviewTime");

    const interviewMode =
        document.getElementById("interviewMode");

    const joinInterviewBtn =
        document.getElementById("joinInterviewBtn");

    const applicationId =
        document.getElementById("applicationId");

    const subject =
        document.getElementById("subject");

    const teachingLevel =
        document.getElementById("teachingLevel");

    const experience =
        document.getElementById("experience");

    const progressPercent =
        document.getElementById("progressPercent");


    /* =====================================
       LOAD APPLICATION DATA
    ====================================== */

    function loadApplicationData() {

        applicationId.textContent =
            interviewData.applicationId;

        subject.textContent =
            interviewData.subject;

        teachingLevel.textContent =
            interviewData.teachingLevel;

        experience.textContent =
            interviewData.experience;

        interviewType.textContent =
            interviewData.interview.type;

        interviewMode.textContent =
            interviewData.interview.mode;

        updateInterviewStatus();

    }


    /* =====================================
       UPDATE INTERVIEW STATUS
    ====================================== */

    function updateInterviewStatus() {

        if (interviewData.status === "pending") {

            statusText.textContent =
                "Interview Pending";

            interviewTitle.textContent =
                "Interview Not Scheduled";

            interviewMessage.textContent =
                "Your demo class has been received successfully. " +
                "The Talent Hunt team will review your application " +
                "and schedule your interview.";

            interviewDate.textContent =
                "To be announced";

            interviewTime.textContent =
                "To be announced";

            joinInterviewBtn.disabled = true;

            applicationStatus.style.background =
                "#fff7e9";

            applicationStatus.style.color =
                "#b57413";

            progressPercent.textContent =
                "75%";

        }


        else if (interviewData.status === "scheduled") {

            statusText.textContent =
                "Interview Scheduled";

            interviewTitle.textContent =
                "Your Interview is Scheduled";

            interviewMessage.textContent =
                "Your interview has been scheduled. " +
                "Please join on time and keep your documents ready.";

            interviewDate.textContent =
                interviewData.interview.date;

            interviewTime.textContent =
                interviewData.interview.time;

            joinInterviewBtn.disabled = false;

            applicationStatus.style.background =
                "#edf9f3";

            applicationStatus.style.color =
                "#16865a";

            progressPercent.textContent =
                "85%";

        }


        else if (interviewData.status === "completed") {

            statusText.textContent =
                "Interview Completed";

            interviewTitle.textContent =
                "Interview Completed";

            interviewMessage.textContent =
                "Your interview has been completed. " +
                "The hiring team will review your performance " +
                "and update your application status.";

            joinInterviewBtn.disabled = true;

            applicationStatus.style.background =
                "#edf9f3";

            applicationStatus.style.color =
                "#16865a";

            progressPercent.textContent =
                "90%";

        }


        else if (interviewData.status === "selected") {

            statusText.textContent =
                "Selected";

            interviewTitle.textContent =
                "Congratulations!";

            interviewMessage.textContent =
                "You have successfully cleared the interview stage. " +
                "Your hiring process will now move to the final stage.";

            joinInterviewBtn.disabled = true;

            applicationStatus.style.background =
                "#edf9f3";

            applicationStatus.style.color =
                "#16865a";

            progressPercent.textContent =
                "100%";

        }


        else if (interviewData.status === "rejected") {

            statusText.textContent =
                "Application Update";

            interviewTitle.textContent =
                "Interview Process Completed";

            interviewMessage.textContent =
                "Thank you for your interest in Talent Hunt. " +
                "Your application was not selected at this stage.";

            joinInterviewBtn.disabled = true;

            applicationStatus.style.background =
                "#fff0f0";

            applicationStatus.style.color =
                "#c94a4a";

            progressPercent.textContent =
                "90%";

        }

    }


    /* =====================================
       JOIN INTERVIEW
    ====================================== */

    joinInterviewBtn.addEventListener(
        "click",
        function () {

            if (
                interviewData.interview.meetingLink
            ) {

                window.open(
                    interviewData.interview.meetingLink,
                    "_blank"
                );

            } else {

                showNotification(
                    "Interview meeting link is not available yet."
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
            "#ffffff";

        notification.style.padding =
            "13px 18px";

        notification.style.borderRadius =
            "10px";

        notification.style.fontSize =
            "13px";

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

    loadApplicationData();

});