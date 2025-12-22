@echo off
echo ========================================
echo PRODUCTION BUILD CHECK - 100%%
echo ========================================
echo.

echo [1/5] Checking Node modules...
if not exist "node_modules" (
    echo Installing dependencies...
    call pnpm install
) else (
    echo ✓ Node modules OK
)
echo.

echo [2/5] Running TypeScript check...
call pnpm tsc --noEmit
if %errorlevel% neq 0 (
    echo ✗ TypeScript errors found!
    pause
    exit /b 1
)
echo ✓ TypeScript OK
echo.

echo [3/5] Building production...
call pnpm build
if %errorlevel% neq 0 (
    echo ✗ Build failed!
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo [4/5] Analyzing bundle size...
echo Check .next/analyze/ for bundle analysis
echo.

echo [5/5] Production build complete!
echo.
echo ========================================
echo ✓ ALL CHECKS PASSED
echo ========================================
echo.
echo Next steps:
echo 1. Run: pnpm start (test production build locally)
echo 2. Deploy: vercel --prod
echo.
pause
