const aboutThemeButton =
    document.querySelector("#theme-btn");

const aboutSavedTheme =
    localStorage.getItem("mamamiyaTheme");

function applyAboutTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");

        if (aboutThemeButton) {
            aboutThemeButton.textContent = "☀️";

            aboutThemeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    } else {
        document.body.classList.remove("dark-theme");

        if (aboutThemeButton) {
            aboutThemeButton.textContent = "🌙";

            aboutThemeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }
}

if (aboutSavedTheme === "dark") {
    applyAboutTheme("dark");
} else {
    applyAboutTheme("light");
}

if (aboutThemeButton) {
    aboutThemeButton.addEventListener(
        "click",
        function () {
            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );

            if (isDark) {
                applyAboutTheme("light");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "light"
                );
            } else {
                applyAboutTheme("dark");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "dark"
                );
            }
        }
    );
}
// FOOTER CONTACT EMAIL
const footerEmail = document.querySelector(".footer-email");
const emailText = document.querySelector("#emailText");
const copyMessage = document.querySelector("#copyMessage");

const emailAddress = "admin@mamamiya.com";

if (footerEmail && emailText) {
    footerEmail.addEventListener("mouseenter", () => {
        emailText.textContent = emailAddress;
    });

    footerEmail.addEventListener("mouseleave", () => {
        emailText.textContent = "Contact Us";
    });

    footerEmail.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);

            if (copyMessage) {
                copyMessage.textContent = "Email copied!";
            }

            setTimeout(() => {
                if (copyMessage) {
                    copyMessage.textContent = "";
                }
            }, 1500);
        } catch (error) {
            console.error("Unable to copy email:", error);

            if (copyMessage) {
                copyMessage.textContent = "Unable to copy email.";
            }
        }
    });
}