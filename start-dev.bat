@echo off
REM ShredderBlades 本地开发启动脚本

echo.
echo ========================================
echo  ShredderBlades 本地开发环境启动
echo ========================================
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
  echo ❌ Node.js 未安装
  echo 请从 https://nodejs.org 下载安装 Node.js
  pause
  exit /b 1
)

echo ✅ Node.js 已安装

REM 启动后端
echo.
echo 1️⃣  启动后端服务器 (Port 3001)...
cd /d "%~dp0app\backend"

REM 检查 node_modules
if not exist "node_modules" (
  echo 📦 安装后端依赖...
  call npm install
  if errorlevel 1 (
    echo ❌ 安装失败
    pause
    exit /b 1
  )
)

REM 启动后端（新窗口）
start cmd /k "cd /d %~dp0app\backend && npm run dev"

REM 等待后端启动
timeout /t 3 /nobreak

REM 启动前端
echo.
echo 2️⃣  启动前端开发服务器 (Port 5173/5174/5175)...
cd /d "%~dp0app\frontend"

REM 检查 node_modules
if not exist "node_modules" (
  echo 📦 安装前端依赖...
  call pnpm install
  if errorlevel 1 (
    echo ❌ 安装失败
    pause
    exit /b 1
  )
)

REM 启动前端（新窗口）
start cmd /k "cd /d %~dp0app\frontend && pnpm dev"

REM 等待前端启动
timeout /t 3 /nobreak

echo.
echo ========================================
echo  ✅ 启动完成！
echo ========================================
echo.
echo 📱 前端: http://localhost:5173
echo 🔌 后端 API: http://localhost:3001
echo 📊 管理面板: http://localhost:3001/admin.html
echo.
echo 💡 提示:
echo   - 关闭任一窗口会停止对应的服务
echo   - 前端会自动打开浏览器
echo   - 数据库文件: app\backend\inquiries.db
echo.
pause
