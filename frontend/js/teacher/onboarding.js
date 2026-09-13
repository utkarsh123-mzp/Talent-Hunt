/* =========================================
   TEACHER ONBOARDING
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "Teacher Onboarding Loaded"
        );


        /* =====================================
           ELEMENTS
        ====================================== */

        const form =
            document.getElementById(
                "onboardingForm"
            );


        const progressFill =
            document.getElementById(
                "progressFill"
            );


        const progressPercent =
            document.getElementById(
                "progressPercent"
            );


        const agreement =
            document.getElementById(
                "agreement"
            );


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        /* =====================================
           FORM FIELDS
        ====================================== */

        const fields = [

            document.getElementById(
                "fullName"
            ),

            document.getElementById(
                "email"
            ),

            document.getElementById(
                "phone"
            ),

            document.getElementById(
                "teachingMode"
            ),

            document.getElementById(
                "subject"
            ),

            document.getElementById(
                "classes"
            ),

            document.getElementById(
                "availability"
            ),

            document.getElementById(
                "preferredHours"
            )

        ];


        /* =====================================
           UPDATE PROGRESS
        ====================================== */

        function updateProgress() {

            let completed = 0;


            fields.forEach(
                function (field) {

                    if (
                        field &&
                        field.value.trim() !== ""
                    ) {

                        completed++;

                    }

                }
            );


            /*
             * Agreement ko bhi progress
             * mein count karenge.
             */

            if (
                agreement &&
                agreement.checked
            ) {

                completed++;

            }


            const total =
                fields.length + 1;


            const percentage =
                Math.round(
                    (completed / total) * 100
                );


            progressFill.style.width =
                percentage + "%";


            progressPercent.textContent =
                percentage + "%";


            updateProgressStep(
                percentage
            );

        }


        /* =====================================
           UPDATE STEP TEXT
        ====================================== */

        function updateProgressStep(
            percentage
        ) {

            const steps =
                document.querySelectorAll(
                    ".progress-step"
                );


            steps.forEach(
                function (step) {

                    step.classList.remove(
                        "active"
                    );

                }
            );


            if (percentage < 35) {

                steps[0].classList.add(
                    "active"
                );

            }

            else if (percentage < 65) {

                steps[1].classList.add(
                    "active"
                );

            }

            else if (percentage < 100) {

                steps[2].classList.add(
                    "active"
                );

            }

            else {

                steps[3].classList.add(
                    "active"
                );

            }

        }


        /* =====================================
           FIELD EVENTS
        ====================================== */

        fields.forEach(
            function (field) {

                if (!field) {
                    return;
                }


                field.addEventListener(
                    "input",
                    updateProgress
                );


                field.addEventListener(
                    "change",
                    updateProgress
                );

            }
        );


        if (agreement) {

            agreement.addEventListener(
                "change",
                updateProgress
            );

        }


        /* =====================================
           FORM SUBMIT
        ====================================== */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /*
                 * Browser validation
                 */

                if (
                    !form.checkValidity()
                ) {

                    form.reportValidity();

                    showNotification(
                        "Please complete all required fields."
                    );

                    return;

                }


                if (
                    !agreement.checked
                ) {

                    showNotification(
                        "Please accept the teaching agreement."
                    );

                    return;

                }


                /*
                 * Collect teacher data
                 */

                const teacherData = {

                    name:
                        document.getElementById(
                            "fullName"
                        ).value,

                    email:
                        document.getElementById(
                            "email"
                        ).value,

                    phone:
                        document.getElementById(
                            "phone"
                        ).value,

                    teachingMode:
                        document.getElementById(
                            "teachingMode"
                        ).value,

                    subject:
                        document.getElementById(
                            "subject"
                        ).value,

                    classes:
                        document.getElementById(
                            "classes"
                        ).value,

                    availability:
                        document.getElementById(
                            "availability"
                        ).value,

                    preferredHours:
                        document.getElementById(
                            "preferredHours"
                        ).value,

                    onboardingCompleted:
                        true,

                    completedAt:
                        new Date().toISOString()

                };


                /*
                 * Temporary localStorage.
                 *
                 * Later backend/database
                 * se replace hoga.
                 */

                localStorage.setItem(
                    "teacherOnboarding",
                    JSON.stringify(
                        teacherData
                    )
                );


                /*
                 * Show success
                 */

                showSuccessScreen();

            }
        );


        /* =====================================
           SUCCESS SCREEN
        ====================================== */

        function showSuccessScreen() {

            progressFill.style.width =
                "100%";


            progressPercent.textContent =
                "100%";


            const completionCard =
                document.querySelector(
                    ".completion-card"
                );


            completionCard.innerHTML = `

                <div class="completion-icon">
                    ✓
                </div>

                <div class="completion-content">

                    <span class="eyebrow">
                        ONBOARDING COMPLETE
                    </span>

                    <h2>
                        You're Ready to Teach!
                    </h2>

                    <p>
                        Your teacher onboarding has been
                        successfully completed.
                    </p>

                </div>

                <button
                    type="button"
                    class="complete-btn"
                    id="dashboardBtn"
                >
                    Go to Dashboard
                </button>

            `;


            const dashboardBtn =
                document.getElementById(
                    "dashboardBtn"
                );


            dashboardBtn.addEventListener(
                "click",
                function () {

                    /*
                     * Future dashboard path.
                     */

                    window.location.href =
                        "teacher-dashboard.html";

                }
            );


            showNotification(
                "Onboarding completed successfully!"
            );

        }


        /* =====================================
           LOGOUT
        ====================================== */

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "teacherSession"
                );


                /*
                 * Login path ko apne project
                 * ke according update kar sakte ho.
                 */

                window.location.href =
                    "../auth/login.html";

            }
        );


        /* =====================================
           NOTIFICATION
        ====================================== */

        function showNotification(
            message
        ) {

            const oldNotification =
                document.querySelector(
                    ".toast-notification"
                );


            if (oldNotification) {

                oldNotification.remove();

            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "toast-notification";


            toast.textContent =
                message;


            toast.style.position =
                "fixed";

            toast.style.right =
                "25px";

            toast.style.bottom =
                "25px";

            toast.style.zIndex =
                "9999";

            toast.style.background =
                "#17172b";

            toast.style.color =
                "#ffffff";

            toast.style.padding =
                "13px 18px";

            toast.style.borderRadius =
                "10px";

            toast.style.fontSize =
                "11px";

            toast.style.fontWeight =
                "600";

            toast.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.2)";


            document.body.appendChild(
                toast
            );


            setTimeout(
                function () {

                    toast.style.opacity =
                        "0";

                    toast.style.transition =
                        "0.3s";


                    setTimeout(
                        function () {

                            toast.remove();

                        },
                        300
                    );

                },
                2500
            );

        }


        /* =====================================
           INITIALIZE
        ====================================== */

        updateProgress();

    }
);