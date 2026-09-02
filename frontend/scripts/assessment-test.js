/* =========================================
   TALENT HUNT - ASSESSMENT TEST JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       QUESTIONS
    ========================================= */

    const questions = [
        {
            question: "Which of the following is a programming language?",
            options: ["HTML", "Python", "CSS", "JSON"],
            answer: 1
        },

        {
            question: "Which data structure follows the LIFO principle?",
            options: ["Queue", "Array", "Stack", "Linked List"],
            answer: 2
        },

        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "define", "def", "fun"],
            answer: 2
        },

        {
            question: "Which of the following is used to style a web page?",
            options: ["HTML", "CSS", "SQL", "Python"],
            answer: 1
        },

        {
            question: "What does SQL stand for?",
            options: [
                "Structured Query Language",
                "Simple Query Language",
                "System Query Logic",
                "Structured Question Language"
            ],
            answer: 0
        },

        {
            question: "Which protocol is commonly used to transfer web pages?",
            options: ["HTTP", "FTP", "SMTP", "SSH"],
            answer: 0
        },

        {
            question: "Which JavaScript keyword declares a block-scoped variable?",
            options: ["var", "let", "define", "variable"],
            answer: 1
        },

        {
            question: "Which database language is primarily used to retrieve data from relational databases?",
            options: ["HTML", "SQL", "CSS", "XML"],
            answer: 1
        },

        {
            question: "Which of the following is an operating system?",
            options: ["MySQL", "Linux", "Python", "Git"],
            answer: 1
        },

        {
            question: "What is the time complexity of binary search in a sorted array?",
            options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
            answer: 2
        }
    ];


    /* =========================================
       VARIABLES
    ========================================= */

    let currentIndex = 0;

    let userAnswers = new Array(questions.length).fill(null);

    let timeLeft = 20 * 60;

    let timerInterval = null;

    let submitted = false;


    /* =========================================
       ELEMENTS
    ========================================= */

    const questionText =
        document.getElementById("questionText");

    const questionNumber =
        document.getElementById("questionNumber");

    const currentQuestion =
        document.getElementById("currentQuestion");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const optionsContainer =
        document.getElementById("options");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    const timer =
        document.getElementById("timer");

    const questionCard =
        document.querySelector(".question-card");

    const testProgress =
        document.querySelector(".test-progress");

    const testIntro =
        document.querySelector(".test-intro");

    const instructionsCard =
        document.querySelector(".instructions-card");

    const resultScreen =
        document.getElementById("resultScreen");

    const finalScore =
        document.getElementById("finalScore");

    const correctAnswers =
        document.getElementById("correctAnswers");

    const wrongAnswers =
        document.getElementById("wrongAnswers");

    const unanswered =
        document.getElementById("unanswered");

    const retryBtn =
        document.getElementById("retryBtn");


    /* =========================================
       INITIAL SETUP
    ========================================= */

    totalQuestions.textContent =
        questions.length;


    /* =========================================
       LOAD QUESTION
    ========================================= */

    function loadQuestion() {

        const question = questions[currentIndex];


        // Question text
        questionText.textContent =
            question.question;


        // Question number
        const displayNumber =
            String(currentIndex + 1).padStart(2, "0");

        questionNumber.textContent =
            displayNumber;


        currentQuestion.textContent =
            currentIndex + 1;


        // Progress
        const progress =
            ((currentIndex + 1) / questions.length) * 100;

        progressBar.style.width =
            progress + "%";

        progressText.textContent =
            Math.round(progress) + "%";


        // Create options
        optionsContainer.innerHTML = "";


        question.options.forEach(
            (optionText, optionIndex) => {

                const optionButton =
                    document.createElement("button");

                optionButton.className = "option";

                optionButton.type = "button";


                optionButton.innerHTML = `
                    <span class="option-letter">
                        ${String.fromCharCode(65 + optionIndex)}
                    </span>

                    <span class="option-text">
                        ${escapeHtml(optionText)}
                    </span>
                `;


                // Restore selected answer
                if (
                    userAnswers[currentIndex] ===
                    optionIndex
                ) {
                    optionButton.classList.add(
                        "selected"
                    );
                }


                optionButton.addEventListener(
                    "click",
                    () => selectAnswer(optionIndex)
                );


                optionsContainer.appendChild(
                    optionButton
                );

            }
        );


        // Previous button
        previousBtn.disabled =
            currentIndex === 0;


        // Last question
        if (
            currentIndex ===
            questions.length - 1
        ) {

            nextBtn.style.display = "none";

            submitBtn.style.display = "flex";

        } else {

            nextBtn.style.display = "flex";

            submitBtn.style.display = "none";

        }

    }


    /* =========================================
       SELECT ANSWER
    ========================================= */

    function selectAnswer(optionIndex) {

        if (submitted) {
            return;
        }


        userAnswers[currentIndex] =
            optionIndex;


        const allOptions =
            document.querySelectorAll(".option");


        allOptions.forEach(option => {
            option.classList.remove("selected");
        });


        if (allOptions[optionIndex]) {

            allOptions[optionIndex]
                .classList.add("selected");

        }

    }


    /* =========================================
       NEXT QUESTION
    ========================================= */

    nextBtn.addEventListener("click", () => {

        if (
            currentIndex <
            questions.length - 1
        ) {

            currentIndex++;

            loadQuestion();

        }

    });


    /* =========================================
       PREVIOUS QUESTION
    ========================================= */

    previousBtn.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            loadQuestion();

        }

    });


    /* =========================================
       SUBMIT TEST
    ========================================= */

    submitBtn.addEventListener(
        "click",
        () => {

            const unansweredCount =
                userAnswers.filter(
                    answer => answer === null
                ).length;


            if (unansweredCount > 0) {

                const confirmSubmit = confirm(
                    `You have ${unansweredCount} unanswered question(s).\n\nDo you want to submit the test?`
                );

                if (!confirmSubmit) {
                    return;
                }

            }


            submitTest();

        }
    );


    /* =========================================
       SUBMIT FUNCTION
    ========================================= */

    function submitTest() {

        if (submitted) {
            return;
        }


        submitted = true;


        // Stop timer
        clearInterval(timerInterval);


        let correct = 0;

        let wrong = 0;

        let unansweredCount = 0;


        questions.forEach(
            (question, index) => {

                const userAnswer =
                    userAnswers[index];


                if (userAnswer === null) {

                    unansweredCount++;

                } else if (
                    userAnswer === question.answer
                ) {

                    correct++;

                } else {

                    wrong++;

                }

            }
        );


        // Show result
        showResult(
            correct,
            wrong,
            unansweredCount
        );

    }


    /* =========================================
       RESULT SCREEN
    ========================================= */

    function showResult(
        correct,
        wrong,
        unansweredCount
    ) {

        const percentage =
            Math.round(
                (correct / questions.length) * 100
            );


        finalScore.textContent =
            correct;


        correctAnswers.textContent =
            correct;


        wrongAnswers.textContent =
            wrong;


        unanswered.textContent =
            unansweredCount;


        const percentageElement =
            document.querySelector(
                ".result-percentage"
            );


        percentageElement.textContent =
            percentage + "%";


        // Hide test interface
        questionCard.style.display = "none";

        testProgress.style.display = "none";

        testIntro.style.display = "none";

        instructionsCard.style.display = "none";


        // Show result
        resultScreen.classList.add("show");


        // Save result for future Talent Score
        localStorage.setItem(
            "technicalAssessmentScore",
            percentage
        );


        localStorage.setItem(
            "technicalAssessmentCorrect",
            correct
        );


        console.log(
            "Assessment Result:",
            percentage + "%"
        );

    }


    /* =========================================
       RETRY
    ========================================= */

    retryBtn.addEventListener(
        "click",
        () => {

            currentIndex = 0;

            userAnswers =
                new Array(questions.length)
                    .fill(null);

            timeLeft = 20 * 60;

            submitted = false;


            // Show test interface
            questionCard.style.display = "block";

            testProgress.style.display = "block";

            testIntro.style.display = "flex";

            instructionsCard.style.display = "block";


            resultScreen.classList.remove(
                "show"
            );


            updateTimerDisplay();

            loadQuestion();

            startTimer();

        }
    );


    /* =========================================
       TIMER
    ========================================= */

    function startTimer() {

        clearInterval(timerInterval);


        timerInterval = setInterval(
            () => {

                timeLeft--;

                updateTimerDisplay();


                if (timeLeft <= 0) {

                    clearInterval(timerInterval);

                    alert(
                        "Time is over. Your assessment will be submitted automatically."
                    );

                    submitTest();

                }

            },
            1000
        );

    }


    /* =========================================
       TIMER DISPLAY
    ========================================= */

    function updateTimerDisplay() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;


        const formattedMinutes =
            String(minutes).padStart(2, "0");

        const formattedSeconds =
            String(seconds).padStart(2, "0");


        timer.querySelector("span").textContent =
            `${formattedMinutes}:${formattedSeconds}`;


        // Warning state
        if (timeLeft <= 5 * 60) {

            timer.classList.add("warning");

        }


        // Danger state
        if (timeLeft <= 60) {

            timer.classList.add("danger");

        }

    }


    /* =========================================
       HTML ESCAPE
    ========================================= */

    function escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }


    /* =========================================
       PREVENT ACCIDENTAL PAGE EXIT
    ========================================= */

    window.addEventListener(
        "beforeunload",
        event => {

            if (
                !submitted &&
                userAnswers.some(
                    answer => answer !== null
                )
            ) {

                event.preventDefault();

                event.returnValue = "";

            }

        }
    );


    /* =========================================
       START
    ========================================= */

    loadQuestion();

    updateTimerDisplay();

    startTimer();


    console.log(
        "Talent Hunt Assessment Engine loaded."
    );

});