# Deployment Guide - Split Architecture

This guide explains how to deploy the CV Generator with frontend on DigitalOcean App Platform and backend on a Droplet.

## Architecture Overview

- **Frontend**: React app on DigitalOcean App Platform (static site)
- **Backend**: Express + Puppeteer on DigitalOcean Droplet

## Part 1: Deploy Backend to Droplet

### 1. Create a Droplet

1. Create Ubuntu 22.04 Droplet (minimum 1GB RAM)
2. Add SSH key during creation
3. Note the Droplet's IP address

### 2. Setup Droplet

SSH into your droplet:
```bash
ssh root@your-droplet-ip
```

Install dependencies:
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install Chrome dependencies
apt-get install -y \
  chromium-browser \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils

# Install PM2 for process management
npm install -g pm2

# Install git
apt-get install -y git
```

### 3. Deploy Backend Code

```bash
# Clone repository
cd /var/www
git clone https://github.com/your-username/cv-generator.git
cd cv-generator

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=3000
API_ONLY=true
CORS_ORIGIN=https://cvgenerator-app-mtnmz.ondigitalocean.app
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EOF

# Start with PM2
pm2 start server.js --name cv-backend
pm2 save
pm2 startup
```

### 4. Setup Nginx (Optional but recommended)

```bash
# Install Nginx
apt-get install -y nginx

# Create Nginx config
cat > /etc/nginx/sites-available/cv-backend << 'EOF'
server {
    listen 80;
    server_name your-droplet-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/cv-backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt (Optional)

```bash
# Install certbot
apt-get install -y certbot python3-certbot-nginx

# Get certificate (replace with your domain)
certbot --nginx -d api.yourdomain.com
```

## Part 2: Deploy Frontend to App Platform

### 1. Update Frontend Configuration

Create `.env.production` in your local project:
```
VITE_API_URL=http://your-droplet-ip
```

Or if using SSL:
```
VITE_API_URL=https://api.yourdomain.com
```

### 2. Build Frontend

```bash
npm run build
```

### 3. Deploy to App Platform

1. Push code to GitHub
2. In DigitalOcean App Platform:
   - Choose "Static Site"
   - Connect GitHub repo
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add `VITE_API_URL` with your backend URL

## Part 3: Update CORS

After frontend is deployed, update backend `.env`:
```
CORS_ORIGIN=https://your-frontend-url.ondigitalocean.app
```

Then restart backend:
```bash
pm2 restart cv-backend
```

## Monitoring

### Backend Logs
```bash
pm2 logs cv-backend
pm2 monit
```

### Test Endpoints
- Health check: `http://your-droplet-ip/api/health`
- PDF generation: POST to `/api/generate-pdf`

## Troubleshooting

### Puppeteer Issues
If Puppeteer fails, check:
```bash
# Test Chromium
chromium-browser --version

# Check PM2 logs
pm2 logs cv-backend --lines 100

# Restart service
pm2 restart cv-backend
```

### CORS Issues
Ensure CORS_ORIGIN in backend matches frontend URL exactly.

### Firewall
```bash
# Allow HTTP/HTTPS
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```