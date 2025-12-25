-- ============================================
-- CREATE ADMIN USER - SIMPLE VERSION
-- ============================================
-- CARA PAKAI:
-- 1. Register dulu via website dengan email Anda
-- 2. Ganti 'YOUR_EMAIL@gmail.com' di bawah dengan email Anda
-- 3. Copy paste semua script ini ke Supabase SQL Editor
-- 4. Klik Run
-- 5. Logout & login lagi
-- 6. Sekarang Anda bisa akses /admin
-- ============================================

-- GANTI EMAIL INI! 👇
DO $$
DECLARE
  admin_email TEXT := 'YOUR_EMAIL@gmail.com';  -- ⚠️ GANTI INI!
BEGIN
  -- Set user sebagai admin
  UPDATE public.users 
  SET 
    is_admin = true,
    role = 'admin',
    kyc_status = 'verified',
    wallet_balance = 10000000,  -- Bonus 10 juta untuk testing
    bonus_balance = 2500000     -- Bonus KYC
  WHERE email = admin_email;

  -- Verify email
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE email = admin_email
  AND email_confirmed_at IS NULL;

  -- Create profile jika belum ada
  INSERT INTO public.users (id, email, full_name, is_admin, role, kyc_status, wallet_balance, bonus_balance)
  SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', 'Admin'),
    true,
    'admin',
    'verified',
    10000000,
    2500000
  FROM auth.users
  WHERE email = admin_email
  ON CONFLICT (id) DO UPDATE
  SET 
    is_admin = true,
    role = 'admin',
    kyc_status = 'verified',
    wallet_balance = 10000000,
    bonus_balance = 2500000;

  RAISE NOTICE '✅ Admin user created/updated: %', admin_email;
END $$;

-- ============================================
-- VERIFICATION - Check hasilnya
-- ============================================
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.is_admin,
  u.role,
  u.kyc_status,
  u.wallet_balance,
  u.bonus_balance,
  au.email_confirmed_at
FROM public.users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.is_admin = true;

-- Expected result:
-- ✅ is_admin: true
-- ✅ role: admin
-- ✅ kyc_status: verified
-- ✅ wallet_balance: 10000000
-- ✅ email_confirmed_at: NOT NULL

-- ============================================
-- JIKA MASIH GAGAL, CEK INI:
-- ============================================

-- 1. Cek apakah user sudah register
SELECT email, email_confirmed_at FROM auth.users WHERE email = 'YOUR_EMAIL@gmail.com';

-- 2. Cek apakah profile sudah dibuat
SELECT email, is_admin, role FROM public.users WHERE email = 'YOUR_EMAIL@gmail.com';

-- 3. Jika belum ada, berarti belum register. Register dulu via website!
