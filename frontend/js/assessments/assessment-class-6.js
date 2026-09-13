/* =========================================================
   CLASS 6 ASSESSMENT
   TalentHunt
========================================================= */


/* =========================================================
   SUBJECT DATA
========================================================= */

const assessmentData = {

    mathematics: {
        name: "Mathematics",
        icon: "ph-calculator",
        time: 15,

        questions: [
            {
                question: "What is 25 + 37?",
                options: ["52", "62", "72", "82"],
                answer: 1
            },
            {
                question: "What is 8 × 7?",
                options: ["54", "56", "64", "48"],
                answer: 1
            },
            {
                question: "Which of the following is a prime number?",
                options: ["12", "15", "17", "21"],
                answer: 2
            },
            {
                question: "What is 100 ÷ 10?",
                options: ["5", "10", "20", "25"],
                answer: 1
            },
            {
                question: "What is the place value of 5 in 5,432?",
                options: ["5", "50", "500", "5000"],
                answer: 3
            },
            {
                question: "Which fraction is equal to 1/2?",
                options: ["2/3", "3/6", "4/5", "5/8"],
                answer: 1
            },
            {
                question: "How many sides does a hexagon have?",
                options: ["5", "6", "7", "8"],
                answer: 1
            },
            {
                question: "What is the perimeter of a square with side 5 cm?",
                options: ["10 cm", "15 cm", "20 cm", "25 cm"],
                answer: 2
            },
            {
                question: "Which number is the smallest?",
                options: ["0.5", "0.05", "0.55", "5"],
                answer: 1
            },
            {
                question: "What is 15% of 100?",
                options: ["10", "15", "20", "25"],
                answer: 1
            }
        ]
    },


    science: {
        name: "Science",
        icon: "ph-flask",
        time: 15,

        questions: [
            {
                question: "Which organ helps us to breathe?",
                options: ["Heart", "Lungs", "Stomach", "Brain"],
                answer: 1
            },
            {
                question: "Which is the main source of energy for Earth?",
                options: ["Moon", "Sun", "Stars", "Wind"],
                answer: 1
            },
            {
                question: "Water changes into vapour by which process?",
                options: ["Freezing", "Melting", "Evaporation", "Condensation"],
                answer: 2
            },
            {
                question: "Which part of a plant absorbs water?",
                options: ["Flower", "Leaf", "Root", "Fruit"],
                answer: 2
            },
            {
                question: "Which gas do humans need for breathing?",
                options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
                answer: 1
            },
            {
                question: "Which is a natural source of light?",
                options: ["Bulb", "Candle", "Sun", "Torch"],
                answer: 2
            },
            {
                question: "Which material is attracted by a magnet?",
                options: ["Wood", "Plastic", "Iron", "Glass"],
                answer: 2
            },
            {
                question: "What is the boiling point of water?",
                options: ["50°C", "75°C", "100°C", "150°C"],
                answer: 2
            },
            {
                question: "Which of these is a living organism?",
                options: ["Stone", "Chair", "Tree", "Table"],
                answer: 2
            },
            {
                question: "Which sense organ helps us to see?",
                options: ["Ear", "Nose", "Eye", "Skin"],
                answer: 2
            }
        ]
    },


    english: {
        name: "English",
        icon: "ph-book-open-text",
        time: 15,

        questions: [
            {
                question: "Choose the correct plural of 'Child'.",
                options: ["Childs", "Children", "Childes", "Childrens"],
                answer: 1
            },
            {
                question: "Choose the correct article: ___ apple a day keeps the doctor away.",
                options: ["A", "An", "The", "No article"],
                answer: 1
            },
            {
                question: "What is the opposite of 'Beautiful'?",
                options: ["Pretty", "Ugly", "Nice", "Good"],
                answer: 1
            },
            {
                question: "Choose the noun in the sentence: 'The boy is playing.'",
                options: ["The", "Boy", "Is", "Playing"],
                answer: 1
            },
            {
                question: "What is the past tense of 'Go'?",
                options: ["Goed", "Going", "Went", "Gone"],
                answer: 2
            },
            {
                question: "Choose the correct spelling.",
                options: ["Beautifull", "Beutiful", "Beautiful", "Beautifol"],
                answer: 2
            },
            {
                question: "Which word is a pronoun?",
                options: ["Run", "Beautiful", "He", "School"],
                answer: 2
            },
            {
                question: "Choose the synonym of 'Happy'.",
                options: ["Sad", "Angry", "Joyful", "Tired"],
                answer: 2
            },
            {
                question: "Complete the sentence: She ___ to school every day.",
                options: ["go", "goes", "going", "gone"],
                answer: 1
            },
            {
                question: "Which punctuation mark is used at the end of a question?",
                options: [".", ",", "!", "?"],
                answer: 3
            }
        ]
    },


    hindi: {
        name: "Hindi",
        icon: "ph-translate",
        time: 15,

        questions: [
            {
                question: "‘विद्यालय’ शब्द का अर्थ क्या है?",
                options: ["घर", "स्कूल", "बाजार", "अस्पताल"],
                answer: 1
            },
            {
                question: "‘सुंदर’ का विलोम शब्द क्या है?",
                options: ["अच्छा", "कुरूप", "मीठा", "बड़ा"],
                answer: 1
            },
            {
                question: "‘जल’ का पर्यायवाची शब्द कौन सा है?",
                options: ["आकाश", "पानी", "अग्नि", "वायु"],
                answer: 1
            },
            {
                question: "‘राम स्कूल जाता है।’ इस वाक्य में संज्ञा कौन है?",
                options: ["राम", "स्कूल", "जाता", "है"],
                answer: 0
            },
            {
                question: "हिंदी वर्णमाला में कितने स्वर माने जाते हैं?",
                options: ["10", "11", "12", "13"],
                answer: 1
            },
            {
                question: "‘दिन’ का विलोम शब्द क्या है?",
                options: ["सुबह", "रात", "शाम", "दोपहर"],
                answer: 1
            },
            {
                question: "‘गाय’ का पुल्लिंग क्या है?",
                options: ["घोड़ा", "बैल", "बकरी", "भैंस"],
                answer: 1
            },
            {
                question: "‘मैं बाजार जा रहा हूँ।’ इसमें सर्वनाम कौन सा है?",
                options: ["बाजार", "जा", "मैं", "रहा"],
                answer: 2
            },
            {
                question: "‘कमल’ शब्द में कितने अक्षर हैं?",
                options: ["2", "3", "4", "5"],
                answer: 1
            },
            {
                question: "‘पृथ्वी’ का पर्यायवाची कौन सा है?",
                options: ["धरती", "आकाश", "सूर्य", "चंद्रमा"],
                answer: 0
            }
        ]
    },


    "social-science": {
        name: "Social Science",
        icon: "ph-globe",
        time: 15,

        questions: [
            {
                question: "Which planet do we live on?",
                options: ["Mars", "Earth", "Jupiter", "Venus"],
                answer: 1
            },
            {
                question: "Which is the largest continent?",
                options: ["Africa", "Europe", "Asia", "Australia"],
                answer: 2
            },
            {
                question: "What is the capital of India?",
                options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
                answer: 2
            },
            {
                question: "Which river is known as one of the major rivers of India?",
                options: ["Nile", "Ganga", "Amazon", "Thames"],
                answer: 1
            },
            {
                question: "Who is known as the Father of the Indian Constitution?",
                options: [
                    "Mahatma Gandhi",
                    "B. R. Ambedkar",
                    "Jawaharlal Nehru",
                    "Sardar Patel"
                ],
                answer: 1
            },
            {
                question: "How many continents are there?",
                options: ["5", "6", "7", "8"],
                answer: 2
            },
            {
                question: "Which direction does the Sun rise from?",
                options: ["West", "North", "South", "East"],
                answer: 3
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
                question: "India is located in which continent?",
                options: ["Europe", "Asia", "Africa", "Australia"],
                answer: 1
            },
            {
                question: "What do we call a group of people living in a particular area?",
                options: ["Community", "Forest", "Mountain", "River"],
                answer: 0
            }
        ]
    },


    computer: {
        name: "Computer",
        icon: "ph-monitor",
        time: 15,

        questions: [
            {
                question: "What is the full form of CPU?",
                options: [
                    "Central Processing Unit",
                    "Computer Personal Unit",
                    "Central Program Unit",
                    "Computer Processing Utility"
                ],
                answer: 0
            },
            {
                question: "Which device is used to type text?",
                options: ["Mouse", "Keyboard", "Monitor", "Printer"],
                answer: 1
            },
            {
                question: "Which device displays information on the screen?",
                options: ["Keyboard", "Mouse", "Monitor", "Speaker"],
                answer: 2
            },
            {
                question: "Which one is an input device?",
                options: ["Monitor", "Printer", "Keyboard", "Speaker"],
                answer: 2
            },
            {
                question: "Which device is used to move the pointer?",
                options: ["Mouse", "Printer", "Monitor", "CPU"],
                answer: 0
            },
            {
                question: "What does WWW stand for?",
                options: [
                    "World Wide Web",
                    "World Web Wide",
                    "Web World Wide",
                    "Wide World Web"
                ],
                answer: 0
            },
            {
                question: "Which of these is an operating system?",
                options: ["Windows", "Google", "YouTube", "Facebook"],
                answer: 0
            },
            {
                question: "Which key is used to delete characters?",
                options: ["Shift", "Delete", "Enter", "Space"],
                answer: 1
            },
            {
                question: "Which device is used to print documents?",
                options: ["Scanner", "Printer", "Mouse", "Monitor"],
                answer: 1
            },
            {
                question: "Which of these is used to store data?",
                options: ["Hard Disk", "Monitor", "Keyboard", "Speaker"],
                answer: 0
            }
        ]
    }

};


