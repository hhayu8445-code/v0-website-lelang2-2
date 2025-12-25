# 🚀 LELANGMOBIL.COM - Setup Guide

## 📌 MULAI DARI SINI!

Ikuti langkah-langkah di bawah untuk setup website lelang mobil Anda.

---

## ⚡ QUICK START (Pilih salah satu)

### Option 1: Automatic Setup (Recommended)
```bash
# Jalankan script ini:
quick-setup.bat
```

### Option 2: Manual Setup
Ikuti panduan di: **SETUP-GUIDE.md**

---

## 📋 YANG ANDA BUTUHKAN

Sebelum mulai, pastikan Anda punya:

1. ✅ **Node.js** (v18 atau lebih baru)
   - Download: https://nodejs.org
   - Check: `node --version`

2. ✅ **Akun Supabase** (Gratis)
   - Daftar: https://supabase.com
   - Untuk database & authentication

3. ✅ **Akun Vercel** (Gratis)
   - Daftar: https://vercel.com
   - Untuk hosting website

4. ⚪ **Akun Resend** (Optional - untuk email)
   - Daftar: https://resend.com
   - Bisa skip dulu untuk testing

---

## 🎯 LANGKAH SETUP (30-60 menit)

### Step 1: Clone & Install
```bash
cd v0-website-lelang2-2
npm install
```

### Step 2: Setup Supabase
1. Buka: https://supabase.com/dashboard
2. Buat project baru
3. Copy API keys
4. Run SQL: `scripts/DATABASE_100_PERCENT_FINAL.sql`

**Detail lengkap:** Lihat `SETUP-GUIDE.md` Step 1

### Step 3: Setup Environment Variables
```bash
# Generate secret keys
generate-secrets.bat

# Edit .env.local
# Isi semua values dengan API keys dari Supabase
```

**Detail lengkap:** Lihat `SETUP-GUIDE.md` Step 2

### Step 4: Test Local
```bash
npm run dev
```
Buka: http://localhost:3000

### Step 5: Deploy ke Vercel
```bash
git add .
git commit -m "Setup production"
git push origin main
```

Vercel akan auto-deploy!

---

## 📚 DOKUMENTASI LENGKAP

| File | Deskripsi |
|------|-----------|
| **SETUP-GUIDE.md** | Panduan setup lengkap step-by-step |
| **SETUP-CHECKLIST.md** | Checklist untuk tracking progress |
| **quick-setup.bat** | Script otomatis untuk setup |
| **generate-secrets.bat** | Generate secret keys |

---

## 🔧 COMMANDS

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build untuk production
npm run start        # Start production server
npm run lint         # Check code quality

# Setup
quick-setup.bat      # Auto setup (Windows)
generate-secrets.bat # Generate secret keys
```

---

## 📁 STRUKTUR PROJECT

```
v0-website-lelang2-2/
├── app/                    # Next.js pages
│   ├── (auth)/            # Login, Register
│   ├── admin/             # Admin panel
│   ├── dashboard/         # User dashboard
│   └── lelang/            # Auction pages
├── components/            # React components
│   ├── ui/               # UI components (buttons, cards, etc)
│   └── ...               # Business components
├── lib/                   # Utilities & helpers
│   ├── actions/          # Server actions
│   ├── supabase/         # Supabase client
│   └── ...
├── public/               # Static assets
│   ├── logo.svg         # Logo website
│   └── manifest.json    # PWA manifest
├── scripts/              # SQL scripts
│   └── DATABASE_100_PERCENT_FINAL.sql  # Main database setup
└── .env.local           # Environment variables (local)
```

---

## ✅ CHECKLIST PRODUCTION READY

Sebelum deploy ke production, pastikan:

- [ ] Supabase project sudah dibuat
- [ ] Database sudah di-setup (run SQL)
- [ ] Admin user sudah dibuat
- [ ] Environment variables sudah diisi
- [ ] Test local berhasil (npm run dev)
- [ ] Build berhasil (npm run build)
- [ ] Vercel environment variables sudah diisi
- [ ] Test production berhasil

**Track progress:** Gunakan `SETUP-CHECKLIST.md`

---

## 🆘 TROUBLESHOOTING

### Error: "Missing Supabase environment variables"
**Fix:**
1. Check `.env.local` sudah diisi
2. Restart dev server: `Ctrl+C` → `npm run dev`

### Error: "Failed to fetch"
**Fix:**
1. Check Supabase project masih running
2. Check API keys benar (copy paste lagi)
3. Check internet connection

### Error: Admin tidak bisa akses /admin
**Fix:**
1. Register user dulu via website
2. Jalankan `SET-ADMIN-USER.sql` dengan email yang sama
3. Logout & login lagi

### Build error
**Fix:**
```bash
# Clear cache & rebuild
rm -rf .next
npm run build
```

---

## 📞 SUPPORT

**WhatsApp:** +62 882-0227-83493

**Email:** support@lelangmobil.com

**Documentation:** Lihat folder `docs/`

---

## 🎯 NEXT STEPS SETELAH SETUP

1. **Tambah Data:**
   - Login sebagai admin
   - Tambah vehicles di `/admin/lelang/tambah`
   - Tambah banners di `/admin/cms/banners`

2. **Customize:**
   - Edit logo di `public/logo.svg`
   - Edit colors di `tailwind.config.ts`
   - Edit content di `app/page.tsx`

3. **Setup Email (Optional):**
   - Daftar di https://resend.com
   - Add API key ke environment variables
   - Test email verification

4. **Setup Domain (Optional):**
   - Beli domain (contoh: lelangmobil.com)
   - Connect ke Vercel
   - Update environment variables

---

## 📊 TECH STACK

- **Framework:** Next.js 16 + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel
- **Email:** Resend (optional)
- **3D Graphics:** Three.js + React Three Fiber

---

## 📝 LICENSE

Proprietary - All rights reserved

---

**Version:** 1.0.0  
**Last Updated:** ${new Date().toLocaleDateString('id-ID')}  
**Status:** Production Ready ✅
