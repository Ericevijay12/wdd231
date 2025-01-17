// Update Last Update Time
function updateLastUpdateTime() {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  document.getElementById("last-update").textContent = formattedDate;
}

updateLastUpdateTime(); // Initial call

// Smooth Scrolling for Navigation Links (excluding LinkedIn)
document.querySelectorAll('nav a').forEach(anchor => {
  if (!anchor.getAttribute('href').startsWith('http')) { // Exclude external links
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});
