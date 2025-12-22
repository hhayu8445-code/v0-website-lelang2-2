@echo off
echo ========================================
echo DEPLOY TO PRODUCTION
echo ========================================
echo.

echo Checking production build...
call check-production.bat
if %errorlevel% neq 0 (
    echo Build check failed! Fix errors first.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Ready to deploy!
echo ========================================
echo.
echo Choose deployment method:
echo 1. Vercel CLI (vercel --prod)
echo 2. Git Push (auto-deploy)
echo 3. Cancel
echo.

set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Deploying via Vercel CLI...
    call vercel --prod
) else if "%choice%"=="2" (
    echo.
    echo Committing and pushing to Git...
    git add .
    git commit -m "Production deployment - 100%% ready"
    git push origin main
    echo.
    echo ✓ Pushed to Git. Vercel will auto-deploy.
) else (
    echo Deployment cancelled.
)

echo.
pause
