# Frontend - Reservation App

Angular web application for resource reservation management, containerized with Docker and served by Nginx.

## Table of Contents

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Communication](#api-communication)
- [Testing](#testing)
- [Build](#build)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Technologies

### Core Technologies
- **Angular 16.0.0** - Frontend framework
- **TypeScript 5.0.2** - Programming language
- **RxJS 7.8.0** - Reactive programming
- **Node.js 20** - Build environment

### Angular Modules
- **Angular Router** - Navigation and routing
- **Angular Forms** - Form handling (Reactive & Template-driven)
- **Angular HTTP Client** - API communication
- **Angular Common** - Common directives and pipes

### Production
- **Nginx Alpine** - Web server
- **Docker** - Containerization
- **Multi-stage Build** - Optimized Docker images

## Architecture

### Docker Multi-stage Build

The application uses a multi-stage Docker build for optimization:

```dockerfile
# Stage 1: Build Angular Application
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

**Benefits:**
- Final image size: ~25MB (vs ~1.2GB with Node.js)
- Production-optimized build
- Fast deployment

### Nginx Configuration

The `nginx/default.conf` file configures:

1. **Static file serving** for Angular application
2. **Reverse proxy** to API Gateway for API calls
3. **SPA routing** for Angular routes

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Angular SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy to API Gateway
    location /users {
        proxy_pass http://api-gateway:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /resources {
        proxy_pass http://api-gateway:8080;
    }

    location /reservations {
        proxy_pass http://api-gateway:8080;
    }
}
```

## Prerequisites

### With Docker (Recommended)
- Docker 20.10+
- Docker Compose 2.0+

### Without Docker (Local Development)
- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 16.0.0

## Installation and Setup

### Option 1: Docker Compose (Recommended)

This is the easiest way to run the frontend with the backend.

#### Step 1: Start All Services

```bash
# From the project root
docker-compose up -d
```

#### Step 2: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:4200

#### Step 3: View Logs

```bash
# View frontend logs
docker-compose logs -f frontend

# View all logs
docker-compose logs -f
```

### Option 2: Docker Only (Frontend Standalone)

#### Step 1: Build the Image

```bash
cd frontend

# Build Docker image
docker build -t reservationapp-frontend .
```

#### Step 2: Run the Container

```bash
# Run with network (to connect to backend)
docker run -d \
  --name reservation-frontend \
  --network reservationapp_reservation-network \
  -p 4200:80 \
  reservationapp-frontend

# View logs
docker logs -f reservation-frontend
```

### Option 3: Local Development (Without Docker)

#### Step 1: Install Angular CLI

```bash
npm install -g @angular/cli@16
```

#### Step 2: Install Dependencies

```bash
cd frontend
npm install
```

#### Step 3: Start Development Server

```bash
npm start
# or
ng serve
```

The application will be available at http://localhost:4200

**Features:**
- Hot reload on file changes
- Source maps for debugging
- Fast compilation

#### Step 4: Start Backend Services

For the frontend to work, you need the backend running:

```bash
# Option A: Start backend with Docker
cd ..
docker-compose up -d config-service discovery-service api-gateway user-service resource-service reservation-service

# Option B: Start backend locally
# See reservation_system/README.md
```

## Project Structure

```
frontend/
├── Dockerfile                      # Docker multi-stage build
├── nginx/
│   └── default.conf               # Nginx configuration + API proxy
├── src/
│   ├── app/
│   │   ├── core/                  # Core functionality
│   │   │   ├── guards/            # Route guards
│   │   │   │   ├── auth.guard.ts          # Authentication guard
│   │   │   │   └── role.guard.ts          # Role-based guard
│   │   │   ├── interceptors/      # HTTP interceptors
│   │   │   │   └── auth.interceptor.ts    # JWT token interceptor
│   │   │   ├── models/            # Data models
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── resource.model.ts
│   │   │   │   ├── reservation.model.ts
│   │   │   │   └── role.model.ts
│   │   │   └── services/          # Business services
│   │   │       ├── user.service.ts
│   │   │       ├── resource.service.ts
│   │   │       └── reservation.service.ts
│   │   ├── features/              # Feature modules
│   │   │   ├── auth/              # Authentication
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── admin/             # Admin interface
│   │   │   │   ├── admin-home/
│   │   │   │   └── resources/
│   │   │   │       ├── resource-form/
│   │   │   │       ├── resource-details/
│   │   │   │       └── resource-stats/
│   │   │   └── users/             # User interface
│   │   │       ├── user-home/
│   │   │       ├── resource-details/
│   │   │       ├── users/
│   │   │       └── reservations/
│   │   │           ├── reservation-list/
│   │   │           ├── reservation-form/
│   │   │           └── reservation-details/
│   │   ├── shared/                # Shared components
│   │   │   └── components/
│   │   │       ├── navbar/
│   │   │       ├── sidebar/
│   │   │       └── footer/
│   │   ├── app-routing.module.ts  # Route configuration
│   │   ├── app.component.ts       # Root component
│   │   └── app.module.ts          # Root module
│   ├── assets/                    # Static assets
│   ├── styles/                    # Global styles
│   │   ├── button.styles.css
│   │   ├── card.styles.css
│   │   └── input.styles.css
│   └── styles.css                 # Main styles
├── angular.json                   # Angular configuration
├── package.json                   # npm dependencies
├── tsconfig.json                  # TypeScript configuration
└── proxy.config.json              # API proxy configuration
```

## Features

### Authentication

- **User Registration** - Create new user accounts
- **User Login** - Authenticate with email and password
- **JWT Token Management** - Automatic token storage and refresh
- **Logout** - Clear session and redirect to login

### User Space

- **Browse Resources** - View available resources
- **Create Reservations** - Book resources for specific time slots
- **View My Reservations** - See all personal reservations
- **Modify Reservations** - Update reservation details
- **Cancel Reservations** - Delete reservations
- **Resource Details** - View detailed resource information

### Admin Space

- **Resource Management** - Full CRUD operations on resources
- **Resource Statistics** - View usage statistics
- **User Management** - Manage user accounts
- **Reservation Overview** - View all system reservations

### Security Features

#### AuthGuard

Protects routes requiring authentication:

```typescript
// app-routing.module.ts
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

**Implementation:**
```typescript
// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

#### RoleGuard

Protects routes by user role (ADMIN, USER):

```typescript
// app-routing.module.ts
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] }
}
```

**Implementation:**
```typescript
// role.guard.ts
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'];
    const userRole = this.authService.getUserRole();
    return requiredRoles.includes(userRole);
  }
}
```

#### AuthInterceptor

Automatically adds JWT token to HTTP requests:

```typescript
// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
```

## API Communication

### Services

#### UserService

Manages users and authentication:

```typescript
// user.service.ts
@Injectable()
export class UserService {
  private apiUrl = '/users';

  // Authentication
  login(credentials: LoginRequest): Observable<AuthResponse>
  register(user: RegisterRequest): Observable<User>
  logout(): void
  
  // User management
  getCurrentUser(): Observable<User>
  getUsers(): Observable<User[]>
  getUser(id: number): Observable<User>
  updateUser(id: number, user: User): Observable<User>
  deleteUser(id: number): Observable<void>
}
```

**Usage Example:**
```typescript
// login.component.ts
this.userService.login({ email, password }).subscribe({
  next: (response) => {
    localStorage.setItem('token', response.token);
    this.router.navigate(['/dashboard']);
  },
  error: (error) => {
    console.error('Login failed', error);
  }
});
```

#### ResourceService

Manages resources:

```typescript
// resource.service.ts
@Injectable()
export class ResourceService {
  private apiUrl = '/resources';

  getResources(): Observable<Resource[]>
  getResource(id: number): Observable<Resource>
  createResource(resource: Resource): Observable<Resource>
  updateResource(id: number, resource: Resource): Observable<Resource>
  deleteResource(id: number): Observable<void>
  searchResources(query: string): Observable<Resource[]>
}
```

**Usage Example:**
```typescript
// resource-list.component.ts
this.resourceService.getResources().subscribe({
  next: (resources) => {
    this.resources = resources;
  },
  error: (error) => {
    console.error('Failed to load resources', error);
  }
});
```

#### ReservationService

Manages reservations:

```typescript
// reservation.service.ts
@Injectable()
export class ReservationService {
  private apiUrl = '/reservations';

  getReservations(): Observable<Reservation[]>
  getReservation(id: number): Observable<Reservation>
  createReservation(reservation: Reservation): Observable<Reservation>
  updateReservation(id: number, reservation: Reservation): Observable<Reservation>
  deleteReservation(id: number): Observable<void>
  getMyReservations(): Observable<Reservation[]>
}
```

**Usage Example:**
```typescript
// reservation-form.component.ts
this.reservationService.createReservation(reservation).subscribe({
  next: (created) => {
    this.router.navigate(['/reservations', created.id]);
  },
  error: (error) => {
    console.error('Failed to create reservation', error);
  }
});
```

### API Proxy Configuration

#### Via Nginx (Production)

Nginx automatically proxies API requests:
- `/users` → `http://api-gateway:8080/users`
- `/resources` → `http://api-gateway:8080/resources`
- `/reservations` → `http://api-gateway:8080/reservations`

#### Via Angular Proxy (Development)

For local development, use `proxy.config.json`:

```json
{
  "/users": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  },
  "/resources": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  },
  "/reservations": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

**Start with proxy:**
```bash
ng serve --proxy-config proxy.config.json
```

## Testing

### Unit Tests

Run unit tests with Karma:

```bash
# Run tests
npm test

# Run tests in headless mode
npm test -- --browsers=ChromeHeadless

# Run tests with coverage
npm test -- --code-coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage

```bash
# Generate coverage report
npm test -- --code-coverage

# View coverage report
open coverage/index.html
```

**Coverage thresholds** (configured in `angular.json`):
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### End-to-End Tests

```bash
# Install Protractor (if not installed)
npm install -g protractor

# Update webdriver
webdriver-manager update

# Run e2e tests
npm run e2e
```

### Testing in Docker

```bash
# Run tests in container
docker-compose run --rm frontend npm test -- --browsers=ChromeHeadless --watch=false

# Run with coverage
docker-compose run --rm frontend npm test -- --code-coverage --watch=false
```

## Build

### Development Build

```bash
# Build for development
npm run build

# Output directory: dist/
```

### Production Build

```bash
# Build for production
npm run build -- --configuration=production

# Or
ng build --configuration=production
```

**Production optimizations:**
- **AOT Compilation** - Ahead-of-time compilation
- **Tree Shaking** - Remove unused code
- **Minification** - Compress JavaScript and CSS
- **Bundle Optimization** - Optimize bundle sizes
- **Source Maps** - Generate source maps for debugging

### Watch Mode

```bash
# Build and watch for changes
npm run watch

# Or
ng build --watch --configuration=development
```

### Docker Build

```bash
# Build Docker image
docker build -t reservationapp-frontend .

# Build without cache
docker build --no-cache -t reservationapp-frontend .

# Check image size
docker images reservationapp-frontend
```

**Expected image size:** ~25MB

### Build Analysis

```bash
# Analyze bundle size
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Troubleshooting

### Application Won't Load

**Problem:** Blank page or loading errors.

**Solution:**

1. **Check browser console:**
   - Open DevTools (F12)
   - Look for JavaScript errors

2. **Check container logs:**
   ```bash
   docker-compose logs frontend
   ```

3. **Verify Nginx is running:**
   ```bash
   docker exec reservation-frontend ps aux | grep nginx
   ```

4. **Check files are present:**
   ```bash
   docker exec reservation-frontend ls -la /usr/share/nginx/html
   ```

5. **Restart container:**
   ```bash
   docker-compose restart frontend
   ```

### 404 Errors on Angular Routes

**Problem:** Refreshing the page returns 404.

**Solution:**

Ensure `nginx/default.conf` has the SPA fallback:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Then rebuild:
```bash
docker-compose build frontend
docker-compose up -d frontend
```

### CORS Errors

**Problem:** API requests fail with CORS errors.

**Solution:**

1. **Use Nginx proxy (recommended):**
   - Nginx proxies requests to avoid CORS
   - Verify `nginx/default.conf` has proxy configuration

2. **For local development:**
   ```bash
   ng serve --proxy-config proxy.config.json
   ```

3. **Check API Gateway CORS configuration:**
   ```bash
   docker-compose logs api-gateway | grep CORS
   ```

### API Requests Failing

**Problem:** API calls return errors or timeout.

**Solution:**

1. **Check API Gateway is running:**
   ```bash
   docker-compose ps api-gateway
   curl http://localhost:8080/actuator/health
   ```

2. **Check network connectivity:**
   ```bash
   docker exec reservation-frontend ping api-gateway
   ```

3. **Verify proxy configuration:**
   ```bash
   docker exec reservation-frontend cat /etc/nginx/conf.d/default.conf
   ```

4. **Check browser network tab:**
   - Open DevTools → Network
   - Look for failed requests
   - Check request/response details

### Authentication Issues

**Problem:** Login fails or token not working.

**Solution:**

1. **Check token storage:**
   ```javascript
   // Browser console
   localStorage.getItem('token')
   ```

2. **Verify token is sent:**
   - DevTools → Network → Select request
   - Check Headers → Authorization

3. **Check interceptor:**
   ```bash
   # Verify AuthInterceptor is registered
   cat src/app/app.module.ts | grep AuthInterceptor
   ```

4. **Clear storage and retry:**
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   ```

### Build Errors

**Problem:** Build fails with errors.

**Solution:**

1. **Clear cache:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node/npm versions:**
   ```bash
   node --version  # Should be 16+
   npm --version   # Should be 8+
   ```

3. **Fix TypeScript errors:**
   ```bash
   npm run build -- --verbose
   ```

4. **Check for circular dependencies:**
   ```bash
   npx madge --circular src/app
   ```

### Docker Build Issues

**Problem:** Docker build fails.

**Solution:**

1. **Check Dockerfile syntax:**
   ```bash
   docker build --no-cache -t test .
   ```

2. **Verify files exist:**
   ```bash
   ls -la nginx/default.conf
   ls -la package.json
   ```

3. **Check Docker logs:**
   ```bash
   docker-compose logs frontend
   ```

4. **Clean Docker cache:**
   ```bash
   docker builder prune
   docker-compose build --no-cache frontend
   ```

### Performance Issues

**Problem:** Application is slow.

**Solution:**

1. **Enable production mode:**
   ```bash
   ng build --configuration=production
   ```

2. **Enable Gzip in Nginx:**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

3. **Lazy load modules:**
   ```typescript
   // app-routing.module.ts
   {
     path: 'admin',
     loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
   }
   ```

4. **Use OnPush change detection:**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

### Debugging Tips

```bash
# Access container shell
docker exec -it reservation-frontend sh

# Check Nginx configuration
docker exec reservation-frontend nginx -t

# Reload Nginx
docker exec reservation-frontend nginx -s reload

# View Nginx access logs
docker exec reservation-frontend tail -f /var/log/nginx/access.log

# View Nginx error logs
docker exec reservation-frontend tail -f /var/log/nginx/error.log

# Check environment
docker exec reservation-frontend env

# Test API connectivity
docker exec reservation-frontend wget -O- http://api-gateway:8080/actuator/health
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
   cd reservationApp/frontend
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Development Workflow

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Make your changes**
   - Follow Angular style guide
   - Write unit tests
   - Update documentation

4. **Run tests**
   ```bash
   npm test
   npm run lint
   ```

5. **Build and test with Docker**
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Create a Pull Request**

### Code Style

- Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- Use TypeScript strict mode
- Use meaningful variable names
- Add JSDoc comments for public methods
- Keep components small and focused
- Use reactive programming (RxJS)

### Component Structure

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, OnDestroy {
  // Public properties
  public items: Item[] = [];
  
  // Private properties
  private destroy$ = new Subject<void>();
  
  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadItems();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private loadItems(): void {
    this.itemService.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => this.items = items);
  }
}
```

### Testing Guidelines

- Write unit tests for all components
- Test services with mocked dependencies
- Test guards and interceptors
- Aim for 80%+ code coverage

**Example test:**
```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

### Commit Messages

Use conventional commits:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add tests for reservation service
chore: update dependencies
```

### Pull Request Checklist

- [ ] Code follows Angular style guide
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Builds successfully with Docker
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility checked

## License

This project is licensed under the MIT License.

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
