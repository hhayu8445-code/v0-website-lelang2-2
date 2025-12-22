# 🚀 Auto Deploy ke Vercel

## Setup Sekali Saja (5 Menit)

### 1. Login ke Vercel
- Buka: https://vercel.com
- Login dengan GitHub

### 2. Import Repository
- Klik **"Add New"** → **"Project"**
- Pilih repository: `hhayu8445-code/v0-website-lelang2-2`
- Klik **"Import"**

### 3. Configure Project
**Framework Preset:** Next.js (auto-detect)

**Environment Variables** - Tambahkan:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
XAI_API_KEY=your_xai_api_key (optional)
```

### 4. Deploy
- Klik **"Deploy"**
- Tunggu 2-3 menit

## ✅ Selesai!

Sekarang setiap kali Anda:
- `git push` ke GitHub
- Vercel otomatis deploy dalam 2-3 menit
- Website langsung update 100%

## 📱 Cara Pakai

```bash
# Edit code
git add .
git commit -m "update fitur"
git push

# Vercel otomatis deploy!
```

## 🔗 Link Website
Setelah deploy, Anda dapat:
- Production: `https://your-project.vercel.app`
- Custom domain: Setting di Vercel Dashboard

## 🔄 Status Deploy
Cek di: https://vercel.com/dashboard
