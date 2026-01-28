# 🚀 Coolify 部署完整指南

**项目**: ShredBlade Web 应用  
**域名**: shredbladesdirect.com  
**服务器 IP**: 76.13.31.137  
**部署平台**: Coolify 4.0  
**预计时间**: 30-45 分钟

---

## 📋 前置条件检查清单

- ✅ Coolify 已安装并运行在 `http://76.13.31.137:8000`
- ✅ 服务器已通过 SSH 密钥验证连接成功
- ✅ Docker 容器正常运行
- ✅ 防火墙已开放 80、443、8000 端口
- ✅ 代码已修改：后端监听 `0.0.0.0`，前端使用 `VITE_API_BASE` 环境变量
- ⬜ DNS 记录已配置（下一步）
- ⬜ Git 仓库可访问（GitHub/GitLab/Gitee）

---

## 第一步：配置 DNS 记录

在你的域名注册商（阿里云/腾讯云/GoDaddy 等）添加以下 A 记录：

| 类型 | 主机记录 | 记录值 | TTL |
|------|---------|--------|-----|
| A | @ | 76.13.31.137 | 600 |
| A | www | 76.13.31.137 | 600 |
| A | api | 76.13.31.137 | 600 |
| A | coolify | 76.13.31.137 | 600 |

**DNS 生效说明**：
- `shredbladesdirect.com` → 前端网站
- `www.shredbladesdirect.com` → 前端网站（主域名）
- `api.shredbladesdirect.com` → 后端 API
- `coolify.shredbladesdirect.com` → Coolify 管理面板（可选）

**验证 DNS 生效**：
```bash
# 在本地或服务器执行
nslookup www.shredbladesdirect.com
nslookup api.shredbladesdirect.com

# 或使用在线工具
# https://www.whatsmydns.net/
```

DNS 通常 5-10 分钟生效，国内可能需要 1-2 小时。

---

## 第二步：在 Coolify 配置 Coolify 面板域名（可选）

访问 `http://76.13.31.137:8000`：

1. 进入 **Settings** → **Instance Settings**
2. **Instance Domain**: 填入 `coolify.shredbladesdirect.com`
3. 点击 **Save**
4. Coolify 会自动配置 Traefik 并申请 Let's Encrypt 证书
5. 等待 1-2 分钟后，访问 `https://coolify.shredbladesdirect.com`

---

## 第三步：部署后端应用（Backend API）

### 3.1 创建新项目（如果还没有）

1. 登录 Coolify：`http://76.13.31.137:8000`（或 `https://coolify.shredbladesdirect.com`）
2. 左侧菜单 → **Projects** → **+ New**
3. 输入项目名称：`ShredBlade Production`
4. 点击 **Continue**

### 3.2 创建后端应用

1. 进入刚创建的项目 → **+ New Resource** → **Application**
2. 选择 Git 源：
   - **Public Repository**: 填入你的 Git 仓库 URL
   - 或 **GitHub/GitLab**: 授权并选择仓库
3. **Branch**: `main` 或你的生产分支
4. 点击 **Continue**

### 3.3 后端应用配置

**基础配置**：
- **Name**: `shredblade-backend`
- **Build Pack**: 选择 **NodeJS**
- **Base Directory**: `app/backend`
- **Publish Directory**: 留空（NodeJS 不需要）

**构建与启动命令**：
- **Install Command**: 
  ```bash
  npm install --production
  ```
- **Build Command**: 留空
- **Start Command**:
  ```bash
  node server.js
  ```

**端口配置**：
- **Port**: `3001`（自动检测，确认正确）

**环境变量**（点击 **Environment Variables** → **+ Add**）：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `PORT` | `3001` | 后端监听端口 |
| `HOST` | `0.0.0.0` | 监听所有网络接口 |
| `NODE_ENV` | `production` | 生产环境 |
| `EMAIL_ENABLED` | `true` | 启用邮件通知 |
| `EMAIL_SERVICE` | `gmail` | 邮件服务（或 `QQ`/`163` 等） |
| `EMAIL_USER` | `your-email@gmail.com` | 发件邮箱 |
| `EMAIL_PASSWORD` | `your-app-password` | 邮箱授权码（非登录密码） |
| `NOTIFICATION_EMAIL` | `admin@shredbladesdirect.com` | 接收询盘通知的邮箱 |
| `EMAIL_FROM_NAME` | `ShredBlade Direct` | 发件人显示名称 |

**持久化存储**（点击 **Storages** → **+ Add**）：
- **Name**: `backend-database`
- **Source**: 新建卷（Coolify 自动创建）
- **Destination**: `/app/backend`
- **说明**: 保存 `inquiries.db` 数据库文件，防止容器重启丢失数据

