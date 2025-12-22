@echo off
echo ========================================
echo   LELANGMOBIL.COM - Production Server
echo ========================================
echo.

echo [1/3] Checking environment...
if not exist ".env.local" (
    echo ERROR: .env.local not found!
    echo Please copy .env.example to .env.local and configure it.
    pause
    exit /b 1
)

echo [2/3] Building production...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Starting production server...
echo.
echo ========================================
echo   Server will start at:
echo   - Local:   http://localhost:3000
echo   - Network: http://168.110.211.50:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
