//REGISTER PAGE

const continueButton = document.querySelector(".Continuebutton");

if (continueButton) {
    const userInputSections =
        document.querySelectorAll(".UserInput");

    const progressLight =
        document.querySelector(".progresslight");

    const steps =
        document.querySelectorAll(".step");

    let currentStep = 0;

    continueButton.addEventListener("click", function () {
        const currentSection =
            userInputSections[currentStep];

        const currentInputs =
            currentSection.querySelectorAll("input");

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

        if (
            currentStep ===
            userInputSections.length - 1
        ) {
            checkPassword();
            return;
        }

        userInputSections[currentStep]
            .classList.remove("active");

        currentStep++;

        userInputSections[currentStep]
            .classList.add("active");

        updateProgress();

        if (
            currentStep ===
            userInputSections.length - 1
        ) {
            continueButton.textContent = "Register";
        }
    });

    function updateProgress() {
        const percentage =
            (
                currentStep /
                (userInputSections.length - 1)
            ) * 100;

        progressLight.style.width =
            percentage + "%";

        steps.forEach(function (step, index) {
            step.classList.remove(
                "completed",
                "current"
            );

            if (index < currentStep) {
                step.classList.add("completed");
            } else if (index === currentStep) {
                step.classList.add("current");
            }
        });
    }

    function checkEmail() {
        const emailInput =
            document.querySelector(
                'input[name="email"]'
            );

        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            emailInput.focus();

            return false;
        }

        return true;
    }

    function checkPassword() {
        const passwordInput =
            document.querySelector(
                'input[name="password"]'
            );

        const confirmPasswordInput =
            document.querySelector(
                'input[name="confirmpassword"]'
            );

        const usernameInput =
            document.querySelector(
                'input[name="username"]'
            );

        const emailInput =
            document.querySelector(
                'input[name="email"]'
            );

        const firstNameInput =
            document.querySelector(
                'input[name="firstname"]'
            );

        const lastNameInput =
            document.querySelector(
                'input[name="lastname"]'
            );

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

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

        const account = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: password
        };

        localStorage.setItem(
            "mamamiyaAccount",
            JSON.stringify(account)
        );

        alert("Registration successful!");

        window.location.href = "login.html";

        return true;
    }

    const togglePasswordButtons =
        document.querySelectorAll(
            ".togglePassword"
        );

    togglePasswordButtons.forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    const targetId =
                        button.getAttribute(
                            "data-target"
                        );

                    const passwordInput =
                        document.getElementById(
                            targetId
                        );

                    if (
                        passwordInput.type ===
                        "password"
                    ) {
                        passwordInput.type = "text";

                        button.textContent = "Hide";

                        button.classList.add(
                            "activeToggle"
                        );

                        button.setAttribute(
                            "aria-label",
                            "Hide password"
                        );
                    } else {
                        passwordInput.type =
                            "password";

                        button.textContent = "Show";

                        button.classList.remove(
                            "activeToggle"
                        );

                        button.setAttribute(
                            "aria-label",
                            "Show password"
                        );
                    }
                }
            );
        }
    );

    updateProgress();
}

//LOGIN PAGE SHOW PASSWORD

const showCheckbox =
    document.querySelector("#show");

const loginPassword =
    document.querySelector("#LoginPwd");

if (showCheckbox && loginPassword) {
    showCheckbox.addEventListener(
        "change",
        function () {
            if (this.checked) {
                loginPassword.type = "text";
            } else {
                loginPassword.type = "password";
            }
        }
    );
}

// LOGIN PAGE CHECK ACCOUNT

const loginForm =
    document.querySelector(".Login");

if (loginForm) {
    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            const usernameInput =
                document.querySelector(
                    'input[name="UserName"]'
                );

            const passwordInput =
                document.querySelector(
                    "#LoginPwd"
                );

            const enteredUsername =
                usernameInput.value.trim();

            const enteredPassword =
                passwordInput.value;

            const savedAccountText =
                localStorage.getItem(
                    "mamamiyaAccount"
                );

            if (!savedAccountText) {
                alert(
                    "No account found. Please register first."
                );

                return;
            }

            const savedAccount =
                JSON.parse(savedAccountText);

            const usernameMatches =
                enteredUsername ===
                savedAccount.username;

            const emailMatches =
                enteredUsername ===
                savedAccount.email;

            const passwordMatches =
                enteredPassword ===
                savedAccount.password;

            if (
                (usernameMatches || emailMatches) &&
                passwordMatches
            ) {

                sessionStorage.setItem(
                    "loggedInUser",
                    savedAccount.username
                );

                sessionStorage.setItem(
                    "loggedInFirstName",
                    savedAccount.firstName
                );

                window.location.href =
                    "HomePage.html";
            } else {
                alert(
                    "Incorrect username, email or password."
                );

                passwordInput.value = "";
                passwordInput.focus();
            }
        }
    );
}

// LOGIN AND REGISTER THEME TOGGLE

const accountThemeButton =
    document.querySelector("#theme-btn");

const accountSavedTheme =
    localStorage.getItem("mamamiyaTheme");

function applyAccountTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");

        if (accountThemeButton) {
            accountThemeButton.textContent = "☀️";

            accountThemeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    } else {
        document.body.classList.remove("dark-theme");

        if (accountThemeButton) {
            accountThemeButton.textContent = "🌙";

            accountThemeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }
}

// 页面打开时使用已保存的主题
if (accountSavedTheme === "dark") {
    applyAccountTheme("dark");
} else {
    applyAccountTheme("light");
}

// 点击按钮切换主题
if (accountThemeButton) {
    accountThemeButton.addEventListener(
        "click",
        function () {
            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );

            if (isDark) {
                applyAccountTheme("light");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "light"
                );
            } else {
                applyAccountTheme("dark");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "dark"
                );
            }
        }
    );
}