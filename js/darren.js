// Select the theme toggle button from the HTML
const themeButton = document.querySelector("#theme-btn");

// Retrieve the saved theme preference from local storage
const savedTheme = localStorage.getItem("mamamiyaTheme");

/**
 * Function to apply the selected theme (dark or light)
 * @param {string} theme - "dark" or "light"
 */
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");

        if (themeButton) {
            themeButton.textContent = "☀️";
            themeButton.setAttribute("aria-label", "Switch to light mode");
        }
    } else {
        document.body.classList.remove("dark-theme");

        if (themeButton) {
            themeButton.textContent = "🌙";
            themeButton.setAttribute("aria-label", "Switch to dark mode");
        }
    }
}

// Apply saved theme on page load (defaults to light mode if nothing is saved)
if (savedTheme === "dark") {
    applyTheme("dark");
} else {
    applyTheme("light");
}

// Event listener for the theme button click
if (themeButton) {
    themeButton.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-theme");

        if (isDark) {
            applyTheme("light");
            localStorage.setItem("mamamiyaTheme", "light");
        } else {
            applyTheme("dark");
            localStorage.setItem("mamamiyaTheme", "dark");
        }
    });
}