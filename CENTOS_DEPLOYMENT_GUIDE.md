# 🚀 CentOS 服务器部署完整指南

**目标服务器**: CentOS 10 (Linux)  
**部署应用**: ShredBlade Web 应用 (前后端)  
**部署方式**: 手动部署 + PM2 进程管理  
**预期耗时**: 30-45 分钟

---

## 📋 部署前环境检查

### 第 0 步: 连接服务器并检查环境

```bash
# 连接到 CentOS 服务器（替换 IP 和用户名）
ssh root@your_server_ip
# 或
ssh ubuntu@your_server_ip
```

### 检查系统环境

```bash
# 检查 CentOS 版本
cat /etc/os-release

# 检查系统架构
uname -m  # x86_64 表示 64 位

# 检查磁盘空间（需要至少 1GB 自由空间）
df -h

# 检查内存（建议至少 1GB）
free -h
```

**预期响应示例**:
```
CentOS Linux 10 (or RHEL compatible)
x86_64
Avail: 50G
Mem: 4GB
```

---

## 🔧 第 1 步: 安装系统依赖

### 1.1 更新系统包管理器

```bash
sudo yum update -y
# 或者 (对于 CentOS 8+)
sudo dnf update -y
```

**预期响应**: 更新完成，显示 `Complete!`

### 1.2 安装 Node.js 和 npm

```bash
# 方式 1: 使用 NodeSource 仓库 (推荐，获得最新版本)
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 方式 2: 使用系统仓库 (如果 NodeSource 无法访问)
sudo yum install -y nodejs npm
```

### 1.3 验证 Node.js 和 npm 安装

```bash
node -v      # 应显示 v18.x.x 或更高
npm -v       # 应显示 8.x.x 或更高
npm list -g  # 检查全局包
```

**预期响应示例**:
```
v18.18.0
8.19.4
```

### 1.4 安装其他必要工具

```bash
# Git (用于版本控制)
sudo yum install -y git

# curl (用于 API 测试)
sudo yum install -y curl

# wget (用于下载文件)
sudo yum install -y wget

# Nginx (用于反向代理和静态文件服务)
sudo yum install -y nginx

# PM2 (全局安装，进程管理)
sudo npm install -g pm2

# 验证安装
git --version
curl --version
nginx -v
pm2 --version
```

**预期响应示例**:
```
git version 2.x.x
curl 7.x.x
nginx version: nginx/1.x.x
PM2 version 5.x.x
```

---

## 📦 第 2 步: 上传部署文件到服务器

### 2.1 创建部署目录

```bash
# 创建应用目录
sudo mkdir -p /var/www/shredder-blade
sudo chown $USER:$USER /var/www/shredder-blade
chmod 755 /var/www/shredder-blade

# 创建数据目录
sudo mkdir -p /var/www/shredder-blade/data
chmod 755 /var/www/shredder-blade/data
```

### 2.2 从本地机器上传文件

**在本地 Windows 机器上执行**（使用 PowerShell 或 SCP）:

```powershell
# 方式 1: 使用 scp (推荐)
# 上传后端文件
scp -r "D:\Business\Web\ShredBladeWeb\deploy\backend" root@your_server_ip:/var/www/shredder-blade/

# 上传前端文件
scp -r "D:\Business\Web\ShredBladeWeb\deploy\frontend" root@your_server_ip:/var/www/shredder-blade/

# 方式 2: 使用 WinSCP 工具
# 使用 WinSCP GUI 连接并拖拽文件
```

**或者在 CentOS 服务器上执行** (如有 Git 访问):

```bash
# 如果有 Git 仓库
cd /var/www/shredder-blade
git clone https://github.com/your-repo/shredder-blade.git .
# 或者从 Windows 共享目录复制
```

### 2.3 验证文件上传

```bash
# 检查目录结构
ls -la /var/www/shredder-blade/

# 预期输出
# backend/
# frontend/
# 以及其他文件

# 检查后端文件
ls -la /var/www/shredder-blade/backend/

# 检查前端文件
ls -la /var/www/shredder-blade/frontend/
```

**预期响应**:
```
drwxr-xr-x  backend
drwxr-xr-x  frontend
-rw-r--r--  server.js
-rw-r--r--  package.json
-rw-r--r--  index.html
...
```

---

## 🔐 第 3 步: 配置环境变量

### 3.1 创建并配置 .env.production

```bash
# 进入后端目录
cd /var/www/shredder-blade/backend

# 编辑或创建 .env.production
nano .env.production
# 或使用 vi
vi .env.production
```

### 3.2 输入以下内容

