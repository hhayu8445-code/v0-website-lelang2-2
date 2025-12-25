# ✅ SETUP PROGRESS TRACKER

**Tanggal Mulai:** _______________  
**Target Selesai:** _______________

---

## 📋 STEP 1: SETUP SUPABASE (15 menit)

### 1.1 Buat Project Supabase
- [ ] Buka https://supabase.com/dashboard
- [ ] Klik "New Project"
- [ ] Isi nama: `lelangmobil-production`
- [ ] Pilih region: Southeast Asia (Singapore)
- [ ] Simpan database password: _______________
- [ ] Tunggu project selesai dibuat (2-3 menit)

### 1.2 Dapatkan API Keys
- [ ] Klik Settings > API
- [ ] Copy Project URL: _______________
- [ ] Copy anon public key: _______________
- [ ] Copy service_role key: _______________

### 1.3 Setup Database
- [ ] Klik SQL Editor
- [ ] Buka file: `scripts/DATABASE_100_PERCENT_FINAL.sql`
- [ ] Copy semua isi file
- [ ] Paste ke SQL Editor
- [ ] Klik "Run" (Ctrl+Enter)
- [ ] Tunggu sampai selesai (hijau ✓)

### 1.4 Buat Admin User
- [ ] Masih di SQL Editor
- [ ] Buka file: `scripts/SET-ADMIN-USER.sql`
- [ ] Edit email: _______________
- [ ] Edit password: _______________
- [ ] Copy & paste ke SQL Editor
- [ ] Klik "Run"

**CATATAN:** Untuk membuat admin user, Anda harus:
1. Register dulu via website (setelah setup selesai)
2. Baru jalankan SET-ADMIN-USER.sql dengan email yang sama

### 1.5 Setup Storage
- [ ] Klik Storage
- [ ] Create bucket: `vehicles` (Public: ✅)
- [ ] Create bucket: `kyc-documents` (Public: ❌)

**Status Step 1:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 📋 STEP 2: SETUP ENVIRONMENT VARIABLES (10 menit)

### 2.1 Generate Secret Keys
- [ ] Jalankan: `generate-secrets.bat`
- [ ] Copy CSRF_SECRET: _______________
- [ ] Copy RATE_LIMIT_SECRET: _______________

### 2.2 Update .env.local
- [ ] Buka file: `.env.local`
- [ ] Isi NEXT_PUBLIC_SUPABASE_URL
- [ ] Isi NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Isi SUPABASE_SERVICE_ROLE_KEY
- [ ] Isi CSRF_SECRET
- [ ] Isi RATE_LIMIT_SECRET
- [ ] Save file

### 2.3 Setup Vercel Environment Variables
- [ ] Buka: https://vercel.com/dashboard
- [ ] Pilih project: `v0-website-lelang2-2`
- [ ] Klik Settings > Environment Variables
- [ ] Add: NEXT_PUBLIC_SUPABASE_URL
- [ ] Add: NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Add: SUPABASE_SERVICE_ROLE_KEY
- [ ] Add: NEXT_PUBLIC_SITE_URL
- [ ] Add: CSRF_SECRET
- [ ] Add: NEXT_PUBLIC_WHATSAPP_NUMBER

**Status Step 2:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 📋 STEP 3: UPLOAD ASSETS (5 menit)

### 3.1 Logo
- [ ] Buat/download logo.png (512x512px)
- [ ] Simpan di: `public/logo.png`

### 3.2 Promo Image (Optional)
- [ ] Buat promo-december-2025.png
- [ ] Simpan di: `public/images/promo-december-2025.png`
- [ ] Atau comment section promo di `app/page.tsx`

**Status Step 3:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 📋 STEP 4: TEST LOCAL (10 menit)

### 4.1 Install & Run
- [ ] Jalankan: `npm install`
- [ ] Jalankan: `npm run dev`
- [ ] Buka: http://localhost:3000

### 4.2 Test Features
- [ ] Homepage muncul tanpa error
- [ ] Lihat halaman /lelang
- [ ] Register user baru
- [ ] Login dengan user baru
- [ ] Check console tidak ada error merah

### 4.3 Test Admin (setelah register)
- [ ] Jalankan SET-ADMIN-USER.sql dengan email Anda
- [ ] Logout & login lagi
- [ ] Akses /admin
- [ ] Dashboard admin muncul

**Status Step 4:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 📋 STEP 5: DEPLOY VERCEL (10 menit)

### 5.1 Push ke GitHub
- [ ] Jalankan: `git add .`
- [ ] Jalankan: `git commit -m "Setup production"`
- [ ] Jalankan: `git push origin main`

### 5.2 Vercel Deploy
- [ ] Tunggu Vercel auto-deploy (2-3 menit)
- [ ] Check: https://vercel.com/dashboard
- [ ] Status: Building → Ready

**Status Step 5:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 📋 STEP 6: TEST PRODUCTION (10 menit)

### 6.1 Test URL
- [ ] Buka: https://v0-website-lelang2-2-ecru.vercel.app
- [ ] Homepage muncul
- [ ] Test register
- [ ] Test login
- [ ] Test admin panel

### 6.2 Check Errors
- [ ] Buka Developer Tools (F12)
- [ ] Tab Console tidak ada error merah
- [ ] Tab Network semua request 200 OK

**Status Step 6:** ⬜ Belum / ⏳ Progress / ✅ Selesai

---

## 🎯 FINAL CHECKLIST

- [ ] Database terkoneksi
- [ ] User bisa register
- [ ] User bisa login
- [ ] Admin bisa akses /admin
- [ ] Tidak ada error di console
- [ ] WhatsApp button berfungsi
- [ ] Images loading dengan baik

---

## 📊 OVERALL PROGRESS

```
Step 1: Supabase         [ ] 0% [ ] 50% [ ] 100%
Step 2: Environment      [ ] 0% [ ] 50% [ ] 100%
Step 3: Assets           [ ] 0% [ ] 50% [ ] 100%
Step 4: Test Local       [ ] 0% [ ] 50% [ ] 100%
Step 5: Deploy           [ ] 0% [ ] 50% [ ] 100%
Step 6: Test Production  [ ] 0% [ ] 50% [ ] 100%

TOTAL: _____ / 100%
```

---

## 🆘 TROUBLESHOOTING

### Masalah yang sering terjadi:

**1. "Missing Supabase environment variables"**
- Check .env.local sudah diisi
- Restart dev server

**2. "Failed to fetch"**
- Check Supabase project masih running
- Check API keys benar

**3. "Unauthorized"**
- Check SUPABASE_SERVICE_ROLE_KEY benar
- Check RLS policies di Supabase

**4. Admin tidak bisa akses /admin**
- Pastikan sudah register dulu
- Jalankan SET-ADMIN-USER.sql dengan email yang sama
- Logout & login lagi

---

## 📞 BUTUH BANTUAN?

WhatsApp: +62 882-0227-83493

---

**Selesai:** _______________  
**Total Waktu:** _______________  
**Status:** ⬜ Belum / ⏳ Progress / ✅ Production Ready
