#!/bin/bash

# CV Generator Server Backup Script
# Backs up application, database, configs, and logs

# Configuration
BACKUP_DIR="/var/backups/cv-generator"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="cv-generator-backup-$DATE"
FULL_BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

echo "🗄️ Starting CV Generator Server Backup - $DATE"

# Create backup directory
sudo mkdir -p "$BACKUP_DIR"
sudo mkdir -p "$FULL_BACKUP_PATH"

echo "📁 Backup location: $FULL_BACKUP_PATH"

# 1. Application Code and Files
echo "1️⃣ Backing up application code..."
sudo cp -r /var/www/cv-generator "$FULL_BACKUP_PATH/application"
echo "   ✅ Application code backed up"

# 2. PostgreSQL Database
echo "2️⃣ Backing up PostgreSQL database..."
sudo -u postgres pg_dump cv_generator > "$FULL_BACKUP_PATH/database-cv_generator.sql" 2>/dev/null || echo "   ⚠️ Database backup skipped (not configured yet)"
sudo -u postgres pg_dumpall > "$FULL_BACKUP_PATH/database-all.sql" 2>/dev/null || echo "   ⚠️ Full database backup skipped"
echo "   ✅ Database backup completed"

# 3. Nginx Configuration
echo "3️⃣ Backing up Nginx configuration..."
sudo mkdir -p "$FULL_BACKUP_PATH/nginx"
sudo cp -r /etc/nginx/sites-available "$FULL_BACKUP_PATH/nginx/"
sudo cp -r /etc/nginx/sites-enabled "$FULL_BACKUP_PATH/nginx/"
sudo cp /etc/nginx/nginx.conf "$FULL_BACKUP_PATH/nginx/"
echo "   ✅ Nginx configuration backed up"

# 4. PM2 Configuration and Logs
echo "4️⃣ Backing up PM2 configuration..."
sudo mkdir -p "$FULL_BACKUP_PATH/pm2"
pm2 save
sudo cp ~/.pm2/dump.pm2 "$FULL_BACKUP_PATH/pm2/" 2>/dev/null || echo "   ⚠️ PM2 dump not found"
sudo cp -r ~/.pm2/logs "$FULL_BACKUP_PATH/pm2/" 2>/dev/null || echo "   ⚠️ PM2 logs not found"
echo "   ✅ PM2 configuration backed up"

# 5. SSL Certificates (if exists)
echo "5️⃣ Backing up SSL certificates..."
sudo mkdir -p "$FULL_BACKUP_PATH/ssl"
sudo cp -r /etc/letsencrypt "$FULL_BACKUP_PATH/ssl/" 2>/dev/null || echo "   ⚠️ No SSL certificates found"
echo "   ✅ SSL certificates backup completed"

# 6. System Configuration
echo "6️⃣ Backing up system configuration..."
sudo mkdir -p "$FULL_BACKUP_PATH/system"
sudo cp /etc/ufw/user.rules "$FULL_BACKUP_PATH/system/" 2>/dev/null || echo "   ⚠️ UFW rules not found"
sudo cp /etc/fail2ban/jail.local "$FULL_BACKUP_PATH/system/" 2>/dev/null || echo "   ⚠️ Fail2ban config not found"
sudo cp /etc/crontab "$FULL_BACKUP_PATH/system/" 2>/dev/null || echo "   ⚠️ Crontab not found"
echo "   ✅ System configuration backed up"

# 7. Create backup info file
echo "7️⃣ Creating backup metadata..."
cat > "$FULL_BACKUP_PATH/backup-info.txt" << EOF
CV Generator Server Backup
==========================
Date: $DATE
Server: $(hostname)
IP: $(curl -s ifconfig.me 2>/dev/null || echo "Unknown")
Backup Created By: $(whoami)
Application Path: /var/www/cv-generator
Database: PostgreSQL (cv_generator)

Backup Contents:
- Application code and dependencies
- PostgreSQL database dump
- Nginx configuration
- PM2 process configuration
- SSL certificates (if any)
- System security configuration (UFW, Fail2ban)

Restore Instructions:
1. Copy application/ to /var/www/cv-generator
2. Restore database: psql cv_generator < database-cv_generator.sql
3. Copy nginx configs to /etc/nginx/
4. Restore PM2: pm2 resurrect dump.pm2
5. Restart services: sudo systemctl restart nginx && pm2 restart all
EOF

# 8. Create compressed archive
echo "8️⃣ Creating compressed backup archive..."
cd "$BACKUP_DIR"
sudo tar -czf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME"
sudo rm -rf "$BACKUP_NAME"
echo "   ✅ Backup archived: $BACKUP_NAME.tar.gz"

# 9. Set permissions
sudo chown $(whoami):$(whoami) "$BACKUP_DIR/$BACKUP_NAME.tar.gz"

# 10. Cleanup old backups (keep last 7 days)
echo "9️⃣ Cleaning up old backups (keeping last 7)..."
cd "$BACKUP_DIR"
ls -t cv-generator-backup-*.tar.gz | tail -n +8 | xargs -r sudo rm
echo "   ✅ Old backups cleaned up"

# 11. Backup size and summary
BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)
echo ""
echo "🎉 Backup completed successfully!"
echo "📦 Backup file: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
echo "📊 Backup size: $BACKUP_SIZE"
echo "🗓️ Created: $DATE"
echo ""
echo "💡 To restore, run: ./restore-server.sh $BACKUP_NAME.tar.gz"
echo ""

# Optional: Upload to cloud storage (uncomment if needed)
# echo "☁️ Uploading to cloud storage..."
# scp "$BACKUP_DIR/$BACKUP_NAME.tar.gz" user@backup-server:/path/to/backups/
# echo "   ✅ Backup uploaded to cloud"