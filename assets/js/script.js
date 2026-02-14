// Shuffle slideshow cards for random order
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slideshow-track');
  if (!track) return;
  const cards = Array.from(track.children);
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    track.appendChild(cards[j]);
    cards[j] = cards[i];
  }
});
// Responsive Slideshow Logic
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.slideshow-container');
  if (!container) return;
  const track = container.querySelector('.slideshow-track');
  const cards = Array.from(track.children);
  const leftBtn = container.querySelector('.slideshow-arrow.left');
  const rightBtn = container.querySelector('.slideshow-arrow.right');
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  }

  function scrollToIndex(index) {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const cardWidth = cards[0].offsetWidth + 16; // 16px margin (8px each side)
    track.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
  }

  leftBtn.addEventListener('click', function() {
    scrollToIndex(currentIndex - getVisibleCount());
  });
  rightBtn.addEventListener('click', function() {
    scrollToIndex(currentIndex + getVisibleCount());
  });

  window.addEventListener('resize', function() {
    scrollToIndex(currentIndex);
  });

  // Initialize
  scrollToIndex(0);

  // Auto-rotate the slideshow every 3 seconds
  setInterval(function() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    let nextIndex = currentIndex + visible;
    if (nextIndex > maxIndex) nextIndex = 0;
    scrollToIndex(nextIndex);
  }, 3000);
});
'use strict';

// Initialize theme to light mode on first visit
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light_theme");
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
    const themeToggleBtn = document.querySelector("[data-theme-btn]");
    if (themeToggleBtn) {
      themeToggleBtn.classList.add("active");
    }
    // Set light theme images
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) navLogo.src = "./assets/images/logo.png";
    const aboutBanner = document.getElementById("about-banner");
    if (aboutBanner) aboutBanner.src = "./assets/images/about-banner2.png";
    const footerLogo = document.getElementById("footer-logo");
    if (footerLogo) footerLogo.src = "./assets/images/logo.png";
  }
});

// Header search for all pages
document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('header-search-form');
  var searchInput = document.getElementById('header-search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      // Simple page search: match against known pages
      var pages = [
        {name: 'Home', url: 'index.html#home'},
        {name: 'About', url: 'index.html#about'},
        {name: 'Portfolio', url: 'Portfolio.html'},
        {name: 'Shop', url: 'shop.html'},
        {name: 'Contact', url: 'index.html#contact'}
      ];
      var found = pages.find(function(page) {
        return page.name.toLowerCase().includes(query);
      });
      if (found) {
        window.location.href = found.url;
      } else {
        alert('No matching page found.');
      }
    });
  }
});

// Header search for all pages
document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('header-search-form');
  var searchInput = document.getElementById('header-search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      // Simple page search: match against known pages
      var pages = [
        {name: 'Home', url: 'index.html'},
        {name: 'About', url: 'index.html#about'},
        {name: 'Portfolio', url: 'Portfolio.html'},
        {name: 'Shop', url: 'shop.html'},
        {name: 'Contact', url: 'index.html#contact'}
      ];
      var found = pages.find(function(page) {
        return page.name.toLowerCase().includes(query);
      });
      if (found) {
        window.location.href = found.url;
      } else {
        alert('No matching page found.');
      }
    });
  }
});

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
    // Update logos for light theme
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) navLogo.src = "./assets/images/logo.png";
    const aboutBanner = document.getElementById("about-banner");
    if (aboutBanner) aboutBanner.src = "./assets/images/about-banner2.png";
    const footerLogo = document.getElementById("footer-logo");
    if (footerLogo) footerLogo.src = "./assets/images/logo.png";
    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");
    // Update logos for dark theme
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) navLogo.src = "./assets/images/logo1.png";
    const aboutBanner = document.getElementById("about-banner");
    if (aboutBanner) aboutBanner.src = "./assets/images/about-banner.png";
    const footerLogo = document.getElementById("footer-logo");
    if (footerLogo) footerLogo.src = "./assets/images/logo1.png";
    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * Initialize and apply theme
 */

// Set default theme to light if not set
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light_theme");
}

// Apply theme based on localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark_theme") {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
  // Update logos for dark theme
  const navLogo = document.getElementById("nav-logo");
  if (navLogo) navLogo.src = "./assets/images/logo1.png";
  const aboutBanner = document.getElementById("about-banner");
  if (aboutBanner) aboutBanner.src = "./assets/images/about-banner.png";
  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo) footerLogo.src = "./assets/images/logo1.png";
} else {
  // Light theme is default
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
  // Update logos for light theme
  const navLogo = document.getElementById("nav-logo");
  if (navLogo) navLogo.src = "./assets/images/logo.png";
  const aboutBanner = document.getElementById("about-banner");
  if (aboutBanner) aboutBanner.src = "./assets/images/about-banner2.png";
  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo) footerLogo.src = "./assets/images/logo.png";
}

