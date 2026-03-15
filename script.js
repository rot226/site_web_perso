document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const navLinks = Array.from(document.querySelectorAll('.c-nav__link'));

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const setMenuOpen = (open) => {
        if (!nav || !menuButton) return;
        nav.classList.toggle('c-nav--open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
    };

    if (menuButton) {
        menuButton.setAttribute('aria-label', 'Open main menu');
    }

    const ensureDefaultHash = () => {
        if (!window.location.hash) {
            window.history.replaceState(null, '', '#about');
        }
    };

    const updateActiveLink = () => {
        const currentHash = window.location.hash || '#about';

        navLinks.forEach((link) => {
            const linkHash = link.getAttribute('href');
            const isActive = linkHash === currentHash;

            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    ensureDefaultHash();
    updateActiveLink();
    window.addEventListener('hashchange', updateActiveLink);

    if (!nav || !menuButton) return;

    menuButton.addEventListener('click', () => {
        setMenuOpen(!nav.classList.contains('c-nav--open'));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (isMobile()) setMenuOpen(false);
            requestAnimationFrame(updateActiveLink);
        });
    });

    document.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) setMenuOpen(false);
    });
});