```env
# 环境标识
NODE_ENV=production

# 服务器配置
PORT=3001
HOST=0.0.0.0

# 数据库配置
DATABASE_PATH=/var/www/shredder-blade/data/inquiries.db

# 邮件配置（根据需要启用）
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NOTIFICATION_EMAIL=admin@example.com

# 日志配置
LOG_LEVEL=info

# CORS 配置（根据前端域名修改）
CORS_ORIGIN=http://your_domain.com

# 超时配置
REQUEST_TIMEOUT=30000
```

### 3.3 保存配置

```bash
# 在 nano 中: Ctrl+O 保存，Enter 确认，Ctrl+X 退出
# 在 vi 中: Esc + :wq 保存并退出
```

**预期响应**: 文件已保存，无错误提示

### 3.4 设置文件权限

```bash
chmod 600 .env.production  # 只有所有者可读写
```

---

## 🔨 第 4 步: 安装后端依赖

### 4.1 进入后端目录并安装依赖

```bash
cd /var/www/shredder-blade/backend

# 检查 node_modules 是否存在
ls -la | grep node_modules

# 如果存在，删除重新安装
rm -rf node_modules package-lock.json

# 安装生产依赖（注意不包括 devDependencies）
npm install --production
```

### 4.2 验证关键依赖

```bash
# 检查 sqlite3 是否安装
npm list sqlite3

# 检查其他关键依赖
npm list express cors body-parser nodemailer dotenv
```

**预期响应**:
```
├── sqlite3@5.1.7
├── express@4.18.x
├── cors@2.8.x
├── body-parser@1.20.x
├── nodemailer@6.9.x
└── dotenv@16.x.x
```

### 4.3 验证安装完成

```bash
# 检查 node_modules 大小
du -sh node_modules

# 应该在 150-200 MB 之间
```

**预期响应**: `160M    node_modules`

---

## 🌐 第 5 步: 配置 Nginx 反向代理

### 5.1 创建 Nginx 配置文件

```bash
# 编辑 Nginx 配置
sudo nano /etc/nginx/conf.d/shredder-blade.conf
```

### 5.2 输入以下 Nginx 配置

```nginx
# 后端 API 服务器
upstream backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

# HTTP 重定向到 HTTPS（可选，需要 SSL 证书）
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;
    
    # 可选: 重定向到 HTTPS
    # return 301 https://$server_name$request_uri;
    
    # 或直接在 HTTP 提供服务（开发/内部使用）
    
    # 根路径 - 提供前端静态文件
    location / {
        root /var/www/shredder-blade/frontend;
        try_files $uri $uri/ /index.html;
        
        # 缓存设置
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }
    
    # API 接口 - 反向代理到后端
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        
        # 代理头设置
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 连接保活
        proxy_set_header Connection "";
        
        # 超时设置
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # 管理面板
    location /admin.html {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # 健康检查端点
    location /health {
        proxy_pass http://backend;
        access_log off;
    }
    
    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot)$ {
        root /var/www/shredder-blade/frontend;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # 日志配置
    access_log /var/log/nginx/shredder-blade-access.log;
    error_log /var/log/nginx/shredder-blade-error.log;
}
```

### 5.3 验证 Nginx 配置

```bash
# 测试配置文件语法
sudo nginx -t

# 预期输出: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
```

### 5.4 启动/重启 Nginx

```bash
# 启动 Nginx
sudo systemctl start nginx

# 启用开机自启
sudo systemctl enable nginx

# 检查运行状态
sudo systemctl status nginx

# 查看 Nginx 进程
ps aux | grep nginx
```

**预期响应**:
```
nginx process is running
● nginx.service - The nginx HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)
   Active: active (running)
```

---

## 🚀 第 6 步: 启动后端服务

### 6.1 手动测试启动

```bash
# 进入后端目录
cd /var/www/shredder-blade/backend

# 使用 node 直接启动（测试）
node server.js
```

**预期响应**:
```
✅ Database initialized successfully
🚀 Server running on http://localhost:3001
📊 Database: /var/www/shredder-blade/data/inquiries.db
✅ Email service ready: [enabled/disabled]
[DEBUG] Server listening successfully
```

### 6.2 测试 API 端点

**在另一个终端窗口执行**:

```bash
# 测试健康检查
curl http://localhost:3001/health

# 预期响应: {"status":"ok","timestamp":"2026-01-20T..."} 

# 测试 API 端点
curl http://localhost:3001/api/inquiries

# 预期响应: {"success":true,"data":[],"pagination":{...}}

# 测试管理面板
curl -s http://localhost:3001/admin.html | head -20
```

### 6.3 停止手动启动的服务

```bash
# 在启动 server.js 的终端按 Ctrl+C
# 或在另一个终端执行
pkill -f "node server.js"
```

---

