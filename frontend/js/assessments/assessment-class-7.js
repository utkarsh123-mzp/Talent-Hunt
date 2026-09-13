// =====================================================
// TALENT HUNT
// CLASS 7 ASSESSMENT
// =====================================================


document.addEventListener("DOMContentLoaded", () => {


    // =================================================
    // QUESTIONS
    // =================================================

    const assessmentData = {

        Mathematics: [

            {
                question:
                    "What is the value of 7 × 8?",

                options: [
                    "54",
                    "56",
                    "64",
                    "48"
                ],

                answer: 1
            },

            {
                question:
                    "Which number is a prime number?",

                options: [
                    "21",
                    "27",
                    "29",
                    "33"
                ],

                answer: 2
            },

            {
                question:
                    "What is 3/4 + 1/4?",

                options: [
                    "1/2",
                    "1",
                    "3/4",
                    "2"
                ],

                answer: 1
            },

            {
                question:
                    "What is the perimeter of a square with side 5 cm?",

                options: [
                    "10 cm",
                    "15 cm",
                    "20 cm",
                    "25 cm"
                ],

                answer: 2
            },

            {
                question:
                    "What is 15% of 100?",

                options: [
                    "10",
                    "15",
                    "20",
                    "25"
                ],

                answer: 1
            }

        ],


        Science: [

            {
                question:
                    "Which organ pumps blood throughout the body?",

                options: [
                    "Lungs",
                    "Brain",
                    "Heart",
                    "Kidney"
                ],

                answer: 2
            },

            {
                question:
                    "Plants prepare their food by which process?",

                options: [
                    "Respiration",
                    "Photosynthesis",
                    "Digestion",
                    "Transpiration"
                ],

                answer: 1
            },

            {
                question:
                    "Which gas is needed for respiration?",

                options: [
                    "Carbon dioxide",
                    "Nitrogen",
                    "Oxygen",
                    "Hydrogen"
                ],

                answer: 2
            },

            {
                question:
                    "Which force pulls objects towards Earth?",

                options: [
                    "Magnetic force",
                    "Gravitational force",
                    "Frictional force",
                    "Muscular force"
                ],

                answer: 1
            },

            {
                question:
                    "Water changes into vapour by which process?",

                options: [
                    "Freezing",
                    "Condensation",
                    "Evaporation",
                    "Melting"
                ],

                answer: 2
            }

        ],


        English: [

            {
                question:
                    "Choose the correct synonym of 'Happy'.",

                options: [
                    "Sad",
                    "Angry",
                    "Joyful",
                    "Weak"
                ],

                answer: 2
            },

            {
                question:
                    "Which word is a noun?",

                options: [
                    "Beautiful",
                    "Quickly",
                    "School",
                    "Run"
                ],

                answer: 2
            },

            {
                question:
                    "Choose the correct sentence.",

                options: [
                    "She go to school.",
                    "She goes to school.",
                    "She going school.",
                    "She gone school."
                ],

                answer: 1
            },

            {
                question:
                    "What is the opposite of 'Ancient'?",

                options: [
                    "Old",
                    "Modern",
                    "Historic",
                    "Past"
                ],

                answer: 1
            },

            {
                question:
                    "Identify the adjective: 'The beautiful flower bloomed.'",

                options: [
                    "The",
                    "Beautiful",
                    "Flower",
                    "Bloomed"
                ],

                answer: 1
            }

        ],


        Hindi: [

            {
                question:
                    "‘सुंदर’ शब्द का विलोम क्या है?",

                options: [
                    "अच्छा",
                    "कुरूप",
                    "मधुर",
                    "सरल"
                ],

                answer: 1
            },

            {
                question:
                    "‘जल’ का पर्यायवाची शब्द कौन-सा है?",

                options: [
                    "आकाश",
                    "पवन",
                    "नीर",
                    "अग्नि"
                ],

                answer: 2
            },

            {
                question:
                    "‘राम स्कूल जाता है।’ वाक्य में कर्ता कौन है?",

                options: [
                    "स्कूल",
                    "जाता",
                    "राम",
                    "है"
                ],

                answer: 2
            },

            {
                question:
                    "‘पुस्तक’ का बहुवचन क्या है?",

                options: [
                    "पुस्तका",
                    "पुस्तकें",
                    "पुस्तकों",
                    "पुस्तक"
                ],

                answer: 1
            },

            {
                question:
                    "‘आकाश’ का पर्यायवाची शब्द कौन-सा है?",

                options: [
                    "नभ",
                    "धरती",
                    "जल",
                    "वायु"
                ],

                answer: 0
            }

        ],


        "Social Science": [

            {
                question:
                    "Which is the largest continent?",

                options: [
                    "Africa",
                    "Asia",
                    "Europe",
                    "Australia"
                ],

                answer: 1
            },

            {
                question:
                    "Who makes laws in a democracy?",

                options: [
                    "Citizens",
                    "Legislature",
                    "Police",
                    "Judges"
                ],

                answer: 1
            },

            {
                question:
                    "Which line divides Earth into Northern and Southern Hemispheres?",

                options: [
                    "Tropic of Cancer",
                    "Equator",
                    "Prime Meridian",
                    "Arctic Circle"
                ],

                answer: 1
            },

            {
                question:
                    "Which is the longest river in India?",

                options: [
                    "Yamuna",
                    "Ganga",
                    "Godavari",
                    "Narmada"
                ],

                answer: 1
            },

            {
                question:
                    "India is a ______ country.",

                options: [
                    "Democratic",
                    "Monarchical",
                    "Military",
                    "Colonial"
                ],

                answer: 0
            }

        ],


        Computer: [

            {
                question:
                    "What does CPU stand for?",

                options: [
                    "Central Processing Unit",
                    "Computer Processing User",
                    "Central Program Unit",
                    "Control Processing Unit"
                ],

                answer: 0
            },

            {
                question:
                    "Which device is used to type text?",

                options: [
                    "Monitor",
                    "Keyboard",
                    "Speaker",
                    "Printer"
                ],

                answer: 1
            },

            {
                question:
                    "Which one is an operating system?",

                options: [
                    "Windows",
                    "Google",
                    "HTML",
                    "Mouse"
                ],

                answer: 0
            },

            {
                question:
                    "What is used to browse websites?",

                options: [
                    "Web Browser",
                    "Calculator",
                    "Paint",
                    "Notepad"
                ],

                answer: 0
            },

            {
                question:
                    "Which symbol is commonly used for email addresses?",

                options: [
                    "#",
                    "&",
                    "@",
                    "%"
                ],

                answer: 2
            }

        ]

    };


    // =================================================
    // VARIABLES
    // =================================================

    const subjects =
        Object.keys(assessmentData);

    let currentSubjectIndex = 0;

    let currentQuestionIndex = 0;

    let selectedAnswers = {};

    let subjectScores = {};

    let timeLeft = 600;

    let timerInterval = null;


    subjects.forEach(subject => {

        selectedAnswers[subject] =
            new Array(
                assessmentData[subject].length
            ).fill(null);

        subjectScores[subject] = 0;

    });


    // =================================================
    // ELEMENTS
    // =================================================

    const startScreen =
        document.getElementById("startScreen");

    const quizScreen =
        document.getElementById("quizScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    const startBtn =
        document.getElementById("startBtn");

    const homeBtn =
        document.getElementById("homeBtn");

    const resultHomeBtn =
        document.getElementById("resultHomeBtn");

    const restartBtn =
        document.getElementById("restartBtn");

    const subjectTitle =
        document.getElementById("subjectTitle");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const questionCounter =
        document.getElementById("questionCounter");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressFill =
        document.getElementById("progressFill");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const timer =
        document.getElementById("timer");


    // =================================================
    // HOME
    // =================================================

    function goHome() {

        window.location.href =
            "../school-students/class-7.html";

    }


    homeBtn.addEventListener(
        "click",
        goHome
    );


    resultHomeBtn.addEventListener(
        "click",
        goHome
    );


    // =================================================
    // START ASSESSMENT
    // =================================================

    startBtn.addEventListener(
        "click",
        startAssessment
    );


    function startAssessment() {

        startScreen.classList.add("hidden");

        quizScreen.classList.remove("hidden");

        currentSubjectIndex = 0;

        currentQuestionIndex = 0;

        timeLeft = 600;

        renderQuestion();

        startTimer();

    }


    // =================================================
    // RENDER QUESTION
    // =================================================

    function renderQuestion() {

        const subject =
            subjects[currentSubjectIndex];

        const questions =
            assessmentData[subject];

        const question =
            questions[currentQuestionIndex];


        subjectTitle.textContent =
            subject;


        questionText.textContent =
            question.question;


        questionCounter.textContent =
            `Question ${currentQuestionIndex + 1} of ${questions.length}`;


        const progress =
            ((currentQuestionIndex + 1) /
                questions.length) * 100;


        progressPercent.textContent =
            `${Math.round(progress)}%`;


        progressFill.style.width =
            `${progress}%`;


        optionsContainer.innerHTML = "";


        question.options.forEach(
            (optionText, index) => {

                const option =
                    document.createElement("div");

                option.className =
                    "option";


                if (
                    selectedAnswers[subject]
                    [currentQuestionIndex]
                    === index
                ) {

                    option.classList.add(
                        "selected"
                    );

                }


                const letter =
                    document.createElement("span");

                letter.className =
                    "option-letter";

                letter.textContent =
                    String.fromCharCode(
                        65 + index
                    );


                const text =
                    document.createElement("span");

                text.className =
                    "option-text";

                text.textContent =
                    optionText;


                option.appendChild(letter);

                option.appendChild(text);


                option.addEventListener(
                    "click",
                    () => {

                        selectedAnswers[subject]
                        [currentQuestionIndex]
                            = index;

                        renderQuestion();

                    }
                );


                optionsContainer.appendChild(
                    option
                );

            }
        );


        updateNavigation();

    }


    // =================================================
    // NAVIGATION
    // =================================================

    function updateNavigation() {

        previousBtn.style.visibility =
            currentQuestionIndex === 0 &&
            currentSubjectIndex === 0
                ? "hidden"
                : "visible";


        const lastQuestion =
            currentQuestionIndex ===
            assessmentData[
                subjects[currentSubjectIndex]
            ].length - 1;


        const lastSubject =
            currentSubjectIndex ===
            subjects.length - 1;


        if (lastQuestion && lastSubject) {

            nextBtn.classList.add("hidden");

            submitBtn.classList.remove("hidden");

        } else {

            nextBtn.classList.remove("hidden");

            submitBtn.classList.add("hidden");

        }

    }


    // =================================================
    // NEXT
    // =================================================

    nextBtn.addEventListener(
        "click",
        () => {

            const subject =
                subjects[currentSubjectIndex];


            const lastQuestion =
                currentQuestionIndex ===
                assessmentData[subject].length - 1;


            if (!lastQuestion) {

                currentQuestionIndex++;

            } else {

                if (
                    currentSubjectIndex <
                    subjects.length - 1
                ) {

                    currentSubjectIndex++;

                    currentQuestionIndex = 0;

                }

            }


            renderQuestion();

        }
    );


    // =================================================
    // PREVIOUS
    // =================================================

    previousBtn.addEventListener(
        "click",
        () => {

            if (currentQuestionIndex > 0) {

                currentQuestionIndex--;

            } else if (
                currentSubjectIndex > 0
            ) {

                currentSubjectIndex--;

                currentQuestionIndex =
                    assessmentData[
                        subjects[
                            currentSubjectIndex
                        ]
                    ].length - 1;

            }


            renderQuestion();

        }
    );


    // =================================================
    // SUBMIT
    // =================================================

    submitBtn.addEventListener(
        "click",
        () => {

            const confirmSubmit =
                confirm(
                    "Are you sure you want to submit the assessment?"
                );


            if (confirmSubmit) {

                finishAssessment();

            }

        }
    );


    // =================================================
    // CALCULATE RESULT
    // =================================================

    function finishAssessment() {

        clearInterval(timerInterval);


        let totalCorrect = 0;

        let totalQuestions = 0;


        subjects.forEach(subject => {

            let score = 0;

            const questions =
                assessmentData[subject];


            questions.forEach(
                (question, index) => {

                    totalQuestions++;


                    if (
                        selectedAnswers[subject][index]
                        === question.answer
                    ) {

                        score++;

                        totalCorrect++;

                    }

                }
            );


            subjectScores[subject] =
                score;

        });


        const totalScore =
            totalCorrect;


        const wrongAnswers =
            totalQuestions - totalCorrect;


        const percentage =
            Math.round(
                (totalCorrect /
                    totalQuestions) * 100
            );


        quizScreen.classList.add("hidden");

        resultScreen.classList.remove("hidden");


        document.getElementById("score")
            .textContent =
            totalScore;


        document.getElementById("correctAnswers")
            .textContent =
            totalCorrect;


        document.getElementById("wrongAnswers")
            .textContent =
            wrongAnswers;


        document.getElementById("percentage")
            .textContent =
            `${percentage}%`;


        showResultMessage(
            percentage
        );


        renderSubjectResults();

    }


    // =================================================
    // RESULT MESSAGE
    // =================================================

    function showResultMessage(
        percentage
    ) {

        const message =
            document.getElementById(
                "resultMessage"
            );


        if (percentage >= 80) {

            message.textContent =
                "Excellent! You have done a fantastic job.";

        } else if (percentage >= 60) {

            message.textContent =
                "Great work! Keep learning and improving.";

        } else if (percentage >= 40) {

            message.textContent =
                "Good effort! Practice more to improve your score.";

        } else {

            message.textContent =
                "Keep practicing. Every attempt helps you learn.";

        }

    }


    // =================================================
    // SUBJECT RESULTS
    // =================================================

    function renderSubjectResults() {

        const container =
            document.getElementById(
                "subjectResultsContainer"
            );


        container.innerHTML = "";


        subjects.forEach(subject => {

            const total =
                assessmentData[subject].length;

            const score =
                subjectScores[subject];


            const item =
                document.createElement("div");


            item.className =
                "subject-result";


            item.innerHTML = `

                <span>
                    ${subject}
                </span>

                <strong>
                    ${score} / ${total}
                </strong>

            `;


            container.appendChild(item);

        });

    }


    // =================================================
    // TIMER
    // =================================================

    function startTimer() {

        clearInterval(timerInterval);


        updateTimer();


        timerInterval =
            setInterval(() => {

                timeLeft--;


                updateTimer();


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    alert(
                        "Time is up! Your assessment will be submitted."
                    );

                    finishAssessment();

                }

            }, 1000);

    }


    function updateTimer() {

        const minutes =
            Math.floor(
                timeLeft / 60
            );

        const seconds =
            timeLeft % 60;


        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (timeLeft <= 60) {

            timer.parentElement
                .classList.add("warning");

        } else {

            timer.parentElement
                .classList.remove("warning");

        }

    }


    // =================================================
    // RESTART
    // =================================================

    restartBtn.addEventListener(
        "click",
        () => {

            subjects.forEach(subject => {

                selectedAnswers[subject] =
                    new Array(
                        assessmentData[subject].length
                    ).fill(null);

                subjectScores[subject] = 0;

            });


            currentSubjectIndex = 0;

            currentQuestionIndex = 0;

            timeLeft = 600;


            resultScreen.classList.add(
                "hidden"
            );

            startScreen.classList.remove(
                "hidden"
            );

        }
    );


});