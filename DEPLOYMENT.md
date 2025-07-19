# Railway Deployment Guide

## Prerequisites
- Railway account
- GitHub repository with this code

## Deployment Steps

1. **Connect GitHub Repository**
   - Login to Railway
   - Create new project
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - Go to your Railway project settings
   - Add the following environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRATION=7d
   PORT=3000
   ```
   - Note: DATABASE_URL will be automatically provided by Railway when you add PostgreSQL

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New Service"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. **Deploy**
   - Railway will automatically detect the monorepo structure
   - It will use nixpacks to build and deploy
   - The build process will:
     - Install dependencies
     - Build backend
     - Build frontend
     - Copy frontend to backend/dist/frontend
     - Start the backend server

## Important Notes

- The backend serves the frontend in production
- API routes are available at `/api/*`
- Frontend routes are handled by the SPA
- Default admin user is created on first startup:
  - Email: admin@eldertracker.com
  - Password: admin123
  - **CHANGE THIS PASSWORD IMMEDIATELY**

## Troubleshooting

### Build Errors
- Ensure all dependencies have correct versions
- Check that NODE_ENV is set to production
- Verify DATABASE_URL is set by Railway

### Runtime Errors
- Check Railway logs for detailed error messages
- Ensure JWT_SECRET is set
- Verify database connection is working

### Frontend Not Loading
- Check that the build script correctly copies frontend files
- Verify the backend is serving static files in production mode