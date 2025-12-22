@echo off
echo ========================================
echo AUTO DEPLOY - LELANGMOBIL.COM
echo ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
if errorlevel 1 goto error

echo.
echo [2/5] Building application...
call npm run build
if errorlevel 1 goto error

echo.
echo [3/5] Stopping old process...
call pm2 stop lelangmobil 2>nul
call pm2 delete lelangmobil 2>nul

echo.
echo [4/5] Starting application...
call pm2 start npm --name "lelangmobil" -- start
call pm2 save

echo.
echo [5/5] Opening firewall port 3000...
netsh advfirewall firewall add rule name="Next.js Port 3000" dir=in action=allow protocol=TCP localport=3000 2>nul

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Application running at:
echo   - http://localhost:3000
echo   - http://168.110.211.50:3000
echo   - http://lelangmobil.com (if DNS configured)
echo.
echo Useful commands:
echo   pm2 logs lelangmobil    - View logs
echo   pm2 restart lelangmobil - Restart app
echo   pm2 stop lelangmobil    - Stop app
echo   pm2 monit               - Monitor
echo.
pause
goto end

:error
echo.
echo ERROR: Deployment failed!
echo Please check the error messages above.
pause
exit /b 1

:end
