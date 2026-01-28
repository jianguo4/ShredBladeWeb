# 📧 邮件通知配置指南

## 概述

系统现在支持自动邮件通知功能。当用户提交 inquiry 时，会自动发送邮件通知给管理员。

---

## 🚀 快速开始

### 1. 安装依赖

如果还没有安装新依赖，运行：

```bash
cd app/backend
npm install
```

这会安装 `nodemailer` 邮件发送库。

### 2. 创建 .env 配置文件

复制示例文件：

```bash
cd app/backend
cp .env.example .env
```

或在 Windows PowerShell 中：

```powershell
Copy-Item .env.example .env
```

### 3. 配置邮箱信息

编辑 `.env` 文件，根据您的邮箱类型选择配置方式。

---

## 📮 邮箱配置选项

### 选项 1: Gmail (推荐用于测试)

1. **启用两步验证** (如果还没有)
2. **生成应用专用密码**：
   - 访问 https://myaccount.google.com/apppasswords
   - 选择"邮件"和"其他"
   - 复制生成的密码

3. **配置 .env**：

```env
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
NOTIFICATION_EMAIL=admin@example.com
EMAIL_FROM_NAME=ShredderBlades
```

### 选项 2: QQ 邮箱

1. **开启 SMTP 服务**：
   - 登录 QQ 邮箱
   - 设置 → 账户 → POP3/IMAP/SMTP服务
   - 开启服务并获取授权码

2. **配置 .env**：

```env
EMAIL_ENABLED=true
EMAIL_SERVICE=QQ
EMAIL_USER=your-qq@qq.com
EMAIL_PASSWORD=your-authorization-code
NOTIFICATION_EMAIL=admin@example.com
EMAIL_FROM_NAME=ShredderBlades
```

### 选项 3: 163 邮箱

1. **开启 SMTP 服务**：
   - 登录 163 邮箱
   - 设置 → POP3/SMTP/IMAP
   - 开启服务并设置客户端授权密码

2. **配置 .env**：

```env
EMAIL_ENABLED=true
EMAIL_SERVICE=163
EMAIL_USER=your-email@163.com
EMAIL_PASSWORD=your-authorization-code
NOTIFICATION_EMAIL=admin@example.com
EMAIL_FROM_NAME=ShredderBlades
```

### 选项 4: 阿里云企业邮箱

```env
EMAIL_ENABLED=true
EMAIL_HOST=smtp.qiye.aliyun.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
NOTIFICATION_EMAIL=admin@yourdomain.com
EMAIL_FROM_NAME=ShredderBlades
```

### 选项 5: 自定义 SMTP 服务器

```env
EMAIL_ENABLED=true
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
NOTIFICATION_EMAIL=admin@example.com
EMAIL_FROM_NAME=ShredderBlades
```

---

## 🔧 配置参数说明

| 参数 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `EMAIL_ENABLED` | 是否启用邮件功能 | 是 | false |
| `EMAIL_SERVICE` | 预定义邮件服务 (gmail, QQ, 163等) | 二选一* | - |
| `EMAIL_HOST` | SMTP 服务器地址 | 二选一* | - |
| `EMAIL_PORT` | SMTP 端口 | 否 | 587 |
| `EMAIL_SECURE` | 是否使用 SSL/TLS | 否 | false |
| `EMAIL_USER` | 邮箱账号 | 是 | - |
| `EMAIL_PASSWORD` | 邮箱密码/授权码 | 是 | - |
| `NOTIFICATION_EMAIL` | 接收通知的邮箱 | 否 | EMAIL_USER |
| `EMAIL_FROM_NAME` | 发件人显示名称 | 否 | ShredderBlades |

*注：`EMAIL_SERVICE` 和 `EMAIL_HOST` 二选一配置即可

---

## 🧪 测试邮件功能

### 1. 重启后端服务

```bash
cd app/backend
npm run dev
```

启动时应该看到：

```
✅ Database initialized successfully
✅ Email service ready: your-email@gmail.com
🚀 Server running on http://localhost:3001
```

### 2. 提交测试 Inquiry

打开前端网站，填写并提交表单。

### 3. 检查邮箱

几秒钟内，您应该在 `NOTIFICATION_EMAIL` 邮箱中收到通知邮件。

---

## 📧 邮件内容

### 管理员通知邮件

包含以下信息：
- 客户姓名
- 联系邮箱
- 电话号码
- 询问内容
- 提交时间
- 快速跳转到管理面板的按钮

### 客户确认邮件 (可选)

默认未启用。如需启用，编辑 `server.js` 取消注释：

```javascript
// 在 POST /api/inquiries 路由中
sendCustomerConfirmation(inquiryData).catch(err => {
  console.error('Customer confirmation error:', err);
});
```

---

## 🔒 安全建议

### 1. 保护 .env 文件

确保 `.env` 已添加到 `.gitignore`：

```bash
# 检查
cat .gitignore | grep .env

# 如果没有，添加
echo ".env" >> .gitignore
```

### 2. 使用应用专用密码

- ✅ 使用邮箱的应用专用密码或授权码
- ❌ 不要使用邮箱登录密码

### 3. 限制权限

