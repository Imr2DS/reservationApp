# Reservation System - Backend

Système de réservation de ressources basé sur une architecture microservices avec Spring Boot et Spring Cloud.

## Architecture

Le système est composé de plusieurs microservices :

- **Config Server** (port 8888) - Gestion centralisée de la configuration
- **Discovery Service** (port 8761) - Service de découverte Eureka
- **API Gateway** (port 8080) - Point d'entrée unique pour tous les services
- **User Service** - Gestion des utilisateurs et authentification JWT
- **Resource Service** - Gestion des ressources disponibles
- **Reservation Service** - Gestion des réservations

## Technologies

- **Java 17**
- **Spring Boot 3.2.x**
- **Spring Cloud 2023.0.x**
- **Spring Security** avec JWT
- **Spring Data JPA**
- **H2 Database** (développement)
- **MySQL** (production)
- **Netflix Eureka** (service discovery)
- **Spring Cloud Gateway** (API Gateway)
- **Spring Cloud Config** (configuration centralisée)
- **Maven** (gestion des dépendances)

## Prérequis

- Java 17 ou supérieur
- Maven 3.6+
- MySQL (optionnel, pour la production)

## Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd reservation_system
```

### 2. Configuration

Avant de démarrer les services, assurez-vous de configurer le chemin du dépôt de configuration dans `config-server/src/main/resources/application.properties` :

```properties
spring.cloud.config.server.native.search-locations=file:/chemin/absolu/vers/config-repo/
```

### 3. Démarrage des services

Les services doivent être démarrés dans l'ordre suivant :

#### a. Config Server

```bash
cd config-server
mvn spring-boot:run
```

Vérifiez que le service est démarré sur http://localhost:8888

#### b. Discovery Service (Eureka)

```bash
cd discovery-service
mvn spring-boot:run
```

Accédez au dashboard Eureka sur http://localhost:8761

#### c. API Gateway

```bash
cd api-gateway
mvn spring-boot:run
```

Le gateway sera disponible sur http://localhost:8080

#### d. Microservices métier

Démarrez les services dans n'importe quel ordre :

```bash
# User Service
cd user_service
mvn spring-boot:run

# Resource Service
cd ressource_service
mvn spring-boot:run

# Reservation Service
cd reservation_service
mvn spring-boot:run
```

## Structure du projet

```
reservation_system/
├── config-server/          # Serveur de configuration centralisée
│   └── config-repo/        # Fichiers de configuration par service
├── discovery-service/      # Service de découverte Eureka
├── api-gateway/           # API Gateway (Spring Cloud Gateway)
├── user_service/          # Service de gestion des utilisateurs
├── ressource_service/     # Service de gestion des ressources
└── reservation_service/   # Service de gestion des réservations
```

## Configuration des services

Les configurations de chaque service sont centralisées dans `config-server/config-repo/` :

- `api-gateway-dev.properties`
- `discovery-service-dev.properties`
- `user-service-dev.properties`
- `resource-service-dev.properties`
- `reservation-service-dev.properties`

## API Endpoints

Tous les endpoints sont accessibles via l'API Gateway sur http://localhost:8080

### User Service

- `POST /api/users/register` - Inscription d'un nouvel utilisateur
- `POST /api/users/login` - Connexion et génération du token JWT
- `GET /api/users` - Liste des utilisateurs (authentification requise)
- `GET /api/users/{id}` - Détails d'un utilisateur
- `PUT /api/users/{id}` - Mise à jour d'un utilisateur
- `DELETE /api/users/{id}` - Suppression d'un utilisateur

### Resource Service

- `GET /api/resources` - Liste des ressources
- `GET /api/resources/{id}` - Détails d'une ressource
- `POST /api/resources` - Création d'une ressource (admin)
- `PUT /api/resources/{id}` - Mise à jour d'une ressource (admin)
- `DELETE /api/resources/{id}` - Suppression d'une ressource (admin)

### Reservation Service

- `GET /api/reservations` - Liste des réservations
- `GET /api/reservations/{id}` - Détails d'une réservation
- `POST /api/reservations` - Création d'une réservation
- `PUT /api/reservations/{id}` - Mise à jour d'une réservation
- `DELETE /api/reservations/{id}` - Annulation d'une réservation

## Authentification

Le système utilise JWT (JSON Web Tokens) pour l'authentification. Pour accéder aux endpoints protégés :

1. Obtenez un token via `/api/users/login`
2. Incluez le token dans le header `Authorization: Bearer <token>`

## Base de données

### Développement

Par défaut, les services utilisent H2 (base de données en mémoire) pour le développement.

Console H2 accessible sur : http://localhost:{port}/h2-console

### Production

Pour utiliser MySQL en production, configurez les propriétés suivantes dans les fichiers de configuration :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/reservation_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Tests

Pour exécuter les tests de chaque service :

```bash
cd <service-directory>
mvn test
```

## Build

Pour construire tous les services :

```bash
mvn clean install
```

Pour construire un service spécifique :

```bash
cd <service-directory>
mvn clean package
```

Les fichiers JAR seront générés dans le dossier `target/` de chaque service.

## Déploiement

### Avec Docker (à venir)

```bash
docker-compose up
```

### Déploiement manuel

1. Construisez les JARs : `mvn clean package`
2. Déployez chaque JAR sur votre serveur
3. Démarrez les services dans l'ordre indiqué ci-dessus

## Monitoring

- **Eureka Dashboard** : http://localhost:8761
- **Actuator endpoints** : http://localhost:{port}/actuator

## Dépannage

### Le service ne se connecte pas à Eureka

Vérifiez que :
- Le Discovery Service est démarré
- L'URL Eureka est correcte dans la configuration
- Le port 8761 n'est pas bloqué par un firewall

### Erreur de configuration

Vérifiez que :
- Le Config Server est démarré en premier
- Le chemin vers `config-repo` est correct et absolu
- Les fichiers de configuration existent dans `config-repo/`

### Problèmes d'authentification JWT

Vérifiez que :
- Le token JWT est valide et non expiré
- Le header `Authorization` est correctement formaté
- La clé secrète JWT est la même dans tous les services

## Contribution

1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Créez une Pull Request

## Licence

Ce projet est sous licence MIT.
