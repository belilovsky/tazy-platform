#!/usr/bin/env bash
set -euo pipefail
certbot certonly --webroot -w /var/www/certbot \
  -d tazy.pro -d www.tazy.pro \
  --non-interactive --agree-tos -m admin@tazy.pro --keep-until-expiring
cat > /etc/nginx/sites-available/tazy.pro << 'NG'
server {
    listen 80;
    listen [::]:80;
    server_name tazy.pro www.tazy.pro;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$host$request_uri; }
}
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tazy.pro www.tazy.pro;
    ssl_certificate     /etc/letsencrypt/live/tazy.pro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tazy.pro/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    client_max_body_size 50M;
    location /api/ {
        proxy_pass http://127.0.0.1:8502/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location /docs        { proxy_pass http://127.0.0.1:8502/docs; }
    location /redoc       { proxy_pass http://127.0.0.1:8502/redoc; }
    location /openapi.json { proxy_pass http://127.0.0.1:8502/openapi.json; }
    location /health      { proxy_pass http://127.0.0.1:8502/health; }
    location / {
        proxy_pass http://127.0.0.1:8501;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NG
nginx -t && systemctl reload nginx
echo 'SSL enabled for tazy.pro'
