# ✅ 完整解决方案 - Inquiry 管理系统

## 📋 概述

已为您的 ShredderBlades 网站创建了完整的 **本地 Inquiry 记录和查询系统**。

### 核心功能
✅ 用户通过前端表单提交 inquiry  
✅ 后端自动保存到本地数据库 (SQLite)  
✅ 提供美观的管理面板查看和管理所有 inquiries  
✅ 支持状态管理、过滤、搜索、删除等操作  
✅ 完整的 REST API 接口  

---

## 📦 新增内容

### 后端项目 (`app/backend/`)
```
app/backend/
├── server.js         ← Express API 服务器 (所有功能代码)
├── admin.html        ← 管理查询面板 (UI 界面)
├── package.json      ← 依赖配置
├── inquiries.db      ← SQLite 数据库 (自动生成，首次运行创建)
└── README.md         ← 后端详细文档
```

### 启动脚本 (项目根目录)
```
├── start-dev.bat     ← Windows 一键启动
├── start-dev.sh      ← macOS/Linux 启动脚本
├── QUICK_START.md    ← 快速开始指南 ⭐ 从这里开始
├── SETUP_GUIDE.md    ← 完整设置文档
└── IMPLEMENTATION.md ← 本文件 (技术实现细节)
```

### 前端修改
```
app/frontend/src/pages/ContactUs.tsx
- handleSubmit 函数已修改，现在会向后端 API 发送数据
- 表单数据保存到 http://localhost:3001/api/inquiries
```

---

## 🎯 快速开始 (3 步)

### Windows 用户
```
1. 在项目根目录双击: start-dev.bat
2. 等待浏览器自动打开
3. 完成！
```

### macOS/Linux 用户
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### 手动启动 (2 个终端)
```bash
# 终端 1 - 后端
cd app/backend
npm install      # 首次
npm run dev

# 终端 2 - 前端
cd app/frontend
pnpm install     # 首次
pnpm dev
```

---

## 🌐 访问地址

| 功能 | 地址 |
|------|------|
| **前端网站** | http://localhost:5173 |
| **管理面板** ⭐ | http://localhost:3001/admin.html |
| 后端 API | http://localhost:3001/api/inquiries |

---

## 📊 使用流程

### 1️⃣ 用户提交 Inquiry

1. 打开前端: http://localhost:5173
2. 导航到 "Contact Us" 页面
3. 填写表单（名字、电话、邮箱、消息）
4. 点击 "Send Inquiry"
5. 看到成功提示 ✅

### 2️⃣ 查看 Inquiries

打开管理面板: **http://localhost:3001/admin.html**

功能：
- 📋 查看所有 inquiries 列表
- 🔍 按状态/名字/邮箱过滤
- 📊 统计数据 (总数、新建、已读、已回复)
- 👁️ 查看详细信息
- 📝 更新状态 (new → read → responded → closed)
- 🗑️ 删除记录
- 📄 分页浏览

### 3️⃣ 更新状态

在管理面板中：
1. 点击任意 inquiry 的 "更新" 按钮
2. 选择新状态：
   - `new`: 新建
   - `read`: 已读
   - `responded`: 已回复
   - `closed`: 已关闭
3. 保存

---

## 🔌 API 端点完整列表

### 创建 Inquiry
```bash
POST http://localhost:3001/api/inquiries

请求体:
{
  "name": "张三",
  "phone": "+86 138 0013 8888",
  "email": "zhangsan@example.com",
  "message": "我想了解撕碎机刀片"
}

响应:
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "id": 1,
  "data": { ... }
}
```

### 获取 Inquiries 列表
```bash
GET http://localhost:3001/api/inquiries

查询参数:
- status: 过滤状态 (new, read, responded, closed)
- sort: 排序字段 (created_at, name, email, status)
- order: 排序顺序 (ASC, DESC)
- limit: 每页数量 (默认50)
- offset: 分页偏移 (默认0)

示例:
GET http://localhost:3001/api/inquiries?status=new&sort=created_at&order=DESC&limit=20&offset=0
```

### 获取单个 Inquiry
```bash
GET http://localhost:3001/api/inquiries/:id
```

### 更新 Inquiry 状态
```bash
PATCH http://localhost:3001/api/inquiries/:id

请求体:
{ "status": "read" }
```

### 删除 Inquiry
```bash
DELETE http://localhost:3001/api/inquiries/:id
```

---

## 💾 数据库

### 位置
```
app/backend/inquiries.db
```

### 表结构
```sql
CREATE TABLE inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,    -- 自增ID
  name TEXT NOT NULL,                      -- 客户名字
  phone TEXT NOT NULL,                     -- 电话号码
  email TEXT NOT NULL,                     -- 邮箱
  message TEXT NOT NULL,                   -- 询问内容
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
  status TEXT DEFAULT 'new'                -- 状态
)
```

### 查看数据库

