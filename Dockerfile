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

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Add a debug script to check file structure
RUN echo '#!/bin/sh' > /debug.sh && \
    echo 'echo "=== Directory structure ==="' >> /debug.sh && \
    echo 'ls -la /app/' >> /debug.sh && \
    echo 'ls -la /app/apps/' >> /debug.sh && \
    echo 'ls -la /app/apps/backend/' >> /debug.sh && \
    echo 'ls -la /app/apps/backend/dist/' >> /debug.sh && \
    echo 'ls -la /app/apps/backend/dist/src/' >> /debug.sh && \
    echo 'echo "=== Environment variables ==="' >> /debug.sh && \
    echo 'env | grep -E "NODE_ENV|PORT|DATABASE_URL|JWT_SECRET" | sed "s/=.*$/=***/"' >> /debug.sh && \
    echo 'echo "=== Starting application ==="' >> /debug.sh && \
    echo 'exec npm start' >> /debug.sh && \
    chmod +x /debug.sh

# Start the application with debug output
CMD ["/debug.sh"]