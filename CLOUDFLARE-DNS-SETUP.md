# ⚡ CLOUDFLARE DNS SETUP - LELANGMOBIL.COM

## 🎯 SETTING DNS (3 MENIT)

### 1. Login Cloudflare
\`\`\`
https://dash.cloudflare.com
\`\`\`

### 2. Pilih Domain
\`\`\`
Click: lelangmobil.com
\`\`\`

### 3. Pergi ke DNS
\`\`\`
Sidebar → DNS → Records
\`\`\`

### 4. Add A Record untuk Root Domain

\`\`\`
Click: Add record

Type: A
Name: @
IPv4 address: 168.110.211.50
Proxy status: Proxied (Orange Cloud ON)
TTL: Auto

Click: Save
\`\`\`

### 5. Add A Record untuk WWW

\`\`\`
Click: Add record

Type: A
Name: www
IPv4 address: 168.110.211.50
Proxy status: Proxied (Orange Cloud ON)
TTL: Auto

Click: Save
\`\`\`

### 6. SSL/TLS Settings

\`\`\`
Sidebar → SSL/TLS → Overview

Encryption mode: Full (strict)
Click: Save
\`\`\`

### 7. Enable HTTPS

\`\`\`
Sidebar → SSL/TLS → Edge Certificates

Always Use HTTPS: ON
Automatic HTTPS Rewrites: ON
Minimum TLS Version: 1.2

Click: Save
\`\`\`

---

## ✅ VERIFY DNS

### Check DNS Records
\`\`\`
DNS → Records

Should show:
✅ A @ 168.110.211.50 (Proxied)
✅ A www 168.110.211.50 (Proxied)
\`\`\`

### Test Domain
\`\`\`
Wait: 2-5 minutes (DNS propagation)
Open: https://lelangmobil.com
Result: Website loads ✅
\`\`\`

---

## 🔧 TROUBLESHOOTING

### Domain tidak bisa diakses?

**Check 1: DNS Propagation**
\`\`\`
https://dnschecker.org
Domain: lelangmobil.com
Type: A
Should show: 168.110.211.50
\`\`\`

**Check 2: Server Running**
\`\`\`
Check terminal: ✓ Ready in 616ms
Check local: http://localhost:3000
\`\`\`

**Check 3: Firewall**
\`\`\`
Windows Firewall → Allow port 3000
\`\`\`

---

## 📋 CHECKLIST

- [ ] Login Cloudflare
- [ ] Select domain: lelangmobil.com
- [ ] Add A record: @ → 168.110.211.50
- [ ] Add A record: www → 168.110.211.50
- [ ] Proxy: ON (Orange Cloud)
- [ ] SSL: Full (strict)
- [ ] Always Use HTTPS: ON
- [ ] Wait 2-5 minutes
- [ ] Test: https://lelangmobil.com

---

## 🎯 EXPECTED RESULT

**After DNS Setup:**
\`\`\`
✅ https://lelangmobil.com → Website loads
✅ https://www.lelangmobil.com → Website loads
✅ SSL certificate: Valid (Cloudflare)
✅ All features working
\`\`\`

---

## 🚀 ALTERNATIVE: Use Public IP

**Akses via Public IP:**
\`\`\`
http://168.110.211.50:3000
\`\`\`

**Note**: `10.0.0.103` adalah IP lokal (hanya dari network yang sama)

---

**Time**: 3-5 minutes
**Status**: Ready to configure
**Next**: Login Cloudflare Dashboard
