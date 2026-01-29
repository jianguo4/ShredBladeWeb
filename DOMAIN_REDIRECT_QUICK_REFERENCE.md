# 域名重定向配置总结

## 已实施的改动

### 📝 文件变更

1. **Dockerfile.frontend** 更新
   - 使用独立 nginx.conf 配置文件
   - 支持 HTTP/HTTPS 和域名重定向
   - 暴露 80 和 443 端口

2. **docker-compose.yml** 更新
   - 添加前端服务（frontend service）
   - 配置端口映射：80 和 443
   - 添加健康检查

3. **nginx.conf** 新增
   - 完整的重定向规则
   - SEO 优化的安全头部
   - API 代理配置
   - SSL/TLS 支持

4. **SEO_DOMAIN_REDIRECT_GUIDE.md** 新增
   - 详细的配置和部署指南

## 🔄 重定向流程

```
用户访问                    重定向到
────────────────────────────────────────
http://shredderbladesdirect.com
                    →     https://www.shredderbladesdirect.com

https://shredderbladesdirect.com
                    →     https://www.shredderbladesdirect.com

http://www.shredderbladesdirect.com
                    →     https://www.shredderbladesdirect.com

https://www.shredderbladesdirect.com
                    ✅     最终目标（200 OK）
```

## 🚀 快速部署

### 步骤 1：准备 SSL 证书（HTTPS）

```bash
# 创建证书目录
mkdir -p certs

# 使用 Let's Encrypt（生产环境推荐）
# 或生成自签名证书（测试用）
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# 放入 certs 目录
cp cert.pem certs/
cp key.pem certs/
```

### 步骤 2：构建并启动

```bash
# 构建 Docker 镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f frontend
```

### 步骤 3：验证重定向

```bash
# 测试重定向是否生效
curl -L -i http://shredderbladesdirect.com

# 应该看到 301/302 重定向，最终指向 www 版本
```

## ✅ SEO 优势

| 优势 | 说明 |
|------|------|
| 权重集中 | 所有流量都指向唯一的 www 域名 |
| 搜索排名 | 301 重定向让谷歌等搜索引擎转移权重 |
| URL 规范化 | 避免重复内容问题 |
| 用户体验 | 统一、专业的域名格式 |

## 📋 Nginx 配置核心规则

```nginx
# 重定向不带 www 的访问
server {
    listen 80;
    server_name shredderbladesdirect.com;
    return 301 https://www.shredderbladesdirect.com$request_uri;
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name www.shredderbladesdirect.com;
    return 301 https://$server_name$request_uri;
}

# 主服务器（HTTPS）
server {
    listen 443 ssl http2;
    server_name www.shredderbladesdirect.com;
    
    # SSL 证书配置
    ssl_certificate /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;
    
    # 服务静态文件和 SPA 路由
    # ...
}
```

## 🔗 相关文件

- [SEO_DOMAIN_REDIRECT_GUIDE.md](./SEO_DOMAIN_REDIRECT_GUIDE.md) - 详细指南
- [nginx.conf](./nginx.conf) - Nginx 配置文件
- [Dockerfile.frontend](./Dockerfile.frontend) - 前端镜像配置
- [docker-compose.yml](./docker-compose.yml) - Docker 容器编排

## ⚠️ 重要提示

1. **SSL 证书必须准备**
   - 不能使用自签名证书用于生产环境
   - 建议使用 Let's Encrypt（免费）

2. **DNS 配置**
   ```
   A 记录: shredderbladesdirect.com → 你的服务器 IP
   A 记录: www.shredderbladesdirect.com → 你的服务器 IP
   ```

3. **验证端口**
   - 确保 80 和 443 端口未被占用
   - 防火墙应允许这两个端口

4. **缓存问题**
   - 浏览器可能缓存旧的重定向
   - 使用私密浏览或清除缓存进行测试

## 🆘 故障排除

如果重定向不生效：

```bash
# 检查 Nginx 配置语法
docker exec shredblade-frontend nginx -t

# 查看容器日志
docker logs shredblade-frontend

# 重新加载 Nginx 配置
docker exec shredblade-frontend nginx -s reload

# 重启容器
docker-compose restart frontend
```

---

**配置完成！🎉**  
现在所有访问都会被统一重定向到 www 版本，有利于 SEO 权重集中。
