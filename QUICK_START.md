# 快速参考

## 🚀 启动开发环境 (3 步)

### Windows
```
1. 双击: start-dev.bat
2. 等待浏览器打开 http://localhost:5173
3. 完成！
```

### macOS/Linux
```
chmod +x start-dev.sh
./start-dev.sh
```

---

## 📍 重要网址

| 用途 | 地址 |
|------|------|
| 前端应用 | http://localhost:5173 |
| 后端 API | http://localhost:3001 |
| **管理面板** | **http://localhost:3001/admin.html** ⭐ |
| API 文档 | http://localhost:3001 (无) |
| 数据库 | `app/backend/inquiries.db` |

---

## 🔧 手动启动

**后端 (终端 1):**
```bash
cd app/backend
npm install      # 首次
npm run dev
```

**前端 (终端 2):**
```bash
cd app/frontend
pnpm install     # 首次
pnpm dev
```

---

## 📊 查看 Inquiries 数据

### 最简单: 使用管理面板
打开 → http://localhost:3001/admin.html

### API 方式:
```bash
# 查看全部
curl http://localhost:3001/api/inquiries

# 只看新的
curl "http://localhost:3001/api/inquiries?status=new"

# 查看第 1 个
curl http://localhost:3001/api/inquiries/1
```

### 数据库方式:
使用 [SQLite Browser](https://sqlitebrowser.org/) 打开 `app/backend/inquiries.db`

---

## 🎯 Inquiry 流程

```
用户填表单 
    ↓
点击 "Send Inquiry"
    ↓
数据发送到后端 (POST /api/inquiries)
    ↓
保存到 SQLite 数据库
    ↓
显示成功信息
    ↓
在管理面板中可查看 (http://localhost:3001/admin.html)
```

---

## ⚡ 常用 API

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | /api/inquiries | 创建新 inquiry |
| GET | /api/inquiries | 获取列表 (支持过滤、排序、分页) |
| GET | /api/inquiries/:id | 获取单个 |
| PATCH | /api/inquiries/:id | 更新状态 |
| DELETE | /api/inquiries/:id | 删除 |

---

## 📝 提交 Inquiry 示例

```bash
curl -X POST http://localhost:3001/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "我想了解撕碎机刀片的规格"
  }'
```

---

## 🔄 Inquiry 状态流转

```
new (新建)
   ↓
read (已读)
   ↓
responded (已回复)
   ↓
closed (已关闭)
```

在管理面板中点击 "更新" 按钮改变状态

---

## ❌ 问题排查

| 问题 | 解决方案 |
|------|--------|
| 无法连接到后端 | 检查 `npm run dev` 是否在运行，端口 3001 是否开放 |
| 前端找不到 pnpm | 运行 `npm install -g pnpm` |
| 数据没有保存 | 检查浏览器控制台是否有错误，确保后端在运行 |
| 要清空所有数据 | 删除 `app/backend/inquiries.db` 然后重启后端 |

---

## 📂 文件位置

```
ShredBladeWeb/
├── app/
│   ├── frontend/           ← React 前端
│   │   └── src/pages/ContactUs.tsx  (已更新)
│   │
│   └── backend/            ← Node 后端 (新增)
│       ├── server.js       (API 服务器)
│       ├── admin.html      (管理面板)
│       └── inquiries.db    (数据库)
│
├── start-dev.bat           (Windows 快速启动)
├── start-dev.sh            (Mac/Linux 快速启动)
└── SETUP_GUIDE.md          (详细文档)
```

---

## 💡 下一步

1. ✅ 启动后端和前端
2. ✅ 在前端提交一个 inquiry
3. ✅ 打开管理面板查看数据: http://localhost:3001/admin.html
4. ✅ 试试更新状态、删除等操作

---

有问题? 查看 `SETUP_GUIDE.md` 获取详细说明

最后更新: 2026-01-14
