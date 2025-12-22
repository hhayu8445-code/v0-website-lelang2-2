-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  name TEXT,
  role TEXT,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  vehicle TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  avatar TEXT,
  avatar_url TEXT,
  vehicle_purchased TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  -- Added missing columns for approval workflow
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_vehicle_id ON public.testimonials(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);
-- Added indexes for filtering by approval status
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON public.testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);

-- Update trigger
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for testimonials table
-- Everyone can view approved/active/featured testimonials
CREATE POLICY "Anyone can view approved testimonials"
  ON public.testimonials
  FOR SELECT
  USING (is_active = TRUE OR is_approved = TRUE OR is_featured = TRUE);

-- Users can create their own testimonials
CREATE POLICY "Users can create testimonials"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own testimonials (only if not yet approved)
CREATE POLICY "Users can update own testimonials"
  ON public.testimonials
  FOR UPDATE
  USING (auth.uid() = user_id AND is_approved = FALSE)
  WITH CHECK (auth.uid() = user_id AND is_approved = FALSE);

-- Admins can update all testimonials
CREATE POLICY "Admins can update testimonials"
  ON public.testimonials
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

COMMENT ON TABLE public.testimonials IS 'User testimonials and reviews with approval workflow';
