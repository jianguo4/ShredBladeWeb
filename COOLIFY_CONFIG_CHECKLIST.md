# Coolify 部署配置清单

## 后端应用配置 (api.shredderbladesdirect.com)

### 基本设置
- **Build Pack**: Docker Compose
- **Docker Compose Location**: `/docker-compose.yml`（仅后端服务）
- **Port (Exposes)**: `3001` ⚠️ **必须设置**
- **Domain**: `https://api.shredderbladesdirect.com`

### 环境变量 (必须设置)
```env
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# 邮件配置
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=你的Gmail地址
EMAIL_PASSWORD=你的Gmail应用专用密码
NOTIFICATION_EMAIL=接收通知的邮箱
EMAIL_FROM_NAME=ShredBlade Direct

# 管理员认证 ⚠️ 必须设置
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N

# IP 白名单（可选，逗号分隔）
ALLOWED_IPS=
```

### Health Check
- **Path**: `/health`
- **Port**: `3001`
- **Enabled**: ✅

---

## 前端应用配置 (www.shredderbladesdirect.com)

### 基本设置
- **Build Pack**: Dockerfile
- **Dockerfile Location**: `/Dockerfile.frontend`
- **Port (Exposes)**: `80` ⚠️ **必须设置**
- **Domain**: `https://www.shredderbladesdirect.com`

### 环境变量
```env
# 后端 API 地址 - 使用后端服务的完整 URL
BACKEND_URL=https://api.shredderbladesdirect.com

# 构建时 API 基础地址（可选）
VITE_API_BASE=https://api.shredderbladesdirect.com
```

### 注意事项
- 前端使用 `entrypoint.sh` 启动脚本
- Nginx 会根据 `BACKEND_URL` 环境变量动态生成配置
- 如果不设置 `BACKEND_URL`，默认使用 `http://backend:3001`（Docker 内部网络）

---

## 部署顺序

1. ✅ **先部署后端**
   - 确保后端成功启动
   - 访问 `https://api.shredderbladesdirect.com/health` 应返回 OK
   - 访问 `https://api.shredderbladesdirect.com/` 应弹出认证框

2. ✅ **再部署前端**
   - 设置 `BACKEND_URL=https://api.shredderbladesdirect.com`
   - 等待构建完成
   - 访问 `https://www.shredderbladesdirect.com` 测试

---

## 故障排查

### 问题: "no available server"
**原因**: Coolify 无法识别容器端口
**解决方案**:
- ✅ 确认 docker-compose.yml 有 `expose: ["3001"]`
- ✅ 在 Coolify UI 设置 "Port (Exposes)" = `3001`
- ✅ 重新部署

### 问题: "Failed to load inquiries"
**原因**: admin.html 中 API_URL 配置错误
**解决方案**:
- ✅ admin.html 已更新为动态检测（相对路径 `/api` 在生产环境）
- ✅ 确保访问 `https://api.shredderbladesdirect.com` （不是 localhost）

### 问题: 前端无法访问后端 API
**原因**: BACKEND_URL 未设置或配置错误
**解决方案**:
- ✅ 在前端应用环境变量设置: `BACKEND_URL=https://api.shredderbladesdirect.com`
- ✅ 重新部署前端

### 问题: 端口绑定冲突
**原因**: docker-compose.yml 使用 `ports` 而不是 `expose`
**解决方案**:
- ✅ 使用 `expose` 而不是 `ports`
- ✅ Coolify 会自动处理端口映射

---

## 验证清单

### 后端验证
- [ ] `https://api.shredderbladesdirect.com/health` 返回 `{"status":"OK"}`
- [ ] `https://api.shredderbladesdirect.com/` 弹出认证框
- [ ] 输入用户名密码后能看到 admin 面板
- [ ] admin 面板能加载 inquiries 数据

### 前端验证
- [ ] `https://www.shredderbladesdirect.com` 页面正常显示
- [ ] 提交联系表单成功
- [ ] 浏览器开发者工具 Network 标签显示 API 请求成功（200 状态码）

---

## 当前状态

**最后更新**: 2026-01-29

✅ docker-compose.yml 已添加 `expose: ["3001"]`
✅ admin.html API_URL 已修复为动态检测
✅ entrypoint.sh 支持 BACKEND_URL 环境变量
✅ 代码已推送到 GitHub

**下一步**: 在 Coolify 中重新部署后端和前端应用
