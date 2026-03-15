# Site personnel (statique, architecture single-page)

Ce dépôt contient un **site académique statique en page unique**.

## Stack technique

- **HTML** pour la structure.
- **CSS** pour la mise en forme et le responsive.
- **JavaScript vanilla** pour :
  - le surlignage du lien de navigation actif,
  - le comportement du menu mobile,
  - la synchronisation avec les ancres (`hash`).

Aucun backend n'est nécessaire.

## Architecture single-page

Le site repose sur **une seule page de contenu : `index.html`**.

- Toutes les sections sont dans `index.html` :
  - `#about`
  - `#experience`
  - `#projects`
  - `#publications`
  - `#contact`
- La navigation principale utilise uniquement des ancres internes (`href="#..."`).
- Le script front (`script.js`) valide et normalise le hash courant pour rester sur ces sections.

## Gestion des anciennes URLs

Les anciennes pages :

- `experience.html`
- `projects.html`
- `publications.html`
- `contact.html`

sont conservées comme **pages de redirection légères** vers `index.html#...` afin de préserver les anciens liens entrants (bookmark, moteur de recherche, partage).

## Déploiement (GitHub Pages)

1. Pousser le dépôt sur GitHub.
2. Aller dans **Settings > Pages**.
3. Choisir **Deploy from a branch**.
4. Sélectionner la branche (ex. `main`) et le dossier racine (`/root`).
5. Enregistrer puis attendre la publication.

## Mise à jour du contenu

- **Contenu principal** : `index.html`
- **Styles** : `style.css`
- **Comportement front** : `script.js`

Après modification, vérifier :

1. la navigation par ancres,
2. les redirections legacy,
3. les liens externes clés (LinkedIn, GitHub, publications).

## Vérification rapide des liens locaux

Exemple de contrôle local des liens internes/références de fichiers :

```bash
python3 - <<'PY'
import re
from pathlib import Path

root = Path('.')
html_files = sorted(root.glob('*.html'))
existing_files = {p.name for p in root.glob('*') if p.is_file()}
errors = []

for html in html_files:
    text = html.read_text(encoding='utf-8')
    ids = set(re.findall(r'id="([^"]+)"', text))
    refs = re.findall(r'(?:href|src)="([^"]+)"', text)

    for ref in refs:
        if ref.startswith(('http://', 'https://', 'mailto:', 'tel:')):
            continue
        if ref.startswith('#'):
            if ref[1:] and ref[1:] not in ids and html.name == 'index.html':
                errors.append(f'{html}: ancre manquante {ref}')
            continue
        path, _, anchor = ref.partition('#')
        target = Path(path)
        if path and not target.exists():
            errors.append(f'{html}: cible locale introuvable {ref}')
        if anchor and target.name == 'index.html':
            index_ids = set(re.findall(r'id="([^"]+)"', Path('index.html').read_text(encoding='utf-8')))
            if anchor not in index_ids:
                errors.append(f'{html}: ancre index introuvable #{anchor}')

if errors:
    print('ERREURS:')
    print('\n'.join(errors))
    raise SystemExit(1)
print('OK: aucun lien local cassé détecté.')
PY
```

## Check-list QA responsive (avant push)

- [ ] Vérifier `index.html` en **desktop large** (≥ 1440 px) : menu horizontal, sections alignées, pas de débordement horizontal.
- [ ] Vérifier en **laptop** (~1366×768) : lisibilité des paragraphes, timeline non tronquée, cartes projets/publications bien espacées.
- [ ] Vérifier en **tablette portrait/paysage** (~1024×1366 et 1366×1024) : titres de section, contenus et boutons restent lisibles.
- [ ] Vérifier en **mobile portrait/paysage** (~390×844 et 844×390) : menu burger ouvrable/fermable, navigation utilisable.
- [ ] Contrôler les points de rupture clés : `@media (max-width: 64rem)`, `48rem`, `30rem`.
- [ ] Contrôler la section **Publications** : aucun overlap des boutons (`PDF`, `Cite`, `DOI`), clic facile au doigt, aucun bouton hors écran.
- [ ] Contrôler l’absence de scroll horizontal (`document.documentElement.scrollWidth === clientWidth`).
- [ ] Vérifier les liens externes principaux (LinkedIn, GitHub, publications) après toute modification de structure.