- 只给必要的账号邮箱配置权限
- 定期更换密码

---

## ❓ 故障排查

### Q: 启动时显示 "Email notifications: DISABLED"

**A:** 检查 `.env` 文件中 `EMAIL_ENABLED=true`

### Q: 启动时显示 "Email configuration incomplete"

**A:** 检查以下配置：
- `EMAIL_USER` 和 `EMAIL_PASSWORD` 已填写
- `EMAIL_SERVICE` 或 `EMAIL_HOST` 至少配置一个

### Q: 启动时显示 "Email service verification failed"

**A:** 可能原因：
1. 邮箱账号或密码错误
2. 未开启 SMTP 服务
3. 使用了登录密码而非授权码
4. 防火墙阻止了 SMTP 端口

**解决方案**：
```bash
# 查看详细错误信息
npm run dev

# 常见错误：
# - "Invalid login" → 检查账号密码
# - "Connection refused" → 检查 SMTP 服务是否开启
# - "Authentication failed" → 使用授权码而非登录密码
```

### Q: 表单提交成功但没收到邮件

**A:** 检查：
1. 后端控制台是否有错误信息
2. 邮箱的垃圾箱/垃圾邮件文件夹
3. `NOTIFICATION_EMAIL` 配置是否正确

### Q: 邮件发送很慢

**A:** 这是正常的。邮件发送是异步的，不会阻塞 API 响应。用户会立即看到成功提示，邮件在后台发送。

---

## 🎨 自定义邮件模板

邮件模板位于 `emailService.js` 中。

### 修改管理员通知邮件

编辑 `sendInquiryNotification` 函数中的 HTML 模板。

### 修改客户确认邮件

编辑 `sendCustomerConfirmation` 函数中的 HTML 模板。

### 添加公司 Logo

在 HTML 中添加图片链接：

```html
<img src="https://your-domain.com/logo.png" alt="Logo" style="max-width: 200px;">
```

---

## 📊 常见邮件服务商 SMTP 配置

| 服务商 | SMTP 地址 | 端口 | 安全连接 |
|--------|-----------|------|----------|
| Gmail | smtp.gmail.com | 587 | TLS |
| QQ | smtp.qq.com | 465/587 | SSL/TLS |
| 163 | smtp.163.com | 465/994 | SSL |
| 126 | smtp.126.com | 465/994 | SSL |
| Outlook | smtp-mail.outlook.com | 587 | TLS |
| Yahoo | smtp.mail.yahoo.com | 587 | TLS |
| 阿里云企业邮 | smtp.qiye.aliyun.com | 465 | SSL |
| 腾讯企业邮 | smtp.exmail.qq.com | 465 | SSL |

---

## 🚀 生产环境建议

### 1. 使用企业邮箱

推荐使用企业邮箱而非个人邮箱：
- 阿里云企业邮箱
- 腾讯企业邮箱
- Microsoft 365

### 2. 专用发件邮箱

创建专门用于发送通知的邮箱，如：
- noreply@yourdomain.com
- notifications@yourdomain.com

### 3. 邮件队列

对于大量邮件，考虑使用：
- Redis + Bull 队列
- AWS SES
- SendGrid
- Mailgun

### 4. 监控和日志

记录邮件发送情况：
- 成功/失败数量
- 失败原因
- 发送时间

---

## 💡 高级功能

### 1. 启用客户确认邮件

在 `server.js` 中取消注释：

```javascript
sendCustomerConfirmation(inquiryData).catch(err => {
  console.error('Customer confirmation error:', err);
});
```

### 2. 添加附件

在 `emailService.js` 中添加：

```javascript
attachments: [
  {
    filename: 'brochure.pdf',
    path: './files/brochure.pdf'
  }
]
```

### 3. 使用模板引擎

安装 `handlebars` 或 `ejs` 创建可复用的模板。

### 4. 邮件统计

集成分析工具追踪打开率和点击率。

---

## 📝 示例 .env 文件

### Gmail (测试环境)

```env
PORT=3001
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=testuser@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
NOTIFICATION_EMAIL=admin@yourdomain.com
EMAIL_FROM_NAME=ShredderBlades Inquiry System
```

### 企业邮箱 (生产环境)

```env
PORT=3001
EMAIL_ENABLED=true
EMAIL_HOST=smtp.qiye.aliyun.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-secure-password
NOTIFICATION_EMAIL=sales@yourdomain.com
EMAIL_FROM_NAME=ShredderBlades
```

---

## ✅ 配置完成检查清单

- [ ] 复制 `.env.example` 为 `.env`
- [ ] 配置邮箱账号和密码
- [ ] 设置 `EMAIL_ENABLED=true`
- [ ] 设置接收通知的邮箱
- [ ] 重启后端服务
- [ ] 看到 "Email service ready" 消息
- [ ] 提交测试 inquiry
- [ ] 收到通知邮件
- [ ] 检查邮件内容和格式
- [ ] `.env` 文件已添加到 `.gitignore`

---

完成配置后，系统会在每次收到新 inquiry 时自动发送邮件通知！🎉

如有问题，查看后端控制台的错误信息或参考本文档的故障排查部分。
