Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GIT AUTO COMMIT AND PUSH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "[1/4] Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "[2/4] Adding all changes..." -ForegroundColor Yellow
git add .
Write-Host ""

Write-Host "[3/4] Committing changes..." -ForegroundColor Yellow
$message = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Update: Auto commit $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git commit -m $message
Write-Host ""

Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Push to Git complete" -ForegroundColor Green
    Write-Host "Vercel will auto-deploy in 2-3 minutes" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Monitor deployment at:" -ForegroundColor Cyan
    Write-Host "https://vercel.com/dashboard" -ForegroundColor White
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR! Push failed" -ForegroundColor Red
    Write-Host "Check your Git credentials" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
