#!/bin/bash

# Elder Tracker Monorepo Setup Script

echo "🚀 Setting up Elder Tracker Monorepo..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f apps/backend/.env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp apps/backend/.env.example apps/backend/.env
    echo "⚠️  Please update the JWT_SECRET in .env file for production use!"
fi

# Install dependencies
echo "📦 Installing npm dependencies for all workspaces..."
npm install

# Start PostgreSQL
echo "🐘 Starting PostgreSQL database..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Run the application
echo "🎉 Setup complete! Starting the applications..."
echo "📚 Backend API will be available at: http://localhost:3000"
echo "📚 Swagger documentation will be available at: http://localhost:3000/api"
echo "🖥️  Frontend will be available at: http://localhost:3001"
echo ""
echo "Starting both backend and frontend..."
npm run dev