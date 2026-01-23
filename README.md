# Reservation App - Docker Version 🐳

Application complète de gestion de réservations de ressources avec architecture microservices, entièrement conteneurisée avec Docker.

## 📋 Description

Reservation App est une solution full-stack permettant de gérer des réservations de ressources. Le projet est composé d'un backend basé sur une architecture microservices (Spring Boot) et d'un frontend moderne (Angular), tous deux conteneurisés et orchestrés avec Docker Compose.

## 🏗️ Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (Angular + Nginx)                         │
│                      Port: 4200                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                             │
│                  (Spring Cloud Gateway)                      │
│                      Port: 8080                              │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   User      │   │  Resource   │   │ Reservation │
│  Service    │   │  Service    │   │  Service    │
│  Port: 8081 │   │  Port: 8082 │   │  Port: 8083 │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   MySQL     │   │   MySQL     │   │   MySQL     │
│  user_db    │   │ resource_db │   │reservation_db│
│  Port: 3307 │   │  Port: 3308 │   │  Port: 3309 │
└─────────────┘   └─────────────┘   └─────────────┘

        ┌─────────────────────────────────┐
        │     Config Server (Port: 8888)  │
        │  Discovery Service (Port: 8761) │
        └─────────────────────────────────┘
```

### Services

#### Backend - Microservices
- **Config Server** (8888) - Configuration centralisée
- **Discovery Service** (8761) - Service de découverte Eureka
- **API Gateway** (8080) - Point d'entrée unique
- **User Service** (8081) - Gestion des utilisateurs et authentification JWT
- **Resource Service** (8082) - Gestion des ressources
- **Reservation Service** (8083) - Gestion des réservations

#### Frontend
- **Angular App** (4200) - Interface utilisateur servie par Nginx

#### Bases de données
- **user-db** (3307) - Base de données des utilisateurs
- **resource-db** (3308) - Base de données des ressources
- **reservation-db** (3309) - Base de données des réservations

## 🚀 Technologies

### Backend
- Java 17
- Spring Boot 3.2.x
- Spring Cloud (Config, Gateway, Eureka)
- Spring Security + JWT
- Spring Data JPA
- MySQL 8
- Maven
- Docker

### Frontend
- Angular 16
- TypeScript 5
- RxJS
- Nginx Alpine
- Docker Multi-stage Build

### Infrastructure
- Docker 20.10+
- Docker Compose 2.0+
- Docker Networks (Bridge)
- Docker Volumes (Persistance)

## 📦 Structure du projet

```
reservationApp/
├── docker-compose.yml              # Orchestration de tous les services
├── reservation_system/             # Backend microservices
│   ├── config-server/
│   │   ├── Dockerfile
│   │   └── config-repo/           # Configurations centralisées
│   ├── discovery-service/
│   │   └── Dockerfile
│   ├── api-gateway/
│   │   └── Dockerfile
│   ├── user_service/
│   │   └── Dockerfile
│   ├── ressource_service/
│   │   └── Dockerfile
│   └── reservation_service/
│       └── Dockerfile
└── frontend/                       # Application Angular
    ├── Dockerfile                  # Build multi-stage
    └── nginx/
        └── default.conf           # Configuration Nginx + Proxy
```

## 🔧 Installation et démarrage

### Prérequis

- **Docker** 20.10 ou supérieur
- **Docker Compose** 2.0 ou supérieur

**C'est tout !** Java, Maven, Node.js et npm ne sont PAS nécessaires sur votre machine.

### Vérifier les prérequis

```bash
# Vérifier Docker
docker --version

# Vérifier Docker Compose
docker-compose --version
```

### Démarrage rapide (Quick Start)

```bash
# 1. Cloner le repository
git clone https://github.com/Imr2Ds/reservationApp.git
cd reservationApp

# 2. Basculer sur la branche docker-version
git checkout docker-version

# 3. Démarrer tous les services
docker-compose up -d

# 4. Vérifier que tout est démarré
docker-compose ps

