@echo off
cls
echo ========================================
echo   LELANGMOBIL.COM - PRODUCTION SERVER
echo   https://lelangmobil.com
echo ========================================
echo.
echo Starting production server...
echo.
echo Server akan running di:
echo - Domain:  https://lelangmobil.com
echo - Local:   http://localhost:3000
echo - Network: http://168.110.211.50:3000
echo.
echo ========================================
echo   IMPORTANT: Configure Supabase SMTP
echo   Lihat: CONFIGURE-SMTP-NOW.md
echo ========================================
echo.
echo Press Ctrl+C to stop server
echo.

npm start
