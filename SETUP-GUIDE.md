# 🚀 PANDUAN SETUP PRODUCTION - STEP BY STEP

## ✅ CHECKLIST SETUP (30-60 menit)

```
[ ] 1. Setup Supabase (15 menit)
[ ] 2. Setup Environment Variables (10 menit)
[ ] 3. Upload Assets (5 menit)
[ ] 4. Test Local (10 menit)
[ ] 5. Deploy Vercel (10 menit)
[ ] 6. Test Production (10 menit)
```

---

## 📋 STEP 1: SETUP SUPABASE (15 menit)

### 1.1 Buat Project Supabase

1. Buka: https://supabase.com/dashboard
2. Klik **"New Project"**
3. Isi:
   - **Name:** `lelangmobil-production`
   - **Database Password:** (simpan password ini!)
   - **Region:** Southeast Asia (Singapore)
4. Klik **"Create new project"**
5. Tunggu 2-3 menit sampai selesai

### 1.2 Dapatkan API Keys

1. Di dashboard project, klik **Settings** (kiri bawah)
2. Klik **API**
3. Copy 3 values ini:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

### 1.3 Setup Database

1. Di dashboard, klik **SQL Editor** (menu kiri)
2. Klik **"New query"**
3. Buka file: `scripts/DATABASE_100_PERCENT_FINAL.sql`
4. Copy semua isi file
5. Paste ke SQL Editor
6. Klik **"Run"** (atau tekan Ctrl+Enter)
7. Tunggu sampai selesai (hijau ✓)

### 1.4 Buat Admin User

1. Masih di SQL Editor
2. Buka file: `scripts/SET-ADMIN-USER.sql`
3. **EDIT** email dan password:

```sql
-- GANTI INI:
'admin@lelangmobil.com'  -- Ganti dengan email Anda
'admin123456'            -- Ganti dengan password kuat
```

4. Copy & paste ke SQL Editor
5. Klik **"Run"**

### 1.5 Setup Storage (untuk upload gambar)

1. Klik **Storage** (menu kiri)
2. Klik **"Create a new bucket"**
3. Isi:
   - **Name:** `vehicles`
   - **Public:** ✅ (centang)
4. Klik **"Create bucket"**
5. Ulangi untuk bucket: `kyc-documents` (Public: ❌)

---

## 📋 STEP 2: SETUP ENVIRONMENT VARIABLES (10 menit)

### 2.1 Update .env.local (untuk development)

1. Buka file: `.env.local`
2. Ganti semua `your_xxx` dengan value asli:

```bash
# Supabase (dari Step 1.2)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# Site (untuk local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# Email (optional - bisa skip dulu)
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=noreply@lelangmobil.com

# Security (generate random 32 karakter)
CSRF_SECRET=abcdef1234567890abcdef1234567890
RATE_LIMIT_SECRET=123456abcdef7890123456abcdef7890

# WhatsApp (sudah OK)
NEXT_PUBLIC_WHATSAPP_NUMBER=62882022783493
```

### 2.2 Generate Secret Keys

**Windows (PowerShell):**
```powershell
# Jalankan di PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Atau manual:** Ketik random 32 karakter (huruf + angka)

### 2.3 Setup Vercel Environment Variables

1. Buka: https://vercel.com/dashboard
2. Pilih project: `v0-website-lelang2-2`
3. Klik **Settings** > **Environment Variables**
4. Tambahkan satu per satu (klik "Add New"):

**WAJIB (6 variables):**

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://lelangmobil.com` | Production |
| `CSRF_SECRET` | `(32 karakter random)` | Production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `62882022783493` | Production |

**OPTIONAL (bisa skip dulu):**
- `RESEND_API_KEY`
- `RATE_LIMIT_SECRET`
- `XAI_API_KEY`

---

## 📋 STEP 3: UPLOAD ASSETS (5 menit)

### 3.1 Buat Logo

1. Buat file `public/logo.png` (ukuran 512x512px)
2. Atau download logo temporary dari: https://via.placeholder.com/512x512/FF0000/FFFFFF?text=LELANGMOBIL

### 3.2 Buat Manifest

File sudah saya buatkan di: `public/manifest.json`

### 3.3 Buat Promo Image (optional)

1. Buat file `public/images/promo-december-2025.png`
2. Atau comment dulu section promo di homepage

---

## 📋 STEP 4: TEST LOCAL (10 menit)

### 4.1 Install Dependencies

```bash
cd v0-website-lelang2-2
npm install
```

### 4.2 Run Development Server

```bash
npm run dev
```

### 4.3 Test Features

1. Buka: http://localhost:3000
2. Test:
   - ✅ Homepage muncul
   - ✅ Lihat lelang (harus kosong atau ada data)
   - ✅ Register user baru
   - ✅ Login dengan user baru
   - ✅ Login admin (email & password dari Step 1.4)
   - ✅ Akses admin panel

---

## 📋 STEP 5: DEPLOY VERCEL (10 menit)

### 5.1 Push ke GitHub

```bash
git add .
git commit -m "Setup production environment"
git push origin main
```

### 5.2 Vercel Auto-Deploy

1. Vercel akan otomatis detect push
2. Tunggu 2-3 menit
3. Check: https://vercel.com/dashboard

### 5.3 Atau Manual Deploy

1. Buka: https://vercel.com/dashboard
2. Pilih project
3. Klik **"Redeploy"**

---

## 📋 STEP 6: TEST PRODUCTION (10 menit)

### 6.1 Test URL Production

1. Buka: https://v0-website-lelang2-2-ecru.vercel.app
2. Test semua fitur seperti Step 4.3

### 6.2 Check Console Errors

1. Buka Developer Tools (F12)
2. Check tab **Console**
3. Pastikan tidak ada error merah

### 6.3 Test Database Connection

1. Login sebagai admin
2. Buka: `/admin`
3. Pastikan dashboard muncul dengan data

---

## ✅ SELESAI!

Jika semua step berhasil, website Anda sudah **100% production-ready**!

---

## 🆘 TROUBLESHOOTING

### Error: "Missing Supabase environment variables"

**Fix:**
1. Check `.env.local` sudah diisi
2. Restart dev server: `Ctrl+C` lalu `npm run dev`

### Error: "Failed to fetch"

**Fix:**
1. Check Supabase project masih running
2. Check API keys benar
3. Check internet connection

### Error: "Unauthorized"

**Fix:**
1. Check `SUPABASE_SERVICE_ROLE_KEY` benar
2. Check RLS policies di Supabase

### Homepage lambat

**Fix:**
1. Add sample vehicles di database
2. Optimize images
3. Enable caching

---

## 📞 BUTUH BANTUAN?

WhatsApp: +62 882-0227-83493

---

**Dibuat:** ${new Date().toLocaleString('id-ID')}
**Status:** Ready to use
