@echo off
chcp 65001 >nul
cls

echo ╔════════════════════════════════════════════════════════╗
echo ║                                                        ║
echo ║     🚀 LELANGMOBIL.COM - QUICK SETUP WIZARD 🚀        ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo [1/6] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js tidak terinstall!
    echo    Download: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js terinstall
echo.

echo [2/6] Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm tidak terinstall!
    pause
    exit /b 1
)
echo ✅ npm terinstall
echo.

echo [3/6] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Install dependencies gagal!
    pause
    exit /b 1
)
echo ✅ Dependencies terinstall
echo.

echo [4/6] Checking .env.local...
if not exist ".env.local" (
    echo ⚠️  .env.local tidak ditemukan
    echo    Membuat dari .env.example...
    copy .env.example .env.local >nul
    echo ✅ .env.local dibuat
    echo.
    echo ⚠️  PENTING: Edit .env.local dan isi semua values!
    echo    Buka: SETUP-GUIDE.md untuk panduan lengkap
    echo.
    pause
) else (
    echo ✅ .env.local sudah ada
)
echo.

echo [5/6] Generating secret keys...
echo.
echo CSRF_SECRET:
powershell -Command "$random = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_}); Write-Host $random"
echo.
echo RATE_LIMIT_SECRET:
powershell -Command "$random = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_}); Write-Host $random"
echo.
echo ⚠️  Copy keys di atas ke .env.local
echo.
pause

echo [6/6] Setup selesai!
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                   NEXT STEPS:                          ║
echo ╠════════════════════════════════════════════════════════╣
echo ║                                                        ║
echo ║  1. Buka SETUP-GUIDE.md                               ║
echo ║  2. Setup Supabase (15 menit)                         ║
echo ║  3. Edit .env.local dengan API keys                   ║
echo ║  4. Run: npm run dev                                  ║
echo ║  5. Test: http://localhost:3000                       ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo Ingin langsung run dev server? (Y/N)
set /p choice="> "
if /i "%choice%"=="Y" (
    echo.
    echo Starting development server...
    echo Buka: http://localhost:3000
    echo.
    npm run dev
) else (
    echo.
    echo Setup selesai! Run 'npm run dev' untuk start server.
    pause
)
