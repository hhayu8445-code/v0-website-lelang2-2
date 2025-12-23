# 🔐 SETUP ENVIRONMENT VARIABLES - VERCEL

## 📍 Link Setup:
```
https://vercel.com/hah-cc4988b5/~/settings/environment-variables
```

---

## ⚡ COPY PASTE INI SATU PER SATU:

### 1️⃣ NEXT_PUBLIC_SUPABASE_URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: [Ambil dari Supabase Dashboard > Settings > API > Project URL]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat value:**
1. Buka: https://supabase.com/dashboard
2. Pilih project Anda
3. Settings > API
4. Copy "Project URL"
5. Contoh: `https://xxxxxxxxxxxxx.supabase.co`

---

### 2️⃣ NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Ambil dari Supabase Dashboard > Settings > API > anon public]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat value:**
1. Masih di Settings > API
2. Copy "anon public" key
3. Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### 3️⃣ SUPABASE_SERVICE_ROLE_KEY
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: [Ambil dari Supabase Dashboard > Settings > API > service_role]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat value:**
1. Masih di Settings > API
2. Klik "Reveal" di "service_role" key
3. Copy key tersebut
4. ⚠️ JANGAN SHARE KEY INI!
5. Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### 4️⃣ NEXT_PUBLIC_SITE_URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://v0-website-lelang2-2.vercel.app
Environment: ✅ Production ONLY
```

**Note:** Ganti dengan domain production Anda

---

### 5️⃣ RESEND_API_KEY
```
Key: RESEND_API_KEY
Value: [Ambil dari Resend Dashboard]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara dapat value:**
1. Buka: https://resend.com/api-keys
2. Klik "Create API Key"
3. Name: "Production"
4. Permission: "Sending access"
5. Copy key yang muncul
6. Contoh: `re_xxxxxxxxxxxxxxxxxxxxx`

**Jika belum punya akun Resend:**
1. Daftar di: https://resend.com/signup
2. Verify email
3. Buat API key

---

### 6️⃣ RESEND_FROM_EMAIL
```
Key: RESEND_FROM_EMAIL
Value: noreply@lelangmobil.com
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:** 
- Untuk testing, bisa pakai: `onboarding@resend.dev`
- Untuk production, setup domain di Resend

---

### 7️⃣ CSRF_SECRET
```
Key: CSRF_SECRET
Value: [Generate random 32+ karakter]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara generate:**

**Option 1 - Online:**
1. Buka: https://www.random.org/strings/
2. Generate 1 string, 32 karakter
3. Copy hasilnya

**Option 2 - Terminal:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 3 - Manual:**
```
Contoh: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

### 8️⃣ RATE_LIMIT_SECRET
```
Key: RATE_LIMIT_SECRET
Value: [Generate random 32+ karakter - BERBEDA dari CSRF_SECRET]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Cara generate:** Sama seperti CSRF_SECRET, tapi buat yang BARU/BERBEDA

---

### 9️⃣ WHATSAPP_NUMBER
```
Key: WHATSAPP_NUMBER
Value: 62882022783493
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:** Format tanpa + dan tanpa spasi

---

### 🔟 XAI_API_KEY (OPTIONAL)
```
Key: XAI_API_KEY
Value: [Ambil dari xAI Dashboard - OPTIONAL]
Environment: ✅ Production ✅ Preview ✅ Development
```

**Note:** Ini optional, bisa diskip jika tidak pakai AI features

---

## 📋 CHECKLIST - COPY INI:

Centang setelah selesai setup:

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

## 🎯 QUICK REFERENCE TABLE:

| Key | Value Example | Where to Get |
|-----|---------------|--------------|
| NEXT_PUBLIC_SUPABASE_URL | https://xxx.supabase.co | Supabase > Settings > API |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | eyJhbG... | Supabase > Settings > API |
| SUPABASE_SERVICE_ROLE_KEY | eyJhbG... | Supabase > Settings > API (Reveal) |
| NEXT_PUBLIC_SITE_URL | https://your-domain.vercel.app | Your Vercel domain |
| RESEND_API_KEY | re_xxx... | Resend.com > API Keys |
| RESEND_FROM_EMAIL | noreply@lelangmobil.com | Your email or onboarding@resend.dev |
| CSRF_SECRET | a1b2c3... | Generate random 32+ chars |
| RATE_LIMIT_SECRET | x9y8z7... | Generate random 32+ chars |
| WHATSAPP_NUMBER | 62882022783493 | Your WhatsApp number |
| XAI_API_KEY | xai-xxx... | xAI Dashboard (optional) |

---

## ⚙️ CARA INPUT DI VERCEL:

### Untuk setiap variable:

1. **Klik "Add New"**
2. **Key:** Paste nama variable (contoh: `NEXT_PUBLIC_SUPABASE_URL`)
3. **Value:** Paste value yang sudah didapat
4. **Environment:** 
   - ✅ Production (wajib)
   - ✅ Preview (recommended)
   - ✅ Development (recommended)
5. **Klik "Save"**
6. **Ulangi untuk variable berikutnya**

---

## 🚨 PENTING:

### Setelah semua diisi:

1. **Klik "Save" di setiap variable**
2. **Redeploy project:**
   ```
   Go to: Deployments tab
   Klik "..." di deployment terakhir
   Klik "Redeploy"
   ```

3. **Atau push commit baru:**
   ```bash
   git commit --allow-empty -m "Trigger redeploy after env vars setup"
   git push origin main
   ```

---

## ✅ VERIFICATION:

Setelah setup, cek di Vercel Dashboard:
```
Settings > Environment Variables
```

Harus ada **9 variables** (atau 10 jika pakai XAI):
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ NEXT_PUBLIC_SITE_URL
- ✅ RESEND_API_KEY
- ✅ RESEND_FROM_EMAIL
- ✅ CSRF_SECRET
- ✅ RATE_LIMIT_SECRET
- ✅ WHATSAPP_NUMBER
- ⚪ XAI_API_KEY (optional)

---

## 🎉 DONE!

Setelah semua diisi dan redeploy:
- ✅ Website akan pakai environment variables yang benar
- ✅ Supabase connection akan berfungsi
- ✅ Email akan terkirim via Resend
- ✅ WhatsApp button akan berfungsi
- ✅ Security features aktif

**Website 100% production ready!** 🚀

---

## 📞 NEED HELP?

**WhatsApp:** +62 882-0227-83493

**Vercel Docs:** https://vercel.com/docs/projects/environment-variables

