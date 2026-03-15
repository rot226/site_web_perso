document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const navList = nav?.querySelector('.c-nav__list') ?? null;
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const navLinks = Array.from(document.querySelectorAll('.c-nav__link'));
    const sectionIds = new Set(
        Array.from(document.querySelectorAll('main section[id]')).map((section) => section.id)
    );

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const normalizeHash = (hash) => {
        const rawHash = hash || '#about';
        const id = rawHash.replace(/^#/, '');
        return sectionIds.has(id) ? `#${id}` : '#about';
    };

    const syncNavVisibility = (open) => {
        if (!navList) return;

        if (isMobile()) {
            navList.hidden = !open;
        } else {
            navList.hidden = false;
        }
    };

    const setMenuOpen = (open) => {
        if (!nav || !menuButton) return;

        nav.classList.toggle('c-nav--open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
        syncNavVisibility(open);

        if (open && isMobile()) {
            navLinks[0]?.focus();
        }
    };

    if (menuButton) {
        menuButton.setAttribute('aria-label', 'Open main menu');
    }

    const ensureValidHash = () => {
        const nextHash = normalizeHash(window.location.hash);
        if (window.location.hash !== nextHash) {
            window.history.replaceState(null, '', nextHash);
        }
    };

    const updateActiveLink = () => {
        const currentHash = normalizeHash(window.location.hash);

        navLinks.forEach((link) => {
            const linkHash = normalizeHash(link.getAttribute('href'));
            const isActive = linkHash === currentHash;

            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    ensureValidHash();
    updateActiveLink();
    syncNavVisibility(false);

    window.addEventListener('hashchange', () => {
        ensureValidHash();
        updateActiveLink();
    });

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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('c-nav--open')) {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            setMenuOpen(false);
        } else {
            syncNavVisibility(nav.classList.contains('c-nav--open'));
        }
    });
});
