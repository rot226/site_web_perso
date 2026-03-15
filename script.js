document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.c-header__menu-toggle');
    const nav = document.querySelector('#primary-navigation');
    const navLinks = [...document.querySelectorAll('.c-nav__link')];
    const sections = [...document.querySelectorAll('main section[id]')];

    if (!menuButton || !nav || navLinks.length === 0) return;

    const setMenuState = (open) => {
        nav.classList.toggle('c-nav--open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
    };

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        setActiveLink(currentHash);
    }

    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.contains('c-nav--open');
        setMenuState(!isOpen);
    });

    document.addEventListener('click', (event) => {
        if (!nav.classList.contains('c-nav--open')) return;
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            setMenuState(false);
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const id = link.getAttribute('href').replace('#', '');
            setActiveLink(id);
            setMenuState(false);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) {
                setActiveLink(visible.target.id);
            }
        },
        {
            threshold: [0.35, 0.6],
            rootMargin: '-20% 0px -45% 0px'
        }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener('hashchange', () => {
        const id = window.location.hash.replace('#', '');
        if (id) setActiveLink(id);
    });

    window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
        if (event.matches) {
            setMenuState(false);
        }
    });

    setMenuState(false);
});
