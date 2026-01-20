# Frontend - Reservation App (Docker Version)

Application web Angular pour la gestion de réservations de ressources, conteneurisée avec Docker et servie par Nginx.

## Technologies

- **Angular 16.0.0**
- **TypeScript 5.0.2**
- **RxJS 7.8.0**
- **Nginx Alpine** - Serveur web
- **Docker** - Conteneurisation
- **Node.js 20 Alpine** - Build

## Architecture Docker

L'application utilise un **build multi-stage** pour optimiser la taille de l'image :

1. **Stage 1 (Build)** : Compilation de l'application Angular avec Node.js
2. **Stage 2 (Runtime)** : Serveur Nginx léger avec les fichiers statiques

## Dockerfile

```dockerfile
# Stage 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Configuration Nginx

Le fichier `nginx/default.conf` configure :

1. **Serveur de fichiers statiques** pour l'application Angular
2. **Proxy inverse** vers l'API Gateway pour les appels API
3. **Redirection SPA** pour le routing Angular

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Routing Angular (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API vers API Gateway
    location /users {
        proxy_pass http://api-gateway:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /resources {
        proxy_pass http://api-gateway:8080;
    }

    location /reservations {
        proxy_pass http://api-gateway:8080;
    }
}
```

## Démarrage avec Docker Compose

### Depuis la racine du projet

```bash
# Démarrer tous les services (backend + frontend)
docker-compose up -d

# Voir les logs du frontend
docker-compose logs -f frontend
```

L'application sera accessible sur **http://localhost:4200**

### Build et démarrage du frontend uniquement

```bash
# Build l'image
docker-compose build frontend

# Démarrer le conteneur
docker-compose up -d frontend

# Vérifier les logs
docker-compose logs -f frontend
```

## Démarrage avec Docker (sans Compose)

### Build de l'image

```bash
cd frontend

# Build l'image
docker build -t reservationapp-frontend .

# Vérifier l'image
docker images | grep reservationapp-frontend
```

### Exécution du conteneur

```bash
# Démarrer le conteneur
docker run -d \
  --name reservation-frontend \
  --network reservationapp_reservation-network \
  -p 4200:80 \
  reservationapp-frontend

# Vérifier les logs
docker logs -f reservation-frontend
```

## Structure du projet

```
frontend/
├── Dockerfile                    # Configuration Docker multi-stage
├── nginx/
│   └── default.conf             # Configuration Nginx
├── src/
│   ├── app/
│   │   ├── core/                # Services, guards, interceptors
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── resource.model.ts
│   │   │   │   └── reservation.model.ts
│   │   │   └── services/
│   │   │       ├── user.service.ts
│   │   │       ├── resource.service.ts
│   │   │       └── reservation.service.ts
│   │   ├── features/            # Modules fonctionnels
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   └── users/
│   │   └── shared/              # Composants partagés
│   ├── assets/
│   └── styles/
├── angular.json
├── package.json
└── tsconfig.json
```

## Fonctionnalités

### Authentification
- Inscription et connexion
- Gestion des tokens JWT
- Guards de protection des routes

### Espace Utilisateur
- Consultation des ressources
- Création et gestion des réservations
- Profil utilisateur

### Espace Administrateur
- Gestion des ressources (CRUD)
- Statistiques
- Gestion des utilisateurs

## Communication avec le Backend

### Via Nginx Proxy (Recommandé en production)

Nginx proxy les requêtes API vers l'API Gateway :

```typescript
// Dans les services Angular
private apiUrl = '/users';  // Proxyfié vers http://api-gateway:8080/users
```

### Configuration du proxy

Le fichier `nginx/default.conf` gère automatiquement le proxy :
- `/users` → `http://api-gateway:8080/users`
- `/resources` → `http://api-gateway:8080/resources`
- `/reservations` → `http://api-gateway:8080/reservations`

## Commandes Docker utiles

### Gestion du conteneur

```bash
# Démarrer
docker-compose up -d frontend

# Arrêter
docker-compose stop frontend

# Redémarrer
docker-compose restart frontend

# Supprimer
docker-compose down frontend

# Reconstruire
docker-compose build frontend
docker-compose up -d frontend
```

### Logs et debugging

```bash
# Logs en temps réel
docker-compose logs -f frontend

# Dernières 100 lignes
docker-compose logs --tail=100 frontend

# Accéder au shell du conteneur
docker exec -it reservation-frontend sh

# Vérifier la configuration Nginx
docker exec reservation-frontend cat /etc/nginx/conf.d/default.conf

# Tester la configuration Nginx
docker exec reservation-frontend nginx -t

# Recharger Nginx
docker exec reservation-frontend nginx -s reload
```

### Inspection

```bash
# Inspecter le conteneur
docker inspect reservation-frontend

# Vérifier les fichiers dans le conteneur
docker exec reservation-frontend ls -la /usr/share/nginx/html

# Vérifier les processus
docker exec reservation-frontend ps aux
```

## Développement

### Développement local (sans Docker)

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# L'app sera sur http://localhost:4200
```

### Développement avec hot-reload

Pour le développement, utilisez le serveur Angular local plutôt que Docker :

```bash
# Démarrer uniquement le backend avec Docker
docker-compose up -d config-service discovery-service api-gateway user-service resource-service reservation-service

