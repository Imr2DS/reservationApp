# Reservation App 🚀

A full-stack resource reservation management application built with microservices architecture, featuring a Spring Boot backend and Angular frontend, fully containerized with Docker.

## 📋 Overview

Reservation App is a comprehensive solution for managing resource reservations. The project consists of a backend built on microservices architecture (Spring Boot) and a modern frontend (Angular), all orchestrated with Docker Compose for easy deployment and scalability.

## 🏗️ Architecture

### System Architecture Diagram

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

### Components

#### Backend Microservices
- **Config Server** (8888) - Centralized configuration management
- **Discovery Service** (8761) - Eureka service discovery and registration
- **API Gateway** (8080) - Single entry point, routing, and load balancing
- **User Service** (8081) - User management and JWT authentication
- **Resource Service** (8082) - Resource CRUD operations
- **Reservation Service** (8083) - Reservation management and scheduling

#### Frontend
- **Angular Application** (4200) - Modern, responsive user interface served by Nginx

#### Databases
- **user-db** (3307) - User data persistence
- **resource-db** (3308) - Resource data persistence
- **reservation-db** (3309) - Reservation data persistence

## 🚀 Technologies

### Backend Stack
- **Java 17** - Modern Java LTS version
- **Spring Boot 3.2.x** - Application framework
- **Spring Cloud 2023.0.x** - Microservices framework
  - Spring Cloud Config - Configuration management
  - Spring Cloud Gateway - API Gateway
  - Netflix Eureka - Service discovery
- **Spring Security + JWT** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **MySQL 8** - Relational database
- **Maven** - Build and dependency management

### Frontend Stack
- **Angular 16** - Frontend framework
- **TypeScript 5** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Nginx Alpine** - Web server
- **Angular Router** - Client-side routing
- **Angular Forms** - Form handling

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Docker Networks** - Service communication
- **Docker Volumes** - Data persistence

## 📦 Project Structure

```
reservationApp/
├── docker-compose.yml              # Orchestration configuration
├── README.md                       # This file
├── reservation_system/             # Backend microservices
│   ├── README.md                  # Backend documentation
│   ├── config-server/
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   └── config-repo/           # Configuration files
│   ├── discovery-service/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   ├── api-gateway/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   ├── user_service/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   ├── ressource_service/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   └── reservation_service/
│       ├── Dockerfile
│       └── pom.xml
└── frontend/                       # Angular application
    ├── README.md                  # Frontend documentation
    ├── Dockerfile                 # Multi-stage build
    ├── nginx/
    │   └── default.conf          # Nginx + API proxy config
    ├── src/
    │   └── app/
    │       ├── core/             # Services, guards, interceptors
    │       ├── features/         # Feature modules
    │       └── shared/           # Shared components
    ├── angular.json
    └── package.json
```

## 🔧 Prerequisites

### Required
- **Docker** 20.10 or higher
- **Docker Compose** 2.0 or higher

### Optional (for local development without Docker)
- Java 17+
- Maven 3.6+
- Node.js 16+
- npm 8+
- MySQL 8

## 📥 Installation and Setup

### Quick Start (Recommended)

Get the entire application running in under 5 minutes!

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Imr2Ds/reservationApp.git
cd reservationApp
```

#### Step 2: Checkout Docker Version Branch

```bash
git checkout docker-version
```

#### Step 3: Start All Services

```bash
docker-compose up -d
```

This single command will:
1. ✅ Build all Docker images
2. ✅ Create network infrastructure
3. ✅ Start MySQL databases
4. ✅ Start backend microservices
5. ✅ Start frontend application
6. ✅ Configure health checks

#### Step 4: Verify Deployment

```bash
# Check all services are running
docker-compose ps

# View logs
docker-compose logs -f

# Check specific service
docker-compose logs -f user-service
```

#### Step 5: Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:4200 | Main application interface |
| **API Gateway** | http://localhost:8080 | API entry point |
| **Eureka Dashboard** | http://localhost:8761 | Service registry |
| **Config Server** | http://localhost:8888 | Configuration server |

### Startup Time

Total startup time: **~2-3 minutes**

| Service | Time | Status Check |
|---------|------|--------------|
| Config Server | ~30s | http://localhost:8888/actuator/health |
| Discovery Service | ~30s | http://localhost:8761 |
| Databases | ~20s | `docker-compose ps` |
| API Gateway | ~30s | http://localhost:8080/actuator/health |
| Business Services | ~40s | Check Eureka Dashboard |
| Frontend | ~10s | http://localhost:4200 |

### Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

## 🔑 Authentication & Authorization

### Authentication Flow

1. User registers or logs in via frontend
2. Frontend sends credentials to `/users/login`
3. Backend validates and generates JWT token
4. Frontend stores token in localStorage
5. All subsequent requests include token in Authorization header

### User Roles

- **USER** - Standard user
  - View resources
  - Create/manage own reservations
  - View own profile
  
- **ADMIN** - Administrator
  - All USER permissions
  - Manage all resources (CRUD)
  - View all reservations
  - Manage users

### Example Authentication

```bash
# Register a new user
curl -X POST http://localhost:8080/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:8080/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "expiresIn": 86400
}

