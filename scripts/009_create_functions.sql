-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kyc_verifications_updated_at BEFORE UPDATE ON kyc_verifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update vehicle current_bid
CREATE OR REPLACE FUNCTION update_vehicle_current_bid()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vehicles 
  SET current_bid = NEW.bid_amount
  WHERE id = NEW.vehicle_id 
    AND (current_bid IS NULL OR NEW.bid_amount > current_bid);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update current_bid when new bid is placed
CREATE TRIGGER update_current_bid_on_new_bid
  AFTER INSERT ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_vehicle_current_bid();
