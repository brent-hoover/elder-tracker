# Elder Tracker

A full-stack monorepo application for managing elderly care with caregiver collaboration. This system allows multiple caregivers to share status updates and observations about elderly individuals they care for.

## Project Structure

This is a monorepo using npm workspaces:

- `/apps/backend` - NestJS API server
- `/apps/frontend` - Vue 3 frontend application

## Features

- **User Management**: User registration and authentication with JWT
- **Role-Based Access Control**: Admin and regular user roles
- **Elder Management**: CRUD operations for elderly individuals
- **Caregiver Assignment**: Many-to-many relationships between caregivers and elders
- **Status Updates**: Five types of updates (Doctor visits, Accidents, Behavior changes, Symptom changes, General observations)
- **Filtering**: Status updates can be filtered by date range, caregiver, elder, and update type
- **API Documentation**: Complete Swagger/OpenAPI documentation

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Getting Started

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd elder-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp apps/backend/.env.example apps/backend/.env
```

4. **Start PostgreSQL with Docker Compose**
```bash
docker-compose up -d
```

5. **Run the application**
```bash
# Run both backend and frontend in dev mode
npm run dev

# Or run separately
npm run dev:backend
npm run dev:frontend
```

### Production Build

```bash
# Build both applications
npm run build

# Start production server
npm run start
```

The API will be available at `http://localhost:3000`
Swagger documentation will be available at `http://localhost:3000/api`

## Docker Commands

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

# View database logs
docker-compose logs postgres

# Remove database and volumes (WARNING: This will delete all data)
docker-compose down -v
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `GET /auth/profile` - Get current user profile (requires authentication)

### Users (Admin only)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user (Admin only)
- `PATCH /users/:id` - Update user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

### Elders
- `GET /elders` - Get all elders
- `GET /elders/:id` - Get elder by ID
- `GET /elders/caregiver/:userId` - Get elders assigned to a caregiver
- `POST /elders` - Create new elder (Admin only)
- `PATCH /elders/:id` - Update elder (Admin only)
- `DELETE /elders/:id` - Delete elder (Admin only)
- `POST /elders/:id/caregivers` - Assign caregivers (Admin only)
- `POST /elders/:elderId/caregivers/:userId` - Add single caregiver (Admin only)
- `DELETE /elders/:elderId/caregivers/:userId` - Remove caregiver (Admin only)

### Status Updates
- `GET /status-updates` - Get all status updates (with filters)
- `GET /status-updates/:id` - Get status update by ID
- `GET /status-updates/elder/:elderId` - Get updates for specific elder
- `POST /status-updates` - Create new status update
- `PATCH /status-updates/:id` - Update status update
- `DELETE /status-updates/:id` - Delete status update

## Running Tests

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# test coverage
npm run test:cov
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USERNAME | Database username | elderuser |
| DB_PASSWORD | Database password | elderpass |
| DB_DATABASE | Database name | eldertracker |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRATION | JWT token expiration | 7d |
| PORT | Application port | 3000 |

## Project Structure

```
src/
├── auth/           # Authentication module (JWT, strategies)
├── users/          # User management module
├── elders/         # Elder management module
├── status-updates/ # Status updates module
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## License

This project is licensed under the MIT License.
