// FEATURED COLLECTION
const collectionItems = document.querySelectorAll(".collection-item");
const previewImg = document.getElementById("previewImg");
const collectionContent = document.querySelector(".collection-content");

if (previewImg) {
    collectionItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const newImage = item.dataset.image;

            previewImg.classList.remove("show");

            setTimeout(() => {
                previewImg.src = newImage;
                previewImg.classList.add("show");
            }, 150);
        });
    });
}

if (collectionContent && previewImg) {
    collectionContent.addEventListener("mouseleave", () => {
        previewImg.classList.remove("show");
    });
}


// HOME PAGE LOGIN STATUS
const loginLink = document.querySelector("#loginLink");
const registerLink = document.querySelector("#registerLink");
const userMenu = document.querySelector("#userMenu");
const welcomeUsername = document.querySelector("#welcomeUsername");
const logoutButton = document.querySelector("#logoutButton");

const loggedInUser = sessionStorage.getItem("loggedInUser");
const loggedInFirstName = sessionStorage.getItem("loggedInFirstName");

if (loginLink && registerLink && userMenu) {
    if (loggedInUser) {
        loginLink.hidden = true;
        registerLink.hidden = true;
        userMenu.hidden = false;

        if (welcomeUsername) {
            welcomeUsername.textContent =
                loggedInFirstName || loggedInUser;
        }
    } else {
        loginLink.hidden = false;
        registerLink.hidden = false;
        userMenu.hidden = true;
    }
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("loggedInFirstName");
        window.location.href = "HomePage.html";
    });
}


// FAQ SECTION
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    if (!question) return;

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");

            const otherIcon = otherItem.querySelector(".faq-icon");

            if (otherIcon) {
                otherIcon.textContent = "+";
            }
        });

        if (!isActive) {
            item.classList.add("active");

            if (icon) {
                icon.textContent = "−";
            }
        }
    });
});

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


//HOME PAGE THEME TOGGLE
const themeButton =
    document.querySelector("#theme-btn");

const savedTheme =
    localStorage.getItem("mamamiyaTheme");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");

        if (themeButton) {
            themeButton.textContent = "☀️";

            themeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    } else {
        document.body.classList.remove("dark-theme");

        if (themeButton) {
            themeButton.textContent = "🌙";

            themeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }
}


//PAGE LOAD
if (savedTheme === "dark") {
    applyTheme("dark");
} else {
    applyTheme("light");
}


//THEME BUTTON CLICK
if (themeButton) {
    themeButton.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );

            if (isDark) {
                applyTheme("light");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "light"
                );
            } else {
                applyTheme("dark");

                localStorage.setItem(
                    "mamamiyaTheme",
                    "dark"
                );
            }
        }
    );
}