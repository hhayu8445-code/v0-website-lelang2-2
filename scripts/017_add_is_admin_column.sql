-- Add is_admin column to users table for backward compatibility
-- This migration adds the is_admin boolean column alongside the role column
-- Both columns will be kept in sync automatically

-- Add the is_admin column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Create a function to sync is_admin with role
CREATE OR REPLACE FUNCTION sync_user_admin_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_admin := (NEW.role = 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically sync is_admin when role changes
DROP TRIGGER IF EXISTS sync_admin_status_trigger ON users;
CREATE TRIGGER sync_admin_status_trigger
  BEFORE INSERT OR UPDATE OF role ON users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_admin_status();

-- Update existing records
UPDATE users SET is_admin = (role = 'admin');

-- Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);
