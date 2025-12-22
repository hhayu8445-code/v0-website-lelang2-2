-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
  mileage INTEGER CHECK (mileage >= 0),
  transmission TEXT CHECK (transmission IN ('Manual', 'Automatic', 'CVT', 'DCT')),
  fuel_type TEXT CHECK (fuel_type IN ('Bensin', 'Diesel', 'Hybrid', 'Electric', 'CNG')),
  color TEXT,
  starting_price DECIMAL(15, 2) NOT NULL CHECK (starting_price > 0),
  current_bid DECIMAL(15, 2) CHECK (current_bid >= starting_price),
  buy_now_price DECIMAL(15, 2) CHECK (buy_now_price IS NULL OR buy_now_price > starting_price),
  condition TEXT CHECK (condition IN ('Excellent', 'Good', 'Fair', 'Poor')),
  description TEXT,
  location TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
  documents TEXT[] DEFAULT ARRAY[]::TEXT[],
  auction_status TEXT DEFAULT 'upcoming' CHECK (auction_status IN ('upcoming', 'live', 'ended', 'sold', 'cancelled')),
  auction_start_time TIMESTAMPTZ,
  auction_end_time TIMESTAMPTZ,
  seller_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  view_count INTEGER DEFAULT 0 NOT NULL,
  bid_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vehicles_auction_status ON public.vehicles(auction_status);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON public.vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON public.vehicles(location);
CREATE INDEX IF NOT EXISTS idx_vehicles_price_range ON public.vehicles(starting_price);
CREATE INDEX IF NOT EXISTS idx_vehicles_auction_end_time ON public.vehicles(auction_end_time);
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at ON public.vehicles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vehicles_seller_id ON public.vehicles(seller_id);

-- Update trigger
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vehicles table
-- Allow everyone to view active vehicles
CREATE POLICY "Anyone can view active vehicles"
  ON public.vehicles
  FOR SELECT
  USING (auction_status IN ('upcoming', 'live', 'ended', 'sold'));

-- Allow admins to view all vehicles
CREATE POLICY "Admins can view all vehicles"
  ON public.vehicles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Allow admins to insert vehicles
CREATE POLICY "Admins can insert vehicles"
  ON public.vehicles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Allow admins to update vehicles
CREATE POLICY "Admins can update vehicles"
  ON public.vehicles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Allow admins to delete vehicles
CREATE POLICY "Admins can delete vehicles"
  ON public.vehicles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

COMMENT ON TABLE public.vehicles IS 'Vehicle listings for auction';
