-- ============================================
-- SET ADMIN USER - PRODUCTION
-- ============================================
-- GANTI EMAIL DI BAWAH DENGAN EMAIL ANDA!
-- ============================================

-- Set user sebagai admin
UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'admin@lelangmobil.com';

-- Verify email admin
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@lelangmobil.com'
AND email_confirmed_at IS NULL;

-- ============================================
-- VERIFICATION - Jalankan ini untuk cek
-- ============================================

SELECT 
  u.id,
  u.email,
  u.full_name,
  u.is_admin,
  u.role,
  u.kyc_status,
  au.email_confirmed_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'admin@lelangmobil.com';

-- Expected result:
-- is_admin: true (harus true!)
-- role: admin (harus admin!)
-- kyc_status: verified
-- email_confirmed_at: NOT NULL

-- ============================================
-- JIKA MASIH NULL, JALANKAN INI:
-- ============================================

-- Create user profile jika belum ada
INSERT INTO users (id, email, full_name, is_admin, role, kyc_status)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', email),
  true,
  'admin',
  'verified'
FROM auth.users
WHERE email = 'admin@lelangmobil.com'
ON CONFLICT (id) DO UPDATE
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified';
