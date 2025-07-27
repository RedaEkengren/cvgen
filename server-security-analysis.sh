#!/bin/bash
# Comprehensive Server Security Analysis Script
# Run this on the production server (178.128.143.51)

echo "🔍 COMPREHENSIVE SERVER SECURITY ANALYSIS"
echo "========================================"
echo "Date: $(date)"
echo "Server: $(hostname) - $(hostname -I)"
echo ""

# Function to print section headers
print_section() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔹 $1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# 1. System Information
print_section "SYSTEM INFORMATION"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p)"
echo "Memory: $(free -h | grep Mem | awk '{print $2 " total, " $3 " used, " $4 " free"}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $2 " total, " $3 " used, " $4 " free (" $5 " used)"}')"

# 2. User Analysis
print_section "USER ACCOUNTS ANALYSIS"
echo "Total users: $(cat /etc/passwd | wc -l)"
echo "Users with shells:"
grep -E "/bin/(bash|sh|zsh)" /etc/passwd | cut -d: -f1 | while read user; do
    last_login=$(lastlog -u $user 2>/dev/null | tail -1 | awk '{print $4,$5,$6,$7,$8,$9}')
    echo "  - $user (last login: ${last_login:-Never})"
done
echo ""
echo "Sudo users:"
grep -E "^sudo:" /etc/group | cut -d: -f4

# 3. Network Security
print_section "NETWORK SECURITY"
echo "Open ports:"
sudo netstat -tlnp | grep LISTEN | awk '{print $4 " -> " $7}' | sort

echo ""
echo "UFW Status:"
sudo ufw status numbered | head -10

echo ""
echo "Active connections:"
netstat -ant | grep ESTABLISHED | wc -l

# 4. SSH Security
print_section "SSH SECURITY CONFIGURATION"
echo "SSH Port: $(grep "^Port" /etc/ssh/sshd_config 2>/dev/null || echo "22 (default)")"
echo "PermitRootLogin: $(grep "^PermitRootLogin" /etc/ssh/sshd_config 2>/dev/null || echo "Not explicitly set")"
echo "PasswordAuthentication: $(grep "^PasswordAuthentication" /etc/ssh/sshd_config 2>/dev/null || echo "Not explicitly set")"
echo "PubkeyAuthentication: $(grep "^PubkeyAuthentication" /etc/ssh/sshd_config 2>/dev/null || echo "Not explicitly set")"
echo ""
echo "Recent SSH login attempts:"
sudo grep "Accepted\|Failed" /var/log/auth.log | tail -5

# 5. Security Software
print_section "SECURITY SOFTWARE STATUS"
echo "Fail2ban status:"
sudo systemctl is-active fail2ban
echo "Fail2ban jails:"
sudo fail2ban-client status | grep "Jail list" | cut -d: -f2
echo ""
echo "UFW status: $(sudo systemctl is-active ufw)"
echo "AppArmor status: $(sudo systemctl is-active apparmor 2>/dev/null || echo "Not installed")"

# 6. Web Server Security
print_section "WEB SERVER SECURITY"
echo "Nginx status: $(systemctl is-active nginx)"
echo "Nginx version: $(nginx -v 2>&1)"
echo ""
echo "SSL/TLS Configuration:"
if [ -f /etc/nginx/sites-enabled/cv-generator ]; then
    grep -E "ssl_|listen.*443" /etc/nginx/sites-enabled/cv-generator | head -5
else
    echo "No SSL configuration found"
fi

# 7. Application Security
print_section "CV GENERATOR APPLICATION"
echo "PM2 processes:"
pm2 list

echo ""
echo "Application environment:"
pm2 info cv-generator | grep -E "NODE_ENV|exec mode|instances|uptime"

echo ""
echo "File permissions:"
ls -la /var/www/cv-generator/.env 2>/dev/null || echo ".env file not found"
ls -la /var/www/cv-generator/analytics-data.json 2>/dev/null || echo "analytics-data.json not found"
ls -la /var/www/cv-generator/daily-analytics.json 2>/dev/null || echo "daily-analytics.json not found"

