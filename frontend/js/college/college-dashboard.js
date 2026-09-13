/* =========================================================
   TALENTHUNT - COLLEGE DASHBOARD JS
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
        document.getElementById(
            "closeNotification"
        );

    const readinessScore =
        document.getElementById(
            "readinessScore"
        );


    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN LINK CLICKED
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 950
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    /* =====================================================
       CLOSE SIDEBAR ON OUTSIDE CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                window.innerWidth > 950
            ) {
                return;
            }


            const clickedInsideSidebar =
                sidebar.contains(
                    event.target
                );

            const clickedMenu =
                menuBtn.contains(
                    event.target
                );


            if (
                !clickedInsideSidebar &&
                !clickedMenu
            ) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       NOTIFICATION PANEL
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                notificationPanel.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       CLOSE NOTIFICATION
    ====================================================== */

    if (closeNotification) {

        closeNotification.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       OUTSIDE NOTIFICATION CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !notificationPanel.contains(
                    event.target
                ) &&
                !notificationBtn.contains(
                    event.target
                )
            ) {

                notificationPanel.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                sidebar.classList.remove(
                    "open"
                );

                notificationPanel.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       READINESS SCORE
    ====================================================== */

    const storedScore =
        localStorage.getItem(
            "collegePlacementReadiness"
        );


    if (
        storedScore &&
        !Number.isNaN(
            Number(storedScore)
        )
    ) {

        readinessScore.textContent =
            Math.min(
                100,
                Math.max(
                    0,
                    Number(storedScore)
                )
            );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage
        ) {

            navLinks.forEach(item => {
                item.classList.remove(
                    "active"
                );
            });

            link.classList.add(
                "active"
            );

        }

    });


});