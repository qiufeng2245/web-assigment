// Register page

const continueButton = document.querySelector(".Continuebutton");

if (continueButton) {
    const userInputSections = document.querySelectorAll(".UserInput");
    const progressLight = document.querySelector(".progresslight");
    const steps = document.querySelectorAll(".step");

    let currentStep = 0;

    continueButton.addEventListener("click", function () {
        const currentSection = userInputSections[currentStep];
        const currentInputs = currentSection.querySelectorAll("input");

        for (const input of currentInputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }

        if (currentStep === 1) {
            const emailIsValid = checkEmail();

            if (!emailIsValid) {
                return;
            }
        }

        if (currentStep === userInputSections.length - 1) {
            checkPassword();
            return;
        }

        userInputSections[currentStep].classList.remove("active");

        currentStep++;

        userInputSections[currentStep].classList.add("active");

        updateProgress();

        if (currentStep === userInputSections.length - 1) {
            continueButton.textContent = "Register";
        }
    });

    function updateProgress() {
        const percentage =
            (currentStep / (userInputSections.length - 1)) * 100;

        progressLight.style.width = percentage + "%";

        steps.forEach(function (step, index) {
            if (index <= currentStep) {
                step.classList.add("completed");
            } else {
                step.classList.remove("completed");
            }
        });
    }
//check email
    function checkEmail() {
        const emailInput = document.querySelector(
            'input[name="email"]'
        );

        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email ending with .com.");

            emailInput.focus();

            return false;
        }

        return true;
    }

    function checkPassword() {
        const passwordInput = document.querySelector(
            'input[name="password"]'
        );

        const confirmPasswordInput = document.querySelector(
            'input[name="comfirmpassword"]'
        );

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const passwordPattern =
            /^(?=.*[A-Za-z])(?=.*[0-9])\S{8,}$/;

        if (!passwordPattern.test(password)) {
            alert(
                "Password must be at least 8 characters and contain letters and numbers."
            );

            passwordInput.focus();

            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");

            confirmPasswordInput.focus();

            return false;
        }

        alert("Registration successful!");

        window.location.href = "login.html";

        return true;
    }

    const togglePasswordButtons =
        document.querySelectorAll(".togglePassword");

    togglePasswordButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                button.textContent = "Hide";
                button.classList.add("activeToggle");
                button.setAttribute("aria-label", "Hide password");
            } else {
                passwordInput.type = "password";
                button.textContent = "Show";
                button.classList.remove("activeToggle");
                button.setAttribute("aria-label", "Show password");
            }
        });
    });

    updateProgress();
}

//login
const showCheckbox = document.querySelector("#show");
const loginPassword = document.querySelector("#LoginPwd");

if (showCheckbox && loginPassword) {
    showCheckbox.addEventListener("change", function () {
        if (this.checked) {
            loginPassword.type = "text";
        } else {
            loginPassword.type = "password";
        }
    });
}

const loginForm = document.querySelector(".Login");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        window.location.href = "HomePage.html";
    });
}