@echo off
cls
echo ========================================
echo   LELANGMOBIL.COM - STARTING SERVER
echo ========================================
echo.

echo [1/2] Cleaning port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

echo [2/2] Starting production server...
echo.
echo ========================================
echo   SERVER RUNNING:
echo   - Local:   http://localhost:3000
echo   - Network: http://168.110.211.50:3000
echo   - Domain:  https://lelangmobil.com
echo ========================================
echo.
echo Press Ctrl+C to stop
echo.

npm start
