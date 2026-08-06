const collectionItems = document.querySelectorAll(".collection-item");
const previewImg = document.getElementById("previewImg");

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

document.querySelector(".collection-content").addEventListener("mouseleave", () => {
    previewImg.classList.remove("show");
});
<<<<<<< HEAD

//HOME PAGE LOGIN STATUS

const loginLink = document.querySelector("#loginLink");
const registerLink = document.querySelector("#registerLink");
const userMenu = document.querySelector("#userMenu");
const welcomeUsername = document.querySelector("#welcomeUsername");
const logoutButton = document.querySelector("#logoutButton");

const loggedInUser =
    sessionStorage.getItem("loggedInUser");

const loggedInFirstName =
    sessionStorage.getItem("loggedInFirstName");

if (loggedInUser) {
    loginLink.hidden = true;
    registerLink.hidden = true;
    userMenu.hidden = false;

    welcomeUsername.textContent =
        loggedInFirstName || loggedInUser;
} else {
    loginLink.hidden = false;
    registerLink.hidden = false;
    userMenu.hidden = true;
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("loggedInFirstName");

        window.location.href = "HomePage.html";
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

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    } else {
        document.body.classList.remove("dark-theme");

        themeButton.textContent = "🌙";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}

if (savedTheme === "dark") {
    applyTheme("dark");
} else {
    applyTheme("light");
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
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
    });
}
=======
const emailBox = document.querySelector(".footer-email");
const emailText = document.getElementById("emailText");
const copyMessage = document.getElementById("copyMessage");
const email = "admin@mamamiya.com";

emailBox.addEventListener("mouseenter", () => {

    emailText.textContent = email;

});

emailBox.addEventListener("mouseleave", () => {

    emailText.textContent = "Contact Us";

});

emailBox.addEventListener("click", () => {
    navigator.clipboard.writeText(email);
    copyMessage.textContent = "✓ Email copied!";
    setTimeout(() => {

        copyMessage.textContent = "";

    },2000);

});
>>>>>>> 7679193d645b6970cd3156796227cb2ce727ba63
