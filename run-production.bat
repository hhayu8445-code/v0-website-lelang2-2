@echo off
cls
echo ========================================
echo   LELANGMOBIL.COM - PRODUCTION
echo   https://lelangmobil.com
echo ========================================
echo.
echo [INFO] Starting production server...
echo.
echo Server akan running di:
echo - Domain:  https://lelangmobil.com
echo - Local:   http://localhost:3000
echo - Network: http://168.110.211.50:3000
echo.
echo ========================================
echo   CLOUDFLARE DNS SETUP:
echo   A Record: @ -^> 168.110.211.50
echo   A Record: www -^> 168.110.211.50
echo   Proxy: ON (Orange Cloud)
echo ========================================
echo.
echo Press Ctrl+C to stop
echo.

npm start
