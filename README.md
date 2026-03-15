# Personal website (static)

This repository contains a **static academic showcase website**.

## Tech stack

- **HTML** for page structure.
- **CSS** for presentation and responsive layout.
- **Vanilla JavaScript** for:
  - active navigation highlighting,
  - mobile menu behavior,
  - link state synchronization.

No backend is required to run this site.

## Deployment

The website can be deployed easily with **GitHub Pages**.

### Quick option (`main` branch)

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Choose source: **Deploy from a branch**.
4. Select branch (`main`) and root folder (`/root`).
5. Save and wait for publication.

## How to update content

- **Home page** (`index.html`): profile, summary, highlights, contact block.
- **Experience** (`experience.html`): timeline items and role descriptions.
- **Projects** (`projects.html`): each `<article class="project-card">` block (`Paper`, `Code`, `Website` links).
- **Publications** (`publications.html`): edit entries inside `<ol class="pub-list">` by updating each `<li class="pub-item">` block (`.pub-authors`, `.pub-main`, `.pub-venue`, `.pub-doi`, and `.pub-links`).
- **Contact** (`contact.html`): update the main LinkedIn contact CTA in `<article class="contact-card">` (`<a class="contact-link" ...>`), and optional GitHub follow link in the home page contact section (`index.html`, `.profile-card__links`).
- **Styles** (`style.css`): global tokens, components, responsive rules.
- **Front-end behavior** (`script.js`): mobile navigation and active-link logic.

> Tip: after each content update, open the modified pages locally and verify all external links before pushing.