# Use token for authenticated requests
curl http://localhost:8080/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📡 API Endpoints

All API endpoints are accessible through the API Gateway at `http://localhost:8080`

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | No |
| POST | `/users/login` | Login and get JWT token | No |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes |
| GET | `/users/{id}` | Get user by ID | Yes |
| PUT | `/users/{id}` | Update user | Yes |
| DELETE | `/users/{id}` | Delete user | Yes (Admin) |

### Resources

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/resources` | Get all resources | No |
| GET | `/resources/{id}` | Get resource by ID | No |
| POST | `/resources` | Create resource | Yes (Admin) |
| PUT | `/resources/{id}` | Update resource | Yes (Admin) |
| DELETE | `/resources/{id}` | Delete resource | Yes (Admin) |

### Reservations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/reservations` | Get all reservations | Yes |
| GET | `/reservations/{id}` | Get reservation by ID | Yes |
| POST | `/reservations` | Create reservation | Yes |
| PUT | `/reservations/{id}` | Update reservation | Yes |
| DELETE | `/reservations/{id}` | Cancel reservation | Yes |

### Example API Calls

```bash
# Get all resources
curl http://localhost:8080/resources

# Create a reservation (with authentication)
curl -X POST http://localhost:8080/reservations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resourceId": 1,
    "startDate": "2024-02-01T10:00:00",
    "endDate": "2024-02-01T12:00:00",
    "purpose": "Team meeting"
  }'

# Get my reservations
curl http://localhost:8080/reservations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

For detailed API documentation, see:
- [Backend API Documentation](./reservation_system/README.md#api-endpoints)

## 🗄️ Database Configuration

### MySQL Instances

Three MySQL 8 instances run in Docker containers:

| Database | Port | Container | Volume |
|----------|------|-----------|--------|
| user_db | 3307 | user-db | user-db-data |
| resource_db | 3308 | resource-db | resource-db-data |
| reservation_db | 3309 | reservation-db | reservation-db-data |

### Database Credentials

- **Username:** `root`
- **Password:** `imrane`

⚠️ **Security Note:** Change these credentials for production!

### Connecting to Databases

```bash
# User Database
docker exec -it user-db mysql -uroot -pimrane user_db

# Resource Database
docker exec -it resource-db mysql -uroot -pimrane resource_db

# Reservation Database
docker exec -it reservation-db mysql -uroot -pimrane reservation_db
```

### Data Persistence

Data is persisted using Docker volumes:

```bash
# List volumes
docker volume ls | grep reservationapp

# Backup a database
docker exec user-db mysqldump -uroot -pimrane user_db > user_db_backup.sql

# Restore a database
docker exec -i user-db mysql -uroot -pimrane user_db < user_db_backup.sql

# Remove all data (⚠️ destructive)
docker-compose down -v
```

### Database Schema

Schemas are automatically created by Hibernate on first startup:

```properties
spring.jpa.hibernate.ddl-auto=update
```

For production, use:
```properties
spring.jpa.hibernate.ddl-auto=validate
```

## 🧪 Testing

### Backend Tests

```bash
# Test all services
cd reservation_system
mvn test

# Test specific service
cd user_service
mvn test

# Test with coverage
mvn test jacoco:report

# Integration tests
mvn verify
```

### Frontend Tests

```bash
# Unit tests
cd frontend
npm test

# Tests with coverage
npm test -- --code-coverage

# E2E tests
npm run e2e
```

### Testing with Docker

```bash
# Backend tests
docker-compose run --rm user-service mvn test

# Frontend tests
docker-compose run --rm frontend npm test -- --watch=false
```

## 📦 Build

### Build All Services

```bash
# Build with Docker Compose
docker-compose build

# Build specific service
docker-compose build user-service

# Build without cache
docker-compose build --no-cache
```

### Build Backend (Maven)

```bash
# Build all services
cd reservation_system
mvn clean install

# Build specific service
cd user_service
mvn clean package

# Skip tests
mvn clean package -DskipTests
```

### Build Frontend

```bash
# Development build
cd frontend
npm run build

# Production build
npm run build -- --configuration=production

# Analyze bundle size
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Image Sizes

| Service | Image Size | Notes |
|---------|------------|-------|
| Frontend | ~25 MB | Nginx Alpine + static files |
| User Service | ~150 MB | JRE Alpine + JAR |
| Resource Service | ~150 MB | JRE Alpine + JAR |
| Reservation Service | ~150 MB | JRE Alpine + JAR |
| MySQL | ~500 MB | Official MySQL image |

## 🔍 Monitoring & Debugging

### Service Health Checks

```bash
# Check all services
docker-compose ps

# Health check endpoints
curl http://localhost:8888/actuator/health  # Config Server
curl http://localhost:8080/actuator/health  # API Gateway
curl http://localhost:8081/actuator/health  # User Service
```

### Eureka Dashboard

Access the Eureka Dashboard at http://localhost:8761 to see:
- All registered services
- Service status (UP/DOWN)
- Instance information
- Service metadata

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-service

# Last 100 lines
docker-compose logs --tail=100 user-service

