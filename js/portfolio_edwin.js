const themeButton =
    document.querySelector("#theme-btn");

const savedTheme =
    localStorage.getItem("mamamiyaTheme");


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

        if (themeButton) {
            themeButton.textContent = "☀️";

            themeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    } else {

        document.body.classList.remove(
            "dark-theme"
        );

        if (themeButton) {
            themeButton.textContent = "🌙";

            themeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }
}

if (savedTheme === "dark") {
    applyTheme("dark");
} else {
    applyTheme("light");
}

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