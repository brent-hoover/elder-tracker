# Build stage
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY apps/frontend/package*.json ./apps/frontend/

# Install dependencies
RUN npm ci --workspaces --include-workspace-root

# Copy source code
COPY . .

# Build backend and frontend
RUN npm run build:backend
RUN npm run build:frontend

# Copy frontend build to backend dist
RUN mkdir -p apps/backend/dist/src/frontend
RUN cp -r apps/frontend/dist/* apps/backend/dist/src/frontend/

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install production dependencies only
RUN npm ci --omit=dev --workspaces --include-workspace-root

# Copy built application
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Debug: List what was copied
RUN echo "=== Verifying copied files ===" && \
    ls -la /app/apps/backend/ && \
    ls -la /app/apps/backend/dist/ || echo "dist directory not found"

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application directly
CMD ["node", "/app/apps/backend/dist/main.js"]