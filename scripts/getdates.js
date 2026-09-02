// Dynamically set the copyright year in the footer
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dynamically display the last modified date of the document
const lastModifiedPara = document.getElementById("lastModified");
if (lastModifiedPara) {
  lastModifiedPara.textContent = "Last Modified: " + document.lastModified;
}

