/* =========================================================
   TALENTHUNT - RECRUITER QUESTIONS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       QUESTION DATABASE
    ====================================================== */

    const questions = [

        /* ================= DSA ================= */

        {
            id: 1,
            category: "dsa",
            categoryName: "DSA",
            company: "tcs",
            companyName: "TCS",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between an array and a linked list?",
            answer:
                "Explain that arrays generally provide contiguous memory and fast random access using indexes, while linked lists store nodes connected through references. Discuss insertion, deletion, memory usage and access complexity.",
            tip:
                "Do not only give definitions. Compare access, insertion, deletion and memory allocation with complexity."
        },

        {
            id: 2,
            category: "dsa",
            categoryName: "DSA",
            company: "infosys",
            companyName: "Infosys",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "How would you find the second largest element in an array?",
            answer:
                "A good approach is to maintain two variables for the largest and second-largest values while traversing the array once. This gives O(n) time and O(1) extra space.",
            tip:
                "Interviewers often expect you to avoid sorting and explain the complexity."
        },

        {
            id: 3,
            category: "dsa",
            categoryName: "DSA",
            company: "accenture",
            companyName: "Accenture",
            difficulty: "hard",
            type: "technical",
            frequent: false,
            question:
                "Explain how you would detect a cycle in a linked list.",
            answer:
                "Use Floyd's Cycle Detection Algorithm with slow and fast pointers. The slow pointer moves one step and the fast pointer moves two steps. If they meet, a cycle exists.",
            tip:
                "Be ready to explain why the two pointers must eventually meet inside a cycle."
        },

        {
            id: 4,
            category: "dsa",
            categoryName: "DSA",
            company: "product",
            companyName: "Product Companies",
            difficulty: "hard",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between BFS and DFS and when would you use each?",
            answer:
                "BFS explores nodes level by level using a queue, while DFS explores deeply using recursion or a stack. BFS is useful for shortest paths in unweighted graphs, while DFS is useful for traversal, connectivity and backtracking problems.",
            tip:
                "Always mention the underlying data structure and time complexity."
        },


        /* ================= DBMS ================= */

        {
            id: 5,
            category: "dbms",
            categoryName: "DBMS",
            company: "tcs",
            companyName: "TCS",
            difficulty: "easy",
            type: "technical",
            frequent: true,
            question:
                "What is normalization in DBMS and why is it required?",
            answer:
                "Normalization organizes data into related tables to reduce redundancy and improve data consistency. Explain normal forms such as 1NF, 2NF and 3NF at a high level.",
            tip:
                "Use a simple student-course example if the interviewer asks for a practical explanation."
        },

        {
            id: 6,
            category: "dbms",
            categoryName: "DBMS",
            company: "infosys",
            companyName: "Infosys",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between DELETE, DROP and TRUNCATE?",
            answer:
                "DELETE removes selected rows and can use a WHERE condition. TRUNCATE removes all rows from a table while keeping its structure. DROP removes the complete table structure along with its data.",
            tip:
                "Clearly compare what happens to the table structure in each command."
        },

        {
            id: 7,
            category: "dbms",
            categoryName: "DBMS",
            company: "wipro",
            companyName: "Wipro",
            difficulty: "medium",
            type: "technical",
            frequent: false,
            question:
                "What is a primary key and how is it different from a foreign key?",
            answer:
                "A primary key uniquely identifies records in its own table. A foreign key references a key in another table and establishes a relationship between tables.",
            tip:
                "Give a simple Student and Department table example."
        },


        /* ================= SQL ================= */

        {
            id: 8,
            category: "sql",
            categoryName: "SQL",
            company: "tcs",
            companyName: "TCS",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "Write a SQL query to find the second highest salary from an Employee table.",
            answer:
                "One common approach is to find the maximum salary below the overall maximum salary. Another approach uses DENSE_RANK or a subquery depending on the SQL dialect.",
            tip:
                "Be prepared for duplicate salary values. DENSE_RANK is useful when duplicate salaries exist."
        },

        {
            id: 9,
            category: "sql",
            categoryName: "SQL",
            company: "accenture",
            companyName: "Accenture",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between WHERE and HAVING in SQL?",
            answer:
                "WHERE filters rows before grouping, while HAVING filters grouped results after GROUP BY. HAVING is commonly used with aggregate functions.",
            tip:
                "Use COUNT, SUM or AVG in an example to make the distinction clear."
        },

        {
            id: 10,
            category: "sql",
            categoryName: "SQL",
            company: "capgemini",
            companyName: "Capgemini",
            difficulty: "medium",
            type: "technical",
            frequent: false,
            question:
                "Explain INNER JOIN and LEFT JOIN with an example.",
            answer:
                "INNER JOIN returns only matching rows between tables. LEFT JOIN returns all rows from the left table and matching rows from the right table; unmatched right-side values become NULL.",
            tip:
                "Draw two small tables mentally and explain which records survive each join."
        },


        /* ================= WEB ================= */

        {
            id: 11,
            category: "web",
            categoryName: "Web Development",
            company: "tcs",
            companyName: "TCS",
            difficulty: "easy",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between HTML, CSS and JavaScript?",
            answer:
                "HTML provides the structure of a webpage, CSS controls presentation and layout, and JavaScript adds behavior and interactivity.",
            tip:
                "Explain them as structure, design and behavior respectively."
        },

        {
            id: 12,
            category: "web",
            categoryName: "Web Development",
            company: "infosys",
            companyName: "Infosys",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is responsive web design?",
            answer:
                "Responsive design makes a website adapt to different screen sizes and devices using techniques such as flexible layouts, media queries and responsive units.",
            tip:
                "Mention mobile, tablet and desktop layouts."
        },

        {
            id: 13,
            category: "web",
            categoryName: "Web Development",
            company: "accenture",
            companyName: "Accenture",
            difficulty: "medium",
            type: "technical",
            frequent: false,
            question:
                "What is the difference between localStorage and sessionStorage?",
            answer:
                "Both store data in the browser. localStorage persists until explicitly removed, while sessionStorage normally lasts for the current browser tab session.",
            tip:
                "Mention that sensitive information should not blindly be stored in browser storage."
        },


        /* ================= PYTHON ================= */

        {
            id: 14,
            category: "python",
            categoryName: "Python",
            company: "tcs",
            companyName: "TCS",
            difficulty: "easy",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between a list and a tuple in Python?",
            answer:
                "Lists are mutable, meaning their elements can be changed after creation. Tuples are immutable. Both can store ordered collections, but tuples are generally used for fixed collections of values.",
            tip:
                "Give a practical example of when you would prefer a tuple."
        },

        {
            id: 15,
            category: "python",
            categoryName: "Python",
            company: "infosys",
            companyName: "Infosys",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What are Python dictionaries and how do they work?",
            answer:
                "A dictionary stores key-value pairs. Keys are used to retrieve values efficiently and must be hashable.",
            tip:
                "Know common operations such as get, keys, values and items."
        },


        /* ================= JAVASCRIPT ================= */

        {
            id: 16,
            category: "javascript",
            categoryName: "JavaScript",
            company: "product",
            companyName: "Product Companies",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between var, let and const in JavaScript?",
            answer:
                "var is function-scoped, while let and const are block-scoped. const cannot be reassigned after initialization, whereas let can be reassigned.",
            tip:
                "Be ready to discuss scope, redeclaration and hoisting."
        },

        {
            id: 17,
            category: "javascript",
            categoryName: "JavaScript",
            company: "accenture",
            companyName: "Accenture",
            difficulty: "medium",
            type: "technical",
            frequent: false,
            question:
                "What is event bubbling in JavaScript?",
            answer:
                "Event bubbling means an event triggered on a child element propagates upward through its parent elements unless propagation is stopped.",
            tip:
                "Event delegation is a practical concept related to event bubbling."
        },


        /* ================= CORE CS ================= */

        {
            id: 18,
            category: "core",
            categoryName: "Core CS",
            company: "tcs",
            companyName: "TCS",
            difficulty: "medium",
            type: "technical",
            frequent: true,
            question:
                "What is the difference between a process and a thread?",
            answer:
                "A process is an independent program execution environment with its own memory space. Threads are smaller execution units within a process and usually share the process's memory.",
            tip:
                "Compare memory, communication and context switching."
        },

        {
            id: 19,
            category: "core",
            categoryName: "Core CS",
            company: "wipro",
            companyName: "Wipro",
            difficulty: "medium",
            type: "technical",
            frequent: false,
            question:
                "What is deadlock in an operating system?",
            answer:
                "Deadlock occurs when processes are permanently waiting for resources held by each other. The four classic conditions are mutual exclusion, hold and wait, no preemption and circular wait.",
            tip:
                "Remember all four necessary conditions."
        },

        {
            id: 20,
            category: "core",
            categoryName: "Core CS",
            company: "capgemini",
            companyName: "Capgemini",
            difficulty: "easy",
            type: "technical",
            frequent: true,
            question:
                "What is an operating system?",
            answer:
                "An operating system is system software that manages hardware resources and provides services and interfaces for application programs.",
            tip:
                "Mention memory management, process management, file management and device management."
        },


        /* ================= HR ================= */

        {
            id: 21,
            category: "hr",
            categoryName: "HR",
            company: "tcs",
            companyName: "TCS",
            difficulty: "easy",
            type: "hr",
            frequent: true,
            question:
                "Tell me about yourself.",
            answer:
                "Give a concise 60-90 second introduction covering your education, relevant technical skills, projects, internships or achievements, and what type of role you are targeting.",
            tip:
                "Do not narrate your complete life story. Keep the answer relevant to the job."
        },

        {
            id: 22,
            category: "hr",
            categoryName: "HR",
            company: "infosys",
            companyName: "Infosys",
            difficulty: "medium",
            type: "hr",
            frequent: true,
            question:
                "Why should we hire you?",
            answer:
                "Connect your strongest skills and projects with the job requirements. Demonstrate willingness to learn, problem-solving ability and evidence from your projects or experiences.",
            tip:
                "Avoid saying only 'I am hardworking'. Support qualities with examples."
        },

        {
            id: 23,
            category: "hr",
            categoryName: "HR",
            company: "accenture",
            companyName: "Accenture",
            difficulty: "medium",
            type: "scenario",
            frequent: true,
            question:
                "Tell me about a time when you faced a difficult problem in a project and how you solved it.",
            answer:
                "Use the STAR method: Situation, Task, Action and Result. Focus most on your personal contribution and the measurable or practical outcome.",
            tip:
                "Prepare 2-3 real project stories before interviews."
        },

        {
            id: 24,
            category: "hr",
            categoryName: "HR",
            company: "capgemini",
            companyName: "Capgemini",
            difficulty: "easy",
            type: "hr",
            frequent: true,
            question:
                "Where do you see yourself in five years?",
            answer:
                "Show a realistic growth path: becoming technically stronger, taking ownership of projects, contributing to the organization and gradually taking on more responsibility.",
            tip:
                "Avoid unrealistic titles or answers that suggest you will quickly leave the company."
        },


        /* ================= SCENARIO ================= */

        {
            id: 25,
            category: "core",
            categoryName: "Core CS",
            company: "product",
            companyName: "Product Companies",
            difficulty: "hard",
            type: "scenario",
            frequent: true,
            question:
                "Your application works correctly on your machine but fails in production. How would you debug it?",
            answer:
                "Start by reproducing the issue and checking logs, environment variables, dependencies, configuration, network access and database connectivity. Compare development and production environments and isolate the failing component systematically.",
            tip:
                "Interviewers are evaluating your debugging methodology, not just one specific command."
        },

        {
            id: 26,
            category: "web",
            categoryName: "Web Development",
            company: "product",
            companyName: "Product Companies",
            difficulty: "hard",
            type: "scenario",
            frequent: false,
            question:
                "A webpage is loading very slowly. What steps would you take to improve performance?",
            answer:
                "Inspect network requests and performance metrics, optimize images, reduce unnecessary JavaScript and CSS, enable caching, minimize requests and lazy-load resources where appropriate.",
            tip:
                "Mention measurement first. Do not optimize blindly."
        }

    ];


    /* =====================================================
       STATE
    ====================================================== */

    let filteredQuestions = [...questions];

    let activeQuickFilter = "all";

    let currentQuestionId = null;

    let savedQuestions =
        JSON.parse(
            localStorage.getItem(
                "talenthuntSavedRecruiterQuestions"
            )
        ) || [];


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const questionsGrid =
        document.getElementById(
            "questionsGrid"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const clearSearch =
        document.getElementById(
            "clearSearch"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const difficultyFilter =
        document.getElementById(
            "difficultyFilter"
        );

    const companyFilter =
        document.getElementById(
            "companyFilter"
        );

    const typeFilter =
        document.getElementById(
            "typeFilter"
        );

    const resetFilters =
        document.getElementById(
            "resetFilters"
        );

    const emptyReset =
        document.getElementById(
            "emptyReset"
        );

    const quickFilters =
        document.querySelectorAll(
            ".quick-filter"
        );

    const savedCount =
        document.getElementById(
            "savedCount"
        );

    const totalQuestionCount =
        document.getElementById(
            "totalQuestionCount"
        );

    const resultsText =
        document.getElementById(
            "resultsText"
        );


    /* =====================================================
       MODAL ELEMENTS
    ====================================================== */

    const questionModal =
        document.getElementById(
            "questionModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalCloseSecondary =
        document.getElementById(
            "modalCloseSecondary"
        );

    const modalSave =
        document.getElementById(
            "modalSave"
        );

    const modalPractice =
        document.getElementById(
            "modalPractice"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalDifficulty =
        document.getElementById(
            "modalDifficulty"
        );

    const modalCompany =
        document.getElementById(
            "modalCompany"
        );

    const modalQuestion =
        document.getElementById(
            "modalQuestion"
        );

    const modalType =
        document.getElementById(
            "modalType"
        );

    const modalAnswer =
        document.getElementById(
            "modalAnswer"
        );

    const modalTip =
        document.getElementById(
            "modalTip"
        );


    /* =====================================================
       TOAST
    ====================================================== */

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    let toastTimeout;


    /* =====================================================
       INITIAL
    ====================================================== */

    totalQuestionCount.textContent =
        questions.length;

    updateSavedCount();

    renderQuestions();


    /* =====================================================
       RENDER QUESTIONS
    ====================================================== */

    function renderQuestions() {

        questionsGrid.innerHTML = "";


        if (
            filteredQuestions.length === 0
        ) {

            questionsGrid.classList.add(
                "hidden"
            );

            emptyState.classList.remove(
                "hidden"
            );

            resultsText.textContent =
                "No matching questions found.";

            return;

        }


        questionsGrid.classList.remove(
            "hidden"
        );

        emptyState.classList.add(
            "hidden"
        );


        filteredQuestions.forEach(
            question => {

                const card =
                    createQuestionCard(
                        question
                    );

                questionsGrid.appendChild(
                    card
                );

            }
        );


        resultsText.textContent =
            `Showing ${filteredQuestions.length} of ${questions.length} questions`;

    }


    /* =====================================================
       CREATE CARD
    ====================================================== */

    function createQuestionCard(
        question
    ) {

        const card =
            document.createElement("article");

        card.className =
            "question-card";


        const isSaved =
            savedQuestions.includes(
                question.id
            );


        const frequentBadge =
            question.frequent
                ? `<span class="frequent-badge">FREQUENTLY ASKED</span>`
                : "";


        card.innerHTML = `

            ${frequentBadge}

            <div class="card-top">

                <div class="card-tags">

                    <span class="category-tag">
                        ${escapeHTML(
                            question.categoryName
                        )}
                    </span>

                    <span class="company-tag">
                        ${escapeHTML(
                            question.companyName
                        )}
                    </span>

                    <span class="type-tag">
                        ${escapeHTML(
                            formatType(
                                question.type
                            )
                        )}
                    </span>

                </div>

                <span class="difficulty-tag ${question.difficulty}">
                    ${capitalize(
                        question.difficulty
                    )}
                </span>

            </div>


            <h3>
                ${escapeHTML(
                    question.question
                )}
            </h3>


            <p>
                ${escapeHTML(
                    question.answer
                )}
            </p>


            <div class="card-footer">

                <button
                    type="button"
                    class="view-question"
                    data-action="view"
                    data-id="${question.id}">
                    View Question →
                </button>

                <button
                    type="button"
                    class="save-question ${
                        isSaved ? "saved" : ""
                    }"
                    data-action="save"
                    data-id="${question.id}"
                    aria-label="Save question">
                    ${isSaved ? "★" : "☆"}
                </button>

            </div>

        `;


        return card;

    }


    /* =====================================================
       CARD ACTIONS
    ====================================================== */

    questionsGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            const id =
                Number(
                    button.dataset.id
                );


            const action =
                button.dataset.action;


            if (action === "view") {

                openQuestionModal(id);

            }


            if (action === "save") {

                toggleSaved(id);

            }

        }
    );


    /* =====================================================
       SEARCH
    ====================================================== */

    searchInput.addEventListener(
        "input",
        applyFilters
    );


    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            applyFilters();

            searchInput.focus();

        }
    );


    /* =====================================================
       SELECT FILTERS
    ====================================================== */

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

    difficultyFilter.addEventListener(
        "change",
        applyFilters
    );

    companyFilter.addEventListener(
        "change",
        applyFilters
    );

    typeFilter.addEventListener(
        "change",
        applyFilters
    );


    /* =====================================================
       QUICK FILTERS
    ====================================================== */

    quickFilters.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    quickFilters.forEach(
                        item => {
                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeQuickFilter =
                        button.dataset.quick;


                    applyFilters();

                }
            );

        }
    );


    /* =====================================================
       APPLY FILTERS
    ====================================================== */

    function applyFilters() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const category =
            categoryFilter.value;

        const difficulty =
            difficultyFilter.value;

        const company =
            companyFilter.value;

        const type =
            typeFilter.value;


        filteredQuestions =
            questions.filter(
                question => {

                    const searchableText =
                        [
                            question.question,
                            question.categoryName,
                            question.companyName,
                            question.answer,
                            question.tip
                        ]
                            .join(" ")
                            .toLowerCase();


                    const matchesSearch =
                        !search ||
                        searchableText.includes(
                            search
                        );


                    const matchesCategory =
                        category === "all" ||
                        question.category ===
                        category;


                    const matchesDifficulty =
                        difficulty === "all" ||
                        question.difficulty ===
                        difficulty;


                    const matchesCompany =
                        company === "all" ||
                        question.company ===
                        company;


                    const matchesType =
                        type === "all" ||
                        question.type ===
                        type;


                    let matchesQuick = true;


                    if (
                        activeQuickFilter ===
                        "frequent"
                    ) {

                        matchesQuick =
                            question.frequent ===
                            true;

                    }


                    if (
                        activeQuickFilter ===
                        "saved"
                    ) {

                        matchesQuick =
                            savedQuestions.includes(
                                question.id
                            );

                    }


                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesDifficulty &&
                        matchesCompany &&
                        matchesType &&
                        matchesQuick
                    );

                }
            );


        renderQuestions();

    }


    /* =====================================================
       RESET FILTERS
    ====================================================== */

    resetFilters.addEventListener(
        "click",
        resetAllFilters
    );

    emptyReset.addEventListener(
        "click",
        resetAllFilters
    );


    function resetAllFilters() {

        searchInput.value = "";

        categoryFilter.value = "all";

        difficultyFilter.value = "all";

        companyFilter.value = "all";

        typeFilter.value = "all";


        activeQuickFilter = "all";


        quickFilters.forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


        document
            .querySelector(
                '[data-quick="all"]'
            )
            .classList.add("active");


        applyFilters();

    }


    /* =====================================================
       SAVE / UNSAVE
    ====================================================== */

    function toggleSaved(id) {

        const index =
            savedQuestions.indexOf(id);


        if (index === -1) {

            savedQuestions.push(id);

            showToast(
                "Question saved successfully."
            );

        } else {

            savedQuestions.splice(
                index,
                1
            );

            showToast(
                "Question removed from saved."
            );

        }


        localStorage.setItem(
            "talenthuntSavedRecruiterQuestions",
            JSON.stringify(
                savedQuestions
            )
        );


        updateSavedCount();

        renderQuestions();


        if (
            currentQuestionId === id
        ) {

            updateModalSaveButton();

        }

    }


    function updateSavedCount() {

        savedCount.textContent =
            savedQuestions.length;

    }


    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openQuestionModal(id) {

        const question =
            questions.find(
                item => item.id === id
            );


        if (!question) {
            return;
        }


        currentQuestionId = id;


        modalCategory.textContent =
            question.categoryName;


        modalDifficulty.textContent =
            capitalize(
                question.difficulty
            );


        modalCompany.textContent =
            question.companyName;


        modalQuestion.textContent =
            question.question;


        modalType.textContent =
            formatType(
                question.type
            );


        modalAnswer.textContent =
            question.answer;


        modalTip.textContent =
            question.tip;


        updateModalSaveButton();


        questionModal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       MODAL SAVE
    ====================================================== */

    modalSave.addEventListener(
        "click",
        () => {

            if (
                currentQuestionId === null
            ) {
                return;
            }


            toggleSaved(
                currentQuestionId
            );

        }
    );


    function updateModalSaveButton() {

        const saved =
            savedQuestions.includes(
                currentQuestionId
            );


        if (saved) {

            modalSave.textContent =
                "★ Saved";

            modalSave.classList.add(
                "saved"
            );

        } else {

            modalSave.textContent =
                "☆ Save";

            modalSave.classList.remove(
                "saved"
            );

        }

    }


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    modalClose.addEventListener(
        "click",
        closeModal
    );

    modalCloseSecondary.addEventListener(
        "click",
        closeModal
    );


    questionModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                questionModal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    function closeModal() {

        questionModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

        currentQuestionId = null;

    }


    /* =====================================================
       PRACTICE
    ====================================================== */

    modalPractice.addEventListener(
        "click",
        () => {

            if (
                currentQuestionId === null
            ) {
                return;
            }


            const question =
                questions.find(
                    item =>
                        item.id ===
                        currentQuestionId
                );


            if (!question) {
                return;
            }


            /*
             * Future connection:
             * mock-interview.html
             */

            showToast(
                "Practice mode will connect with Mock Interview."
            );

        }
    );


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(message) {

        clearTimeout(
            toastTimeout
        );


        toastMessage.textContent =
            message;


        toast.classList.add(
            "show"
        );


        toastTimeout =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


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
                window.innerWidth <= 1100 &&
                !sidebar.contains(
                    event.target
                ) &&
                !menuBtn.contains(
                    event.target
                )
            ) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       HELPER FUNCTIONS
    ====================================================== */

    function capitalize(value) {

        return value
            .charAt(0)
            .toUpperCase() +
            value.slice(1);

    }


    function formatType(value) {

        if (value === "hr") {
            return "HR";
        }

        if (value === "technical") {
            return "Technical";
        }

        if (value === "scenario") {
            return "Scenario";
        }

        return value;

    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

});