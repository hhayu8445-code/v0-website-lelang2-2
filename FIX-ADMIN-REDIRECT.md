# 🔧 FIX: Admin Redirect ke Login Terus

## ⚠️ MASALAH
Ketika buka `/admin`, malah redirect ke `/login` terus meskipun sudah login sebagai admin.

---

## ✅ SOLUSI (3 LANGKAH)

### 1️⃣ Verify User Sudah Login
```
1. Buka: http://localhost:3000/dashboard
2. Jika redirect ke /login → Belum login, login dulu
3. Jika bisa akses dashboard → Sudah login, lanjut step 2
```

### 2️⃣ Set User Sebagai Admin (WAJIB)
```sql
-- Supabase Dashboard > SQL Editor > New Query
-- GANTI 'your-email@example.com' dengan email Anda!

-- Check user saat ini
SELECT id, email, is_admin, role FROM users WHERE email = 'your-email@example.com';

-- Set sebagai admin
UPDATE users 
SET is_admin = true, role = 'admin', kyc_status = 'verified'
WHERE email = 'your-email@example.com';

-- Verify email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your-email@example.com';

-- Check hasil
SELECT 
  u.email,
  u.is_admin,
  u.role,
  u.kyc_status,
  au.email_confirmed_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'your-email@example.com';
```

**Expected Result**:
```
is_admin: true
role: admin
kyc_status: verified
email_confirmed_at: (ada tanggal)
```

### 3️⃣ Clear Cache & Login Ulang
```
1. Clear browser cache & cookies (Ctrl+Shift+Delete)
2. Close browser
3. Buka browser baru
4. Login: http://localhost:3000/login
5. Akses: http://localhost:3000/admin
```

---

## 🔍 DEBUG CHECKLIST

### A. Check Login Status
```
1. Buka: http://localhost:3000/dashboard
2. Jika bisa akses → Sudah login ✅
3. Jika redirect ke /login → Belum login ❌
```

### B. Check Admin Status
```sql
-- Jalankan di Supabase SQL Editor
SELECT email, is_admin, role FROM users WHERE email = 'your-email@example.com';

-- Expected:
-- is_admin: true ✅
-- role: admin ✅
```

### C. Check Email Verified
```sql
SELECT email, email_confirmed_at FROM auth.users WHERE email = 'your-email@example.com';

-- Expected:
-- email_confirmed_at: NOT NULL ✅
```

### D. Check Console Browser
```
1. Buka /admin
2. Tekan F12 (Developer Tools)
3. Lihat tab Console
4. Cari error merah
5. Screenshot dan kirim jika ada error
```

---

## 🚨 COMMON ISSUES

### Issue 1: "User not authenticated"
**Solusi**: Login ulang
```
1. Logout: http://localhost:3000
2. Login: http://localhost:3000/login
3. Akses: http://localhost:3000/admin
```

### Issue 2: "User is not admin"
**Solusi**: Set sebagai admin
```sql
UPDATE users SET is_admin = true, role = 'admin' WHERE email = 'your-email@example.com';
```

### Issue 3: "Email not confirmed"
**Solusi**: Verify email
```sql
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'your-email@example.com';
```

### Issue 4: Redirect loop terus
**Solusi**: Clear cache & cookies
```
1. Ctrl+Shift+Delete
2. Clear all cookies & cache
3. Close browser
4. Login ulang
```

---

## ✅ QUICK FIX (Copy Paste)

```sql
-- Supabase Dashboard > SQL Editor
-- GANTI EMAIL!

-- Set admin
UPDATE users 
SET is_admin = true, role = 'admin', kyc_status = 'verified'
WHERE email = 'GANTI_EMAIL_ANDA@example.com';

-- Verify email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'GANTI_EMAIL_ANDA@example.com';

-- Check
SELECT 
  u.email,
  u.is_admin,
  u.role,
  au.email_confirmed_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'GANTI_EMAIL_ANDA@example.com';
```

**Setelah jalankan**:
1. Clear cache (Ctrl+Shift+Delete)
2. Close browser
3. Login ulang
4. Akses /admin

---

## 📞 MASIH BERMASALAH?

### Check ini:
1. ✅ User sudah terdaftar?
2. ✅ User sudah login?
3. ✅ SQL script sudah dijalankan?
4. ✅ Email sudah diganti di SQL?
5. ✅ Cache sudah di-clear?
6. ✅ Browser sudah di-restart?

### Jika masih error:
```
1. Screenshot error di console (F12)
2. Screenshot hasil SQL query
3. Screenshot halaman /dashboard (bisa akses?)
4. Kirim screenshot untuk debugging
```

---

## ✅ ADMIN PANEL READY!

Setelah fix:
- ✅ Bisa akses /admin
- ✅ Dashboard admin muncul
- ✅ Sidebar admin muncul
- ✅ Semua menu berfungsi

**Admin panel siap digunakan!** 🎉
