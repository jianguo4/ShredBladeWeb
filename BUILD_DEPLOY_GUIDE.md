# 🚀 ShredBlade Web 打包部署指南

## 📋 目录
1. [快速打包](#快速打包)
2. [本地测试部署](#本地测试部署)
3. [生产服务器部署](#生产服务器部署)
4. [故障排查](#故障排查)

---

## 🎯 快速打包

### Windows 用户

**一键打包（推荐）:**
```bash
build-and-deploy.bat
```

**手动打包:**
```bash
# 1. 构建前端
cd app/frontend
pnpm build

# 2. 复制前端产物
xcopy /E /I /Y dist\* ..\..\deploy\frontend\

# 3. 复制后端文件
cd ..\backend
xcopy /Y server.js ..\..\deploy\production\
xcopy /Y emailService.js ..\..\deploy\production\
xcopy /Y admin.html ..\..\deploy\production\
xcopy /Y package*.json ..\..\deploy\production\
xcopy /Y ecosystem.config.js ..\..\deploy\production\
xcopy /Y .env* ..\..\deploy\production\

# 4. 安装生产依赖
cd ..\..\deploy\production
npm install --omit=dev
```

### macOS/Linux 用户

```bash
# 1. 构建前端
cd app/frontend
pnpm build

# 2. 复制前端产物
cp -r dist/* ../../deploy/frontend/

# 3. 复制后端文件
cd ../backend
cp server.js emailService.js admin.html package*.json ecosystem.config.js ../../deploy/production/
cp .env* ../../deploy/production/ 2>/dev/null || true

# 4. 安装生产依赖
cd ../../deploy/production
npm install --omit=dev
```

---

## 📂 部署文件结构

打包完成后，`deploy` 文件夹结构如下：

```
deploy/
├── frontend/                  # 前端静态文件
│   ├── index.html            # 主页面
│   ├── assets/               # JS/CSS 资源
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   ├── images/               # 图片资源
│   ├── videos/               # 视频资源
│   ├── robots.txt
│   └── favicon.svg
│
└── production/               # 后端应用
    ├── server.js            # 主服务器
    ├── emailService.js      # 邮件服务
    ├── admin.html           # 管理面板
    ├── package.json         # 依赖清单
    ├── ecosystem.config.js  # PM2 配置
    ├── .env                 # 环境变量（需配置）
    ├── .env.example         # 环境变量模板
    ├── node_modules/        # 生产依赖
    └── inquiries.db         # SQLite 数据库（运行时生成）
```

---

## 🧪 本地测试部署

### 测试后端

```bash
cd deploy/production

# 配置环境变量（首次）
copy .env.example .env
# 编辑 .env 文件，配置邮件等信息

# 启动服务器
node server.js

# 访问测试
# - API: http://localhost:3001
# - 管理面板: http://localhost:3001/admin.html
```

### 测试前端（需配合后端）

使用简单的 HTTP 服务器：

```bash
cd deploy/frontend

# 使用 Python (推荐)
python -m http.server 8080

# 或使用 Node.js http-server
npx http-server -p 8080

# 访问: http://localhost:8080
```

**注意**: 前端需要连接到后端 API (localhost:3001)，确保后端已启动。

---

## 🌐 生产服务器部署

### 准备工作

1. **服务器要求**
   - 操作系统: CentOS 7+, Ubuntu 18+, Debian 10+
   - Node.js: v18+
   - PM2: 进程管理器
   - Nginx: 反向代理服务器

2. **上传文件**
   ```bash
   # 使用 SCP
   scp -r deploy/* user@your-server:/var/www/shredblade/
   
   # 或使用 SFTP/FTP 客户端上传
   ```

### 部署步骤

#### 1. 配置后端环境变量

```bash
cd /var/www/shredblade/production
cp .env.example .env
vim .env
```

配置 `.env` 文件：
```env
# 服务器端口
PORT=3001

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 收件邮箱
RECIPIENT_EMAIL=sales@yourcompany.com

# CORS 配置
CORS_ORIGIN=https://yourdomain.com
```

#### 2. 启动后端（使用 PM2）

```bash
cd /var/www/shredblade/production

# 安装 PM2（如果未安装）
npm install -g pm2

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 设置开机自启
pm2 startup
pm2 save
```

#### 3. 配置 Nginx

创建 Nginx 配置文件：

```bash
sudo vim /etc/nginx/conf.d/shredblade.conf
```

配置内容：
```nginx
# 后端 API 服务器
upstream backend_api {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # 前端静态文件
    root /var/www/shredblade/frontend;
    index index.html;
    
    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
    
    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 视频文件
    location ~* \.(mp4|webm|ogg)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 管理面板
    location /admin.html {
        proxy_pass http://backend_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # 前端路由（SPA）
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

重启 Nginx：
```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. 配置 SSL (可选但推荐)

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 Certbot
sudo yum install certbot python3-certbot-nginx  # CentOS
# 或
sudo apt install certbot python3-certbot-nginx  # Ubuntu

# 获取证书并自动配置 Nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 设置自动续期
sudo crontab -e
# 添加: 0 3 * * * certbot renew --quiet
```

---

## 🔍 故障排查

### 前端无法访问

1. **检查前端文件是否存在**
   ```bash
   ls -la /var/www/shredblade/frontend/
   ```

2. **检查 Nginx 配置**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **查看 Nginx 错误日志**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### 后端 API 不工作

1. **检查 PM2 进程状态**
   ```bash
   pm2 status
   pm2 logs
   ```

2. **检查端口是否被占用**
   ```bash
   netstat -tulpn | grep 3001
   ```

3. **检查环境变量配置**
   ```bash
   cd /var/www/shredblade/production
   cat .env
   ```

4. **手动测试后端**
   ```bash
   cd /var/www/shredblade/production
   node server.js
   # 检查控制台输出
   ```

### 邮件发送失败

1. **检查邮件配置**
   ```bash
   cd /var/www/shredblade/production
   cat .env | grep SMTP
   ```

2. **测试 SMTP 连接**
   - 确认 SMTP 服务器地址和端口正确
   - 确认使用了应用专用密码（而非账户密码）
   - 检查防火墙是否允许 SMTP 端口

3. **查看后端日志**
   ```bash
   pm2 logs
   ```

### 数据库问题

1. **检查数据库文件权限**
   ```bash
   ls -la /var/www/shredblade/production/inquiries.db
   ```

2. **手动测试数据库**
   ```bash
   sqlite3 /var/www/shredblade/production/inquiries.db
   .tables
   SELECT * FROM inquiries LIMIT 5;
   .exit
   ```

---

## 📊 监控与维护

### 查看应用状态
```bash
pm2 status              # 查看进程状态
pm2 monit              # 实时监控
pm2 logs               # 查看日志
pm2 logs --lines 100   # 查看最近100行日志
```

### 重启应用
```bash
pm2 restart shredblade-backend
```

### 更新应用
```bash
# 1. 上传新的部署文件
# 2. 重启应用
pm2 restart shredblade-backend
```

### 备份数据库
```bash
# 创建备份
cp /var/www/shredblade/production/inquiries.db \
   /var/www/shredblade/backups/inquiries-$(date +%Y%m%d).db

# 自动备份（添加到 crontab）
0 2 * * * cp /var/www/shredblade/production/inquiries.db /var/www/shredblade/backups/inquiries-$(date +\%Y\%m\%d).db
```

---

## 📚 相关文档

- [DEPLOYMENT_STATUS.md](DEPLOYMENT_STATUS.md) - 部署状态记录
- [deploy/production/DEPLOYMENT_GUIDE_CENTOS.md](deploy/production/DEPLOYMENT_GUIDE_CENTOS.md) - CentOS 详细部署指南
- [deploy/production/README.md](deploy/production/README.md) - 生产环境说明
- [app/backend/EMAIL_SETUP.md](app/backend/EMAIL_SETUP.md) - 邮件配置指南

---

## 🆘 需要帮助？

- 检查日志: `pm2 logs`
- 检查 Nginx: `sudo nginx -t`
- 检查防火墙: `sudo firewall-cmd --list-all`
- 测试 API: `curl http://localhost:3001/api/inquiries`

---

**最后更新**: 2026-01-22
