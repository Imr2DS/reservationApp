# Reservation System - Backend Microservices

A resource reservation system built with Spring Boot microservices architecture, Spring Cloud, and Docker.

## Table of Contents

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)
- [Database Configuration](#database-configuration)
- [Testing](#testing)
- [Build](#build)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Architecture

The system consists of multiple containerized microservices:

```
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

### Microservices

- **Config Server** (Port 8888) - Centralized configuration management
- **Discovery Service** (Port 8761) - Eureka service discovery
- **API Gateway** (Port 8080) - Single entry point for all services
- **User Service** (Port 8081) - User management and JWT authentication
- **Resource Service** (Port 8082) - Resource management
- **Reservation Service** (Port 8083) - Reservation management

## Technologies

### Core Technologies
- **Java 17** - Programming language
- **Spring Boot 3.2.x** - Application framework
- **Spring Cloud 2023.0.x** - Microservices framework
- **Maven** - Dependency management and build tool

### Spring Cloud Components
- **Spring Cloud Config** - Centralized configuration
- **Spring Cloud Gateway** - API Gateway
- **Netflix Eureka** - Service discovery
- **Spring Cloud LoadBalancer** - Client-side load balancing

### Security & Data
- **Spring Security** - Security framework
- **JWT (JSON Web Tokens)** - Authentication
- **Spring Data JPA** - Data persistence
- **MySQL 8** - Production database
- **H2 Database** - Development/testing database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Prerequisites

### With Docker (Recommended)
- Docker 20.10+
- Docker Compose 2.0+

### Without Docker (Local Development)
- Java 17 or higher
- Maven 3.6+
- MySQL 8 (optional, H2 is used by default)

## Installation and Setup

### Option 1: Docker Compose (Recommended)

This is the easiest way to run the entire system.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Imr2Ds/reservationApp.git
cd reservationApp
git checkout docker-version
```

#### Step 2: Start All Services

```bash
# From the project root
docker-compose up -d
```

This command will:
1. Build all Docker images
2. Create the `reservation-network` network
3. Start MySQL databases
4. Start microservices in the correct order
5. Wait for services to be ready (healthchecks)

#### Step 3: Verify Services

```bash
# Check all containers
docker-compose ps

# View logs
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f user-service
```

#### Step 4: Access Services

- **Eureka Dashboard**: http://localhost:8761
- **API Gateway**: http://localhost:8080
- **Config Server**: http://localhost:8888

### Option 2: Local Development (Without Docker)

#### Step 1: Configure Config Server

Edit `config-server/src/main/resources/application.properties`:

```properties
spring.cloud.config.server.native.search-locations=file:/absolute/path/to/config-repo/
```

#### Step 2: Start Services in Order

**1. Config Server**

```bash
cd config-server
mvn spring-boot:run
```

Verify at http://localhost:8888

**2. Discovery Service**

```bash
cd discovery-service
mvn spring-boot:run
```

Verify at http://localhost:8761

**3. API Gateway**

```bash
cd api-gateway
mvn spring-boot:run
```

Verify at http://localhost:8080

**4. Business Services** (in any order)

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

### Startup Time

Complete startup takes approximately **2-3 minutes**:
- Config Server: ~30 seconds
- Discovery Service: ~30 seconds
- Databases: ~20 seconds
- API Gateway: ~30 seconds
- Business Services: ~40 seconds

## API Endpoints

All endpoints are accessible through the API Gateway at `http://localhost:8080`

### Authentication Endpoints

#### Register a New User

```bash
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER"
}
```

#### Login

```bash
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "expiresIn": 86400
}
```

### User Service Endpoints

#### Get All Users (Authenticated)

```bash
GET /users
Authorization: Bearer <token>
```

#### Get User by ID

```bash
GET /users/{id}
Authorization: Bearer <token>
```

#### Update User

```bash
PUT /users/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com"
}
```

#### Delete User

```bash
DELETE /users/{id}
Authorization: Bearer <token>
```

### Resource Service Endpoints

#### Get All Resources

```bash
GET /resources
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Meeting Room A",
    "description": "Large room with projector",
    "capacity": 20,
    "available": true
  }
]
```

#### Get Resource by ID

```bash
GET /resources/{id}
```

#### Create Resource (Admin Only)

```bash
POST /resources
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Meeting Room B",
  "description": "Small room for 5 people",
  "capacity": 5,
  "location": "2nd Floor"
}
```

#### Update Resource (Admin Only)

```bash
PUT /resources/{id}
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Meeting Room B - Updated",
  "capacity": 8
}
```

#### Delete Resource (Admin Only)

```bash
DELETE /resources/{id}
Authorization: Bearer <admin-token>
```

### Reservation Service Endpoints

#### Get All Reservations

```bash
GET /reservations
Authorization: Bearer <token>
```

#### Get Reservation by ID

```bash
GET /reservations/{id}
Authorization: Bearer <token>
```

#### Create Reservation

```bash
POST /reservations
Authorization: Bearer <token>
Content-Type: application/json

{
  "resourceId": 1,
  "startDate": "2024-02-01T10:00:00",
  "endDate": "2024-02-01T12:00:00",
  "purpose": "Team meeting"
}
```

**Response:**
```json
{
  "id": 1,
  "resourceId": 1,
  "userId": 1,
  "startDate": "2024-02-01T10:00:00",
  "endDate": "2024-02-01T12:00:00",
  "status": "CONFIRMED"
}
```

#### Update Reservation

```bash
PUT /reservations/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "startDate": "2024-02-01T14:00:00",
  "endDate": "2024-02-01T16:00:00"
}
```

#### Cancel Reservation

```bash
DELETE /reservations/{id}
Authorization: Bearer <token>
```

### Testing with cURL

```bash
# Register
curl -X POST http://localhost:8080/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'

# Login
TOKEN=$(curl -X POST http://localhost:8080/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  | jq -r '.token')

# Get resources
curl http://localhost:8080/resources \
  -H "Authorization: Bearer $TOKEN"
```

## Database Configuration

### Development (H2 Database)

By default, services use H2 in-memory database for development.

**Access H2 Console:**
- URL: http://localhost:8081/h2-console
- JDBC URL: `jdbc:h2:mem:userdb`
- Username: `sa`
- Password: (empty)

### Production (MySQL with Docker)

When using Docker Compose, three MySQL instances are started:

#### Database Instances

| Service | Port | Database | Username | Password |
|---------|------|----------|----------|----------|
| user-db | 3307 | user_db | root | imrane |
| resource-db | 3308 | resource_db | root | imrane |
| reservation-db | 3309 | reservation_db | root | imrane |

#### Connect to MySQL

```bash
# User Database
docker exec -it user-db mysql -uroot -pimrane user_db

# Resource Database
docker exec -it resource-db mysql -uroot -pimrane resource_db

# Reservation Database
docker exec -it reservation-db mysql -uroot -pimrane reservation_db
```

#### MySQL Configuration

Configuration is managed through `docker-compose.yml`:

```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:mysql://user-db:3306/user_db
  SPRING_DATASOURCE_USERNAME: root
  SPRING_DATASOURCE_PASSWORD: imrane
  SPRING_JPA_HIBERNATE_DDL_AUTO: update
```

### Custom MySQL Configuration

To use your own MySQL instance, update the configuration files in `config-server/config-repo/`:

**Example: `user-service-dev.properties`**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/user_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Data Persistence

Docker volumes ensure data persistence:

```bash
# List volumes
docker volume ls | grep reservationapp

# Inspect a volume
docker volume inspect reservationapp_user-db-data

# Backup a database
docker exec user-db mysqldump -uroot -pimrane user_db > backup.sql

# Restore a database
docker exec -i user-db mysql -uroot -pimrane user_db < backup.sql
```

## Testing

### Unit Tests

Run tests for each service:

```bash
# User Service
cd user_service
mvn test

# Resource Service
cd ressource_service
mvn test

# Reservation Service
cd reservation_service
mvn test
```

### Integration Tests

```bash
# Run all tests including integration tests
mvn verify
```

### Test with Docker

```bash
# Run tests in a container
docker-compose run --rm user-service mvn test

# Run tests for all services
docker-compose run --rm user-service mvn test
docker-compose run --rm resource-service mvn test
docker-compose run --rm reservation-service mvn test
```

### Test Coverage

```bash
# Generate coverage report
mvn test jacoco:report

# View report
open target/site/jacoco/index.html
```

## Build

### Build with Maven

#### Build All Services

```bash
# From the reservation_system directory
mvn clean install
```

#### Build a Specific Service

```bash
cd user_service
mvn clean package
```

The JAR files will be generated in the `target/` directory of each service.

### Build with Docker

#### Build All Images

```bash
# From the project root
docker-compose build
```

#### Build a Specific Service

```bash
docker-compose build user-service
```

#### Build Without Cache

```bash
docker-compose build --no-cache
```

### Docker Image Optimization

Each service uses multi-stage builds for optimization:

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

**Benefits:**
- Smaller final image (~150MB vs ~1.2GB)
- Only runtime dependencies included
- Faster deployment

### Production Build

```bash
# Build with production profile
mvn clean package -Pprod

# Build Docker images for production
docker-compose -f docker-compose.prod.yml build
```

## Troubleshooting

### Service Won't Start

**Problem:** A service fails to start or crashes immediately.

**Solution:**

```bash
# Check logs
docker-compose logs user-service

# Check service status
docker-compose ps

# Restart the service
docker-compose restart user-service

# Rebuild if necessary
docker-compose build user-service
docker-compose up -d user-service
```

### Service Not Registering with Eureka

**Problem:** Service doesn't appear in Eureka Dashboard.

**Solution:**

1. **Check Eureka is running:**
   ```bash
   docker-compose logs discovery-service
   curl http://localhost:8761
   ```

2. **Check service configuration:**
   ```bash
   docker-compose logs user-service | grep eureka
   ```

3. **Verify network connectivity:**
   ```bash
   docker exec user-service ping discovery-service
   ```

4. **Restart in order:**
   ```bash
   docker-compose restart discovery-service
   sleep 30
   docker-compose restart user-service
   ```

### Database Connection Issues

**Problem:** Service can't connect to database.

**Solution:**

1. **Check database is running:**
   ```bash
   docker-compose ps user-db
   docker-compose logs user-db
   ```

2. **Test database connection:**
   ```bash
   docker exec -it user-db mysql -uroot -pimrane -e "SHOW DATABASES;"
   ```

3. **Check database credentials:**
   ```bash
   docker-compose logs user-service | grep datasource
   ```

4. **Verify network:**
   ```bash
   docker exec user-service ping user-db
   ```

5. **Restart database and service:**
   ```bash
   docker-compose restart user-db
   docker-compose restart user-service
   ```

### Configuration Server Issues

**Problem:** Services can't fetch configuration.

**Solution:**

1. **Check Config Server health:**
   ```bash
   curl http://localhost:8888/actuator/health
   ```

2. **Verify configuration files exist:**
   ```bash
   docker exec config-service ls -la /app/config-repo
   ```

3. **Check Config Server logs:**
   ```bash
   docker-compose logs config-service
   ```

4. **Restart Config Server first:**
   ```bash
   docker-compose restart config-service
   sleep 30
   docker-compose restart user-service
   ```

### Port Already in Use

**Problem:** Can't start service because port is already in use.

**Solution:**

1. **Find process using the port:**
   ```bash
   # Linux/Mac
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

2. **Kill the process or change port:**
   ```yaml
   # In docker-compose.yml
   ports:
     - "8081:8080"  # Map to different external port
   ```

### Out of Memory Errors

**Problem:** Service crashes with OutOfMemoryError.

**Solution:**

1. **Increase memory limit:**
   ```yaml
   # In docker-compose.yml
   services:
     user-service:
       deploy:
         resources:
           limits:
             memory: 1G
   ```

2. **Add JVM options:**
   ```yaml
   environment:
     JAVA_OPTS: "-Xmx512m -Xms256m"
   ```

### Clean Restart

**Problem:** System is in an inconsistent state.

**Solution:**

```bash
# Stop everything
docker-compose down

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean Docker system
docker system prune -a

# Rebuild and restart
docker-compose up -d --build
```

### Debugging Tips

```bash
# Access container shell
docker exec -it user-service sh

# Check environment variables
docker exec user-service env

# Check Java process
docker exec user-service ps aux | grep java

# Check network
docker network inspect reservationapp_reservation-network

# View real-time stats
docker stats

# Export logs
docker-compose logs > logs.txt
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/reservationApp.git
   cd reservationApp
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Development Workflow

1. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

2. **Test your changes**
   ```bash
   # Run tests
   mvn test
   
   # Test with Docker
   docker-compose up -d --build
   docker-compose logs -f
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Code Style

- Follow Java naming conventions
- Use meaningful variable names
- Add JavaDoc comments for public methods
- Keep methods small and focused
- Write unit tests for new code

### Commit Messages

Use clear, descriptive commit messages:

```
Add user authentication feature

- Implement JWT token generation
- Add login endpoint
- Add user registration
- Update security configuration
```

### Pull Request Guidelines

- Provide a clear description of changes
- Reference related issues
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused on a single feature/fix

### Reporting Issues

When reporting bugs, include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Docker version, etc.)
- Relevant logs

### Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and constructive

## License

This project is licensed under the MIT License.

## Authors

Developed as part of a resource reservation management project.

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