**健康检查**（点击 **Health Check**）：
- **Enabled**: 打开
- **Path**: `/health`
- **Port**: `3001`
- **Interval**: `30s`
- **Timeout**: `10s`
- **Retries**: `3`

**域名配置**（点击 **Domains** → **+ Add**）：
- **Domain**: `api.shredbladesdirect.com`
- **HTTPS**: 打开（自动申请 Let's Encrypt 证书）
- **WWW Redirect**: 关闭
- 点击 **Save**

### 3.4 部署后端

1. 检查所有配置无误
2. 点击右上角 **Deploy** 按钮
3. 观察部署日志：
   - 拉取 Git 仓库
   - 安装 npm 依赖
   - 启动 Node.js 服务器
   - 等待健康检查通过（绿色 ✓）

**预期日志输出**：
```
✅ Database initialized successfully
✅ Email service ready: your-email@gmail.com
🚀 Server running on http://0.0.0.0:3001
[DEBUG] Server listening successfully
```

### 3.5 验证后端部署

```bash
# 健康检查
curl https://api.shredbladesdirect.com/health

# 预期响应
{"status":"ok","message":"Server is running"}
```

---

## 第四步：部署前端应用（Frontend Website）

### 4.1 创建前端应用

1. 返回项目 `ShredBlade Production`
2. **+ New Resource** → **Application**
3. 选择同一个 Git 仓库
4. **Branch**: `main`
5. 点击 **Continue**

### 4.2 前端应用配置

**基础配置**：
- **Name**: `shredblade-frontend`
- **Build Pack**: 选择 **Nixpacks**（自动检测）或 **Static**
- **Base Directory**: `app/frontend`
- **Publish Directory**: `app/frontend/dist`

**构建命令**（如果 Nixpacks 未自动检测，手动设置）：
- **Install Command**:
  ```bash
  corepack enable && pnpm install --frozen-lockfile
  ```
  或使用 npm：
  ```bash
  npm install
  ```
- **Build Command**:
  ```bash
  pnpm build
  ```
  或使用 npm：
  ```bash
  npm run build
  ```
- **Start Command**: 留空（静态网站不需要）

**端口配置**：
- 如果选择 **Static**，Coolify 会自动用 Nginx 提供服务，默认 80/443

**环境变量**（点击 **Environment Variables** → **+ Add**）：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `VITE_API_BASE` | `https://api.shredbladesdirect.com` | 后端 API 地址 |
| `NODE_ENV` | `production` | 生产环境 |

**域名配置**（点击 **Domains** → **+ Add**）：
- **Domain**: `www.shredbladesdirect.com`
- **HTTPS**: 打开
- **WWW Redirect**: 打开（将 `shredbladesdirect.com` 重定向到 `www`）
- 点击 **Save**

可选：添加第二个域名（裸域）：
- **Domain**: `shredbladesdirect.com`
- **HTTPS**: 打开
- **Redirect to**: `https://www.shredbladesdirect.com`

### 4.3 部署前端

1. 检查所有配置无误
2. 点击右上角 **Deploy** 按钮
3. 观察部署日志：
   - 拉取 Git 仓库
   - 安装依赖（pnpm/npm）
   - 执行 Vite 构建
   - 复制 `dist` 目录到 Nginx
   - 申请 SSL 证书

**预期日志输出**：
```
✓ built in 45s
✓ Copying files to /app/frontend/dist
✓ SSL certificate obtained for www.shredbladesdirect.com
✓ Application deployed successfully
```

### 4.4 验证前端部署

浏览器访问：
- `https://www.shredbladesdirect.com`
- 应该看到完整的 ShredBlade 网站
- 检查浏览器控制台无错误
- 测试页面跳转和图片加载

---

## 第五步：端到端测试

### 5.1 测试联系表单

1. 访问 `https://www.shredbladesdirect.com/contact`
2. 填写联系表单：
   - Name: `Test User`
   - Phone: `+86 138 0000 0000`
   - Email: `test@example.com`
   - Message: `This is a test inquiry from production.`
3. 点击提交
4. 应该看到成功提示（3 秒后消失）

### 5.2 验证后端收到请求

```bash
# 查看后端容器日志（在 Coolify 或服务器上）
docker logs shredblade-backend -n 50

# 或在 Coolify 面板查看日志
# 进入 shredblade-backend 应用 → Logs
```

**预期日志**：
```
POST /api/inquiries
✓ Inquiry submitted successfully
✓ Email sent to admin@shredbladesdirect.com
```

### 5.3 验证邮件通知

检查 `NOTIFICATION_EMAIL` 邮箱（`admin@shredbladesdirect.com`）：
- 应收到包含询盘详情的邮件
- 如未收到，检查垃圾箱
- 如仍未收到，参考下面的故障排查

