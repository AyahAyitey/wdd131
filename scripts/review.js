// WDD131 – Week 05 | review.js
// Reads URL params from the submitted form, increments the localStorage
// review counter, and renders a summary on the confirmation page.

const STORAGE_KEY = 'reviewCount';

const PRODUCT_NAMES = {
  "fc-1888": "Flux Capacitor",
  "fc-2050": "Power Laces",
  "fs-1987": "Time Circuits",
  "ac-2000": "Low Voltage Reactor",
  "jj-1969": "Warp Equalizer"
};

const RATING_LABELS = {
  "1": "1 ☆ – Terrible",
  "2": "2 ☆ – Poor",
  "3": "3 ☆ – Average",
  "4": "4 ☆ – Good",
  "5": "5 ★ – Excellent"
};

/**
 * Increments the review counter stored in localStorage and returns the new value.
 * @returns {number}
 */
function incrementReviewCount() {
  const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  const updated = current + 1;
  localStorage.setItem(STORAGE_KEY, updated);
  return updated;
}

/**
 * Parses the current page's URL query string and returns an object of key→value pairs.
 * @returns {URLSearchParams}
 */
function getParams() {
  return new URLSearchParams(window.location.search);
}

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable form.
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return 'Not provided';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Builds the review summary HTML and inserts it into the page.
 */
function renderSummary() {
  const params = getParams();
  const summary = document.getElementById('review-summary');
  if (!summary) return;

  const productId   = params.get('product') || '';
  const productName = PRODUCT_NAMES[productId] || productId || 'Unknown Product';
  const rating      = params.get('rating') || '';
  const installDate = params.get('installdate') || '';
  const reviewer    = params.get('username') || 'Anonymous';
  const review      = params.get('review') || '';

  // Collect features (can appear multiple times as &features=...)
  const features = params.getAll('features');
  const featureText = features.length > 0
    ? features.map(f => f.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ')
    : 'None selected';

  summary.innerHTML = `
    <p><strong>Product:</strong> ${productName}</p>
    <p><strong>Rating:</strong> ${rating ? RATING_LABELS[rating] || rating : 'Not provided'}</p>
    <p><strong>Installation Date:</strong> ${formatDate(installDate)}</p>
    <p><strong>Useful Features:</strong> ${featureText}</p>
    ${review ? `<p><strong>Review:</strong> ${review}</p>` : ''}
    <p><strong>Reviewer:</strong> ${reviewer}</p>
  `;
}

/**
 * Updates the review counter display on the page.
 * @param {number} count
 */
function renderCounter(count) {
  const countEl  = document.getElementById('review-count');
  const pluralEl = document.getElementById('review-plural');
  if (countEl)  countEl.textContent  = count;
  if (pluralEl) pluralEl.textContent = count === 1 ? '' : 's';
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
  const count = incrementReviewCount();
  renderCounter(count);
  renderSummary();
});
