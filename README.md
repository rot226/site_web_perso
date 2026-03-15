# Site web personnel (statique)

Ce dépôt contient un **site web statique** de présentation académique.

## Stack technique

- **HTML** pour la structure des pages.
- **CSS** pour la mise en forme.
- **JavaScript** (vanilla) pour :
  - la navigation active,
  - le menu mobile,
  - la gestion d’état des liens.

Aucun backend n’est nécessaire pour faire fonctionner ce site.

## Déploiement

Le site peut être déployé facilement sur **GitHub Pages**.

### Option rapide (branche `main`)

1. Pousser le dépôt sur GitHub.
2. Aller dans **Settings > Pages**.
3. Choisir la source : **Deploy from a branch**.
4. Sélectionner la branche (`main`) et le dossier racine (`/root`).
5. Enregistrer puis attendre la publication.

## How to update content

Pour modifier rapidement le contenu :

- **Accueil (about, expérience, aperçu projets/publications, contact)** : éditer `index.html`.
- **Expérience détaillée** : éditer `experience.html`.
- **Projets** :
  - éditer les blocs `<article class="project-card">` dans `projects.html`,
  - mettre à jour le titre, résumé et liens (`Paper`, `Code`, `Website`).
- **Publications** :
  - éditer les blocs `<li class="pub-item">` dans `publications.html`,
  - ajuster auteurs, titre, année, venue, DOI et liens.
- **Contact** : éditer `contact.html` (lien LinkedIn) et/ou le bloc contact de `index.html`.
- **Styles** : éditer `style.css`.
- **Comportement front-end** (menu mobile/navigation active) : éditer `script.js`.

> Conseil : après chaque modification de contenu, ouvrir localement les pages concernées et vérifier les liens externes avant de pousser.
