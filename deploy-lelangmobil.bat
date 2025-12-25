@echo off
echo ========================================
echo DEPLOY KE LELANGMOBIL.COM
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Login ke Vercel...
vercel login
echo.

echo [2/3] Link ke project lelangmobil...
vercel link --project=lelangmobil --scope=hah-cc4988b5 --yes
echo.

echo [3/3] Deploy ke production...
vercel --prod
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! Deploy complete
    echo Website: https://lelangmobil.vercel.app
    echo ========================================
) else (
    echo ========================================
    echo ERROR! Deploy failed
    echo ========================================
)

echo.
pause
