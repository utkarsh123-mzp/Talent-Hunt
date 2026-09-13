/* =========================================================
   TALENTHUNT — CLASS 5 ASSESSMENT
   assessment-class-5.js

   Features:
   ✓ Assessment selection
   ✓ 10 questions per assessment
   ✓ Multiple choice options
   ✓ Next / Previous
   ✓ Question progress
   ✓ 10 minute timer
   ✓ Auto submit when time ends
   ✓ Score calculation
   ✓ Accuracy calculation
   ✓ Result message
   ✓ Retake assessment
   ✓ Talent score storage
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const assessmentCards =
        document.querySelectorAll(".assessment-card");

    const startButtons =
        document.querySelectorAll(".start-assessment-btn");

    const assessmentSelection =
        document.querySelector(".assessment-selection");

    const quizSection =
        document.getElementById("quizSection");

    const resultSection =
        document.getElementById("resultSection");

    const quizTitle =
        document.getElementById("quizTitle");

    const timerElement =
        document.getElementById("timer");

    const currentQuestionElement =
        document.getElementById("currentQuestion");

    const totalQuestionsElement =
        document.getElementById("totalQuestions");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const progressFill =
        document.getElementById("progressFill");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const scoreElement =
        document.getElementById("score");

    const correctAnswersElement =
        document.getElementById("correctAnswers");

    const wrongAnswersElement =
        document.getElementById("wrongAnswers");

    const accuracyElement =
        document.getElementById("accuracy");

    const resultMessage =
        document.getElementById("resultMessage");

    const retakeBtn =
        document.getElementById("retakeBtn");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");


    /* =====================================================
       QUIZ DATA
    ====================================================== */

    const assessments = {

        maths: {

            title: "Maths Challenge",

            questions: [

                {
                    question: "What is 25 + 17?",
                    options: [
                        "32",
                        "42",
                        "52",
                        "40"
                    ],
                    answer: 1
                },

                {
                    question: "What is 8 × 7?",
                    options: [
                        "54",
                        "56",
                        "64",
                        "48"
                    ],
                    answer: 1
                },

                {
                    question: "What is 100 − 45?",
                    options: [
                        "45",
                        "50",
                        "55",
                        "65"
                    ],
                    answer: 2
                },

                {
                    question: "Which number is the greatest?",
                    options: [
                        "56",
                        "65",
                        "46",
                        "60"
                    ],
                    answer: 1
                },

                {
                    question: "How many sides does a rectangle have?",
                    options: [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    answer: 1
                },

                {
                    question: "What is half of 50?",
                    options: [
                        "20",
                        "25",
                        "30",
                        "35"
                    ],
                    answer: 1
                },

                {
                    question: "What is 9 × 6?",
                    options: [
                        "45",
                        "54",
                        "63",
                        "56"
                    ],
                    answer: 1
                },

                {
                    question: "Which number comes after 999?",
                    options: [
                        "100",
                        "1000",
                        "9999",
                        "990"
                    ],
                    answer: 1
                },

                {
                    question: "How many minutes are there in 1 hour?",
                    options: [
                        "30",
                        "45",
                        "60",
                        "100"
                    ],
                    answer: 2
                },

                {
                    question: "What is 5 × 5 + 5?",
                    options: [
                        "25",
                        "30",
                        "35",
                        "20"
                    ],
                    answer: 1
                }

            ]

        },


        science: {

            title: "Science Challenge",

            questions: [

                {
                    question: "Which organ helps us to breathe?",
                    options: [
                        "Heart",
                        "Lungs",
                        "Brain",
                        "Stomach"
                    ],
                    answer: 1
                },

                {
                    question: "Which planet do we live on?",
                    options: [
                        "Mars",
                        "Venus",
                        "Earth",
                        "Jupiter"
                    ],
                    answer: 2
                },

                {
                    question: "What do plants need to make food?",
                    options: [
                        "Sunlight",
                        "Plastic",
                        "Metal",
                        "Sand only"
                    ],
                    answer: 0
                },

                {
                    question: "Which animal is known as the king of the jungle?",
                    options: [
                        "Tiger",
                        "Lion",
                        "Elephant",
                        "Bear"
                    ],
                    answer: 1
                },

                {
                    question: "Water freezes at what temperature?",
                    options: [
                        "0°C",
                        "10°C",
                        "50°C",
                        "100°C"
                    ],
                    answer: 0
                },

                {
                    question: "Which sense organ helps us see?",
                    options: [
                        "Ear",
                        "Nose",
                        "Eye",
                        "Tongue"
                    ],
                    answer: 2
                },

                {
                    question: "What is the main source of energy for Earth?",
                    options: [
                        "Moon",
                        "Sun",
                        "Stars",
                        "Wind"
                    ],
                    answer: 1
                },

                {
                    question: "Which gas do humans breathe in?",
                    options: [
                        "Oxygen",
                        "Carbon dioxide",
                        "Helium",
                        "Hydrogen"
                    ],
                    answer: 0
                },

                {
                    question: "Which part of a plant absorbs water?",
                    options: [
                        "Flower",
                        "Leaf",
                        "Root",
                        "Fruit"
                    ],
                    answer: 2
                },

                {
                    question: "Which one is a source of light?",
                    options: [
                        "Sun",
                        "Stone",
                        "Table",
                        "Book"
                    ],
                    answer: 0
                }

            ]

        },


        logic: {

            title: "Logical Thinking",

            questions: [

                {
                    question: "What number comes next: 2, 4, 6, 8, ?",
                    options: [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    answer: 1
                },

                {
                    question: "Which one does not belong?",
                    options: [
                        "Apple",
                        "Mango",
                        "Carrot",
                        "Banana"
                    ],
                    answer: 2
                },

                {
                    question: "If today is Monday, what day comes after tomorrow?",
                    options: [
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    answer: 2
                },

                {
                    question: "What comes next: 5, 10, 15, 20, ?",
                    options: [
                        "21",
                        "25",
                        "30",
                        "35"
                    ],
                    answer: 1
                },

                {
                    question: "Which shape has no corners?",
                    options: [
                        "Square",
                        "Triangle",
                        "Circle",
                        "Rectangle"
                    ],
                    answer: 2
                },

                {
                    question: "If CAT has 3 letters, how many letters does DOG have?",
                    options: [
                        "2",
                        "3",
                        "4",
                        "5"
                    ],
                    answer: 1
                },

                {
                    question: "Which number is different?",
                    options: [
                        "2",
                        "4",
                        "6",
                        "9"
                    ],
                    answer: 3
                },

                {
                    question: "Complete the pattern: A, B, C, D, ?",
                    options: [
                        "E",
                        "F",
                        "G",
                        "Z"
                    ],
                    answer: 0
                },

                {
                    question: "Which is the smallest number?",
                    options: [
                        "15",
                        "8",
                        "12",
                        "20"
                    ],
                    answer: 1
                },

                {
                    question: "If 1 + 1 = 2, then 2 + 2 = ?",
                    options: [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    answer: 1
                }

            ]

        },


        creativity: {

            title: "Creativity Challenge",

            questions: [

                {
                    question: "Which activity uses imagination the most?",
                    options: [
                        "Drawing a new character",
                        "Counting numbers",
                        "Copying text",
                        "Sleeping"
                    ],
                    answer: 0
                },

                {
                    question: "Which can be used to create a painting?",
                    options: [
                        "Colors",
                        "Shoes",
                        "Clock",
                        "Plate"
                    ],
                    answer: 0
                },

                {
                    question: "What is a good way to create a new story?",
                    options: [
                        "Use imagination",
                        "Never think",
                        "Copy everything",
                        "Avoid ideas"
                    ],
                    answer: 0
                },

                {
                    question: "Which activity can improve creativity?",
                    options: [
                        "Drawing",
                        "Ignoring ideas",
                        "Doing nothing",
                        "Avoiding questions"
                    ],
                    answer: 0
                },

                {
                    question: "What can you create with paper and colors?",
                    options: [
                        "Artwork",
                        "Electricity",
                        "Water",
                        "Sound"
                    ],
                    answer: 0
                },

                {
                    question: "What is imagination?",
                    options: [
                        "Creating ideas in your mind",
                        "Counting money",
                        "Running",
                        "Sleeping"
                    ],
                    answer: 0
                },

                {
                    question: "Which is a creative activity?",
                    options: [
                        "Writing a story",
                        "Standing still",
                        "Closing a book",
                        "Doing nothing"
                    ],
                    answer: 0
                },

                {
                    question: "What helps when solving a problem creatively?",
                    options: [
                        "New ideas",
                        "Giving up",
                        "Ignoring it",
                        "Avoiding thinking"
                    ],
                    answer: 0
                },

                {
                    question: "Which can be turned into a story?",
                    options: [
                        "Almost anything",
                        "Only books",
                        "Only movies",
                        "Nothing"
                    ],
                    answer: 0
                },

                {
                    question: "Creativity helps us to...",
                    options: [
                        "Generate new ideas",
                        "Stop thinking",
                        "Avoid learning",
                        "Forget everything"
                    ],
                    answer: 0
                }

            ]

        },


        communication: {

            title: "Communication Skills",

            questions: [

                {
                    question: "Which word is a greeting?",
                    options: [
                        "Hello",
                        "Run",
                        "Book",
                        "Blue"
                    ],
                    answer: 0
                },

                {
                    question: "Which sentence is polite?",
                    options: [
                        "Give me that!",
                        "Please give me that.",
                        "Give!",
                        "I want it!"
                    ],
                    answer: 1
                },

                {
                    question: "What do we use to listen?",
                    options: [
                        "Eyes",
                        "Ears",
                        "Hands",
                        "Feet"
                    ],
                    answer: 1
                },

                {
                    question: "What is the opposite of 'hot'?",
                    options: [
                        "Warm",
                        "Cold",
                        "Big",
                        "Fast"
                    ],
                    answer: 1
                },

                {
                    question: "Which word is a noun?",
                    options: [
                        "School",
                        "Run",
                        "Quickly",
                        "Jump"
                    ],
                    answer: 0
                },

                {
                    question: "Which sentence is correct?",
                    options: [
                        "She are happy.",
                        "She is happy.",
                        "She am happy.",
                        "She be happy."
                    ],
                    answer: 1
                },

                {
                    question: "What should we do when someone is speaking?",
                    options: [
                        "Listen",
                        "Shout",
                        "Run",
                        "Sleep"
                    ],
                    answer: 0
                },

                {
                    question: "What is the opposite of 'big'?",
                    options: [
                        "Large",
                        "Small",
                        "Tall",
                        "Wide"
                    ],
                    answer: 1
                },

                {
                    question: "Which word means the same as happy?",
                    options: [
                        "Sad",
                        "Angry",
                        "Joyful",
                        "Tired"
                    ],
                    answer: 2
                },

                {
                    question: "Which punctuation mark ends a question?",
                    options: [
                        ".",
                        ",",
                        "?",
                        "!"
                    ],
                    answer: 2
                }

            ]

        },


        gk: {

            title: "General Knowledge",

            questions: [

                {
                    question: "What is the capital of India?",
                    options: [
                        "Mumbai",
                        "New Delhi",
                        "Kolkata",
                        "Chennai"
                    ],
                    answer: 1
                },

                {
                    question: "How many days are there in a week?",
                    options: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    answer: 2
                },

                {
                    question: "Which is the largest ocean?",
                    options: [
                        "Indian Ocean",
                        "Atlantic Ocean",
                        "Pacific Ocean",
                        "Arctic Ocean"
                    ],
                    answer: 2
                },

                {
                    question: "How many colors are there in a rainbow?",
                    options: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    answer: 2
                },

                {
                    question: "Which animal is the largest land animal?",
                    options: [
                        "Elephant",
                        "Lion",
                        "Horse",
                        "Tiger"
                    ],
                    answer: 0
                },

                {
                    question: "Which planet is known as the Red Planet?",
                    options: [
                        "Earth",
                        "Mars",
                        "Venus",
                        "Saturn"
                    ],
                    answer: 1
                },

                {
                    question: "How many months are there in a year?",
                    options: [
                        "10",
                        "11",
                        "12",
                        "13"
                    ],
                    answer: 2
                },

                {
                    question: "Which is the fastest land animal?",
                    options: [
                        "Lion",
                        "Horse",
                        "Cheetah",
                        "Elephant"
                    ],
                    answer: 2
                },

                {
                    question: "Which shape has three sides?",
                    options: [
                        "Circle",
                        "Square",
                        "Triangle",
                        "Rectangle"
                    ],
                    answer: 2
                },

                {
                    question: "Which device is used to call someone?",
                    options: [
                        "Telephone",
                        "Chair",
                        "Table",
                        "Bottle"
                    ],
                    answer: 0
                }

            ]

        }

    };


    /* =====================================================
       QUIZ STATE
    ====================================================== */

    let currentAssessment = null;

    let currentQuestionIndex = 0;

    let userAnswers = [];

    let timer = null;

    let timeLeft = 600;

    let quizFinished = false;



    /* =====================================================
       START ASSESSMENT
    ====================================================== */

    startButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const assessmentName =
                button.dataset.start;

            startAssessment(assessmentName);

        });

    });



    function startAssessment(type) {

        if (!assessments[type]) {

            console.error(
                "Assessment not found:",
                type
            );

            return;
        }


        currentAssessment = assessments[type];

        currentQuestionIndex = 0;

        userAnswers =
            new Array(
                currentAssessment.questions.length
            ).fill(null);

        quizFinished = false;

        timeLeft = 600;


        /* Update quiz title */

        if (quizTitle) {

            quizTitle.textContent =
                currentAssessment.title;

        }


        /* Total questions */

        if (totalQuestionsElement) {

            totalQuestionsElement.textContent =
                currentAssessment.questions.length;

        }


        /* Hide selection */

        if (assessmentSelection) {

            assessmentSelection.hidden = true;

        }


        /* Hide result */

        if (resultSection) {

            resultSection.hidden = true;

        }


        /* Show quiz */

        if (quizSection) {

            quizSection.hidden = false;

        }


        /* Start timer */

        startTimer();


        /* Show question */

        showQuestion();


        /* Scroll */

        quizSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }



    /* =====================================================
       SHOW QUESTION
    ====================================================== */

    function showQuestion() {

        if (!currentAssessment) {
            return;
        }


        const question =
            currentAssessment.questions[
                currentQuestionIndex
            ];


        const total =
            currentAssessment.questions.length;


        const questionNumber =
            currentQuestionIndex + 1;


        /* Question number */

        if (currentQuestionElement) {

            currentQuestionElement.textContent =
                questionNumber;

        }


        /* Question */

        if (questionText) {

            questionText.textContent =
                question.question;

        }


        /* Progress */

        const percentage =
            Math.round(
                (questionNumber / total) * 100
            );


        if (progressPercentage) {

            progressPercentage.textContent =
                `${percentage}%`;

        }


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;

        }


        /* Clear options */

        if (!optionsContainer) {
            return;
        }


        optionsContainer.innerHTML = "";


        /* Create options */

        question.options.forEach(
            (optionText, index) => {

                const button =
                    document.createElement("button");


                button.type = "button";

                button.className = "option";


                if (
                    userAnswers[
                        currentQuestionIndex
                    ] === index
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                const letter =
                    String.fromCharCode(
                        65 + index
                    );


                button.innerHTML = `
                    <span class="option-letter">
                        ${letter}
                    </span>

                    <span class="option-text">
                        ${optionText}
                    </span>
                `;


                button.addEventListener(
                    "click",
                    () => {

                        selectAnswer(index);

                    }
                );


                optionsContainer.appendChild(
                    button
                );

            }
        );


        /* Previous button */

        if (previousBtn) {

            previousBtn.disabled =
                currentQuestionIndex === 0;

            previousBtn.style.opacity =
                currentQuestionIndex === 0
                    ? "0.5"
                    : "1";

        }


        /* Next / Submit */

        const isLastQuestion =
            currentQuestionIndex === total - 1;


        if (nextBtn) {

            nextBtn.hidden =
                isLastQuestion;

        }


        if (submitBtn) {

            submitBtn.hidden =
                !isLastQuestion;

        }

    }



    /* =====================================================
       SELECT ANSWER
    ====================================================== */

    function selectAnswer(answerIndex) {

        if (quizFinished) {
            return;
        }


        userAnswers[
            currentQuestionIndex
        ] = answerIndex;


        const options =
            optionsContainer.querySelectorAll(
                ".option"
            );


        options.forEach(
            (option, index) => {

                option.classList.toggle(
                    "selected",
                    index === answerIndex
                );

            }
        );

    }



    /* =====================================================
       NEXT QUESTION
    ====================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                if (!currentAssessment) {
                    return;
                }


                if (
                    userAnswers[
                        currentQuestionIndex
                    ] === null
                ) {

                    showNotification(
                        "Please select an answer first."
                    );

                    return;

                }


                if (
                    currentQuestionIndex <
                    currentAssessment.questions.length - 1
                ) {

                    currentQuestionIndex++;

                    showQuestion();

                }

            }
        );

    }



    /* =====================================================
       PREVIOUS QUESTION
    ====================================================== */

    if (previousBtn) {

        previousBtn.addEventListener(
            "click",
            () => {

                if (
                    currentQuestionIndex > 0
                ) {

                    currentQuestionIndex--;

                    showQuestion();

                }

            }
        );

    }



    /* =====================================================
       SUBMIT ASSESSMENT
    ====================================================== */

    if (submitBtn) {

        submitBtn.addEventListener(
            "click",
            () => {

                submitAssessment();

            }
        );

    }



    function submitAssessment() {

        if (!currentAssessment) {
            return;
        }


        /* Check unanswered questions */

        const unanswered =
            userAnswers.filter(
                answer => answer === null
            ).length;


        if (unanswered > 0) {

            const shouldSubmit =
                confirm(
                    `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
                );


            if (!shouldSubmit) {
                return;
            }

        }


        quizFinished = true;


        stopTimer();


        calculateResult();

    }



    /* =====================================================
       CALCULATE RESULT
    ====================================================== */

    function calculateResult() {

        const questions =
            currentAssessment.questions;


        let correct = 0;


        questions.forEach(
            (question, index) => {

                if (
                    userAnswers[index] ===
                    question.answer
                ) {

                    correct++;

                }

            }
        );


        const total =
            questions.length;


        const wrong =
            total - correct;


        const accuracy =
            Math.round(
                (correct / total) * 100
            );


        /* Update result UI */

        if (scoreElement) {

            scoreElement.textContent =
                correct;

        }


        if (correctAnswersElement) {

            correctAnswersElement.textContent =
                correct;

        }


        if (wrongAnswersElement) {

            wrongAnswersElement.textContent =
                wrong;

        }


        if (accuracyElement) {

            accuracyElement.textContent =
                `${accuracy}%`;

        }


        /* Result message */

        let message = "";


        if (accuracy >= 90) {

            message =
                "Outstanding! You are a super learner! 🌟";

        } else if (accuracy >= 70) {

            message =
                "Excellent work! Keep learning and growing! 🚀";

        } else if (accuracy >= 50) {

            message =
                "Good effort! Practice a little more and you can do even better! 💪";

        } else {

            message =
                "Great attempt! Keep practicing and never stop learning! 🌱";

        }


        if (resultMessage) {

            resultMessage.textContent =
                message;

        }


        /* Save score */

        saveTalentScore(
            currentAssessment.title,
            correct,
            total,
            accuracy
        );


        /* Hide quiz */

        if (quizSection) {

            quizSection.hidden = true;

        }


        /* Show result */

        if (resultSection) {

            resultSection.hidden = false;

        }


        /* Scroll */

        resultSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }



    /* =====================================================
       TIMER
    ====================================================== */

    function startTimer() {

        stopTimer();


        updateTimer();


        timer =
            setInterval(
                () => {

                    timeLeft--;


                    updateTimer();


                    if (timeLeft <= 0) {

                        stopTimer();

                        quizFinished = true;

                        showNotification(
                            "Time is up! Your assessment will be submitted."
                        );


                        setTimeout(
                            () => {

                                calculateResult();

                            },
                            800
                        );

                    }

                },
                1000
            );

    }



    function stopTimer() {

        if (timer) {

            clearInterval(timer);

            timer = null;

        }

    }



    function updateTimer() {

        if (!timerElement) {
            return;
        }


        const minutes =
            Math.floor(
                timeLeft / 60
            );


        const seconds =
            timeLeft % 60;


        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        /* Warning */

        if (timeLeft <= 60) {

            timerElement.style.color =
                "#dc2626";

        } else {

            timerElement.style.color =
                "";

        }

    }



    /* =====================================================
       RETAKE
    ====================================================== */

    if (retakeBtn) {

        retakeBtn.addEventListener(
            "click",
            () => {

                if (!currentAssessment) {
                    return;
                }


                const type =
                    Object.keys(assessments)
                        .find(
                            key =>
                                assessments[key] ===
                                currentAssessment
                        );


                if (type) {

                    startAssessment(type);

                }

            }
        );

    }



    /* =====================================================
       SAVE TALENT SCORE
    ====================================================== */

    function saveTalentScore(
        assessmentName,
        score,
        total,
        accuracy
    ) {

        const savedScores =
            JSON.parse(
                localStorage.getItem(
                    "talentHuntClass5Scores"
                )
            ) || [];


        savedScores.push({

            assessment:
                assessmentName,

            score:
                score,

            total:
                total,

            accuracy:
                accuracy,

            date:
                new Date().toISOString()

        });


        localStorage.setItem(
            "talentHuntClass5Scores",
            JSON.stringify(savedScores)
        );


        /* Calculate overall talent score */

        const totalScore =
            savedScores.reduce(
                (sum, item) =>
                    sum + item.accuracy,
                0
            );


        const overallScore =
            Math.round(
                totalScore /
                savedScores.length
            );


        localStorage.setItem(
            "talentHuntClass5TalentScore",
            overallScore
        );

    }



    /* =====================================================
       NOTIFICATION
    ====================================================== */

    function showNotification(message) {

        const oldNotification =
            document.querySelector(
                ".assessment-notification"
            );


        if (oldNotification) {

            oldNotification.remove();

        }


        const notification =
            document.createElement("div");


        notification.className =
            "assessment-notification";


        notification.innerHTML = `
            <i class="ph ph-info"></i>
            <span>${message}</span>
        `;


        notification.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 25px;
            transform: translate(-50%, 20px);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 13px 18px;
            border-radius: 12px;
            background: #172033;
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 15px 35px rgba(15,23,42,0.2);
            opacity: 0;
            transition: 0.3s ease;
        `;


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(() => {

            notification.style.opacity =
                "1";

            notification.style.transform =
                "translate(-50%, 0)";

        });


        setTimeout(() => {

            notification.style.opacity =
                "0";

            notification.style.transform =
                "translate(-50%, 20px)";


            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 2500);

    }



    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle(
                    "mobile-active"
                );


                const isOpen =
                    navMenu.classList.contains(
                        "mobile-active"
                    );


                menuToggle.innerHTML =
                    isOpen
                        ? '<i class="ph ph-x"></i>'
                        : '<i class="ph ph-list"></i>';

            }
        );

    }



    /* =====================================================
       NAVIGATION LINK CLOSE
    ====================================================== */

    document.querySelectorAll(
        ".nav-menu a"
    ).forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                navMenu?.classList.remove(
                    "mobile-active"
                );


                if (menuToggle) {

                    menuToggle.innerHTML =
                        '<i class="ph ph-list"></i>';

                }

            }
        );

    });



    /* =====================================================
       PAGE CLEANUP
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            stopTimer();

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    if (quizSection) {

        quizSection.hidden = true;

    }


    if (resultSection) {

        resultSection.hidden = true;

    }


    console.log(
        "TalentHunt Class 5 Assessment loaded successfully."
    );

});