-- Create useful database functions for the application

-- Function to get user's total spent on auctions
CREATE OR REPLACE FUNCTION get_user_total_spent(p_user_id UUID)
RETURNS DECIMAL(15,2) AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount) 
     FROM transactions 
     WHERE user_id = p_user_id 
     AND type = 'purchase' 
     AND status = 'completed'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's active bids count
CREATE OR REPLACE FUNCTION get_user_active_bids_count(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT COUNT(*) 
     FROM bids 
     WHERE user_id = p_user_id 
     AND status = 'active'),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can bid (has enough balance + KYC verified)
CREATE OR REPLACE FUNCTION can_user_bid(p_user_id UUID, p_bid_amount DECIMAL)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_balance DECIMAL(15,2);
  v_kyc_status TEXT;
BEGIN
  SELECT wallet_balance, kyc_status 
  INTO v_user_balance, v_kyc_status
  FROM users 
  WHERE id = p_user_id;
  
  RETURN v_user_balance >= p_bid_amount AND v_kyc_status = 'verified';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get vehicle bid statistics
CREATE OR REPLACE FUNCTION get_vehicle_bid_stats(p_vehicle_id UUID)
RETURNS TABLE(
  total_bids INTEGER,
  unique_bidders INTEGER,
  highest_bid DECIMAL(15,2),
  latest_bid_time TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_bids,
    COUNT(DISTINCT user_id)::INTEGER as unique_bidders,
    MAX(bid_amount) as highest_bid,
    MAX(bid_time) as latest_bid_time
  FROM bids
  WHERE vehicle_id = p_vehicle_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process KYC bonus (give 100k when KYC approved)
CREATE OR REPLACE FUNCTION process_kyc_bonus(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_bonus_amount DECIMAL(15,2) := 100000;
BEGIN
  -- Update user balance
  UPDATE users 
  SET bonus_balance = bonus_balance + v_bonus_amount
  WHERE id = p_user_id;
  
  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status, description)
  VALUES (p_user_id, 'kyc_bonus', v_bonus_amount, 'completed', 'Bonus verifikasi KYC');
  
  -- Create notification
  INSERT INTO notifications (user_id, type, title, message)
  VALUES (
    p_user_id,
    'kyc_approved',
    'KYC Disetujui',
    'Selamat! Verifikasi KYC Anda telah disetujui. Bonus Rp 100.000 telah ditambahkan ke saldo Anda.'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
