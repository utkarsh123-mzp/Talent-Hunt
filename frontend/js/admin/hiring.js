/* =========================================================
   TALENT HUNT ADMIN - HIRING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const subjectFilter = document.getElementById("subjectFilter");
    const statusFilter = document.getElementById("statusFilter");

    const tableBody = document.getElementById("candidateTable");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    const candidateCount = document.getElementById("candidateCount");
    const emptyState = document.getElementById("emptyState");

    const offerModal = document.getElementById("offerModal");
    const selectedTeacher = document.getElementById("selectedTeacher");

    const closeModal = document.getElementById("closeModal");
    const cancelOffer = document.getElementById("cancelOffer");
    const confirmOffer = document.getElementById("confirmOffer");

    const salaryInput = document.getElementById("salary");
    const joiningDateInput = document.getElementById("joiningDate");

    const refreshBtn = document.getElementById("refreshBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    let selectedCandidate = null;
    let toastTimer = null;


    /* =====================================================
       SEARCH + FILTER
       ===================================================== */

    function filterCandidates() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const subjectValue = subjectFilter.value;
        const statusValue = statusFilter.value;

        let visibleCount = 0;

        rows.forEach(row => {

            const name = row.dataset.name.toLowerCase();
            const subject = row.dataset.subject;
            const status = row.dataset.status;

            const matchesSearch =
                name.includes(searchValue) ||
                subject.toLowerCase().includes(searchValue);

            const matchesSubject =
                subjectValue === "all" ||
                subject === subjectValue;

            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;

            const visible =
                matchesSearch &&
                matchesSubject &&
                matchesStatus;

            row.style.display = visible ? "" : "none";

            if (visible) {
                visibleCount++;
            }

        });

        candidateCount.textContent =
            `${visibleCount} Candidate${visibleCount !== 1 ? "s" : ""}`;

        emptyState.classList.toggle(
            "show",
            visibleCount === 0
        );
    }


    searchInput.addEventListener("input", filterCandidates);
    subjectFilter.addEventListener("change", filterCandidates);
    statusFilter.addEventListener("change", filterCandidates);


    /* =====================================================
       OPEN OFFER MODAL
       ===================================================== */

    function openOfferModal(name) {

        selectedCandidate = name;

        selectedTeacher.textContent = name;

        salaryInput.value = "";
        joiningDateInput.value = "";

        offerModal.classList.add("show");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            salaryInput.focus();
        }, 100);
    }


    /* =====================================================
       CLOSE OFFER MODAL
       ===================================================== */

    function closeOfferModal() {

        offerModal.classList.remove("show");

        document.body.style.overflow = "";

        selectedCandidate = null;
    }


    /* =====================================================
       OFFER BUTTONS
       ===================================================== */

    document.querySelectorAll(".offer-btn").forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;

            openOfferModal(name);
        });

    });


    /* =====================================================
       VIEW BUTTONS
       ===================================================== */

    document.querySelectorAll(".view-btn").forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;

            showToast(
                `Opening profile of ${name}.`
            );
        });

    });


    /* =====================================================
       CONFIRM OFFER
       ===================================================== */

    confirmOffer.addEventListener("click", () => {

        const salary = salaryInput.value.trim();
        const joiningDate = joiningDateInput.value;

        if (!salary) {

            showToast(
                "Please enter the monthly salary."
            );

            salaryInput.focus();

            return;
        }

        if (!joiningDate) {

            showToast(
                "Please select a joining date."
            );

            joiningDateInput.focus();

            return;
        }


        const row = rows.find(
            item => item.dataset.name === selectedCandidate
        );

        if (row) {

            row.dataset.status = "offer-sent";

            const statusElement =
                row.querySelector(".status");

            statusElement.textContent = "Offer Sent";

            statusElement.className =
                "status sent";


            const actionButton =
                row.querySelector(".action-btn");

            if (actionButton) {

                actionButton.textContent = "View";

                actionButton.classList.remove(
                    "offer-btn"
                );

                actionButton.classList.add(
                    "view-btn"
                );

                actionButton.dataset.name =
                    selectedCandidate;

                actionButton.replaceWith(
                    actionButton.cloneNode(true)
                );

                const newButton =
                    row.querySelector(".view-btn");

                newButton.addEventListener(
                    "click",
                    () => {
                        showToast(
                            `Opening profile of ${selectedCandidate}.`
                        );
                    }
                );
            }
        }


        closeOfferModal();

        showToast(
            `Hiring offer sent to ${selectedCandidate}.`
        );

    });


    /* =====================================================
       MODAL EVENTS
       ===================================================== */

    closeModal.addEventListener(
        "click",
        closeOfferModal
    );

    cancelOffer.addEventListener(
        "click",
        closeOfferModal
    );


    offerModal.addEventListener("click", event => {

        if (event.target === offerModal) {
            closeOfferModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (offerModal.classList.contains("show")) {
                closeOfferModal();
            }

        }

    });


    /* =====================================================
       REFRESH
       ===================================================== */

    refreshBtn.addEventListener("click", () => {

        searchInput.value = "";
        subjectFilter.value = "all";
        statusFilter.value = "all";

        filterCandidates();

        showToast(
            "Hiring data refreshed successfully."
        );

    });


    /* =====================================================
       LOGOUT
       ===================================================== */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmLogout) {
            return;
        }

        showToast("Logging out...");

        setTimeout(() => {

            window.location.href =
                "../auth/login.html";

        }, 800);

    });


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    filterCandidates();

});