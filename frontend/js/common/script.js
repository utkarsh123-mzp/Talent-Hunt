/* =========================================================
   TALENTHUNT LANDING PAGE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const navActions = document.querySelector(".nav-actions");
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");


    /* =====================================================
       DARK / LIGHT MODE
    ====================================================== */

    if (themeToggle) {

        const savedTheme = localStorage.getItem("talentHuntTheme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");

            themeToggle.innerHTML =
                '<i class="ph ph-sun"></i>';
        }


        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");


            if (isDark) {

                themeToggle.innerHTML =
                    '<i class="ph ph-sun"></i>';

                localStorage.setItem(
                    "talentHuntTheme",
                    "dark"
                );

            } else {

                themeToggle.innerHTML =
                    '<i class="ph ph-moon"></i>';

                localStorage.setItem(
                    "talentHuntTheme",
                    "light"
                );
            }

        });

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-active");

            navActions?.classList.toggle("mobile-actions");

            const isOpen =
                navMenu.classList.contains("mobile-active");


            menuToggle.innerHTML = isOpen
                ? '<i class="ph ph-x"></i>'
                : '<i class="ph ph-list"></i>';

        });

    }


    /* =====================================================
       STUDENT DROPDOWN
    ====================================================== */

    if (dropdown && dropdownToggle) {

        dropdownToggle.addEventListener("click", (event) => {

            /*
             * Prevent "#" from moving the page
             */
            event.preventDefault();

            dropdown.classList.toggle("dropdown-open");

        });

    }


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (
            dropdown &&
            !dropdown.contains(event.target)
        ) {

            dropdown.classList.remove("dropdown-open");

        }

    });


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (navMenu) {

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                /*
                 * Don't close menu for the
                 * For Students dropdown toggle
                 */
                if (
                    link.classList.contains(
                        "dropdown-toggle"
                    )
                ) {
                    return;
                }


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

            });

        });

    }


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
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const mainNavLinks =
        document.querySelectorAll(
            '.nav-menu > a[href^="#"]'
        );


    window.addEventListener("scroll", () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 120;

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


        mainNavLinks.forEach((link) => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            navMenu?.classList.remove(
                "mobile-active"
            );

            navActions?.classList.remove(
                "mobile-actions"
            );

            dropdown?.classList.remove(
                "dropdown-open"
            );


            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="ph ph-list"></i>';

            }

        }

    });

});