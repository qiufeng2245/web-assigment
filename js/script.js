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