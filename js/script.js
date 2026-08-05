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