# ========================================
# AUTO DEPLOY PRODUCTION - LELANGMOBIL.COM
# Windows RDP Server: 168.110.211.50
# ========================================

Write-Host "🚀 Starting Production Deployment..." -ForegroundColor Green
Write-Host ""

# ========================================
# CONFIGURATION
# ========================================

$SERVER_IP = "168.110.211.50"
$DOMAIN = "lelangmobil.com"
$PROJECT_DIR = "C:\inetpub\wwwroot\lelangmobil"
$NODE_VERSION = "18"
$PORT = "3000"

# ========================================
# STEP 1: Install Prerequisites
# ========================================

Write-Host "📦 Step 1: Installing Prerequisites..." -ForegroundColor Cyan

# Install Chocolatey if not exists
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..."
    choco install nodejs-lts -y
    refreshenv
}

# Install Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Git..."
    choco install git -y
    refreshenv
}

# Install PM2
if (!(Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "Installing PM2..."
    npm install -g pm2
    npm install -g pm2-windows-startup
    pm2-startup install
}

Write-Host "✅ Prerequisites installed" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 2: Setup Project Directory
# ========================================

Write-Host "📁 Step 2: Setting up project directory..." -ForegroundColor Cyan

# Create project directory
if (!(Test-Path $PROJECT_DIR)) {
    New-Item -ItemType Directory -Path $PROJECT_DIR -Force
}

# Copy project files
Write-Host "Copying project files..."
Copy-Item -Path ".\*" -Destination $PROJECT_DIR -Recurse -Force -Exclude @('node_modules', '.next', '.git')

Set-Location $PROJECT_DIR

Write-Host "✅ Project directory ready" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 3: Configure Environment
# ========================================

Write-Host "⚙️  Step 3: Configuring environment..." -ForegroundColor Cyan

# Create production .env.local
$envContent = @"
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL - PRODUCTION
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://$DOMAIN/auth/callback

# Server
PORT=$PORT
NODE_ENV=production

# Email Configuration
SMTP_FROM=noreply@$DOMAIN
SMTP_FROM_NAME=LELANGMOBIL.COM
SUPPORT_EMAIL=support@$DOMAIN
ADMIN_EMAIL=admin@$DOMAIN
INFO_EMAIL=info@$DOMAIN

# SEMrush API
SEMRUSH_API_KEY=3101ad656913045c87a8ea83e1b19698
"@

Set-Content -Path ".env.local" -Value $envContent

Write-Host "✅ Environment configured" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 4: Install Dependencies
# ========================================

Write-Host "📦 Step 4: Installing dependencies..." -ForegroundColor Cyan

npm install --production=false

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 5: Build Application
# ========================================

Write-Host "🔨 Step 5: Building application..." -ForegroundColor Cyan

npm run build

Write-Host "✅ Build complete" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 6: Configure PM2
# ========================================

Write-Host "🔧 Step 6: Configuring PM2..." -ForegroundColor Cyan

# Create PM2 ecosystem file
$pm2Config = @"
{
  "apps": [{
    "name": "lelangmobil",
    "script": "node_modules/next/dist/bin/next",
    "args": "start -p $PORT",
    "cwd": "$PROJECT_DIR",
    "instances": 2,
    "exec_mode": "cluster",
    "watch": false,
    "max_memory_restart": "1G",
    "env": {
      "NODE_ENV": "production",
      "PORT": "$PORT"
    },
    "error_file": "logs/error.log",
    "out_file": "logs/output.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
    "merge_logs": true,
    "autorestart": true,
    "max_restarts": 10,
    "min_uptime": "10s"
  }]
}
"@

Set-Content -Path "ecosystem.config.json" -Value $pm2Config

# Create logs directory
New-Item -ItemType Directory -Path "logs" -Force

Write-Host "✅ PM2 configured" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 7: Configure Windows Firewall
# ========================================

Write-Host "🔥 Step 7: Configuring firewall..." -ForegroundColor Cyan

# Allow port 3000
New-NetFirewallRule -DisplayName "Next.js App" -Direction Inbound -LocalPort $PORT -Protocol TCP -Action Allow -ErrorAction SilentlyContinue

# Allow HTTP/HTTPS
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow -ErrorAction SilentlyContinue
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow -ErrorAction SilentlyContinue

Write-Host "✅ Firewall configured" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 8: Start Application
# ========================================

Write-Host "🚀 Step 8: Starting application..." -ForegroundColor Cyan

# Stop existing process
pm2 stop lelangmobil -ErrorAction SilentlyContinue
pm2 delete lelangmobil -ErrorAction SilentlyContinue

# Start with PM2
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup

Write-Host "✅ Application started" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 9: Configure Reverse Proxy (IIS)
# ========================================

Write-Host "🌐 Step 9: Configuring IIS reverse proxy..." -ForegroundColor Cyan

# Install IIS if not exists
$iisFeature = Get-WindowsFeature -Name Web-Server
if (!$iisFeature.Installed) {
    Write-Host "Installing IIS..."
    Install-WindowsFeature -Name Web-Server -IncludeManagementTools
}

# Install URL Rewrite Module
$urlRewritePath = "C:\Program Files\IIS\URL Rewrite"
if (!(Test-Path $urlRewritePath)) {
    Write-Host "Installing URL Rewrite Module..."
    $urlRewriteUrl = "https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi"
    $urlRewriteInstaller = "$env:TEMP\urlrewrite.msi"
    Invoke-WebRequest -Uri $urlRewriteUrl -OutFile $urlRewriteInstaller
    Start-Process msiexec.exe -ArgumentList "/i $urlRewriteInstaller /quiet" -Wait
}

# Install ARR (Application Request Routing)
Write-Host "Installing ARR..."
choco install iis-arr -y -ErrorAction SilentlyContinue

# Create IIS site
Import-Module WebAdministration

# Remove default site
Remove-Website -Name "Default Web Site" -ErrorAction SilentlyContinue

# Create new site
$siteName = "lelangmobil"
$sitePath = "C:\inetpub\wwwroot\lelangmobil-public"

New-Item -ItemType Directory -Path $sitePath -Force

# Create web.config for reverse proxy
$webConfig = @"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="ReverseProxyInboundRule" stopProcessing="true">
          <match url="(.*)" />
          <action type="Rewrite" url="http://localhost:$PORT/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <httpErrors errorMode="Detailed" />
  </system.webServer>
</configuration>
"@

Set-Content -Path "$sitePath\web.config" -Value $webConfig

# Create IIS site
New-Website -Name $siteName -PhysicalPath $sitePath -Port 80 -Force -ErrorAction SilentlyContinue

# Bind domain
New-WebBinding -Name $siteName -Protocol "http" -Port 80 -HostHeader $DOMAIN -ErrorAction SilentlyContinue

Write-Host "✅ IIS configured" -ForegroundColor Green
Write-Host ""

# ========================================
# STEP 10: Health Check
# ========================================

Write-Host "🏥 Step 10: Running health check..." -ForegroundColor Cyan

Start-Sleep -Seconds 5

# Check if app is running
$response = Invoke-WebRequest -Uri "http://localhost:$PORT" -UseBasicParsing -ErrorAction SilentlyContinue

if ($response.StatusCode -eq 200) {
    Write-Host "✅ Application is running!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Application may not be running correctly" -ForegroundColor Yellow
}

Write-Host ""

# ========================================
# DEPLOYMENT COMPLETE
# ========================================

Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Deployment Summary:" -ForegroundColor Cyan
Write-Host "   Server IP: $SERVER_IP"
Write-Host "   Domain: $DOMAIN"
Write-Host "   Port: $PORT"
Write-Host "   Project Dir: $PROJECT_DIR"
Write-Host "   Status: RUNNING"
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
Write-Host "   Local: http://localhost:$PORT"
Write-Host "   Public: http://$DOMAIN"
Write-Host "   IP: http://$SERVER_IP"
Write-Host ""
Write-Host "📝 Useful Commands:" -ForegroundColor Cyan
Write-Host "   View logs: pm2 logs lelangmobil"
Write-Host "   Restart: pm2 restart lelangmobil"
Write-Host "   Stop: pm2 stop lelangmobil"
Write-Host "   Status: pm2 status"
Write-Host "   Monitor: pm2 monit"
Write-Host ""
Write-Host "🎉 Your application is now LIVE!" -ForegroundColor Green
Write-Host ""
