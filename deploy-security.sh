#!/bin/bash
# API 安全部署脚本
# 用于在服务器上部署带认证保护的后端 API

set -e  # 遇到错误立即退出

echo "========================================="
echo "  ShredBlade API 安全部署脚本"
echo "========================================="
echo ""

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误: Docker 未安装"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 docker-compose 或 docker compose
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "❌ 错误: docker-compose 未安装"
    echo "请先安装 docker-compose"
    exit 1
fi

echo "✅ Docker 已安装: $(docker --version)"
echo "✅ Docker Compose 已安装: $($DOCKER_COMPOSE --version)"
echo ""

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "📝 创建 .env 文件..."
    cp .env.example .env
    
    # 生成随机强密码
    RANDOM_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)
    
    # 在 Linux/Mac 上更新密码
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/ADMIN_PASSWORD=.*/ADMIN_PASSWORD=${RANDOM_PASSWORD}/" .env
    else
        # Linux
        sed -i "s/ADMIN_PASSWORD=.*/ADMIN_PASSWORD=${RANDOM_PASSWORD}/" .env
    fi
    
    echo "✅ .env 文件已创建"
    echo "🔑 生成的管理员密码: ${RANDOM_PASSWORD}"
    echo ""
    echo "⚠️  请保存此密码！您需要用它来访问管理面板。"
    echo ""
else
    echo "✅ .env 文件已存在"
    echo ""
fi

# 显示当前配置
echo "📋 当前配置:"
echo "----------------------------------------"
grep "ADMIN_USERNAME=" .env
echo "ADMIN_PASSWORD=******** (已隐藏)"
grep "ALLOWED_IPS=" .env
echo "----------------------------------------"
echo ""

# 询问是否继续
read -p "是否继续部署？ (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 0
fi

echo ""
echo "🔨 开始部署..."
echo ""

# 停止现有容器
echo "1️⃣ 停止现有容器..."
$DOCKER_COMPOSE down

# 构建镜像
echo ""
echo "2️⃣ 构建 Docker 镜像..."
$DOCKER_COMPOSE build --no-cache

# 启动容器
echo ""
echo "3️⃣ 启动容器..."
$DOCKER_COMPOSE up -d

# 等待容器启动
echo ""
echo "⏳ 等待服务启动..."
sleep 5

# 检查容器状态
echo ""
echo "4️⃣ 检查容器状态..."
$DOCKER_COMPOSE ps

# 检查后端日志
echo ""
echo "📋 后端服务日志（最后 20 行）:"
echo "----------------------------------------"
$DOCKER_COMPOSE logs --tail=20 backend
echo "----------------------------------------"

# 测试健康检查
echo ""
echo "5️⃣ 测试服务健康状态..."
sleep 3
if curl -f http://localhost:3001/health &> /dev/null; then
    echo "✅ 后端服务运行正常"
else
    echo "⚠️  警告: 后端服务可能未正常启动，请检查日志"
fi

echo ""
echo "========================================="
echo "  🎉 部署完成！"
echo "========================================="
echo ""
echo "📌 重要信息:"
echo ""
echo "1. 管理员凭据（请保存）:"
echo "   用户名: $(grep ADMIN_USERNAME= .env | cut -d'=' -f2)"
echo "   密码: $(grep ADMIN_PASSWORD= .env | cut -d'=' -f2)"
echo ""
echo "2. 访问地址:"
echo "   - 管理面板: https://api.shredderbladesdirect.com/"
echo "   - API 端点: https://api.shredderbladesdirect.com/api/"
echo ""
echo "3. 保护状态:"
echo "   ✅ 管理面板需要认证"
echo "   ✅ 管理 API 需要认证"
echo "   ✅ 表单提交端点公开（前端使用）"
echo ""
echo "4. 查看实时日志:"
echo "   $DOCKER_COMPOSE logs -f backend"
echo ""
echo "5. 停止服务:"
echo "   $DOCKER_COMPOSE down"
echo ""
echo "========================================="
