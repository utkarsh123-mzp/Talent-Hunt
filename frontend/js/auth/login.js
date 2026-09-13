// =========================================
// TALENT HUNT - LOGIN PAGE
// =========================================


// =========================================
// ELEMENTS
// =========================================

const loginForm = document.getElementById("loginForm");

const passwordInput =
    document.getElementById("loginPassword");

const passwordToggle =
    document.getElementById("passwordToggle");

const forgotPassword =
    document.getElementById("forgotPassword");

const rememberMe =
    document.getElementById("rememberMe");


// =========================================
// SHOW / HIDE PASSWORD
// =========================================

passwordToggle.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggle.textContent = "🙈";

        passwordToggle.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        passwordToggle.textContent = "👁";

        passwordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});


// =========================================
// EMAIL VALIDATION
// =========================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// =========================================
// LOGIN FORM SUBMISSION
// =========================================

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        passwordInput.value;


    // -----------------------------------------
    // Empty Email
    // -----------------------------------------

    if (email === "") {

        alert("Please enter your email address.");

        document.getElementById("loginEmail").focus();

        return;

    }


    // -----------------------------------------
    // Email Validation
    // -----------------------------------------

    if (!isValidEmail(email)) {

        alert("Please enter a valid email address.");

        document.getElementById("loginEmail").focus();

        return;

    }


    // -----------------------------------------
    // Empty Password
    // -----------------------------------------

    if (password === "") {

        alert("Please enter your password.");

        passwordInput.focus();

        return;

    }


    // -----------------------------------------
    // Password Length
    // -----------------------------------------

    if (password.length < 8) {

        alert(
            "Password must contain at least 8 characters."
        );

        passwordInput.focus();

        return;

    }


    // -----------------------------------------
    // Remember Me
    // -----------------------------------------

    if (rememberMe.checked) {

        localStorage.setItem(
            "talentHuntRememberEmail",
            email
        );

    } else {

        localStorage.removeItem(
            "talentHuntRememberEmail"
        );

    }


    // -----------------------------------------
    // Demo Login
    // -----------------------------------------

    // =========================================
    // CHECK REGISTERED ACCOUNT
    // =========================================

    const registeredUser =
        JSON.parse(
            localStorage.getItem("talentHuntUser")
        );


    // =========================================
    // LOGIN SESSION
    // =========================================

    if (!registeredUser) {

        alert(
            "No account found. Please create an account first."
        );

        return;

    }


    // =========================================
    // CHECK EMAIL
    // =========================================

    if (
        registeredUser.email.toLowerCase() !==
        email.toLowerCase()
    ) {

        alert(
            "No account found with this email address."
        );

        return;

    }


    // =========================================
    // CHECK PASSWORD
    // =========================================

    if (
        registeredUser.password !== password
    ) {

        alert(
            "Incorrect password. Please try again."
        );

        passwordInput.focus();

        return;

    }


    // =========================================
    // CREATE LOGIN SESSION
    // =========================================

    localStorage.setItem(
        "talentHuntLoggedIn",
        "true"
    );


    // Save current user

    localStorage.setItem(
        "talentHuntCurrentUser",
        JSON.stringify(registeredUser)
    );


    // =========================================
    // SUCCESS
    // =========================================

    alert(
        "Login successful! Welcome to Talent Hunt."
    );


    // =========================================
    // ROLE BASED REDIRECT
    // =========================================

    if (registeredUser.role === "student") {

        if (
            registeredUser.studentType ===
            "college"
        ) {

            window.location.href =
                "../college/college-dashboard.html";

        } else {

            window.location.href =
                "../dashboard/student-dashboard.html";

        }

    } else {

        alert(
            "Your portal will be connected soon."
        );

    }


    /*
        IMPORTANT:

        Abhi backend/database connected nahi hai.

        Isliye yahan actual authentication nahi ho raha.
        Backend connect hone ke baad isi section mein:

        1. API request
        2. Authentication
        3. JWT token
        4. Role detection
        5. Dashboard redirect

        implement karenge.
    */

});


// =========================================
// REMEMBERED EMAIL
// =========================================

window.addEventListener("DOMContentLoaded", () => {

    const savedEmail =
        localStorage.getItem(
            "talentHuntRememberEmail"
        );


    if (savedEmail) {

        document.getElementById("loginEmail").value =
            savedEmail;

        rememberMe.checked = true;

    }

});


// =========================================
// FORGOT PASSWORD
// =========================================

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();


    if (email === "") {

        alert(
            "Please enter your email address first."
        );

        document.getElementById("loginEmail").focus();

        return;

    }


    if (!isValidEmail(email)) {

        alert(
            "Please enter a valid email address."
        );

        document.getElementById("loginEmail").focus();

        return;

    }


    alert(
        "Password reset link will be sent to your email."
    );


    /*
        Backend implementation later:

        POST /api/auth/forgot-password

        {
            email: email
        }
    */

});


// =========================================
// GOOGLE LOGIN - DEMO
// =========================================

const googleButton =
    document.querySelector(".social-btn");


if (googleButton) {

    googleButton.addEventListener("click", () => {

        alert(
            "Google Login will be connected later."
        );

    });

}


// =========================================
// INPUT FEEDBACK
// =========================================

const inputs =
    document.querySelectorAll(
        ".input-wrapper input"
    );


inputs.forEach(input => {

    input.addEventListener("input", () => {

        input.style.borderColor = "";

    });

});