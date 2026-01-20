# Reservation App

Application complète de gestion de réservations de ressources avec architecture microservices.

## 📋 Description

Reservation App est une solution full-stack permettant de gérer des réservations de ressources. Le projet est composé d'un backend basé sur une architecture microservices (Spring Boot) et d'un frontend moderne (Angular).

## 🏗️ Architecture

Le projet est divisé en deux parties principales :

### Backend - Microservices (Spring Boot)
- **Config Server** - Configuration centralisée
- **Discovery Service** - Service de découverte Eureka
- **API Gateway** - Point d'entrée unique
- **User Service** - Gestion des utilisateurs et authentification
- **Resource Service** - Gestion des ressources
- **Reservation Service** - Gestion des réservations

### Frontend (Angular)
- Interface utilisateur moderne et responsive
- Espace utilisateur pour les réservations
- Espace administrateur pour la gestion

## 🚀 Technologies

### Backend
- Java 17
- Spring Boot 3.2.x
- Spring Cloud (Config, Gateway, Eureka)
- Spring Security + JWT
- Spring Data JPA
- H2 / MySQL
- Maven

### Frontend
- Angular 16
- TypeScript 5
- RxJS
- Angular Router
- Angular Forms

## 📦 Structure du projet

```
reservationApp/
├── reservation_system/        # Backend microservices
│   ├── config-server/        # Serveur de configuration
│   ├── discovery-service/    # Service Eureka
│   ├── api-gateway/         # API Gateway
│   ├── user_service/        # Service utilisateurs
│   ├── ressource_service/   # Service ressources
│   └── reservation_service/ # Service réservations
└── frontend/                 # Application Angular
    └── src/
        └── app/
            ├── core/        # Services, guards, interceptors
            ├── features/    # Modules fonctionnels
            └── shared/      # Composants partagés
```

## 🔧 Installation et démarrage

### Prérequis

- Java 17+
- Node.js 16+
- Maven 3.6+
- Angular CLI 16

### 1. Backend

#### Configuration initiale

Modifiez le chemin du dépôt de configuration dans `reservation_system/config-server/src/main/resources/application.properties` :

```properties
spring.cloud.config.server.native.search-locations=file:/chemin/absolu/vers/config-repo/
```

#### Démarrage des services (dans l'ordre)

```bash
# 1. Config Server
cd reservation_system/config-server
mvn spring-boot:run

# 2. Discovery Service
cd reservation_system/discovery-service
mvn spring-boot:run

# 3. API Gateway
cd reservation_system/api-gateway
mvn spring-boot:run

# 4. Services métier (dans n'importe quel ordre)
cd reservation_system/user_service
mvn spring-boot:run

cd reservation_system/ressource_service
mvn spring-boot:run

cd reservation_system/reservation_service
mvn spring-boot:run
```

#### Vérification

- Config Server : http://localhost:8888
- Eureka Dashboard : http://localhost:8761
- API Gateway : http://localhost:8080

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

L'application sera accessible sur http://localhost:4200

## 🔑 Authentification

Le système utilise JWT (JSON Web Tokens) pour l'authentification.

### Workflow d'authentification

1. L'utilisateur se connecte via `/api/users/login`
2. Le backend génère un token JWT
3. Le frontend stocke le token
4. Chaque requête inclut le token dans le header `Authorization: Bearer <token>`

### Rôles

- **USER** - Utilisateur standard (peut créer et gérer ses réservations)
- **ADMIN** - Administrateur (gestion complète des ressources et utilisateurs)

## 📡 API Endpoints

Tous les endpoints sont accessibles via l'API Gateway : `http://localhost:8080`

### Authentification
- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{id}` - Détails d'un utilisateur
- `PUT /api/users/{id}` - Mise à jour
- `DELETE /api/users/{id}` - Suppression

### Ressources
- `GET /api/resources` - Liste des ressources
- `GET /api/resources/{id}` - Détails d'une ressource
- `POST /api/resources` - Création (admin)
- `PUT /api/resources/{id}` - Mise à jour (admin)
- `DELETE /api/resources/{id}` - Suppression (admin)

### Réservations
- `GET /api/reservations` - Liste des réservations
- `GET /api/reservations/{id}` - Détails d'une réservation
- `POST /api/reservations` - Création
- `PUT /api/reservations/{id}` - Mise à jour
- `DELETE /api/reservations/{id}` - Annulation

## 🗄️ Base de données

### Développement
Les services utilisent H2 (base de données en mémoire) par défaut.

### Production
Pour utiliser MySQL, configurez les propriétés dans les fichiers de configuration :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/reservation_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🧪 Tests

### Backend
```bash
cd reservation_system/<service-name>
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Build

### Backend
```bash
# Build tous les services
cd reservation_system
mvn clean install

# Build un service spécifique
cd reservation_system/<service-name>
mvn clean package
```

### Frontend
```bash
cd frontend

# Build de développement
npm run build

# Build de production
ng build --configuration production
```

## 🚢 Déploiement

### Backend

1. Construisez les JARs : `mvn clean package`
2. Déployez chaque JAR sur votre serveur
3. Démarrez les services dans l'ordre : Config Server → Discovery → Gateway → Services métier

### Frontend

1. Buildez l'application : `ng build --configuration production`
2. Déployez le contenu de `dist/frontend/` sur votre serveur web
3. Configurez votre serveur pour rediriger toutes les routes vers `index.html`

## 📊 Monitoring

- **Eureka Dashboard** : http://localhost:8761 - Vue d'ensemble des services enregistrés
- **Actuator Endpoints** : http://localhost:{port}/actuator - Métriques et santé des services

## 🔍 Dépannage

### Le service ne se connecte pas à Eureka
- Vérifiez que le Discovery Service est démarré
- Vérifiez l'URL Eureka dans la configuration
- Vérifiez que le port 8761 n'est pas bloqué

### Erreurs CORS sur le frontend
- Utilisez le proxy de développement : `ng serve --proxy-config proxy.config.json`
- Vérifiez la configuration CORS du backend

### Problèmes d'authentification JWT
- Vérifiez que le token est valide et non expiré
- Vérifiez le format du header `Authorization: Bearer <token>`
- Vérifiez que la clé secrète JWT est identique dans tous les services

### Erreur de configuration
- Vérifiez que le Config Server est démarré en premier
- Vérifiez le chemin absolu vers `config-repo`
- Vérifiez que les fichiers de configuration existent

## 📚 Documentation détaillée

Pour plus d'informations, consultez les README spécifiques :

- [Backend - Reservation System](./reservation_system/README.md)
- [Frontend - Angular App](./frontend/README.md)

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

Développé dans le cadre d'un projet de gestion de réservations.

## 🔗 Liens utiles

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Angular Documentation](https://angular.io/docs)
- [JWT.io](https://jwt.io/)
