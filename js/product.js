const products = [
  { id: 1, name: "Acoustic Guitar", category: "Guitar", price: 299, rating: 4.8, stock: "in", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600", desc: "Handcrafted mahogany acoustic guitar with warm, resonant tones.", reviews: ["Exceptional craftsmanship.", "Clean and crisp sound."] },
  { id: 2, name: "Grand Piano", category: "Piano", price: 1200, rating: 4.9, stock: "in", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600", desc: "Minimalist black grand piano engineered for dynamic response.", reviews: ["An absolute centerpiece."] },
  { id: 3, name: "Concert Ukulele", category: "Ukulele", price: 89, rating: 4.2, stock: "in", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600", desc: "Compact mahogany ukulele designed for sweet sound balance.", reviews: ["Lightweight and resonant."] },
  { id: 4, name: "Classic Violin", category: "Violin", price: 450, rating: 4.6, stock: "out", img: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600", desc: "Hand-finished orchestral violin complete with bow and minimalist hard case.", reviews: ["Rich timbre."] },
  { id: 5, name: "Professional Drum Kit", category: "Drums kits", price: 850, rating: 4.7, stock: "in", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600", desc: "Acoustic 5-piece drum setup built with heavy-duty chrome hardware.", reviews: ["Very punchy low-end."] },
  { id: 6, name: "Brass Trumpet", category: "Trumpets", price: 320, rating: 4.3, stock: "in", img: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?w=600", desc: "Bb standard polished brass trumpet offering immediate response.", reviews: ["Smooth valves."] },
  { id: 7, name: "Silver Flute", category: "Flute", price: 210, rating: 4.1, stock: "out", img: "https://brownliving.in/cdn/shop/files/bamboo-native-american-flute-handmade-musical-instrument-egm07-egai-7913342.jpg?v=1760464462", desc: "Nickel silver C flute featuring closed keys for precise intonation.", reviews: ["Great articulation."] },
  { id: 8, name: "Diatonic Harmonica", category: "Harmonica", price: 45, rating: 4.5, stock: "in", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbavny_PtJ9_342nvpTXOBn2MNnbJzlm55qj-LLHWQZw&s=10", desc: "Key of C 10-hole diatonic harmonica with brushed steel covers.", reviews: ["Pure tones."] }
];

let itemsInCart = 0;
let currentProductId = null;

// Helper: Get user custom reviews from LocalStorage
function getCustomReviews(id) {
  const allReviews = JSON.parse(localStorage.getItem('mamamiyaProductReviews')) || {};
  return allReviews[id] || [];
}

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
  // 1. Get filter element values
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCategory = document.getElementById('categoryFilter').value;
  const selectedStock = document.getElementById('stockFilter').value;
  const maxPrice = parseFloat(document.getElementById('priceFilter').value);
  const sortBy = document.getElementById('sortFilter').value;

  // 2. Filter products array
  let filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery) ||
      (product.desc && product.desc.toLowerCase().includes(searchQuery));

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    const matchesStock = 
      selectedStock === 'all' || 
      (selectedStock === 'in' && product.stock === 'in') || 
      (selectedStock === 'out' && product.stock === 'out');

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
  });

  // 3. Sort products
  if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

  // 4. Render the filtered grid
  renderProducts(filteredProducts);
}

function updatePrice(v) {
  document.getElementById('priceLabel').innerText = v;
}

// Render reviews inside modal (both default strings & user custom reviews)
function renderModalReviews(product) {
  const revsContainer = document.getElementById('mReviews');
  const customReviews = getCustomReviews(product.id);

  let reviewsHTML = "";

  // Render default string reviews from array
  if (product.reviews && product.reviews.length > 0) {
    reviewsHTML += product.reviews.map(r => `
      <div class="review-item">
        <div class="review-text">— "${r}"</div>
      </div>
    `).join('');
  }

  // Render user-submitted reviews saved in localStorage
  if (customReviews.length > 0) {
    reviewsHTML += customReviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-author">${escapeHTML(r.author)}</span>
          <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
        <div class="review-text">"${escapeHTML(r.comment)}"</div>
      </div>
    `).join('');
  }

  if (!reviewsHTML) {
    reviewsHTML = `<div style="font-size: 0.8rem; color: var(--text-muted);">No reviews yet. Be the first to leave one!</div>`;
  }

  revsContainer.innerHTML = reviewsHTML;
}

function openModal(id) {
  currentProductId = id;
  const p = products.find(x => x.id === id);
  
  document.getElementById('mImg').src = p.img;
  document.getElementById('mTitle').innerText = p.name;
  document.getElementById('mPrice').innerText = `$${p.price}`;
  document.getElementById('mDesc').innerText = p.desc;
  
  renderModalReviews(p);

  // Reset form fields
  const form = document.getElementById('reviewForm');
  if (form) form.reset();

  document.getElementById('productModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
  currentProductId = null;
}

function addToCart() {
  itemsInCart++;
  document.getElementById('cartCount').innerText = `Cart (${itemsInCart})`;
  closeModal();
}

// Handle Form Submission for new review
function handleReviewSubmit(event) {
  event.preventDefault();
  if (!currentProductId) return;

  const rating = parseInt(document.getElementById('reviewRating').value);
  const author = document.getElementById('reviewerName').value.trim();
  const comment = document.getElementById('reviewComment').value.trim();

  if (!author || !comment) return;

  const newReview = { rating, author, comment, timestamp: new Date().toISOString() };

  // Save to LocalStorage
  const allReviews = JSON.parse(localStorage.getItem('mamamiyaProductReviews')) || {};
  if (!allReviews[currentProductId]) {
    allReviews[currentProductId] = [];
  }
  allReviews[currentProductId].push(newReview);
  localStorage.setItem('mamamiyaProductReviews', JSON.stringify(allReviews));

  // Re-render reviews list inside modal dynamically
  const product = products.find(p => p.id === currentProductId);
  renderModalReviews(product);

  // Reset form inputs
  document.getElementById('reviewForm').reset();
}

// Prevent cross-site scripting
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial page render
renderProducts(products);

// PRODUCT PAGE THEME TOGGLE
const productThemeButton = document.querySelector("#theme-btn");
const productSavedTheme = localStorage.getItem("mamamiyaTheme");

function applyProductTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    if (productThemeButton) {
      productThemeButton.textContent = "☀️";
      productThemeButton.setAttribute("aria-label", "Switch to light mode");
    }
  } else {
    document.body.classList.remove("dark-theme");
    if (productThemeButton) {
      productThemeButton.textContent = "🌙";
      productThemeButton.setAttribute("aria-label", "Switch to dark mode");
    }
  }
}

if (productSavedTheme === "dark") {
  applyProductTheme("dark");
} else {
  applyProductTheme("light");
}

if (productThemeButton) {
  productThemeButton.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-theme");
    if (isDark) {
      applyProductTheme("light");
      localStorage.setItem("mamamiyaTheme", "light");
    } else {
      applyProductTheme("dark");
      localStorage.setItem("mamamiyaTheme", "dark");
    }
  });
}