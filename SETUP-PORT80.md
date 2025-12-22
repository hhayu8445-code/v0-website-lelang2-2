# ✅ SETUP FINAL - LELANGMOBIL.COM

## 🎯 SOLUSI ERROR 500

**Masalah:** Cloudflare Proxy ON + Server port 3000 = Error 500

**Solusi:** Change server ke port 80

---

## 🚀 LANGKAH SETUP (2 MENIT)

### 1. Stop Server Lama
\`\`\`
Terminal yang running npm start
Press: Ctrl + C
\`\`\`

### 2. Start Server Port 80
\`\`\`
Right-click: start-port80.bat
Select: Run as administrator
\`\`\`

**Atau manual:**
\`\`\`bash
npm start
\`\`\`
⚠️ Harus run as Administrator (port 80)

### 3. Cloudflare Settings

**SSL Mode:**
\`\`\`
Cloudflare → SSL/TLS → Overview
Mode: Flexible
Save
\`\`\`

**DNS Records:**
\`\`\`
A @ 168.110.211.50 (Proxy ON - Orange)
A www 168.110.211.50 (Proxy ON - Orange)
\`\`\`

### 4. Test
\`\`\`
https://lelangmobil.com
\`\`\`

---

## ✅ EXPECTED RESULT

**Server:**
\`\`\`
✓ Ready in 616ms
- Local: http://localhost:80
- Network: http://168.110.211.50:80
\`\`\`

**Website:**
\`\`\`
✅ https://lelangmobil.com (works!)
✅ https://www.lelangmobil.com (works!)
✅ No port number needed
✅ SSL via Cloudflare
\`\`\`

---

## 🔧 TROUBLESHOOTING

### Error: Port 80 already in use?
\`\`\`bash
# Check what's using port 80
netstat -ano | findstr :80

# Kill process
taskkill /F /PID [PID]
\`\`\`

### Error: Permission denied?
\`\`\`
Run as Administrator!
Right-click → Run as administrator
\`\`\`

### Still Error 500?
\`\`\`
Cloudflare → SSL/TLS
Change: Full (strict) → Flexible
Save
Wait 2 minutes
\`\`\`

---

## 📋 CHECKLIST

- [ ] Stop server port 3000
- [ ] Start server port 80 (as Admin)
- [ ] Cloudflare SSL: Flexible
- [ ] Cloudflare Proxy: ON (Orange)
- [ ] Test: https://lelangmobil.com
- [ ] Verify: No errors

---

## ✅ FINAL STATUS

**After Setup:**
\`\`\`
✅ Server: Port 80
✅ Cloudflare: Proxy ON
✅ SSL: Flexible
✅ Domain: https://lelangmobil.com
✅ Status: WORKING
\`\`\`

---

**Time**: 2 minutes
**Status**: Ready to start
**Next**: Run as Administrator
