# Coolify 部署故障排除

## 错误：Port 80 Already Allocated

**错误信息**:
```
Error response from daemon: failed to set up container networking: 
driver failed programming external connectivity on endpoint frontend-...:
Bind for :::80 failed: port is already allocated
```

### 原因

Coolify 使用反向代理管理所有端口 80 和 443 的请求。应用容器不应该直接绑定这些端口。

### 解决方案

已在 `docker-compose.yml` 中修复：

```yaml
frontend:
  ports:
    - "3000:80"  # 改为 3000，让 Coolify 反向代理处理 80/443
  
backend:
  ports:
    - "3001:3001"  # 后端保持 3001
```

### Coolify 配置步骤

1. **进入应用设置** → Application Settings
2. **配置端口映射**:
   - 前端服务端口: `3000`（Coolify 会代理到域名的 80/443）
   - 后端服务端口: `3001`

3. **配置域名路由**:
   - `www.shredderbladesdirect.com` → 前端（端口 3000）
   - `api.shredderbladesdirect.com` → 后端（端口 3001）

4. **配置环境变量**（必须）:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=72@DcCOe5QbxzM-N
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=admin@example.com
   ```

5. **重新部署**
   - 点击"Redeploy"
   - 等待容器启动完成

### 验证部署

成功部署后检查：

```bash
# 检查前端
curl https://www.shredderbladesdirect.com

# 检查后端健康状态
curl -u admin:72@DcCOe5QbxzM-N https://api.shredderbladesdirect.com/health

# 测试受保护端点
curl -u admin:72@DcCOe5QbxzM-N https://api.shredderbladesdirect.com/api/inquiries
```

### 如果仍然失败

1. **清理旧容器** (仅本地测试):
   ```bash
   docker-compose down -v
   docker system prune -f
   ```

2. **检查 Coolify 日志**:
   - Coolify 控制面板 → 应用 → Logs
   - 查看容器启动错误

3. **验证环境变量**:
   - 确保 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 已设置
   - 确保 `docker-compose.yml` 已推送到 Git

4. **重新部署**:
   - Git 推送最新的 `docker-compose.yml`
   - Coolify 应自动触发重新部署
   - 如未自动触发，在 Coolify 中手动点击"Redeploy"

---

**更新时间**: 2026年1月29日
