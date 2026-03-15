document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const navLinks = Array.from(document.querySelectorAll('.c-nav__link'));

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const normalizePath = (path) => {
        if (!path || path === '/') return '/index.html';
        return path.endsWith('/') ? `${path}index.html` : path;
    };

    const setMenuOpen = (open) => {
        if (!nav || !menuButton) return;
        nav.classList.toggle('c-nav--open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
    };

    if (menuButton) {
        menuButton.setAttribute('aria-label', 'Open main menu');
    }

    const updateActiveLink = () => {
        const currentPath = normalizePath(window.location.pathname);
        const currentHash = window.location.hash;

        navLinks.forEach((link) => {
            const url = new URL(link.getAttribute('href'), window.location.href);
            const linkPath = normalizePath(url.pathname);
            const linkHash = url.hash;

            const hashMatch = linkHash && linkPath === currentPath && linkHash === currentHash;
            const indexDefault = !currentHash && currentPath === '/index.html' && linkPath === '/index.html' && linkHash === '#about';
            const pageMatch = !linkHash && linkPath === currentPath;
            const isActive = hashMatch || indexDefault || pageMatch;

            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', linkHash ? 'location' : 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    updateActiveLink();
    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('popstate', updateActiveLink);

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
