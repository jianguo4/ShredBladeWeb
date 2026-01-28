@echo off
chcp 65001 >nul
echo ========================================
echo    ShredBlade Web 打包部署脚本
echo ========================================
echo.

REM 检查必要工具
where pnpm >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 pnpm，请先安装: npm install -g pnpm
    pause
    exit /b 1
)

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js，请先安装
    pause
    exit /b 1
)

echo [步骤 1/5] 清理旧的部署文件...
if exist deploy\production rmdir /s /q deploy\production
if exist deploy\frontend rmdir /s /q deploy\frontend
mkdir deploy\production
mkdir deploy\frontend
echo ✓ 清理完成
echo.

echo [步骤 2/5] 构建前端生产版本...
cd app\frontend
echo 正在执行: pnpm build
call pnpm build
if %errorlevel% neq 0 (
    echo [错误] 前端构建失败
    cd ..\..
    pause
    exit /b 1
)
cd ..\..
echo ✓ 前端构建完成
echo.

echo [步骤 3/5] 复制前端构建产物...
xcopy /E /I /Y app\frontend\dist\* deploy\frontend\
if %errorlevel% neq 0 (
    echo [错误] 前端文件复制失败
    pause
    exit /b 1
)
echo ✓ 前端文件复制完成
echo.

echo [步骤 4/5] 复制后端文件...
xcopy /Y app\backend\server.js deploy\production\
xcopy /Y app\backend\emailService.js deploy\production\
xcopy /Y app\backend\admin.html deploy\production\
xcopy /Y app\backend\package*.json deploy\production\
xcopy /Y app\backend\ecosystem.config.js deploy\production\
if exist app\backend\.env xcopy /Y app\backend\.env deploy\production\
if exist app\backend\.env.example xcopy /Y app\backend\.env.example deploy\production\
if exist app\backend\README.md xcopy /Y app\backend\README.md deploy\production\
if exist app\backend\EMAIL_SETUP.md xcopy /Y app\backend\EMAIL_SETUP.md deploy\production\
echo ✓ 后端文件复制完成
echo.

echo [步骤 5/5] 安装生产依赖...
cd deploy\production
echo 正在执行: npm install --omit=dev
call npm install --omit=dev
if %errorlevel% neq 0 (
    echo [警告] 生产依赖安装可能有问题
    cd ..\..
    pause
    exit /b 1
)
cd ..\..
echo ✓ 生产依赖安装完成
echo.

echo ========================================
echo    ✓ 打包部署完成！
echo ========================================
echo.
echo 📦 部署文件位置:
echo    - 前端: deploy\frontend\
echo    - 后端: deploy\production\
echo.
echo 📋 部署文件清单:
echo    前端:
dir /b deploy\frontend\
echo.
echo    后端:
dir /b deploy\production\
echo.
echo 🚀 下一步操作:
echo    1. 测试本地部署:
echo       cd deploy\production
echo       node server.js
echo       访问: http://localhost:3001
echo.
echo    2. 使用 PM2 生产部署:
echo       cd deploy\production
echo       pm2 start ecosystem.config.js
echo.
echo    3. 上传到服务器:
echo       使用 FTP/SFTP 上传 deploy 文件夹
echo       或参考 deploy\production\DEPLOYMENT_GUIDE_CENTOS.md
echo.
pause
