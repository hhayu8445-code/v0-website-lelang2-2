-- Create bids table for auction bidding history
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bid_amount DECIMAL(15,2) NOT NULL CHECK (bid_amount > 0),
  bid_time TIMESTAMPTZ DEFAULT NOW(),
  is_auto_bid BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'outbid', 'winner', 'cancelled'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bids_vehicle ON bids(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bids_user ON bids(user_id);
CREATE INDEX IF NOT EXISTS idx_bids_time ON bids(bid_time DESC);

-- Enable Row Level Security
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Users can view bids for active auctions
CREATE POLICY "Users can view bids" ON bids
  FOR SELECT USING (true);

-- Only verified users can place bids
CREATE POLICY "Verified users can place bids" ON bids
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND kyc_status = 'verified'
    )
  );
