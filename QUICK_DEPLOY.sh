#!/bin/bash
# Quick Deploy Script - Copy and paste these commands on the server

# Connect to server:
# ssh claude@178.128.143.51
# Password: 919191eeia

cd /var/www/cv-generator

# Backup
cp server.js server.js.backup

# Pull updates
git pull origin main

# Install dependencies
npm install

# Generate API key
ANALYTICS_API_KEY=$(openssl rand -hex 32)
echo "🔑 SAVE THIS API KEY: $ANALYTICS_API_KEY"

# Create .env
cat > .env << EOF
NODE_ENV=production
PORT=3000
ANALYTICS_API_KEY=$ANALYTICS_API_KEY
CORS_ORIGIN=http://178.128.143.51,https://learningwithreda.com
API_ONLY=false
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
EOF

# Set permissions
chmod 600 .env
chmod 600 analytics-data.json 2>/dev/null || true
chmod 600 daily-analytics.json 2>/dev/null || true

# Restart
pm2 restart cv-generator

# Verify
pm2 status
curl http://localhost:3000/api/health

echo "✅ Deployment complete!"
echo "🔑 Your API key: $ANALYTICS_API_KEY"