### 5.4 验证数据库持久化

```bash
# 在服务器上查看数据库文件
docker exec shredblade-backend ls -la /app/backend/inquiries.db

# 查看数据库内容
docker exec shredblade-backend sqlite3 /app/backend/inquiries.db "SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5;"
```

应该看到刚刚提交的测试数据。

---

## 第六步：配置自动部署（可选）

### 6.1 启用 Webhook 自动部署

1. 进入应用 → **Deployments** → **Webhooks**
2. 点击 **Enable Webhooks**
3. 复制 Webhook URL（例如 `https://coolify.shredbladesdirect.com/api/v1/deploy/xxx`）

### 6.2 在 Git 仓库配置 Webhook

**GitHub**：
1. 进入仓库 → **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL**: 粘贴 Coolify Webhook URL
3. **Content type**: `application/json`
4. **Which events**: `Just the push event`
5. 点击 **Add webhook**

**GitLab**：
1. 进入仓库 → **Settings** → **Webhooks** → **Add new webhook**
2. **URL**: 粘贴 Coolify Webhook URL
3. **Trigger**: 勾选 `Push events`
4. 点击 **Add webhook**

**测试自动部署**：
```bash
# 本地提交并推送代码
git add .
git commit -m "test: trigger auto deployment"
git push origin main
```

Coolify 应自动触发部署，在面板查看实时日志。

---

## 性能优化建议

### 1. 启用 Gzip 压缩（Coolify 默认已启用）

前端静态文件自动 Gzip 压缩。

### 2. 配置 CDN（可选）

如需加速国内访问，可配置：
- 阿里云 CDN
- 腾讯云 CDN
- Cloudflare（海外用户）

### 3. 数据库备份

```bash
# 定期备份 SQLite 数据库（在服务器上设置 cron）
# 添加到 /etc/crontab
0 2 * * * docker exec shredblade-backend sqlite3 /app/backend/inquiries.db ".backup /app/backend/inquiries-$(date +\%Y\%m\%d).db"
```

### 4. 监控与日志

在 Coolify 中：
- **Metrics**: 查看 CPU、内存、网络使用情况
- **Logs**: 实时查看应用日志
- **Alerts**: 配置健康检查失败告警

---

## 故障排查

### 问题 1：前端无法连接后端（CORS 错误）

**症状**：
```
Access to fetch at 'https://api.shredbladesdirect.com/api/inquiries' from origin 'https://www.shredbladesdirect.com' has been blocked by CORS policy
```

**解决方案**：
后端已配置 `cors()`，应该不会出现此问题。如果出现，检查：
1. 后端环境变量 `NODE_ENV=production`
2. 后端 `server.js` 中 `app.use(cors())` 已启用
3. 重启后端应用

### 问题 2：Let's Encrypt 证书申请失败

**症状**：
```
Failed to obtain SSL certificate
```

**解决方案**：
1. 确认 DNS 记录已正确指向 `76.13.31.137`
2. 确认 80/443 端口已开放：
   ```bash
   sudo firewall-cmd --list-ports
   ```
3. 等待 DNS 完全生效后重新部署
4. 查看 Coolify Traefik 日志：
   ```bash
   docker logs coolify-proxy -n 100
   ```

### 问题 3：邮件未发送成功

**症状**：
提交表单成功，但未收到邮件。

**解决方案**：
1. 查看后端日志：
   ```bash
   docker logs shredblade-backend -n 100 | grep -i email
   ```
2. 常见错误：
   - `Invalid login`: 邮箱账号或密码错误
   - `Authentication failed`: 使用邮箱登录密码而非授权码
   - `Connection refused`: SMTP 服务未开启
3. 测试邮件配置：
   ```bash
   docker exec shredblade-backend node -e "
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: { user: 'your-email@gmail.com', pass: 'your-app-password' }
   });
   transporter.verify((err) => {
     if (err) console.error('❌ Error:', err);
     else console.log('✅ SMTP connection OK');
   });
   "
   ```
4. 参考后端 `EMAIL_SETUP.md` 详细故障排查步骤

### 问题 4：前端构建失败（pnpm 未找到）

**症状**：
```
bash: pnpm: command not found
```

**解决方案**：
将安装命令改为：
```bash
corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile
```

或改用 npm：
```bash
npm install
npm run build
```

### 问题 5：数据库文件丢失（容器重启后）

**症状**：
容器重启后，之前的询盘数据消失。

**解决方案**：
1. 确认持久化存储已正确配置（见第三步 3.3）
2. 检查卷挂载：
   ```bash
   docker inspect shredblade-backend | grep -A 10 Mounts
   ```