## 🔄 第 7 步: 使用 PM2 进程管理启动

### 7.1 准备 PM2 配置文件

```bash
# 后端目录应该已经有 ecosystem.config.js
cd /var/www/shredder-blade/backend

# 查看文件内容（应该是这样）
cat ecosystem.config.js
```

**预期内容**:
```javascript
module.exports = {
  apps: [{
    name: 'backend',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/backend-error.log',
    out_file: '/var/log/pm2/backend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
```

### 7.2 创建日志目录

```bash
# 创建 PM2 日志目录
mkdir -p ~/.pm2/logs
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2
```

### 7.3 使用 PM2 启动应用

```bash
# 进入后端目录
cd /var/www/shredder-blade/backend

# 启动应用（使用 ecosystem.config.js）
pm2 start ecosystem.config.js

# 预期输出应该类似:
# [PM2] Spawning 4 instances of app name
# ┌─────┬────────────┬─────────┬──────┬───────┬──────────┐
# │ id  │ name       │ version │ mode │ pid   │ status   │
# ├─────┼────────────┼─────────┼──────┼───────┼──────────┤
# │ 0   │ backend    │ N/A     │ fork │ 12345 │ online   │
# └─────┴────────────┴─────────┴──────┴───────┴──────────┘
```

### 7.4 配置 PM2 开机自启

```bash
# 生成启动脚本
pm2 startup

# 复制并执行输出的命令（通常是这样）
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u your_username --hp /home/your_username

# 保存当前 PM2 配置
pm2 save

# 验证开机自启已配置
pm2 show backend
```

### 7.5 监控 PM2 进程

```bash
# 查看所有 PM2 进程
pm2 list

# 实时监控进程
pm2 monit

# 查看进程详情
pm2 show backend

# 查看实时日志
pm2 logs backend

# 查看历史日志
pm2 logs backend --lines 100
```

---

## ✅ 第 8 步: 验证部署完成

### 8.1 检查后端服务

```bash
# 检查进程是否运行
pm2 list | grep backend

# 预期: online 状态

# 测试 API 端点
curl http://your_server_ip/api/inquiries

# 预期响应:
# {"success":true,"data":[],"pagination":{"page":1,"pageSize":10,"total":0,"totalPages":0}}
```

### 8.2 检查前端访问

```bash
# 测试前端是否可访问
curl -I http://your_server_ip/

# 预期响应:
# HTTP/1.1 200 OK
# Server: nginx
# Content-Type: text/html

# 在浏览器中访问
# http://your_server_ip/
# http://your_domain.com/
```

### 8.3 检查管理面板

```bash
# 访问管理面板
curl http://your_server_ip/admin.html | grep -o "<title>.*</title>"

# 在浏览器中访问
# http://your_server_ip/admin.html
```

### 8.4 检查 Nginx 日志

```bash
# 查看 Nginx 访问日志
sudo tail -f /var/log/nginx/shredder-blade-access.log

# 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/shredder-blade-error.log
```

### 8.5 检查数据库

```bash
# 验证数据库文件存在
ls -lh /var/www/shredder-blade/data/inquiries.db

# 预期: 文件存在且大小 > 0
```

---

## 🔐 第 9 步: SSL/TLS 配置（可选但推荐）

### 9.1 安装 Certbot

```bash
# 安装 Let's Encrypt Certbot
sudo yum install -y certbot python-certbot-nginx

# 或者对于 CentOS 8+
sudo dnf install -y certbot python3-certbot-nginx
```

### 9.2 获取 SSL 证书

```bash
# 自动配置 Nginx 和申请证书
sudo certbot --nginx -d your_domain.com -d www.your_domain.com

# 或只申请证书
sudo certbot certonly --nginx -d your_domain.com

# 输入邮箱和同意服务条款
```

### 9.3 配置证书自动续期

```bash
# 检查续期定时任务
sudo systemctl status certbot.timer

# 如果没有，创建续期任务
sudo systemctl enable certbot.timer

# 测试续期
sudo certbot renew --dry-run
```

### 9.4 更新 Nginx 配置（HTTPS）

```bash
# 编辑 Nginx 配置
sudo nano /etc/nginx/conf.d/shredder-blade.conf

# Certbot 应该已自动添加：
# listen 443 ssl http2;
# ssl_certificate ...
# ssl_certificate_key ...
```

---

## 📊 第 10 步: 监控和维护

### 10.1 定期检查服务状态

```bash
# 检查 PM2 进程
pm2 status

# 检查磁盘使用
df -h /var/www/shredder-blade

# 检查内存使用
pm2 show backend | grep memory

# 检查进程日志
pm2 logs backend --lines 50
```

### 10.2 备份数据库

