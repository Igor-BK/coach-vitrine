# Site vitrine - Léo Marchetti (coach sportif)

Site statique, sans build. Trois fichiers : `index.html`, `styles.css`, `script.js`.

## Lancer en local

```bash
cd coach-vitrine
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Ou ouvrir directement `index.html` dans un navigateur.

> `styles.css` et `script.js` sont appelés avec `?v=N` dans `index.html` pour
> forcer le rafraîchissement du cache navigateur. Incrémenter `N` (ou faire
> Ctrl+Maj+R) après une modification de style/script si l'ancienne version reste
> affichée.

## Sections

Hero bannière plein cadre · repères chiffrés (compteurs animés) · bandeau
disciplines défilant · méthode en 4 étapes · **programmes d'entraînement**
(force/masse, perte de poids, remise en forme débutant, prépa course) · bandeau
CTA · **détail des prestations** (coaching individuel, duo/petit groupe, en ligne,
bilan seul) · résultats + témoignages · à propos · contact.

## Personnaliser

- **Textes, programmes, tarifs, témoignages** : tout est dans `index.html`.
- **Couleurs, polices, espacements** : variables CSS en haut de `styles.css` (`:root`).
  Palette « atelier » : fond ivoire chaud (`--bg`), accent vert pin (`--accent`),
  touche ambre (`--highlight`), sections sombres (`--dark`) pour le rythme. Thème
  clair. Les tokens `--dark-*` pilotent le hero, le marquee, le bandeau CTA et le footer.
- **Mise en page** : tout est en CSS grid/flex responsive. Prestations = 1 carte
  vedette pleine largeur (grille interne 2 colonnes) + 3 cartes égales ; à partir
  de 860 px tout passe en une colonne. Programmes = grille 2×2 (1 colonne sous
  860 px), images en bandeau court (`.prog-media { height }`). À propos = image
  compacte plafonnée à 440 px, collante au scroll sur desktop.
- **Effets** : révélation au scroll avec décalage, header qui se condense,
  compteurs animés, marquee des disciplines, zoom au survol des cartes, lien de
  nav actif selon la section. Tout est désactivé sous `prefers-reduced-motion`.
- **Images** : photos de coaching sportif servies par `images.unsplash.com`
  (hero, programmes, bandeau CTA, portrait) et avatars `i.pravatar.cc`
  (témoignages). Remplacer les `src` des `<img>` par les vraies photos de Léo
  avant mise en ligne.
- **Formulaire de contact** : `script.js` intercepte l'envoi et affiche un message
  de confirmation, sans backend. Brancher un service (Formspree, Netlify Forms,
  API maison) sur l'événement `submit` pour un envoi réel.

## Contenu

Le nom, les tarifs, les avis et les coordonnées sont fictifs et servent de
gabarit. À remplacer par les informations réelles avant mise en ligne.
