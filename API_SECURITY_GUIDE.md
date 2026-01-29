# API 安全访问配置指南

## 问题说明

现在 `api.shredderbladesdirect.com` 已添加访问保护，只有经过认证的管理员才能访问。

## 安全措施

### 1. HTTP Basic Authentication（基本认证）

所有管理端点都需要用户名和密码验证。

**保护的端点：**
- `GET /` - 管理面板主页
- `GET /admin.html` - 管理界面
- `GET /api/inquiries` - 获取所有询价
- `GET /api/inquiries/:id` - 获取单个询价
- `PATCH /api/inquiries/:id` - 更新询价状态
- `DELETE /api/inquiries/:id` - 删除询价

**公开端点（前端表单提交用）：**
- `POST /api/inquiries` - 提交新询价（无需认证）
- `GET /health` - 健康检查（无需认证）

### 2. IP 白名单（可选）

可以限制只有特定 IP 地址才能访问管理接口。

## 配置步骤

### 步骤 1：设置环境变量

编辑 `.env` 文件（如果没有，从 `.env.example` 复制）：

```bash
# 复制示例文件
cp .env.example .env

# 编辑配置
nano .env
```

设置以下变量：

```env
# 管理员用户名（默认: admin）
ADMIN_USERNAME=your_admin_username

# 管理员密码（请使用强密码！）
ADMIN_PASSWORD=YourVerySecurePassword123!

# IP 白名单（可选，留空则不限制）
# 多个 IP 用逗号分隔
ALLOWED_IPS=203.0.113.5,198.51.100.42
```

### 步骤 2：重新部署

```bash
# 重新构建并启动容器
docker-compose down
docker-compose up -d --build

# 查看日志确认启动成功
docker-compose logs -f backend
```

### 步骤 3：访问管理面板

访问 `https://api.shredderbladesdirect.com/` 时，浏览器会弹出认证对话框：

- **用户名**: 您在 `.env` 中设置的 `ADMIN_USERNAME`
- **密码**: 您在 `.env` 中设置的 `ADMIN_PASSWORD`

## 使用示例

### 浏览器访问

1. 打开 `https://api.shredderbladesdirect.com/`
2. 输入用户名和密码
3. 访问管理面板

### API 调用（使用 curl）

```bash
# 获取所有询价（需要认证）
curl -u admin:YourPassword123! https://api.shredderbladesdirect.com/api/inquiries

# 提交新询价（公开，无需认证）
curl -X POST https://api.shredderbladesdirect.com/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Inquiry about blades"
  }'
```

### JavaScript 前端调用（管理功能）

```javascript
// 获取所有询价（需要认证）
const username = 'admin';
const password = 'YourPassword123!';
const credentials = btoa(`${username}:${password}`);

fetch('https://api.shredderbladesdirect.com/api/inquiries', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

## IP 白名单配置

### 获取您的 IP 地址

```bash
# 查看您的公网 IP
curl https://api.ipify.org
```

### 配置白名单

在 `.env` 文件中添加：

```env
# 单个 IP
ALLOWED_IPS=203.0.113.5

# 多个 IP（逗号分隔，不要有空格）
ALLOWED_IPS=203.0.113.5,198.51.100.42,192.0.2.100
```

**注意事项：**
- IP 白名单是可选的，留空则不限制
- 如果启用 IP 白名单，只有列表中的 IP 才能访问
- 如果您的 IP 是动态的，建议不要启用 IP 白名单

## 安全最佳实践

### 1. 使用强密码

❌ **不要使用：**
- `admin`, `password`, `123456`
- 简单的单词或姓名
- 默认密码 `changeme123`

✅ **推荐使用：**
- 至少 12 个字符
- 包含大小写字母、数字和特殊字符
- 使用密码生成器

```bash
# 生成强密码示例（Linux/Mac）
openssl rand -base64 16
```

### 2. 定期更换密码

建议每 3-6 个月更换一次管理员密码。

### 3. 监控访问日志

```bash
# 查看后端日志
docker logs shredblade-backend

# 实时监控
docker logs -f shredblade-backend
```

### 4. 使用 HTTPS

确保通过 HTTPS 访问，避免密码在网络中明文传输。

## 测试验证

### 测试 1：访问管理面板（应该需要认证）

```bash
# 无认证访问（应该返回 401）
curl -I https://api.shredderbladesdirect.com/

# 有认证访问（应该返回 200）
curl -u admin:YourPassword \
  -I https://api.shredderbladesdirect.com/
```

### 测试 2：提交表单（应该无需认证）

```bash
# 公开提交（应该返回 201）
curl -X POST https://api.shredderbladesdirect.com/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Test inquiry"
  }'
```

### 测试 3：获取询价列表（应该需要认证）

```bash
# 无认证（应该返回 401）
curl https://api.shredderbladesdirect.com/api/inquiries

# 有认证（应该返回 200）
curl -u admin:YourPassword \
  https://api.shredderbladesdirect.com/api/inquiries
```

## 故障排除

### 问题 1：忘记密码

1. SSH 登录到服务器
2. 编辑 `.env` 文件，设置新密码
3. 重启容器：`docker-compose restart backend`

### 问题 2：IP 白名单锁定自己

1. SSH 登录到服务器
2. 编辑 `.env` 文件，清空 `ALLOWED_IPS`
3. 重启容器：`docker-compose restart backend`

### 问题 3：认证总是失败

检查：
1. 用户名和密码是否正确
2. `.env` 文件是否正确加载
3. 查看日志：`docker logs shredblade-backend`

```bash
# 验证环境变量
docker exec shredblade-backend env | grep ADMIN
```

## 日志示例

### 成功认证

```
✅ Database initialized successfully
🔒 IP Whitelist enabled: 203.0.113.5, 198.51.100.42
🚀 Server running on http://0.0.0.0:3001
```

### 认证失败

```
Access denied for IP: 192.0.2.100
```

### 无效凭据

```
Unauthorized access attempt from 203.0.113.5
```

---

## 总结

✅ **已实现的保护：**
- HTTP Basic Authentication（用户名/密码）
- IP 白名单（可选）
- 管理端点全部受保护
- 公开表单提交端点不受影响

✅ **安全状态：**
- ✅ 管理面板需要认证
- ✅ API 管理端点需要认证
- ✅ 前端表单提交仍然公开
- ✅ 支持 IP 白名单限制

**下一步：**
1. 设置强密码
2. 重新部署容器
3. 验证认证是否生效
4. （可选）配置 IP 白名单
