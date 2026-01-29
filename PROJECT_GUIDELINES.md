# 项目规范与 AI Agent 工作指南

> **重要**: 本文档是项目的核心规范，AI Agent 必须严格遵守。任何与本文档冲突的建议都应该被拒绝。

---

## 📋 项目概述

**项目名称**: ShredBlade Direct  
**域名**: 
- 主站: `www.shredderbladesdirect.com`
- API: `api.shredderbladesdirect.com`

**项目类型**: B2B 工业刀片销售网站（Shredder Blades）  
**目标客户**: 废物回收行业的企业客户

---

## 🛠️ 技术栈（严格执行）

### 前端技术栈
```
框架: React 18 + TypeScript
构建工具: Vite
路由: React Router v6
UI 组件: shadcn/ui (基于 Radix UI)
样式: Tailwind CSS
图标: Lucide React
语言: TypeScript (.tsx)
包管理器: pnpm
```

**禁止使用**:
- ❌ Vue.js、Angular 或其他框架
- ❌ Create React App (CRA)
- ❌ JavaScript (必须使用 TypeScript)
- ❌ npm 或 yarn (必须使用 pnpm)
- ❌ Material-UI、Ant Design 等其他 UI 库
- ❌ CSS Modules、Styled Components（使用 Tailwind）

### 后端技术栈
```
运行环境: Node.js 22
框架: Express.js
数据库: SQLite3
认证: HTTP Basic Authentication
邮件: Nodemailer
语言: CommonJS (JavaScript)
包管理器: npm
```

**禁止使用**:
- ❌ TypeScript（后端使用纯 JavaScript）
- ❌ NestJS、Koa 等其他框架
- ❌ MongoDB、MySQL、PostgreSQL（使用 SQLite）
- ❌ JWT、OAuth（使用 HTTP Basic Auth）

### 项目结构
```
ShredBladeWeb/
├── app/
│   ├── frontend/          # 前端源码（开发用）
│   │   ├── src/
│   │   │   ├── pages/     # 页面组件
│   │   │   ├── components/# UI 组件
│   │   │   ├── utils/     # 工具函数
│   │   │   └── images/    # 图片资源
│   │   ├── public/        # 公共资源
│   │   └── package.json
│   └── backend/           # 后端源码（开发用）
│       ├── server.js      # 主服务器（含认证）
│       ├── admin.html     # 管理面板
│       ├── emailService.js
│       └── package.json
└── deploy/                # 部署目录（Coolify 使用）
    ├── frontend/          # 前端构建产物
    └── backend/           # 后端代码副本
```

**重要**: 
- 开发时修改 `app/` 目录
- 部署前同步到 `deploy/` 目录
- 使用 `sync-to-deploy.bat` 脚本同步

---

## 🚀 部署方式（固定）

### 部署平台: Coolify
- **前端**: 静态文件部署
- **后端**: Docker 容器部署
- **域名配置**: 
  - 前端: `www.shredderbladesdirect.com` (带 www)
  - API: `api.shredderbladesdirect.com`

### 环境变量（必需）
```env
# 后端认证（必需）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=72@DcCOe5QbxzM-N

# 可选配置
ALLOWED_IPS=                    # IP 白名单（留空不限制）
EMAIL_USER=                     # Gmail 账号
EMAIL_PASSWORD=                 # Gmail 应用密码
NOTIFICATION_EMAIL=             # 通知邮箱
PORT=3001                       # 后端端口
NODE_ENV=production
```

### 部署流程
1. 修改 `app/` 目录中的代码
2. 运行 `sync-to-deploy.bat` 同步到 `deploy/`
3. Git 提交并推送
4. Coolify 自动部署

**禁止**:
- ❌ 建议使用 Vercel、Netlify 等其他平台
- ❌ 建议修改部署结构
- ❌ 建议使用 docker-compose（Coolify 管理）
- ❌ 建议更改域名结构

---

## 🎨 UI 设计风格（严格遵守）

### 配色方案（固定）
```css
主色调 (Primary): #1A365D (深蓝色 - 专业、工业)
次色调 (Secondary): #0f2944 (更深的蓝色)
强调色 (Accent): #F59E0B (琥珀色 - CTA 按钮)
背景色: #F8F9FA, #FFFFFF
文字色: #1F2937 (深灰), #6B7280 (中灰)
```

