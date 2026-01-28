# 完整设置和使用指南

## 项目结构

```
ShredBladeWeb/
├── app/
│   ├── frontend/          # React 前端
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   └── ContactUs.tsx    # 修改过，现在连接到后端
│   │   │   └── ...
│   │   └── package.json
│   │
│   └── backend/           # Node.js 后端 (新增)
│       ├── server.js      # Express 服务器
│       ├── inquiries.db   # SQLite 数据库 (自动创建)
│       ├── admin.html     # 管理查询面板
│       ├── package.json
│       └── README.md
│
├── start-dev.bat          # Windows 启动脚本
└── start-dev.sh           # macOS/Linux 启动脚本
```

## 快速开始

### 方法 1: 自动启动 (推荐)

**Windows:**
```bash
双击 start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### 方法 2: 手动启动

**终端 1 - 启动后端:**
```bash
cd app/backend
npm install      # 首次运行
npm run dev      # 或 npm start
```

输出应该显示:
```
🚀 Server running on http://localhost:3001
📊 Database: .../app/backend/inquiries.db
```

**终端 2 - 启动前端:**
```bash
cd app/frontend
pnpm install     # 首次运行
pnpm dev         # 启动开发服务器
```

输出应该显示:
```
VITE ... ready in ... ms

➜  Local:   http://localhost:5173
```

## 使用说明

### 提交 Inquiry

1. 打开前端: http://localhost:5173
2. 点击导航菜单 "Contact Us" 或 "Get a Trial Order Quote"
3. 填写表单:
   - 名字
   - 电话
   - 邮箱
   - 消息
4. 点击 "Send Inquiry" 按钮
5. 看到成功消息表示数据已保存到数据库

### 查看 Inquiries

**方法 1: 使用管理面板 (推荐)**
1. 打开: http://localhost:3001/admin.html
2. 查看所有 inquiries 列表
3. 功能:
   - 按状态、名字、邮箱、日期过滤
   - 查看详细信息
   - 更新状态 (新建 → 已读 → 已回复 → 已关闭)
   - 删除记录
   - 分页浏览

**方法 2: 直接调用 API**

```bash
# 获取所有 inquiries
curl http://localhost:3001/api/inquiries

# 获取特定状态的 inquiries
curl "http://localhost:3001/api/inquiries?status=new"

# 获取特定 ID 的 inquiry
curl http://localhost:3001/api/inquiries/1
```

**方法 3: 查看数据库文件**

数据库位置: `app/backend/inquiries.db`

使用 SQLite 浏览器打开:
- [SQLite Browser](https://sqlitebrowser.org/)
- VSCode 扩展: "SQLite" 或 "SQLite Viewer"

## API 端点完整说明

### POST /api/inquiries - 创建新 Inquiry

```bash
curl -X POST http://localhost:3001/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "我对贵公司的产品感兴趣"
  }'
```

响应:
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "id": 1,
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "我对贵公司的产品感兴趣",
    "created_at": "2026-01-14T10:30:00.000Z",
    "status": "new"
  }
}
```

### GET /api/inquiries - 获取 Inquiries 列表

```bash
# 基本请求
curl http://localhost:3001/api/inquiries

# 带过滤和排序
curl "http://localhost:3001/api/inquiries?status=new&sort=created_at&order=DESC&limit=50&offset=0"
```

查询参数:
- `status`: 筛选状态 (new, read, responded, closed)
- `sort`: 排序字段 (created_at, name, email, status)
- `order`: 排序顺序 (ASC, DESC)
- `limit`: 每页数量 (默认50)
- `offset`: 分页偏移 (默认0)

### GET /api/inquiries/:id - 获取单个 Inquiry

```bash
curl http://localhost:3001/api/inquiries/1
```

### PATCH /api/inquiries/:id - 更新 Inquiry 状态

```bash
curl -X PATCH http://localhost:3001/api/inquiries/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

状态转换流程:
```
new (新建) → read (已读) → responded (已回复) → closed (已关闭)
```

### DELETE /api/inquiries/:id - 删除 Inquiry

```bash
curl -X DELETE http://localhost:3001/api/inquiries/1
```

### GET /health - 健康检查

```bash
curl http://localhost:3001/health
```

## 常见问题

### Q: 启动前端时出错 "找不到 pnpm"
**A:** 安装 pnpm
```bash
npm install -g pnpm
```

### Q: "连接被拒绝" 或 "无法连接到 localhost:3001"
**A:** 后端服务器未运行，确保:
1. 终端中运行了 `npm run dev`
2. 看到 "Server running on http://localhost:3001"
3. 检查防火墙是否阻止了 3001 端口

### Q: 刷新管理面板后数据不见了
**A:** 这是前端缓存的问题。数据存储在数据库中:
1. 打开 http://localhost:3001/admin.html
2. 点击 "刷新" 按钮重新加载
3. 或使用 `curl http://localhost:3001/api/inquiries` 验证数据

### Q: 如何重置数据库?
**A:** 删除数据库文件并重启服务器:
```bash
# 删除数据库文件
rm app/backend/inquiries.db
# 或 Windows:
del app\backend\inquiries.db

# 重启后端服务器，会自动创建新数据库
```

### Q: 如何在生产环境部署?
**A:** 参考 [DEPLOYMENT.md](./DEPLOYMENT.md) (待创建)

## 数据库架构

### inquiries 表

```sql
CREATE TABLE inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new'
)
```

字段说明:
- `id`: 自增主键
- `name`: 客户名字
- `phone`: 电话号码
- `email`: 邮箱地址
- `message`: 询问内容
- `created_at`: 创建时间 (自动)
- `status`: 处理状态 (new/read/responded/closed)

## 停止服务

**Windows:**
- 在对应的 cmd 窗口中按 `Ctrl+C`

**macOS/Linux:**
- 在对应的终端中按 `Ctrl+C`

## 开发提示

### 监听文件变更自动重启后端

后端已配置 `--watch` 标志，修改 `server.js` 会自动重启

### 前端热更新

Vite 已启用 HMR，修改 React 代码会自动刷新浏览器

### 调试

使用浏览器开发工具:
- 打开 http://localhost:5173
- 按 F12 打开开发工具
- Network 标签查看 API 调用
- Console 标签查看错误信息

## 后续功能

### 已实现
✅ 用户提交 inquiry 表单
✅ 后端存储到 SQLite 数据库
✅ 管理面板查看和管理 inquiries
✅ 状态管理 (new → read → responded → closed)
✅ 数据验证 (邮箱格式, 必填字段)

### 可选功能 (待实现)
- [ ] 邮件通知 (提交后自动发邮件给管理员)
- [ ] 用户账号系统 (只有注册用户才能查看自己的 inquiries)
- [ ] 更高级的报表 (按日期统计, 来源分析)
- [ ] WebSocket 实时更新 (新 inquiry 提交时实时通知)
- [ ] 分配给销售人员的工作流

## 技术栈

**前端:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

**后端:**
- Node.js
- Express.js
- SQLite3
- CORS
- Body Parser

## 联系信息

有问题? 查看:
1. 后端 README: `app/backend/README.md`
2. 前端 README: `app/frontend/README.md`
3. API 文档: 本文件的 API 部分

---

最后更新: 2026-01-14
