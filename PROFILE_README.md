# Hi there, I'm Imrane 👋

<div align="center">
  
  ![Profile Views](https://komarev.com/ghpvc/?username=Imr2Ds&color=blueviolet&style=flat-square)
  
  **Full-Stack Developer | Microservices Enthusiast | Cloud & DevOps**
  
  *Building scalable applications with modern technologies*
  
</div>

---

## 🚀 About Me

I'm a passionate full-stack developer specializing in building enterprise-grade applications with microservices architecture. I love working with cutting-edge technologies and creating solutions that make a difference.

- 🔭 Currently working on **Reservation Management System** with microservices
- 🌱 Learning **Kubernetes, CI/CD, and Cloud-Native technologies**
- 💡 Interested in **Distributed Systems, DevOps, and System Design**
- 📫 How to reach me: **[Your Email]**

---

## 🛠️ Tech Stack

### Languages
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)

### Frontend
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Databases
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![H2](https://img.shields.io/badge/H2-0000BB?style=for-the-badge&logo=h2&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Web Servers
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

### Microservices & Cloud
![Eureka](https://img.shields.io/badge/Eureka-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![API Gateway](https://img.shields.io/badge/API_Gateway-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Config Server](https://img.shields.io/badge/Config_Server-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

---

## 🌟 Featured Projects

### 🎯 [Reservation App - Microservices System](https://github.com/Imr2Ds/reservationApp)

<div align="center">
  
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
  
</div>

A comprehensive full-stack resource reservation management application built with microservices architecture.

#### 🏗️ Architecture
```
Frontend (Angular + Nginx) → API Gateway → Microservices → MySQL Databases
                                ↓
                         Discovery Service (Eureka)
                         Config Server
```

#### ✨ Key Features
- **Microservices Architecture** - Scalable and maintainable backend
- **Service Discovery** - Eureka for dynamic service registration
- **API Gateway** - Single entry point with routing and load balancing
- **JWT Authentication** - Secure user authentication and authorization
- **Role-Based Access Control** - Admin and User roles
- **Docker Containerization** - Easy deployment with Docker Compose
- **Responsive UI** - Modern Angular frontend with Nginx
- **Database Per Service** - Isolated MySQL databases for each microservice

#### 🛠️ Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.x
- Spring Cloud (Gateway, Config, Eureka)
- Spring Security + JWT
- Spring Data JPA
- MySQL 8
- Maven

**Frontend:**
- Angular 16
- TypeScript 5
- RxJS
- Nginx Alpine

**Infrastructure:**
- Docker & Docker Compose
- Multi-stage builds
- Docker networks & volumes

#### 📁 Project Structure
```
reservationApp/
├── reservation_system/        # Backend microservices
│   ├── config-server/        # Centralized configuration
│   ├── discovery-service/    # Eureka service registry
│   ├── api-gateway/         # API Gateway
│   ├── user_service/        # User management + JWT auth
│   ├── ressource_service/   # Resource CRUD
│   └── reservation_service/ # Reservation management
└── frontend/                 # Angular application
    ├── Dockerfile           # Multi-stage build
    └── nginx/              # Nginx config + API proxy
```

#### 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/Imr2Ds/reservationApp.git
cd reservationApp

# Checkout docker version
git checkout docker-version

# Start all services with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:4200
# API Gateway: http://localhost:8080
# Eureka Dashboard: http://localhost:8761
```

#### 🔗 Links
- **Repository:** [github.com/Imr2Ds/reservationApp](https://github.com/Imr2Ds/reservationApp)
- **Branch:** `docker-version`

---

### 📚 [Mintlify Documentation](https://github.com/Imr2Ds/mintlify-docs)

<div align="center">
  
  ![Mintlify](https://img.shields.io/badge/Mintlify-000000?style=flat-square&logo=mintlify&logoColor=white)
  ![MDX](https://img.shields.io/badge/MDX-1B1F24?style=flat-square&logo=mdx&logoColor=white)
  ![Documentation](https://img.shields.io/badge/Documentation-4285F4?style=flat-square&logo=googledocs&logoColor=white)
  
</div>

Professional documentation site built with Mintlify for technical projects and API references.

#### ✨ Features
- **Modern Documentation** - Clean, searchable, and responsive
- **MDX Support** - Write docs with Markdown and React components
- **API Reference** - Auto-generated API documentation
- **Code Examples** - Syntax-highlighted code blocks
- **Dark Mode** - Beautiful dark/light theme support
- **Search** - Fast full-text search
- **Navigation** - Organized sidebar and breadcrumbs

#### 🛠️ Tech Stack
- Mintlify
- MDX (Markdown + JSX)
- React Components
- Custom Styling

#### 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/Imr2Ds/mintlify-docs.git
cd mintlify-docs

# Install Mintlify CLI
npm i -g mintlify

# Start development server
mintlify dev

# Access at http://localhost:3000
```

#### 🔗 Links
- **Repository:** [github.com/Imr2Ds/mintlify-docs](https://github.com/Imr2Ds/mintlify-docs)

---

## 📊 GitHub Statistics

<div align="center">
  
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=Imr2Ds&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Imr2Ds&layout=compact&langs_count=8&theme=tokyonight"/>
  
</div>

<div align="center">
  
  [![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=Imr2Ds&theme=tokyonight)](https://git.io/streak-stats)
  
</div>

<div align="center">
  
  [![Imr2Ds's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=Imr2Ds&theme=tokyo-night)](https://github.com/ashutosh00710/github-readme-activity-graph)
  
</div>

---

## 💼 Skills & Expertise

### 🏛️ Architecture & Design Patterns
- Microservices Architecture
- RESTful API Design
- Service-Oriented Architecture (SOA)
- Domain-Driven Design (DDD)
- MVC Pattern
- Repository Pattern
- Dependency Injection

### 🔧 Development Practices
- Test-Driven Development (TDD)
- Continuous Integration/Continuous Deployment (CI/CD)
- Agile/Scrum Methodologies
- Code Review & Pair Programming
- Git Flow & Version Control
- Documentation-First Development

### 🔒 Security
- JWT Authentication & Authorization
- OAuth 2.0
- Role-Based Access Control (RBAC)
- API Security Best Practices
- CORS Configuration
- SQL Injection Prevention

### 📚 Currently Learning
- Kubernetes & Container Orchestration
- GitHub Actions & CI/CD Pipelines
- Prometheus & Grafana Monitoring
- Distributed Tracing (Zipkin)
- Redis Caching
- Message Queues (RabbitMQ/Kafka)
- Cloud Platforms (AWS/Azure/GCP)

---

## 🤝 Connect With Me

<div align="center">
  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Imr2Ds)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
  [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)
  [![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.com)
  
</div>

---

## 📈 Contribution Graph

<div align="center">
  
  ![Snake animation](https://github.com/Imr2Ds/Imr2Ds/blob/output/github-contribution-grid-snake.svg)
  
</div>

---

<div align="center">
  
  ### 💡 "Code is like humor. When you have to explain it, it's bad." – Cory House
  
  **Thanks for visiting! Feel free to explore my repositories and reach out for collaboration!** 🚀
  
  ![Wave](https://raw.githubusercontent.com/mayhemantt/mayhemantt/Update/svg/Bottom.svg)
  
</div>
