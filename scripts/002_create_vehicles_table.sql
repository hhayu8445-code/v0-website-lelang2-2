-- Create vehicles table for auction listings
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2030),
  mileage INTEGER CHECK (mileage >= 0), -- Kilometer
  transmission TEXT CHECK (transmission IN ('Manual', 'Automatic', 'CVT', 'DCT')),
  fuel_type TEXT CHECK (fuel_type IN ('Bensin', 'Diesel', 'Hybrid', 'Electric')),
  color TEXT,
  starting_price DECIMAL(15,2) NOT NULL CHECK (starting_price > 0),
  current_bid DECIMAL(15,2),
  buy_now_price DECIMAL(15,2),
  condition TEXT CHECK (condition IN ('Excellent', 'Good', 'Fair')),
  description TEXT,
  location TEXT, -- Jakarta, Surabaya, Bandung, dll
  images TEXT[], -- Array URL gambar
  documents TEXT[], -- BPKB, STNK, dll
  auction_status TEXT DEFAULT 'upcoming' CHECK (auction_status IN ('upcoming', 'live', 'ended', 'sold')),
  auction_start_time TIMESTAMPTZ,
  auction_end_time TIMESTAMPTZ,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(auction_status);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_end_time ON vehicles(auction_end_time);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Public can view live and ended vehicles
CREATE POLICY "Public can view active vehicles" ON vehicles
  FOR SELECT USING (auction_status IN ('live', 'ended', 'sold'));

-- Sellers can view their own vehicles
CREATE POLICY "Sellers can view own vehicles" ON vehicles
  FOR SELECT USING (auth.uid() = seller_id);

-- Only admins can insert/update vehicles (will be enforced in application)
CREATE POLICY "Admins can manage vehicles" ON vehicles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
