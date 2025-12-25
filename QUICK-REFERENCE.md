# 🎴 QUICK REFERENCE CARD

## 📌 SIMPAN FILE INI - REFERENSI CEPAT!

---

## 🚀 QUICK START

```bash
# Setup otomatis (recommended)
quick-setup.bat

# Atau manual
npm install
npm run dev
```

---

## 🔑 ENVIRONMENT VARIABLES (Wajib diisi!)

```bash
# Supabase (dari https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Security (generate dengan generate-secrets.bat)
CSRF_SECRET=32_karakter_random
RATE_LIMIT_SECRET=32_karakter_random

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=62882022783493
```

---

## 📝 COMMANDS CHEAT SHEET

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Build production
npm run start        # Start production server
npm run lint         # Check code quality

# Setup
quick-setup.bat      # Auto setup
generate-secrets.bat # Generate secret keys

# Git
git add .
git commit -m "message"
git push origin main

# Troubleshooting
rm -rf .next         # Clear cache
npm install          # Reinstall dependencies
```

---

## 🗄️ DATABASE SETUP

```sql
-- 1. Run di Supabase SQL Editor:
scripts/DATABASE_100_PERCENT_FINAL.sql

-- 2. Setelah register, run:
scripts/CREATE-ADMIN-SIMPLE.sql
-- (Ganti email di file ini dulu!)
```

---

## 📂 FILE LOCATIONS

```
Dokumentasi:
├─ START-HERE.md              (Mulai dari sini!)
├─ SETUP-GUIDE.md             (Panduan lengkap)
├─ SETUP-CHECKLIST.md         (Tracking progress)
└─ QUICK-REFERENCE.md         (File ini!)

Scripts:
├─ quick-setup.bat            (Auto setup)
└─ generate-secrets.bat       (Generate keys)

Database:
├─ scripts/DATABASE_100_PERCENT_FINAL.sql
└─ scripts/CREATE-ADMIN-SIMPLE.sql

Config:
├─ .env.local                 (Edit ini!)
└─ .env.example               (Template)
```

---

## 🌐 IMPORTANT URLS

```
Local Development:
http://localhost:3000

Supabase Dashboard:
https://supabase.com/dashboard

Vercel Dashboard:
https://vercel.com/dashboard

Production (setelah deploy):
https://v0-website-lelang2-2-ecru.vercel.app
```

---

## 🎯 SETUP STEPS (Singkat)

```
1. Setup Supabase (15 min)
   - Buat project
   - Copy API keys
   - Run SQL

2. Environment (10 min)
   - Generate secrets
   - Edit .env.local

3. Test Local (10 min)
   - npm install
   - npm run dev
   - Register & test

4. Deploy (10 min)
   - git push
   - Setup Vercel env vars
   - Test production
```

---

## 🆘 TROUBLESHOOTING QUICK FIX

```
Error: "Missing Supabase environment variables"
Fix: Check .env.local, restart dev server

Error: "Failed to fetch"
Fix: Check Supabase API keys, check internet

Error: Admin tidak bisa akses /admin
Fix: Run CREATE-ADMIN-SIMPLE.sql dengan email Anda

Error: Build failed
Fix: rm -rf .next && npm run build

Error: Port 3000 already in use
Fix: Kill process atau gunakan port lain
```

---

## 📞 SUPPORT CONTACTS

```
WhatsApp: +62 882-0227-83493
Email: support@lelangmobil.com

Documentation:
- START-HERE.md (overview)
- SETUP-GUIDE.md (detail)
- README-SETUP.md (troubleshooting)
```

---

## ✅ CHECKLIST CEPAT

```
Setup Supabase:
[ ] Project created
[ ] API keys copied
[ ] SQL executed
[ ] Storage buckets created

Environment:
[ ] .env.local filled
[ ] Secrets generated
[ ] Vercel env vars set

Testing:
[ ] Local works (npm run dev)
[ ] Register works
[ ] Login works
[ ] Admin access works

Deploy:
[ ] Git pushed
[ ] Vercel deployed
[ ] Production tested
```

---

## 🎨 DEFAULT CREDENTIALS

```
Admin (setelah setup):
Email: (email yang Anda register)
Password: (password yang Anda buat)

WhatsApp:
Number: +62 882-0227-83493
```

---

## 📊 PROJECT INFO

```
Name: LELANGMOBIL.COM
Framework: Next.js 16
Language: TypeScript
Database: Supabase (PostgreSQL)
Hosting: Vercel
Version: 1.0.0
```

---

## 🔐 SECURITY NOTES

```
⚠️  JANGAN commit .env.local ke Git!
⚠️  JANGAN share API keys!
⚠️  JANGAN share service_role key!
✅ Gunakan .env.example sebagai template
✅ Simpan keys di password manager
```

---

## 🎯 NEXT STEPS SETELAH SETUP

```
1. Tambah data:
   - Login sebagai admin
   - Tambah vehicles di /admin/lelang/tambah
   - Tambah banners di /admin/cms/banners

2. Customize:
   - Ganti logo di public/logo.svg
   - Edit colors di tailwind.config.ts
   - Edit content di app/page.tsx

3. Optional:
   - Setup custom domain
   - Setup email (Resend)
   - Setup analytics
```

---

## 📱 MOBILE TESTING

```
Local Network Testing:
1. Get your IP: ipconfig (Windows) / ifconfig (Mac/Linux)
2. Access: http://YOUR_IP:3000
3. Test di mobile browser
```

---

## 🎓 LEARNING RESOURCES

```
Next.js Docs: https://nextjs.org/docs
Supabase Docs: https://supabase.com/docs
Tailwind CSS: https://tailwindcss.com/docs
TypeScript: https://www.typescriptlang.org/docs
```

---

## 💡 PRO TIPS

```
✨ Gunakan VS Code untuk editing
✨ Install extension: ES7+ React/Redux/React-Native snippets
✨ Install extension: Tailwind CSS IntelliSense
✨ Gunakan Git untuk version control
✨ Test di local dulu sebelum deploy
✨ Backup database secara berkala
```

---

## 🎉 SUCCESS CRITERIA

```
Website berhasil jika:
✅ Homepage loading tanpa error
✅ User bisa register & login
✅ Admin bisa akses panel
✅ Database terkoneksi
✅ WhatsApp button berfungsi
✅ Responsive di mobile
✅ Production deployed
```

---

## 📅 MAINTENANCE CHECKLIST

```
Harian:
[ ] Check error logs
[ ] Monitor user activity

Mingguan:
[ ] Backup database
[ ] Update content

Bulanan:
[ ] Update dependencies
[ ] Security audit
[ ] Performance check
```

---

**Print atau bookmark file ini untuk referensi cepat!** 📌

---

**Last Updated:** ${new Date().toLocaleString('id-ID')}  
**Version:** 1.0.0  
**Status:** Quick Reference Ready ✅
