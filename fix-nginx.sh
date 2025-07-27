#!/bin/bash
# Kör detta på droplet för att fixa Nginx

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

# Enable site and disable default
sudo ln -sf /etc/nginx/sites-available/cv-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t && sudo systemctl restart nginx

echo "Nginx configured! Test: curl http://167.99.215.70/api/health"