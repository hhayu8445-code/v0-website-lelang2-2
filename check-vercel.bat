@echo off
echo ========================================
echo CEK VERCEL DEPLOYMENT STATUS
echo ========================================
echo.

echo [1] Buka Vercel Dashboard
start https://vercel.com/azzaa-3092s-projects/v0-website-lelang2-2/deployments

echo.
echo [2] Cek Status Deployment:
echo    - Building (kuning) = Sedang build
echo    - Ready (hijau) = Sudah live
echo    - Error (merah) = Ada error
echo.

echo [3] Jika status "Ready", buka website:
start https://v0-website-lelang2-2.vercel.app

echo.
echo [4] Clear browser cache:
echo    - Tekan Ctrl+Shift+Delete
echo    - Pilih "Cached images and files"
echo    - Clear data
echo    - Refresh (Ctrl+F5)
echo.

pause
