/* =====================================================
   REPORTS
   Talent Hunt Admin Portal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= DATA ================= */

    const reportData = {

        all: {
            applications: 128,
            verified: 96,
            hired: 32,
            active: 24
        },

        month: {
            applications: 38,
            verified: 29,
            hired: 9,
            active: 24
        },

        quarter: {
            applications: 87,
            verified: 65,
            hired: 21,
            active: 24
        },

        year: {
            applications: 128,
            verified: 96,
            hired: 32,
            active: 24
        }

    };


    /* ================= ELEMENTS ================= */

    const periodFilter =
        document.getElementById("periodFilter");

    const applicationCount =
        document.getElementById("applicationCount");

    const verifiedCount =
        document.getElementById("verifiedCount");

    const hiredCount =
        document.getElementById("hiredCount");

    const activeTeacherCount =
        document.getElementById("activeTeacherCount");

    const exportReportBtn =
        document.getElementById("exportReportBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const profileBtn =
        document.getElementById("profileBtn");

    const helpBox =
        document.getElementById("helpBox");


    /* ================= FILTER ================= */

    periodFilter.addEventListener(
        "change",
        () => {

            const selectedPeriod =
                periodFilter.value;

            const data =
                reportData[selectedPeriod];


            if (!data) {
                return;
            }


            animateNumber(
                applicationCount,
                data.applications
            );

            animateNumber(
                verifiedCount,
                data.verified
            );

            animateNumber(
                hiredCount,
                data.hired
            );

            animateNumber(
                activeTeacherCount,
                data.active
            );


            showToast(
                `Report updated for ${getPeriodName(selectedPeriod)}.`
            );

        }
    );


    /* ================= NUMBER ANIMATION ================= */

    function animateNumber(element, target) {

        const duration = 400;

        const start = Number(
            element.textContent
        ) || 0;

        const difference =
            target - start;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const value =
                Math.round(
                    start +
                    difference * progress
                );


            element.textContent =
                value;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(update);

    }


    /* ================= EXPORT REPORT ================= */

    exportReportBtn.addEventListener(
        "click",
        () => {

            const period =
                periodFilter.value;


            const data =
                reportData[period];


            if (!data) {
                return;
            }


            const reportRows = [

                [
                    "Metric",
                    "Value"
                ],

                [
                    "Total Applications",
                    data.applications
                ],

                [
                    "Verified Teachers",
                    data.verified
                ],

                [
                    "Hired Teachers",
                    data.hired
                ],

                [
                    "Active Teachers",
                    data.active
                ],

                [
                    "Hiring Conversion Rate",
                    `${calculateRate(
                        data.hired,
                        data.applications
                    )}%`
                ],

                [
                    "Verification Success Rate",
                    `${calculateRate(
                        data.verified,
                        data.applications
                    )}%`
                ]

            ];


            const csv =
                reportRows
                    .map(row =>
                        row.join(",")
                    )
                    .join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                `talent-hunt-report-${period}.csv`;


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);


            URL.revokeObjectURL(url);


            showToast(
                "Report exported successfully."
            );

        }
    );


    /* ================= LOGOUT ================= */

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) {
                return;
            }


            window.location.href =
                "../auth/login.html";

        }
    );


    /* ================= PROFILE ================= */

    profileBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Admin profile menu."
            );

        }
    );


    /* ================= HELP ================= */

    helpBox.addEventListener(
        "click",
        () => {

            showToast(
                "Support center opened."
            );

        }
    );


    /* ================= HELPERS ================= */

    function calculateRate(
        value,
        total
    ) {

        if (!total) {
            return 0;
        }


        return Math.round(
            (value / total) * 100
        );

    }


    function getPeriodName(period) {

        const names = {

            all: "All Time",

            month: "This Month",

            quarter: "This Quarter",

            year: "This Year"

        };


        return names[period] || "All Time";

    }


    function showToast(message) {

        const existingToast =
            document.querySelector(
                ".toast-message"
            );


        if (existingToast) {
            existingToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "toast-message";


        toast.textContent =
            message;


        Object.assign(
            toast.style,
            {

                position: "fixed",

                right: "25px",

                bottom: "25px",

                padding: "13px 18px",

                background: "#111827",

                color: "#ffffff",

                borderRadius: "8px",

                fontSize: "13px",

                zIndex: "9999",

                boxShadow:
                    "0 8px 25px rgba(0,0,0,.15)"

            }
        );


        document.body.appendChild(toast);


        setTimeout(
            () => {

                toast.remove();

            },
            2500
        );

    }

});