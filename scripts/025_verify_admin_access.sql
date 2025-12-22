-- VERIFY AND FIX ADMIN ACCESS
-- Run this in Supabase SQL Editor

-- 1. Check current admin status
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.role,
  p.is_admin,
  p.kyc_status
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'brothermcc@gmail.com';

-- 2. Force update admin status
UPDATE public.users 
SET 
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified',
  full_name = 'Admin LELANGMOBIL.COM',
  phone = '+6281234567890',
  address = 'Jl. Sudirman No. 123, Kav. 45-46',
  city = 'Jakarta Selatan',
  province = 'DKI Jakarta',
  postal_code = '12190',
  country = 'Indonesia',
  updated_at = NOW()
WHERE email = 'brothermcc@gmail.com';

-- 3. Update auth metadata
UPDATE auth.users 
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{is_admin}',
    'true'::jsonb
  ),
  updated_at = NOW()
WHERE email = 'brothermcc@gmail.com';

-- 4. Verify update
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at IS NOT NULL as email_verified,
  u.raw_user_meta_data->>'is_admin' as metadata_admin,
  p.role,
  p.is_admin,
  p.kyc_status,
  p.full_name
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'brothermcc@gmail.com';

-- Expected result:
-- email_verified: true
-- metadata_admin: true
-- role: admin
-- is_admin: true
-- kyc_status: verified
