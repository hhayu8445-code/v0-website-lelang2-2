# 🔐 ADMIN PANEL SETUP - 100% WORKING

## ⚠️ MASALAH: Admin Panel Tidak Bisa Dibuka

**Penyebab**:
1. User belum di-set sebagai admin
2. Kolom `is_admin` atau `role` belum di-set
3. User belum login

---

## ✅ SOLUSI LENGKAP (3 LANGKAH)

### STEP 1: Daftar Akun Admin (Jika Belum Punya)

1. Buka website: `http://localhost:3000/register`
2. Daftar dengan email admin Anda (contoh: `admin@lelangmobil.com`)
3. Verifikasi email (jika email verification aktif)
4. Login dengan akun tersebut

---

### STEP 2: Set User Sebagai Admin (WAJIB)

**Jalankan SQL Script di Supabase**:

```sql
-- Buka: Supabase Dashboard > SQL Editor > New Query

-- GANTI 'admin@lelangmobil.com' dengan email Anda!
UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'admin@lelangmobil.com';

-- Auto-verify email admin
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@lelangmobil.com'
AND email_confirmed_at IS NULL;

-- Verification: Check admin users
SELECT 
  id,
  email,
  full_name,
  is_admin,
  role,
  kyc_status
FROM users
WHERE is_admin = true OR role = 'admin';
```

**PENTING**: Ganti `admin@lelangmobil.com` dengan email Anda yang sudah terdaftar!

---

### STEP 3: Login & Akses Admin Panel

1. **Logout** (jika sudah login): `http://localhost:3000`
2. **Login** dengan akun admin: `http://localhost:3000/login`
3. **Akses admin panel**: `http://localhost:3000/admin`

---

## ✅ HASIL YANG DIHARAPKAN

### Setelah Set Admin:
```
✅ User memiliki is_admin = true
✅ User memiliki role = 'admin'
✅ User memiliki kyc_status = 'verified'
✅ Email sudah terverifikasi
```

### Setelah Login:
```
✅ Bisa akses /admin
✅ Dashboard admin muncul
✅ Sidebar admin muncul
✅ Semua menu admin bisa diakses
```

---

## 🎯 ADMIN PANEL FEATURES

### Menu Admin:
- ✅ **Dashboard** - Overview statistik
- ✅ **Verifikasi KYC** - Approve/reject KYC
- ✅ **Kelola Lelang** - Manage vehicles & auctions
- ✅ **Pengguna** - Manage users
- ✅ **Transaksi** - Manage transactions
- ✅ **Banner & Iklan** - Manage banners
- ✅ **Pengaturan Website** - Site settings
- ✅ **SEO & Semrush** - SEO management
- ✅ **Notifikasi** - Send notifications

---

## 🔧 TROUBLESHOOTING

### 1. "Akses ditolak. Anda bukan admin"
**Solusi**:
```sql
-- Check apakah user sudah di-set sebagai admin
SELECT email, is_admin, role FROM users WHERE email = 'your-email@example.com';

-- Jika belum, set sebagai admin
UPDATE users SET is_admin = true, role = 'admin' WHERE email = 'your-email@example.com';
```

### 2. Redirect ke /login terus
**Solusi**:
```
1. Clear browser cache & cookies
2. Logout dan login ulang
3. Check apakah email sudah terverifikasi
4. Check console browser untuk error
```

### 3. Admin panel loading terus
**Solusi**:
```
1. Check console browser (F12)
2. Check Supabase connection
3. Check apakah tabel users ada
4. Refresh page (Ctrl+F5)
```

### 4. Error "Users table not ready"
**Solusi**:
```sql
-- Check apakah tabel users ada
SELECT * FROM users LIMIT 1;

-- Jika error, jalankan database setup:
-- scripts/001_complete_database_setup.sql
```

---

## 📊 VERIFICATION CHECKLIST

### Check User Status:
```sql
-- Check user di database
SELECT 
  id,
  email,
  full_name,
  is_admin,
  role,
  kyc_status,
  created_at
FROM users
WHERE email = 'admin@lelangmobil.com';

-- Expected result:
-- is_admin: true
-- role: admin
-- kyc_status: verified
```

### Check Auth Status:
```sql
-- Check user di auth.users
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'admin@lelangmobil.com';

-- Expected result:
-- email_confirmed_at: NOT NULL (sudah terverifikasi)
```

---

## 🚀 QUICK FIX (Copy Paste)

### Jika Admin Panel Tidak Bisa Dibuka:

```sql
-- 1. Set user sebagai admin (GANTI EMAIL!)
UPDATE users 
SET is_admin = true, role = 'admin', kyc_status = 'verified'
WHERE email = 'GANTI_DENGAN_EMAIL_ANDA@example.com';

-- 2. Verify email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'GANTI_DENGAN_EMAIL_ANDA@example.com';

-- 3. Check hasil
SELECT email, is_admin, role, kyc_status FROM users 
WHERE email = 'GANTI_DENGAN_EMAIL_ANDA@example.com';
```

**Setelah jalankan script**:
1. Logout dari website
2. Login ulang dengan email admin
3. Akses: http://localhost:3000/admin

---

## ✅ ADMIN PANEL READY!

**Setelah setup selesai**:
- ✅ Admin panel bisa diakses
- ✅ Dashboard admin muncul
- ✅ Semua menu berfungsi
- ✅ Bisa manage users, vehicles, transactions
- ✅ Bisa approve KYC
- ✅ Bisa manage banners & settings

**Admin panel 100% working!** 🎉

---

## 📞 ADMIN PANEL URLS

- **Dashboard**: `/admin`
- **KYC**: `/admin/kyc`
- **Lelang**: `/admin/lelang`
- **Users**: `/admin/users`
- **Transaksi**: `/admin/transaksi`
- **Banners**: `/admin/cms/banners`
- **Settings**: `/admin/cms/settings`
- **SEO**: `/admin/seo`

---

## 🎯 NEXT STEPS

1. ✅ Set user sebagai admin (SQL script)
2. ✅ Login dengan akun admin
3. ✅ Akses admin panel
4. ✅ Test semua menu
5. ✅ Upload banner di CMS
6. ✅ Configure site settings
7. ✅ Approve KYC users

**Admin panel siap digunakan!** 🚀
