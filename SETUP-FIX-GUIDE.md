# 🔧 PANDUAN SETUP LENGKAP - LELANGMOBIL.COM

## ⚠️ MASALAH YANG TERJADI

Deployment sebelumnya merusak aplikasi karena:
1. ❌ Middleware conflict dengan proxy.ts
2. ❌ Next.js 16 config tidak kompatibel
3. ❌ Icon/gambar rusak
4. ❌ Database tidak terintegrasi

## ✅ SOLUSI & PERBAIKAN

### 1. ROLLBACK KE VERSI STABIL
```bash
cd "d:\New folder (18)\v0-website-lelang2-2"
git reset --hard a4143cd
```
✅ **SUDAH DILAKUKAN**

---

## 🗄️ SETUP DATABASE SUPABASE

### Step 1: Buat Tabel Users (Jika Belum Ada)
Jalankan di Supabase SQL Editor:

```sql
-- Jalankan script ini
\i scripts/001_complete_database_setup.sql
```

### Step 2: Setup Auto-Create User Profile
```sql
-- Jalankan script ini
\i scripts/021_auto_create_user_profile.sql
```

### Step 3: Buat Admin User
**Email**: brothermcc@gmail.com
**Password**: anand123

**Cara 1 - Signup Manual:**
1. Buka website
2. Register dengan email: brothermcc@gmail.com
3. Password: anand123
4. Setelah signup, jalankan SQL:

```sql
-- Jalankan di Supabase SQL Editor
\i scripts/create-admin.sql
```

**Cara 2 - Direct SQL:**
```sql
-- 1. Insert ke auth.users (ganti USER_ID dengan UUID baru)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
)
VALUES (
  gen_random_uuid(),
  'brothermcc@gmail.com',
  crypt('anand123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Admin", "is_admin": true}'::jsonb
);

-- 2. Insert ke public.users
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  is_admin,
  kyc_status,
  wallet_balance,
  bonus_balance
)
SELECT 
  id,
  'brothermcc@gmail.com',
  'Admin',
  'admin',
  true,
  'verified',
  0,
  2500000
FROM auth.users
WHERE email = 'brothermcc@gmail.com';
```

---

## 🔗 INTEGRASI DATABASE

### Verifikasi Koneksi
1. Cek environment variables di Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

2. Test koneksi:
```bash
npm run dev
# Buka http://localhost:3000
# Coba register user baru
```

### Cek Integrasi Profile
Setelah signup, cek di Supabase:
```sql
-- Cek user di auth.users
SELECT id, email, created_at FROM auth.users;

-- Cek profile di public.users
SELECT id, email, full_name, wallet_balance, bonus_balance 
FROM public.users;
```

---

## 🖼️ FIX ICON & GAMBAR

### Masalah Icon Rusak
Penyebab: Path icon tidak benar atau file hilang

### Solusi:
1. Cek file icon ada:
```bash
dir public\*.png
dir public\*.svg
```

2. Pastikan file ini ada:
- public/logo.png
- public/icon.svg
- public/placeholder.svg
- public/placeholder.jpg

3. Jika hilang, restore dari backup atau buat ulang

---

## 🚀 DEPLOYMENT YANG BENAR

### Step 1: Verifikasi Local
```bash
npm install
npm run build
npm run dev
```

### Step 2: Test Semua Fitur
- ✅ Register user baru
- ✅ Login
- ✅ Profile muncul
- ✅ Icon/gambar tampil
- ✅ Dashboard accessible

### Step 3: Commit & Push
```bash
git add .
git commit -m "fix: restore stable version + database integration"
git push origin main
```

### Step 4: Configure Vercel
1. Buka Vercel Dashboard
2. Settings > Environment Variables
3. Tambahkan semua env variables
4. Redeploy

---

## 📊 CHECKLIST INTEGRASI DATABASE

### Auth Integration
- [x] Supabase auth configured
- [x] Signup creates auth.users
- [x] Login works
- [x] Session management

### Profile Integration
- [ ] Auto-create profile trigger installed
- [ ] Signup creates public.users record
- [ ] Profile data synced
- [ ] Bonus balance added (Rp 2.5M)

### Admin Integration
- [ ] Admin user created (brothermcc@gmail.com)
- [ ] Admin role assigned
- [ ] Admin dashboard accessible
- [ ] Admin permissions working

### Features Integration
- [ ] KYC system connected
- [ ] Wallet system connected
- [ ] Bidding system connected
- [ ] Transaction history connected

---

## 🔍 TROUBLESHOOTING

### Problem: User signup tidak create profile
**Solution**: 
```sql
-- Install trigger
\i scripts/021_auto_create_user_profile.sql
```

### Problem: Admin tidak bisa akses dashboard
**Solution**:
```sql
UPDATE public.users 
SET role = 'admin', is_admin = true 
WHERE email = 'brothermcc@gmail.com';
```

### Problem: Icon/gambar tidak muncul
**Solution**:
1. Cek file ada di public/
2. Cek Next.js image config
3. Clear cache: `rm -rf .next`

### Problem: Database connection error
**Solution**:
1. Cek env variables
2. Cek Supabase project status
3. Cek RLS policies

---

## 📞 NEXT STEPS

1. **Setup Database** ✅
   - Run SQL scripts
   - Create admin user
   - Test integration

2. **Fix Icons** ✅
   - Verify files exist
   - Test locally

3. **Deploy** ✅
   - Test local first
   - Push to GitHub
   - Configure Vercel

4. **Verify** ✅
   - Test signup
   - Test login
   - Test admin access
   - Test all features

---

## ✅ VERIFICATION COMMANDS

```bash
# Test database connection
npm run dev
# Visit http://localhost:3000/register

# Check logs
npm run dev 2>&1 | grep -i "supabase\|database\|error"

# Build test
npm run build
```

---

**Status**: 🟡 IN PROGRESS
**Priority**: 🔴 HIGH
**ETA**: 30 minutes

Ikuti langkah-langkah di atas untuk fix semua masalah!