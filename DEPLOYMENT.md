# Railway Deployment Guide

This guide explains how to deploy the Elder Tracker monorepo to Railway.

## Prerequisites

- Railway account (https://railway.app)
- Railway CLI installed (optional)

## Deployment Steps

### 1. Create a New Project on Railway

1. Log in to Railway
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account and select this repository

### 2. Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will automatically set up the database and provide connection strings

### 3. Configure Environment Variables

In your Railway project settings, add these environment variables:

```env
# Node environment
NODE_ENV=production

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend API URL (optional, if frontend is deployed separately)
VITE_API_URL=https://your-backend-url.railway.app
```

Railway automatically provides these PostgreSQL variables:
- `DATABASE_URL`
- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

### 4. Deploy

Railway will automatically:
1. Detect the monorepo structure
2. Install dependencies for all workspaces
3. Build both backend and frontend
4. Start the backend server

### 5. Custom Domain (Optional)

1. Go to your service settings
2. Under "Domains", add your custom domain
3. Update your DNS records as instructed

## Architecture on Railway

The deployment runs as a single service that:
- Serves the NestJS API on the root path
- Serves API documentation at `/api`
- Could be extended to serve the Vue frontend statically

## Separate Frontend Deployment (Optional)

For better scalability, you can deploy the frontend separately:

1. Deploy backend to Railway as described above
2. Deploy frontend to Vercel/Netlify/Railway
3. Set `VITE_API_URL` in frontend to point to backend URL

## Monitoring

- Check logs in Railway dashboard
- Monitor PostgreSQL metrics
- Set up health checks at `/` endpoint

## Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` is being used in production
- Check SSL settings in database config

### Build Failures
- Check Node.js version matches requirements (>=18)
- Verify all dependencies are listed in package.json

### Environment Variables
- Double-check all required variables are set
- JWT_SECRET must be set for authentication to work