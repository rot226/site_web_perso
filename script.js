document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const navLinks = Array.from(document.querySelectorAll('.c-nav__link'));

    const isMobileView = () => window.matchMedia('(max-width: 768px)').matches;

    const normalizePathname = (pathname) => {
        const cleanedPath = pathname.replace(/\/+$|^$/g, '') || '/';
        if (cleanedPath === '/') {
            return '/index.html';
        }
        return cleanedPath.startsWith('/') ? cleanedPath : `/${cleanedPath}`;
    };

    const currentPath = () => normalizePathname(window.location.pathname);

    const setMenuState = (open) => {
        if (!nav || !menuButton) return;
        nav.classList.toggle('c-nav--open', open);
        menuButton.setAttribute('aria-expanded', String(open));
    };

    const updateActiveLink = () => {
        const activePath = currentPath();
        const activeHash = window.location.hash;

        navLinks.forEach((link) => {
            link.classList.remove('is-active');

            const href = link.getAttribute('href');
            if (!href) return;

            const linkUrl = new URL(href, window.location.href);
            const linkPath = normalizePathname(linkUrl.pathname);
            const linkHash = linkUrl.hash;

            const isSamePageHashLink = linkPath === activePath && Boolean(linkHash);
            const isPathMatch = linkPath === activePath && !linkHash;
            const isHashMatch = isSamePageHashLink && linkHash === activeHash;
            const isDefaultIndexSection =
                activePath === '/index.html' &&
                !activeHash &&
                href.startsWith('#about');

            if (isPathMatch || isHashMatch || isDefaultIndexSection) {
                link.classList.add('is-active');
            }
        });
    };

    updateActiveLink();

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (isMobileView()) {
                setMenuState(false);
            }

            // Wait for URL/hash to update, then derive the active state from location.
            requestAnimationFrame(updateActiveLink);
        });
    });

    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('popstate', updateActiveLink);

    if (!nav || !menuButton) return;

    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.contains('c-nav--open');
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
