@echo off
echo ========================================
echo AUTO SETUP - EMAIL VERIFICATION
echo ========================================
echo.

echo [INFO] Script ini akan membantu Anda setup email verification
echo [INFO] Tapi Anda tetap harus jalankan SQL manual di Supabase
echo.

echo ========================================
echo STEP 1: COPY SQL SCRIPT
echo ========================================
echo.

echo SQL Script sudah disiapkan di:
echo scripts\MASTER-PRODUCTION-SETUP.sql
echo.

echo Silakan:
echo 1. Buka file: scripts\MASTER-PRODUCTION-SETUP.sql
echo 2. Copy semua isinya
echo 3. Buka: https://supabase.com/dashboard
echo 4. SQL Editor ^> New Query
echo 5. Paste script
echo 6. GANTI EMAIL di script!
echo 7. Klik Run
echo.

pause

echo.
echo ========================================
echo STEP 2: ENABLE EMAIL DI SUPABASE
echo ========================================
echo.

echo Silakan:
echo 1. Buka: https://supabase.com/dashboard
echo 2. Authentication ^> Settings
echo 3. Scroll ke "Email Auth"
echo 4. Enable "Confirm email"
echo 5. Enable "Secure email change"
echo 6. Klik Save
echo.

pause

echo.
echo ========================================
echo STEP 3: CLEAR CACHE
echo ========================================
echo.

echo Silakan:
echo 1. Tekan Ctrl+Shift+Delete
echo 2. Clear cookies ^& cache
echo 3. Close browser
echo.

pause

echo.
echo ========================================
echo STEP 4: TEST
echo ========================================
echo.

echo Starting development server...
echo.

cd /d "%~dp0"
start cmd /k "npm run dev"

echo.
echo Server started!
echo.
echo Silakan test:
echo 1. Login: http://localhost:3000/login
echo 2. Admin: http://localhost:3000/admin
echo 3. Register: http://localhost:3000/register
echo.

echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.

echo Jika semua berhasil:
echo - Admin panel bisa diakses
echo - Email verification aktif
echo - Website 100%% production ready
echo.

pause
