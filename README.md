# Personal website (static, one-page)

This repository contains a **static one-page academic showcase website**.

## Tech stack

- **HTML** for page structure.
- **CSS** for presentation and responsive layout.
- **Vanilla JavaScript** for:
  - active navigation highlighting,
  - mobile menu behavior,
  - anchor link state synchronization.

No backend is required to run this site.

## Site architecture

The website is now **single-page only**: all content is centralized in `index.html` and navigated via anchors (`#about`, `#experience`, `#projects`, `#publications`, `#contact`).

Legacy secondary HTML files (`experience.html`, `projects.html`, `publications.html`, `contact.html`) are kept only as lightweight redirects to preserve old links.

## Deployment

The website can be deployed easily with **GitHub Pages**.

### Quick option (`main` branch)

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Choose source: **Deploy from a branch**.
4. Select branch (`main`) and root folder (`/root`).
5. Save and wait for publication.

## How to update content

- **Main page** (`index.html`): profile, summary, experience, projects, publications, and contact sections.
- **Styles** (`style.css`): global tokens, components, responsive rules.
- **Front-end behavior** (`script.js`): mobile navigation and active-link logic for one-page anchors.

> Tip: after each content update, open `index.html` locally and verify internal anchors and external links before pushing.
