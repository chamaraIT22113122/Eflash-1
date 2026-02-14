// Store all products data
let allProducts = [];

// Function to extract product data from the shop page
function extractProductsFromShop() {
    const productCards = document.querySelectorAll('.product-card');
    allProducts = Array.from(productCards).map(card => ({
        image: card.querySelector('img').src,
        name: card.querySelector('.product-name').textContent,
        description: card.querySelector('.product-desc') ? card.querySelector('.product-desc').textContent : '',
        price: card.querySelector('.product-price').textContent
    }));
    return allProducts;
}

// Function to get random products
function getRandomProducts(count = 4) {
    // If no products loaded yet, return empty array
    if (allProducts.length === 0) return [];
    
    // Shuffle array and get first 'count' items
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to create a slideshow card HTML
function createSlideshowCard(product) {
    return `
        <div class="slideshow-card">
            <img src="${product.image}" alt="${product.name}" style="width:100%;max-width:140px;border-radius:10px;margin-bottom:12px;">
            <div class="product-name">${product.name}</div>
            <div class="product-desc">${product.description}</div>
            <div class="product-price">${product.price}</div>
            <a href="shop.html" class="add-to-cart-btn" style="margin-top:8px;">Buy Now</a>
        </div>
    `;
}

// Function to update slideshow with random products
function updateSlideshow() {
    const track = document.querySelector('.slideshow-track');
    if (!track) return;

    // Get random products
    const randomProducts = getRandomProducts();
    
    // Clear existing cards
    track.innerHTML = '';
    
    // Add new random product cards
    randomProducts.forEach(product => {
        track.innerHTML += createSlideshowCard(product);
    });
}

// Initialize products when on shop page
if (window.location.pathname.includes('shop.html')) {
    window.addEventListener('DOMContentLoaded', function() {
        extractProductsFromShop();
        // Store products in localStorage
        localStorage.setItem('eflashProducts', JSON.stringify(allProducts));
    });
}

// Initialize slideshow when on index page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    window.addEventListener('DOMContentLoaded', function() {
        // Load products from localStorage
        const storedProducts = localStorage.getItem('eflashProducts');
        if (storedProducts) {
            allProducts = JSON.parse(storedProducts);
            updateSlideshow();
        }
    });
}