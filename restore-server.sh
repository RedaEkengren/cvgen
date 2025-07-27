#!/bin/bash

# CV Generator Server Restore Script
# Restores application, database, configs from backup

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide backup file name"
    echo "Usage: ./restore-server.sh backup-file.tar.gz"
    echo "Available backups:"
    ls -la /var/backups/cv-generator/*.tar.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
BACKUP_DIR="/var/backups/cv-generator"
RESTORE_DIR="/tmp/cv-restore-$(date +%s)"

# Check if backup file exists
if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ] && [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file not found"
    exit 1
fi

# Use full path if relative path provided
if [ -f "$BACKUP_FILE" ]; then
    FULL_BACKUP_PATH="$BACKUP_FILE"
else
    FULL_BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILE"
fi

echo "🔄 Starting CV Generator Server Restore"
echo "📦 Backup file: $FULL_BACKUP_PATH"
echo "📁 Restore directory: $RESTORE_DIR"
echo ""

# Create restore directory
mkdir -p "$RESTORE_DIR"
cd "$RESTORE_DIR"

# Extract backup
echo "1️⃣ Extracting backup archive..."
tar -xzf "$FULL_BACKUP_PATH"
BACKUP_NAME=$(ls | head -1)
cd "$BACKUP_NAME"
echo "   ✅ Backup extracted"

# Show backup info
if [ -f "backup-info.txt" ]; then
    echo ""
    echo "📋 Backup Information:"
    cat backup-info.txt
    echo ""
fi

# Confirmation prompt
read -p "⚠️  This will overwrite current application. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Restore cancelled"
    rm -rf "$RESTORE_DIR"
    exit 1
fi

# Stop services
echo "2️⃣ Stopping services..."
pm2 stop all
sudo systemctl stop nginx
echo "   ✅ Services stopped"

# Restore application
echo "3️⃣ Restoring application..."
if [ -d "application" ]; then
    sudo rm -rf /var/www/cv-generator.backup 2>/dev/null
    sudo mv /var/www/cv-generator /var/www/cv-generator.backup 2>/dev/null
    sudo cp -r application /var/www/cv-generator
    sudo chown -R $(whoami):$(whoami) /var/www/cv-generator
    echo "   ✅ Application restored (old version backed up to cv-generator.backup)"
else
    echo "   ⚠️ No application backup found"
fi

# Restore database
echo "4️⃣ Restoring database..."
if [ -f "database-cv_generator.sql" ]; then
    sudo -u postgres psql -c "DROP DATABASE IF EXISTS cv_generator;"
    sudo -u postgres psql -c "CREATE DATABASE cv_generator;"
    sudo -u postgres psql cv_generator < database-cv_generator.sql
    echo "   ✅ Database restored"
else
    echo "   ⚠️ No database backup found"
fi

# Restore Nginx configuration
echo "5️⃣ Restoring Nginx configuration..."
if [ -d "nginx" ]; then
    sudo cp -r nginx/sites-available/* /etc/nginx/sites-available/
    sudo cp -r nginx/sites-enabled/* /etc/nginx/sites-enabled/
    sudo cp nginx/nginx.conf /etc/nginx/nginx.conf.restored
    sudo nginx -t
    echo "   ✅ Nginx configuration restored"
else
    echo "   ⚠️ No Nginx backup found"
fi

# Restore PM2 configuration
echo "6️⃣ Restoring PM2 configuration..."
if [ -f "pm2/dump.pm2" ]; then
    cp pm2/dump.pm2 ~/.pm2/
    echo "   ✅ PM2 configuration restored"
else
    echo "   ⚠️ No PM2 backup found"
fi

# Restore SSL certificates
echo "7️⃣ Restoring SSL certificates..."
if [ -d "ssl/letsencrypt" ]; then
    sudo cp -r ssl/letsencrypt /etc/
    echo "   ✅ SSL certificates restored"
else
    echo "   ⚠️ No SSL certificates found"
fi

# Restore system configuration
echo "8️⃣ Restoring system configuration..."
if [ -f "system/user.rules" ]; then
    sudo cp system/user.rules /etc/ufw/
    echo "   ✅ UFW rules restored"
fi
if [ -f "system/jail.local" ]; then
    sudo cp system/jail.local /etc/fail2ban/
    echo "   ✅ Fail2ban configuration restored"
fi

# Install dependencies (if needed)
echo "9️⃣ Installing dependencies..."
cd /var/www/cv-generator
npm install --production
echo "   ✅ Dependencies installed"

# Start services
echo "🔟 Starting services..."
sudo systemctl start nginx
pm2 resurrect
pm2 save
echo "   ✅ Services started"

# Test application
echo "🧪 Testing application..."
sleep 3
HEALTH_CHECK=$(curl -s http://localhost:3000/api/health || echo "failed")
if [[ $HEALTH_CHECK == *"OK"* ]]; then
    echo "   ✅ Application is healthy"
else
    echo "   ⚠️ Application health check failed"
fi

# Cleanup
echo "🧹 Cleaning up..."
rm -rf "$RESTORE_DIR"
echo "   ✅ Temporary files cleaned up"

echo ""
echo "🎉 Restore completed successfully!"
echo "🌐 Application should be available at: http://$(curl -s ifconfig.me 2>/dev/null || echo 'your-server-ip')"
echo "🔍 Check status with: pm2 status && sudo systemctl status nginx"
echo ""
echo "📋 Post-restore checklist:"
echo "  1. Verify application is accessible"
echo "  2. Test PDF generation"
echo "  3. Check logs: pm2 logs"
echo "  4. Verify SSL certificates (if applicable)"
echo ""