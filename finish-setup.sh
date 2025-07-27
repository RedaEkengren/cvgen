#!/bin/bash

# Kör detta direkt i droplet terminal

# Check PM2 status
echo "=== Checking PM2 Status ==="
pm2 status

# Test backend
echo -e "\n=== Testing Backend API ==="
curl http://localhost:3000/api/health

# Install and configure Nginx
echo -e "\n=== Installing Nginx ==="
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

# Test and restart Nginx
sudo nginx -t && sudo systemctl restart nginx

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
echo "y" | sudo ufw enable

echo -e "\n=== Setup Complete! ==="
echo "Backend API: http://167.99.215.70/api/health"
echo ""
echo "Next steps:"
echo "1. Update frontend VITE_API_URL to: http://167.99.215.70"
echo "2. Redeploy frontend on App Platform"
echo ""
echo "PM2 commands:"
echo "- pm2 status"
echo "- pm2 logs cv-backend"
echo "- pm2 restart cv-backend"