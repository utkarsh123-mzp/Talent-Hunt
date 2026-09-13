/* =========================================
   TALENT HUNT - DEMO REVIEWS
   Admin Panel
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       DEMO REVIEW DATA
    ========================================= */

    let reviews = [
        {
            id: 1,
            name: "Ankit Sharma",
            subject: "Mathematics",
            topic: "Quadratic Equations",
            duration: "28 min",
            experience: "5 Years",
            date: "08 Sep 2026",
            status: "pending",
            teaching: 4.5,
            communication: 4.2,
            knowledge: 4.8,
            overall: 4.5,
            feedback: "Strong subject knowledge and good explanation style. Needs slightly better time management during the demo."
        },

        {
            id: 2,
            name: "Priya Singh",
            subject: "Science",
            topic: "Human Digestive System",
            duration: "30 min",
            experience: "4 Years",
            date: "07 Sep 2026",
            status: "pending",
            teaching: 4.7,
            communication: 4.6,
            knowledge: 4.8,
            overall: 4.7,
            feedback: "Excellent explanation and classroom interaction. Uses examples effectively."
        },

        {
            id: 3,
            name: "Rahul Verma",
            subject: "Computer Science",
            topic: "Introduction to Python",
            duration: "32 min",
            experience: "6 Years",
            date: "06 Sep 2026",
            status: "approved",
            teaching: 4.8,
            communication: 4.7,
            knowledge: 4.9,
            overall: 4.8,
            feedback: "Excellent technical knowledge with clear and structured teaching."
        },

        {
            id: 4,
            name: "Neha Gupta",
            subject: "English",
            topic: "Parts of Speech",
            duration: "25 min",
            experience: "3 Years",
            date: "05 Sep 2026",
            status: "approved",
            teaching: 4.5,
            communication: 4.8,
            knowledge: 4.6,
            overall: 4.6,
            feedback: "Very good communication skills and engaging teaching approach."
        },

        {
            id: 5,
            name: "Amit Kumar",
            subject: "Mathematics",
            topic: "Probability",
            duration: "27 min",
            experience: "2 Years",
            date: "04 Sep 2026",
            status: "rejected",
            teaching: 3.1,
            communication: 3.0,
            knowledge: 3.5,
            overall: 3.2,
            feedback: "Subject knowledge is acceptable, but the demo needs improvement in explanation and student engagement."
        },

        {
            id: 6,
            name: "Sneha Mishra",
            subject: "Science",
            topic: "Chemical Reactions",
            duration: "29 min",
            experience: "5 Years",
            date: "03 Sep 2026",
            status: "pending",
            teaching: 4.4,
            communication: 4.3,
            knowledge: 4.5,
            overall: 4.4,
            feedback: "Good teaching style and clear concepts. Overall performance is promising."
        },

        {
            id: 7,
            name: "Vivek Yadav",
            subject: "Computer Science",
            topic: "Data Structures",
            duration: "31 min",
            experience: "4 Years",
            date: "02 Sep 2026",
            status: "approved",
            teaching: 4.7,
            communication: 4.5,
            knowledge: 4.9,
            overall: 4.7,
            feedback: "Strong technical knowledge with excellent examples and practical explanations."
        },

        {
            id: 8,
            name: "Pooja Tiwari",
            subject: "English",
            topic: "Active and Passive Voice",
            duration: "26 min",
            experience: "3 Years",
            date: "01 Sep 2026",
            status: "rejected",
            teaching: 3.0,
            communication: 3.4,
            knowledge: 3.2,
            overall: 3.2,
            feedback: "The explanation was understandable but the demo lacked interaction and structure."
        }
    ];


    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const reviewsList = document.getElementById("reviewsList");
    const emptyState = document.getElementById("emptyState");

    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const subjectFilter = document.getElementById("subjectFilter");

    const refreshBtn = document.getElementById("refreshBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const reviewModal = document.getElementById("reviewModal");
    const closeModal = document.getElementById("closeModal");

    const modalApproveBtn = document.getElementById("modalApproveBtn");
    const modalRejectBtn = document.getElementById("modalRejectBtn");

    let selectedReviewId = null;


    /* =========================================
       RENDER REVIEWS
    ========================================= */

    function renderReviews() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const statusValue = statusFilter.value;
        const subjectValue = subjectFilter.value;


        const filteredReviews = reviews.filter(review => {

            const matchesSearch =
                review.name.toLowerCase().includes(searchValue) ||
                review.subject.toLowerCase().includes(searchValue) ||
                review.topic.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusValue === "all" ||
                review.status === statusValue;

            const matchesSubject =
                subjectValue === "all" ||
                review.subject === subjectValue;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSubject
            );
        });


        reviewsList.innerHTML = "";


        if (filteredReviews.length === 0) {

            emptyState.classList.add("show");

            return;
        }


        emptyState.classList.remove("show");


        filteredReviews.forEach(review => {

            const card = document.createElement("div");

            card.className = "review-card";


            card.innerHTML = `
                <div class="teacher-info">

                    <div class="teacher-avatar">
                        ${getInitials(review.name)}
                    </div>

                    <div>
                        <h3>${review.name}</h3>
                        <p>${review.subject} • ${review.topic}</p>
                    </div>

                </div>


                <div class="review-meta">
                    <span>Submitted</span>
                    <strong>${review.date}</strong>
                </div>


                <div class="review-meta">
                    <span>Overall Rating</span>
                    <strong class="rating">
                        ★ ${review.overall}
                    </strong>
                </div>


                <div>
                    <span class="status ${review.status}">
                        ${review.status}
                    </span>

                    <button
                        class="view-btn"
                        data-id="${review.id}"
                    >
                        View
                    </button>
                </div>
            `;


            reviewsList.appendChild(card);
        });


        attachViewButtons();
    }


    /* =========================================
       INITIALS
    ========================================= */

    function getInitials(name) {

        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }


    /* =========================================
       VIEW BUTTONS
    ========================================= */

    function attachViewButtons() {

        const buttons =
            document.querySelectorAll(".view-btn");


        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                openReview(id);
            });
        });
    }


    /* =========================================
       OPEN REVIEW MODAL
    ========================================= */

    function openReview(id) {

        const review =
            reviews.find(item => item.id === id);


        if (!review) {
            return;
        }


        selectedReviewId = id;


        document.getElementById("modalAvatar")
            .textContent = getInitials(review.name);

        document.getElementById("modalTeacherName")
            .textContent = review.name;

        document.getElementById("modalSubject")
            .textContent = review.subject;

        document.getElementById("modalTopic")
            .textContent = review.topic;

        document.getElementById("modalDuration")
            .textContent = review.duration;

        document.getElementById("modalExperience")
            .textContent = review.experience;

        document.getElementById("modalDate")
            .textContent = review.date;

        document.getElementById("teachingRating")
            .textContent = `★ ${review.teaching}`;

        document.getElementById("communicationRating")
            .textContent = `★ ${review.communication}`;

        document.getElementById("knowledgeRating")
            .textContent = `★ ${review.knowledge}`;

        document.getElementById("overallRating")
            .textContent = `★ ${review.overall}`;

        document.getElementById("modalFeedback")
            .textContent = review.feedback;


        /* Disable actions for completed reviews */

        if (review.status === "approved") {

            modalApproveBtn.disabled = true;
            modalApproveBtn.textContent = "Already Approved";

        } else {

            modalApproveBtn.disabled = false;
            modalApproveBtn.textContent = "Approve Demo";
        }


        if (review.status === "rejected") {

            modalRejectBtn.disabled = true;
            modalRejectBtn.textContent = "Already Rejected";

        } else {

            modalRejectBtn.disabled = false;
            modalRejectBtn.textContent = "Reject";
        }


        reviewModal.classList.add("show");
    }


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeReviewModal() {

        reviewModal.classList.remove("show");

        selectedReviewId = null;
    }


    closeModal.addEventListener(
        "click",
        closeReviewModal
    );


    reviewModal.addEventListener("click", event => {

        if (event.target === reviewModal) {
            closeReviewModal();
        }
    });


    /* =========================================
       APPROVE DEMO
    ========================================= */

    modalApproveBtn.addEventListener("click", () => {

        if (!selectedReviewId) {
            return;
        }


        const review =
            reviews.find(item =>
                item.id === selectedReviewId
            );


        if (!review) {
            return;
        }


        review.status = "approved";


        updateStatistics();

        renderReviews();

        closeReviewModal();


        showNotification(
            "Demo approved successfully."
        );
    });


    /* =========================================
       REJECT DEMO
    ========================================= */

    modalRejectBtn.addEventListener("click", () => {

        if (!selectedReviewId) {
            return;
        }


        const review =
            reviews.find(item =>
                item.id === selectedReviewId
            );


        if (!review) {
            return;
        }


        review.status = "rejected";


        updateStatistics();

        renderReviews();

        closeReviewModal();


        showNotification(
            "Demo rejected successfully."
        );
    });


    /* =========================================
       UPDATE STATISTICS
    ========================================= */

    function updateStatistics() {

        const pending =
            reviews.filter(
                review => review.status === "pending"
            ).length;

        const approved =
            reviews.filter(
                review => review.status === "approved"
            ).length;

        const rejected =
            reviews.filter(
                review => review.status === "rejected"
            ).length;


        document.getElementById("pendingCount")
            .textContent = String(pending).padStart(2, "0");

        document.getElementById("approvedCount")
            .textContent = String(approved).padStart(2, "0");

        document.getElementById("rejectedCount")
            .textContent = String(rejected).padStart(2, "0");

        document.getElementById("totalCount")
            .textContent = String(reviews.length).padStart(2, "0");
    }


    /* =========================================
       SEARCH + FILTERS
    ========================================= */

    searchInput.addEventListener(
        "input",
        renderReviews
    );

    statusFilter.addEventListener(
        "change",
        renderReviews
    );

    subjectFilter.addEventListener(
        "change",
        renderReviews
    );


    /* =========================================
       REFRESH
    ========================================= */

    refreshBtn.addEventListener("click", () => {

        refreshBtn.textContent = "↻ Refreshing...";

        setTimeout(() => {

            updateStatistics();

            renderReviews();

            refreshBtn.textContent = "↻ Refresh";

            showNotification(
                "Demo reviews refreshed."
            );

        }, 500);
    });


    /* =========================================
       LOGOUT
    ========================================= */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if (confirmLogout) {

            window.location.href =
                "../auth/login.html";
        }
    });


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        const notification =
            document.createElement("div");


        notification.textContent = message;


        notification.style.position = "fixed";
        notification.style.bottom = "25px";
        notification.style.right = "25px";
        notification.style.padding = "13px 18px";
        notification.style.background = "#182b49";
        notification.style.color = "#ffffff";
        notification.style.borderRadius = "9px";
        notification.style.fontSize = "12px";
        notification.style.fontWeight = "600";
        notification.style.zIndex = "2000";
        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.15)";


        document.body.appendChild(notification);


        setTimeout(() => {

            notification.remove();

        }, 2500);
    }


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            reviewModal.classList.contains("show")
        ) {
            closeReviewModal();
        }
    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    updateStatistics();

    renderReviews();

});