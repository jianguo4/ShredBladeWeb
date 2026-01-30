#!/bin/bash
# 根据环境变量生成 Nginx 配置

# 从环境变量读取后端 URL，默认为完整 URL（Coolify 反向代理处理）
BACKEND_URL=${BACKEND_URL:-https://api.shredderbladesdirect.com}

# 如果 BACKEND_URL 包含完整 URL（http/https），直接使用
# 否则解析主机和端口
if [[ "$BACKEND_URL" =~ ^https?:// ]]; then
  # 是完整 URL，直接使用（Nginx 支持 HTTPS upstream）
  UPSTREAM_URL="$BACKEND_URL"
else
  # 可能是 host:port 或只是 host，尝试处理
  if [[ "$BACKEND_URL" =~ : ]]; then
    UPSTREAM_URL="http://$BACKEND_URL"
  else
    # 只有主机名，默认端口 3001
    UPSTREAM_URL="http://$BACKEND_URL:3001"
  fi
fi

echo "=== Nginx Configuration ==="
echo "Backend URL: $BACKEND_URL"
echo "Upstream: $UPSTREAM_URL"
echo "============================"

# 生成 Nginx 配置文件
cat > /etc/nginx/conf.d/default.conf <<'EOF'
# Nginx 生产环境配置 - 前端应用 + API 代理

# 前端域名
server {
    listen 80;
    server_name www.shredderbladesdirect.com shredderbladesdirect.com _;

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

    # API 代理到后端
    location /api/ {
        proxy_pass UPSTREAM_PLACEHOLDER;
        proxy_http_version 1.1;
        
        # WebSocket 支持
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # 转发请求头
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 禁用缓冲
        proxy_buffering off;
    }

    # SPA 路由 - 所有非 API 请求都返回 index.html
    location / {
        try_files $uri $uri/ /index.html;
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

# 替换占位符为实际的后端 URL
sed -i "s|UPSTREAM_PLACEHOLDER|$UPSTREAM_URL|g" /etc/nginx/conf.d/default.conf

echo "Nginx config generated successfully"
cat /etc/nginx/conf.d/default.conf

# 启动 Nginx
exec nginx -g 'daemon off;'

