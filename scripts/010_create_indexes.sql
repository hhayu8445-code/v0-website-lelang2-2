-- Create additional indexes for performance optimization

-- Users table indexes (already created in 001, but adding more)
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id_card ON users(id_card_number) WHERE id_card_number IS NOT NULL;

-- Vehicles table indexes (additional)
CREATE INDEX IF NOT EXISTS idx_vehicles_seller ON vehicles(seller_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_winner ON vehicles(winner_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(current_bid DESC);
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON vehicles(location);
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON vehicles(year DESC);

-- Bids table indexes (additional)
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_bids_amount ON bids(bid_amount DESC);

-- Transactions table indexes (additional)
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference_number);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_vehicles_status_end_time ON vehicles(auction_status, auction_end_time);
CREATE INDEX IF NOT EXISTS idx_bids_vehicle_time ON bids(vehicle_id, bid_time DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read_status);

-- Full text search indexes (for search functionality)
CREATE INDEX IF NOT EXISTS idx_vehicles_search ON vehicles USING gin(to_tsvector('english', brand || ' ' || model || ' ' || COALESCE(description, '')));
