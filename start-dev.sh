#!/bin/bash
# ShredderBlades 本地开发启动脚本 (macOS/Linux)

echo ""
echo "========================================"
echo " ShredderBlades 本地开发环境启动"
echo "========================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请从 https://nodejs.org 下载安装 Node.js"
    exit 1
fi

echo "✅ Node.js 已安装"

# 启动后端
echo ""
echo "1️⃣  启动后端服务器 (Port 3001)..."
cd "$(dirname "$0")/app/backend"

if [ ! -d "node_modules" ]; then
    echo "📦 安装后端依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 安装失败"
        exit 1
    fi
fi

# 启动后端（新终端窗口）
open -a Terminal "$PWD/start-backend.sh"

# 等待后端启动
sleep 3

# 启动前端
echo ""
echo "2️⃣  启动前端开发服务器..."
cd "$(dirname "$0")/app/frontend"

if [ ! -d "node_modules" ]; then
    echo "📦 安装前端依赖..."
    pnpm install
    if [ $? -ne 0 ]; then
        echo "❌ 安装失败"
        exit 1
    fi
fi

# 启动前端（新终端窗口）
open -a Terminal "$PWD/start-frontend.sh"

echo ""
echo "========================================"
echo " ✅ 启动完成！"
echo "========================================"
echo ""
echo "📱 前端: http://localhost:5173"
echo "🔌 后端 API: http://localhost:3001"
echo "📊 管理面板: http://localhost:3001/admin.html"
echo ""
