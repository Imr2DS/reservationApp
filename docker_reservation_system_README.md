# Reservation System - Backend (Docker Version)

Système de réservation de ressources basé sur une architecture microservices avec Spring Boot, Spring Cloud et Docker.

## Architecture

Le système est composé de plusieurs microservices conteneurisés :

- **Config Server** (port 8888) - Gestion centralisée de la configuration
- **Discovery Service** (port 8761) - Service de découverte Eureka
- **API Gateway** (port 8080) - Point d'entrée unique pour tous les services
- **User Service** (port 8081) - Gestion des utilisateurs et authentification JWT
- **Resource Service** (port 8082) - Gestion des ressources disponibles
- **Reservation Service** (port 8083) - Gestion des réservations
- **MySQL Databases** - Bases de données pour chaque service

## Technologies

- **Java 17**
- **Spring Boot 3.2.x**
- **Spring Cloud 2023.0.x**
- **Spring Security** avec JWT
- **Spring Data JPA**
- **MySQL 8**
- **Netflix Eureka** (service discovery)
- **Spring Cloud Gateway** (API Gateway)
- **Spring Cloud Config** (configuration centralisée)
- **Maven** (gestion des dépendances)
- **Docker** & **Docker Compose**

## Prérequis

- Docker 20.10+
- Docker Compose 2.0+

**Note:** Java et Maven ne sont PAS nécessaires sur votre machine locale, tout est conteneurisé !

## Structure du projet

```
reservation_system/
├── config-server/
│   ├── Dockerfile
│   ├── config-repo/              # Fichiers de configuration
│   └── src/
├── discovery-service/
│   ├── Dockerfile
│   └── src/
├── api-gateway/
│   ├── Dockerfile
│   └── src/
├── user_service/
│   ├── Dockerfile
│   └── src/
├── ressource_service/
│   ├── Dockerfile
│   └── src/
└── reservation_service/
    ├── Dockerfile
    └── src/
```

## Démarrage avec Docker Compose

### Démarrage complet (depuis la racine du projet)

```bash
# Depuis la racine du projet reservationApp/
docker-compose up -d
```

Cette commande va :
1. Construire toutes les images Docker
2. Créer le réseau `reservation-network`
3. Démarrer les bases de données MySQL
4. Démarrer les microservices dans l'ordre correct
5. Attendre que les services soient prêts (healthchecks)

### Vérification des services

```bash
# Voir tous les conteneurs en cours d'exécution
docker-compose ps

# Voir les logs de tous les services
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f config-service
docker-compose logs -f discovery-service
docker-compose logs -f api-gateway
docker-compose logs -f user-service
```

### Accès aux services

- **Config Server** : http://localhost:8888
- **Eureka Dashboard** : http://localhost:8761
- **API Gateway** : http://localhost:8080
- **User Service** : http://localhost:8081
- **Resource Service** : http://localhost:8082
- **Reservation Service** : http://localhost:8083

### Bases de données MySQL

Trois instances MySQL sont démarrées :

- **user-db** : port 3307 (user_db)
- **resource-db** : port 3308 (resource_db)
- **reservation-db** : port 3309 (reservation_db)

**Credentials:**
- Username: `root`
- Password: `imrane`

## Dockerfiles

Chaque microservice utilise un build multi-stage pour optimiser la taille des images :

### Exemple de Dockerfile (User Service)

```dockerfile
# Stage 1: Build
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven
RUN mvn -B package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

## Configuration des services

Les configurations sont centralisées dans `config-server/config-repo/` :

- `api-gateway-dev.properties`
- `discovery-service-dev.properties`
- `user-service-dev.properties`
- `resource-service-dev.properties`
- `reservation-service-dev.properties`

Les variables d'environnement sont injectées via `docker-compose.yml` :

```yaml
environment:
  SPRING_CONFIG_IMPORT: configserver:http://config-service:8888
  SPRING_DATASOURCE_URL: jdbc:mysql://user-db:3306/user_db
  SPRING_DATASOURCE_USERNAME: root
  SPRING_DATASOURCE_PASSWORD: imrane
```

## API Endpoints

Tous les endpoints sont accessibles via l'API Gateway sur http://localhost:8080

### User Service

- `POST /users/register` - Inscription d'un nouvel utilisateur
- `POST /users/login` - Connexion et génération du token JWT
- `GET /users` - Liste des utilisateurs (authentification requise)
- `GET /users/{id}` - Détails d'un utilisateur
- `PUT /users/{id}` - Mise à jour d'un utilisateur
- `DELETE /users/{id}` - Suppression d'un utilisateur

### Resource Service

- `GET /resources` - Liste des ressources
- `GET /resources/{id}` - Détails d'une ressource
- `POST /resources` - Création d'une ressource (admin)
- `PUT /resources/{id}` - Mise à jour d'une ressource (admin)
- `DELETE /resources/{id}` - Suppression d'une ressource (admin)

### Reservation Service

- `GET /reservations` - Liste des réservations
- `GET /reservations/{id}` - Détails d'une réservation
- `POST /reservations` - Création d'une réservation
- `PUT /reservations/{id}` - Mise à jour d'une réservation
- `DELETE /reservations/{id}` - Annulation d'une réservation

## Commandes Docker utiles

### Gestion des conteneurs

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down -v

# Redémarrer un service spécifique
docker-compose restart user-service

# Reconstruire les images
docker-compose build

# Reconstruire et redémarrer
docker-compose up -d --build
```

