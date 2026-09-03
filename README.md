# Site vitrine - Léo Marchetti (coach sportif)

Site statique, sans build. Trois fichiers : `index.html`, `styles.css`, `script.js`.

## Lancer en local

```bash
cd coach-vitrine
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Ou ouvrir directement `index.html` dans un navigateur.

## Personnaliser

- **Textes, offres, tarifs, témoignages** : tout est dans `index.html`.
- **Couleurs, polices, espacements** : variables CSS en haut de `styles.css` (`:root`).
  Palette « performance » : fond charcoal profond, texte clair, accent vert volt
  (`--accent`). Thème sombre unique (mono-thème, esprit salle de sport).
- **Images** : actuellement des placeholders `picsum.photos`. Remplacer les `src`
  des `<img>` par de vraies photos (hero, portrait, avatars des témoignages).
- **Formulaire de contact** : `script.js` intercepte l'envoi et affiche un message
  de confirmation, sans backend. Brancher un service (Formspree, Netlify Forms,
  API maison) sur l'événement `submit` pour un envoi réel.

## Contenu

Le nom, les tarifs, les avis et les coordonnées sont fictifs et servent de
gabarit. À remplacer par les informations réelles avant mise en ligne.
