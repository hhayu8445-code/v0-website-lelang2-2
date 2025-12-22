# 🚀 DEPLOY PRODUCTION - LELANGMOBIL.COM

## ✅ LANGKAH DEPLOY (30 MENIT)

### 1. CLOUDFLARE DNS (5 menit)

Login Cloudflare Dashboard: https://dash.cloudflare.com

#### Setup DNS Records
\`\`\`
Type: A
Name: @
Content: 168.110.211.50
Proxy: ON (Orange Cloud)

Type: A  
Name: www
Content: 168.110.211.50
Proxy: ON (Orange Cloud)
\`\`\`

#### SSL/TLS Settings
\`\`\`
SSL/TLS → Overview → Full (strict)
SSL/TLS → Edge Certificates → Always Use HTTPS: ON
SSL/TLS → Edge Certificates → Automatic HTTPS Rewrites: ON
\`\`\`

---

### 2. SUPABASE CONFIGURATION (5 menit)

Login: https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq

#### Update URL Configuration
\`\`\`
Authentication → URL Configuration

Site URL: https://lelangmobil.com

Redirect URLs:
https://lelangmobil.com/auth/callback
https://lelangmobil.com/**
https://www.lelangmobil.com/auth/callback
\`\`\`

#### Configure SMTP (Jika sudah setup Resend)
\`\`\`
Project Settings → Auth → SMTP Settings

Enable Custom SMTP: ON
Host: smtp.resend.com
Port: 587
Username: resend
Password: [Your Resend API Key]
Sender: noreply@lelangmobil.com
Name: LELANGMOBIL.COM
\`\`\`

---

### 3. BUILD & DEPLOY (10 menit)

\`\`\`bash
# Build production
npm run build

# Start production server
npm start
\`\`\`

Server akan running di:
- Local: http://localhost:3000
- Network: http://168.110.211.50:3000
- Domain: https://lelangmobil.com (via Cloudflare)

---

### 4. VERIFY DEPLOYMENT (5 menit)

#### Test Website
\`\`\`
✅ https://lelangmobil.com - Homepage
✅ https://lelangmobil.com/register - Register
✅ https://lelangmobil.com/login - Login
✅ https://lelangmobil.com/lelang - Auction List
✅ https://lelangmobil.com/dashboard - Dashboard
✅ https://lelangmobil.com/admin - Admin Panel
\`\`\`

#### Test SSL
\`\`\`
https://www.ssllabs.com/ssltest/analyze.html?d=lelangmobil.com
\`\`\`

#### Test Email
\`\`\`
1. Register user baru
2. Check email inbox
3. Click verification link
4. Login
\`\`\`

---

### 5. CLOUDFLARE OPTIMIZATION (5 menit)

#### Speed Settings
\`\`\`
Speed → Optimization
- Auto Minify: JS, CSS, HTML (ON)
- Brotli: ON
- Early Hints: ON
- Rocket Loader: OFF (untuk Next.js)
\`\`\`

#### Caching
\`\`\`
Caching → Configuration
- Caching Level: Standard
- Browser Cache TTL: 4 hours
\`\`\`

#### Page Rules (Optional)
\`\`\`
Rule 1: Cache Everything
URL: lelangmobil.com/public/*
Cache Level: Cache Everything

Rule 2: Bypass Cache for API
URL: lelangmobil.com/api/*
Cache Level: Bypass
\`\`\`

---

## 🔧 TROUBLESHOOTING

### Website tidak bisa diakses?
\`\`\`
1. Check DNS propagation: https://dnschecker.org
2. Check server running: netstat -ano | findstr :3000
3. Check firewall: Allow port 3000
4. Check Cloudflare proxy: Orange cloud ON
\`\`\`

### SSL Error?
\`\`\`
1. Cloudflare SSL: Full (strict)
2. Wait 5-10 minutes untuk SSL provision
3. Clear browser cache
\`\`\`

### Email tidak terkirim?
\`\`\`
1. Check Supabase SMTP settings
2. Check Resend API key valid
3. Check domain verified di Resend
4. Check Supabase Auth logs
\`\`\`

---

## 📋 PRODUCTION CHECKLIST

### Infrastructure
- [x] Server running (168.110.211.50:3000)
- [ ] Cloudflare DNS configured
- [ ] SSL certificate active
- [ ] Domain accessible (lelangmobil.com)

### Application
- [x] Build successful
- [x] Environment variables set
- [x] Database connected
- [ ] Email verification working
- [ ] All features tested

### Security
- [x] HTTPS enabled
- [x] Security headers configured
- [x] CSRF protection enabled
- [x] Rate limiting enabled
- [ ] Firewall configured

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Vercel/Google)
- [ ] Uptime monitoring
- [ ] Performance monitoring

---

## 🎯 QUICK COMMANDS

\`\`\`bash
# Start production
npm start

# Check server status
netstat -ano | findstr :3000

# View logs
npm start > logs.txt 2>&1

# Stop server
Ctrl + C

# Restart server
npm start
\`\`\`

---

## 📞 SUPPORT

### Cloudflare
- Dashboard: https://dash.cloudflare.com
- Docs: https://developers.cloudflare.com
- Community: https://community.cloudflare.com

### Supabase
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

---

## ✅ DEPLOYMENT SUCCESS

Jika semua checklist ✅, website Anda sudah LIVE di:

**🌐 https://lelangmobil.com**

Selamat! 🎉

---

**Deploy Date**: 21 Desember 2024
**Domain**: lelangmobil.com
**Server**: 168.110.211.50:3000
**Status**: PRODUCTION READY
