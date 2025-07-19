#!/bin/bash
echo "=== Starting production server ==="
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "Environment variables:"
echo "  NODE_ENV: $NODE_ENV"
echo "  PORT: $PORT"
echo "  DATABASE_URL exists: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"

# Check if the main.js file exists
if [ ! -f "apps/backend/dist/src/main.js" ]; then
    echo "ERROR: apps/backend/dist/src/main.js not found!"
    echo "Directory contents:"
    ls -la apps/backend/dist/src/
    exit 1
fi

echo "=== Starting Node.js application ==="
cd apps/backend && node dist/src/main