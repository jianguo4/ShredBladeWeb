# Coolify 部署配置指南 - API 安全认证

## 问题说明

部署后发现两个问题：
1. ❌ 没有账密登录保护
2. ❌ Failed to load inquiries

## 原因分析

Coolify 部署的是 `deploy/` 目录下的代码，该目录中的文件是旧版本，没有包含认证功能。

## 解决方案

### 步骤 1: 同步最新代码到 deploy 目录

**已完成** ✅ 文件已从 `app/backend/` 同步到 `deploy/backend/`

更新的文件：
- `server.js` - 包含认证中间件
- `admin.html` - 支持认证凭据的前端

### 步骤 2: 在 Coolify 中配置环境变量

登录 Coolify 控制面板，进入您的应用配置，添加以下环境变量：

```env
# 管理员认证（必须）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N

# IP 白名单（可选，留空表示不限制）
ALLOWED_IPS=

# 邮件配置（如果需要）
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL=admin@example.com
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_FROM_NAME=ShredBlade Direct

# 服务器配置
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
```

### 步骤 3: 提交并推送代码

```bash
# 查看更改
git status

# 添加更改的文件
git add deploy/backend/server.js
git add deploy/backend/admin.html
git add sync-to-deploy.bat
git add COOLIFY_DEPLOYMENT_FIX.md

# 提交
git commit -m "fix: sync authentication code to deploy directory for Coolify"

# 推送到远程
git push origin main
```

### 步骤 4: 在 Coolify 中重新部署

1. 登录 Coolify 控制面板
2. 找到您的应用
3. 点击 "Redeploy" 或 "Deploy" 按钮
4. 等待部署完成

### 步骤 5: 验证部署

#### 测试 1: 访问 API
```bash
# 应该返回 401 Unauthorized
curl -I https://api.shredderbladesdirect.com/api/inquiries

# 应该返回 200 OK
curl -u admin:72@DcCOe5QbxzM-N \
  https://api.shredderbladesdirect.com/api/inquiries
```

#### 测试 2: 浏览器访问
1. 打开 `https://api.shredderbladesdirect.com/`
2. 应该弹出认证对话框
3. 输入：
   - 用户名: `admin`
   - 密码: `72@DcCOe5QbxzM-N`
4. 登录后应该能看到询价列表

## Coolify 环境变量配置截图指南

### 方式 1: 通过 Coolify UI

1. **进入应用设置**
   - Dashboard → Your Application → Environment

2. **添加环境变量**
   ```
   Key: ADMIN_USERNAME
   Value: admin
   
   Key: ADMIN_PASSWORD
   Value: 72@DcCOe5QbxzM-N
   
   Key: ALLOWED_IPS
   Value: (留空)
   ```

3. **保存并重新部署**

### 方式 2: 通过 .env 文件（如果 Coolify 支持）

创建 `deploy/backend/.env` 文件：
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N
ALLOWED_IPS=
```

然后提交到 Git。

## Dockerfile 检查

确保 Dockerfile 正确复制了文件：

```dockerfile
# 检查 Dockerfile 是否包含正确的路径
FROM node:22-alpine
WORKDIR /app/backend

# 应该复制 deploy/backend 目录
COPY deploy/backend/package*.json ./
RUN npm install --production
COPY deploy/backend/ .

EXPOSE 3001
CMD ["node", "server.js"]
```

## 常见问题

### Q1: 部署后还是没有认证？
**A**: 检查：
1. 环境变量是否正确设置
2. Coolify 是否重新部署了应用
3. 使用 `docker logs <container>` 查看日志，应该看到：
   ```
   🔒 IP Whitelist enabled: ... (如果配置了 IP)
   🚀 Server running on http://0.0.0.0:3001
   ```

### Q2: 登录后还是 "Failed to load inquiries"？
**A**: 检查：
1. 确认 `admin.html` 已更新（包含 `getFetchOptions()` 函数）
2. 清除浏览器缓存
3. 在浏览器开发者工具中查看网络请求，确认请求包含认证头

### Q3: 如何查看 Coolify 容器日志？
**A**: 
```bash
# 在 Coolify 服务器上
docker ps | grep shredblade
docker logs <container_id>
```

或者在 Coolify UI 中查看实时日志。

### Q4: 忘记密码怎么办？
**A**:
1. 在 Coolify 中更新 `ADMIN_PASSWORD` 环境变量
2. 重新部署应用
3. 使用新密码登录

## 文件对比

### 关键变化点

#### server.js
```javascript
// 旧版本（deploy/backend/server.js - 部署前）
app.use(cors());
app.use(bodyParser.json());

// 新版本（app/backend/server.js）
// Authentication Configuration
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

function basicAuth(req, res, next) {
  // ... 认证逻辑
}

app.use('/', ipWhitelist, basicAuth);
```

#### admin.html
```javascript
// 旧版本
const response = await fetch(url);

// 新版本
function getFetchOptions(options = {}) {
  return {
    ...options,
    credentials: 'include',
    headers: { ...options.headers }
  };
}
const response = await fetch(url, getFetchOptions());
```

## 部署清单

- [x] 同步 server.js 到 deploy 目录
- [x] 同步 admin.html 到 deploy 目录
- [ ] 在 Coolify 中配置环境变量
- [ ] 提交并推送代码到 Git
- [ ] 在 Coolify 中触发重新部署
- [ ] 验证认证功能
- [ ] 验证管理面板加载

## 安全提醒

⚠️ **重要**: 生产环境密码

当前密码 `72@DcCOe5QbxzM-N` 已在文档中公开，建议部署后立即更改：

1. 生成新的强密码
2. 在 Coolify 中更新 `ADMIN_PASSWORD`
3. 重新部署
4. 不要在 Git 中提交真实密码

## 联系支持

如果问题仍然存在，请提供：
1. Coolify 容器日志
2. 浏览器开发者工具的网络请求截图
3. 环境变量配置截图

---

**更新时间**: 2026年1月29日  
**状态**: 等待部署验证
