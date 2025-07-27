#!/bin/bash

# Backend setup script for DigitalOcean Droplet
# Run this on the droplet as claude user

echo "=== CV Generator Backend Setup ==="
echo "Starting setup process..."

# Update system
echo "1. Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "2. Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Chrome dependencies
echo "3. Installing Chrome/Chromium dependencies..."
sudo apt-get install -y \
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
  xdg-utils \
  libxss1 \
  libxtst6 \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libnss3 \
  lsb-release \
  wget

# Install PM2
echo "4. Installing PM2..."
sudo npm install -g pm2

# Install git
echo "5. Installing git..."
sudo apt-get install -y git

# Create directory for app
echo "6. Creating application directory..."
sudo mkdir -p /var/www
sudo chown claude:claude /var/www

# Clone repository
echo "7. Cloning repository..."
cd /var/www
git clone https://github.com/redapple1990/cv-generator.git
cd cv-generator

# Install dependencies
echo "8. Installing npm dependencies..."
npm install

# Create .env file
echo "9. Creating environment configuration..."
cat > .env << EOF
NODE_ENV=production
PORT=3000
API_ONLY=true
CORS_ORIGIN=https://cvgenerator-app-mtnmz.ondigitalocean.app
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EOF

# Test Chromium
echo "10. Testing Chromium installation..."
chromium-browser --version

# Start with PM2
echo "11. Starting application with PM2..."
pm2 start server.js --name cv-backend
pm2 save
sudo pm2 startup systemd -u claude --hp /home/claude

# Install Nginx
echo "12. Installing and configuring Nginx..."
sudo apt-get install -y nginx

# Create Nginx config
sudo tee /etc/nginx/sites-available/cv-backend > /dev/null << 'EOF'
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/cv-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Configure firewall
echo "13. Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "=== Setup Complete! ==="
echo "Backend API is now running at: http://167.99.215.70"
echo "Health check: http://167.99.215.70/api/health"
echo ""
echo "Next steps:"
echo "1. Update frontend VITE_API_URL to: http://167.99.215.70"
echo "2. Deploy frontend to App Platform"
echo ""
echo "Monitor logs with: pm2 logs cv-backend"