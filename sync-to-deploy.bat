@echo off
echo ========================================
echo Syncing Latest Code to Deploy Directory
echo ========================================
echo.

set SOURCE=app\backend
set DEST=deploy\backend

echo Copying backend files...
xcopy /Y /Q "%SOURCE%\server.js" "%DEST%\"
xcopy /Y /Q "%SOURCE%\admin.html" "%DEST%\"
xcopy /Y /Q "%SOURCE%\emailService.js" "%DEST%\"
xcopy /Y /Q "%SOURCE%\package.json" "%DEST%\"

echo.
echo Files synced:
echo  - server.js (with authentication)
echo  - admin.html (with credentials support)
echo  - emailService.js
echo  - package.json
echo.

echo Don't forget to:
echo 1. Set environment variables in Coolify:
echo    - ADMIN_USERNAME=admin
echo    - ADMIN_PASSWORD=72@DcCOe5QbxzM-N
echo    - ALLOWED_IPS= (leave empty)
echo.
echo 2. Commit and push changes:
echo    git add .
echo    git commit -m "sync: update deploy directory with authentication"
echo    git push
echo.
echo 3. Redeploy in Coolify
echo.
echo ========================================
pause
