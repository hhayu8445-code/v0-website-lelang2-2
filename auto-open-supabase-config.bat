@echo off
echo ============================================
echo AUTO OPEN SUPABASE CONFIGURATION PAGES
echo ============================================
echo.
echo Opening Supabase Dashboard pages...
echo.

REM Open Authentication Settings
echo [1/3] Opening Authentication Settings...
start "" "https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/settings"
timeout /t 2 /nobreak >nul

REM Open Email Templates
echo [2/3] Opening Email Templates...
start "" "https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/templates"
timeout /t 2 /nobreak >nul

REM Open URL Configuration
echo [3/3] Opening URL Configuration...
start "" "https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/url-configuration"
timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo PAGES OPENED IN BROWSER
echo ============================================
echo.
echo STEP 1: Authentication Settings
echo   - Enable email confirmations: ON
echo   - Secure email change: ON
echo   - Click "Save"
echo.
echo STEP 2: Email Templates
echo   - Select "Confirm signup"
echo   - From email: onboarding@resend.dev
echo   - Click "Save"
echo.
echo STEP 3: URL Configuration
echo   - Site URL: https://www.lelangmobil.com
echo   - Redirect URLs: https://www.lelangmobil.com/auth/callback
echo   - Redirect URLs: https://www.lelangmobil.com/**
echo   - Redirect URLs: https://v0-website-lelang2-2.vercel.app/auth/callback
echo   - Redirect URLs: https://v0-website-lelang2-2.vercel.app/**
echo   - Click "Save"
echo.
echo ============================================
echo DONE! Complete the 3 steps in browser.
echo ============================================
echo.
pause
