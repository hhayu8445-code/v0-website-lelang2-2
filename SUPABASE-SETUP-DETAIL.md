# 🗄️ SUPABASE SETUP - DETAIL GUIDE

## ⚠️ PENTING: BACA INI DULU!

Tanpa Supabase, website TIDAK AKAN BERFUNGSI karena:
- ❌ Tidak ada database
- ❌ Tidak bisa login/register
- ❌ Tidak bisa lihat data lelang
- ❌ Admin panel tidak berfungsi

**Estimasi waktu:** 15 menit

---

## 📋 STEP 1: BUAT PROJECT SUPABASE (5 menit)

### 1.1 Buka Supabase
1. Buka browser
2. Pergi ke: **https://supabase.com**
3. Klik **"Start your project"** atau **"Sign In"**

### 1.2 Login/Register
- Jika sudah punya akun: **Sign In**
- Jika belum: **Sign Up** (gratis, pakai email atau GitHub)

### 1.3 Buat Project Baru
1. Setelah login, klik **"New Project"**
2. Isi form:
   ```
   Name: lelangmobil-production
   Database Password: [BUAT PASSWORD KUAT & SIMPAN!]
   Region: Southeast Asia (Singapore)
   Pricing Plan: Free (sudah cukup untuk testing)
   ```
3. Klik **"Create new project"**
4. **TUNGGU 2-3 MENIT** sampai project selesai dibuat
   - Status akan berubah dari "Setting up project..." ke "Active"

---

## 📋 STEP 2: DAPATKAN API KEYS (2 menit)

### 2.1 Buka Settings
1. Di dashboard project, lihat menu kiri
2. Klik icon **⚙️ Settings** (paling bawah)
3. Klik **"API"**

### 2.2 Copy API Keys
Anda akan melihat 3 values penting:

```
┌─────────────────────────────────────────────────┐
│ Project URL                                     │
│ https://xxxxxxxxxxxxx.supabase.co              │
│ [Copy]                                          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ anon public                                     │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx    │
│ [Copy]                                          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ service_role (⚠️ Secret - jangan share!)       │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx    │
│ [Reveal] [Copy]                                 │
└─────────────────────────────────────────────────┘
```

### 2.3 Simpan Keys
**PENTING:** Simpan 3 values ini di tempat aman!

1. Buka file: `.env.local`
2. Ganti values:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   ```
3. Save file (Ctrl+S)

---

## 📋 STEP 3: SETUP DATABASE (5 menit)

### 3.1 Buka SQL Editor
1. Di menu kiri, klik **🗄️ SQL Editor**
2. Klik **"New query"** (tombol hijau)

### 3.2 Copy SQL Script
1. Buka file: `scripts/DATABASE_100_PERCENT_FINAL.sql`
2. **Select All** (Ctrl+A)
3. **Copy** (Ctrl+C)

### 3.3 Run SQL
1. Kembali ke Supabase SQL Editor
2. **Paste** script (Ctrl+V)
3. Klik **"Run"** (atau tekan Ctrl+Enter)
4. **TUNGGU** sampai selesai (30-60 detik)
5. Jika berhasil, akan muncul:
   ```
   ✅ Success. No rows returned
   ```

### 3.4 Verify Tables
1. Di menu kiri, klik **🗄️ Table Editor**
2. Anda harus melihat tables:
   ```
   ✅ users
   ✅ vehicles
   ✅ bids
   ✅ transactions
   ✅ kyc_verifications
   ✅ testimonials
   ✅ notifications
   ✅ bank_accounts
   ✅ site_settings
   ✅ banners
   ✅ seo_metadata
   ✅ error_logs
   ```

---

## 📋 STEP 4: SETUP STORAGE (3 menit)

### 4.1 Buat Bucket untuk Gambar Mobil
1. Di menu kiri, klik **📦 Storage**
2. Klik **"Create a new bucket"**
3. Isi:
   ```
   Name: vehicles
   Public bucket: ✅ (CENTANG INI!)
   ```
4. Klik **"Create bucket"**

### 4.2 Buat Bucket untuk KYC Documents
1. Klik **"Create a new bucket"** lagi
2. Isi:
   ```
   Name: kyc-documents
   Public bucket: ❌ (JANGAN DICENTANG!)
   ```
3. Klik **"Create bucket"**

### 4.3 Verify Buckets
Anda harus melihat 2 buckets:
```
✅ vehicles (Public)
✅ kyc-documents (Private)
```

---

## 📋 STEP 5: SETUP AUTHENTICATION (Optional tapi recommended)

### 5.1 Buka Auth Settings
1. Di menu kiri, klik **🔐 Authentication**
2. Klik **"Providers"**

### 5.2 Configure Email Provider
1. Cari **"Email"** provider
2. Pastikan **"Enable Email provider"** = ON (hijau)
3. Settings yang recommended:
   ```
   Confirm email: OFF (untuk testing)
   Secure email change: ON
   ```

### 5.3 Configure Site URL
1. Klik **"URL Configuration"**
2. Isi:
   ```
   Site URL: http://localhost:3000
   Redirect URLs: 
   - http://localhost:3000/auth/callback
   - https://v0-website-lelang2-2-ecru.vercel.app/auth/callback
   ```
3. Klik **"Save"**

---

## ✅ VERIFICATION CHECKLIST

Pastikan semua ini sudah selesai:

- [ ] Project Supabase sudah dibuat
- [ ] Status project = "Active" (hijau)
- [ ] API keys sudah di-copy ke .env.local
- [ ] SQL script sudah di-run (12 tables created)
- [ ] Storage buckets sudah dibuat (2 buckets)
- [ ] Auth settings sudah dikonfigurasi

---

## 🎯 NEXT STEP

Setelah semua checklist di atas ✅, lanjut ke:

**Test Local:**
```bash
cd v0-website-lelang2-2
npm install
npm run dev
```

Buka: http://localhost:3000

---

## 🆘 TROUBLESHOOTING

### Error: "Project creation failed"
**Fix:**
- Coba lagi dengan nama project berbeda
- Check internet connection
- Coba browser lain (Chrome recommended)

### Error: "SQL execution failed"
**Fix:**
- Check apakah ada typo di SQL
- Pastikan copy semua script (dari awal sampai akhir)
- Coba run ulang (hapus tables dulu jika perlu)

### Error: "Cannot create bucket"
**Fix:**
- Check nama bucket (harus lowercase, no spaces)
- Refresh page dan coba lagi

### Tables tidak muncul
**Fix:**
1. Klik **Table Editor**
2. Refresh page (F5)
3. Check apakah SQL berhasil di-run (lihat history)

---

## 📞 BUTUH BANTUAN?

Jika masih stuck di Supabase setup:

1. **Screenshot** error yang muncul
2. **Contact:** WhatsApp +62 882-0227-83493
3. Atau email: support@lelangmobil.com

---

## 💡 PRO TIPS

✨ **Simpan database password** di password manager  
✨ **Jangan share** service_role key ke siapapun  
✨ **Backup** API keys di tempat aman  
✨ **Enable 2FA** di akun Supabase untuk security  
✨ **Monitor usage** di dashboard (free tier = 500MB database)

---

**Setelah selesai, lanjut ke:** Test Local (npm run dev)

---

**Created:** ${new Date().toLocaleString('id-ID')}  
**Status:** Supabase Setup Guide Ready ✅
