# Manual Deployment Steps for Security Updates

## 🚀 Quick Deployment Commands

Run these commands on the server after connecting:

```bash
# 1. Connect to server
ssh claude@178.128.143.51
# Password: 919191eeia

# 2. Navigate to project
cd /var/www/cv-generator

# 3. Backup current state
cp server.js server.js.backup
cp -r analytics-data.json analytics-data.json.backup 2>/dev/null || true

# 4. Pull latest changes
git pull origin main

# 5. Install any new dependencies
npm install

# 6. Generate secure API key
ANALYTICS_API_KEY=$(openssl rand -hex 32)
echo "SAVE THIS API KEY: $ANALYTICS_API_KEY"

# 7. Create production .env file
cat > .env << EOF
NODE_ENV=production
PORT=3000
ANALYTICS_API_KEY=$ANALYTICS_API_KEY
CORS_ORIGIN=http://178.128.143.51,https://learningwithreda.com
API_ONLY=false
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
EOF

# 8. Set secure permissions
chmod 600 .env
chmod 600 analytics-data.json 2>/dev/null || true
chmod 600 daily-analytics.json 2>/dev/null || true

# 9. Restart application
pm2 restart cv-generator

# 10. Verify deployment
pm2 status
curl http://localhost:3000/api/health

# 11. Test analytics tracking (should work without auth)
curl -X POST http://localhost:3000/api/analytics/track-view \
  -H 'Content-Type: application/json' \
  -d '{"templateName":"modern","sessionId":"deploy-test"}'

# 12. Test analytics read (should require auth)
curl http://localhost:3000/api/analytics/report \
  -H "x-analytics-api-key: $ANALYTICS_API_KEY"

# 13. Monitor logs
pm2 logs cv-generator --lines 100
```

## 📋 Verification Checklist

After deployment, verify:

- [ ] Application is running: `pm2 status`
- [ ] Health check passes: `curl http://localhost:3000/api/health`
- [ ] Track-view works without auth
- [ ] Analytics read endpoints require auth
- [ ] .env file has correct permissions (600)
- [ ] No errors in PM2 logs

## 🔒 Important Notes

1. **Save the API key** - You'll need it for admin access
2. **Don't commit .env** - It contains secrets
3. **Monitor logs** - Watch for any errors after deployment
4. **Test thoroughly** - Use the test endpoints above

## 🚨 Rollback if Needed

```bash
# If something goes wrong:
cp server.js.backup server.js
rm .env
pm2 restart cv-generator
```