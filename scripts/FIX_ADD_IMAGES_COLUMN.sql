-- Fix: Add images column to vehicles table if not exists
-- Run this in Supabase SQL Editor

-- Add images column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'vehicles' 
        AND column_name = 'images'
    ) THEN
        ALTER TABLE vehicles ADD COLUMN images TEXT[];
        RAISE NOTICE 'Column images added successfully';
    ELSE
        RAISE NOTICE 'Column images already exists';
    END IF;
END $$;

-- Verify the column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vehicles' 
AND column_name = 'images';
