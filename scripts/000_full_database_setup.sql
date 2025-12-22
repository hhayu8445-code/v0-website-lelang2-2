-- =====================================================
-- FULL DATABASE SETUP FOR LELANG MOBIL
-- Run this script to set up all tables at once
-- =====================================================

-- 1. CREATE USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  full_name TEXT NOT NULL,
  id_card_number TEXT UNIQUE,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  kyc_documents JSONB,
  wallet_balance DECIMAL(15,2) DEFAULT 0 CHECK (wallet_balance >= 0),
  bonus_balance DECIMAL(15,2) DEFAULT 0 CHECK (bonus_balance >= 0),
  auction_participation_count INTEGER DEFAULT 0,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_kyc_status ON users(kyc_status);

-- 2. CREATE VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2030),
  mileage INTEGER CHECK (mileage >= 0),
  transmission TEXT CHECK (transmission IN ('Manual', 'Automatic', 'CVT', 'DCT')),
  fuel_type TEXT CHECK (fuel_type IN ('Bensin', 'Diesel', 'Hybrid', 'Electric')),
  color TEXT,
  starting_price DECIMAL(15,2) NOT NULL CHECK (starting_price > 0),
  current_bid DECIMAL(15,2),
  buy_now_price DECIMAL(15,2),
  condition TEXT CHECK (condition IN ('Excellent', 'Good', 'Fair')),
  description TEXT,
  location TEXT,
  images TEXT[],
  documents TEXT[],
  auction_status TEXT DEFAULT 'upcoming' CHECK (auction_status IN ('upcoming', 'live', 'ended', 'sold')),
  auction_start_time TIMESTAMPTZ,
  auction_end_time TIMESTAMPTZ,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(auction_status);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_end_time ON vehicles(auction_end_time);

-- 3. CREATE BIDS TABLE
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bid_amount DECIMAL(15,2) NOT NULL CHECK (bid_amount > 0),
  bid_time TIMESTAMPTZ DEFAULT NOW(),
  is_auto_bid BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'outbid', 'winner', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_bids_vehicle ON bids(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bids_user ON bids(user_id);
CREATE INDEX IF NOT EXISTS idx_bids_time ON bids(bid_time DESC);

-- 4. CREATE TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bid_hold', 'bid_release', 'payment', 'refund', 'bonus')),
  amount DECIMAL(15,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  reference_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- 5. CREATE KYC DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS kyc_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('ktp', 'selfie', 'npwp')),
  document_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kyc_user ON kyc_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON kyc_documents(status);

-- 6. CREATE TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CREATE BANK ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bank_user ON bank_accounts(user_id);

-- 8. CREATE NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'bid', 'auction')),
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- 9. CREATE CMS TABLES
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CREATE SEO METADATA TABLE
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- Users policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow insert for authenticated users" ON users;
CREATE POLICY "Allow insert for authenticated users" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Vehicles policies
DROP POLICY IF EXISTS "Public can view active vehicles" ON vehicles;
CREATE POLICY "Public can view active vehicles" ON vehicles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage vehicles" ON vehicles;
CREATE POLICY "Admins can manage vehicles" ON vehicles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true))
  );

-- Bids policies
DROP POLICY IF EXISTS "Users can view bids" ON bids;
CREATE POLICY "Users can view bids" ON bids
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can place bids" ON bids;
CREATE POLICY "Users can place bids" ON bids
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions policies
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

-- KYC Documents policies
DROP POLICY IF EXISTS "Users can view own kyc" ON kyc_documents;
CREATE POLICY "Users can view own kyc" ON kyc_documents
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload kyc" ON kyc_documents;
CREATE POLICY "Users can upload kyc" ON kyc_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Testimonials policies
DROP POLICY IF EXISTS "Public can view approved testimonials" ON testimonials;
CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true OR is_featured = true);

-- Bank accounts policies
DROP POLICY IF EXISTS "Users can manage own bank accounts" ON bank_accounts;
CREATE POLICY "Users can manage own bank accounts" ON bank_accounts
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED SAMPLE DATA
-- =====================================================

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, rating, is_featured, is_approved) VALUES
('Budi Santoso', 'Pengusaha', 'Platform lelang mobil terbaik! Proses transparan dan cepat. Saya berhasil mendapatkan mobil impian dengan harga yang sangat kompetitif.', 5, true, true),
('Siti Rahayu', 'Dokter', 'Sangat puas dengan pelayanannya. Tim customer service sangat membantu dan responsif. Recommended!', 5, true, true),
('Ahmad Hidayat', 'Karyawan Swasta', 'Proses KYC mudah dan cepat. Dalam hitungan jam sudah bisa ikut lelang. Pengalaman pertama yang menyenangkan!', 4, true, true),
('Diana Putri', 'Wiraswasta', 'Sudah 3x ikut lelang dan selalu puas. Mobil yang didapat sesuai deskripsi dan kondisi bagus.', 5, true, true)
ON CONFLICT DO NOTHING;

-- Insert sample vehicles for testing
INSERT INTO vehicles (brand, model, year, mileage, transmission, fuel_type, color, starting_price, current_bid, condition, description, location, auction_status, auction_start_time, auction_end_time, images) VALUES
('Toyota', 'Fortuner VRZ', 2022, 25000, 'Automatic', 'Diesel', 'Putih', 450000000, 455000000, 'Excellent', 'Toyota Fortuner VRZ 2.4 Diesel AT 4x2. Kondisi istimewa, servis record lengkap dealer resmi. Pajak panjang.', 'Jakarta', 'live', NOW(), NOW() + INTERVAL '3 days', ARRAY['/placeholder.svg?height=400&width=600']),
('Honda', 'CR-V Turbo', 2021, 30000, 'CVT', 'Bensin', 'Hitam', 380000000, 385000000, 'Excellent', 'Honda CR-V 1.5 Turbo Prestige. Full original, ban baru semua, interior bersih terawat.', 'Surabaya', 'live', NOW(), NOW() + INTERVAL '2 days', ARRAY['/placeholder.svg?height=400&width=600']),
('BMW', '320i Sport', 2020, 35000, 'Automatic', 'Bensin', 'Biru', 520000000, NULL, 'Good', 'BMW 320i Sport Line G20. Mesin sehat, kaki-kaki empuk, eksterior mulus.', 'Bandung', 'upcoming', NOW() + INTERVAL '1 day', NOW() + INTERVAL '4 days', ARRAY['/placeholder.svg?height=400&width=600']),
('Mercedes-Benz', 'C200 AMG', 2021, 20000, 'Automatic', 'Bensin', 'Silver', 650000000, NULL, 'Excellent', 'Mercedes-Benz C200 AMG Line. Warranty aktif, servis record dealer. Pajak baru perpanjang.', 'Jakarta', 'upcoming', NOW() + INTERVAL '2 days', NOW() + INTERVAL '5 days', ARRAY['/placeholder.svg?height=400&width=600'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- ENABLE REALTIME (Optional)
-- =====================================================

-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE bids;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
