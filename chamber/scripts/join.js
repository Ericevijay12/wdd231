// Set timestamp on form load
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).showModal();
}

function closeModal(modalId) {
    document.getElementById(modalId).close();
}

// Add event listeners to "Learn More" links
document.querySelectorAll('.learn-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('href').substring(1);
        openModal(modalId);
    });
});

// Dynamic copyright year and last modified date
document.getElementById('copyrightYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;