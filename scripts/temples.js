// temples.js – Hamburger menu toggle + dynamic footer content

// ── Dynamic footer: copyright year ──────────────────────────
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ── Dynamic footer: last modified date ──────────────────────
const lastModifiedSpan = document.getElementById('last-modified');
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

// ── Hamburger menu toggle ────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav      = document.getElementById('main-nav');

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');

    // Update aria-expanded for accessibility
    hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());

    // Swap icon: ☰ closed → ✕ open
    hamburgerBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // Close menu when a nav link is clicked (better UX on mobile)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#9776;';
    });
  });
}
