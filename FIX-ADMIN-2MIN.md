# 🔐 FIX ADMIN PANEL - 2 MENIT

## ⚡ QUICK FIX

### 1. Daftar Akun (Jika Belum Punya)
```
http://localhost:3000/register
Email: admin@lelangmobil.com (atau email Anda)
```

### 2. Set Sebagai Admin (WAJIB)
```sql
-- Supabase Dashboard > SQL Editor > New Query
-- GANTI EMAIL dengan email Anda!

UPDATE users 
SET is_admin = true, role = 'admin', kyc_status = 'verified'
WHERE email = 'admin@lelangmobil.com';

UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@lelangmobil.com';
```

### 3. Login & Akses
```
1. Logout (jika sudah login)
2. Login: http://localhost:3000/login
3. Akses: http://localhost:3000/admin
```

---

## ✅ DONE!

Admin panel sekarang bisa diakses! 🎉

---

## 📋 CHECKLIST

- [ ] Daftar akun admin
- [ ] Jalankan SQL script (ganti email!)
- [ ] Logout & login ulang
- [ ] Akses /admin
- [ ] Dashboard admin muncul

---

## 🚨 TROUBLESHOOTING

**"Akses ditolak"**:
```sql
-- Check status
SELECT email, is_admin, role FROM users WHERE email = 'your-email';

-- Set admin
UPDATE users SET is_admin = true, role = 'admin' WHERE email = 'your-email';
```

**Redirect ke /login**:
- Clear cache & cookies
- Logout & login ulang
- Check email sudah terverifikasi

---

**ADMIN PANEL READY!** 🚀
