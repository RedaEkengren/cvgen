# Backend Setup Instructions

## Quick Copy-Paste Setup

1. **SSH to your droplet:**
```bash
ssh claude@167.99.215.70
# Password: -18md18710a
```

2. **Copy and paste this entire block:**

```bash
# Update and install Node.js
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Chromium
sudo apt-get install -y chromium-browser

# Install PM2 and Git
sudo npm install -g pm2
sudo apt-get install -y git

# Setup application
sudo mkdir -p /var/www && sudo chown claude:claude /var/www
cd /var/www
git clone https://github.com/redapple1990/cv-generator.git
cd cv-generator
npm install

# Create environment file
cat > .env << EOF
NODE_ENV=production
PORT=3000
API_ONLY=true
CORS_ORIGIN=https://cvgenerator-app-mtnmz.ondigitalocean.app
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EOF

# Start backend
pm2 start server.js --name cv-backend
pm2 save
sudo pm2 startup systemd -u claude --hp /home/claude

# Test
curl http://localhost:3000/api/health
```

3. **Install Nginx (optional but recommended):**
```bash
sudo apt-get install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/cv-backend
```

Paste this:
```nginx
server {
    listen 80;
    server_name 167.99.215.70;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then:
```bash
sudo ln -s /etc/nginx/sites-available/cv-backend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

## Test Your Setup

- Health check: http://167.99.215.70/api/health
- PM2 monitoring: `pm2 monit`
- Logs: `pm2 logs cv-backend`

## Update Frontend

On DigitalOcean App Platform, add environment variable:
```
VITE_API_URL=http://167.99.215.70
```