### Logs et debugging

```bash
# Logs en temps réel de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f user-service

# Dernières 100 lignes de logs
docker-compose logs --tail=100 user-service

# Accéder au shell d'un conteneur
docker exec -it user-service sh

# Inspecter un conteneur
docker inspect user-service
```

### Gestion des images

```bash
# Lister les images
docker images | grep reservationapp

# Supprimer une image
docker rmi reservationapp-user-service

# Supprimer toutes les images du projet
docker-compose down --rmi all
```

### Gestion des volumes

```bash
# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect reservationapp_user-db-data

# Supprimer les volumes inutilisés
docker volume prune
```

## Ordre de démarrage

Docker Compose gère automatiquement l'ordre de démarrage grâce aux `depends_on` et `healthcheck` :

1. **Config Server** (avec healthcheck)
2. **Discovery Service** (attend config-service)
3. **Bases de données MySQL** (user-db, resource-db, reservation-db)
4. **API Gateway** (attend config-service et discovery-service)
5. **Services métier** (attendent config-service, discovery-service et leur DB respective)

## Healthchecks

Le Config Server dispose d'un healthcheck pour s'assurer qu'il est prêt avant de démarrer les autres services :

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8888/actuator/health"]
  interval: 10s
  timeout: 5s
  retries: 5
```

## Réseau Docker

Tous les services communiquent via le réseau `reservation-network` (bridge driver).

Les services se référencent par leur nom de conteneur :
- `config-service:8888`
- `discovery-service:8761`
- `api-gateway:8080`
- `user-db:3306`

## Volumes persistants

Les données MySQL sont persistées dans des volumes Docker :

```yaml
volumes:
  user-db-data:
  resource-db-data:
  reservation-db-data:
```

Pour réinitialiser les données :

```bash
docker-compose down -v
docker-compose up -d
```

## Développement

### Modifier le code et redéployer

```bash
# 1. Modifier le code source
# 2. Reconstruire l'image du service modifié
docker-compose build user-service

# 3. Redémarrer le service
docker-compose up -d user-service
```

### Développement local (sans Docker)

Si vous souhaitez développer localement sans Docker :

```bash
# Démarrer uniquement les bases de données
docker-compose up -d user-db resource-db reservation-db

# Puis démarrer les services Spring Boot localement
cd user_service
mvn spring-boot:run
```

## Monitoring

### Eureka Dashboard

Accédez à http://localhost:8761 pour voir tous les services enregistrés.

### Actuator Endpoints

Chaque service expose des endpoints Actuator :

```bash
# Health check
curl http://localhost:8081/actuator/health

# Informations sur le service
curl http://localhost:8081/actuator/info

# Métriques
curl http://localhost:8081/actuator/metrics
```

## Dépannage

### Un service ne démarre pas

```bash
# Vérifier les logs
docker-compose logs user-service

# Vérifier l'état du conteneur
docker-compose ps

# Redémarrer le service
docker-compose restart user-service
```

### Problème de connexion à la base de données

```bash
# Vérifier que la DB est démarrée
docker-compose ps user-db

# Vérifier les logs de la DB
docker-compose logs user-db

# Se connecter à la DB
docker exec -it user-db mysql -uroot -pimrane user_db
```

### Le service ne se connecte pas à Eureka

```bash
# Vérifier que Discovery Service est démarré
docker-compose logs discovery-service

# Vérifier le réseau
docker network inspect reservationapp_reservation-network

# Redémarrer dans l'ordre
docker-compose restart discovery-service
docker-compose restart user-service
```

### Problème de configuration

```bash
# Vérifier que Config Server est démarré
docker-compose logs config-service

# Vérifier le healthcheck
docker inspect config-service | grep -A 10 Health

# Redémarrer Config Server
docker-compose restart config-service
```

### Nettoyer complètement l'environnement

```bash
# Arrêter et supprimer tout
docker-compose down -v --rmi all

# Redémarrer proprement
docker-compose up -d --build
```

## Production

### Build des images pour production

```bash
# Build toutes les images
docker-compose build

# Tag les images pour un registry
docker tag reservationapp-user-service myregistry.com/reservationapp-user-service:1.0.0

# Push vers le registry
docker push myregistry.com/reservationapp-user-service:1.0.0
```

### Variables d'environnement de production

Créez un fichier `.env` à la racine :

```env
MYSQL_ROOT_PASSWORD=secure_password_here
DB_USER=app_user
DB_PASSWORD=app_password
```

Puis modifiez `docker-compose.yml` pour utiliser ces variables.

## Sécurité

⚠️ **Important pour la production :**

1. Changez les mots de passe MySQL par défaut
2. Utilisez des secrets Docker pour les credentials
3. Configurez SSL/TLS pour les communications
4. Limitez l'exposition des ports
5. Utilisez des images de base officielles et à jour
6. Scannez les images pour les vulnérabilités

## Performance

### Optimisation des images

Les Dockerfiles utilisent déjà :
- Multi-stage builds (réduction de taille)
- Images Alpine (légères)
- JRE au lieu de JDK en runtime

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

## Contribution

1. Créez une branche pour votre fonctionnalité
2. Modifiez le code
3. Testez avec Docker : `docker-compose up -d --build`
4. Committez vos changements
5. Créez une Pull Request

## Licence

Ce projet est sous licence MIT.
