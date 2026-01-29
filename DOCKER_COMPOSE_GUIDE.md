# Docker Compose 本地开发指南

## 两个配置文件说明

### 1. docker-compose.yml（生产部署）
- 用于 Coolify 生产环境部署
- 前端端口: 80 → Coolify 反向代理处理
- 后端端口: 3001
- 使用 `NODE_ENV=production`
- EMAIL_ENABLED=true（如配置）

### 2. docker-compose.dev.yml（本地开发）
- 用于本地开发环境
- 前端端口: 80（本地开发）
- 后端端口: 3001
- 使用 `NODE_ENV=development`
- EMAIL_ENABLED=false（避免发送实际邮件）
- 后端源代码直接挂载（支持热重载）

## 本地启动步骤

### 前置条件
- 已安装 Docker 和 Docker Compose
- 在项目根目录执行命令

### 方法 1：Docker Compose（推荐）

```bash
# 启动开发环境
docker-compose -f docker-compose.dev.yml up -d

# 检查容器状态
docker-compose -f docker-compose.dev.yml ps

# 查看实时日志
docker-compose -f docker-compose.dev.yml logs -f

# 停止容器
docker-compose -f docker-compose.dev.yml down

# 完全清理（包括数据卷）
docker-compose -f docker-compose.dev.yml down -v
```

### 方法 2：start-dev.bat（传统方式）

```bash
.\start-dev.bat
```

启动前后端开发服务器（直接运行，不使用 Docker）

## 访问地址

### Docker Compose 方式
- **前端**: http://localhost:80 (或 http://localhost/)
- **后端健康检查**: http://localhost:3001/health
- **API 端点**: http://localhost:3001/api/inquiries
- **管理面板**: http://localhost:3001/
  - 用户名: `admin`
  - 密码: `72@DcCOe5QbxzM-N`

### start-dev.bat 方式
- **前端**: http://localhost:5173
- **后端**: http://localhost:3001
- **管理面板**: http://localhost:3001/

## 常见问题

### 问题 1：端口 80 被占用
```
Error: Bind for 0.0.0.0:80 failed: port is already allocated
```

**解决**:
```bash
# 查找占用 80 端口的进程
netstat -ano | findstr :80

# 停止容器
docker-compose -f docker-compose.dev.yml down

# 释放端口后重新启动
docker-compose -f docker-compose.dev.yml up -d
```

### 问题 2：后端无法连接
如果前端报错"无法连接到 API"：

1. 检查容器是否都在运行：
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

2. 检查后端日志：
   ```bash
   docker-compose -f docker-compose.dev.yml logs backend
   ```

3. 测试后端健康状态：
   ```bash
   curl http://localhost:3001/health
   ```

### 问题 3：代码改动没有生效
docker-compose.dev.yml 中后端已配置卷挂载，代码改动应该自动重新加载。如果没有生效：

```bash
# 查看后端日志，确认是否重启
docker-compose -f docker-compose.dev.yml logs -f backend
```

## 环境变量配置

### 创建 .env 文件
```bash
# .env 文件（在项目根目录）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL=admin@example.com
```

Coolify 会自动加载此文件。Docker Compose 也会读取它。

## Coolify 生产部署

使用 `docker-compose.yml`（不是 dev 版本）：

```bash
# Coolify 会自动使用此文件
docker-compose -f docker-compose.yml up -d
```

配置项：
- COOLIFY_BRANCH=main
- COOLIFY_RESOURCE_UUID=（由 Coolify 设置）
- 环境变量从 Coolify UI 中配置

---

**更新时间**: 2026年1月29日
