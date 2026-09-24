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
    // REAL BACKEND AUTHENTICATION
    // =========================================

    const submitButton = loginForm.querySelector("button[type='submit']");
    const originalBtnText = submitButton ? submitButton.innerHTML : "Login";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = "Logging in...";
    }

    (async () => {
        try {
            const api = window.TalentHuntAPI;
            let result;

            if (api && api.auth) {
                result = await api.auth.login(email, password);
            } else {
                // Fallback direct fetch if api.js was somehow loaded out of order
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, password })
                });
                result = await res.json();
                if (!res.ok) {
                    throw new Error(result.message || "Login failed");
                }
                if (result.data && result.data.token) {
                    localStorage.setItem("talentHuntToken", result.data.token);
                    localStorage.setItem("talentHuntUser", JSON.stringify(result.data.user));
                }
            }

            const user = result.data.user;

            alert("Login successful! Welcome to Talent Hunt.");

            // Role-based navigation
            if (user.role === "student") {
                if (user.studentType === "college") {
                    window.location.href = "../college/college-dashboard.html";
                } else {
                    window.location.href = "../dashboard/student-dashboard.html";
                }
            } else if (user.role === "teacher") {
                window.location.href = "../teacher/teacher-dashboard.html";
            } else if (user.role === "recruiter" || user.role === "organization") {
                window.location.href = "../opportunities/opportunities.html";
            } else if (user.role === "school") {
                window.location.href = "../hire-teachers/hire-teachers.html";
            } else if (user.role === "admin") {
                window.location.href = "../admin/teacher-applications.html";
            } else {
                window.location.href = "../dashboard/student-dashboard.html";
            }
        } catch (error) {
            alert(error.message || "Invalid credentials. Please try again.");
            passwordInput.focus();
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;
            }
        }
    })();
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