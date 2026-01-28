# 后端应用 Dockerfile
FROM node:22-alpine

WORKDIR /app/backend

# 复制后端 package.json
COPY app/backend/package*.json ./

# 安装生产依赖
RUN npm install --production

# 复制后端源代码
COPY app/backend/ .

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["node", "server.js"]
