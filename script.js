document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('nav a');

    const isMobileView = () => window.matchMedia('(max-width: 768px)').matches;

    const setMenuState = (open) => {
        if (!nav || !menuButton) return;
        nav.classList.toggle('is-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
    };

    // Mark the first link as active on initial load
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');

            if (isMobileView()) {
                setMenuState(false);
            }
        });
    });

    if (!nav || !menuButton) return;

    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.contains('is-open');
        setMenuState(!isOpen);
    });

    // Explicit keyboard support (Enter/Espace)
    menuButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            menuButton.click();
        }
    });

    document.addEventListener('click', (event) => {
        if (!isMobileView()) return;
        const clickedInsideMenu = nav.contains(event.target) || menuButton.contains(event.target);
        if (!clickedInsideMenu) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobileView()) {
            setMenuState(false);
        }
    });
});
