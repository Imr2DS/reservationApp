# Frontend - Reservation App

Application web Angular pour la gestion de réservations de ressources.

## Technologies

- **Angular 16.0.0**
- **TypeScript 5.0.2**
- **RxJS 7.8.0**
- **Angular Router** - Navigation
- **Angular Forms** - Gestion des formulaires
- **Angular HTTP Client** - Communication avec l'API

## Prérequis

- Node.js 16.x ou supérieur
- npm 8.x ou supérieur
- Angular CLI 16.0.0

## Installation

### 1. Installer Angular CLI globalement

```bash
npm install -g @angular/cli@16
```

### 2. Installer les dépendances

```bash
cd frontend
npm install
```

## Démarrage

### Serveur de développement

```bash
npm start
# ou
ng serve
```

L'application sera accessible sur http://localhost:4200/

L'application se rechargera automatiquement si vous modifiez les fichiers sources.

### Avec proxy API

Le projet inclut une configuration proxy (`proxy.config.json`) pour rediriger les appels API vers le backend :

```bash
ng serve --proxy-config proxy.config.json
```

## Structure du projet

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Services et fonctionnalités core
│   │   │   ├── guards/              # Guards de navigation
│   │   │   │   ├── auth.guard.ts    # Protection des routes authentifiées
│   │   │   │   └── role.guard.ts    # Protection par rôle
│   │   │   ├── interceptors/        # Intercepteurs HTTP
│   │   │   │   └── auth.interceptor.ts  # Ajout du token JWT
│   │   │   ├── models/              # Modèles de données
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── resource.model.ts
│   │   │   │   ├── reservation.model.ts
│   │   │   │   └── role.model.ts
│   │   │   └── services/            # Services métier
│   │   │       ├── user.service.ts
│   │   │       ├── resource.service.ts
│   │   │       └── reservation.service.ts
│   │   ├── features/                # Modules fonctionnels
│   │   │   ├── auth/                # Authentification
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── admin/               # Interface administrateur
│   │   │   │   ├── admin-home/
│   │   │   │   └── resources/
│   │   │   │       ├── resource-form/
│   │   │   │       ├── resource-details/
│   │   │   │       └── resource-stats/
│   │   │   └── users/               # Interface utilisateur
│   │   │       ├── user-home/
│   │   │       ├── resource-details/
│   │   │       ├── users/
│   │   │       └── reservations/
│   │   │           ├── reservation-list/
│   │   │           ├── reservation-form/
│   │   │           └── reservation-details/
│   │   ├── shared/                  # Composants partagés
│   │   │   └── components/
│   │   │       ├── navbar/
│   │   │       ├── sidebar/
│   │   │       └── footer/
│   │   ├── app-routing.module.ts    # Configuration des routes
│   │   ├── app.component.ts         # Composant racine
│   │   └── app.module.ts            # Module racine
│   ├── assets/                      # Ressources statiques
│   ├── styles/                      # Styles globaux
│   │   ├── button.styles.css
│   │   ├── card.styles.css
│   │   └── input.styles.css
│   └── styles.css                   # Styles principaux
├── angular.json                     # Configuration Angular
├── package.json                     # Dépendances npm
├── tsconfig.json                    # Configuration TypeScript
└── proxy.config.json                # Configuration du proxy API
```

## Fonctionnalités

### Authentification

- Inscription d'un nouvel utilisateur
- Connexion avec email et mot de passe
- Gestion des tokens JWT
- Déconnexion

### Espace Utilisateur

- Consultation des ressources disponibles
- Création de réservations
- Consultation de ses réservations
- Modification/Annulation de réservations
- Détails des ressources

### Espace Administrateur

- Gestion des ressources (CRUD)
- Statistiques des ressources
- Gestion des utilisateurs
- Vue d'ensemble des réservations

## Guards et Sécurité

### AuthGuard

Protège les routes nécessitant une authentification :

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

### RoleGuard

Protège les routes par rôle (ADMIN, USER) :

```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] }
}
```

## Services

### UserService

Gestion des utilisateurs et authentification :
- `login(credentials)` - Connexion
- `register(user)` - Inscription
- `logout()` - Déconnexion
- `getCurrentUser()` - Utilisateur connecté
- `getUsers()` - Liste des utilisateurs

### ResourceService

Gestion des ressources :
- `getResources()` - Liste des ressources
- `getResource(id)` - Détails d'une ressource
- `createResource(resource)` - Création
- `updateResource(id, resource)` - Mise à jour
- `deleteResource(id)` - Suppression

### ReservationService

Gestion des réservations :
- `getReservations()` - Liste des réservations
- `getReservation(id)` - Détails d'une réservation
- `createReservation(reservation)` - Création
- `updateReservation(id, reservation)` - Mise à jour
- `deleteReservation(id)` - Annulation

## Build

### Build de développement

```bash
npm run build
# ou
ng build
```

Les fichiers de build seront générés dans le dossier `dist/`.

### Build de production

```bash
ng build --configuration production
```

Build optimisé pour la production avec :
- Minification du code
- Tree-shaking
- AOT compilation
- Optimisation des bundles

### Build en mode watch

```bash
npm run watch
# ou
ng build --watch --configuration development
```

## Tests

### Tests unitaires

```bash
npm test
# ou
ng test
```

Exécute les tests unitaires via [Karma](https://karma-runner.github.io).

### Couverture de code

```bash
ng test --code-coverage
```

Le rapport de couverture sera généré dans `coverage/`.

## Génération de code

Angular CLI permet de générer automatiquement du code :

```bash
# Composant
ng generate component features/mon-composant

# Service
ng generate service core/services/mon-service

# Module
ng generate module features/mon-module

# Guard
ng generate guard core/guards/mon-guard

# Interceptor
ng generate interceptor core/interceptors/mon-interceptor

# Interface
ng generate interface core/models/mon-model
```

## Configuration de l'API

L'URL de l'API backend est configurée dans les services. Pour la modifier :

1. Créez un fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

2. Utilisez-le dans vos services :

```typescript
import { environment } from 'src/environments/environment';

constructor(private http: HttpClient) {
  this.apiUrl = environment.apiUrl;
}
```

## Styles

Le projet utilise des styles CSS modulaires :

- `styles.css` - Styles globaux
- `button.styles.css` - Styles des boutons
- `card.styles.css` - Styles des cartes
- `input.styles.css` - Styles des champs de formulaire

Chaque composant peut avoir ses propres styles dans son fichier `.css`.

## Déploiement

### Déploiement sur un serveur web

1. Buildez l'application en mode production
2. Copiez le contenu du dossier `dist/frontend/` sur votre serveur web
3. Configurez votre serveur pour rediriger toutes les routes vers `index.html`

### Exemple avec Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Dépannage

### Erreur de CORS

Si vous rencontrez des erreurs CORS, utilisez le proxy de développement :

```bash
ng serve --proxy-config proxy.config.json
```

### Erreur d'authentification

Vérifiez que :
- Le backend est démarré
- Le token JWT est valide
- L'intercepteur HTTP est correctement configuré

### Erreur de build

Nettoyez le cache et réinstallez les dépendances :

```bash
rm -rf node_modules package-lock.json
npm install
```

## Ressources

- [Documentation Angular](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Contribution

1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Créez une Pull Request

## Licence

Ce projet est sous licence MIT.
