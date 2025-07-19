# Elder Tracker

A collaborative caregiver application for tracking elderly care status updates.

## 🚀 Quick Start

```bash
# Clone and run the automated setup
git clone <your-repo-url>
cd elder_tracker
chmod +x setup.sh
./setup.sh
```

The setup script will automatically:
- ✅ Check Docker is running
- ✅ Create .env file from example
- ✅ Install all dependencies
- ✅ Start PostgreSQL database
- ✅ Launch both backend and frontend

## 📍 Access Points

Once running, you can access:
- **Backend API**: http://localhost:3000
- **Swagger API Docs**: http://localhost:3000/api
- **Frontend Application**: http://localhost:3001

## 🏗️ Project Structure

This is a monorepo using npm workspaces:

```
elder_tracker/
├── apps/
│   ├── backend/      # NestJS API server
│   └── frontend/     # Vue.js SPA
├── docker-compose.yml
├── package.json      # Monorepo root
└── setup.sh         # Automated setup script
```

## ✨ Features

- **User Management**: Registration and JWT authentication
- **Role-Based Access**: Admin and regular user roles
- **Elder Management**: Track elderly individuals
- **Caregiver Assignment**: Many-to-many caregiver relationships
- **Status Updates**: 5 types (Doctor visits, Accidents, Behavior changes, Symptom changes, General observations)
- **Smart Filtering**: By date, caregiver, elder, and update type
- **API Documentation**: Complete Swagger/OpenAPI docs

## 🛠️ Manual Setup

If you prefer manual setup over the automated script:

```bash
# 1. Copy environment file
cp apps/backend/.env.example apps/backend/.env

# 2. Install dependencies
npm install

# 3. Start database
docker-compose up -d

# 4. Run development servers
npm run dev
```

## 🏆 First Steps After Setup

1. **Login as Admin**: 
   - The system automatically creates an admin user on first startup
   - Email: `admin@eldertracker.com`
   - Password: `admin123`
   - **IMPORTANT**: Change this password immediately after first login!

2. **Test the Application**:
   - Go to http://localhost:3000/api (Swagger UI)
   - Login via POST /auth/login with admin credentials
   - Use the JWT token in subsequent requests
   - Create users and elders (admin only)
   - Assign caregivers to elders
   - Create status updates

## 🐳 Docker Commands

```bash
docker-compose up -d       # Start database
docker-compose down        # Stop database
docker-compose logs -f     # View logs
docker-compose down -v     # Reset database (deletes all data!)
```

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:backend  # Backend tests only
npm run test:frontend # Frontend tests only
npm run test:watch    # Watch mode
```

## 🚀 Deployment to Railway

This monorepo is pre-configured for Railway:

1. Push to GitHub
2. Connect repo to Railway
3. Railway auto-detects the monorepo
4. Set environment variables in Railway dashboard
5. Deploy!

## 📋 Environment Variables

Create `.env` file in `apps/backend/`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=elderuser
DB_PASSWORD=elderpass
DB_DATABASE=eldertracker

# Auth
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=7d

# App
NODE_ENV=development
PORT=3000
```

## 🔧 Development Commands

```bash
# Development
npm run dev           # Run both apps
npm run dev:backend   # Backend only
npm run dev:frontend  # Frontend only

# Production
npm run build         # Build both apps
npm run start         # Start backend (production)
```

## 📚 API Documentation

Full Swagger documentation available at http://localhost:3000/api after starting the backend.

Key endpoints:
- **Auth**: `/auth/login`, `/auth/register`
- **Users**: CRUD operations (admin only)
- **Elders**: CRUD + caregiver assignments (admin only)
- **Status Updates**: Create/view/filter (all authenticated users)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit PR

## 📄 License

MIT License
