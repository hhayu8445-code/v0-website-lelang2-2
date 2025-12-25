# 🚀 DEPLOYMENT GUIDE - VERCEL

## 📋 PREREQUISITES

Sebelum deploy, pastikan:
- [x] Supabase sudah setup
- [x] .env.local sudah diisi
- [x] Test local berhasil (npm run dev)
- [x] Build berhasil (npm run build)

---

## STEP 1: SETUP VERCEL ENVIRONMENT VARIABLES

### 1.1 Login ke Vercel
1. Buka: https://vercel.com/dashboard
2. Login dengan akun Anda

### 1.2 Pilih Project
1. Cari project: `v0-website-lelang2-2`
2. Klik project tersebut

### 1.3 Buka Environment Variables
1. Klik **Settings** (tab atas)
2. Klik **Environment Variables** (menu kiri)

### 1.4 Add Variables (WAJIB)

Tambahkan satu per satu:

**1. NEXT_PUBLIC_SUPABASE_URL**
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co (dari .env.local)
Environment: Production ✅
```

**2. NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGci... (dari .env.local)
Environment: Production ✅
```

**3. SUPABASE_SERVICE_ROLE_KEY**
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGci... (dari .env.local)
Environment: Production ✅
```

**4. NEXT_PUBLIC_SITE_URL**
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://v0-website-lelang2-2-ecru.vercel.app
Environment: Production ✅
```

**5. CSRF_SECRET**
```
Key: CSRF_SECRET
Value: 1trJVERmCQqeDKkXBPZnaiGNUI43Hp6c
Environment: Production ✅
```

**6. NEXT_PUBLIC_WHATSAPP_NUMBER**
```
Key: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 62882022783493
Environment: Production ✅
```

---

## STEP 2: DEPLOY

### Option A: Auto Deploy (Git Push)
```bash
git add .
git commit -m "Setup production environment"
git push origin main
```

Vercel akan auto-deploy dalam 2-3 menit.

### Option B: Manual Deploy
1. Di Vercel dashboard
2. Klik **Deployments**
3. Klik **Redeploy**

---

## STEP 3: VERIFY DEPLOYMENT

1. Tunggu sampai status = **Ready**
2. Klik **Visit** untuk buka website
3. Test semua fitur

---

**Status:** [ ] Not Started [ ] Deployed [ ] Verified
