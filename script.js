document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#primary-navigation');
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const menuLabel = menuButton?.querySelector('.c-header__menu-label') ?? null;
    const navLinks = Array.from(document.querySelectorAll('.c-nav__link'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const sectionIds = new Set(sections.map((section) => section.id));

    if (!nav || !menuButton || navLinks.length === 0) return;

    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    const isMobile = () => mobileMediaQuery.matches;

    const normalizeHash = (hash) => {
        const rawHash = hash || '#about';
        const id = rawHash.replace(/^#/, '');
        return sectionIds.has(id) ? `#${id}` : '#about';
    };

    const setMenuLabel = (open) => {
        const label = open ? 'Close main menu' : 'Open main menu';
        menuButton.setAttribute('aria-label', label);
        if (menuLabel) {
            menuLabel.textContent = label;
        }
    };

    const updateActiveLink = (activeHash) => {
        const currentHash = normalizeHash(activeHash ?? window.location.hash);

        navLinks.forEach((link) => {
            const isActive = normalizeHash(link.getAttribute('href')) === currentHash;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const closeMenu = ({ restoreFocus = false } = {}) => {
        nav.classList.remove('c-nav--open');
        menuButton.setAttribute('aria-expanded', 'false');
        setMenuLabel(false);

        if (restoreFocus) {
            menuButton.focus();
        }
    };

    const openMenu = () => {
        if (!isMobile()) return;

        nav.classList.add('c-nav--open');
        menuButton.setAttribute('aria-expanded', 'true');
        setMenuLabel(true);
    };

    const toggleMenu = () => {
        if (nav.classList.contains('c-nav--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const ensureValidHash = () => {
        const nextHash = normalizeHash(window.location.hash);
        if (window.location.hash !== nextHash) {
            window.history.replaceState(null, '', nextHash);
        }

        return nextHash;
    };

    const updateActiveLinkFromViewport = () => {
        if (sections.length === 0) return;

        const viewportMidline = window.innerHeight * 0.35;
        let bestSection = sections[0];
        let smallestDistance = Number.POSITIVE_INFINITY;

        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const inRange = sectionTop <= viewportMidline && sectionBottom >= viewportMidline;

            if (inRange) {
                bestSection = section;
                break;
            }

            const distance = Math.min(Math.abs(sectionTop - viewportMidline), Math.abs(sectionBottom - viewportMidline));
            if (distance < smallestDistance) {
                smallestDistance = distance;
                bestSection = section;
            }
        }

        const hash = `#${bestSection.id}`;
        updateActiveLink(hash);
    };

    const onNavLinkActivate = (link) => {
        const nextHash = normalizeHash(link.getAttribute('href'));
        updateActiveLink(nextHash);

        if (window.location.hash !== nextHash) {
            window.history.pushState(null, '', nextHash);
        }

        if (isMobile()) {
            closeMenu();
        }
    };

    ensureValidHash();
    updateActiveLink(window.location.hash);
    setMenuLabel(false);

    menuButton.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener('click', () => onNavLinkActivate(link));

        link.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onNavLinkActivate(link);
                const target = document.querySelector(normalizeHash(link.getAttribute('href')));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('c-nav--open')) {
            closeMenu({ restoreFocus: true });
        }
    });

    document.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener('hashchange', () => {
        const nextHash = ensureValidHash();
        updateActiveLink(nextHash);
    });

    window.addEventListener('scroll', updateActiveLinkFromViewport, { passive: true });

    mobileMediaQuery.addEventListener('change', (event) => {
        if (!event.matches) {
            closeMenu();
        }
    });
});
