// ============================================================
//  WDD 131 – Week 03: Place Page JavaScript
//  Country: Japan  |  Units: Metric (°C, km/h)
// ============================================================

/**
 * Calculates the wind chill factor (Metric / Canadian formula).
 * Valid for temperatures ≤ 10 °C and wind speeds > 4.8 km/h.
 *
 * @param {number} tempC      - Air temperature in °C
 * @param {number} windKmh    - Wind speed in km/h
 * @returns {number}          - Wind chill temperature in °C (rounded to 1 decimal)
 */
function calculateWindChill(tempC, windKmh) {
  return parseFloat((13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)).toFixed(1));
}

// ============================================================
//  Static weather values (match what is displayed in the HTML)
// ============================================================
const TEMPERATURE_C  = 5;    // °C  – matches #temperature span
const WIND_SPEED_KMH = 20;   // km/h – matches #windspeed span

// ============================================================
//  Display wind chill – only when conditions are met
//  Metric conditions: temp ≤ 10 °C  AND  wind > 4.8 km/h
// ============================================================
const windChillEl = document.getElementById("wind-chill");

if (TEMPERATURE_C <= 10 && WIND_SPEED_KMH > 4.8) {
  const chill = calculateWindChill(TEMPERATURE_C, WIND_SPEED_KMH);
  windChillEl.textContent = `${chill} °C`;
} else {
  windChillEl.textContent = "N/A";
}

// ============================================================
//  Footer: current year and last-modified date
// ============================================================
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
