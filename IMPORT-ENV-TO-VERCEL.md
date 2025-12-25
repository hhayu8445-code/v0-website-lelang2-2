# 📝 CARA IMPORT .ENV KE VERCEL

## File: .env.production

---

## 🚀 LANGKAH-LANGKAH

### **1. Edit File .env.production**

Buka file `.env.production` dan ganti nilai-nilai berikut:

#### A. Supabase (WAJIB)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara dapat:**
1. Buka: https://supabase.com/dashboard
2. Pilih project Anda
3. Settings → API
4. Copy URL dan Keys

#### B. Site URL (WAJIB)
```env
NEXT_PUBLIC_SITE_URL=https://v0-website-lelang2-2-ecru.vercel.app
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://v0-website-lelang2-2-ecru.vercel.app/auth/callback
```

**Sudah benar, tidak perlu diganti!**

---

### **2. Import ke Vercel (2 Cara)**

#### **CARA 1: Manual Copy-Paste (Tercepat)**

1. **Buka Vercel Dashboard:**
   ```
   https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
   ```

2. **Untuk setiap variable:**
   - Klik "Add New"
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - Environment: Production ✅
   - Klik "Save"

3. **Ulangi untuk semua variable yang WAJIB**

---

#### **CARA 2: Import File (Jika Vercel Support)**

1. **Buka Vercel Dashboard:**
   ```
   https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
   ```

2. **Cari tombol "Import" atau "Bulk Add"**

3. **Copy semua isi file .env.production**

4. **Paste ke form import**

5. **Pilih Environment: Production**

6. **Save**

---

### **3. Redeploy**

Setelah semua env variables ditambahkan:

1. **Buka Deployments:**
   ```
   https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/deployments
   ```

2. **Klik "..." pada deployment terakhir**

3. **Klik "Redeploy"**

4. **Tunggu 2-3 menit**

5. **Website live dengan database terkoneksi!**

---

## ✅ CHECKLIST

### Variables WAJIB:
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL

### Variables Optional:
- [ ] RESEND_API_KEY (untuk email)
- [ ] RESEND_FROM_EMAIL (untuk email)
- [ ] WHATSAPP_NUMBER
- [ ] CSRF_SECRET
- [ ] RATE_LIMIT_SECRET

---

## 🎯 SETELAH IMPORT

1. ✅ Redeploy di Vercel
2. ✅ Tunggu build selesai
3. ✅ Buka website
4. ✅ Test login/register
5. ✅ Admin panel akan muncul (jika sudah set admin di database)

---

## 📞 QUICK LINKS

- Vercel Env Variables: https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
- Vercel Deployments: https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/deployments
- Supabase Dashboard: https://supabase.com/dashboard
- Website: https://v0-website-lelang2-2-ecru.vercel.app

---

## ⚠️ PENTING

**Jangan commit file .env.production ke Git!**
File ini sudah ada di .gitignore.

**Hanya untuk import ke Vercel!**
