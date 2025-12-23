# 🚀 DEPLOY KE VERCEL APP BARU

## Database tetap sama, hanya deploy ulang ke project Vercel baru

---

## 📋 LANGKAH-LANGKAH

### **1. Buat Project Vercel Baru (3 menit)**

1. **Buka Vercel Dashboard**
   ```
   https://vercel.com/new
   ```

2. **Import Git Repository**
   - Klik "Import Git Repository"
   - Pilih: `hhayu8445-code/v0-website-lelang2-2`
   - Klik "Import"

3. **Configure Project**
   - Project Name: `lelangmobil-production` (atau nama lain)
   - Framework Preset: Next.js (auto-detect)
   - Root Directory: `./`
   - Klik "Deploy" (JANGAN dulu!)

---

### **2. Set Environment Variables (5 menit)**

**SEBELUM deploy, tambahkan env variables:**

#### A. Supabase (WAJIB)
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara dapat:**
- Buka: https://supabase.com/dashboard
- Pilih project yang SAMA
- Settings → API
- Copy URL dan Keys

#### B. Site URL (WAJIB)
```
NEXT_PUBLIC_SITE_URL = https://lelangmobil-production.vercel.app
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://lelangmobil-production.vercel.app/auth/callback
```

**Ganti dengan domain Vercel baru Anda!**

#### C. Email (Optional)
```
RESEND_API_KEY = re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL = noreply@lelangmobil.com
```

#### D. Security (Optional)
```
CSRF_SECRET = random_32_chars
RATE_LIMIT_SECRET = random_32_chars
WHATSAPP_NUMBER = 6281234567890
```

---

### **3. Deploy! (2 menit)**

1. **Klik "Deploy"**
2. **Tunggu build selesai** (2-3 menit)
3. **Status "Ready"** = Deployment berhasil!

---

### **4. Update Supabase Redirect URL (1 menit)**

**Penting! Tambahkan URL baru ke Supabase:**

1. **Buka Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   ```

2. **Authentication → URL Configuration**

3. **Tambahkan ke "Redirect URLs":**
   ```
   https://lelangmobil-production.vercel.app/auth/callback
   https://lelangmobil-production.vercel.app/**
   ```

4. **Save**

---

### **5. Test Website Baru (2 menit)**

1. **Buka URL baru:**
   ```
   https://lelangmobil-production.vercel.app
   ```

2. **Test:**
   - ✅ Homepage loading
   - ✅ Login/Register
   - ✅ Admin panel (jika sudah set admin di database)
   - ✅ Semua fitur berfungsi

---

## ✅ KEUNTUNGAN DEPLOY BARU

- ✅ Fresh deployment (no cache issues)
- ✅ Database tetap sama (data tidak hilang)
- ✅ URL baru yang bersih
- ✅ Environment variables fresh
- ✅ Build dari commit terbaru

---

## 🔧 TROUBLESHOOTING

### Error: "Missing environment variable"
**Solusi:** Tambahkan variable di Vercel → Settings → Environment Variables

### Error: "Redirect URL not allowed"
**Solusi:** Tambahkan URL baru di Supabase → Authentication → URL Configuration

### Admin Panel tidak muncul
**Solusi:** Jalankan SQL script `SET-ADMIN-USER.sql` di Supabase

---

## 📊 CHECKLIST

- [ ] Buat project Vercel baru
- [ ] Set environment variables (Supabase)
- [ ] Set NEXT_PUBLIC_SITE_URL (URL baru)
- [ ] Deploy
- [ ] Update Supabase redirect URLs
- [ ] Test website
- [ ] Login sebagai admin
- [ ] Cek tombol Admin Panel

---

## 🎯 SETELAH DEPLOY BERHASIL

**Anda akan punya 2 deployment:**
1. Old: `v0-website-lelang2-2.vercel.app`
2. New: `lelangmobil-production.vercel.app` ✅

**Gunakan yang baru, database tetap sama!**

---

## 🚀 READY TO DEPLOY?

**Buka sekarang:**
```
https://vercel.com/new
```

**Import repository:**
```
hhayu8445-code/v0-website-lelang2-2
```

**Set env variables → Deploy → Done!** ✅