# Since timestamp
docker-compose logs --since 2024-01-20T10:00:00 user-service
```

### Actuator Endpoints

Each service exposes Spring Boot Actuator endpoints:

```bash
# Health
curl http://localhost:8081/actuator/health

# Info
curl http://localhost:8081/actuator/info

# Metrics
curl http://localhost:8081/actuator/metrics

# All endpoints
curl http://localhost:8081/actuator
```

### Container Stats

```bash
# Real-time stats
docker stats

# Specific container
docker stats user-service
```

## 🛠️ Troubleshooting

### Common Issues

#### Services Won't Start

```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart

# Clean restart
docker-compose down
docker-compose up -d --build
```

#### Port Conflicts

```bash
# Find process using port
lsof -i :8080

# Change port in docker-compose.yml
ports:
  - "8081:8080"
```

#### Database Connection Issues

```bash
# Check database is running
docker-compose ps user-db

# Test connection
docker exec -it user-db mysql -uroot -pimrane -e "SHOW DATABASES;"

# Restart database
docker-compose restart user-db
```

#### Service Not Registering with Eureka

```bash
# Check Eureka is running
curl http://localhost:8761

# Check service logs
docker-compose logs user-service | grep eureka

# Restart in order
docker-compose restart discovery-service
sleep 30
docker-compose restart user-service
```

#### Frontend Can't Connect to Backend

```bash
# Check API Gateway
curl http://localhost:8080/actuator/health

# Check Nginx proxy config
docker exec reservation-frontend cat /etc/nginx/conf.d/default.conf

# Check network
docker network inspect reservationapp_reservation-network
```

### Complete System Reset

```bash
# Stop everything
docker-compose down -v --rmi all

# Clean Docker
docker system prune -a

# Rebuild and restart
docker-compose up -d --build
```

### Getting Help

For detailed troubleshooting:
- [Backend Troubleshooting](./reservation_system/README.md#troubleshooting)
- [Frontend Troubleshooting](./frontend/README.md#troubleshooting)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Quick Start

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/reservationApp.git
   cd reservationApp
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make changes**
5. **Test thoroughly**
   ```bash
   docker-compose up -d --build
   docker-compose logs -f
   ```
6. **Commit and push**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```
7. **Create Pull Request**

### Development Guidelines

#### Code Style
- **Backend:** Follow Java conventions, use Spring Boot best practices
- **Frontend:** Follow Angular style guide, use TypeScript strict mode
- **Docker:** Use multi-stage builds, minimize image sizes

#### Testing
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

#### Documentation
- Update README files for significant changes
- Add JSDoc/JavaDoc comments
- Update API documentation

#### Commit Messages

Use conventional commits:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update API documentation
style: format code
refactor: simplify authentication logic
test: add reservation service tests
chore: update dependencies
```

### Pull Request Checklist

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Docker build succeeds
- [ ] No console errors/warnings
- [ ] Changes tested locally

For detailed contribution guidelines:
- [Backend Contributing](./reservation_system/README.md#contributing)
- [Frontend Contributing](./frontend/README.md#contributing)

## 🚀 Deployment

### Production Deployment

#### 1. Prepare Environment

```bash
# Create .env file
cat > .env << EOF
MYSQL_ROOT_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000
EOF
```

#### 2. Build Images

```bash
# Build all images
docker-compose build

# Tag for registry
docker tag reservationapp-user-service myregistry.com/reservationapp-user-service:1.0.0
docker tag reservationapp-frontend myregistry.com/reservationapp-frontend:1.0.0
```

#### 3. Push to Registry

```bash
docker push myregistry.com/reservationapp-user-service:1.0.0
docker push myregistry.com/reservationapp-frontend:1.0.0
```

#### 4. Deploy

```bash
# On production server
docker-compose -f docker-compose.prod.yml up -d
```

### Security Recommendations

- ✅ Change default passwords
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS/SSL
- ✅ Configure firewall rules
- ✅ Regular security updates
- ✅ Implement rate limiting
- ✅ Enable CORS properly
- ✅ Use Docker secrets

### Scaling

```bash
# Scale a service
docker-compose up -d --scale user-service=3

# With load balancer
docker-compose -f docker-compose.prod.yml up -d --scale user-service=3
```

## 📚 Documentation

### Detailed Documentation

- **[Backend Documentation](./reservation_system/README.md)** - Microservices architecture, API endpoints, database configuration
- **[Frontend Documentation](./frontend/README.md)** - Angular application, components, services, routing

### External Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Angular Documentation](https://angular.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Developed as part of a resource reservation management project.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Angular team for the powerful frontend framework
- Docker for containerization technology
- Open source community

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Imr2Ds/reservationApp/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Imr2Ds/reservationApp/discussions)

## 🗺️ Roadmap

### Current Version (v1.0)
- ✅ Microservices architecture
- ✅ JWT authentication
- ✅ Docker containerization
- ✅ Angular frontend
- ✅ MySQL persistence

### Future Enhancements
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Distributed tracing (Zipkin)
- [ ] Redis caching
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

**Made with ❤️ using Spring Boot, Angular, and Docker**
