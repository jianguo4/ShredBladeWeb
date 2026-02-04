# 🚀 开始使用页面长图生成工具

## ⚡ 最快的 3 步

### 步骤 1：启动开发服务器（需要一个终端）
```powershell
cd app/frontend
npm run dev
```
**保持此终端运行！**

### 步骤 2：生成长图（另一个终端）
```powershell
# 返回项目根目录
cd ../..

# 运行生成脚本
.\generate-screenshots.ps1
```

### 步骤 3：完成！
长图已保存到 `app/frontend/src/images/scene/`

---

## ✅ 前置条件

```powershell
# 检查 Node.js
node --version      # 应该显示 v14+

# 检查 npm
npm --version       # 应该显示 v6+
```

如果没有安装，请从 https://nodejs.org 下载

---

## 📊 你将获得

13 个高质量长图：
- ✅ 首页
- ✅ 关于我们
- ✅ 粉碎机刀片（4 个版本）
- ✅ 金属、塑料、电子、轮胎、固体废物等产品页面
- ✅ 联系我们

---

## 📁 输出位置

```
app/frontend/src/images/scene/
```

---

## 🎯 其他运行方式

### 使用批处理文件（Windows）
```
generate-screenshots-quick.bat
```

### 使用 npm
```bash
npm run screenshots
```

### 使用 Node.js
```bash
node generate-screenshots-improved.js
```

---

## 🆘 遇到问题？

### "无法连接到开发服务器"
→ 确保 `npm run dev` 在另一个终端运行

### "找不到 Puppeteer"
→ 运行 `npm install puppeteer fs-extra`

### "PowerShell 无法执行脚本"
→ 以管理员身份运行 PowerShell 并执行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📚 需要更多帮助？

- **快速查看卡** → [QUICK_REFERENCE.txt](./QUICK_REFERENCE.txt)
- **详细教程** → [QUICK_START_SCREENSHOTS.md](./QUICK_START_SCREENSHOTS.md)
- **完整指南** → [PAGE_SCREENSHOT_GUIDE.md](./PAGE_SCREENSHOT_GUIDE.md)
- **问题解决** → [SCREENSHOT_GENERATION_GUIDE.md](./SCREENSHOT_GENERATION_GUIDE.md)
- **文档索引** → [SCREENSHOT_INDEX.md](./SCREENSHOT_INDEX.md)

---

## ⏱️ 需要多长时间？

- **首次运行**：5-10 分钟（需要下载浏览器）
- **后续运行**：1-2 分钟
- **单个页面**：3-5 秒

---

**就这样！** 🎉 一个命令生成所有页面的长图！

```powershell
.\generate-screenshots.ps1
```
