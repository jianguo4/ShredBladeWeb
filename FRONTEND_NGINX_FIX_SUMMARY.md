# 前端 Nginx 错误修复总结

## 问题

前端 nginx 容器无法启动，出现以下错误：

```
[emerg] 1#1: host not found in upstream "backend" in /etc/nginx/conf.d/default.conf:79
nginx: [emerg] host not found in upstream "backend"
```

同时还有弃用警告：
```
[warn] 1#1: the "listen ... http2" directive is deprecated
```

## 根因分析

1. **后端引用问题**: nginx.conf 中使用 `proxy_pass http://backend:3001;` 引用后端服务
   - 但容器名称是 `shredblade-backend`，不是 `backend`
   - Docker Compose 使用的网络中，服务名称必须与容器名称一致

2. **弃用语法**: nginx 1.25+ 中 `listen 443 ssl http2;` 已弃用
   - 新语法应为分开的指令：`listen 443 ssl;` 和 `http2 on;`

3. **API 构建参数**: VITE_API_BASE 在容器构建时使用 `localhost:3001`
   - 在 Docker Compose 网络中应该使用容器网络名称

## 已实施的修复

### 1. 修复 nginx.conf

**错误的配置**:
```nginx
listen 443 ssl http2;
...
proxy_pass http://backend:3001;
```

**修复后的配置**:
```nginx
listen 443 ssl;
http2 on;
...
proxy_pass http://shredblade-backend:3001;
```

### 2. 更新 docker-compose.yml

**更改 VITE_API_BASE**:
```yaml
# 之前
args:
  VITE_API_BASE: http://localhost:3001

# 之后
args:
  VITE_API_BASE: http://shredblade-backend:3001
```

### 3. Docker Compose 网络配置

已确保前端和后端都在 `shredblade` 网络中：

```yaml
networks:
  shredblade:
    driver: bridge

services:
  frontend:
    networks:
      - shredblade
  
  backend:
    networks:
      - shredblade
```

## 验证步骤

### 本地验证（如果安装了 Docker）

```bash
cd d:\Business\Web\ShredBladeWeb

# 清理旧容器
docker-compose down -v

# 使用新配置启动
docker-compose up -d

# 检查容器日志
docker-compose logs -f frontend
```

### Coolify 部署验证

1. 推送代码到 Git 仓库（已自动完成）
2. 在 Coolify 中触发重新部署
3. 等待部署完成
4. 检查前端日志：应该看到 nginx 正常启动，没有 `[emerg]` 错误

### 功能验证

访问前端：
```bash
curl http://localhost:3000
# 或在浏览器中访问 http://localhost:3000
```

检查 API 代理：
```bash
# 应该正确代理到后端
curl -u admin:72@DcCOe5QbxzM-N \
  http://localhost:3000/api/inquiries
```

## 相关文件修改

- ✅ `nginx.conf` - 修复后端引用和 http2 语法
- ✅ `docker-compose.yml` - 更新 VITE_API_BASE 和 networks 配置
- ✅ 提交 `[main 6a34d23]` - 修复已提交

## 下一步

1. 提交代码到 Git 远程（`git push origin main`）
2. 在 Coolify 中重新部署
3. 验证前端日志中没有 `[emerg]` 错误
4. 测试前端是否能成功调用 API

---

**更新时间**: 2026年1月29日