```bash
# 手动备份数据库
cp /var/www/shredder-blade/data/inquiries.db /var/www/shredder-blade/data/inquiries.db.backup.$(date +%Y%m%d)

# 创建定期备份（cron）
# 编辑 crontab
crontab -e

# 添加每天凌晨 2 点备份
0 2 * * * cp /var/www/shredder-blade/data/inquiries.db /var/www/shredder-blade/data/backups/inquiries.db.$(date +\%Y\%m\%d)
```

### 10.3 查看应用日志

```bash
# 查看最近 100 行日志
pm2 logs backend --lines 100

# 持续查看日志（类似 tail -f）
pm2 logs backend

# 查看错误日志
pm2 logs backend --err
```

### 10.4 重启服务

```bash
# 重启后端服务
pm2 restart backend

# 重启所有服务
pm2 restart all

# 重启 Nginx
sudo systemctl restart nginx
```

---

## 🚨 故障排查

### 问题 1: 端口 3001 被占用

```bash
# 查看占用端口 3001 的进程
lsof -i :3001
# 或
netstat -tlnp | grep 3001

# 杀死进程（如果是旧的 Node 进程）
kill -9 <PID>

# 或使用 PM2 停止再启动
pm2 restart backend
```

### 问题 2: 数据库连接错误

```bash
# 检查数据库文件权限
ls -l /var/www/shredder-blade/data/inquiries.db

# 确保目录可写
chmod 755 /var/www/shredder-blade/data

# 检查数据库是否损坏
file /var/www/shredblad/data/inquiries.db
```

### 问题 3: Nginx 返回 502 错误

```bash
# 检查后端是否运行
pm2 status

# 检查后端日志
pm2 logs backend

# 验证后端端口监听
netstat -tlnp | grep 3001

# 重启 Nginx
sudo systemctl restart nginx
```

### 问题 4: 权限拒绝错误

```bash
# 检查目录权限
ls -la /var/www/shredder-blade/

# 修复权限
sudo chown -R $USER:$USER /var/www/shredder-blade
chmod -R 755 /var/www/shredder-blade
chmod 600 /var/www/shredder-blade/backend/.env*
```

### 问题 5: 内存占用过高

```bash
# 查看 PM2 内存使用
pm2 show backend | grep memory

# 设置内存限制（在 ecosystem.config.js 中）
# max_memory_restart: '500M'

# 重启应用
pm2 restart backend
```

---

## 📝 常用命令速查表

```bash
# ===== PM2 命令 =====
pm2 start ecosystem.config.js      # 启动应用
pm2 list                           # 列出所有进程
pm2 show backend                   # 显示进程详情
pm2 logs backend                   # 查看日志
pm2 restart backend                # 重启进程
pm2 stop backend                   # 停止进程
pm2 delete backend                 # 删除进程
pm2 monit                          # 实时监控

# ===== Nginx 命令 =====
sudo systemctl start nginx         # 启动 Nginx
sudo systemctl stop nginx          # 停止 Nginx
sudo systemctl restart nginx       # 重启 Nginx
sudo systemctl status nginx        # 检查状态
sudo nginx -t                      # 测试配置
sudo tail -f /var/log/nginx/shredder-blade-access.log

# ===== 测试命令 =====
curl http://localhost:3001/health          # 测试后端
curl http://localhost/                     # 测试前端
curl http://localhost/api/inquiries        # 测试 API

# ===== 文件管理 =====
cd /var/www/shredder-blade               # 进入应用目录
ls -la                                   # 列出文件
tail -f /var/log/pm2/backend-out.log     # 查看输出日志
```

---

## ✨ 部署完成清单

- [ ] 系统依赖安装完成（Node.js、npm、Nginx、PM2）
- [ ] 部署文件上传到服务器
- [ ] 环境变量配置完毕
- [ ] 后端依赖安装完成
- [ ] Nginx 配置完成并验证
- [ ] 后端服务通过 PM2 启动
- [ ] PM2 开机自启配置完成
- [ ] API 端点可正常访问
- [ ] 前端页面可正常显示
- [ ] 管理面板可访问
- [ ] 数据库正常创建
- [ ] SSL 证书已安装（可选）
- [ ] 日志监控已配置
- [ ] 备份策略已制定

---

## 🎉 部署完成

所有步骤完成后，应用应该在以下地址可以访问：

- **前端首页**: `http://your_domain.com/` 或 `http://your_server_ip/`
- **管理面板**: `http://your_domain.com/admin.html`
- **API 端点**: `http://your_domain.com/api/inquiries`
- **健康检查**: `http://your_domain.com/health`

如有问题，查看故障排查章节或检查日志文件。

**部署指南完成时间**: 2026-01-20  
**指南版本**: 1.0
