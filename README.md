# ShredBlade Direct - Industrial Shredder Blades Website

> 🏭 B2B Platform for High-Performance Industrial Shredder Blades

[![Tech Stack](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Deployed on Coolify](https://img.shields.io/badge/Deployed%20on-Coolify-brightgreen)](https://coolify.io/)

## 🚨 重要文档

**在开始任何工作前，请务必阅读：**

📘 **[PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md)** - 项目规范与 AI Agent 工作指南

该文档包含：
- ✅ 完整技术栈定义
- ✅ 部署方式说明
- ✅ UI 设计规范
- ✅ 产品内容标准
- ✅ 开发规范
- ⛔ 明确禁止的操作

**所有开发工作必须遵循此规范，以确保一致性和避免浪费时间。**

---

## 🌐 网站链接

- **主站**: https://www.shredderbladesdirect.com
- **API**: https://api.shredderbladesdirect.com

---

## 🛠️ 技术栈

### 前端
- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式)
- shadcn/ui (UI 组件)
- React Router v6 (路由)

### 后端
- Node.js 22 + Express
- SQLite3 (数据库)
- HTTP Basic Auth (认证)
- Nodemailer (邮件)

### 部署
- 平台: Coolify
- 前端: Docker 容器（Nginx）
- 后端: Docker 容器（Node.js）
- 本地开发: start-dev.bat 脚本

---

## 📁 项目结构

```
ShredBladeWeb/
├── app/
│   ├── frontend/          # 前端源码（开发）
│   │   ├── src/
│   │   │   ├── pages/     # 页面组件
│   │   │   ├── components/# UI 组件
│   │   │   ├── utils/     # 工具函数
│   │   │   └── images/    # 图片资源
│   │   └── package.json
│   └── backend/           # 后端源码（开发）
│       ├── server.js      # 主服务器
│       ├── admin.html     # 管理面板
│       └── package.json
├── deploy/                # 部署目录（Coolify）
│   ├── frontend/          # 前端构建产物
│   └── backend/           # 后端代码
└── PROJECT_GUIDELINES.md  # 📘 项目规范（必读）
```

---

## 🚀 快速开始

### 本地开发（推荐）

```bash
.\start-dev.bat
```

启动前后端开发服务器：
- **前端**: http://localhost:5173
- **后端**: http://localhost:3001
- **管理面板**: http://localhost:3001/

### 手动启动前端

```bash
cd app/frontend
pnpm install
pnpm run dev
```

访问: http://localhost:5173

### 手动启动后端

```bash
cd app/backend
npm install
npm run dev
```

访问: http://localhost:3001

管理面板: http://localhost:3001/
- 用户名: `admin`
- 密码: 见 `.env` 文件

---

## 📦 生产部署（Coolify）

### 前置条件
- Git 仓库已推送到远程
- Coolify 已配置应用和环境变量

### 部署步骤

1. **提交代码到 Git**
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

2. **Coolify 自动部署**
   - Coolify 监听 Git 仓库变化
   - 自动构建 Docker 镜像
   - 自动部署容器

3. **使用 docker-compose.yml**
   ```yaml
   # 前端: 容器内 80 端口 → 主机 3000 端口
   # 后端: 容器内 3001 端口 → 主机 3001 端口
   # Coolify 反向代理:
   # - www.shredderbladesdirect.com → localhost:3000
   # - api.shredderbladesdirect.com → localhost:3001
   ```

4. **配置环境变量**（在 Coolify UI）
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=72@DcCOe5QbxzM-N
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=admin@example.com
   ```

5. **验证部署**
   ```bash
   # 检查前端
   curl https://www.shredderbladesdirect.com
   
   # 检查后端（需要认证）
   curl -u admin:72@DcCOe5QbxzM-N \
     https://api.shredderbladesdirect.com/api/inquiries
   ```

---

## 📖 文档索引

| 文档 | 用途 |
|------|------|
| [PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md) | **项目规范（必读）** |
| [API_SECURITY_GUIDE.md](./API_SECURITY_GUIDE.md) | API 安全配置详解 |
| [COOLIFY_DEPLOYMENT_FIX.md](./COOLIFY_DEPLOYMENT_FIX.md) | Coolify 部署指南 |
| [LOCAL_VALIDATION_RESULTS.md](./LOCAL_VALIDATION_RESULTS.md) | 本地验证结果 |
| [SEO_DOMAIN_REDIRECT_GUIDE.md](./SEO_DOMAIN_REDIRECT_GUIDE.md) | SEO 域名配置 |

---

## 🔒 安全性

- ✅ HTTP Basic Authentication 保护管理端点
- ✅ 环境变量管理敏感信息
- ✅ HTTPS 加密传输
- ✅ CORS 配置
- ✅ SQL 注入防护

---

## 🎨 设计系统

**配色**:
- 主色: `#1A365D` (深蓝)
- 强调: `#F59E0B` (琥珀)
- 背景: `#F8F9FA`, `#FFFFFF`

**字体**:
- 标题: Oswald (粗体、大写)
- 正文: 系统字体栈

详见 [PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md)

---

## 📦 产品类别

1. 塑料回收刀片 (D2/SKD11)
2. 金属回收刀片 (H13/DC53)
3. 电子废料刀片
4. 轮胎回收刀片
5. 工业废料刀片 (RDF)
6. 城市固废刀片 (MSW)

详见 [PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md)

---

## 🤝 贡献指南

1. **阅读规范**: 先阅读 [PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md)
2. **遵守约定**: 严格遵守技术栈和代码规范
3. **测试验证**: 本地测试通过后再提交
4. **提交规范**: 使用 conventional commits 格式

---

## ⚠️ 注意事项

**禁止的操作**（详见 PROJECT_GUIDELINES.md）:
- ❌ 更换技术栈（React、Express、SQLite）
- ❌ 修改部署平台（Coolify）
- ❌ 更改配色方案（除有强理由）
- ❌ 添加 B2C 功能（注册、购物车等）

---

## 📞 联系方式

- **网站**: https://www.shredderbladesdirect.com
- **邮箱**: 见 `.env` 配置

---

## 📄 许可证

专有软件 - 保留所有权利

---

**最后更新**: 2026年1月29日
