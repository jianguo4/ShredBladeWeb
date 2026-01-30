# Coolify 部署故障排除 - 端口冲突

## 错误信息

```
Bind for :::80 failed: port is already allocated
```

## 根本原因

Coolify 在部署时自动为容器添加了端口映射到主机，但 Coolify 本身已经占用了这些端口。

## 解决方案

### 在 Coolify UI 中配置

1. **登录 Coolify 控制面板**
2. **找到您的应用** → 选择后端应用
3. **进入 Settings（设置）**
4. **关键步骤**：
   - 禁用"Expose Port"或"Publish Port"选项（如果有）
   - 不要配置"Port Mappings"
   - Coolify 会通过内部网络和反向代理处理路由

### docker-compose.yml 配置

✅ 仅用于后端服务，且**不使用** `ports`，只使用 `expose: ["3001"]` 供 Coolify 反向代理。

### Nginx 反向代理配置

Coolify 使用 Traefik 或 Nginx 反向代理处理所有入站流量。配置应为：

```
www.shredderbladesdirect.com  →  frontend:80  (内部通信)
api.shredderbladesdirect.com  →  backend:3001 (内部通信)
```

**容器无需暴露端口到主机**。

### Coolify 中的应用配置步骤

1. **Backend 应用设置**:
   - Build Pack: Docker Compose
   - Docker Compose Location: `/docker-compose.yml`
   - Port (Exposes): `3001`
   - 环境变量: 配置 ADMIN_USERNAME, ADMIN_PASSWORD 等

2. **Frontend 应用设置**:
   - Build Pack: Dockerfile
   - Dockerfile Location: `/Dockerfile.frontend`
   - Port (Exposes): `80`
   - 环境变量: `BACKEND_URL=https://api.shredderbladesdirect.com`

### 如果 Coolify 仍然强制添加端口

如果 Coolify UI 中强制要求配置端口（不允许留空）：

1. 在 Coolify 中配置端口，但**不要让它发布到主机**
2. 在应用的 "Destination" 或 "Port Exposure" 设置中选择"内部"或"Private"
3. 保存配置

### 验证部署

成功部署后：

```bash
# 通过 HTTPS 访问（Coolify 反向代理处理）
curl https://api.shredderbladesdirect.com/health

# 使用认证测试 API
curl -u admin:72@DcCOe5QbxzM-N \
  https://api.shredderbladesdirect.com/api/inquiries
```

## Coolify 港口管理机制

Coolify 自动处理以下事项：
- ✅ HTTPS 终止（Let's Encrypt）
- ✅ 反向代理（到容器内部）
- ✅ 域名路由（www.domain.com, api.domain.com）
- ✅ 负载均衡（如果配置多个副本）

应用容器**不应该**暴露端口到主机。所有流量都通过 Coolify 的反向代理。

---

**关键点**: 在 Coolify UI 中，确保"Expose Port"或"Publish to Host"选项**已禁用或留空**。
