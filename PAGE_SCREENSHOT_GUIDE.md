# 📸 页面长图生成完整方案

## 🎯 概述

为网站的 **13 个页面** 自动生成高质量的长图截图，用于：
- 📱 社交媒体预览
- 📄 文档和报告
- 🎨 营销宣传
- 📊 网站监控

## 📋 生成的页面列表

| 页面 | 文件名模式 | 路由 | 说明 |
|------|-----------|------|------|
| 首页 | `index-home-*.png` | `/` | 主页面 |
| 关于我们 | `about-us-*.png` | `/about-us` | 公司信息 |
| 粉碎机刀片 | `shredder-blades-*.png` | `/shredder-blades` | 产品分类 |
| 单轴刀片 | `single-shaft-*.png` | `/single-shaft-shredder-blades` | 产品详情 |
| 双轴刀片 | `double-shaft-*.png` | `/double-shaft-shredder-blades` | 产品详情 |
| 四轴刀片 | `four-shaft-*.png` | `/four-shaft-shredder-blades` | 产品详情 |
| 金属废料剪 | `metal-scrap-shears-*.png` | `/metal-scrap-shears` | 产品系列 |
| 塑料回收 | `plastic-recycling-*.png` | `/plastic-recycling-blades` | 应用场景 |
| 电子废物销毁 | `ewaste-*.png` | `/ewaste-data-destruction` | 应用场景 |
| 轮胎粉碎 | `tire-shredder-*.png` | `/tire-shredder-knives` | 应用场景 |
| 固体废物 RDF | `solid-waste-rdf-*.png` | `/solid-waste-rdf-blades` | 应用场景 |
| 城市固体废物 | `municipal-waste-*.png` | `/solid-waste-rdf-blades-msw` | 应用场景 |
| 联系我们 | `contact-us-*.png` | `/contact-us` | 联系页面 |

**总计**: 13 个页面，每个 1200x宽的全页面长图

## 🚀 快速启动（推荐）

### 方式 1：PowerShell 脚本（最简单）

```powershell
# 在项目根目录运行
.\generate-screenshots.ps1
```

**优势**：
- ✅ 自动检查依赖
- ✅ 自动连接验证
- ✅ 彩色输出
- ✅ 完整的进度显示
- ✅ 错误自动恢复

### 方式 2：批处理脚本（备选）

```batch
generate-screenshots-quick.bat
```

**优势**：
- ✅ 双击即可运行
- ✅ 交互式界面
- ✅ 可自动打开输出目录

### 方式 3：npm 命令

```bash
# 首先安装依赖
npm run screenshots:install

# 然后生成长图
npm run screenshots
```

### 方式 4：Node.js 直接运行

```bash
node generate-screenshots-improved.js
```

## 📋 前置条件

### 必需
1. **Node.js** v14+ （检查：`node --version`）
2. **npm** v6+ （检查：`npm --version`）
3. **开发服务器** 正在 `http://localhost:5173` 运行

### 依赖包
- `puppeteer` - 浏览器自动化（首次运行自动安装）
- `fs-extra` - 文件系统操作（首次运行自动安装）

## 🔧 详细步骤

### Step 1：准备开发环境
```bash
# 进入前端目录
cd app/frontend

# 安装前端依赖
npm install

# 启动开发服务器（保持运行）
npm run dev
```

### Step 2：生成长图
```bash
# 返回项目根目录
cd ../..

# 运行生成脚本
.\generate-screenshots.ps1
```

### Step 3：查看结果
```bash
# Windows
start app\frontend\src\images\scene

# macOS
open app/frontend/src/images/scene

# Linux
xdg-open app/frontend/src/images/scene
```

## ⚙️ 自定义配置

### PowerShell 参数

```powershell
# 自定义基础 URL
.\generate-screenshots.ps1 -BaseUrl "http://192.168.1.100:5173"

# 自定义视口宽度和高度
.\generate-screenshots.ps1 -ViewportWidth 1440 -ViewportHeight 900

# 强制重新安装依赖
.\generate-screenshots.ps1 -InstallDeps

# 组合使用
.\generate-screenshots.ps1 -BaseUrl "http://localhost:3000" -ViewportWidth 1440
```

### 环境变量

```powershell
$env:BASE_URL = "http://localhost:5173"
$env:VIEWPORT_WIDTH = "1440"
$env:VIEWPORT_HEIGHT = "900"

node generate-screenshots-improved.js
```

## 📊 输出结果

### 保存位置
```
app/frontend/src/images/scene/
```

### 文件命名
- 格式：`{页面名称}-{日期}.png`
- 示例：`index-home-2024-02-03.png`
- 日期：ISO 8601 格式 (YYYY-MM-DD)

### 文件规格
- **分辨率**：1200px 宽
- **缩放**：2x（高 DPI）
- **格式**：PNG
- **质量**：95%

### 预期文件大小
- 单个长图：800KB - 3MB（取决于内容）
- 全部 13 张：约 15-25MB

