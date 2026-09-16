// =============================================
// temples.js — Temple Album: Filtering, Lazy Load, Hamburger, Footer
// =============================================

// --- Temple Data Array ---
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Salt_Lake_Temple%2C_Utah_-_Sept_2004.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/RomeTempleatSunset.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17400,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/28/Ghana_Mission_247.jpg"
  }
];

// =============================================
// Helper: Parse dedicated year from "YYYY, Month, Day"
// =============================================
function getDedicatedYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(",")[0].trim(), 10);
}

// =============================================
// Filter Functions
// Each returns a filtered subset of temples[]
// =============================================
const filterFunctions = {
  // Home: all temples
  home: () => temples,

  // Old: dedicated before 1900
  old: () => temples.filter(t => getDedicatedYear(t.dedicated) < 1900),

  // New: dedicated after 2000
  new: () => temples.filter(t => getDedicatedYear(t.dedicated) > 2000),

  // Large: area greater than 90,000 sq ft
  large: () => temples.filter(t => t.area > 90000),

  // Small: area less than 10,000 sq ft
  small: () => temples.filter(t => t.area < 10000)
};

// =============================================
// Filter heading labels
// =============================================
const filterHeadings = {
  home: "All Temples",
  old: "Old Temples (Before 1900)",
  new: "New Temples (After 2000)",
  large: "Large Temples (Over 90,000 sq ft)",
  small: "Small Temples (Under 10,000 sq ft)"
};

// =============================================
// Render temple cards into #temple-gallery
// =============================================
function renderTemples(filteredList) {
  const gallery = document.getElementById("temple-gallery");
  const heading = document.getElementById("gallery-heading");

  // Clear previous cards
  gallery.innerHTML = "";

  if (filteredList.length === 0) {
    gallery.innerHTML = "<p class='no-results'>No temples match this filter.</p>";
    return;
  }

  // Build a figure card for each temple using map + join
  gallery.innerHTML = filteredList
    .map(
      temple => `
      <figure class="temple-card">
        <img
          src="${temple.imageUrl}"
          alt="Photo of the ${temple.templeName} Temple"
          loading="lazy"
          width="400"
          height="250"
        />
        <figcaption>
          <h3>${temple.templeName}</h3>
          <p><span>Location:</span> ${temple.location}</p>
          <p><span>Dedicated:</span> ${temple.dedicated}</p>
          <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
      </figure>`
    )
    .join("");
}

// =============================================
// Hamburger Menu Toggle
// =============================================
function initHamburger() {
  const btn = document.getElementById("hamburger-btn");
  const navList = document.getElementById("nav-list");

  btn.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    // Toggle icon between ☰ and ✕
    btn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    btn.setAttribute("aria-expanded", isOpen.toString());
  });
}

// =============================================
// Filter Navigation — attach click listeners
// =============================================
function initFilterNav() {
  const filterLinks = document.querySelectorAll(".filter-btn");
  const heading = document.getElementById("gallery-heading");
  const navList = document.getElementById("nav-list");
  const btn = document.getElementById("hamburger-btn");

  filterLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const filter = link.dataset.filter;

      // Update active class
      filterLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Update gallery heading
      heading.textContent = filterHeadings[filter];

      // Render filtered temples
      renderTemples(filterFunctions[filter]());

      // Close hamburger menu after selection (mobile UX)
      navList.classList.remove("open");
      btn.innerHTML = "&#9776;";
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// =============================================
// Dynamic Footer
// =============================================
function initFooter() {
  const yearEl = document.getElementById("copyright-year");
  const modifiedEl = document.getElementById("last-modified");

  yearEl.textContent = new Date().getFullYear();
  modifiedEl.textContent = document.lastModified;
}

// =============================================
// Init — runs after DOM is ready (script is deferred)
// =============================================
function init() {
  renderTemples(temples);   // Default: show all
  initHamburger();
  initFilterNav();
  initFooter();
}

init();
