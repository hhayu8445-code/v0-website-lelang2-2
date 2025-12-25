@echo off
echo ========================================
echo IMPORT ENV TO VERCEL
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Pulling env variables from .env.vercel...
vercel env pull .env.local
echo.

echo [2/2] Deploying to production...
vercel --prod
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! Deployment complete
    echo Website: https://v0-website-lelang2-2-ecru.vercel.app
    echo ========================================
) else (
    echo ========================================
    echo ERROR! Deployment failed
    echo ========================================
)

echo.
echo Next steps:
echo 1. Buka: https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
echo 2. Manually add env variables dari .env.vercel
echo 3. Redeploy: https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/deployments
echo.

pause
