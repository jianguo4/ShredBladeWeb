#!/usr/bin/env bash
set -euo pipefail

# Simple one-click installer for CentOS/RHEL servers

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (use sudo)."
  exit 1
fi

APP_ROOT="/var/www/shredder-blade"
SRC_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_SRC="$SRC_ROOT/backend"
FRONTEND_SRC="$SRC_ROOT/frontend"
NODE_MAJOR="18"
RUN_USER="${SUDO_USER:-root}"
RUN_HOME="$(getent passwd "$RUN_USER" | cut -d: -f6)"

pkg_cmd() {
  if command -v dnf >/dev/null 2>&1; then
    echo "dnf"
  else
    echo "yum"
  fi
}

install_prereqs() {
  local PKG
  PKG="$(pkg_cmd)"
  $PKG install -y epel-release >/dev/null 2>&1 || true
  $PKG install -y rsync curl nginx >/dev/null
}

install_node_pm2() {
  if ! command -v node >/dev/null 2>&1; then
    curl -fsSL "https://rpm.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
    "$(pkg_cmd)" install -y nodejs >/dev/null
  fi
  npm install -g pm2 >/dev/null
}

sync_files() {
  mkdir -p "$APP_ROOT/backend" "$APP_ROOT/frontend"
  rsync -a --delete "$BACKEND_SRC/" "$APP_ROOT/backend/"
  rsync -a --delete "$FRONTEND_SRC/" "$APP_ROOT/frontend/"
  chown -R "$RUN_USER":"$RUN_USER" "$APP_ROOT"
  if [ ! -f "$APP_ROOT/backend/.env" ]; then
    cp "$APP_ROOT/backend/.env.example" "$APP_ROOT/backend/.env"
  fi
}

setup_backend() {
  pushd "$APP_ROOT/backend" >/dev/null
  if [ -f package-lock.json ]; then
    npm ci --omit=dev
  else
    npm install --production
  fi
  pm2 start ecosystem.config.js --env production
  pm2 startup systemd -u "$RUN_USER" --hp "$RUN_HOME" --silent
  pm2 save
  popd >/dev/null
}

setup_nginx() {
  cat >/etc/nginx/conf.d/shredder-blade.conf <<'EOF'
server {
  listen 80;
  server_name _;
  root /var/www/shredder-blade/frontend;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /admin.html {
    alias /var/www/shredder-blade/backend/admin.html;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}
EOF

  nginx -t
  systemctl enable nginx
  systemctl restart nginx
}

main() {
  install_prereqs
  install_node_pm2
  sync_files
  setup_backend
  setup_nginx
  echo "Deployment complete."
  echo "- Backend: http://127.0.0.1:3001 (proxied via Nginx /api)"
  echo "- Frontend: http://<server-ip>/"
  echo "- Edit backend env: $APP_ROOT/backend/.env"
  echo "- Manage process: pm2 status"
}

main "$@"