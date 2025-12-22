-- Create Admin User Script
-- Email: brothermcc@gmail.com
-- Password: anand123

-- Step 1: Create auth user (run this in Supabase SQL Editor)
-- Note: You need to sign up first via the app, then run this to make admin

-- Step 2: Update user to admin after signup
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{is_admin}',
  'true'::jsonb
)
WHERE email = 'brothermcc@gmail.com';

-- Step 3: Update users table
UPDATE public.users 
SET 
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified'
WHERE email = 'brothermcc@gmail.com';

-- Step 4: Grant admin privileges
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  is_admin,
  kyc_status,
  wallet_balance,
  bonus_balance,
  created_at
)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', 'Admin'),
  'admin',
  true,
  'verified',
  0,
  0,
  created_at
FROM auth.users
WHERE email = 'brothermcc@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified';
