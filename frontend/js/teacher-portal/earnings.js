/* =========================================
   TALENT HUNT
   TEACHER PORTAL - EARNINGS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const withdrawBtn =
        document.getElementById("withdrawBtn");

    const withdrawModal =
        document.getElementById("withdrawModal");

    const closeWithdraw =
        document.getElementById("closeWithdraw");

    const cancelWithdraw =
        document.getElementById("cancelWithdraw");

    const confirmWithdraw =
        document.getElementById("confirmWithdraw");

    const withdrawAmount =
        document.getElementById("withdrawAmount");

    const withdrawMethod =
        document.getElementById("withdrawMethod");

    const editPaymentBtn =
        document.getElementById("editPaymentBtn");

    const paymentModal =
        document.getElementById("paymentModal");

    const closePayment =
        document.getElementById("closePayment");

    const cancelPayment =
        document.getElementById("cancelPayment");

    const savePayment =
        document.getElementById("savePayment");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const viewAllBtn =
        document.getElementById("viewAllBtn");

    const yearFilter =
        document.getElementById("yearFilter");


    /* =========================================
       MODAL HELPERS
    ========================================= */

    function openModal(modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeModal(modal) {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    /* =========================================
       WITHDRAW MODAL
    ========================================= */

    withdrawBtn.addEventListener("click", () => {

        openModal(withdrawModal);

    });


    closeWithdraw.addEventListener("click", () => {

        closeModal(withdrawModal);

    });


    cancelWithdraw.addEventListener("click", () => {

        closeModal(withdrawModal);

    });


    /* =========================================
       WITHDRAW REQUEST
    ========================================= */

    confirmWithdraw.addEventListener("click", () => {

        const amount =
            Number(withdrawAmount.value);

        const availableBalance = 9300;


        if (!amount || amount <= 0) {

            alert(
                "Please enter a valid withdrawal amount."
            );

            return;

        }


        if (amount > availableBalance) {

            alert(
                "Withdrawal amount cannot exceed your available balance of ₹9,300."
            );

            return;

        }


        const method =
            withdrawMethod.value;


        alert(
            `Payment request submitted successfully!\n\n` +
            `Amount: ₹${amount.toLocaleString("en-IN")}\n` +
            `Method: ${method}\n\n` +
            `Your request will be processed after verification.`
        );


        withdrawAmount.value = "";

        closeModal(withdrawModal);

    });


    /* =========================================
       PAYMENT INFORMATION
    ========================================= */

    editPaymentBtn.addEventListener("click", () => {

        openModal(paymentModal);

    });


    closePayment.addEventListener("click", () => {

        closeModal(paymentModal);

    });


    cancelPayment.addEventListener("click", () => {

        closeModal(paymentModal);

    });


    savePayment.addEventListener("click", () => {

        const holder =
            document.getElementById("accountHolder").value.trim();

        const method =
            document.getElementById("paymentMethod").value;

        const details =
            document.getElementById("paymentDetails").value.trim();


        if (holder === "") {

            alert(
                "Please enter account holder name."
            );

            return;

        }


        if (details === "") {

            alert(
                "Please enter your account or UPI details."
            );

            return;

        }


        alert(
            "Payment information updated successfully."
        );


        closeModal(paymentModal);

    });


    /* =========================================
       CLOSE MODALS ON BACKDROP
    ========================================= */

    withdrawModal.addEventListener("click", (event) => {

        if (event.target === withdrawModal) {

            closeModal(withdrawModal);

        }

    });


    paymentModal.addEventListener("click", (event) => {

        if (event.target === paymentModal) {

            closeModal(paymentModal);

        }

    });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeModal(withdrawModal);

            closeModal(paymentModal);

        }

    });


    /* =========================================
       TRANSACTION VIEW ALL
    ========================================= */

    viewAllBtn.addEventListener("click", () => {

        alert(
            "Full transaction history will be available after backend integration."
        );

    });


    /* =========================================
       YEAR FILTER
    ========================================= */

    yearFilter.addEventListener("change", () => {

        const selectedYear =
            yearFilter.value;

        if (selectedYear === "2026") {

            alert(
                "Showing earnings overview for 2026."
            );

        } else {

            alert(
                "Showing earnings overview for 2025."
            );

        }

    });


    /* =========================================
       CHART INTERACTION
    ========================================= */

    const bars =
        document.querySelectorAll(".bar");


    bars.forEach((bar, index) => {

        bar.addEventListener("click", () => {

            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];


            const earnings = [
                5200,
                6800,
                7600,
                6400,
                8900,
                10100,
                8600,
                10900,
                12800,
                0,
                0,
                0
            ];


            if (earnings[index] === 0) {

                alert(
                    `${months[index]} 2026\n\nNo earnings data available yet.`
                );

                return;

            }


            alert(
                `${months[index]} 2026\n\n` +
                `Earnings: ₹${earnings[index].toLocaleString("en-IN")}`
            );

        });

    });


    /* =========================================
       NOTIFICATIONS
    ========================================= */

    notificationBtn.addEventListener("click", () => {

        alert(
            "You have 2 payment notifications."
        );

    });


    /* =========================================
       LOGOUT
    ========================================= */

    logoutBtn.addEventListener("click", (event) => {

        event.preventDefault();


        const confirmation =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmation) {

            alert(
                "Logout functionality will be connected later."
            );

        }

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    console.log(
        "Talent Hunt Teacher Earnings loaded successfully."
    );

});