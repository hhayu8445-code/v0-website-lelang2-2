# 🚀 QUICK DEPLOY - RDP Windows Server

## ⚡ CARA TERCEPAT (5 Menit)

### 1. Buka PowerShell sebagai Administrator
\`\`\`
Klik kanan Start Menu → Windows PowerShell (Admin)
\`\`\`

### 2. Navigate ke project folder
\`\`\`powershell
cd "C:\Users\MUDDING UNDERGROUND\Documents\Ableton\website Lelang"
\`\`\`

### 3. Jalankan deploy script
\`\`\`powershell
.\deploy.bat
\`\`\`

Script akan otomatis:
- ✅ Install dependencies
- ✅ Build aplikasi
- ✅ Start dengan PM2
- ✅ Configure firewall
- ✅ Auto-restart on reboot

### 4. Verify
\`\`\`
Buka browser: http://localhost:3000
\`\`\`

---

## 🌐 CLOUDFLARE DNS SETUP

### A Record (Wajib):
\`\`\`
Type: A
Name: @
Content: 168.110.211.50
Proxy: ON (Orange cloud)
TTL: Auto
\`\`\`

### CNAME www (Wajib):
\`\`\`
Type: CNAME
Name: www
Content: lelangmobil.com
Proxy: ON (Orange cloud)
TTL: Auto
\`\`\`

---

## ✅ SELESAI!

**Akses aplikasi:**
- Local: http://localhost:3000
- IP: http://168.110.211.50:3000
- Domain: https://lelangmobil.com (setelah DNS propagasi)

**PM2 Commands:**
\`\`\`
pm2 status              - Check status
pm2 logs lelangmobil    - View logs
pm2 restart lelangmobil - Restart
pm2 stop lelangmobil    - Stop
pm2 monit               - Monitor real-time
\`\`\`

**APLIKASI LIVE! 🎉**