# 5. Voir les logs
docker-compose logs -f
```

**C'est tout !** L'application est maintenant accessible.

### Accès aux services

Une fois tous les services démarrés :

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:4200 | Interface utilisateur |
| **API Gateway** | http://localhost:8080 | Point d'entrée API |
| **Eureka Dashboard** | http://localhost:8761 | Monitoring des services |
| **Config Server** | http://localhost:8888 | Configuration centralisée |
| **User Service** | http://localhost:8081 | API Utilisateurs |
| **Resource Service** | http://localhost:8082 | API Ressources |
| **Reservation Service** | http://localhost:8083 | API Réservations |

### Temps de démarrage

Le démarrage complet prend environ **2-3 minutes** :

1. **Config Server** : ~30 secondes
2. **Discovery Service** : ~30 secondes
3. **Bases de données** : ~20 secondes
4. **API Gateway** : ~30 secondes
5. **Services métier** : ~40 secondes
6. **Frontend** : ~10 secondes

## 🔑 Authentification

Le système utilise JWT (JSON Web Tokens) pour l'authentification.

### Workflow

1. L'utilisateur se connecte via le frontend
2. Le frontend envoie les credentials à `/users/login`
3. Le backend génère un token JWT
4. Le frontend stocke le token
5. Chaque requête inclut le token dans le header `Authorization: Bearer <token>`

### Rôles

- **USER** - Utilisateur standard (gestion de ses réservations)
- **ADMIN** - Administrateur (gestion complète)

## 📡 API Endpoints

Tous les endpoints sont accessibles via l'API Gateway : `http://localhost:8080`

### Authentification

```bash
# Inscription
POST http://localhost:8080/users/register
Content-Type: application/json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}

# Connexion
POST http://localhost:8080/users/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Utilisateurs

```bash
# Liste des utilisateurs (authentification requise)
GET http://localhost:8080/users
Authorization: Bearer <token>

# Détails d'un utilisateur
GET http://localhost:8080/users/{id}
Authorization: Bearer <token>
```

### Ressources

```bash
# Liste des ressources
GET http://localhost:8080/resources

# Créer une ressource (admin uniquement)
POST http://localhost:8080/resources
Authorization: Bearer <admin-token>
Content-Type: application/json
{
  "name": "Salle de réunion A",
  "description": "Grande salle avec projecteur",
  "capacity": 20
}
```

### Réservations

```bash
# Créer une réservation
POST http://localhost:8080/reservations
Authorization: Bearer <token>
Content-Type: application/json
{
  "resourceId": 1,
  "startDate": "2024-02-01T10:00:00",
  "endDate": "2024-02-01T12:00:00"
}

# Mes réservations
GET http://localhost:8080/reservations
Authorization: Bearer <token>
```

## 🐳 Commandes Docker

### Gestion globale

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down -v

# Voir l'état de tous les services
docker-compose ps

# Voir les logs de tous les services
docker-compose logs -f

# Reconstruire toutes les images
docker-compose build

# Reconstruire et redémarrer
docker-compose up -d --build
```

### Gestion par service

```bash
# Démarrer un service spécifique
docker-compose up -d user-service

# Arrêter un service
docker-compose stop user-service

# Redémarrer un service
docker-compose restart user-service

# Voir les logs d'un service
docker-compose logs -f user-service

# Reconstruire un service
docker-compose build user-service
docker-compose up -d user-service
```

### Debugging

```bash
# Accéder au shell d'un conteneur
docker exec -it user-service sh

# Voir les processus d'un conteneur
docker exec user-service ps aux

# Inspecter un conteneur
docker inspect user-service

# Statistiques en temps réel
docker stats

# Vérifier le réseau
docker network inspect reservationapp_reservation-network
```

## 🗄️ Bases de données

### Connexion aux bases de données

```bash
# User DB
docker exec -it user-db mysql -uroot -pimrane user_db

# Resource DB
docker exec -it resource-db mysql -uroot -pimrane resource_db

# Reservation DB
docker exec -it reservation-db mysql -uroot -pimrane reservation_db
```

### Credentials

- **Username:** `root`
- **Password:** `imrane`

### Ports exposés

- **user-db:** 3307 (externe) → 3306 (interne)
- **resource-db:** 3308 (externe) → 3306 (interne)
- **reservation-db:** 3309 (externe) → 3306 (interne)

### Persistance des données

Les données sont persistées dans des volumes Docker :

