/* =========================================================
   TALENTHUNT - COLLEGE ASSESSMENTS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       QUESTIONS
    ====================================================== */

    const questions = [

        /* ================= DSA ================= */

        {
            category: "DSA",
            difficulty: "Medium",
            type: "mcq",
            question:
                "What is the time complexity of binary search on a sorted array?",
            options: [
                "O(n)",
                "O(log n)",
                "O(n log n)",
                "O(1)"
            ],
            answer: 1
        },

        {
            category: "DSA",
            difficulty: "Easy",
            type: "mcq",
            question:
                "Which data structure follows the LIFO principle?",
            options: [
                "Queue",
                "Stack",
                "Linked List",
                "Tree"
            ],
            answer: 1
        },

        {
            category: "DSA",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Which traversal of a Binary Search Tree produces sorted order?",
            options: [
                "Preorder",
                "Postorder",
                "Inorder",
                "Level Order"
            ],
            answer: 2
        },

        {
            category: "DSA",
            difficulty: "Medium",
            type: "mcq",
            question:
                "What is the average time complexity of searching in a hash table?",
            options: [
                "O(n)",
                "O(log n)",
                "O(1)",
                "O(n log n)"
            ],
            answer: 2
        },

        {
            category: "DSA",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Which algorithm is commonly used to find the shortest path in a weighted graph with non-negative edges?",
            options: [
                "Dijkstra's Algorithm",
                "DFS",
                "Kruskal's Algorithm",
                "Binary Search"
            ],
            answer: 0
        },

        {
            category: "DSA",
            difficulty: "Hard",
            type: "coding",
            question:
                "Write a function to find the second largest element in an array without sorting the array.",
            answer: ""
        },

        /* ================= APTITUDE ================= */

        {
            category: "Aptitude",
            difficulty: "Easy",
            type: "mcq",
            question:
                "A train travels 360 km in 6 hours. What is its average speed?",
            options: [
                "50 km/h",
                "55 km/h",
                "60 km/h",
                "65 km/h"
            ],
            answer: 2
        },

        {
            category: "Aptitude",
            difficulty: "Medium",
            type: "mcq",
            question:
                "If 20% of a number is 80, what is the number?",
            options: [
                "200",
                "300",
                "400",
                "500"
            ],
            answer: 2
        },

        {
            category: "Aptitude",
            difficulty: "Medium",
            type: "mcq",
            question:
                "A product marked at ₹1000 is sold at a 10% discount. What is its selling price?",
            options: [
                "₹850",
                "₹900",
                "₹950",
                "₹990"
            ],
            answer: 1
        },

        {
            category: "Aptitude",
            difficulty: "Medium",
            type: "mcq",
            question:
                "The average of 10 numbers is 25. What is their total sum?",
            options: [
                "150",
                "200",
                "250",
                "300"
            ],
            answer: 2
        },

        {
            category: "Aptitude",
            difficulty: "Medium",
            type: "mcq",
            question:
                "If a:b = 3:5 and b:c = 10:7, then a:c is:",
            options: [
                "3:7",
                "6:7",
                "5:7",
                "7:6"
            ],
            answer: 1
        },

        {
            category: "Aptitude",
            difficulty: "Hard",
            type: "coding",
            question:
                "Write a program to check whether a given number is prime. Explain the time complexity of your approach.",
            answer: ""
        },

        /* ================= REASONING ================= */

        {
            category: "Reasoning",
            difficulty: "Easy",
            type: "mcq",
            question:
                "Find the next number: 2, 6, 12, 20, 30, ?",
            options: [
                "36",
                "40",
                "42",
                "44"
            ],
            answer: 2
        },

        {
            category: "Reasoning",
            difficulty: "Medium",
            type: "mcq",
            question:
                "If CAT is coded as DBU, how will DOG be coded?",
            options: [
                "EPH",
                "EOG",
                "DPH",
                "FPH"
            ],
            answer: 0
        },

        {
            category: "Reasoning",
            difficulty: "Medium",
            type: "mcq",
            question:
                "A is the brother of B. B is the sister of C. How is A related to C?",
            options: [
                "Father",
                "Brother",
                "Uncle",
                "Cousin"
            ],
            answer: 1
        },

        {
            category: "Reasoning",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Find the odd one out.",
            options: [
                "Triangle",
                "Square",
                "Circle",
                "Rectangle"
            ],
            answer: 2
        },

        {
            category: "Reasoning",
            difficulty: "Medium",
            type: "mcq",
            question:
                "If all roses are flowers and some flowers are red, which statement is definitely true?",
            options: [
                "All roses are red",
                "Some roses are red",
                "All roses are flowers",
                "No flowers are roses"
            ],
            answer: 2
        },

        {
            category: "Reasoning",
            difficulty: "Hard",
            type: "coding",
            question:
                "Given a string, write a program to determine whether it is a palindrome.",
            answer: ""
        },

        /* ================= VERBAL ================= */

        {
            category: "Verbal Ability",
            difficulty: "Easy",
            type: "mcq",
            question:
                "Choose the synonym of 'Abundant'.",
            options: [
                "Scarce",
                "Plentiful",
                "Weak",
                "Rare"
            ],
            answer: 1
        },

        {
            category: "Verbal Ability",
            difficulty: "Easy",
            type: "mcq",
            question:
                "Choose the antonym of 'Ancient'.",
            options: [
                "Old",
                "Historic",
                "Modern",
                "Traditional"
            ],
            answer: 2
        },

        {
            category: "Verbal Ability",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Choose the grammatically correct sentence.",
            options: [
                "She don't like coffee.",
                "She doesn't likes coffee.",
                "She doesn't like coffee.",
                "She not like coffee."
            ],
            answer: 2
        },

        {
            category: "Verbal Ability",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Fill in the blank: He has been working here ___ 2022.",
            options: [
                "for",
                "since",
                "from",
                "by"
            ],
            answer: 1
        },

        {
            category: "Verbal Ability",
            difficulty: "Medium",
            type: "mcq",
            question:
                "Choose the correctly spelled word.",
            options: [
                "Accomodation",
                "Acommodation",
                "Accommodation",
                "Accommadation"
            ],
            answer: 2
        },

        {
            category: "Verbal Ability",
            difficulty: "Medium",
            type: "coding",
            question:
                "Write a short paragraph of 80-100 words explaining why communication skills are important in a software engineering career.",
            answer: ""
        },

        /* ================= CODING ================= */

        {
            category: "Coding",
            difficulty: "Easy",
            type: "coding",
            question:
                "Write a program to reverse a string without using a built-in reverse function.",
            answer: ""
        },

        {
            category: "Coding",
            difficulty: "Medium",
            type: "coding",
            question:
                "Write a program to find the frequency of each character in a string.",
            answer: ""
        },

        {
            category: "Coding",
            difficulty: "Medium",
            type: "coding",
            question:
                "Given an array of integers, write a program to find the maximum and minimum elements.",
            answer: ""
        },

        {
            category: "Coding",
            difficulty: "Medium",
            type: "coding",
            question:
                "Write a program to determine whether two strings are anagrams of each other.",
            answer: ""
        },

        {
            category: "Coding",
            difficulty: "Hard",
            type: "coding",
            question:
                "Write a program to find the first non-repeating character in a string and explain its time complexity.",
            answer: ""
        },

        {
            category: "Coding",
            difficulty: "Hard",
            type: "coding",
            question:
                "Write a program to find the longest substring without repeating characters.",
            answer: ""
        }

    ];


    /* =====================================================
       STATE
    ====================================================== */

    let currentIndex = 0;

    let answers =
        new Array(questions.length).fill(null);

    let codingAnswers =
        new Array(questions.length).fill("");

    let timeLeft = 30 * 60;

    let timerInterval = null;

    let assessmentStarted = false;

    let submitted = false;


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const startScreen =
        document.getElementById("startScreen");

    const assessmentScreen =
        document.getElementById("assessmentScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    const startBtn =
        document.getElementById("startBtn");

    const timer =
        document.getElementById("timer");

    const questionText =
        document.getElementById("questionText");

    const questionCategory =
        document.getElementById("questionCategory");

    const questionDifficulty =
        document.getElementById("questionDifficulty");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const codingContainer =
        document.getElementById("codingContainer");

    const codingAnswer =
        document.getElementById("codingAnswer");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const skipBtn =
        document.getElementById("skipBtn");

    const questionPalette =
        document.getElementById("questionPalette");

    const currentQuestion =
        document.getElementById("currentQuestion");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const answeredCount =
        document.getElementById("answeredCount");

    const progressBar =
        document.getElementById("progressBar");

    const submitBtn =
        document.getElementById("submitBtn");

    const warningModal =
        document.getElementById("warningModal");

    const cancelSubmit =
        document.getElementById("cancelSubmit");

    const confirmSubmit =
        document.getElementById("confirmSubmit");

    const retakeBtn =
        document.getElementById("retakeBtn");


    /* =====================================================
       INITIAL SETUP
    ====================================================== */

    totalQuestions.textContent =
        questions.length;


    /* =====================================================
       START ASSESSMENT
    ====================================================== */

    startBtn.addEventListener("click", () => {

        assessmentStarted = true;

        startScreen.classList.add("hidden");

        assessmentScreen.classList.remove("hidden");

        renderQuestion();

        renderPalette();

        startTimer();

    });


    /* =====================================================
       TIMER
    ====================================================== */

    function startTimer() {

        updateTimer();

        timerInterval =
            setInterval(() => {

                timeLeft--;

                updateTimer();

                if (timeLeft <= 0) {

                    clearInterval(timerInterval);

                    autoSubmit();

                }

            }, 1000);

    }


    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (timeLeft <= 300) {

            timer.parentElement.classList.add(
                "timer-warning"
            );

        }

    }


    /* =====================================================
       RENDER QUESTION
    ====================================================== */

    function renderQuestion() {

        const question =
            questions[currentIndex];


        currentQuestion.textContent =
            currentIndex + 1;


        questionCategory.textContent =
            question.category;


        questionDifficulty.textContent =
            question.difficulty;


        questionText.textContent =
            question.question;


        optionsContainer.innerHTML = "";

        codingContainer.classList.add(
            "hidden"
        );


        if (question.type === "mcq") {

            optionsContainer.classList.remove(
                "hidden"
            );

            renderOptions(question);

        }


        if (question.type === "coding") {

            optionsContainer.classList.add(
                "hidden"
            );

            codingContainer.classList.remove(
                "hidden"
            );

            codingAnswer.value =
                codingAnswers[currentIndex];

        }


        previousBtn.disabled =
            currentIndex === 0;


        nextBtn.textContent =
            currentIndex === questions.length - 1
                ? "Finish →"
                : "Next →";


        updateProgress();

        updatePalette();

    }


    /* =====================================================
       RENDER MCQ OPTIONS
    ====================================================== */

    function renderOptions(question) {

        const letters =
            ["A", "B", "C", "D"];


        question.options.forEach(
            (option, index) => {

                const optionElement =
                    document.createElement("div");

                optionElement.className =
                    "option";


                if (
                    answers[currentIndex] === index
                ) {

                    optionElement.classList.add(
                        "selected"
                    );

                }


                optionElement.innerHTML = `
                    <span class="option-letter">
                        ${letters[index]}
                    </span>

                    <span class="option-text">
                        ${escapeHTML(option)}
                    </span>
                `;


                optionElement.addEventListener(
                    "click",
                    () => {

                        answers[currentIndex] =
                            index;

                        renderQuestion();

                    }
                );


                optionsContainer.appendChild(
                    optionElement
                );

            }
        );

    }


    /* =====================================================
       CODING ANSWER
    ====================================================== */

    codingAnswer.addEventListener(
        "input",
        () => {

            codingAnswers[currentIndex] =
                codingAnswer.value;

            updateProgress();

            updatePalette();

        }
    );


    /* =====================================================
       NEXT
    ====================================================== */

    nextBtn.addEventListener(
        "click",
        () => {

            saveCurrentAnswer();


            if (
                currentIndex <
                questions.length - 1
            ) {

                currentIndex++;

                renderQuestion();

            } else {

                openSubmitModal();

            }

        }
    );


    /* =====================================================
       PREVIOUS
    ====================================================== */

    previousBtn.addEventListener(
        "click",
        () => {

            saveCurrentAnswer();


            if (currentIndex > 0) {

                currentIndex--;

                renderQuestion();

            }

        }
    );


    /* =====================================================
       SKIP
    ====================================================== */

    skipBtn.addEventListener(
        "click",
        () => {

            saveCurrentAnswer();

            if (
                currentIndex <
                questions.length - 1
            ) {

                currentIndex++;

                renderQuestion();

            }

        }
    );


    /* =====================================================
       SAVE CURRENT ANSWER
    ====================================================== */

    function saveCurrentAnswer() {

        const question =
            questions[currentIndex];


        if (question.type === "coding") {

            codingAnswers[currentIndex] =
                codingAnswer.value.trim();

        }

    }


    /* =====================================================
       PALETTE
    ====================================================== */

    function renderPalette() {

        questionPalette.innerHTML = "";


        questions.forEach(
            (_, index) => {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "palette-number";

                button.textContent =
                    index + 1;


                button.addEventListener(
                    "click",
                    () => {

                        saveCurrentAnswer();

                        currentIndex =
                            index;

                        renderQuestion();

                    }
                );


                questionPalette.appendChild(
                    button
                );

            }
        );


        updatePalette();

    }


    function updatePalette() {

        const buttons =
            questionPalette.querySelectorAll(
                ".palette-number"
            );


        buttons.forEach(
            (button, index) => {

                button.classList.remove(
                    "current",
                    "answered"
                );


                if (
                    index === currentIndex
                ) {

                    button.classList.add(
                        "current"
                    );

                }


                if (
                    isAnswered(index)
                ) {

                    button.classList.add(
                        "answered"
                    );

                }

            }
        );

    }


    /* =====================================================
       CHECK ANSWERED
    ====================================================== */

    function isAnswered(index) {

        const question =
            questions[index];


        if (question.type === "mcq") {

            return answers[index] !== null;

        }


        if (question.type === "coding") {

            return codingAnswers[index]
                .trim()
                .length > 0;

        }


        return false;

    }


    /* =====================================================
       PROGRESS
    ====================================================== */

    function updateProgress() {

        let answered = 0;


        questions.forEach(
            (_, index) => {

                if (
                    isAnswered(index)
                ) {

                    answered++;

                }

            }
        );


        answeredCount.textContent =
            answered;


        const progress =
            ((currentIndex + 1) /
                questions.length) *
            100;


        progressBar.style.width =
            `${progress}%`;

    }


    /* =====================================================
       SUBMIT MODAL
    ====================================================== */

    submitBtn.addEventListener(
        "click",
        () => {

            saveCurrentAnswer();

            openSubmitModal();

        }
    );


    function openSubmitModal() {

        warningModal.classList.add(
            "active"
        );

    }


    cancelSubmit.addEventListener(
        "click",
        () => {

            warningModal.classList.remove(
                "active"
            );

        }
    );


    confirmSubmit.addEventListener(
        "click",
        () => {

            warningModal.classList.remove(
                "active"
            );

            submitAssessment();

        }
    );


    /* =====================================================
       AUTO SUBMIT
    ====================================================== */

    function autoSubmit() {

        if (submitted) {
            return;
        }

        saveCurrentAnswer();

        submitAssessment();

    }


    /* =====================================================
       SUBMIT ASSESSMENT
    ====================================================== */

    function submitAssessment() {

        if (submitted) {
            return;
        }

        submitted = true;

        assessmentStarted = false;

        clearInterval(timerInterval);


        let correct = 0;

        let wrong = 0;

        let unanswered = 0;


        const sectionStats = {};


        questions.forEach(
            (question, index) => {

                if (
                    !sectionStats[
                        question.category
                    ]
                ) {

                    sectionStats[
                        question.category
                    ] = {
                        total: 0,
                        correct: 0
                    };

                }


                sectionStats[
                    question.category
                ].total++;


                if (question.type === "mcq") {

                    if (
                        answers[index] === null
                    ) {

                        unanswered++;

                    } else if (
                        answers[index] ===
                        question.answer
                    ) {

                        correct++;

                        sectionStats[
                            question.category
                        ].correct++;

                    } else {

                        wrong++;

                    }

                } else {

                    /*
                     * Coding questions are not
                     * automatically marked correct.
                     * They are counted as attempted
                     * and will be evaluated later
                     * when backend/AI evaluation
                     * is connected.
                     */

                    if (
                        codingAnswers[index]
                            .trim()
                            .length === 0
                    ) {

                        unanswered++;

                    }

                }

            }
        );


        const score =
            correct;


        const percentage =
            Math.round(
                (score / questions.length) *
                100
            );


        /* SAVE RESULT */

        localStorage.setItem(
            "collegeAssessmentScore",
            percentage
        );

        localStorage.setItem(
            "collegeAssessmentCorrect",
            correct
        );

        localStorage.setItem(
            "collegeAssessmentWrong",
            wrong
        );


        showResult(
            score,
            correct,
            wrong,
            unanswered,
            percentage,
            sectionStats
        );

    }


    /* =====================================================
       SHOW RESULT
    ====================================================== */

    function showResult(
        score,
        correct,
        wrong,
        unanswered,
        percentage,
        sectionStats
    ) {

        assessmentScreen.classList.add(
            "hidden"
        );

        resultScreen.classList.remove(
            "hidden"
        );


        document.getElementById(
            "finalScore"
        ).textContent = score;


        document.getElementById(
            "correctAnswers"
        ).textContent = correct;


        document.getElementById(
            "wrongAnswers"
        ).textContent = wrong;


        document.getElementById(
            "unansweredAnswers"
        ).textContent = unanswered;


        const resultStatus =
            document.getElementById(
                "resultStatus"
            );


        if (percentage >= 80) {

            resultStatus.textContent =
                "Excellent! You are placement-ready.";

        } else if (percentage >= 60) {

            resultStatus.textContent =
                "Good performance! Keep improving.";

        } else if (percentage >= 40) {

            resultStatus.textContent =
                "Keep practicing and strengthen your basics.";

        } else {

            resultStatus.textContent =
                "More preparation is needed. Don't give up.";

        }


        renderSectionResults(
            sectionStats
        );

    }


    /* =====================================================
       SECTION RESULTS
    ====================================================== */

    function renderSectionResults(
        sectionStats
    ) {

        const container =
            document.getElementById(
                "sectionResults"
            );


        container.innerHTML = "";


        Object.entries(sectionStats)
            .forEach(
                ([name, stats]) => {

                    const percentage =
                        Math.round(
                            (stats.correct /
                                stats.total) *
                            100
                        );


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "section-result";


                    row.innerHTML = `
                        <span class="section-result-name">
                            ${escapeHTML(name)}
                        </span>

                        <div class="section-result-bar">
                            <span
                                style="width:${percentage}%">
                            </span>
                        </div>

                        <span class="section-result-score">
                            ${percentage}%
                        </span>
                    `;


                    container.appendChild(
                        row
                    );

                }
            );

    }


    /* =====================================================
       RETAKE
    ====================================================== */

    retakeBtn.addEventListener(
        "click",
        () => {

            currentIndex = 0;

            answers =
                new Array(
                    questions.length
                ).fill(null);

            codingAnswers =
                new Array(
                    questions.length
                ).fill("");

            timeLeft = 30 * 60;

            submitted = false;

            resultScreen.classList.add(
                "hidden"
            );

            startScreen.classList.remove(
                "hidden"
            );

            timer.textContent =
                "30:00";

        }
    );


    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                window.innerWidth <= 1050 &&
                !sidebar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

});