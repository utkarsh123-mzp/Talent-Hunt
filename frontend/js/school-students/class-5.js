/* =========================================================
   TALENTHUNT — CLASS 5
   class-5.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const navActions = document.querySelector(".nav-actions");

    const startButtons =
        document.querySelectorAll(".start-btn");

    const talentLinks =
        document.querySelectorAll(".talent-card a");



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-active");

            if (navActions) {
                navActions.classList.toggle("mobile-actions");
            }


            const menuOpen =
                navMenu.classList.contains("mobile-active");


            if (menuOpen) {

                menuToggle.innerHTML =
                    '<i class="ph ph-x"></i>';

                menuToggle.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                menuToggle.innerHTML =
                    '<i class="ph ph-list"></i>';

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });

    }



    /* =====================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ====================================================== */

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu?.classList.remove(
                "mobile-active"
            );

            navActions?.classList.remove(
                "mobile-actions"
            );


            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="ph ph-list"></i>';

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });

    });



    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });



    /* =====================================================
       ASSESSMENT BUTTONS
    ====================================================== */
    startButtons.forEach((button) => {

        button.addEventListener("click", () => {

            window.location.href =
                "../assessments/assessment-class-5.html";

        });

    });


    /* =====================================================
       TALENT CARD BUTTONS
    ====================================================== */

    talentLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();


            const card =
                link.closest(".talent-card");


            const title =
                card?.querySelector("h3");


            const talentName =
                title
                    ? title.textContent.trim()
                    : "Talent";


            showToast(
                `${talentName} activities are coming soon!`
            );

        });

    });



    /* =====================================================
       TOAST NOTIFICATION
    ====================================================== */

    function showToast(message) {

        const oldToast =
            document.querySelector(".class5-toast");


        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "class5-toast";


        toast.innerHTML = `
            <i class="ph ph-sparkle"></i>
            <span>${message}</span>
        `;


        document.body.appendChild(toast);


        requestAnimationFrame(() => {

            toast.classList.add("show");

        });


        setTimeout(() => {

            toast.classList.remove("show");


            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 2500);

    }



    /* =====================================================
       COMPETITION BUTTON FEEDBACK
    ====================================================== */

    const competitionButtons =
        document.querySelectorAll(
            ".competition-btn"
        );


    competitionButtons.forEach((button) => {

        button.addEventListener("click", () => {

            /*
             * Actual competitions page will be
             * connected later.
             */

        });

    });



    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (
            navMenu &&
            navMenu.classList.contains(
                "mobile-active"
            ) &&
            !navMenu.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {

            navMenu.classList.remove(
                "mobile-active"
            );

            navActions?.classList.remove(
                "mobile-actions"
            );


            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="ph ph-list"></i>';

            }

        }

    });



    /* =====================================================
       RESET MOBILE MENU ON DESKTOP
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            navMenu?.classList.remove(
                "mobile-active"
            );

            navActions?.classList.remove(
                "mobile-actions"
            );


            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="ph ph-list"></i>';

            }

        }

    });



    /* =====================================================
       ACTIVE SECTION ON SCROLL
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    window.addEventListener("scroll", () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 140;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });



    /* =====================================================
       HERO BUTTON LOADING FEEDBACK
    ====================================================== */

    const primaryButton =
        document.querySelector(".primary-btn");


    if (primaryButton) {

        primaryButton.addEventListener(
            "click",
            () => {

                primaryButton.classList.add(
                    "clicked"
                );

                setTimeout(() => {

                    primaryButton.classList.remove(
                        "clicked"
                    );

                }, 400);

            }
        );

    }



    /* =====================================================
       PAGE LOADED
    ====================================================== */

    console.log(
        "TalentHunt Class 5 page loaded successfully."
    );

});