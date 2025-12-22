@echo off
echo ========================================
echo GIT AUTO COMMIT AND PUSH
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Git status...
git status
echo.

echo [2/4] Adding all changes...
git add .
echo.

echo [3/4] Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message=Update: Auto commit from batch script

git commit -m "%message%"
echo.

echo [4/4] Pushing to GitHub...
git push origin main
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! Push to Git complete
    echo Vercel will auto-deploy in 2-3 minutes
    echo ========================================
    echo.
    echo Monitor deployment at:
    echo https://vercel.com/dashboard
) else (
    echo ========================================
    echo ERROR! Push failed
    echo Check your Git credentials
    echo ========================================
)

echo.
pause