### 设计原则
1. **简洁专业**: B2B 工业风格，不要花哨
2. **信息层级清晰**: 使用大小、粗细、颜色区分
3. **响应式**: 移动端、平板、桌面全覆盖
4. **高性能**: 图片优化、懒加载、代码分割

### UI 组件库
- **仅使用**: shadcn/ui 组件
- **禁止**: 自行创建相同功能的组件
- **可扩展**: 基于 shadcn/ui 组件进行定制

### 字体（固定）
- **标题**: Oswald (粗体、大写)
- **正文**: 系统默认字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### 布局规范
- **最大宽度**: `max-w-7xl` (1280px)
- **间距系统**: Tailwind 默认间距
- **卡片圆角**: `rounded-none` 或 `rounded-sm`（工业风格）
- **阴影**: 少用，使用时用 `shadow-sm` 或 `shadow-md`

**禁止**:
- ❌ 修改主配色（除非有明确理由）
- ❌ 使用彩虹色、渐变色（除既定位置外）
- ❌ 添加动画效果（除 hover、transition）
- ❌ 使用卡通图标、emoji（专业风格）

---

## 📦 产品内容（核心业务）

### 主营产品
刀片类型及应用场景：

1. **塑料回收刀片**
   - 材质: D2 / SKD11
   - 硬度: 58-60 HRC
   - 特点: 锋利、少粉尘
   - 路径: `/plastic-recycling-blades`

2. **金属回收刀片**
   - 材质: H13 / DC53
   - 硬度: 高韧性
   - 特点: 抗冲击、不崩刃
   - 路径: `/metal-scrap-shears`

3. **电子废料刀片**
   - 应用: 数据销毁
   - 路径: `/ewaste-data-destruction`

4. **轮胎回收刀片**
   - 材质: 定制合金
   - 特点: 耐磨、处理钢丝
   - 路径: `/tire-shredder-knives`

5. **工业废料刀片**
   - 应用: RDF（固废衍生燃料）
   - 路径: `/solid-waste-rdf-blades`

6. **城市固废刀片**
   - 应用: MSW（城市固体废物）
   - 路径: `/solid-waste-rdf-blades-msw`

### 核心卖点（USP）
```
1. 使用寿命延长 30-50%
2. 批次一致性保证
3. 总拥有成本降低 20-40%
4. 精密加工工艺
5. 材料科学优化
```

### 目标客户
- 废物回收企业
- 工业粉碎设备运营商
- OEM 替换刀片需求
- B2B 采购（不是 B2C）

**禁止**:
- ❌ 添加其他产品类别（如家用粉碎机）
- ❌ 修改产品描述的专业性
- ❌ 使用通俗化、口语化语言
- ❌ 添加价格（B2B 询价模式）

---

## 🔒 API 安全规范（严格执行）

### 认证方式: HTTP Basic Authentication
```javascript
// 管理端点（需要认证）
GET  /                      # 管理面板
GET  /api/inquiries         # 获取询价列表
GET  /api/inquiries/:id     # 获取单个询价
PATCH /api/inquiries/:id    # 更新询价状态
DELETE /api/inquiries/:id   # 删除询价

// 公开端点（无需认证）
POST /api/inquiries         # 提交询价表单
GET  /health                # 健康检查
```

### 前端 Fetch 规范
```javascript
// 必须使用 credentials: 'include'
function getFetchOptions(options = {}) {
  return {
    ...options,
    credentials: 'include',
    headers: { ...options.headers }
  };
}

// 所有管理 API 调用必须使用此函数
fetch(url, getFetchOptions());
```

**禁止**:
- ❌ 建议使用 JWT
- ❌ 建议使用 Session
- ❌ 建议使用 OAuth
- ❌ 移除 Basic Auth（已经实现）

---

## 📝 开发规范

### 代码风格
- **TypeScript**: 严格模式，使用接口定义
- **命名规范**: 
  - 组件: PascalCase (例: `HomePage.tsx`)
  - 函数: camelCase (例: `loadInquiries`)
  - 常量: UPPER_SNAKE_CASE (例: `API_URL`)
- **导入顺序**: React → 第三方库 → 组件 → 工具 → 样式