/* =========================================================
   VARIABLES
========================================================= */

let currentSubject = null;

let currentQuestionIndex = 0;

let userAnswers = [];

let timerInterval = null;

let timeRemaining = 0;


/*
   Stores completed subject results.

   Example:

   {
       mathematics: {
           score: 8,
           correct: 8,
           wrong: 2,
           percentage: 80
       }
   }
*/

let subjectResults = {};



/* =========================================================
   DOM ELEMENTS
========================================================= */

const subjectScreen =
    document.getElementById("subjectScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const timerElement =
    document.getElementById("timer");

const timerBox =
    document.getElementById("timerBox");

const quizSubjectLabel =
    document.getElementById("quizSubjectLabel");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const questionNumberElement =
    document.getElementById("questionNumber");

const questionTextElement =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const questionButtons =
    document.getElementById("questionButtons");

const quizProgress =
    document.getElementById("quizProgress");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const submitBtn =
    document.getElementById("submitBtn");

const completedCount =
    document.getElementById("completedCount");

const overallProgress =
    document.getElementById("overallProgress");

const resultSubject =
    document.getElementById("resultSubject");

const resultMessage =
    document.getElementById("resultMessage");

const scoreElement =
    document.getElementById("score");

const correctAnswersElement =
    document.getElementById("correctAnswers");

const wrongAnswersElement =
    document.getElementById("wrongAnswers");

const percentageElement =
    document.getElementById("percentage");

const subjectResultList =
    document.getElementById("subjectResultList");

const overallScore =
    document.getElementById("overallScore");

const retryBtn =
    document.getElementById("retryBtn");

const subjectsBtn =
    document.getElementById("subjectsBtn");

const finishBtn =
    document.getElementById("finishBtn");

const backSubjectBtn =
    document.getElementById("backSubjectBtn");

const exitBtn =
    document.getElementById("exitBtn");

const exitModal =
    document.getElementById("exitModal");

const cancelExit =
    document.getElementById("cancelExit");

const confirmExit =
    document.getElementById("confirmExit");



/* =========================================================
   START SUBJECT ASSESSMENT
========================================================= */

function startAssessment(subject) {

    if (!assessmentData[subject]) {
        return;
    }

    currentSubject = subject;

    currentQuestionIndex = 0;

    const questions =
        assessmentData[subject].questions;

    userAnswers =
        new Array(questions.length).fill(null);

    timeRemaining =
        assessmentData[subject].time * 60;


    /* Show quiz */

    subjectScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    /* Subject name */

    quizSubjectLabel.textContent =
        assessmentData[subject].name;


    /* Total questions */

    totalQuestionsElement.textContent =
        questions.length;


    /* Create navigator */

    createQuestionButtons();


    /* Display first question */

    showQuestion();


    /* Start timer */

    startTimer();


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    const subject =
        assessmentData[currentSubject];

    const question =
        subject.questions[currentQuestionIndex];


    /* Question number */

    const questionNumber =
        currentQuestionIndex + 1;

    currentQuestionElement.textContent =
        questionNumber;

    questionNumberElement.textContent =
        questionNumber;


    /* Question text */

    questionTextElement.textContent =
        question.question;


    /* Progress */

    const progress =
        (questionNumber / subject.questions.length) * 100;

    quizProgress.style.width =
        `${progress}%`;


    /* Options */

    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const optionButton =
            document.createElement("button");

        optionButton.className =
            "option";

        optionButton.type =
            "button";


        if (userAnswers[currentQuestionIndex] === index) {

            optionButton.classList.add("selected");

        }


        optionButton.innerHTML = `

            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span class="option-text">
                ${option}
            </span>

        `;


        optionButton.addEventListener(
            "click",
            () => selectOption(index)
        );


        optionsContainer.appendChild(
            optionButton
        );

    });


    /* Previous button */

    previousBtn.disabled =
        currentQuestionIndex === 0;


    /* Last question */

    if (
        currentQuestionIndex ===
        subject.questions.length - 1
    ) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    } else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }


    updateQuestionButtons();

}



