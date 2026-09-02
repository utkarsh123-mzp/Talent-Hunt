// =========================================
// TALENT HUNT - REGISTRATION
// =========================================


// Elements
const roleCards = document.querySelectorAll(".role-card");
const roleSection = document.getElementById("roleSection");
const formSection = document.getElementById("formSection");

const backBtn = document.getElementById("backBtn");

const selectedRoleIcon = document.getElementById("selectedRoleIcon");
const selectedRoleText = document.getElementById("selectedRoleText");

const dynamicFields = document.getElementById("dynamicFields");
const registerForm = document.getElementById("registerForm");


// =========================================
// ROLE DATA
// =========================================

const roleData = {

    student: {
        name: "Student",
        icon: "🎓"
    },

    school: {
        name: "School",
        icon: "🏫"
    },

    recruiter: {
        name: "Recruiter",
        icon: "💼"
    },

    organization: {
        name: "Organization",
        icon: "🏆"
    }

};


// =========================================
// ROLE SELECTION
// =========================================

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        const selectedRole = card.dataset.role;

        showRegistrationForm(selectedRole);

    });

});


// =========================================
// SHOW REGISTRATION FORM
// =========================================

function showRegistrationForm(role) {

    const data = roleData[role];

    if (!data) return;


    // Update selected role

    selectedRoleIcon.textContent = data.icon;
    selectedRoleText.textContent = data.name;


    // Generate role-specific fields

    generateDynamicFields(role);


    // Hide role selection

    roleSection.classList.add("hidden");


    // Show form

    formSection.classList.remove("hidden");


    // Scroll to form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// GENERATE DYNAMIC FIELDS
// =========================================

function generateDynamicFields(role) {

    dynamicFields.innerHTML = "";


    // =====================================
    // STUDENT
    // =====================================

    if (role === "student") {

        dynamicFields.innerHTML = `

            <div class="form-group">

                <label for="studentType">
                    Student Type
                </label>

                <select id="studentType" required>

                    <option value="">
                        Select Student Type
                    </option>

                    <option value="school">
                        School Student (Class 5–10)
                    </option>

                    <option value="college">
                        College Student
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="institution">
                    School / College
                </label>

                <input
                    type="text"
                    id="institution"
                    placeholder="Enter school or college name"
                    required
                >

            </div>

        `;


        // Listen for student type

        const studentType =
            document.getElementById("studentType");

        studentType.addEventListener("change", () => {

            addStudentSpecificFields(
                studentType.value
            );

        });

    }


    // =====================================
    // SCHOOL
    // =====================================

    else if (role === "school") {

        dynamicFields.innerHTML = `

            <div class="form-group">

                <label for="schoolName">
                    School Name
                </label>

                <input
                    type="text"
                    id="schoolName"
                    placeholder="Enter school name"
                    required
                >

            </div>


            <div class="form-group">

                <label for="schoolType">
                    School Type
                </label>

                <select id="schoolType" required>

                    <option value="">
                        Select school type
                    </option>

                    <option>
                        Government
                    </option>

                    <option>
                        Private
                    </option>

                    <option>
                        International
                    </option>

                    <option>
                        Other
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="city">
                    City
                </label>

                <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    required
                >

            </div>


            <div class="form-group">

                <label for="schoolWebsite">
                    School Website
                </label>

                <input
                    type="url"
                    id="schoolWebsite"
                    placeholder="https://example.com"
                >

            </div>

        `;

    }


    // =====================================
    // RECRUITER
    // =====================================

    else if (role === "recruiter") {

        dynamicFields.innerHTML = `

            <div class="form-group">

                <label for="companyName">
                    Company Name
                </label>

                <input
                    type="text"
                    id="companyName"
                    placeholder="Enter company name"
                    required
                >

            </div>


            <div class="form-group">

                <label for="jobRole">
                    Recruiting For
                </label>

                <input
                    type="text"
                    id="jobRole"
                    placeholder="e.g. Software Developer"
                    required
                >

            </div>


            <div class="form-group">

                <label for="companyWebsite">
                    Company Website
                </label>

                <input
                    type="url"
                    id="companyWebsite"
                    placeholder="https://example.com"
                >

            </div>


            <div class="form-group">

                <label for="industry">
                    Industry
                </label>

                <select id="industry" required>

                    <option value="">
                        Select industry
                    </option>

                    <option>
                        Information Technology
                    </option>

                    <option>
                        Finance
                    </option>

                    <option>
                        Education
                    </option>

                    <option>
                        Healthcare
                    </option>

                    <option>
                        E-Commerce
                    </option>

                    <option>
                        Other
                    </option>

                </select>

            </div>

        `;

    }


    // =====================================
    // ORGANIZATION
    // =====================================

    else if (role === "organization") {

        dynamicFields.innerHTML = `

            <div class="form-group">

                <label for="organizationName">
                    Organization Name
                </label>

                <input
                    type="text"
                    id="organizationName"
                    placeholder="Enter organization name"
                    required
                >

            </div>


            <div class="form-group">

                <label for="organizationType">
                    Organization Type
                </label>

                <select
                    id="organizationType"
                    required
                >

                    <option value="">
                        Select type
                    </option>

                    <option>
                        Educational Institution
                    </option>

                    <option>
                        NGO
                    </option>

                    <option>
                        Community
                    </option>

                    <option>
                        Event Organizer
                    </option>

                    <option>
                        Other
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="organizationWebsite">
                    Website
                </label>

                <input
                    type="url"
                    id="organizationWebsite"
                    placeholder="https://example.com"
                >

            </div>


            <div class="form-group">

                <label for="eventInterest">
                    Interested In
                </label>

                <select id="eventInterest" required>

                    <option value="">
                        Select activity
                    </option>

                    <option>
                        Coding Competitions
                    </option>

                    <option>
                        Hackathons
                    </option>

                    <option>
                        Quiz
                    </option>

                    <option>
                        Sports
                    </option>

                    <option>
                        Creative Events
                    </option>

                    <option>
                        Multiple Activities
                    </option>

                </select>

            </div>

        `;

    }

}


// =========================================
// STUDENT SPECIFIC FIELDS
// =========================================

function addStudentSpecificFields(type) {

    // Remove previous fields

    const oldFields =
        document.querySelectorAll(".student-specific");

    oldFields.forEach(field => field.remove());


    if (!type) return;


    let fields = "";


    // =====================================
    // SCHOOL STUDENT
    // =====================================

    if (type === "school") {

        fields = `

            <div class="form-group student-specific">

                <label for="class">
                    Class
                </label>

                <select id="class" required>

                    <option value="">
                        Select Class
                    </option>

                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>

                </select>

            </div>


            <div class="form-group student-specific">

                <label for="parentName">
                    Parent / Guardian Name
                </label>

                <input
                    type="text"
                    id="parentName"
                    placeholder="Enter parent/guardian name"
                    required
                >

            </div>

        `;

    }


    // =====================================
    // COLLEGE STUDENT
    // =====================================

    else if (type === "college") {

        fields = `

            <div class="form-group student-specific">

                <label for="course">
                    Course
                </label>

                <input
                    type="text"
                    id="course"
                    placeholder="e.g. B.Tech Computer Science"
                    required
                >

            </div>


            <div class="form-group student-specific">

                <label for="branch">
                    Branch
                </label>

                <input
                    type="text"
                    id="branch"
                    placeholder="e.g. Computer Science"
                    required
                >

            </div>


            <div class="form-group student-specific">

                <label for="year">
                    Current Year
                </label>

                <select id="year" required>

                    <option value="">
                        Select year
                    </option>

                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>

                </select>

            </div>


            <div class="form-group student-specific">

                <label for="cgpa">
                    CGPA
                </label>

                <input
                    type="number"
                    id="cgpa"
                    placeholder="e.g. 8.2"
                    min="0"
                    max="10"
                    step="0.01"
                >

            </div>

        `;

    }


    // Add fields

    dynamicFields.insertAdjacentHTML(
        "beforeend",
        fields
    );

}


// =========================================
// BACK BUTTON
// =========================================

backBtn.addEventListener("click", () => {

    formSection.classList.add("hidden");

    roleSection.classList.remove("hidden");

    dynamicFields.innerHTML = "";

    registerForm.reset();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================================
// FORM SUBMISSION
// =========================================

registerForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Password validation

    if (password.length < 8) {

        alert(
            "Password must contain at least 8 characters."
        );

        return;
    }


    // Confirm password

    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    // Success

    alert(
        "Registration form submitted successfully!"
    );


    console.log(
        "Talent Hunt registration submitted."
    );

});