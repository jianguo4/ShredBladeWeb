# Coolify 部署快速修复指南

## 🎯 问题
Coolify 部署后：
1. ❌ 没有账密登录保护
2. ❌ Failed to load inquiries

## ✅ 解决方案（3 步）

### 步骤 1: 推送最新代码 ⬆️

```bash
git push origin main
```

**已完成的更改**:
- ✅ `deploy/backend/server.js` - 包含认证功能
- ✅ `deploy/backend/admin.html` - 支持认证凭据

### 步骤 2: 在 Coolify 配置环境变量 ⚙️

登录 Coolify → 您的应用 → Environment Variables

添加以下变量：

```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = 72@DcCOe5QbxzM-N
ALLOWED_IPS = (留空)
```

**可选的邮件配置**:
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password  
NOTIFICATION_EMAIL = admin@example.com
```

### 步骤 3: 重新部署 🚀

在 Coolify 中点击 **"Redeploy"** 或 **"Deploy"** 按钮

等待部署完成（约 1-2 分钟）

## 🧪 验证部署

### 浏览器测试
1. 访问: `https://api.shredderbladesdirect.com/`
2. 应该弹出认证对话框
3. 输入:
   - 用户名: `admin`
   - 密码: `72@DcCOe5QbxzM-N`
4. ✅ 成功登录后可以看到询价列表

### curl 测试
```bash
# 无认证（应返回 401）
curl -I https://api.shredderbladesdirect.com/api/inquiries

# 有认证（应返回 200）
curl -u admin:72@DcCOe5QbxzM-N \
  https://api.shredderbladesdirect.com/api/inquiries
```

## 🔍 故障排除

### 问题: 还是没有认证？
**检查**:
1. 环境变量是否正确添加？
2. 是否点击了"Redeploy"？
3. 查看 Coolify 日志，应该看到:
   ```
   🚀 Server running on http://0.0.0.0:3001
   ```

### 问题: 登录后还是显示 "Failed to load inquiries"？
**解决**:
1. 清除浏览器缓存（Ctrl + Shift + Delete）
2. 使用无痕/隐私浏览模式重新访问
3. 在开发者工具中查看网络请求是否有错误

### 问题: 如何查看日志？
在 Coolify UI 中:
- Dashboard → Your Application → Logs

或者 SSH 到服务器:
```bash
docker ps | grep shredblade
docker logs <container_id> --tail 50
```

## 📋 环境变量说明

| 变量 | 必需 | 默认值 | 说明 |
|------|------|--------|------|
| ADMIN_USERNAME | ✅ | admin | 管理员用户名 |
| ADMIN_PASSWORD | ✅ | changeme123 | 管理员密码（**请改成强密码**） |
| ALLOWED_IPS | ❌ | (空) | IP 白名单，逗号分隔 |
| PORT | ❌ | 3001 | 服务器端口 |
| NODE_ENV | ❌ | production | 运行环境 |

## ⚠️ 安全提醒

当前密码 `72@DcCOe5QbxzM-N` 已在文档中，建议部署后**立即更改**:

1. 在 Coolify 中更新 `ADMIN_PASSWORD` 为新密码
2. 点击 "Redeploy"
3. 使用新密码登录

## 📞 需要帮助？

如果问题仍然存在，请提供：
1. ☑️ Coolify 容器日志截图
2. ☑️ 浏览器开发者工具网络请求截图
3. ☑️ Coolify 环境变量配置截图

---

**最后更新**: 2026年1月29日  
**Git Commit**: `a2157bc` - "fix: sync authentication code to deploy directory"

**完整文档**: [COOLIFY_DEPLOYMENT_FIX.md](./COOLIFY_DEPLOYMENT_FIX.md)