/* =========================================================
   SELECT OPTION
========================================================= */

function selectOption(optionIndex) {

    userAnswers[currentQuestionIndex] =
        optionIndex;


    const options =
        document.querySelectorAll(".option");


    options.forEach((option, index) => {

        option.classList.toggle(
            "selected",
            index === optionIndex
        );

    });


    updateQuestionButtons();
}



/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    const total =
        assessmentData[currentSubject]
            .questions.length;


    if (currentQuestionIndex < total - 1) {

        currentQuestionIndex++;

        showQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}



/* =========================================================
   PREVIOUS QUESTION
========================================================= */

function previousQuestion() {

    if (currentQuestionIndex > 0) {

        currentQuestionIndex--;

        showQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}



/* =========================================================
   QUESTION NAVIGATOR
========================================================= */

function createQuestionButtons() {

    questionButtons.innerHTML = "";

    const total =
        assessmentData[currentSubject]
            .questions.length;


    for (let i = 0; i < total; i++) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "question-btn";

        button.textContent =
            i + 1;


        button.addEventListener(
            "click",
            () => {

                currentQuestionIndex = i;

                showQuestion();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        questionButtons.appendChild(button);

    }

}



/* =========================================================
   UPDATE QUESTION BUTTONS
========================================================= */

function updateQuestionButtons() {

    const buttons =
        document.querySelectorAll(
            ".question-btn"
        );


    buttons.forEach((button, index) => {

        button.classList.remove(
            "active",
            "answered"
        );


        if (index === currentQuestionIndex) {

            button.classList.add("active");

        }


        if (userAnswers[index] !== null) {

            button.classList.add("answered");

        }

    });

}



/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    clearInterval(timerInterval);

    updateTimerDisplay();


    timerInterval =
        setInterval(() => {

            timeRemaining--;

            updateTimerDisplay();


            if (timeRemaining <= 0) {

                clearInterval(timerInterval);

                autoSubmitAssessment();

            }

        }, 1000);

}



/* =========================================================
   TIMER DISPLAY
========================================================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeRemaining / 60);

    const seconds =
        timeRemaining % 60;


    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    /* Warning */

    if (timeRemaining <= 60) {

        timerBox.classList.add("warning");

    } else {

        timerBox.classList.remove("warning");

    }

}



