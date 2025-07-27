#!/bin/bash

# Deploy Analytics System to Production Server
# Run this on the CV Generator production server

echo "🚀 Deploying Analytics System to Production..."
echo "==============================================="

# 1. Navigate to application directory
cd /var/www/cv-generator || { echo "❌ Application directory not found"; exit 1; }

echo "📂 Current directory: $(pwd)"

# 2. Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed. Please check repository status."
    exit 1
fi

# 3. Install new dependencies (analytics packages)
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed. Please check dependencies."
    exit 1
fi

# 4. Build frontend with analytics
echo "🔨 Building frontend with analytics..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed. Please check build process."
    exit 1
fi

# 5. Initialize analytics data files (if not exists)
echo "📊 Initializing analytics data files..."
if [ ! -f "analytics-data.json" ]; then
    echo '{
  "templates": {
    "modern": { "views": 0, "downloads": 0, "lastUsed": null },
    "executive": { "views": 0, "downloads": 0, "lastUsed": null },
    "bold": { "views": 0, "downloads": 0, "lastUsed": null },
    "creative": { "views": 0, "downloads": 0, "lastUsed": null },
    "gradient": { "views": 0, "downloads": 0, "lastUsed": null },
    "minimal": { "views": 0, "downloads": 0, "lastUsed": null },
    "neon": { "views": 0, "downloads": 0, "lastUsed": null },
    "retro": { "views": 0, "downloads": 0, "lastUsed": null }
  },
  "summary": {
    "totalViews": 0,
    "totalDownloads": 0,
    "startDate": "'$(date -Iseconds)'",
    "lastUpdate": "'$(date -Iseconds)'"
  },
  "userSessions": [],
  "errorTracking": {
    "pdfGenerationFailures": 0,
    "templateLoadErrors": 0
  }
}' > analytics-data.json
    echo "✅ Created analytics-data.json"
else
    echo "✅ analytics-data.json already exists"
fi

if [ ! -f "daily-analytics.json" ]; then
    echo '{}' > daily-analytics.json
    echo "✅ Created daily-analytics.json"
else
    echo "✅ daily-analytics.json already exists"
fi

# 6. Set proper permissions for analytics files
echo "🔐 Setting file permissions..."
chmod 644 analytics-data.json daily-analytics.json
chown $(whoami):$(whoami) analytics-data.json daily-analytics.json

# 7. Restart PM2 backend server
echo "🔄 Restarting backend server with analytics..."
pm2 restart cv-backend

if [ $? -ne 0 ]; then
    echo "❌ PM2 restart failed. Please check PM2 status."
    exit 1
fi

# 8. Wait for server to start
echo "⏱️ Waiting for server to start..."
sleep 3

# 9. Test analytics endpoints
echo "🧪 Testing analytics endpoints..."

# Test health endpoint
HEALTH_RESPONSE=$(curl -s http://localhost:3000/api/health)
if [[ $HEALTH_RESPONSE == *"OK"* ]]; then
    echo "✅ Health endpoint working"
else
    echo "❌ Health endpoint failed"
fi

# Test analytics endpoint
ANALYTICS_RESPONSE=$(curl -s http://localhost:3000/api/analytics/popularity)
if [[ $ANALYTICS_RESPONSE == *"ranking"* ]] || [[ $ANALYTICS_RESPONSE == *"error"* ]]; then
    echo "✅ Analytics endpoint responding"
else
    echo "❌ Analytics endpoint failed"
fi

# 10. Check PM2 status
echo "📊 PM2 Status:"
pm2 status cv-backend

# 11. Check recent logs
echo "📋 Recent logs:"
pm2 logs cv-backend --lines 5

echo ""
echo "🎉 Analytics System Deployment Complete!"
echo "========================================="
echo ""
echo "🌐 Frontend with Analytics: http://178.128.143.51"
echo "📊 Analytics Dashboard: http://178.128.143.51/analytics"
echo "🔧 API Health Check: http://178.128.143.51/api/health"
echo ""
echo "📈 Analytics tracking will start automatically when users:"
echo "   - Navigate to different CV templates"
echo "   - Generate PDF downloads" 
echo "   - Interact with the CV builder"
echo ""
echo "💡 Monitor analytics data with:"
echo "   - Dashboard: http://178.128.143.51/analytics"
echo "   - Logs: pm2 logs cv-backend"
echo "   - Files: cat analytics-data.json"
echo ""
echo "🚀 Ready to collect real user template analytics!"