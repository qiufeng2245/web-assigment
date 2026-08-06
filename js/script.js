const collectionItem = document.querySelector(".collection-item");
const previewImg = document.getElementById("previewImg");

collectionItem.addEventListener("mouseenter", function () {
    previewImg.src = collectionItem.dataset.image;
    previewImg.alt = collectionItem.dataset.alt;
    previewImg.classList.add("show");
});

collectionItem.addEventListener("mouseleave", function () {
    previewImg.classList.remove("show");
});

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