/* =========================================================
   SUBMIT ASSESSMENT
========================================================= */

function submitAssessment() {

    clearInterval(timerInterval);


    const questions =
        assessmentData[currentSubject]
            .questions;


    let correct = 0;


    questions.forEach((question, index) => {

        if (
            userAnswers[index] ===
            question.answer
        ) {

            correct++;

        }

    });


    const total =
        questions.length;

    const wrong =
        total - correct;

    const percentage =
        Math.round((correct / total) * 100);


    /* Save result */

    subjectResults[currentSubject] = {

        score: correct,

        correct: correct,

        wrong: wrong,

        percentage: percentage

    };


    /* Show result */

    showResult(
        correct,
        wrong,
        percentage
    );


    /* Update progress */

    updateOverallProgress();

}



/* =========================================================
   AUTO SUBMIT
========================================================= */

function autoSubmitAssessment() {

    submitAssessment();

}



/* =========================================================
   SHOW RESULT
========================================================= */

function showResult(
    correct,
    wrong,
    percentage
) {

    quizScreen.classList.add("hidden");

    subjectScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    resultSubject.textContent =
        assessmentData[currentSubject].name;


    scoreElement.textContent =
        correct;


    correctAnswersElement.textContent =
        correct;


    wrongAnswersElement.textContent =
        wrong;


    percentageElement.textContent =
        `${percentage}%`;


    /* Result message */

    if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent work! Keep up the great performance.";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "Good job! Keep practicing to improve further.";

    } else if (percentage >= 40) {

        resultMessage.textContent =
            "Nice effort! A little more practice will help.";

    } else {

        resultMessage.textContent =
            "Keep learning and practicing. You can do better!";

    }


    updateSubjectResultList();

    updateOverallScore();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   UPDATE OVERALL PROGRESS
========================================================= */

function updateOverallProgress() {

    const totalSubjects =
        Object.keys(assessmentData).length;

    const completedSubjects =
        Object.keys(subjectResults).length;


    completedCount.textContent =
        completedSubjects;


    const progress =
        (completedSubjects / totalSubjects) * 100;


    overallProgress.style.width =
        `${progress}%`;



    /* Add completed class */

    Object.keys(subjectResults).forEach(
        subject => {

            const card =
                document.getElementById(
                    `subject-${subject}`
                );


            if (card) {

                card.classList.add(
                    "completed"
                );

            }

        }
    );

}



