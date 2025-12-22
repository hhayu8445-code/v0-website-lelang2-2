-- Create bids table
CREATE TABLE IF NOT EXISTS public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  bid_amount DECIMAL(15, 2) NOT NULL CHECK (bid_amount > 0),
  bid_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_auto_bid BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'outbid', 'winner', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bids_vehicle_id ON public.bids(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bids_user_id ON public.bids(user_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON public.bids(status);
CREATE INDEX IF NOT EXISTS idx_bids_bid_time ON public.bids(bid_time DESC);
CREATE INDEX IF NOT EXISTS idx_bids_vehicle_time ON public.bids(vehicle_id, bid_time DESC);

-- Enable RLS
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bids table
-- Users can view bids for vehicles they're interested in
CREATE POLICY "Users can view bids for any vehicle"
  ON public.bids
  FOR SELECT
  USING (TRUE);

-- Users can view their own bids
CREATE POLICY "Users can view own bids"
  ON public.bids
  FOR SELECT
  USING (auth.uid() = user_id);

-- Authenticated users can insert bids
CREATE POLICY "Authenticated users can place bids"
  ON public.bids
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all bids
CREATE POLICY "Admins can view all bids"
  ON public.bids
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Admins can update bids
CREATE POLICY "Admins can update bids"
  ON public.bids
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

COMMENT ON TABLE public.bids IS 'Bid history for vehicle auctions';
