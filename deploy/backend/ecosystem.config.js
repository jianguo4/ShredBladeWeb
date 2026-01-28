// PM2 生态系统配置文件
module.exports = {
  apps: [
    {
      name: 'shredder-blade-api',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/shredder-blade/error.log',
      out_file: '/var/log/shredder-blade/out.log',
      log_file: '/var/log/shredder-blade/combined.log',
      time: true,
      max_memory_restart: '500M',
      watch: false,
      ignore_watch: ['node_modules', 'inquiries.db', 'logs'],
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