3. 应该看到类似：
   ```json
   "Mounts": [
     {
       "Type": "volume",
       "Name": "backend-database",
       "Source": "/var/lib/docker/volumes/backend-database/_data",
       "Destination": "/app/backend"
     }
   ]
   ```

---

## 环境变量参考表

### 后端环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `PORT` | 否 | `3001` | 后端监听端口 |
| `HOST` | 否 | `0.0.0.0` | 监听地址 |
| `NODE_ENV` | 否 | `development` | 运行环境 |
| `EMAIL_ENABLED` | 是 | `false` | 启用邮件通知 |
| `EMAIL_SERVICE` | 二选一* | - | 预定义服务（gmail/QQ/163） |
| `EMAIL_HOST` | 二选一* | - | SMTP 服务器地址 |
| `EMAIL_PORT` | 否 | `587` | SMTP 端口 |
| `EMAIL_SECURE` | 否 | `false` | 使用 SSL/TLS |
| `EMAIL_USER` | 是 | - | 发件邮箱 |
| `EMAIL_PASSWORD` | 是 | - | 邮箱授权码 |
| `NOTIFICATION_EMAIL` | 否 | `EMAIL_USER` | 接收通知的邮箱 |
| `EMAIL_FROM_NAME` | 否 | `ShredderBlades` | 发件人名称 |

*注：`EMAIL_SERVICE` 和 `EMAIL_HOST` 二选一配置

### 前端环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `VITE_API_BASE` | 是 | `http://localhost:3001` | 后端 API 地址 |
| `NODE_ENV` | 否 | `production` | 构建环境 |

---

## 快速命令参考

### 服务器管理

```bash
# 查看所有容器
docker ps -a

# 查看 Coolify 容器
docker ps | grep coolify

# 重启 Coolify
cd ~/coolify && docker compose restart

# 查看 Coolify 日志
docker logs coolify -f

# 查看代理日志
docker logs coolify-proxy -f
```

### 应用管理

```bash
# 查看应用日志
docker logs shredblade-backend -f
docker logs shredblade-frontend -f

# 进入应用容器
docker exec -it shredblade-backend sh

# 重启应用（在 Coolify 面板或命令行）
docker restart shredblade-backend
docker restart shredblade-frontend

# 查看数据库
docker exec shredblade-backend sqlite3 /app/backend/inquiries.db "SELECT COUNT(*) FROM inquiries;"
```

### 测试 API

```bash
# 健康检查
curl https://api.shredbladesdirect.com/health

# 提交测试询盘
curl -X POST https://api.shredbladesdirect.com/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+86 138 0000 0000",
    "email": "test@example.com",
    "message": "Test message from curl"
  }'
```

---

## 部署清单总结

- ✅ DNS 记录已配置并生效
- ✅ Coolify 面板可访问（可选域名）
- ✅ 后端应用已部署（`api.shredbladesdirect.com`）
- ✅ 后端健康检查通过
- ✅ 后端 SSL 证书已申请
- ✅ 后端邮件通知正常工作
- ✅ 后端数据库持久化存储已配置
- ✅ 前端应用已部署（`www.shredbladesdirect.com`）
- ✅ 前端 SSL 证书已申请
- ✅ 前端可正常访问和导航
- ✅ 前后端联调测试通过
- ✅ 联系表单提交成功
- ✅ 邮件通知收到
- ✅ 数据库正确存储数据
- ✅ 自动部署 Webhook 已配置（可选）

---

## 下一步

### 生产环境优化

1. **监控告警**：
   - 配置 Uptime Robot 或类似服务监控网站可用性
   - 设置邮件/短信告警

2. **定期备份**：
   - 数据库每日自动备份
   - 将备份上传到云存储（阿里云 OSS/腾讯云 COS）

3. **性能监控**：
   - 集成 Google Analytics
   - 使用 Sentry.io 监控前端错误

4. **安全加固**：
   - 启用 Cloudflare 防护（可选）
   - 配置 Rate Limiting 防止 API 滥用
   - 定期更新依赖包

5. **SEO 优化**：
   - 提交网站地图到 Google Search Console
   - 配置 robots.txt
   - 优化页面元标签

---

## 支持资源

- **Coolify 官方文档**: https://coolify.io/docs
- **后端邮件配置**: 参考 `app/backend/EMAIL_SETUP.md`
- **原 CentOS 手动部署文档**: `CENTOS_DEPLOYMENT_GUIDE.md`
- **项目结构说明**: `PROJECT_STRUCTURE.md`

---

**部署完成时间**: 2026年1月28日  
**部署者**: GitHub Copilot  
**版本**: 1.0.0  

祝部署成功！🎉
