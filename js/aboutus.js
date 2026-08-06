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