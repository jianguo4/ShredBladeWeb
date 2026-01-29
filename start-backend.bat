@echo off
echo ========================================
echo Starting Backend Server with Auth
echo ========================================
echo.

cd /d "%~dp0app\backend"
echo Current directory: %CD%
echo.

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server on port 3001...
echo.
echo Admin Credentials:
echo   Username: admin
echo   Password: 72@DcCOe5QbxzM-N
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js
