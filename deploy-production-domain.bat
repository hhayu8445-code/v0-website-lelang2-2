@echo off
echo ========================================
echo   LELANGMOBIL.COM - PRODUCTION DEPLOY
echo   Domain: https://lelangmobil.com
echo ========================================
echo.

echo [1/5] Checking environment...
if not exist ".env.local" (
    echo ERROR: .env.local not found!
    pause
    exit /b 1
)

echo [2/5] Installing dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ERROR: Install failed!
    pause
    exit /b 1
)

echo.
echo [3/5] Building production...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [4/5] Starting production server...
echo.
echo ========================================
echo   SERVER RUNNING:
echo   - Domain:  https://lelangmobil.com
echo   - Local:   http://localhost:3000
echo   - Network: http://168.110.211.50:3000
echo ========================================
echo.
echo [5/5] Configure Cloudflare:
echo   1. Point DNS A record to: 168.110.211.50
echo   2. Enable Cloudflare Proxy (Orange Cloud)
echo   3. SSL/TLS: Full (strict)
echo   4. Always Use HTTPS: ON
echo.
echo Press Ctrl+C to stop server
echo.

call npm start
