# Site vitrine HDC Grande Cuisine

Site statique (HTML/CSS, sans dépendance) de HDC Grande Cuisine, cuisines professionnelles à Wattrelos.

## Fichiers
- `index.html` : page d'accueil (services, méthode, secteurs, reconditionné Procaz, contact)
- `mentions-legales.html` : mentions légales et politique de confidentialité (champs surlignés à compléter)
- `netlify.toml` : configuration de l'hébergement Netlify

## Mise en ligne (Netlify)
1. Sur app.netlify.com : **Add new site → Import an existing project → GitHub**, choisir `hdc-cuisine-site`.
2. Laisser la commande de build vide, dossier de publication `.` puis **Deploy**.
3. **Forms** : activer la détection des formulaires. Les demandes de devis arrivent dans Netlify > Forms ; ajouter une notification e-mail vers contact@hdc-cuisine.fr.
4. **Domain management** : ajouter `hdc-cuisine.fr` et `www.hdc-cuisine.fr`, puis appliquer chez le registrar les enregistrements DNS indiqués par Netlify. Le HTTPS est activé automatiquement.

## À compléter
- Mentions légales : forme juridique, SIRET, RCS, TVA, directeur de publication.
- Photos de réalisations et logo officiel.
