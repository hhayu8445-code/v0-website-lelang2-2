@echo off
echo ========================================
echo GENERATE SECRET KEYS
echo ========================================
echo.

echo Generating CSRF_SECRET...
powershell -Command "$random = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_}); Write-Host 'CSRF_SECRET='$random"
echo.

echo Generating RATE_LIMIT_SECRET...
powershell -Command "$random = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_}); Write-Host 'RATE_LIMIT_SECRET='$random"
echo.

echo ========================================
echo Copy values di atas ke .env.local
echo ========================================
pause
