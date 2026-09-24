// WDD131 – Week 05 | form.js
// Populates the Product Name <select> dynamically from the products array.

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

/**
 * Capitalises the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Builds and injects <option> elements into the product <select>.
 * The option's value is the product id; the display text is the product name.
 */
function populateProductSelect() {
  const select = document.getElementById('product-name');
  if (!select) return;

  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = toTitleCase(product.name);
    select.appendChild(option);
  });
}

// Run on DOMContentLoaded to ensure the element exists
document.addEventListener('DOMContentLoaded', populateProductSelect);
