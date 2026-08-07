const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("portfolioTheme", "dark");
    } else {
        localStorage.setItem("portfolioTheme", "light");
    }
});