## 🎨 脚本特性

### 自动化
- ✅ 自动检查和安装依赖
- ✅ 自动验证服务器连接
- ✅ 自动处理所有页面
- ✅ 自动保存到指定目录

### 容错性
- ✅ 页面加载超时自动重试
- ✅ 单个页面失败不影响其他页面
- ✅ 详细的错误报告
- ✅ 完成总结统计

### 用户体验
- ✅ 彩色输出便于阅读
- ✅ 实时进度显示
- ✅ 详细的日志信息
- ✅ 成功/失败统计

## 🐛 常见问题

### Q1：脚本无法找到 Puppeteer
```
❌ Error: Cannot find module 'puppeteer'
```

**解决方案**：
```bash
npm install puppeteer fs-extra
```

### Q2：无法连接到开发服务器
```
❌ 无法连接到服务器
```

**解决方案**：
```bash
# 检查服务器是否运行
# 如果未运行，在另一个终端执行：
cd app/frontend
npm run dev
```

### Q3：生成的长图为空白
**原因**：页面加载不完整

**解决方案**：
1. 增加等待时间（编辑脚本 `waitForTimeout` 值）
2. 检查网络连接
3. 清除浏览器缓存：删除 `node_modules` 和 `.puppeteer` 文件夹，重新运行

### Q4：脚本执行很慢
**原因**：磁盘速度、网络延迟或系统资源

**解决方案**：
1. 关闭其他应用程序
2. 确保有足够的磁盘空间（>50MB）
3. 检查网络连接质量

### Q5：Windows 执行策略错误
```
无法加载文件... 因为在此系统上禁用了脚本执行
```

**解决方案**：
```powershell
# 以管理员身份运行 PowerShell，然后执行：
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 或者使用批处理脚本代替：
generate-screenshots-quick.bat
```

## 📈 性能指标

| 项目 | 时间 | 备注 |
|------|------|------|
| 首次运行（包括下载浏览器）| 5-10 分钟 | 浏览器约 150MB |
| 后续运行 | 1-2 分钟 | 13 个页面 |
| 单页生成 | 3-5 秒 | 平均 4 秒 |
| 依赖安装 | 1-3 分钟 | 仅首次需要 |

## 🔄 自动化集成

### GitHub Actions

```yaml
name: Generate Screenshots
on: [push]
jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run dev &
      - run: sleep 5
      - run: npm run screenshots
      - uses: actions/upload-artifact@v2
        with:
          name: screenshots
          path: app/frontend/src/images/scene/
```

### 定时任务（Windows 任务计划）

1. 打开"任务计划程序"
2. 创建新任务
3. 操作：`generate-screenshots-quick.bat`
4. 触发器：每日凌晨 2:00

## 📝 脚本文件说明

| 文件 | 类型 | 说明 | 建议使用 |
|------|------|------|---------|
| `generate-screenshots.ps1` | PowerShell | 主启动脚本，功能最完整 | ⭐⭐⭐ 推荐 |
| `generate-screenshots-improved.js` | Node.js | 核心生成脚本 | ⭐⭐⭐ 推荐 |
| `generate-screenshots-quick.bat` | 批处理 | 快速启动脚本 | ⭐⭐ 备选 |
| `generate-page-screenshots.js` | Node.js | 简化版脚本 | ⭐ 基础版 |
| `ScreenshotGenerator.html` | HTML | 网页版工具 | ⭐ 实验版 |

## 💡 最佳实践

1. **定期更新**：每周或每月生成一次长图，监控网站外观变化
2. **版本管理**：将生成的长图加入 Git LFS 或分离存储
3. **文档记录**：保存生成时间和脚本版本信息
4. **自动化**：结合 CI/CD 管道自动生成
5. **备份**：定期备份生成的长图

## 🔐 安全考虑

- ✅ 脚本仅需要 npm 权限
- ✅ 无需 root 或管理员权限（除了执行策略设置）
- ✅ 不修改源代码文件
- ✅ 仅生成截图文件

## 📞 故障排除流程

1. **检查 Node.js**：`node --version`
2. **检查服务器**：访问 `http://localhost:5173`
3. **检查依赖**：`npm list puppeteer fs-extra`
4. **查看日志**：脚本输出中的错误信息
5. **重新安装**：`npm install puppeteer fs-extra`
6. **清除缓存**：删除 `node_modules`，重新运行

## 📚 相关文档

- [快速启动指南](./QUICK_START_SCREENSHOTS.md)
- [详细使用指南](./SCREENSHOT_GENERATION_GUIDE.md)
- [Puppeteer 文档](https://pptr.dev/)

## 🎉 完成

一切准备就绪！现在您可以：

```powershell
.\generate-screenshots.ps1
```

**开始为所有页面生成长图了！**

---

**最后更新**：2024-02-03  
**版本**：1.0.0  
**作者**：ShredBlade Web Team