#### 方式 1: SQLite 浏览器 (推荐)
1. 下载 [SQLite Browser](https://sqlitebrowser.org/)
2. 打开 `app/backend/inquiries.db`
3. 查看 `inquiries` 表

#### 方式 2: 命令行
```bash
sqlite3 app/backend/inquiries.db
> SELECT * FROM inquiries;
> .tables
```

#### 方式 3: VSCode 扩展
- 安装扩展: "SQLite" 或 "SQLite Viewer"
- 右键点击 `inquiries.db` → "Open Database"

---

## 🔧 技术架构

### 前端
- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **UI**: shadcn/ui 组件库
- **打包**: Vite 5
- **变更**: 只修改了 `ContactUs.tsx` 的表单提交逻辑

### 后端
- **运行时**: Node.js
- **框架**: Express.js
- **数据库**: SQLite3
- **中间件**: CORS, Body Parser
- **开发**: 支持文件监听自动重启 (`--watch` 标志)

### 通信
- **协议**: HTTP REST
- **格式**: JSON
- **跨域**: CORS 已启用 (前端 5173 可访问后端 3001)

---

## 📝 文件清单

### 新增文件
- ✅ `app/backend/server.js` - 完整的 Express API 服务器
- ✅ `app/backend/admin.html` - 管理查询面板 UI
- ✅ `app/backend/package.json` - 后端依赖
- ✅ `app/backend/README.md` - 后端文档
- ✅ `start-dev.bat` - Windows 启动脚本
- ✅ `start-dev.sh` - macOS/Linux 启动脚本
- ✅ `QUICK_START.md` - 快速开始指南
- ✅ `SETUP_GUIDE.md` - 详细设置文档
- ✅ `IMPLEMENTATION.md` - 本文件

### 修改文件
- ✅ `app/frontend/src/pages/ContactUs.tsx` - 更新 handleSubmit 函数

### 自动生成文件
- 📝 `app/backend/inquiries.db` - SQLite 数据库 (首次运行时创建)

---

## ❓ 常见问题

### Q: 如何确认后端是否运行?
```bash
# 在浏览器中打开或使用 curl
curl http://localhost:3001/health

# 应该看到:
{ "status": "ok", "message": "Server is running" }
```

### Q: 表单提交后如何确认数据已保存?
1. 提交表单后看到绿色成功消息
2. 打开管理面板: http://localhost:3001/admin.html
3. 应该能看到新增的记录

### Q: 如何重置所有数据?
```bash
# 删除数据库文件
rm app/backend/inquiries.db
# 或 Windows PowerShell:
Remove-Item app/backend/inquiries.db

# 重启后端服务器，会自动创建新数据库
```

### Q: 管理面板打不开?
检查：
1. 后端服务器是否在运行 (看到 "Server running on http://localhost:3001")
2. 防火墙是否阻止了 3001 端口
3. 浏览器控制台是否有错误信息 (F12 → Console)

### Q: 提交表单时出错 "Cannot connect to localhost:3001"
确保：
1. 后端服务器在运行 (`npm run dev`)
2. 网络连接正常
3. 防火墙允许 3001 端口

### Q: 如何在生产环境部署?
详见 [部署指南](./DEPLOYMENT.md) (待创建)

---

## 🚀 下一步功能 (可选)

当前已实现的核心功能：
- ✅ 提交 inquiry 表单
- ✅ 存储到数据库
- ✅ 查看和管理数据
- ✅ 状态流转
- ✅ 删除记录

可选的增强功能：
- 📧 邮件通知 (提交成功/已回复时自动发邮件)
- 👤 用户账号系统 (用户可查看自己的 inquiries)
- 📊 高级报表 (按日期/来源/类型统计)
- 🔄 WebSocket (新 inquiry 时实时通知)
- 🔐 管理员认证 (保护管理面板)
- 📱 移动端界面 (管理面板响应式设计)
- 🏷️ 标签/分类 (为 inquiries 添加标签)

---

## 📞 技术支持

遇到问题？按以下步骤排查：

1. **查看文档**
   - `QUICK_START.md` - 快速问题
   - `SETUP_GUIDE.md` - 详细说明
   - `app/backend/README.md` - API 文档

2. **检查日志**
   - 后端终端输出
   - 浏览器控制台 (F12 → Console)
   - 浏览器 Network 标签

3. **常见错误**
   - "Cannot find module": 运行 `npm install`
   - "EADDRINUSE": 端口被占用，改成其他端口
   - "Cannot connect": 检查后端是否运行

4. **测试 API**
   ```bash
   # 健康检查
   curl http://localhost:3001/health
   
   # 获取所有数据
   curl http://localhost:3001/api/inquiries
   ```

---

## 📋 检查清单

使用以下清单确认一切正常：

- [ ] 后端运行成功 (看到 "Server running")
- [ ] 前端运行成功 (看到网站)
- [ ] 可以填表单和提交
- [ ] 提交后看到成功提示
- [ ] 管理面板可以打开和看到数据
- [ ] 可以在管理面板中更新状态
- [ ] 可以删除记录
- [ ] 停止后端再重启，数据仍然存在

---

## 🎓 学习资源

- [Express.js 文档](https://expressjs.com/)
- [SQLite 文档](https://www.sqlite.org/docs.html)
- [React 文档](https://react.dev/)
- [REST API 最佳实践](https://restfulapi.net/)

---

## 📄 许可证

MIT License

---

**最后更新**: 2026-01-14  
**版本**: 1.0.0  
**状态**: ✅ 完成并测试就绪

---

## 总结

您现在有了一个完整的本地 Inquiry 管理系统：

1. **前端** - 用户通过网站提交 inquiry ✅
2. **后端** - 自动保存到数据库 ✅
3. **管理面板** - 查看和管理所有数据 ✅
4. **API** - 完整的 REST 接口 ✅

只需一个命令即可启动完整系统！

```bash
# Windows
start-dev.bat

# macOS/Linux
./start-dev.sh
```

🎉 **系统就绪，可以开始使用了！**
