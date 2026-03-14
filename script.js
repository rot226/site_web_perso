// Add active class to navigation links when clicked
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    // Mark the first link as active on initial load
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});