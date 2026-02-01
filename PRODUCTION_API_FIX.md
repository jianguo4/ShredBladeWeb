# 生产环境 API 错误修复

## 问题描述

生产环境 Contact Us 表单提交时出现错误：
```
Network error. Make sure the backend server is reachable at https://www.shredderbladesdirect.com
```

## 根本原因

前端代码中的 API 地址配置不正确：

**原代码**（ContactUs.tsx）：
```tsx
const apiBase = import.meta.env.VITE_API_BASE || window.location.origin;
```

在生产环境：
- `import.meta.env.VITE_API_BASE` 未定义
- `window.location.origin` = `https://www.shredderbladesdirect.com`
- 后端 API 实际地址 = `https://api.shredderbladesdirect.com`

结果：前端尝试访问 `https://www.shredderbladesdirect.com/api/inquiries`（不存在），而不是正确的 `https://api.shredderbladesdirect.com/api/inquiries`

## 解决方案

### 修改 ContactUs.tsx

```tsx
const apiBase = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : 'https://api.shredderbladesdirect.com');
```

**逻辑**：
- ✅ 开发环境（localhost）→ `http://localhost:3001`
- ✅ 生产环境（任何其他域名）→ `https://api.shredderbladesdirect.com`
- ✅ 可选：通过环境变量 `VITE_API_BASE` 覆盖

### 重新构建和部署

```bash
# 1. 构建前端
cd app/frontend
npm run build

# 2. 同步到部署目录
cd ../..
robocopy app\frontend\dist deploy\frontend /MIR /XF .gitkeep

# 3. 提交并推送
git add .
git commit -m "Fix production API endpoint to use api.shredderbladesdirect.com"
git push origin main
```

## 验证步骤

### 在 Coolify 部署后

1. **访问生产网站**：https://www.shredderbladesdirect.com
2. **打开 Contact Us 页面**
3. **填写并提交表单**
4. **检查浏览器控制台**：
   - Network 标签应该显示请求到 `https://api.shredderbladesdirect.com/api/inquiries`
   - 状态码应该是 200（成功）或 401/403（需要认证配置）

### 检查后端是否正常运行

```bash
# 测试后端 API 是否可访问
curl https://api.shredderbladesdirect.com/api/inquiries -v

# 应该返回：
# - 200 OK（成功）
# - 或 401/403（需要 API 认证）
# - 不应该是 404 或连接超时
```

## 相关配置

### Coolify 域名配置

根据 `COOLIFY_DEPLOYMENT_TROUBLESHOOTING.md`：

- 前端域名：`www.shredderbladesdirect.com` → 前端服务（端口 3000）
- 后端域名：`api.shredderbladesdirect.com` → 后端服务（端口 3001）

### 后端 CORS 配置

确保后端 `server.js` 允许前端域名：

```javascript
const corsOptions = {
  origin: [
    'https://www.shredderbladesdirect.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

## 可能的后续问题

### 1. CORS 错误

**症状**：
```
Access to fetch at 'https://api.shredderbladesdirect.com/api/inquiries' 
from origin 'https://www.shredderbladesdirect.com' has been blocked by CORS policy
```

**解决**：
在后端 `app/backend/server.js` 中添加前端域名到 CORS whitelist。

### 2. API 认证失败

**症状**：
```
401 Unauthorized
```

**解决**：
检查后端的 API 认证机制，确保 Contact Us 表单提交端点不需要认证，或者前端正确传递认证信息。

### 3. 后端服务未启动

**症状**：
```
ERR_CONNECTION_REFUSED
```

**解决**：
- 在 Coolify 检查后端容器状态
- 查看后端日志：`docker logs <container_id>`
- 确认 `api.shredderbladesdirect.com` DNS 记录正确指向服务器

## 文件修改清单

- ✅ `app/frontend/src/pages/ContactUs.tsx` - 修改 API 地址逻辑
- ✅ `app/frontend/dist/*` - 重新构建
- ✅ `deploy/frontend/*` - 同步构建产物
- ✅ 推送到 GitHub

## 部署后检查

1. Coolify 应该自动检测到 GitHub 推送并触发重新部署
2. 如果未自动触发，在 Coolify 控制台手动点击 "Redeploy"
3. 等待部署完成（通常 2-5 分钟）
4. 访问 https://www.shredderbladesdirect.com/contact-us 测试表单提交

---

**修复时间**: 2026年2月1日  
**提交哈希**: 2bd83f9  
**状态**: ✅ 已推送到 GitHub，等待 Coolify 部署
