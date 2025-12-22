# 🚀 SETUP VERCEL ENVIRONMENT VARIABLES

## ⚠️ WAJIB DILAKUKAN SEBELUM DEPLOY!

Setelah push ke Git, Vercel akan otomatis build. Tapi akan GAGAL jika environment variables belum diset.

---

## 📋 LANGKAH-LANGKAH

### 1. Buka Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Pilih Project
- Klik project: `v0-website-lelang2-2`

### 3. Masuk ke Settings
- Klik tab **Settings**
- Klik **Environment Variables** di sidebar

### 4. Tambahkan Variables Berikut

#### A. SUPABASE (WAJIB) 🔴
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara dapat:**
1. Buka https://supabase.com/dashboard
2. Pilih project
3. Klik Settings > API
4. Copy URL dan Keys

#### B. SITE URL (WAJIB) 🔴
```
NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://your-domain.vercel.app/auth/callback
```

**Ganti `your-domain` dengan domain Vercel Anda!**

#### C. EMAIL - RESEND (WAJIB untuk Email Verification) 🟡
```
RESEND_API_KEY = re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL = noreply@lelangmobil.com
```

**Cara dapat:**
1. Buka https://resend.com/api-keys
2. Create API Key
3. Copy key

#### D. SECURITY (RECOMMENDED) 🟢
```
CSRF_SECRET = random_string_min_32_characters_here
RATE_LIMIT_SECRET = another_random_string_here
```

**Generate random string:**
```bash
# Di terminal/cmd
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### E. WHATSAPP (OPTIONAL) ⚪
```
WHATSAPP_NUMBER = 6281234567890
```

#### F. AI - XAI (OPTIONAL) ⚪
```
XAI_API_KEY = xai-xxxxxxxxxxxxx
```

---

## 🎯 ENVIRONMENT UNTUK SETIAP STAGE

Pilih environment saat menambahkan variable:

- ✅ **Production** - Untuk production deployment
- ✅ **Preview** - Untuk preview deployments (optional)
- ⬜ **Development** - Tidak perlu (pakai .env.local)

---

## ✅ VERIFIKASI

Setelah semua variable ditambahkan:

1. **Redeploy**
   - Klik tab **Deployments**
   - Klik titik tiga (...) pada deployment terakhir
   - Klik **Redeploy**

2. **Check Logs**
   - Tunggu build selesai
   - Klik deployment
   - Check **Build Logs**
   - Pastikan tidak ada error "Missing environment variable"

3. **Test Website**
   - Buka production URL
   - Test login/register
   - Test email verification
   - Test admin panel

---

## 🔧 TROUBLESHOOTING

### Error: "Missing environment variable"
**Solusi:** Tambahkan variable yang missing di Vercel Dashboard, lalu redeploy

### Error: "Invalid Supabase URL"
**Solusi:** 
1. Check URL format: `https://xxxxx.supabase.co`
2. Tidak ada trailing slash `/`
3. Copy ulang dari Supabase Dashboard

### Error: "Redirect URL not allowed"
**Solusi:**
1. Buka Supabase Dashboard
2. Authentication > URL Configuration
3. Tambahkan: `https://your-domain.vercel.app/auth/callback`
4. Tambahkan: `https://your-domain.vercel.app/**`

### Email tidak terkirim
**Solusi:**
1. Check RESEND_API_KEY valid
2. Verify domain di Resend
3. Check Resend logs: https://resend.com/emails

---

## 📞 QUICK LINKS

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard
- Resend Dashboard: https://resend.com/api-keys
- Generate Random String: https://www.random.org/strings/

---

## ✅ CHECKLIST

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
- [ ] RESEND_API_KEY
- [ ] RESEND_FROM_EMAIL
- [ ] CSRF_SECRET
- [ ] RATE_LIMIT_SECRET
- [ ] WHATSAPP_NUMBER (optional)
- [ ] Redeploy di Vercel
- [ ] Test production URL

**Setelah semua checklist ✅, website siap 100%!** 🎉
