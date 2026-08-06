const products = [
  { id: 1, name: "Acoustic Guitar", category: "Guitar", price: 299, rating: 4.8, stock: "in", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600", desc: "Handcrafted mahogany acoustic guitar with warm, resonant tones.", reviews: ["Exceptional craftsmanship.", "Clean and crisp sound."] },
  { id: 2, name: "Grand Piano", category: "Piano", price: 1200, rating: 4.9, stock: "in", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600", desc: "Minimalist black grand piano engineered for dynamic response.", reviews: ["An absolute centerpiece."] },
  { id: 3, name: "Concert Ukulele", category: "Ukulele", price: 89, rating: 4.2, stock: "in", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600", desc: "Compact mahogany ukulele designed for sweet sound balance.", reviews: ["Lightweight and resonant."] },
  { id: 4, name: "Classic Violin", category: "Violin", price: 450, rating: 4.6, stock: "out", img: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600", desc: "Hand-finished orchestral violin complete with bow and minimalist hard case.", reviews: ["Rich timbre."] },
  { id: 5, name: "Professional Drum Kit", category: "Drums kits", price: 850, rating: 4.7, stock: "in", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600", desc: "Acoustic 5-piece drum setup built with heavy-duty chrome hardware.", reviews: ["Very punchy low-end."] },
  { id: 6, name: "Brass Trumpet", category: "Trumpets", price: 320, rating: 4.3, stock: "in", img: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?w=600", desc: "Bb standard polished brass trumpet offering immediate response.", reviews: ["Smooth valves."] },
  { id: 7, name: "Silver Flute", category: "Flute", price: 210, rating: 4.1, stock: "out", img: "https://www.google.com/imgres?q=flute&imgurl=https%3A%2F%2Fcdn.britannica.com%2F65%2F129665-050-73DB433C%2Fflute.jpg&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fart%2Fflute-musical-instrument&docid=B3FZUqLS_YQAdM&tbnid=j1hase-yWNhjgM&vet=12ahUKEwi9rZCV5vmVAxWrS2cHHW7gIcQQnPAOegQIMxAA..i&w=1600&h=1017&hcb=2&ved=2ahUKEwi9rZCV5vmVAxWrS2cHHW7gIcQQnPAOegQIMxAA", desc: "Nickel silver C flute featuring closed keys for precise intonation.", reviews: ["Great articulation."] },
  { id: 8, name: "Diatonic Harmonica", category: "Harmonica", price: 45, rating: 4.5, stock: "in", img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AlgMBIgACEQEDEQH/xAAcAAEAAgMBAQE────────AAAAABQYDBAcCAQj/xAA8EAABBAEBBQQIAwYHAQAAAAABAAIDBBEFEiExQVEGgZGhBxMUIjJCYXGiscEjM1Ji0fBDU2O... (truncated base64 string)", desc: "Key of C 10-hole diatonic harmonica with brushed steel covers.", reviews: ["Pure tones."] }
];

let itemsInCart = 0;

function renderProducts(items) {
  const grid = document.getElementById('gridContainer');
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.9rem;">No instruments found.</p>`;
    return;
  }

  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openModal(p.id);
    card.innerHTML = `
      <div class="image-wrapper">
        <img src="${p.img}" alt="${p.name}">
        <div class="brand-tag">MamaMiya</div>
      </div>
      <div class="card-meta">
        <span class="card-title">${p.name}</span>
        <span class="card-price">$${p.price}</span>
      </div>
      <div class="card-details">
        <span>★ ${p.rating}</span>
        <span>${p.stock === 'in' ? 'Available' : 'Out of Stock'}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const category = document.getElementById('categoryFilter').value;
  const stock = document.getElementById('stockFilter').value;
  const maxPrice = parseFloat(document.getElementById('priceFilter').value);
  const sort = document.getElementById('sortFilter').value;

  let filtered = products.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchStock = stock === 'all' || p.stock === stock;
    const matchPrice = p.price <= maxPrice;
    return matchCat && matchStock && matchPrice;
  });

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

function updatePrice(v) {
  document.getElementById('priceLabel').innerText = v;
}

function openModal(id) {
  const p = products.find(x => x.id === id);
  document.getElementById('mImg').src = p.img;
  document.getElementById('mTitle').innerText = p.name;
  document.getElementById('mPrice').innerText = `$${p.price}`;
  document.getElementById('mDesc').innerText = p.desc;
  
  const revs = document.getElementById('mReviews');
  revs.innerHTML = p.reviews.map(r => `<div class="review-item">— "${r}"</div>`).join('');
  
  document.getElementById('productModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

function addToCart() {
  itemsInCart++;
  document.getElementById('cartCount').innerText = `Cart (${itemsInCart})`;
  closeModal();
}

renderProducts(products);

// PRODUCT PAGE THEME TOGGLE
const productThemeButton =
  document.querySelector("#theme-btn");

const productSavedTheme =
  localStorage.getItem("mamamiyaTheme");

function applyProductTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");

    if (productThemeButton) {
      productThemeButton.textContent = "☀️";

      productThemeButton.setAttribute(
        "aria-label",
        "Switch to light mode"
      );
    }
  } else {
    document.body.classList.remove("dark-theme");

    if (productThemeButton) {
      productThemeButton.textContent = "🌙";

      productThemeButton.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );
    }
  }
}


// Page loads saved theme
if (productSavedTheme === "dark") {
  applyProductTheme("dark");
} else {
  applyProductTheme("light");
}


// Switch theme
if (productThemeButton) {
  productThemeButton.addEventListener(
    "click",
    function () {
      const isDark =
        document.body.classList.contains(
          "dark-theme"
        );

      if (isDark) {
        applyProductTheme("light");

        localStorage.setItem(
          "mamamiyaTheme",
          "light"
        );
      } else {
        applyProductTheme("dark");

        localStorage.setItem(
          "mamamiyaTheme",
          "dark"
        );
      }
    }
  );
}