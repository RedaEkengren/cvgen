#!/bin/bash

# This script deploys the backend to the droplet
# It should be run from your local machine

DROPLET_IP="167.99.215.70"
DROPLET_USER="claude"

echo "Deploying CV Generator Backend to Droplet..."

# First, let's create a setup script that we'll execute on the droplet
cat > /tmp/setup-backend.sh << 'EOF'
#!/bin/bash

echo "=== Starting CV Generator Backend Setup ==="

# Update system
echo "1. Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "2. Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Chromium and dependencies
echo "3. Installing Chromium..."
sudo apt-get install -y chromium-browser \
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

# Install PM2 and Git
echo "4. Installing PM2 and Git..."
sudo npm install -g pm2
sudo apt-get install -y git nginx

# Create app directory
echo "5. Setting up application..."
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
cd /var/www

# Clone repository
if [ -d "cv-generator" ]; then
  echo "Removing existing installation..."
  pm2 delete cv-backend 2>/dev/null || true
  rm -rf cv-generator
fi

git clone https://github.com/redapple1990/cv-generator.git
cd cv-generator

# Install dependencies
npm install

# Create .env file
cat > .env << ENVEOF
NODE_ENV=production
PORT=3000
API_ONLY=true
CORS_ORIGIN=https://cvgenerator-app-mtnmz.ondigitalocean.app
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENVEOF

# Start with PM2
pm2 start server.js --name cv-backend
pm2 save
sudo pm2 startup systemd -u $USER --hp $HOME

# Configure Nginx
sudo tee /etc/nginx/sites-available/cv-backend > /dev/null << NGINXEOF
server {
    listen 80;
    server_name $DROPLET_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINXEOF

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/cv-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
echo "y" | sudo ufw enable

echo "=== Setup Complete! ==="
echo "Testing backend..."
sleep 5
curl http://localhost:3000/api/health
echo ""
echo "Backend is running at: http://$DROPLET_IP"
pm2 status
EOF

echo "Setup script created. You need to:"
echo "1. Copy this to the droplet: scp /tmp/setup-backend.sh claude@$DROPLET_IP:~/"
echo "2. SSH to droplet: ssh claude@$DROPLET_IP"
echo "3. Run: chmod +x setup-backend.sh && ./setup-backend.sh"
echo ""
echo "Or use password authentication with sshpass if available"