```bash
# Lister les volumes
docker volume ls | grep reservationapp

# Inspecter un volume
docker volume inspect reservationapp_user-db-data

# Sauvegarder un volume
docker run --rm -v reservationapp_user-db-data:/data -v $(pwd):/backup alpine tar czf /backup/user-db-backup.tar.gz /data

# Restaurer un volume
docker run --rm -v reservationapp_user-db-data:/data -v $(pwd):/backup alpine tar xzf /backup/user-db-backup.tar.gz -C /
```

## 🔍 Monitoring

### Eureka Dashboard

Accédez à http://localhost:8761 pour voir :
- Tous les services enregistrés
- Leur statut (UP/DOWN)
- Leurs instances
- Leurs métadonnées

### Actuator Endpoints

Chaque service expose des endpoints de monitoring :

```bash
# Health check
curl http://localhost:8081/actuator/health

# Informations
curl http://localhost:8081/actuator/info

# Métriques
curl http://localhost:8081/actuator/metrics

# Liste des endpoints disponibles
curl http://localhost:8081/actuator
```

### Logs

```bash
# Logs en temps réel de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f user-service

# Dernières 100 lignes
docker-compose logs --tail=100 user-service

# Logs depuis une date
docker-compose logs --since 2024-01-20T10:00:00 user-service
```

## 🛠️ Développement

### Développement local (sans Docker)

Si vous souhaitez développer localement :

```bash
# 1. Démarrer uniquement les bases de données
docker-compose up -d user-db resource-db reservation-db

# 2. Démarrer les services Spring Boot localement
cd reservation_system/user_service
mvn spring-boot:run

# 3. Démarrer le frontend localement
cd frontend
npm install
npm start
```

### Développement avec Docker

```bash
# 1. Modifier le code
# 2. Reconstruire le service modifié
docker-compose build user-service

# 3. Redémarrer le service
docker-compose up -d user-service

# 4. Vérifier les logs
docker-compose logs -f user-service
```

### Hot-reload (Frontend)

Pour le développement frontend avec hot-reload :

```bash
# Démarrer le backend avec Docker
docker-compose up -d config-service discovery-service api-gateway user-service resource-service reservation-service

# Démarrer le frontend localement
cd frontend
npm start
```

## 🧪 Tests

### Tests backend

```bash
# Exécuter les tests dans un conteneur
docker-compose run --rm user-service mvn test

# Ou localement
cd reservation_system/user_service
mvn test
```

### Tests frontend

```bash
# Exécuter les tests dans un conteneur
docker-compose run --rm frontend npm test

# Ou localement
cd frontend
npm test
```

## 🚢 Déploiement

### Build des images pour production

```bash
# Build toutes les images
docker-compose build

# Tag les images pour votre registry
docker tag reservationapp-user-service myregistry.com/reservationapp-user-service:1.0.0
docker tag reservationapp-frontend myregistry.com/reservationapp-frontend:1.0.0

# Push vers le registry
docker push myregistry.com/reservationapp-user-service:1.0.0
docker push myregistry.com/reservationapp-frontend:1.0.0
```

### Déploiement sur un serveur

```bash
# Sur le serveur de production
git clone https://github.com/Imr2Ds/reservationApp.git
cd reservationApp
git checkout docker-version

# Créer un fichier .env pour les secrets
cat > .env << EOF
MYSQL_ROOT_PASSWORD=secure_password_here
JWT_SECRET=your_jwt_secret_here
EOF

# Démarrer les services
docker-compose up -d

# Vérifier le déploiement
docker-compose ps
docker-compose logs -f
```

### Variables d'environnement de production

Créez un fichier `.env` :

```env
# Database
MYSQL_ROOT_PASSWORD=your_secure_password
DB_USER=app_user
DB_PASSWORD=app_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Ports (si différents)
FRONTEND_PORT=80
API_GATEWAY_PORT=8080
```

## 🔒 Sécurité

### Recommandations pour la production

1. **Changez les mots de passe par défaut**
   ```bash
   # Dans docker-compose.yml
   MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
   ```

2. **Utilisez des secrets Docker**
   ```bash
   docker secret create mysql_root_password ./mysql_password.txt
   ```

3. **Configurez SSL/TLS**
   - Ajoutez des certificats SSL pour Nginx
   - Configurez HTTPS pour tous les services

4. **Limitez l'exposition des ports**
   ```yaml
   # N'exposez que les ports nécessaires
   ports:
     - "127.0.0.1:8081:8081"  # Accessible uniquement en local
   ```

