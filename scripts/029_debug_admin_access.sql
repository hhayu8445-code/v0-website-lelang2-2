-- ============================================
-- DEBUG ADMIN ACCESS
-- ============================================
-- Script untuk check dan fix admin access
-- ============================================

-- 1. CHECK: Lihat semua users
SELECT 
  id,
  email,
  full_name,
  is_admin,
  role,
  kyc_status,
  created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- 2. CHECK: Lihat auth users
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 3. FIX: Set user sebagai admin
-- GANTI 'your-email@example.com' dengan email Anda!
UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'your-email@example.com';

-- 4. FIX: Verify email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your-email@example.com'
AND email_confirmed_at IS NULL;

-- 5. VERIFY: Check hasil
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
WHERE u.email = 'your-email@example.com';

-- ============================================
-- EXPECTED RESULT
-- ============================================
-- is_admin: true
-- role: admin
-- kyc_status: verified
-- email_confirmed_at: NOT NULL
-- ============================================
