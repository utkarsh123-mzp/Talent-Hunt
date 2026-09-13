/* =========================================================
   TALENTHUNT - OPPORTUNITIES JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const exploreBtn =
        document.getElementById("exploreBtn");

    const searchInput =
        document.getElementById("searchInput");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const opportunityCards =
        document.querySelectorAll(".opportunity-card");

    const detailsButtons =
        document.querySelectorAll(".details-btn");

    const saveButtons =
        document.querySelectorAll(".save-btn");

    const modal =
        document.getElementById("detailsModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTag =
        document.getElementById("modalTag");

    const modalAudience =
        document.getElementById("modalAudience");

    const modalType =
        document.getElementById("modalType");

    const modalEligibility =
        document.getElementById("modalEligibility");

    const modalMode =
        document.getElementById("modalMode");

    const applyBtn =
        document.getElementById("applyBtn");

    const postOpportunityBtn =
        document.getElementById("postOpportunityBtn");


    /* =====================================================
       HERO SCROLL
    ====================================================== */

    exploreBtn.addEventListener("click", () => {

        const explorer =
            document.getElementById(
                "opportunityExplorer"
            );

        explorer.scrollIntoView({
            behavior: "smooth"
        });

    });


    /* =====================================================
       CATEGORY CARD → SECTION
    ====================================================== */

    categoryCards.forEach(card => {

        card.addEventListener("click", () => {

            const targetId =
                card.dataset.target;

            const target =
                document.getElementById(targetId);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SEARCH
    ====================================================== */

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            opportunityCards.forEach(card => {

                const searchText =
                    (
                        card.dataset.search ||
                        card.textContent
                    ).toLowerCase();


                if (
                    query === "" ||
                    searchText.includes(query)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );


    /* =====================================================
       FILTER SYSTEM
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter ||
                button.dataset.collegeFilter ||
                button.dataset.teacherFilter;


            const section =
                button.closest(
                    ".opportunity-section"
                );


            if (!section) {
                return;
            }


            const buttons =
                section.querySelectorAll(
                    ".filter-btn"
                );


            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const cards =
                section.querySelectorAll(
                    ".opportunity-card"
                );


            cards.forEach(card => {

                const type =
                    card.dataset.type;


                if (
                    filter === "all" ||
                    filter === "school-all"
                ) {

                    card.style.display = "";

                    return;
                }


                card.style.display =
                    type === filter
                        ? ""
                        : "none";

            });

        });

    });


    /* =====================================================
       SAVED OPPORTUNITIES
    ====================================================== */

    let savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "talentHuntSavedOpportunities"
            ) || "[]"
        );


    function getCardId(card) {

        const title =
            card.querySelector("h3");

        return title
            ? title.textContent.trim()
            : "";

    }


    function updateSaveButton(
        button,
        card
    ) {

        const id =
            getCardId(card);

        const saved =
            savedOpportunities.includes(id);


        button.classList.toggle(
            "saved",
            saved
        );


        button.textContent =
            saved ? "♥" : "♡";

    }


    saveButtons.forEach(button => {

        const card =
            button.closest(
                ".opportunity-card"
            );

        if (!card) {
            return;
        }


        updateSaveButton(
            button,
            card
        );


        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const id =
                    getCardId(card);

                const index =
                    savedOpportunities.indexOf(
                        id
                    );


                if (index === -1) {

                    savedOpportunities.push(id);

                } else {

                    savedOpportunities.splice(
                        index,
                        1
                    );

                }


                localStorage.setItem(
                    "talentHuntSavedOpportunities",
                    JSON.stringify(
                        savedOpportunities
                    )
                );


                updateSaveButton(
                    button,
                    card
                );

            }
        );

    });


    /* =====================================================
       DETAILS MODAL
    ====================================================== */

    detailsButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".opportunity-card"
                    );

                if (!card) {
                    return;
                }

                openModal(card);

            }
        );

    });


    function openModal(card) {

        const title =
            card.querySelector("h3");

        const description =
            card.querySelector(
                ":scope > p"
            );

        const tag =
            card.querySelector(".tag");

        const meta =
            card.querySelectorAll(
                ".meta span"
            );


        modalTitle.textContent =
            title
                ? title.textContent.trim()
                : "Opportunity";


        modalDescription.textContent =
            description
                ? description.textContent.trim()
                : "Opportunity details.";


        modalTag.textContent =
            tag
                ? tag.textContent.trim()
                : "Opportunity";


        const audience =
            card.dataset.audience;


        if (audience === "school") {

            modalAudience.textContent =
                "School Students";

            modalEligibility.textContent =
                "Class 5–10";

        } else if (
            audience === "college"
        ) {

            modalAudience.textContent =
                "College Students";

            modalEligibility.textContent =
                "College Students";

        } else if (
            audience === "teacher"
        ) {

            modalAudience.textContent =
                "Teachers";

            modalEligibility.textContent =
                "Teachers / Educators";

        } else {

            modalAudience.textContent =
                "-";

            modalEligibility.textContent =
                "-";

        }


        modalType.textContent =
            card.dataset.type || "-";


        modalMode.textContent =
            meta.length > 0
                ? meta[meta.length - 1]
                    .textContent
                    .trim()
                : "-";


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {
                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       APPLY BUTTON
    ====================================================== */

    applyBtn.addEventListener(
        "click",
        () => {

            alert(
                "Application system will be connected in the next phase."
            );

        }
    );


    /* =====================================================
       POST OPPORTUNITY
    ====================================================== */

    postOpportunityBtn.addEventListener(
        "click",
        () => {

            alert(
                "Post Opportunity feature will be added in the next phase."
            );

        }
    );


});