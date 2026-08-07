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
const skillSection = document.querySelector("#skills");
const skillBars = document.querySelectorAll(".skill-progress");

window.addEventListener("scroll", function () {

    const sectionTop = skillSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {

        skillBars.forEach(function (bar) {
            bar.classList.add("animate");
        });

    }

});