5. **Scannez les images pour les vulnérabilités**
   ```bash
   docker scan reservationapp-user-service
   ```

6. **Utilisez des images de base à jour**
   ```bash
   docker pull eclipse-temurin:17-jre-alpine
   docker pull nginx:alpine
   ```

## 📊 Performance

### Optimisation des images

Les images sont déjà optimisées :
- **Multi-stage builds** (réduction de taille)
- **Images Alpine** (légères)
- **JRE au lieu de JDK** en runtime

### Tailles des images

```bash
docker images | grep reservationapp

# Exemples de tailles :
# reservationapp-user-service     ~150 MB
# reservationapp-frontend         ~25 MB
# mysql:8                         ~500 MB
```

### Limiter les ressources

Ajoutez dans `docker-compose.yml` :

```yaml
services:
  user-service:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Scaling

```bash
# Scaler un service
docker-compose up -d --scale user-service=3

# Vérifier
docker-compose ps
```

## 🔧 Dépannage

### Un service ne démarre pas

```bash
# 1. Vérifier les logs
docker-compose logs user-service

# 2. Vérifier l'état
docker-compose ps

# 3. Redémarrer le service
docker-compose restart user-service

# 4. Reconstruire si nécessaire
docker-compose build user-service
docker-compose up -d user-service
```

### Problème de connexion entre services

```bash
# Vérifier le réseau
docker network inspect reservationapp_reservation-network

# Vérifier la connectivité
docker exec user-service ping api-gateway

# Vérifier les DNS
docker exec user-service nslookup api-gateway
```

### Base de données inaccessible

```bash
# Vérifier que la DB est démarrée
docker-compose ps user-db

# Vérifier les logs
docker-compose logs user-db

# Se connecter manuellement
docker exec -it user-db mysql -uroot -pimrane

# Redémarrer la DB
docker-compose restart user-db
```

### Nettoyer complètement

```bash
# Arrêter et supprimer tout
docker-compose down -v --rmi all

# Supprimer les volumes orphelins
docker volume prune

# Supprimer les réseaux inutilisés
docker network prune

# Redémarrer proprement
docker-compose up -d --build
```

### Problème de port déjà utilisé

```bash
# Trouver le processus utilisant le port
lsof -i :8080

# Ou avec netstat
netstat -tuln | grep 8080

# Arrêter le processus ou changer le port dans docker-compose.yml
```

## 📚 Documentation détaillée

Pour plus d'informations, consultez les README spécifiques :

- [Backend - Reservation System](./reservation_system/README.md)
- [Frontend - Angular App](./frontend/README.md)

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Testez avec Docker (`docker-compose up -d --build`)
5. Poussez vers la branche (`git push origin feature/AmazingFeature`)
6. Ouvrez une Pull Request

## 📝 Changelog

### Version Docker (docker-version branch)

- ✅ Conteneurisation complète de tous les services
- ✅ Orchestration avec Docker Compose
- ✅ Build multi-stage pour optimisation
- ✅ Healthchecks et dépendances entre services
- ✅ Volumes persistants pour les bases de données
- ✅ Réseau Docker isolé
- ✅ Configuration Nginx avec proxy API

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

Développé dans le cadre d'un projet de gestion de réservations.

## 🔗 Liens utiles

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/)
- [Angular with Docker](https://angular.io/guide/deployment)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 💡 Astuces

### Commandes utiles

```bash
# Voir l'utilisation des ressources
docker stats

# Nettoyer Docker
docker system prune -a

# Voir les images
docker images

# Voir les conteneurs (tous)
docker ps -a

# Voir les volumes
docker volume ls

# Voir les réseaux
docker network ls
```

### Alias utiles

Ajoutez dans votre `.bashrc` ou `.zshrc` :

```bash
alias dc='docker-compose'
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dcp='docker-compose ps'
alias dcr='docker-compose restart'
```

## 🎯 Prochaines étapes

- [ ] Ajouter Kubernetes (K8s) manifests
- [ ] Implémenter CI/CD avec GitHub Actions
- [ ] Ajouter monitoring avec Prometheus + Grafana
- [ ] Implémenter tracing distribué avec Zipkin
- [ ] Ajouter cache Redis
- [ ] Implémenter message queue (RabbitMQ/Kafka)