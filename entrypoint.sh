#!/bin/sh
# 生成 nginx 配置的启动脚本

# 从环境变量读取后端 URL，默认为 backend:3001
BACKEND_URL=${BACKEND_URL:-http://backend:3001}

# 生成 nginx 配置文件
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html index.htm;

    # gzip 压缩
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;
    gzip_vary on;

    # 缓存策略 - 静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # API 代理 - 访问后端服务
    location /api/ {
        proxy_pass $BACKEND_URL;
        proxy_http_version 1.1;
        
        # WebSocket 支持
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # 转发请求头
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 禁用缓冲以获得更好的响应时间
        proxy_buffering off;
    }

    # SPA 路由 - 所有非 API 请求都返回 index.html
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }

    # 处理 404 返回 index.html
    error_page 404 =200 /index.html;
}
EOF

# 启动 nginx
exec nginx -g 'daemon off;'