# 8. Database Security
print_section "DATABASE SECURITY"
echo "PostgreSQL status: $(systemctl is-active postgresql)"
echo "PostgreSQL version: $(sudo -u postgres psql -c "SELECT version();" 2>/dev/null | grep PostgreSQL | cut -d' ' -f2)"
echo ""
echo "Database connections:"
sudo -u postgres psql -c "SELECT count(*) as connections FROM pg_stat_activity;" 2>/dev/null

# 9. System Updates
print_section "SYSTEM UPDATES"
echo "Checking for updates..."
updates=$(sudo apt update 2>/dev/null | grep "packages can be upgraded" || echo "System is up to date")
echo "$updates"

# 10. Security Vulnerabilities
print_section "VULNERABILITY SCAN"
echo "Checking for rootkits with chkrootkit..."
if command -v chkrootkit &> /dev/null; then
    sudo chkrootkit | grep -E "INFECTED|Vulnerable" || echo "No infections found"
else
    echo "chkrootkit not installed"
fi

echo ""
echo "Checking for suspicious processes..."
ps aux | grep -E "(nc |ncat |netcat |/tmp/|perl -e)" | grep -v grep || echo "No suspicious processes found"

# 11. Log Analysis
print_section "SECURITY LOG ANALYSIS"
echo "Recent sudo commands:"
sudo grep "sudo" /var/log/auth.log | tail -3

echo ""
echo "Failed login attempts (last 24h):"
sudo grep "Failed password" /var/log/auth.log | grep "$(date '+%b %d')" | wc -l

echo ""
echo "Nginx error logs (last 5):"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null || echo "No recent errors"

# 12. Resource Usage
print_section "RESOURCE USAGE & LIMITS"
echo "Top 5 CPU consuming processes:"
ps aux --sort=-%cpu | head -6

echo ""
echo "Top 5 memory consuming processes:"
ps aux --sort=-%mem | head -6

# 13. Cron Jobs
print_section "SCHEDULED TASKS"
echo "System cron jobs:"
ls /etc/cron.* 2>/dev/null | grep -v ":" | wc -l
echo ""
echo "User cron jobs:"
crontab -l 2>/dev/null || echo "No user cron jobs"

# 14. Security Score Calculation
print_section "SECURITY SCORE CALCULATION"
score=100
issues=0

# Check various security aspects
[ "$(sudo ufw status | grep -c 'Status: active')" -eq 0 ] && ((score-=10)) && ((issues++)) && echo "❌ UFW not active (-10)"
[ "$(sudo systemctl is-active fail2ban)" != "active" ] && ((score-=10)) && ((issues++)) && echo "❌ Fail2ban not active (-10)"
[ -f /var/www/cv-generator/.env ] || ((score-=5)) && ((issues++)) && echo "⚠️  No .env file (-5)"
[ "$(grep -c PermitRootLogin /etc/ssh/sshd_config 2>/dev/null)" -eq 0 ] && ((score-=5)) && ((issues++)) && echo "⚠️  SSH root login not explicitly disabled (-5)"
[ "$(sudo grep 'Failed password' /var/log/auth.log | grep "$(date '+%b %d')" | wc -l)" -gt 10 ] && ((score-=5)) && ((issues++)) && echo "⚠️  High number of failed logins (-5)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 FINAL SECURITY SCORE: $score/100"
echo "🔍 Issues found: $issues"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 15. Recommendations
if [ $issues -gt 0 ]; then
    print_section "SECURITY RECOMMENDATIONS"
    [ "$(sudo ufw status | grep -c 'Status: active')" -eq 0 ] && echo "1. Enable UFW firewall: sudo ufw enable"
    [ "$(sudo systemctl is-active fail2ban)" != "active" ] && echo "2. Start fail2ban: sudo systemctl start fail2ban"
    [ ! -f /var/www/cv-generator/.env ] && echo "3. Create .env file with production settings"
    [ "$(grep -c PermitRootLogin /etc/ssh/sshd_config 2>/dev/null)" -eq 0 ] && echo "4. Disable SSH root login in /etc/ssh/sshd_config"
fi

echo ""
echo "🏁 Analysis complete at $(date)"