/* =========================================================
   UPDATE SUBJECT RESULT LIST
========================================================= */

function updateSubjectResultList() {

    subjectResultList.innerHTML = "";


    Object.keys(assessmentData)
        .forEach(subject => {

            const data =
                assessmentData[subject];


            const result =
                subjectResults[subject];


            const item =
                document.createElement("div");

            item.className =
                "subject-result-item";


            let scoreText =
                "Not attempted";

            let statusText =
                "Pending";

            let statusClass =
                "pending";


            if (result) {

                scoreText =
                    `${result.score}/${data.questions.length} (${result.percentage}%)`;

                statusText =
                    "Completed";

                statusClass =
                    "completed";

            }


            item.innerHTML = `

                <div class="subject-result-left">

                    <i class="ph ${data.icon}"></i>

                    <span>
                        ${data.name}
                    </span>

                </div>


                <div class="subject-result-right">

                    <span class="subject-result-score">
                        ${scoreText}
                    </span>

                    <span
                        class="subject-result-status ${statusClass}">
                        ${statusText}
                    </span>

                </div>

            `;


            subjectResultList.appendChild(item);

        });

}



/* =========================================================
   UPDATE OVERALL SCORE
========================================================= */

function updateOverallScore() {

    const results =
        Object.values(subjectResults);


    if (results.length === 0) {

        overallScore.textContent =
            "0%";

        return;

    }


    let totalPercentage = 0;


    results.forEach(result => {

        totalPercentage +=
            result.percentage;

    });


    const average =
        Math.round(
            totalPercentage / results.length
        );


    overallScore.textContent =
        `${average}%`;

}



/* =========================================================
   SHOW SUBJECT SCREEN
========================================================= */

function showSubjectScreen() {

    clearInterval(timerInterval);


    quizScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    subjectScreen.classList.remove("hidden");


    updateOverallProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   RETRY CURRENT SUBJECT
========================================================= */

function retryCurrentSubject() {

    if (!currentSubject) {
        return;
    }


    delete subjectResults[currentSubject];


    const card =
        document.getElementById(
            `subject-${currentSubject}`
        );


    if (card) {

        card.classList.remove(
            "completed"
        );

    }


    startAssessment(
        currentSubject
    );

}



/* =========================================================
   EXIT MODAL
========================================================= */

function openExitModal() {

    exitModal.classList.remove("hidden");

}


function closeExitModal() {

    exitModal.classList.add("hidden");

}



/* =========================================================
   CONFIRM EXIT
========================================================= */

function confirmExitAssessment() {

    clearInterval(timerInterval);

    closeExitModal();

    showSubjectScreen();

}



/* =========================================================
   FINISH / BACK TO CLASS 6
========================================================= */

function finishAssessment() {

    window.location.href =
        "../school-students/class-6.html";

}



/* =========================================================
   EVENT LISTENERS
========================================================= */


/* Start subject buttons */

document
    .querySelectorAll(".start-subject-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const subject =
                    button.dataset.subject;

                startAssessment(subject);

            }
        );

    });



/* Next */

nextBtn.addEventListener(
    "click",
    nextQuestion
);


/* Previous */

previousBtn.addEventListener(
    "click",
    previousQuestion
);


/* Submit */

submitBtn.addEventListener(
    "click",
    submitAssessment
);


/* Retry */

retryBtn.addEventListener(
    "click",
    retryCurrentSubject
);


/* Other subjects */

subjectsBtn.addEventListener(
    "click",
    showSubjectScreen
);


/* Back to subject selection */

backSubjectBtn.addEventListener(
    "click",
    showSubjectScreen
);


/* Exit */

exitBtn.addEventListener(
    "click",
    openExitModal
);


/* Cancel exit */

cancelExit.addEventListener(
    "click",
    closeExitModal
);


/* Confirm exit */

confirmExit.addEventListener(
    "click",
    confirmExitAssessment
);


/* Finish */

finishBtn.addEventListener(
    "click",
    finishAssessment
);



/* Close modal when clicking outside */

exitModal.addEventListener(
    "click",
    event => {

        if (
            event.target === exitModal
        ) {

            closeExitModal();

        }

    }
);



/* =========================================================
   INITIALIZE
========================================================= */

updateOverallProgress();
updateSubjectResultList();
updateOverallScore();