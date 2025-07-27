# 🗄️ CV Generator Server Backup System

## 📋 Overview

Komplett backup-system för CV Generator med automatiserade dagliga backups, monitoring och restore-funktionalitet.

## 🚀 Quick Setup

### 1. Installera Backup-System på Servern

```bash
# SSH till servern
ssh user@178.128.143.51

# Gå till applikationsmappen
cd /var/www/cv-generator

# Kopiera backup-scripts från repo
git pull  # För att få senaste backup-scripts

# Installera automatiserade backups
chmod +x setup-automated-backups.sh
./setup-automated-backups.sh
```

### 2. Manuell Backup (För Omedelbar Säkerhet)

```bash
# Kör manuell backup
./backup-server.sh

# Kontrollera backup-status
./backup-status.sh
```

## 📦 Vad Som Säkerhetskopieras

### ✅ Applikationsdata
- Komplett `/var/www/cv-generator` mapp
- Alla Node.js dependencies
- Environment-konfiguration (.env)
- PM2 process-konfiguration

### ✅ Databas
- PostgreSQL full dump (cv_generator databas)
- All users och permissions

### ✅ Server-konfiguration
- Nginx virtual hosts och konfiguration
- SSL-certifikat (Let's Encrypt)
- UFW firewall rules
- Fail2ban konfiguration
- Crontab entries

### ✅ Logs och Monitoring
- PM2 logs
- Application logs
- Backup activity logs

## ⏰ Automatiserade Backups

### Dagliga Backups
- **Tid:** 02:00 AM (svensk tid)
- **Retention:** 7 dagar
- **Location:** `/var/backups/cv-generator/`

### Vecko-backups
- **Tid:** Söndag 03:00 AM
- **Inkluderar:** Systemkonfiguration + applikation
- **Retention:** 4 veckor

### Monitoring
- **Tid:** 09:00 AM dagligen
- **Kontrollerar:** Backup framgång, disk space
- **Alerts:** Loggas till `/var/log/cv-generator-backup.log`

## 🔧 Management Commands

### Backup Operations
```bash
# Manual backup
./backup-server.sh

# View backup status
./backup-status.sh

# List all backups
ls -la /var/backups/cv-generator/

# Check backup logs
tail -f /var/log/cv-generator-backup.log
```

### Restore Operations
```bash
# List available backups
ls /var/backups/cv-generator/*.tar.gz

# Restore from specific backup
./restore-server.sh cv-generator-backup-20250726_143022.tar.gz

# Full system restore (emergency)
./restore-server.sh latest-backup.tar.gz
```

## 🆘 Emergency Restore Procedure

### Scenario: Server Completely Down

1. **Setup New Server:**
```bash
# Install basic requirements
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm nginx postgresql git

# Install PM2
sudo npm install -g pm2
```

2. **Get Backup:**
```bash
# If backup stored locally
scp backup-server:/var/backups/cv-generator/latest-backup.tar.gz ./

# If backup stored in cloud/external
wget https://your-backup-storage/latest-backup.tar.gz
```

3. **Restore Everything:**
```bash
# Clone repo for restore scripts
git clone https://github.com/RedaEkengren/cvgen.git
cd cvgen

# Run restore
chmod +x restore-server.sh
./restore-server.sh /path/to/backup.tar.gz
```

4. **Verify Restoration:**
```bash
# Check services
pm2 status
sudo systemctl status nginx postgresql

# Test application
curl http://localhost:3000/api/health
```

## 📊 Backup Monitoring

### Health Checks
```bash
# View recent backup activity
./backup-status.sh

# Check disk usage
df -h /var/backups

# Verify latest backup integrity
tar -tzf /var/backups/cv-generator/latest-backup.tar.gz > /dev/null && echo "✅ Backup OK" || echo "❌ Backup Corrupted"
```

### Email Alerts (Optional)
Edit `backup-monitor.sh` and uncomment email lines:
```bash
# Configure email
ALERT_EMAIL="your-email@domain.com"

# Install mail utility
sudo apt install mailutils

# Test email
echo "Test backup alert" | mail -s "Backup Test" your-email@domain.com
```

## 🔒 Security Best Practices

### 1. Offsite Backup Storage
```bash
# Example: Copy to remote server
scp /var/backups/cv-generator/latest-backup.tar.gz backup-server:/secure/backups/

# Example: Upload to cloud storage (AWS S3)
aws s3 cp /var/backups/cv-generator/latest-backup.tar.gz s3://your-backup-bucket/
```

### 2. Encryption (Recommended for Production)
```bash
# Encrypt backup before storage
gpg --symmetric --cipher-algo AES256 backup.tar.gz

# Decrypt when needed
gpg --decrypt backup.tar.gz.gpg > backup.tar.gz
```

### 3. Backup Verification
```bash
# Regular integrity check (add to crontab)
#!/bin/bash
LATEST_BACKUP=$(ls -t /var/backups/cv-generator/*.tar.gz | head -1)
tar -tzf "$LATEST_BACKUP" > /dev/null && echo "✅ Backup integrity OK" || echo "❌ Backup corrupted"
```

## 📋 Backup Schedule Customization

### Modify Backup Frequency
```bash
# Edit crontab
crontab -e

# Example schedules:
# Every 6 hours: 0 */6 * * *
# Twice daily: 0 2,14 * * *
# Weekdays only: 0 2 * * 1-5
```

### Storage Retention Policy
Edit `backup-server.sh`:
```bash
# Keep last 14 days instead of 7
ls -t cv-generator-backup-*.tar.gz | tail -n +15 | xargs -r sudo rm
```

## 🧪 Testing Backup System

### 1. Test Backup Creation
```bash
./backup-server.sh
echo "Backup test: $?"  # Should return 0 for success
```

### 2. Test Restore (Safe Test)
```bash
# Create test environment
mkdir /tmp/restore-test
cd /tmp/restore-test

# Extract backup (don't overwrite production)
tar -xzf /var/backups/cv-generator/latest-backup.tar.gz
ls -la  # Verify contents
```

### 3. Full Restore Test (Staging Environment)
```bash
# Only on staging/test server!
./restore-server.sh latest-backup.tar.gz
curl http://localhost:3000/api/health  # Verify app works
```

## 🎯 Production Recommendations

### For High-Availability Environments:
1. **Multiple Backup Locations:** Local + Cloud + Offsite
2. **Incremental Backups:** For large datasets
3. **Database Replication:** Master-slave PostgreSQL setup
4. **Application Clustering:** Multiple PM2 instances
5. **Load Balancer:** Nginx upstream for multiple app servers

### For Small/Medium Deployments:
1. **Current Setup:** Perfect för small-medium usage
2. **Cloud Storage:** Weekly upload to S3/DigitalOcean Spaces
3. **Monitoring:** Email alerts för backup failures
4. **Documentation:** Keep restore procedures updated

---

## 📞 Support & Troubleshooting

### Common Issues:

**Backup fails with permissions error:**
```bash
sudo chown -R $(whoami):$(whoami) /var/backups/cv-generator
```

**Database backup fails:**
```bash
sudo -u postgres pg_isready  # Check if PostgreSQL is running
sudo systemctl start postgresql
```

**Nginx config restore fails:**
```bash
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

**PM2 restore fails:**
```bash
pm2 kill && pm2 resurrect
pm2 save
```

---

**🎉 Backup-systemet är nu installerat och redo att skydda din CV Generator!**

**📧 För support:** Kontakta systemadministratör eller check logs i `/var/log/cv-generator-backup.log`