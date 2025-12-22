-- Create admin user with email brothermcc@gmail.com
-- Password: anand123

-- Note: In Supabase, users must be created through Supabase Auth
-- This script will insert the user profile data
-- The actual auth user must be created through Supabase dashboard or API

-- First, check if user already exists
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Try to find existing auth user
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'brothermcc@gmail.com' 
  LIMIT 1;

  -- If user exists, update their profile to admin
  IF admin_user_id IS NOT NULL THEN
    -- Update users table to set as admin
    UPDATE users 
    SET 
      role = 'admin',
      is_admin = true,
      kyc_status = 'verified',
      updated_at = NOW()
    WHERE id = admin_user_id;

    RAISE NOTICE 'Admin user updated: %', admin_user_id;
  ELSE
    RAISE NOTICE 'User not found in auth.users. Please create user brothermcc@gmail.com through Supabase Auth first.';
  END IF;
END $$;

-- Alternative: If you want to create a placeholder user profile
-- This will only work if the auth user exists
-- Fixed: replaced "balance" with "wallet_balance" and "bonus_balance"
INSERT INTO users (
  id,
  email,
  full_name,
  phone,
  role,
  is_admin,
  kyc_status,
  wallet_balance,
  bonus_balance,
  created_at,
  updated_at
)
SELECT 
  id,
  'brothermcc@gmail.com',
  'Admin User',
  '081234567890',
  'admin',
  true,
  'verified',
  0,
  0,
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'brothermcc@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified',
  updated_at = NOW();
