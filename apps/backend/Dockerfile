# Backend Dockerfile
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files from root and backend
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm ci --workspace=@elder-tracker/backend

# Copy backend source code
COPY apps/backend ./apps/backend

# Build the backend
RUN npm run build --workspace=@elder-tracker/backend

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install only production dependencies
RUN npm ci --workspace=@elder-tracker/backend --omit=dev

# Copy built application
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod", "--workspace=@elder-tracker/backend"]