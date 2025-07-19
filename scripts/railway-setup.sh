#!/bin/bash

echo "🚀 Railway Setup Script for Elder Tracker"
echo "========================================"
echo ""
echo "This script will help you set up your Railway project."
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    curl -fsSL https://railway.app/install.sh | sh
fi

echo "📋 Follow these steps:"
echo ""
echo "1. Run: railway login"
echo "2. Run: railway link (select your project)"
echo "3. Manually add PostgreSQL in Railway dashboard:"
echo "   - Go to your project in Railway"
echo "   - Click 'New Service' → 'Database' → 'PostgreSQL'"
echo ""
echo "4. Set environment variables:"
echo "   railway variables set NODE_ENV=production"
echo "   railway variables set JWT_SECRET=$(openssl rand -base64 32)"
echo "   railway variables set JWT_EXPIRATION=7d"
echo ""
echo "5. Deploy: railway up"
echo ""
echo "⚠️  IMPORTANT: You MUST manually add PostgreSQL through the Railway dashboard!"