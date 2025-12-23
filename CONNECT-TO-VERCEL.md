# 🚀 CONNECT REPOSITORY KE VERCEL PROJECT

## Target: https://vercel.com/hah-cc4988b5/lelangmobil

---

## 📋 LANGKAH-LANGKAH (5 MENIT)

### **1. Connect Git Repository**

1. **Buka Settings:**
   ```
   https://vercel.com/hah-cc4988b5/lelangmobil/settings/git
   ```

2. **Connect Git Repository:**
   - Klik "Connect Git Repository"
   - Pilih: GitHub
   - Pilih repository: `hhayu8445-code/v0-website-lelang2-2`
   - Branch: `main`
   - Klik "Connect"

---

### **2. Set Environment Variables**

1. **Buka Environment Variables:**
   ```
   https://vercel.com/hah-cc4988b5/lelangmobil/settings/environment-variables
   ```

2. **Tambahkan Variables (WAJIB):**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://lelangmobil.vercel.app
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://lelangmobil.vercel.app/auth/callback
```

**Environment:** Production

---

### **3. Trigger Deployment**

**Option A: Manual Redeploy**
1. Buka: https://vercel.com/hah-cc4988b5/lelangmobil/deployments
2. Klik "..." pada deployment terakhir
3. Klik "Redeploy"

**Option B: Git Push (Otomatis)**
- Repository sudah connected
- Setiap push ke `main` akan auto-deploy
- Commit terbaru: `4610a86`

---

### **4. Update Supabase Redirect URLs**

1. **Buka Supabase:**
   ```
   https://supabase.com/dashboard
   ```

2. **Authentication → URL Configuration**

3. **Tambahkan:**
   ```
   https://lelangmobil.vercel.app/auth/callback
   https://lelangmobil.vercel.app/**
   ```

4. **Save**

---

## ✅ SETELAH CONNECT

**Auto-deploy akan aktif:**
- ✅ Push ke Git → Vercel auto-deploy
- ✅ Commit terbaru akan ter-deploy
- ✅ Admin Panel button akan muncul
- ✅ Semua update terbaru aktif

---

## 🎯 CHECKLIST

- [ ] Connect Git repository
- [ ] Set environment variables
- [ ] Trigger redeploy
- [ ] Update Supabase redirect URLs
- [ ] Test website
- [ ] Login sebagai admin
- [ ] Cek tombol Admin Panel

---

## 🚀 QUICK LINKS

- Git Settings: https://vercel.com/hah-cc4988b5/lelangmobil/settings/git
- Environment Variables: https://vercel.com/hah-cc4988b5/lelangmobil/settings/environment-variables
- Deployments: https://vercel.com/hah-cc4988b5/lelangmobil/deployments
- Website: https://lelangmobil.vercel.app

---

## 📊 SETELAH SELESAI

**Website akan:**
- ✅ Auto-deploy dari Git
- ✅ Menggunakan code terbaru
- ✅ Admin Panel button muncul
- ✅ Database terkoneksi
- ✅ Semua fitur berfungsi

**READY!** 🎉
