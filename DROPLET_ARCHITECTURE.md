# CV Generator - Complete Droplet Architecture Plan

## 🏗️ Architecture Overview

### Single Droplet Full-Stack Deployment
- **Frontend**: React SPA (built and served via Nginx)
- **Backend**: Express.js API + Puppeteer PDF generation  
- **Database**: PostgreSQL for user data and CV storage
- **Web Server**: Nginx (reverse proxy + static file serving)
- **Process Manager**: PM2 for Node.js processes
- **SSL**: Let's Encrypt via Certbot
- **Domain**: Custom domain pointing to droplet

## 📋 Droplet Specifications

### Recommended Size
- **Minimum**: 2GB RAM, 1 vCPU, 50GB SSD
- **Recommended**: 4GB RAM, 2 vCPU, 80GB SSD
- **OS**: Ubuntu 22.04 LTS

### Why Larger?
- Puppeteer + Chrome: ~200-500MB RAM per PDF generation
- PostgreSQL: ~100-200MB base memory
- Node.js processes: ~50-100MB each
- Nginx: ~10-20MB
- OS + buffer: ~500MB

## 🗄️ Database Strategy

### PostgreSQL Tables
```sql
-- Users table (for future user accounts)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CV data table
CREATE TABLE cv_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(255), -- For anonymous users
    cv_data JSONB NOT NULL,
    template_name VARCHAR(50) DEFAULT 'modern',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- PDF exports table
CREATE TABLE pdf_exports (
    id SERIAL PRIMARY KEY,
    cv_data_id INTEGER REFERENCES cv_data(id),
    filename VARCHAR(255),
    file_size INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Data Migration Strategy
1. **Phase 1**: Keep localStorage for anonymous users
2. **Phase 2**: Add optional user accounts with database storage
3. **Phase 3**: Full migration to database with import/export

## 🌐 Domain & SSL Setup

### Domain Configuration
```
# Main domain
cvgenerator.se -> Droplet IP

# Subdomain options
api.cvgenerator.se -> Backend API
app.cvgenerator.se -> Frontend App
```

### SSL Certificate
- Let's Encrypt wildcard certificate
- Auto-renewal via Certbot cron job
- HTTPS redirect for all traffic

## 📁 Directory Structure

```
/var/www/
├── cv-generator/
│   ├── frontend/          # Built React app
│   │   ├── index.html
│   │   ├── assets/
│   │   └── ...
│   ├── backend/           # Node.js API
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── uploads/       # Temporary PDF storage
│   ├── scripts/           # Deployment scripts
│   ├── logs/              # Application logs
│   └── backups/           # Database backups
```

## ⚙️ Service Configuration

### PM2 Ecosystem File
```javascript
module.exports = {
  apps: [
    {
      name: 'cv-backend',
      script: '/var/www/cv-generator/backend/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'postgresql://cvuser:password@localhost/cvgenerator'
      },
      error_file: '/var/www/cv-generator/logs/backend-error.log',
      out_file: '/var/www/cv-generator/logs/backend-out.log',
      log_file: '/var/www/cv-generator/logs/backend.log'
    }
  ]
};
```

### Nginx Configuration
```nginx
# Main site configuration
server {
    listen 80;
    server_name cvgenerator.se www.cvgenerator.se;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cvgenerator.se www.cvgenerator.se;
    
    ssl_certificate /etc/letsencrypt/live/cvgenerator.se/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cvgenerator.se/privkey.pem;
    
    # Frontend (React SPA)
    location / {
        root /var/www/cv-generator/frontend;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeout for PDF generation
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

## 🚀 Deployment Strategy

### 1. Automated Setup Script
```bash
#!/bin/bash
# complete-setup.sh

# Update system
apt update && apt upgrade -y

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs nginx postgresql postgresql-contrib git

# Install Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
apt update && apt install -y google-chrome-stable

# Install PM2 and Certbot
npm install -g pm2
apt install -y certbot python3-certbot-nginx

# Setup PostgreSQL
sudo -u postgres createuser --createdb cvuser
sudo -u postgres createdb cvgenerator -O cvuser
```

### 2. Application Deployment
```bash
#!/bin/bash
# deploy-app.sh

# Clone and setup
cd /var/www
git clone [REPO_URL] cv-generator
cd cv-generator

# Backend setup
cd backend
npm install
cp .env.example .env
# Configure environment variables

# Frontend build
cd ../frontend
npm install
npm run build
cp -r dist/* /var/www/cv-generator/frontend/

# Start services
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. SSL Setup
```bash
#!/bin/bash
# setup-ssl.sh

# Get SSL certificate
certbot --nginx -d cvgenerator.se -d www.cvgenerator.se

# Setup auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
```

## 📊 Monitoring & Maintenance

### Log Management
```bash
# PM2 logs
pm2 logs
pm2 monit

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# PostgreSQL logs
tail -f /var/log/postgresql/postgresql-14-main.log
```

### Backup Strategy
```bash
#!/bin/bash
# backup.sh - Run daily via cron

# Database backup
pg_dump cvgenerator > /var/www/cv-generator/backups/db_$(date +%Y%m%d).sql

# Keep only last 7 days
find /var/www/cv-generator/backups/ -name "db_*.sql" -mtime +7 -delete

# Backup to external storage (optional)
# rsync backups to DigitalOcean Spaces or AWS S3
```

## 🔄 CI/CD Pipeline (Future)

### GitHub Actions Workflow
```yaml
name: Deploy to Droplet
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.2
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /var/www/cv-generator
            git pull origin main
            npm run build
            pm2 restart cv-backend
```

## 🎯 Migration Benefits

### From App Platform + Droplet to Single Droplet:
✅ **Cost Effective**: Single $12-24/month droplet vs $12 App Platform + $12 Droplet
✅ **Full Control**: Complete control over environment and configuration
✅ **No CORS Issues**: Same domain for frontend and backend
✅ **Better Performance**: Direct communication, no external API calls
✅ **Easier SSL**: Single certificate for entire application
✅ **Simplified Deployment**: One deployment target
✅ **Database Integration**: PostgreSQL for user accounts and data persistence
✅ **Easier Debugging**: All logs and services in one place

### Scalability Path:
1. **Phase 1**: Single droplet with database
2. **Phase 2**: Load balancer + multiple droplets
3. **Phase 3**: Separate database server
4. **Phase 4**: Kubernetes/Docker containers

## ⚡ Performance Optimizations

### Frontend Optimizations
- Gzip compression in Nginx
- Asset caching with long TTL
- CDN integration (DigitalOcean Spaces)
- Service Worker for offline support

### Backend Optimizations  
- Connection pooling for PostgreSQL
- Redis caching for frequent queries
- PM2 cluster mode for multiple CPU cores
- Background job queue for PDF generation

### PDF Generation Optimizations
- PDF generation in background workers
- Queue system with Bull or Agenda
- File cleanup after download
- Compression for smaller PDF files

## 📝 Environment Variables

```bash
# Backend .env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://cvuser:password@localhost/cvgenerator
JWT_SECRET=your-super-secret-jwt-key
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
PDF_STORAGE_PATH=/var/www/cv-generator/backend/uploads
MAX_PDF_SIZE=10485760
SESSION_SECRET=your-session-secret

# Frontend .env.production
VITE_API_URL=https://cvgenerator.se/api
VITE_APP_NAME=CV Generator
VITE_ENABLE_ANALYTICS=true
```

This architecture provides a robust, scalable foundation for the CV Generator while maintaining simplicity for initial deployment and future growth.