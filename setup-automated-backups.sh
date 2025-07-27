#!/bin/bash

# Setup Automated Backup System for CV Generator
# Creates cron jobs and backup monitoring

echo "⚙️ Setting up automated backup system for CV Generator"

# Configuration
BACKUP_SCRIPT="/var/www/cv-generator/backup-server.sh"
CRON_USER="$(whoami)"
LOG_FILE="/var/log/cv-generator-backup.log"

# 1. Copy backup scripts to server
echo "1️⃣ Installing backup scripts..."
sudo mkdir -p /var/backups/cv-generator
sudo mkdir -p /var/log

# Make scripts executable
chmod +x backup-server.sh
chmod +x restore-server.sh

echo "   ✅ Backup scripts installed"

# 2. Create backup log file
echo "2️⃣ Setting up logging..."
sudo touch "$LOG_FILE"
sudo chown $(whoami):$(whoami) "$LOG_FILE"
echo "   ✅ Log file created: $LOG_FILE"

# 3. Setup cron job for daily backups
echo "3️⃣ Setting up automated daily backups..."

# Create cron job entry
CRON_ENTRY="0 2 * * * cd /var/www/cv-generator && ./backup-server.sh >> $LOG_FILE 2>&1"

# Add to crontab if not already exists
(crontab -l 2>/dev/null | grep -v "backup-server.sh"; echo "$CRON_ENTRY") | crontab -

echo "   ✅ Daily backup scheduled for 02:00 AM"

# 4. Setup weekly full system backup
echo "4️⃣ Setting up weekly full system backup..."

# Create weekly backup script
cat > weekly-backup.sh << 'EOF'
#!/bin/bash
# Weekly full system backup
LOG_FILE="/var/log/cv-generator-backup.log"
echo "$(date): Starting weekly full backup" >> "$LOG_FILE"

# Run regular backup
cd /var/www/cv-generator && ./backup-server.sh >> "$LOG_FILE" 2>&1

# Additional system backup
WEEKLY_DIR="/var/backups/cv-generator/weekly"
DATE=$(date +%Y%m%d)
sudo mkdir -p "$WEEKLY_DIR"

# Backup important system files
sudo tar -czf "$WEEKLY_DIR/system-config-$DATE.tar.gz" \
    /etc/nginx \
    /etc/ufw \
    /etc/fail2ban \
    /etc/crontab \
    /etc/systemd \
    ~/.pm2 \
    2>/dev/null

echo "$(date): Weekly backup completed" >> "$LOG_FILE"
EOF

chmod +x weekly-backup.sh

# Add weekly cron job
WEEKLY_CRON="0 3 * * 0 cd /var/www/cv-generator && ./weekly-backup.sh"
(crontab -l 2>/dev/null | grep -v "weekly-backup.sh"; echo "$WEEKLY_CRON") | crontab -

echo "   ✅ Weekly backup scheduled for Sunday 03:00 AM"

# 5. Create backup monitoring script
echo "5️⃣ Setting up backup monitoring..."

cat > backup-monitor.sh << 'EOF'
#!/bin/bash
# Monitor backup health and send alerts

BACKUP_DIR="/var/backups/cv-generator"
LOG_FILE="/var/log/cv-generator-backup.log"
ALERT_EMAIL="admin@yourdomain.com"  # Change this to your email

# Check if backup exists from last 25 hours
LATEST_BACKUP=$(find "$BACKUP_DIR" -name "cv-generator-backup-*.tar.gz" -mtime -1 | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "$(date): ❌ ALERT: No backup found in last 24 hours!" >> "$LOG_FILE"
    # Uncomment to enable email alerts:
    # echo "CV Generator backup missing for $(date)" | mail -s "Backup Alert" "$ALERT_EMAIL"
else
    BACKUP_SIZE=$(du -h "$LATEST_BACKUP" | cut -f1)
    echo "$(date): ✅ Latest backup OK: $(basename "$LATEST_BACKUP") ($BACKUP_SIZE)" >> "$LOG_FILE"
fi

# Check disk space
DISK_USAGE=$(df /var/backups | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 85 ]; then
    echo "$(date): ⚠️ WARNING: Backup disk usage at ${DISK_USAGE}%" >> "$LOG_FILE"
fi

# Cleanup old logs (keep last 30 days)
find "$LOG_FILE" -mtime +30 -delete 2>/dev/null
EOF

chmod +x backup-monitor.sh

# Add monitoring cron job (daily at 9 AM)
MONITOR_CRON="0 9 * * * cd /var/www/cv-generator && ./backup-monitor.sh"
(crontab -l 2>/dev/null | grep -v "backup-monitor.sh"; echo "$MONITOR_CRON") | crontab -

echo "   ✅ Backup monitoring scheduled"

# 6. Create backup status script
echo "6️⃣ Creating backup status script..."

cat > backup-status.sh << 'EOF'
#!/bin/bash
# Display backup status and statistics

BACKUP_DIR="/var/backups/cv-generator"
LOG_FILE="/var/log/cv-generator-backup.log"

echo "🗄️ CV Generator Backup Status"
echo "=============================="
echo ""

# Latest backup info
echo "📦 Latest Backups:"
ls -lht "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -5 | while read line; do
    echo "   $line"
done
echo ""

# Backup statistics
BACKUP_COUNT=$(ls "$BACKUP_DIR"/*.tar.gz 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
echo "📊 Statistics:"
echo "   Total backups: $BACKUP_COUNT"
echo "   Total size: $TOTAL_SIZE"
echo ""

# Recent log entries
echo "📋 Recent Activity:"
tail -10 "$LOG_FILE" 2>/dev/null || echo "   No log entries found"
echo ""

# Disk space
echo "💾 Disk Usage:"
df -h /var/backups | tail -1
echo ""

# Cron schedule
echo "⏰ Backup Schedule:"
crontab -l | grep -E "(backup|weekly)" | while read line; do
    echo "   $line"
done
EOF

chmod +x backup-status.sh

echo "   ✅ Backup status script created"

# 7. Test backup system
echo "7️⃣ Testing backup system..."
echo "Running initial backup test..."
./backup-server.sh > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "   ✅ Initial backup test successful"
else
    echo "   ⚠️ Backup test failed - check manually"
fi

echo ""
echo "🎉 Automated backup system setup complete!"
echo ""
echo "📋 Backup Configuration:"
echo "   Daily backups: 02:00 AM"
echo "   Weekly backups: Sunday 03:00 AM"
echo "   Monitoring: Daily 09:00 AM"
echo "   Log file: $LOG_FILE"
echo "   Backup location: /var/backups/cv-generator/"
echo ""
echo "🔧 Management Commands:"
echo "   View status: ./backup-status.sh"
echo "   Manual backup: ./backup-server.sh"
echo "   Restore backup: ./restore-server.sh backup-file.tar.gz"
echo "   View logs: tail -f $LOG_FILE"
echo ""
echo "⚠️ Important Notes:"
echo "   - Configure email alerts in backup-monitor.sh"
echo "   - Consider offsite backup for production"
echo "   - Test restore procedure regularly"
echo "   - Monitor disk space for backup directory"
echo ""
EOF

chmod +x setup-automated-backups.sh