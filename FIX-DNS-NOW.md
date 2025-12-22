# 🔧 FIX CLOUDFLARE DNS - LELANGMOBIL.COM

## ❌ MASALAH

**DNS sudah setup tapi tidak berfungsi!**

**Penyebab:**
- Cloudflare Proxy mencoba akses port 80/443
- Server Anda running di port 3000
- Cloudflare tidak bisa forward ke port 3000

---

## ✅ SOLUSI CEPAT (2 MENIT)

### Disable Cloudflare Proxy

\`\`\`
Cloudflare Dashboard:
https://dash.cloudflare.com

DNS → Records

A Record: @
IP: 168.110.211.50
Proxy: OFF (Click orange cloud → grey cloud)
Status: DNS only

A Record: www
IP: 168.110.211.50
Proxy: OFF (Click orange cloud → grey cloud)
Status: DNS only

Save
\`\`\`

**Akses:**
\`\`\`
http://lelangmobil.com:3000
http://www.lelangmobil.com:3000
\`\`\`

⚠️ **Note**: Harus pakai `:3000` di URL

---

## ✅ SOLUSI PRODUCTION (30 MENIT)

### Setup Nginx Reverse Proxy

**Install Nginx:**
\`\`\`bash
# Download Nginx for Windows
https://nginx.org/en/download.html

# Extract ke C:\nginx
\`\`\`

**Configure Nginx:**

File: `C:\nginx\conf\nginx.conf`

\`\`\`nginx
http {
    server {
        listen 80;
        server_name lelangmobil.com www.lelangmobil.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
\`\`\`

**Start Nginx:**
\`\`\`bash
cd C:\nginx
start nginx
\`\`\`

**Enable Cloudflare Proxy:**
\`\`\`
DNS → Records
Proxy: ON (Orange Cloud)
\`\`\`

**Akses:**
\`\`\`
https://lelangmobil.com (tanpa :3000)
\`\`\`

---

## ✅ SOLUSI ALTERNATIF (5 MENIT)

### Change Next.js Port ke 80

**Update package.json:**
\`\`\`json
"scripts": {
  "start": "next start -p 80"
}
\`\`\`

**Restart server:**
\`\`\`bash
npm start
\`\`\`

**Enable Cloudflare Proxy:**
\`\`\`
DNS → Records
Proxy: ON (Orange Cloud)
\`\`\`

**Akses:**
\`\`\`
https://lelangmobil.com (tanpa :3000)
\`\`\`

⚠️ **Note**: Perlu run as Administrator (port 80)

---

## 🎯 RECOMMENDED

**Untuk sekarang (Quick):**
1. Disable Cloudflare Proxy
2. Akses: http://lelangmobil.com:3000

**Untuk production (Nanti):**
1. Setup Nginx reverse proxy
2. Enable Cloudflare Proxy
3. Akses: https://lelangmobil.com

---

## 📝 QUICK FIX NOW

\`\`\`
1. Cloudflare → DNS → Records
2. Click orange cloud → grey cloud (DNS only)
3. Save
4. Wait 2 minutes
5. Test: http://lelangmobil.com:3000
\`\`\`

**Result:** ✅ Website accessible!

---

**Status**: Fix available
**Quick Fix**: Disable proxy (2 min)
**Production Fix**: Nginx (30 min)