### Git 提交规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具链
```

### 性能优化要求
1. **图片**: 使用 WebP 格式，懒加载
2. **代码分割**: 路由级别的 code splitting
3. **首屏优化**: 
   - LCP < 2.5s
   - FCP < 1.8s
   - CLS < 0.1
4. **缓存策略**: 静态资源 30 天缓存

**禁止**:
- ❌ 使用大尺寸未优化图片
- ❌ 导入整个库（如 `import * as`）
- ❌ 内联大量 CSS
- ❌ 阻塞渲染的脚本

---

## ⛔ 明确禁止的建议

### 技术选型
- ❌ 建议更换框架（React → Vue/Angular）
- ❌ 建议更换 UI 库（shadcn → Material-UI）
- ❌ 建议更换数据库（SQLite → MySQL）
- ❌ 建议更换部署平台（Coolify → Vercel）

### 架构变更
- ❌ 建议引入微服务架构
- ❌ 建议引入 GraphQL
- ❌ 建议引入复杂的状态管理（Redux）
- ❌ 建议引入服务端渲染（SSR）

### UI/UX
- ❌ 建议添加花哨动画
- ❌ 建议修改配色方案（除非有强理由）
- ❌ 建议添加音效、视频背景
- ❌ 建议使用 B2C 风格的设计

### 功能
- ❌ 建议添加用户注册系统
- ❌ 建议添加在线支付
- ❌ 建议添加购物车
- ❌ 建议添加社交媒体集成（除 SEO 必需）

---

## ✅ AI Agent 工作原则

### 响应策略
1. **先检查本文档**: 任何建议前先查阅本规范
2. **保持一致性**: 与现有代码风格保持一致
3. **拒绝违规建议**: 如建议违反规范，应明确拒绝并说明原因
4. **提供替代方案**: 在现有技术栈内提供解决方案

### 问题分类处理
| 问题类型 | 处理方式 |
|---------|---------|
| Bug 修复 | 直接修复，保持技术栈 |
| 新功能 | 检查是否符合产品定位 |
| 性能优化 | 在现有架构内优化 |
| UI 调整 | 遵守设计规范 |
| 技术升级 | 仅升级版本，不换技术 |

### 标准回答模板
```
1. 理解问题 ✅
2. 检查规范 ✅
3. 提供方案（符合规范）✅
4. 实施更改 ✅
5. 验证结果 ✅
```

### 当建议违反规范时
**回答模板**:
```
根据项目规范（PROJECT_GUIDELINES.md），
该建议不适用于本项目，因为：

[具体原因]

推荐的替代方案是：
[符合规范的方案]
```

---

## 🔄 文档更新

本文档应在以下情况更新：
1. 技术栈升级（版本号更新）
2. 新增核心功能
3. 部署方式变更
4. 设计规范调整

**更新流程**:
1. 提出变更理由
2. 更新本文档
3. Git 提交 `docs: update PROJECT_GUIDELINES`
4. 通知相关人员

---

## 📞 常见问题

### Q: 为什么不用 TypeScript 写后端？
**A**: 后端代码简单，使用 CommonJS 更直接，无需编译步骤。

### Q: 为什么用 SQLite 而不是 MySQL？
**A**: 数据量小，SQLite 足够且无需额外服务器。

### Q: 为什么用 Basic Auth 而不是 JWT？
**A**: 管理面板仅内部使用，Basic Auth 简单可靠。

### Q: 可以添加用户注册功能吗？
**A**: 不可以，这是 B2B 网站，通过询价表单联系即可。

### Q: 可以修改主色调吗？
**A**: 除非有强烈品牌原因，否则不建议修改。

---

## 📄 相关文档

- [API_SECURITY_GUIDE.md](./API_SECURITY_GUIDE.md) - API 安全配置
- [COOLIFY_DEPLOYMENT_FIX.md](./COOLIFY_DEPLOYMENT_FIX.md) - Coolify 部署
- [LOCAL_VALIDATION_RESULTS.md](./LOCAL_VALIDATION_RESULTS.md) - 本地验证
- [SEO_DOMAIN_REDIRECT_GUIDE.md](./SEO_DOMAIN_REDIRECT_GUIDE.md) - SEO 配置

---

**版本**: 1.0.0  
**创建日期**: 2026年1月29日  
**最后更新**: 2026年1月29日  
**维护者**: 项目所有者

---

> ⚠️ **警告**: 本文档具有最高优先级。任何与本文档冲突的建议或代码都应该被质疑和纠正。
