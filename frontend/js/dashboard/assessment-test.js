/* =========================================
   TALENT HUNT - ASSESSMENT TEST JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       QUESTIONS
    ========================================= */

    const assessmentData = {

        "Technical Skills": {
            time: 20,
            questions: [
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
                    question: "Which technology is used to style a web page?",
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
                    question: "Which language is primarily used to retrieve data from relational databases?",
                    options: ["HTML", "SQL", "CSS", "XML"],
                    answer: 1
                },
                {
                    question: "Which of the following is an operating system?",
                    options: ["MySQL", "Linux", "Python", "Git"],
                    answer: 1
                },
                {
                    question: "What is the time complexity of binary search?",
                    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
                    answer: 2
                }
            ]
        },

        "Aptitude & Reasoning": {
            time: 15,
            questions: [
                {
                    question: "If 5 + 3 = 8, what is 8 + 7?",
                    options: ["12", "13", "15", "16"],
                    answer: 2
                },
                {
                    question: "What comes next: 2, 4, 6, 8, ?",
                    options: ["9", "10", "11", "12"],
                    answer: 1
                },
                {
                    question: "What is 25% of 200?",
                    options: ["25", "40", "50", "75"],
                    answer: 2
                },
                {
                    question: "If A is taller than B and B is taller than C, who is shortest?",
                    options: ["A", "B", "C", "Cannot determine"],
                    answer: 2
                },
                {
                    question: "What is the average of 10, 20 and 30?",
                    options: ["15", "20", "25", "30"],
                    answer: 1
                },
                {
                    question: "Which number is divisible by 5?",
                    options: ["23", "31", "45", "47"],
                    answer: 2
                },
                {
                    question: "If 3 pens cost ₹30, what is the cost of 1 pen?",
                    options: ["₹5", "₹10", "₹15", "₹20"],
                    answer: 1
                },
                {
                    question: "What is the next number: 5, 10, 15, 20, ?",
                    options: ["22", "24", "25", "30"],
                    answer: 2
                },
                {
                    question: "Which is the odd one out?",
                    options: ["Apple", "Mango", "Banana", "Carrot"],
                    answer: 3
                },
                {
                    question: "If today is Monday, what day will it be after 3 days?",
                    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
                    answer: 2
                }
            ]
        },

        "Coding Challenge": {
            time: 30,
            questions: [
                {
                    question: "Which symbol is used for equality comparison in JavaScript?",
                    options: ["=", "==", "+=", "=>"],
                    answer: 1
                },
                {
                    question: "Which data structure uses FIFO?",
                    options: ["Stack", "Queue", "Tree", "Graph"],
                    answer: 1
                },
                {
                    question: "Which keyword creates a loop in Python?",
                    options: ["repeat", "loop", "for", "iterate"],
                    answer: 2
                },
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Text Machine Language",
                        "Hyper Tool Markup Language",
                        "Home Text Markup Language"
                    ],
                    answer: 0
                },
                {
                    question: "Which method adds an item to the end of a JavaScript array?",
                    options: ["push()", "pop()", "shift()", "remove()"],
                    answer: 0
                },
                {
                    question: "Which keyword is used to return a value from a function?",
                    options: ["send", "return", "output", "give"],
                    answer: 1
                },
                {
                    question: "Which language is commonly used for backend development?",
                    options: ["Python", "HTML", "CSS", "JSON"],
                    answer: 0
                },
                {
                    question: "Which operator represents logical AND in JavaScript?",
                    options: ["||", "&&", "!", "&"],
                    answer: 1
                },
                {
                    question: "Which sorting algorithm repeatedly selects the smallest element?",
                    options: [
                        "Selection Sort",
                        "Merge Sort",
                        "Quick Sort",
                        "Binary Sort"
                    ],
                    answer: 0
                },
                {
                    question: "What is the purpose of a function?",
                    options: [
                        "Store images",
                        "Reuse a block of code",
                        "Create hardware",
                        "Delete a program"
                    ],
                    answer: 1
                }
            ]
        },

        "Communication Skills": {
            time: 15,
            questions: [
                {
                    question: "Choose the correct sentence.",
                    options: [
                        "He go to school.",
                        "He goes to school.",
                        "He going school.",
                        "He gone school."
                    ],
                    answer: 1
                },
                {
                    question: "Choose the synonym of 'Happy'.",
                    options: ["Sad", "Angry", "Joyful", "Weak"],
                    answer: 2
                },
                {
                    question: "Choose the antonym of 'Strong'.",
                    options: ["Powerful", "Weak", "Brave", "Active"],
                    answer: 1
                },
                {
                    question: "Fill in the blank: She ___ a student.",
                    options: ["are", "am", "is", "be"],
                    answer: 2
                },
                {
                    question: "Which word is spelled correctly?",
                    options: ["Beautifull", "Beautiful", "Beutiful", "Beautifal"],
                    answer: 1
                },
                {
                    question: "What is the plural of 'Child'?",
                    options: ["Childs", "Childes", "Children", "Childrens"],
                    answer: 2
                },
                {
                    question: "Choose the correct article: He is ___ honest man.",
                    options: ["a", "an", "the", "no article"],
                    answer: 1
                },
                {
                    question: "Which is a professional way to start an email?",
                    options: [
                        "Hey bro!",
                        "Dear Sir/Madam,",
                        "Yo!",
                        "What's up?"
                    ],
                    answer: 1
                },
                {
                    question: "What is the opposite of 'Accept'?",
                    options: ["Receive", "Reject", "Allow", "Agree"],
                    answer: 1
                },
                {
                    question: "Which skill is important for effective communication?",
                    options: [
                        "Active listening",
                        "Ignoring",
                        "Interrupting",
                        "Shouting"
                    ],
                    answer: 0
                }
            ]
        },

        "Creativity & Innovation": {
            time: 15,
            questions: [
                {
                    question: "Creativity mainly involves:",
                    options: [
                        "Memorizing facts",
                        "Generating new ideas",
                        "Copying others",
                        "Avoiding problems"
                    ],
                    answer: 1
                },
                {
                    question: "Innovation means:",
                    options: [
                        "Creating useful new ideas",
                        "Repeating old work",
                        "Avoiding change",
                        "Doing nothing"
                    ],
                    answer: 0
                },
                {
                    question: "Which approach encourages creativity?",
                    options: [
                        "Brainstorming",
                        "Ignoring ideas",
                        "Avoiding questions",
                        "Following only one solution"
                    ],
                    answer: 0
                },
                {
                    question: "A prototype is:",
                    options: [
                        "A final product only",
                        "An early version of a product",
                        "A marketing slogan",
                        "A database"
                    ],
                    answer: 1
                },
                {
                    question: "Creative thinking helps in:",
                    options: [
                        "Problem solving",
                        "Avoiding decisions",
                        "Reducing ideas",
                        "Ignoring feedback"
                    ],
                    answer: 0
                },
                {
                    question: "Which is an example of innovation?",
                    options: [
                        "Improving an existing product",
                        "Copying exactly",
                        "Ignoring users",
                        "Removing features without reason"
                    ],
                    answer: 0
                },
                {
                    question: "Brainstorming is used to:",
                    options: [
                        "Generate many ideas",
                        "Delete ideas",
                        "Stop discussion",
                        "Avoid creativity"
                    ],
                    answer: 0
                },
                {
                    question: "Which quality supports creative thinking?",
                    options: [
                        "Curiosity",
                        "Fear",
                        "Negativity",
                        "Silence"
                    ],
                    answer: 0
                },
                {
                    question: "Problem solving often begins with:",
                    options: [
                        "Understanding the problem",
                        "Ignoring the problem",
                        "Guessing randomly",
                        "Copying a solution"
                    ],
                    answer: 0
                },
                {
                    question: "Feedback can help innovation by:",
                    options: [
                        "Improving ideas",
                        "Stopping ideas",
                        "Removing creativity",
                        "Avoiding users"
                    ],
                    answer: 0
                }
            ]
        },

        "Data Analytics": {
            time: 20,
            questions: [
                {
                    question: "Which language is commonly used for querying databases?",
                    options: ["SQL", "HTML", "CSS", "XML"],
                    answer: 0
                },
                {
                    question: "Which Python library is widely used for data analysis?",
                    options: ["Pandas", "React", "Express", "Django"],
                    answer: 0
                },
                {
                    question: "What does KPI stand for?",
                    options: [
                        "Key Performance Indicator",
                        "Key Program Input",
                        "Knowledge Process Index",
                        "Key Product Information"
                    ],
                    answer: 0
                },
                {
                    question: "Which chart is useful for showing trends over time?",
                    options: ["Line chart", "Pie chart", "Map", "Table only"],
                    answer: 0
                },
                {
                    question: "What does CSV stand for?",
                    options: [
                        "Comma Separated Values",
                        "Computer Stored Values",
                        "Column System Variable",
                        "Common Statistical Values"
                    ],
                    answer: 0
                },
                {
                    question: "Which SQL command retrieves data?",
                    options: ["SELECT", "DELETE", "DROP", "UPDATE"],
                    answer: 0
                },
                {
                    question: "What is the median?",
                    options: [
                        "Middle value",
                        "Largest value",
                        "Smallest value",
                        "Total value"
                    ],
                    answer: 0
                },
                {
                    question: "Which tool is commonly used for business dashboards?",
                    options: ["Power BI", "Notepad", "Paint", "Calculator"],
                    answer: 0
                },
                {
                    question: "What is data cleaning?",
                    options: [
                        "Fixing incorrect or missing data",
                        "Deleting all data",
                        "Creating passwords",
                        "Designing websites"
                    ],
                    answer: 0
                },
                {
                    question: "Which measure represents the average?",
                    options: ["Mean", "Mode", "Range", "Median"],
                    answer: 0
                }
            ]
        }
    };

    const selectedAssessment =
        localStorage.getItem("selectedAssessment") ||
        "Technical Skills";

    const currentAssessment =
        assessmentData[selectedAssessment] ||
        assessmentData["Technical Skills"];

    const questions = currentAssessment.questions;

    let currentIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);

    let timeLeft = currentAssessment.time * 60;
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

    const assessmentLabel =
        document.querySelector(".test-label");

    const assessmentTitle =
        document.querySelector(".test-intro h1");

    const assessmentDescription =
        document.querySelector(".test-intro p");

    const difficultyBadge =
        document.querySelector(".difficulty-badge");

    assessmentLabel.innerHTML = `
    <i class="ph ph-sparkle"></i>
    ${selectedAssessment}
`;

    assessmentTitle.textContent =
        `${selectedAssessment} Assessment`;

    assessmentDescription.textContent =
        `Test your ${selectedAssessment.toLowerCase()} skills and discover your strengths.`;

    const difficultyMap = {
        "Technical Skills": "Intermediate",
        "Aptitude & Reasoning": "Beginner",
        "Coding Challenge": "Advanced",
        "Communication Skills": "Beginner",
        "Creativity & Innovation": "Intermediate",
        "Data Analytics": "Intermediate"
    };

    difficultyBadge.textContent =
        difficultyMap[selectedAssessment] || "Intermediate";


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


        
        // Save assessment result
        const assessmentResults =
            JSON.parse(
                localStorage.getItem("assessmentResults")
            ) || {};

        assessmentResults[selectedAssessment] = {
            score: correct,
            total: questions.length,
            percentage: percentage,
            correct: correct,
            wrong: wrong,
            unanswered: unansweredCount,
            completedAt: new Date().toISOString()
        };

        localStorage.setItem(
            "assessmentResults",
            JSON.stringify(assessmentResults)
        );

        console.log(
            "Saved Assessment Result:",
            assessmentResults[selectedAssessment]
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