# 👤 SET ADMIN USER

## Belum ada akun admin! Anda harus set manual di database.

---

## 🚀 CARA SET ADMIN (2 MENIT)

### **STEP 1: Registrasi Akun**

1. **Buka website:**
   ```
   https://v0-website-lelang2-2-ecru.vercel.app/register
   ```

2. **Daftar dengan email Anda:**
   - Email: `your-email@gmail.com` (email Anda!)
   - Password: (password Anda)
   - Nama: (nama Anda)

3. **Klik "Daftar"**

4. **Jika ada email verification:**
   - Check inbox email
   - Klik link verifikasi
   - Atau skip jika sudah disable email verification

---

### **STEP 2: Set Sebagai Admin di Database**

1. **Buka Supabase SQL Editor:**
   ```
   https://supabase.com/dashboard → SQL Editor
   ```

2. **Klik "+ New Query"**

3. **Copy paste script ini:**

```sql
-- GANTI EMAIL INI dengan email Anda!
UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'your-email@gmail.com';

-- Verify email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your-email@gmail.com'
AND email_confirmed_at IS NULL;

-- Cek hasilnya
SELECT 
  u.email,
  u.is_admin,
  u.role,
  u.kyc_status,
  au.email_confirmed_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'your-email@gmail.com';
```

4. **GANTI `your-email@gmail.com` dengan email Anda!**

5. **Klik "Run" (atau Ctrl+Enter)**

6. **Verify hasil:**
   - is_admin: `true` ✅
   - role: `admin` ✅
   - kyc_status: `verified` ✅
   - email_confirmed_at: (ada tanggal) ✅

---

### **STEP 3: Test Admin Panel**

1. **Logout dari website** (jika sudah login)

2. **Clear browser cache:**
   - Tekan `Ctrl + Shift + Delete`
   - Pilih "Cached images and files"
   - Clear data

3. **Login lagi:**
   ```
   https://v0-website-lelang2-2-ecru.vercel.app/login
   ```

4. **Setelah login, cek header:**
   - Harus ada tombol **"Admin Panel"** (warna orange) ✅

5. **Klik tombol Admin Panel:**
   - Harus redirect ke `/admin` ✅
   - Dashboard admin muncul ✅

---

## ✅ SELESAI!

**Akun Anda sekarang adalah ADMIN!**

Anda bisa:
- ✅ Akses Admin Panel
- ✅ Kelola Lelang
- ✅ Verifikasi KYC
- ✅ Kelola Users
- ✅ Kelola Transaksi
- ✅ Dan semua fitur admin lainnya

---

## 🔧 TROUBLESHOOTING

### Tombol Admin Panel tidak muncul?

**Solusi:**
1. Check database: `SELECT is_admin, role FROM users WHERE email = 'your-email@gmail.com'`
2. Harus: `is_admin = true` dan `role = admin`
3. Logout & clear cache
4. Login lagi

### Redirect ke /dashboard saat akses /admin?

**Solusi:**
1. Jalankan SQL script lagi
2. Pastikan `is_admin = true` dan `role = admin`
3. Clear cache & login lagi

### Email tidak terverifikasi?

**Solusi:**
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your-email@gmail.com';
```

---

## 📞 QUICK LINKS

- Website: https://v0-website-lelang2-2-ecru.vercel.app
- Register: https://v0-website-lelang2-2-ecru.vercel.app/register
- Login: https://v0-website-lelang2-2-ecru.vercel.app/login
- Supabase: https://supabase.com/dashboard
- SQL Script: `scripts/SET-ADMIN-USER.sql`

---

## 🎯 SUMMARY

1. ✅ Registrasi akun di website
2. ✅ Jalankan SQL script di Supabase (ganti email!)
3. ✅ Logout & clear cache
4. ✅ Login lagi
5. ✅ Tombol Admin Panel muncul!

**SELESAI!** 🚀
