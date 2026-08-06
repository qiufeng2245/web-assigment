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

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

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
            icon.textContent = "−";
        }
    });
});
