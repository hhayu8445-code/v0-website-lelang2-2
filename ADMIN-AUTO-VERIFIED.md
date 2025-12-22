# ✅ AUTO-VERIFIED ADMIN - SETUP CEPAT

## 🎯 LANGKAH SETUP (2 MENIT)

### 1. Buka Supabase SQL Editor
https://supabase.com/dashboard > Your Project > SQL Editor

### 2. Jalankan Script Auto-Verified Admin
Copy paste script ini dan klik **RUN**:

```sql
-- AUTO-VERIFIED ADMIN SETUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin_email BOOLEAN;
BEGIN
  is_admin_email := NEW.email = 'brothermcc@gmail.com';
  
  INSERT INTO public.users (
    id, email, full_name, phone, kyc_status,
    wallet_balance, bonus_balance, auction_participation_count,
    role, is_admin, created_at, updated_at
  )
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 
      CASE WHEN is_admin_email THEN 'Admin' ELSE split_part(NEW.email, '@', 1) END),
    NEW.raw_user_meta_data->>'phone',
    CASE WHEN is_admin_email THEN 'verified' ELSE 'pending' END,
    0,
    CASE WHEN is_admin_email THEN 0 ELSE 2500000 END,
    0,
    CASE WHEN is_admin_email THEN 'admin' ELSE 'user' END,
    is_admin_email,
    NOW(), NOW()
  );
  
  IF is_admin_email THEN
    UPDATE auth.users 
    SET email_confirmed_at = NOW(),
        raw_user_meta_data = jsonb_set(
          COALESCE(raw_user_meta_data, '{}'::jsonb),
          '{is_admin}', 'true'::jsonb
        )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing admin
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    raw_user_meta_data = jsonb_set(
      COALESCE(raw_user_meta_data, '{}'::jsonb),
      '{is_admin}', 'true'::jsonb
    )
WHERE email = 'brothermcc@gmail.com';

UPDATE public.users 
SET role = 'admin', is_admin = true, 
    kyc_status = 'verified', full_name = 'Admin'
WHERE email = 'brothermcc@gmail.com';
```

### 3. Signup di Website (Jika Belum)
1. Buka: https://www.lelangmobil.com/register
2. Email: `brothermcc@gmail.com`
3. Password: `anand123`
4. Nama: `Admin`

**OTOMATIS VERIFIED & ADMIN!** ✅

### 4. Login Langsung
- Email: brothermcc@gmail.com
- Password: anand123
- Akses: /admin (full access)

---

## ✅ FITUR AUTO-VERIFIED ADMIN

### Otomatis Saat Signup:
✅ Email verified (no confirmation needed)
✅ Role: admin
✅ is_admin: true
✅ kyc_status: verified
✅ Full admin access
✅ No bonus (admin tidak dapat bonus)

### User Biasa:
✅ Email perlu verifikasi
✅ Role: user
✅ Bonus: Rp 2.500.000
✅ kyc_status: pending

---

## 🧪 TEST ADMIN

### 1. Signup/Login
```
Email: brothermcc@gmail.com
Password: anand123
```

### 2. Cek Admin Access
```
✅ /admin - Admin dashboard
✅ /admin/users - User management
✅ /admin/lelang - Vehicle management
✅ /admin/transaksi - Transaction approval
✅ /admin/kyc - KYC approval
```

### 3. Verifikasi Database
```sql
SELECT email, role, is_admin, kyc_status, email_confirmed_at
FROM auth.users u
JOIN public.users p ON u.id = p.id
WHERE email = 'brothermcc@gmail.com';
```

**Result harus:**
- role: admin ✅
- is_admin: true ✅
- kyc_status: verified ✅
- email_confirmed_at: NOT NULL ✅

---

## 🎯 STATUS

✅ Script dibuat
✅ Pushed ke GitHub
✅ Auto-verified enabled
✅ Admin role automatic

**TINGGAL JALANKAN SQL SCRIPT DI SUPABASE!** 🚀

---

## 📞 QUICK LINKS

**Production**: https://www.lelangmobil.com
**Admin Login**: https://www.lelangmobil.com/login
**Admin Dashboard**: https://www.lelangmobil.com/admin

**Supabase**: https://supabase.com/dashboard
**SQL Script**: scripts/023_auto_verified_admin.sql

---

**ADMIN READY! brothermcc@gmail.com = AUTO VERIFIED + FULL ADMIN** ✅