# Démarrer le frontend localement
cd frontend
npm start
```

### Modifier et redéployer

```bash
# 1. Modifier le code source
# 2. Reconstruire l'image
docker-compose build frontend

# 3. Redémarrer le conteneur
docker-compose up -d frontend

# 4. Vérifier les changements
docker-compose logs -f frontend
```

## Build

### Build de développement

```bash
cd frontend
npm run build
```

### Build de production

```bash
cd frontend
npm run build -- --configuration=production
```

Le build de production inclut :
- Minification du code
- Tree-shaking
- AOT compilation
- Optimisation des bundles

### Build Docker

```bash
# Build l'image Docker (inclut le build de production)
docker build -t reservationapp-frontend .

# Vérifier la taille de l'image
docker images reservationapp-frontend
```

## Tests

### Tests unitaires

```bash
cd frontend

# Exécuter les tests
npm test

# Avec couverture
npm test -- --code-coverage
```

### Tests dans Docker

```bash
# Build une image de test
docker build --target build -t reservationapp-frontend-test .

# Exécuter les tests
docker run --rm reservationapp-frontend-test npm test
```

## Optimisation

### Taille de l'image

L'image finale est optimisée :
- **Build stage** : ~1.2 GB (Node.js + dépendances)
- **Runtime stage** : ~25 MB (Nginx Alpine + fichiers statiques)

### Cache Docker

Pour optimiser les builds :

```bash
# Build avec cache
docker-compose build frontend

# Build sans cache
docker-compose build --no-cache frontend
```

### Compression Nginx

Nginx compresse automatiquement les fichiers statiques (gzip).

## Variables d'environnement

### Configuration de l'API

Pour changer l'URL de l'API, modifiez `nginx/default.conf` :

```nginx
location /users {
    proxy_pass http://votre-api-gateway:8080;
}
```

### Environnements multiples

Créez plusieurs fichiers de configuration Nginx :

```
nginx/
├── default.conf          # Développement
├── staging.conf          # Staging
└── production.conf       # Production
```

Puis modifiez le Dockerfile :

```dockerfile
ARG ENV=production
COPY nginx/${ENV}.conf /etc/nginx/conf.d/default.conf
```

## Dépannage

### L'application ne charge pas

```bash
# Vérifier que le conteneur est démarré
docker-compose ps frontend

# Vérifier les logs
docker-compose logs frontend

# Vérifier que Nginx écoute sur le port 80
docker exec reservation-frontend netstat -tuln | grep 80
```

### Erreur 404 sur les routes Angular

Vérifiez que `nginx/default.conf` contient :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Erreur CORS ou API non accessible

```bash
# Vérifier la configuration du proxy
docker exec reservation-frontend cat /etc/nginx/conf.d/default.conf

# Vérifier que l'API Gateway est accessible
docker exec reservation-frontend wget -O- http://api-gateway:8080/actuator/health

# Vérifier le réseau Docker
docker network inspect reservationapp_reservation-network
```

### Problème de cache

```bash
# Vider le cache du navigateur
# Ou forcer le rechargement : Ctrl+Shift+R

# Reconstruire sans cache
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Fichiers statiques non trouvés

```bash
# Vérifier les fichiers dans le conteneur
docker exec reservation-frontend ls -la /usr/share/nginx/html

# Vérifier le build Angular
docker exec reservation-frontend cat /usr/share/nginx/html/index.html
```

## Production

### Déploiement

```bash
# Build pour production
docker build -t myregistry.com/reservationapp-frontend:1.0.0 .

# Push vers le registry
docker push myregistry.com/reservationapp-frontend:1.0.0

# Pull et démarrer sur le serveur de production
docker pull myregistry.com/reservationapp-frontend:1.0.0
docker run -d -p 80:80 myregistry.com/reservationapp-frontend:1.0.0
```

### Configuration SSL/TLS

Modifiez `nginx/default.conf` pour ajouter SSL :

```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # ... reste de la configuration
}
```

### Sécurité

⚠️ **Recommandations pour la production :**

1. Utilisez HTTPS (SSL/TLS)
2. Configurez les headers de sécurité Nginx
3. Limitez les méthodes HTTP autorisées
4. Activez la protection CSRF
5. Configurez Content Security Policy (CSP)

Exemple de headers de sécurité :

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## Monitoring

### Logs Nginx

```bash
# Logs d'accès
docker exec reservation-frontend tail -f /var/log/nginx/access.log

# Logs d'erreur
docker exec reservation-frontend tail -f /var/log/nginx/error.log
```

### Métriques

```bash
# Statistiques du conteneur
docker stats reservation-frontend

# Utilisation des ressources
docker exec reservation-frontend top
```

## Ressources

- [Angular Documentation](https://angular.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

## Contribution

1. Créez une branche pour votre fonctionnalité
2. Modifiez le code
3. Testez localement : `npm start`
4. Testez avec Docker : `docker-compose up -d --build frontend`
5. Committez vos changements
6. Créez une Pull Request

## Licence

Ce projet est sous licence MIT.
