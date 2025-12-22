-- Fix testimonials table to allow testimonials without user_id (for imported/seeded testimonials)
ALTER TABLE testimonials 
  ALTER COLUMN user_id DROP NOT NULL;

-- Update the RLS policy to allow testimonials without user_id
DROP POLICY IF EXISTS "Users can create testimonials" ON testimonials;

CREATE POLICY "Users can create testimonials" ON testimonials
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR user_id IS NULL
  );

-- Add policy for admin to manage all testimonials
CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON testimonials(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
