/* =========================================================
   TALENTHUNT - MOCK INTERVIEW
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
        document.getElementById("closeNotification");


    const setupScreen =
        document.getElementById("setupScreen");

    const interviewScreen =
        document.getElementById("interviewScreen");

    const resultScreen =
        document.getElementById("resultScreen");


    const roleSelect =
        document.getElementById("roleSelect");

    const interviewType =
        document.getElementById("interviewType");

    const difficulty =
        document.getElementById("difficulty");

    const questionCount =
        document.getElementById("questionCount");


    const startInterview =
        document.getElementById("startInterview");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitInterview =
        document.getElementById("submitInterview");


    const answerInput =
        document.getElementById("answerInput");

    const wordCount =
        document.getElementById("wordCount");


    const timer =
        document.getElementById("timer");

    const timerBox =
        document.querySelector(".timer-box");


    const currentQuestionNumber =
        document.getElementById(
            "currentQuestionNumber"
        );

    const totalQuestions =
        document.getElementById(
            "totalQuestions"
        );

    const progressPercent =
        document.getElementById(
            "progressPercent"
        );

    const questionProgressBar =
        document.getElementById(
            "questionProgressBar"
        );


    const questionCategory =
        document.getElementById(
            "questionCategory"
        );

    const questionDifficulty =
        document.getElementById(
            "questionDifficulty"
        );

    const questionText =
        document.getElementById(
            "questionText"
        );


    const interviewRole =
        document.getElementById(
            "interviewRole"
        );

    const interviewMode =
        document.getElementById(
            "interviewMode"
        );


    const reTake =
        document.getElementById(
            "retakeInterview"
        );

    const backToSetup =
        document.getElementById(
            "backToSetup"
        );


    /* =====================================================
       QUESTION DATABASE
    ====================================================== */

    const questionBank = {

        technical: [

            {
                category: "Technical",
                question:
                    "What is Object-Oriented Programming and what are its main principles?"
            },

            {
                category: "Technical",
                question:
                    "What is the difference between an array and a linked list?"
            },

            {
                category: "Technical",
                question:
                    "Explain the difference between stack and queue."
            },

            {
                category: "Technical",
                question:
                    "What is a database index and why is it useful?"
            },

            {
                category: "Technical",
                question:
                    "What is the difference between GET and POST requests?"
            },

            {
                category: "Technical",
                question:
                    "Explain what an API is and why applications use APIs."
            },

            {
                category: "Technical",
                question:
                    "What is normalization in DBMS?"
            },

            {
                category: "Technical",
                question:
                    "What is the difference between let, const and var in JavaScript?"
            },

            {
                category: "Technical",
                question:
                    "What is Git and why is it used in software development?"
            },

            {
                category: "Technical",
                question:
                    "Explain the concept of time complexity with an example."
            }

        ],


        hr: [

            {
                category: "HR",
                question:
                    "Tell me about yourself."
            },

            {
                category: "HR",
                question:
                    "Why do you want to join our company?"
            },

            {
                category: "HR",
                question:
                    "What are your biggest strengths?"
            },

            {
                category: "HR",
                question:
                    "What is one weakness you are currently working on?"
            },

            {
                category: "HR",
                question:
                    "Where do you see yourself in the next five years?"
            },

            {
                category: "HR",
                question:
                    "Tell me about a challenging project you worked on."
            },

            {
                category: "HR",
                question:
                    "How do you handle pressure or tight deadlines?"
            },

            {
                category: "HR",
                question:
                    "Why should we hire you?"
            },

            {
                category: "HR",
                question:
                    "How do you handle disagreement within a team?"
            },

            {
                category: "HR",
                question:
                    "Describe a situation where you learned from failure."
            }

        ]

    };


    let questions = [];

    let answers = [];

    let currentIndex = 0;

    let timeRemaining = 120;

    let timerInterval = null;

    let interviewStarted = false;


    /* =====================================================
       SIDEBAR
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
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    closeNotification.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !notificationPanel.contains(event.target) &&
                !notificationBtn.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       START INTERVIEW
    ====================================================== */

    startInterview.addEventListener(
        "click",
        () => {

            if (!roleSelect.value) {

                alert(
                    "Please select your target role."
                );

                roleSelect.focus();

                return;
            }


            prepareInterview();

        }
    );


    /* =====================================================
       PREPARE INTERVIEW
    ====================================================== */

    function prepareInterview() {

        const type =
            interviewType.value;

        const count =
            Number(questionCount.value);


        let technicalQuestions =
            [...questionBank.technical];

        let hrQuestions =
            [...questionBank.hr];


        if (type === "technical") {

            questions =
                shuffle(
                    technicalQuestions
                );

        }

        else if (type === "hr") {

            questions =
                shuffle(
                    hrQuestions
                );

        }

        else {

            const technical =
                shuffle(
                    technicalQuestions
                ).slice(
                    0,
                    Math.ceil(count / 2)
                );

            const hr =
                shuffle(
                    hrQuestions
                ).slice(
                    0,
                    Math.floor(count / 2)
                );


            questions =
                shuffle(
                    [
                        ...technical,
                        ...hr
                    ]
                );

        }


        questions =
            questions.slice(
                0,
                count
            );


        /*
         * Make sure answers exist
         * for every question.
         */

        answers =
            new Array(
                questions.length
            ).fill("");


        currentIndex = 0;

        timeRemaining = 120;

        interviewStarted = true;


        setupScreen.style.display =
            "none";

        resultScreen.classList.remove(
            "show"
        );

        interviewScreen.classList.add(
            "show"
        );


        interviewRole.textContent =
            formatRole(
                roleSelect.value
            );

        interviewMode.textContent =
            formatInterviewType(
                interviewType.value
            );


        totalQuestions.textContent =
            questions.length;


        loadQuestion();

        startTimer();

    }


    /* =====================================================
       LOAD QUESTION
    ====================================================== */

    function loadQuestion() {

        if (!questions.length) {
            return;
        }


        const question =
            questions[currentIndex];


        currentQuestionNumber.textContent =
            currentIndex + 1;


        questionText.textContent =
            question.question;


        questionCategory.textContent =
            question.category;


        questionDifficulty.textContent =
            formatDifficulty(
                difficulty.value
            );


        answerInput.value =
            answers[currentIndex] || "";


        updateWordCount();

        updateProgress();


        previousBtn.disabled =
            currentIndex === 0;


        if (
            currentIndex ===
            questions.length - 1
        ) {

            nextBtn.style.display =
                "none";

            submitInterview.style.display =
                "inline-block";

        }

        else {

            nextBtn.style.display =
                "inline-block";

            submitInterview.style.display =
                "inline-block";

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SAVE CURRENT ANSWER
    ====================================================== */

    function saveAnswer() {

        answers[currentIndex] =
            answerInput.value.trim();

    }


    /* =====================================================
       NEXT QUESTION
    ====================================================== */

    nextBtn.addEventListener(
        "click",
        () => {

            saveAnswer();


            if (
                currentIndex <
                questions.length - 1
            ) {

                currentIndex++;

                loadQuestion();

            }

        }
    );


    /* =====================================================
       PREVIOUS QUESTION
    ====================================================== */

    previousBtn.addEventListener(
        "click",
        () => {

            saveAnswer();


            if (currentIndex > 0) {

                currentIndex--;

                loadQuestion();

            }

        }
    );


    /* =====================================================
       WORD COUNT
    ====================================================== */

    answerInput.addEventListener(
        "input",
        updateWordCount
    );


    function updateWordCount() {

        const text =
            answerInput.value.trim();


        if (!text) {

            wordCount.textContent =
                "0 words";

            return;
        }


        const words =
            text.split(/\s+/).length;


        wordCount.textContent =
            `${words} words`;

    }


    /* =====================================================
       TIMER
    ====================================================== */

    function startTimer() {

        clearInterval(
            timerInterval
        );


        updateTimer();


        timerInterval =
            setInterval(
                () => {

                    timeRemaining--;

                    updateTimer();


                    if (
                        timeRemaining <= 0
                    ) {

                        clearInterval(
                            timerInterval
                        );

                        submitInterviewNow();

                    }

                },
                1000
            );

    }


    function updateTimer() {

        const minutes =
            Math.floor(
                timeRemaining / 60
            );

        const seconds =
            timeRemaining % 60;


        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (
            timeRemaining <= 30
        ) {

            timerBox.classList.add(
                "warning"
            );

        }

        else {

            timerBox.classList.remove(
                "warning"
            );

        }

    }


    /* =====================================================
       SUBMIT INTERVIEW
    ====================================================== */

    submitInterview.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to submit the interview?"
                );


            if (confirmed) {

                submitInterviewNow();

            }

        }
    );


    function submitInterviewNow() {

        if (!interviewStarted) {
            return;
        }


        saveAnswer();


        clearInterval(
            timerInterval
        );


        interviewStarted = false;


        calculateResult();

    }


    /* =====================================================
       RESULT CALCULATION
    ====================================================== */

    function calculateResult() {

        const answered =
            answers.filter(
                answer =>
                    answer.length > 0
            ).length;


        const total =
            questions.length;


        const answerRate =
            total
                ? answered / total
                : 0;


        /*
         * Frontend demo scoring.
         *
         * Later this can be replaced
         * by AI evaluation.
         */

        let score =
            Math.round(
                45 +
                (answerRate * 55)
            );


        if (score > 100) {
            score = 100;
        }


        const strong =
            Math.round(
                answered * 0.7
            );


        document.getElementById(
            "finalScore"
        ).textContent = score;


        document.getElementById(
            "answeredCount"
        ).textContent = answered;


        document.getElementById(
            "strongAnswers"
        ).textContent = strong;


        const usedSeconds =
            120 - timeRemaining;


        const usedMinutes =
            Math.max(
                1,
                Math.ceil(
                    usedSeconds / 60
                )
            );


        document.getElementById(
            "timeUsed"
        ).textContent =
            `${usedMinutes}m`;


        updateScoreMessage(
            score
        );


        interviewScreen.classList.remove(
            "show"
        );

        resultScreen.classList.add(
            "show"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SCORE MESSAGE
    ====================================================== */

    function updateScoreMessage(score) {

        const message =
            document.getElementById(
                "scoreMessage"
            );

        const description =
            document.getElementById(
                "scoreDescription"
            );


        if (score >= 85) {

            message.textContent =
                "Excellent Performance";

            description.textContent =
                "You demonstrated strong interview readiness. Keep practicing advanced questions and real-world scenarios.";

        }

        else if (score >= 70) {

            message.textContent =
                "Good Performance";

            description.textContent =
                "You have a good foundation. Focus on improving technical explanations and communication.";

        }

        else if (score >= 50) {

            message.textContent =
                "Needs Improvement";

            description.textContent =
                "You have started well, but need more practice with technical concepts and interview communication.";

        }

        else {

            message.textContent =
                "Keep Practicing";

            description.textContent =
                "Build your fundamentals first and practice answering interview questions regularly.";

        }

    }


    /* =====================================================
       RETAKE
    ====================================================== */

    reTake.addEventListener(
        "click",
        () => {

            resultScreen.classList.remove(
                "show"
            );

            setupScreen.style.display =
                "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       BACK TO SETUP
    ====================================================== */

    backToSetup.addEventListener(
        "click",
        () => {

            resultScreen.classList.remove(
                "show"
            );

            setupScreen.style.display =
                "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       FORMAT ROLE
    ====================================================== */

    function formatRole(role) {

        const roleNames = {

            "software-developer":
                "Software Developer",

            "frontend-developer":
                "Frontend Developer",

            "backend-developer":
                "Backend Developer",

            "data-analyst":
                "Data Analyst",

            "full-stack":
                "Full Stack Developer",

            "python-developer":
                "Python Developer"

        };


        return (
            roleNames[role] ||
            "Software Developer"
        );

    }


    /* =====================================================
       FORMAT INTERVIEW TYPE
    ====================================================== */

    function formatInterviewType(type) {

        const types = {

            technical:
                "Technical Interview",

            hr:
                "HR / Behavioral Interview",

            mixed:
                "Mixed Interview"

        };


        return (
            types[type] ||
            "Mixed Interview"
        );

    }


    /* =====================================================
       FORMAT DIFFICULTY
    ====================================================== */

    function formatDifficulty(level) {

        const levels = {

            easy:
                "Beginner",

            medium:
                "Intermediate",

            hard:
                "Advanced"

        };


        return (
            levels[level] ||
            "Intermediate"
        );

    }


    /* =====================================================
       SHUFFLE
    ====================================================== */

    function shuffle(array) {

        const result =
            [...array];


        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                result[i],
                result[j]
            ] = [
                result[j],
                result[i]
            ];

        }


        return result;

    }


});