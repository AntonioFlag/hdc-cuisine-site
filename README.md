# Site vitrine HDC Grande Cuisine

Site statique de HDC Grande Cuisine (cuisines professionnelles, Wattrelos), avec une interface d'administration sur `/admin`.

## Organisation
- `content/accueil.json` : textes de la page d'accueil (services, méthode, secteurs, réalisations…)
- `content/societe.json` : coordonnées et mentions légales
- `src/` : gabarits HTML des pages (mise en page, styles)
- `admin/` : interface d'administration (Decap CMS)
- `uploads/` : photos ajoutées depuis l'administration
- `build.js` : assemble gabarits + contenu dans `dist/` (`node build.js`, aucune dépendance)

## Mise en ligne (Netlify)
1. app.netlify.com : **Add new site → Import an existing project → GitHub**, choisir `hdc-cuisine-site`. Les réglages de build sont lus dans `netlify.toml`. **Deploy**.
2. **Forms** : activer la détection des formulaires et ajouter une notification e-mail vers contact@hdc-cuisine.fr.
3. **Domain management** : ajouter `hdc-cuisine.fr` et appliquer les DNS indiqués chez le registrar.

## Activer l'administration (/admin)
L'administration se connecte avec un compte GitHub ayant accès au dépôt.
1. Sur GitHub : **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL : l'adresse du site (ex. `https://hdc-cuisine.fr`)
   - Authorization callback URL : `https://api.netlify.com/auth/done`
   - Noter le *Client ID* et générer un *Client secret*.
2. Sur Netlify : **Site configuration → Access & security → OAuth → Install provider → GitHub**, coller le Client ID et le secret.
3. Ouvrir `https://<votre-site>/admin`, cliquer **Se connecter avec GitHub**.

Pour donner l'accès à un collègue : l'inviter comme collaborateur du dépôt sur GitHub.

Chaque enregistrement dans l'administration crée un commit sur `main` ; Netlify republie le site en 1 à 2 minutes.
