# 🚀 COPY PASTE INI KE VERCEL - STEP BY STEP

## 📍 LINK VERCEL:
```
https://vercel.com/azzaa-3092s-projects/~/settings/environment-variables
```

---

## ⚡ CARA CEPAT - COPY PASTE SATU PER SATU:

### 🔴 VARIABLE 1: NEXT_PUBLIC_SUPABASE_URL

**Klik "Add New" di Vercel, lalu:**

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: [PASTE URL DARI SUPABASE]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat Value:**
1. Buka: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Settings** (icon gear)
4. Klik **API**
5. Copy **Project URL**
6. Contoh: `https://abcdefghijk.supabase.co`

---

### 🔴 VARIABLE 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

**Klik "Add New" di Vercel, lalu:**

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [PASTE ANON KEY DARI SUPABASE]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat Value:**
1. Masih di Supabase > Settings > API
2. Scroll ke bawah ke section **Project API keys**
3. Copy **anon public** key
4. Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjcwMDAsImV4cCI6MjAwNTEzNzAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 🔴 VARIABLE 3: SUPABASE_SERVICE_ROLE_KEY

**Klik "Add New" di Vercel, lalu:**

```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: [PASTE SERVICE ROLE KEY DARI SUPABASE]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat Value:**
1. Masih di Supabase > Settings > API
2. Scroll ke **service_role** key
3. Klik **Reveal** (atau **Copy**)
4. ⚠️ **JANGAN SHARE KEY INI KE SIAPAPUN!**
5. Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTU2NzAwMCwiZXhwIjoyMDA1MTM3MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 🔴 VARIABLE 4: NEXT_PUBLIC_SITE_URL

**Klik "Add New" di Vercel, lalu:**

```
Key: NEXT_PUBLIC_SITE_URL
Value: https://v0-website-lelang2-2.vercel.app
Environment: ✅ Production ONLY
```

**Note:** 
- Ganti dengan domain production Anda
- Cek di Vercel Dashboard > Domains
- Atau pakai domain default Vercel

---

### 🔴 VARIABLE 5: RESEND_API_KEY

**Klik "Add New" di Vercel, lalu:**

```
Key: RESEND_API_KEY
Value: [PASTE API KEY DARI RESEND]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat Value:**

**Jika sudah punya akun Resend:**
1. Buka: https://resend.com/api-keys
2. Klik **"Create API Key"**
3. Name: `Production`
4. Permission: **Sending access**
5. Klik **Create**
6. Copy key yang muncul (hanya muncul 1x!)
7. Contoh: `re_123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk`

**Jika belum punya akun:**
1. Daftar di: https://resend.com/signup
2. Verify email
3. Login
4. Ikuti langkah di atas

---

### 🔴 VARIABLE 6: RESEND_FROM_EMAIL

**Klik "Add New" di Vercel, lalu:**

```
Key: RESEND_FROM_EMAIL
Value: noreply@lelangmobil.com
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:**
- Untuk **testing**: pakai `onboarding@resend.dev`
- Untuk **production**: setup domain di Resend atau pakai email Anda

---

### 🔴 VARIABLE 7: CSRF_SECRET

**Klik "Add New" di Vercel, lalu:**

```
Key: CSRF_SECRET
Value: [PASTE RANDOM STRING 32+ KARAKTER]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara generate Value:**

**Option 1 - Terminal/CMD:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2 - Online:**
1. Buka: https://www.random.org/strings/
2. Generate 1 string, 32 characters
3. Copy hasilnya

**Option 3 - Manual:**
```
Ketik random 32+ karakter (huruf + angka)
Contoh: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

### 🔴 VARIABLE 8: RATE_LIMIT_SECRET

**Klik "Add New" di Vercel, lalu:**

```
Key: RATE_LIMIT_SECRET
Value: [PASTE RANDOM STRING 32+ KARAKTER - BERBEDA DARI CSRF_SECRET]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara generate Value:**
- Sama seperti CSRF_SECRET
- Tapi buat yang **BARU/BERBEDA**
- Jangan pakai yang sama!

---

### 🔴 VARIABLE 9: WHATSAPP_NUMBER

**Klik "Add New" di Vercel, lalu:**

```
Key: WHATSAPP_NUMBER
Value: 62882022783493
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:**
- Format: tanpa `+` dan tanpa spasi
- Contoh: `62882022783493` (Indonesia)
- Ganti dengan nomor WhatsApp Anda

---

### ⚪ VARIABLE 10: XAI_API_KEY (OPTIONAL)

**Klik "Add New" di Vercel, lalu:**

```
Key: XAI_API_KEY
Value: [PASTE API KEY DARI XAI]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:**
- **OPTIONAL** - Bisa diskip jika tidak pakai AI features
- Hanya perlu jika pakai xAI API

---

## ✅ CHECKLIST - CENTANG SETELAH SELESAI:

```
[ ] 1. NEXT_PUBLIC_SUPABASE_URL
[ ] 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
[ ] 3. SUPABASE_SERVICE_ROLE_KEY
[ ] 4. NEXT_PUBLIC_SITE_URL
[ ] 5. RESEND_API_KEY
[ ] 6. RESEND_FROM_EMAIL
[ ] 7. CSRF_SECRET
[ ] 8. RATE_LIMIT_SECRET
[ ] 9. WHATSAPP_NUMBER
[ ] 10. XAI_API_KEY (optional)
```

---

## 🚀 SETELAH SEMUA DIISI:

### 1. Redeploy Project:

**Option A - Via Vercel Dashboard:**
1. Klik tab **Deployments**
2. Klik titik tiga **...** di deployment terakhir
3. Klik **Redeploy**
4. Tunggu build selesai

**Option B - Via Git Push:**
```bash
git commit --allow-empty -m "Trigger redeploy after env setup"
git push origin main
```

### 2. Verify Deployment:
1. Tunggu build selesai (2-3 menit)
2. Klik deployment yang baru
3. Check **Build Logs** - pastikan tidak ada error
4. Klik **Visit** untuk test website

### 3. Test Website:
- ✅ Homepage loading
- ✅ WhatsApp button (bottom-right, hijau)
- ✅ Registration form
- ✅ Login form
- ✅ Email verification (cek inbox)

---

## 🎯 QUICK REFERENCE:

| Variable | Dari Mana | Wajib? |
|----------|-----------|--------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase Dashboard | 🔴 Ya |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase Dashboard | 🔴 Ya |
| SUPABASE_SERVICE_ROLE_KEY | Supabase Dashboard | 🔴 Ya |
| NEXT_PUBLIC_SITE_URL | Vercel Domain | 🔴 Ya |
| RESEND_API_KEY | Resend.com | 🔴 Ya |
| RESEND_FROM_EMAIL | Email Anda | 🔴 Ya |
| CSRF_SECRET | Generate Random | 🔴 Ya |
| RATE_LIMIT_SECRET | Generate Random | 🔴 Ya |
| WHATSAPP_NUMBER | Nomor WA Anda | 🔴 Ya |
| XAI_API_KEY | xAI Dashboard | ⚪ Tidak |

---

## 📞 LINKS PENTING:

- **Vercel Env Vars:** https://vercel.com/azzaa-3092s-projects/~/settings/environment-variables
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Resend API Keys:** https://resend.com/api-keys
- **Random String Generator:** https://www.random.org/strings/

---

## 🎉 DONE!

Setelah semua variable diisi dan redeploy berhasil:
- ✅ Website akan berfungsi 100%
- ✅ Database connection aktif
- ✅ Email verification berfungsi
- ✅ WhatsApp button berfungsi
- ✅ Security features aktif

**Website production ready!** 🚀

