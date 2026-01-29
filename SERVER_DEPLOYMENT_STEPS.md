# API 安全部署 - 服务器部署说明

## 📋 当前状态

✅ **本地配置已完成：**
- ✅ .env 文件已创建
- ✅ 管理员密码已设置为: `72@DcCOe5QbxzM-N`
- ✅ 用户名: `admin`

## 🚀 服务器部署步骤

### 方法 1：使用自动部署脚本（推荐）

1. **上传文件到服务器**
   ```bash
   # 在服务器上，进入项目目录
   cd /path/to/ShredBladeWeb
   
   # 拉取最新代码
   git pull origin main
   ```

2. **运行部署脚本**
   ```bash
   # 给脚本执行权限
   chmod +x deploy-security.sh
   
   # 运行部署
   ./deploy-security.sh
   ```

   脚本会自动：
   - 检查 Docker 环境
   - 创建/更新 .env 文件
   - 构建 Docker 镜像
   - 启动容器
   - 验证服务状态

### 方法 2：手动部署

#### 步骤 1：上传代码到服务器

```bash
# SSH 登录到服务器
ssh user@your-server

# 进入项目目录
cd /path/to/ShredBladeWeb

# 拉取最新代码
git pull origin main
```

#### 步骤 2：配置环境变量

```bash
# 创建 .env 文件（如果不存在）
cp .env.example .env

# 编辑 .env 文件
nano .env
```

设置以下内容：
```env
# 管理员凭据
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N

# 邮件配置（如果需要）
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL=admin@example.com

# IP 白名单（可选，留空不限制）
ALLOWED_IPS=
```

#### 步骤 3：停止现有容器

```bash
docker-compose down
# 或
docker compose down
```

#### 步骤 4：重新构建镜像

```bash
docker-compose build --no-cache
# 或
docker compose build --no-cache
```

#### 步骤 5：启动容器

```bash
docker-compose up -d
# 或
docker compose up -d
```

#### 步骤 6：查看日志

```bash
docker-compose logs -f backend
# 或
docker compose logs -f backend
```

## ✅ 验证部署

### 1. 检查容器状态

```bash
docker-compose ps
```

应该看到 `backend` 和 `frontend` 容器都在运行。

### 2. 测试健康检查

```bash
curl http://localhost:3001/health
```

应该返回：
```json
{"status":"ok","message":"Server is running"}
```

### 3. 测试认证保护

```bash
# 无认证访问（应该返回 401）
curl -I https://api.shredderbladesdirect.com/api/inquiries

# 有认证访问（应该返回 200）
curl -u admin:72@DcCOe5QbxzM-N \
  https://api.shredderbladesdirect.com/api/inquiries
```

### 4. 浏览器测试

1. 打开: `https://api.shredderbladesdirect.com/`
2. 应该弹出认证对话框
3. 输入：
   - **用户名**: `admin`
   - **密码**: `72@DcCOe5QbxzM-N`
4. 成功登录后可以看到管理面板

## 🔐 安全凭据

**⚠️ 请妥善保管以下信息：**

```
管理员用户名: admin
管理员密码: 72@DcCOe5QbxzM-N
```

## 📊 保护状态

| 端点 | 访问控制 | 说明 |
|------|---------|------|
| `GET /` | 🔒 需要认证 | 管理面板首页 |
| `GET /admin.html` | 🔒 需要认证 | 管理界面 |
| `GET /api/inquiries` | 🔒 需要认证 | 获取所有询价 |
| `GET /api/inquiries/:id` | 🔒 需要认证 | 获取单个询价 |
| `PATCH /api/inquiries/:id` | 🔒 需要认证 | 更新询价状态 |
| `DELETE /api/inquiries/:id` | 🔒 需要认证 | 删除询价 |
| `POST /api/inquiries` | 🔓 公开 | 提交新询价（前端表单） |
| `GET /health` | 🔓 公开 | 健康检查 |

## 🔧 常用命令

```bash
# 查看容器状态
docker-compose ps

# 查看实时日志
docker-compose logs -f backend

# 重启服务
docker-compose restart backend

# 停止所有服务
docker-compose down

# 重新部署（完整流程）
docker-compose down && docker-compose build --no-cache && docker-compose up -d

# 查看环境变量
docker exec shredblade-backend env | grep ADMIN
```

## 🆘 故障排除

### 问题 1：容器无法启动

```bash
# 查看详细日志
docker-compose logs backend

# 检查端口占用
netstat -tlnp | grep 3001
```

### 问题 2：认证失败

```bash
# 验证环境变量是否正确加载
docker exec shredblade-backend env | grep ADMIN

# 应该看到：
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=72@DcCOe5QbxzM-N
```

### 问题 3：前端无法提交表单

检查前端的 API 地址配置，确保指向正确的后端地址。

## 📝 后续操作

### 配置 IP 白名单（可选）

如果想只允许特定 IP 访问：

1. 获取您的 IP：
   ```bash
   curl https://api.ipify.org
   ```

2. 编辑 .env：
   ```bash
   nano .env
   ```

3. 添加 IP（多个用逗号分隔）：
   ```env
   ALLOWED_IPS=203.0.113.5,198.51.100.42
   ```

4. 重启服务：
   ```bash
   docker-compose restart backend
   ```

### 更改密码

1. 编辑 .env 文件
2. 修改 `ADMIN_PASSWORD`
3. 重启容器：`docker-compose restart backend`

## 📚 相关文档

- [API_SECURITY_GUIDE.md](./API_SECURITY_GUIDE.md) - 完整安全配置指南
- [deploy-security.sh](./deploy-security.sh) - 自动部署脚本

---

## 🎉 总结

✅ **已完成：**
- ✅ 本地 .env 文件配置
- ✅ 强密码生成
- ✅ 自动部署脚本创建
- ✅ 部署文档准备

**下一步：**
1. 将代码推送到 Git 仓库
2. 在服务器上拉取最新代码
3. 运行 `./deploy-security.sh` 或手动部署
4. 验证认证是否生效

**管理员凭据（服务器部署后使用）：**
- 用户名: `admin`
- 密码: `72@DcCOe5QbxzM-N`
