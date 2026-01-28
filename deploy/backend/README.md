# ShredderBlades Backend API

本地运行的 Inquiry 管理系统后端

## ✨ 功能特性

- ✅ REST API 端点
- ✅ SQLite 本地数据库
- ✅ 数据验证
- ✅ CORS 支持
- ✅ **邮件通知** (新增)

## 安装

```bash
cd app/backend
npm install
```

## 📧 邮件通知配置

系统支持自动邮件通知功能。详细配置请查看 [EMAIL_SETUP.md](EMAIL_SETUP.md)

快速配置：

1. 复制 `.env.example` 为 `.env`
2. 填写邮箱配置
3. 设置 `EMAIL_ENABLED=true`
4. 重启服务

```bash
cp .env.example .env
# 编辑 .env 文件
npm run dev
```

## 启动服务器

**开发模式（自动重启）：**
```bash
npm run dev
```

**生产模式：**
```bash
npm start
```

服务器将运行在 `http://localhost:3001`

## 数据库

- **类型**: SQLite (本地文件)
- **位置**: `app/backend/inquiries.db`
- **表**: `inquiries`

## API 端点

### 1. 创建 Inquiry (创建新的询问)
```
POST /api/inquiries
Content-Type: application/json

{
  "name": "张三",
  "phone": "+86 138 0013 8888",
  "email": "zhangsan@example.com",
  "message": "我需要咨询关于撕碎机刀片的信息..."
}

响应:
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "id": 1,
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "我需要咨询关于撕碎机刀片的信息...",
    "created_at": "2026-01-14T10:30:00.000Z",
    "status": "new"
  }
}
```

### 2. 获取所有 Inquiries
```
GET /api/inquiries?status=new&sort=created_at&order=DESC&limit=50&offset=0

查询参数:
- status: 可选，过滤状态 (new, read, responded, closed)
- sort: 排序字段 (created_at, name, email, status)
- order: 排序顺序 (ASC 或 DESC)
- limit: 每页数量 (默认 50)
- offset: 分页偏移 (默认 0)

响应:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "phone": "+86 138 0013 8888",
      "email": "zhangsan@example.com",
      "message": "...",
      "created_at": "2026-01-14T10:30:00.000Z",
      "status": "new"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```

### 3. 获取单个 Inquiry
```
GET /api/inquiries/:id

响应:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "...",
    "created_at": "2026-01-14T10:30:00.000Z",
    "status": "new"
  }
}
```

### 4. 更新 Inquiry 状态
```
PATCH /api/inquiries/:id
Content-Type: application/json

{
  "status": "read"
}

状态选项: new, read, responded, closed

响应:
{
  "success": true,
  "message": "Inquiry status updated"
}
```

### 5. 删除 Inquiry
```
DELETE /api/inquiries/:id

响应:
{
  "success": true,
  "message": "Inquiry deleted"
}
```

### 6. 健康检查
```
GET /health

响应:
{
  "status": "ok",
  "message": "Server is running"
}
```

## 使用示例

### cURL 创建 Inquiry
```bash
curl -X POST http://localhost:3001/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "phone": "+86 138 0013 8888",
    "email": "zhangsan@example.com",
    "message": "我对贵公司的撕碎机刀片感兴趣"
  }'
```

### cURL 获取所有 Inquiries
```bash
curl http://localhost:3001/api/inquiries
```

### cURL 更新 Inquiry 状态
```bash
curl -X PATCH http://localhost:3001/api/inquiries/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "responded"}'
```

## 文件结构

```
app/backend/
├── server.js              # 主服务器文件
├── inquiries.db          # SQLite 数据库（自动生成）
├── package.json          # 依赖配置
└── README.md             # 本文件
```

## 日志

服务器启动时会显示：
- 服务器地址和端口
- 数据库文件位置
- 成功/失败信息

## 下一步

1. 启动前端开发服务器（在 app/frontend）
2. 更新前端代码以调用这些 API
3. 访问 http://localhost:3000 查看前端
4. 访问 http://localhost:3001/api/inquiries 查看 API 响应
