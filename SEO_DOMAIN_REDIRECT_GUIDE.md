# SEO 域名重定向和 HTTPS 配置指南

## 问题描述

- `https://shredderbladesdirect.com/` - 无法访问
- `https://www.shredderbladesdirect.com/` - 正常访问

为了 SEO 权重集中，需要将所有流量重定向到 www 版本。

## 解决方案

### 1. Nginx 配置

已配置以下重定向规则：

#### HTTP 重定向
```
shredderbladesdirect.com  →  HTTPS www.shredderbladesdirect.com
www.shredderbladesdirect.com  →  HTTPS www.shredderbladesdirect.com
```

#### HTTPS 重定向  
```
shredderbladesdirect.com (HTTPS)  →  HTTPS www.shredderbladesdirect.com
```

### 2. 配置文件变更

#### 创建了新的 nginx.conf 配置文件
- 文件位置：`/nginx.conf`
- 包含完整的 HTTP/HTTPS 重定向规则
- 支持 SEO 优化的安全头部配置
- API 代理配置（指向后端）

#### 更新了 Dockerfile.frontend
- 使用独立的 nginx.conf 配置
- 支持 80 和 443 端口
- 优化了性能配置

#### 更新了 docker-compose.yml
- 添加了前端服务配置
- 暴露 80 和 443 端口
- 添加了健康检查

### 3. SSL/TLS 证书配置（HTTPS）

#### 选项 A：使用 Let's Encrypt（推荐用于生产环境）

```bash
# 1. 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 2. 生成证书
sudo certbot certonly --standalone -d shredderbladesdirect.com -d www.shredderbladesdirect.com

# 3. 证书位置（默认）
/etc/letsencrypt/live/shredderbladesdirect.com/fullchain.pem
/etc/letsencrypt/live/shredderbladesdirect.com/privkey.pem

# 4. 自动续期（Certbot 会自动处理）
```

#### 选项 B：使用自签名证书（仅用于测试）

```bash
# 生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# 创建证书目录并复制
mkdir -p certs
cp cert.pem certs/
cp key.pem certs/
```

### 4. 部署步骤

#### 步骤 1：准备证书文件

将 SSL 证书放在以下位置：
```
./certs/
├── cert.pem      # 公钥证书
└── key.pem       # 私钥
```

#### 步骤 2：构建 Docker 镜像

```bash
# 使用 docker-compose 构建和启动
docker-compose up -d

# 或手动构建
docker build -f Dockerfile.frontend -t shredblade-frontend .
```

#### 步骤 3：验证重定向

```bash
# 测试 HTTP 到 HTTPS 的重定向
curl -I http://shredderbladesdirect.com
# 应该返回 301 / 302 重定向响应

curl -I https://shredderbladesdirect.com
# 应该返回 301 / 302 重定向到 www

curl -I https://www.shredderbladesdirect.com
# 应该返回 200 OK
```

### 5. SEO 优势

✅ **权重集中**
- 所有流量都指向 www 版本
- 避免权重分散到两个域名

✅ **搜索引擎友好**
- 301 重定向让搜索引擎知道首选域名
- 有利于 SEO 排名

✅ **规范化 URL**
- 统一的域名格式
- 改善用户体验

### 6. DNS 配置（如果需要）

确保 DNS 记录正确配置：

```
A 记录：shredderbladesdirect.com  → 你的服务器 IP
CNAME 记录：www.shredderbladesdirect.com  → shredderbladesdirect.com
```

或者两个都指向同一个 IP：

```
A 记录：shredderbladesdirect.com  → IP
A 记录：www.shredderbladesdirect.com  → IP
```

### 7. 反向代理设置（如果在服务器前有 CDN 或其他反向代理）

如果使用 Cloudflare 或其他 CDN：
- 在 Cloudflare 中添加两个 DNS 记录（都指向你的服务器）
- 在 Cloudflare SSL/TLS 设置中选择 "Flexible" 或 "Full"
- Nginx 配置会处理重定向

### 8. 监控和验证

定期检查日志：

```bash
# 查看 Nginx 访问日志
docker logs shredblade-frontend

# 验证重定向是否生效
curl -v http://shredderbladesdirect.com 2>&1 | grep -E "< HTTP|Location"
```

### 9. 常见问题

**Q: 为什么要使用 www？**  
A: 虽然不使用 www 也可以，但使用 www 有以下好处：
- 更容易区分子域名（如 api.example.com）
- 更好的 cookie 作用域管理
- 传统和专业的外观

**Q: 可以反过来重定向（www → non-www）吗？**  
A: 可以，但建议使用 www 版本作为主域名。如需改变，在 nginx.conf 中修改重定向规则。

**Q: 重定向会影响 SEO 吗？**  
A: 不会。301 重定向是 SEO 友好的，搜索引擎会认可并转移权重。

**Q: HTTPS 证书如何续期？**  
A: 使用 Let's Encrypt 的 Certbot 可以自动续期（推荐）。

---

## 总结

✅ 已实现 HTTP/HTTPS 重定向
✅ 支持 SEO 权重集中
✅ 包含完整的 Nginx 配置
✅ 支持 Docker 部署
✅ 安全的 SSL/TLS 配置

下一步：按照部署步骤配置 SSL 证书并重新启动 Docker 容器。
