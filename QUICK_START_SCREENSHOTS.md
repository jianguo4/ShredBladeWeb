# 🎨 快速启动页面长图生成

## ⚡ 最快的方式 (Windows)

```powershell
# 在项目根目录运行此命令
.\generate-screenshots.ps1
```

它会自动：
1. ✅ 检查并安装依赖
2. ✅ 验证开发服务器连接
3. ✅ 为所有 13 个页面生成长图
4. ✅ 保存到 `app/frontend/src/images/scene/`

## 📋 前置要求

- **Node.js** 已安装
- **开发服务器运行** (在另一个终端运行 `npm run dev`)

## 🚀 三步启动流程

### 终端 1：启动开发服务器
```bash
cd app/frontend
npm run dev
```

### 终端 2：生成长图
```bash
# Windows (PowerShell)
.\generate-screenshots.ps1

# macOS / Linux
node generate-screenshots-improved.js
```

### 终端 3：查看结果
```bash
# Windows
explorer app\frontend\src\images\scene

# macOS
open app/frontend/src/images/scene

# Linux
xdg-open app/frontend/src/images/scene
```

## 📁 输出文件

所有生成的长图保存在：
```
📂 app/frontend/src/images/scene/
├── index-home-2024-02-03.png
├── about-us-2024-02-03.png
├── shredder-blades-2024-02-03.png
├── single-shaft-2024-02-03.png
├── double-shaft-2024-02-03.png
├── four-shaft-2024-02-03.png
├── metal-scrap-shears-2024-02-03.png
├── plastic-recycling-2024-02-03.png
├── ewaste-2024-02-03.png
├── tire-shredder-2024-02-03.png
├── solid-waste-rdf-2024-02-03.png
├── municipal-waste-2024-02-03.png
└── contact-us-2024-02-03.png
```

## 🎯 自定义选项

### 修改视口宽度（PowerShell）
```powershell
.\generate-screenshots.ps1 -ViewportWidth 1440
```

### 修改基础 URL
```powershell
.\generate-screenshots.ps1 -BaseUrl "http://localhost:3000"
```

### 强制重新安装依赖
```powershell
.\generate-screenshots.ps1 -InstallDeps
```

## 📊 预期时间

- **首次运行**：3-5 分钟（需要下载浏览器）
- **后续运行**：1-2 分钟
- **单页生成**：3-5 秒

## ✅ 完整文档

详见 [SCREENSHOT_GENERATION_GUIDE.md](./SCREENSHOT_GENERATION_GUIDE.md)

## 🔧 脚本文件

- `generate-screenshots.ps1` - PowerShell 启动脚本（推荐）
- `generate-screenshots-improved.js` - Node.js 主脚本
- `generate-screenshots.bat` - 批处理脚本（备选）
- `ScreenshotGenerator.html` - 网页版工具（可选）

## 💡 关键要点

1. **必须启动开发服务器** - 脚本需要从 `http://localhost:5173` 加载页面
2. **自动化** - 一次命令生成所有页面的长图
3. **可重复** - 可以多次运行更新长图
4. **高质量** - 2x 缩放确保清晰度

---

🎉 **就这么简单！** 一个命令即可生成所有页面的长图。
