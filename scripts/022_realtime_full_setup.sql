-- COMPLETE REALTIME DATABASE SETUP
-- Run this in Supabase SQL Editor

-- 1. Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kyc_verifications;

-- 2. Create notification trigger function
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_type TEXT,
  p_title TEXT,
  p_message TEXT,
  p_link TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (
    user_id, type, title, message, link, read_status, created_at
  )
  VALUES (
    p_user_id, p_type, p_title, p_message, p_link, false, NOW()
  )
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger: New bid notification
CREATE OR REPLACE FUNCTION public.notify_new_bid()
RETURNS TRIGGER AS $$
DECLARE
  vehicle_record RECORD;
  previous_bidder_id UUID;
BEGIN
  -- Get vehicle info
  SELECT * INTO vehicle_record FROM public.vehicles WHERE id = NEW.vehicle_id;
  
  -- Notify vehicle owner
  IF vehicle_record.seller_id IS NOT NULL THEN
    PERFORM public.create_notification(
      vehicle_record.seller_id,
      'bid',
      'Bid Baru!',
      'Ada bid baru sebesar Rp ' || NEW.bid_amount || ' untuk kendaraan Anda',
      '/lelang/' || NEW.vehicle_id
    );
  END IF;
  
  -- Notify previous highest bidder (outbid)
  SELECT user_id INTO previous_bidder_id 
  FROM public.bids 
  WHERE vehicle_id = NEW.vehicle_id 
    AND user_id != NEW.user_id 
    AND status = 'active'
  ORDER BY bid_amount DESC 
  LIMIT 1;
  
  IF previous_bidder_id IS NOT NULL THEN
    PERFORM public.create_notification(
      previous_bidder_id,
      'outbid',
      'Anda Telah Di-outbid!',
      'Bid Anda telah dilampaui. Bid baru: Rp ' || NEW.bid_amount,
      '/lelang/' || NEW.vehicle_id
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_new_bid ON public.bids;
CREATE TRIGGER on_new_bid
  AFTER INSERT ON public.bids
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_bid();

-- 4. Trigger: Transaction status notification
CREATE OR REPLACE FUNCTION public.notify_transaction_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'transaction',
      'Status Transaksi Diperbarui',
      'Transaksi ' || NEW.reference_number || ' status: ' || NEW.status,
      '/dashboard/wallet'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_transaction_status_change ON public.transactions;
CREATE TRIGGER on_transaction_status_change
  AFTER UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_transaction_status();

-- 5. Trigger: KYC status notification
CREATE OR REPLACE FUNCTION public.notify_kyc_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_status != OLD.verification_status THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'kyc',
      'Status KYC Diperbarui',
      'Status verifikasi KYC Anda: ' || NEW.verification_status,
      '/dashboard/kyc'
    );
    
    -- Update user kyc_status
    UPDATE public.users 
    SET kyc_status = NEW.verification_status 
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_kyc_status_change ON public.kyc_verifications;
CREATE TRIGGER on_kyc_status_change
  AFTER UPDATE ON public.kyc_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_kyc_status();

-- 6. Trigger: Auction ending soon notification
CREATE OR REPLACE FUNCTION public.notify_auction_ending()
RETURNS void AS $$
DECLARE
  vehicle_record RECORD;
  bidder_record RECORD;
BEGIN
  -- Find auctions ending in 1 hour
  FOR vehicle_record IN 
    SELECT * FROM public.vehicles 
    WHERE auction_status = 'live'
      AND auction_end_time <= NOW() + INTERVAL '1 hour'
      AND auction_end_time > NOW()
  LOOP
    -- Notify all bidders
    FOR bidder_record IN 
      SELECT DISTINCT user_id FROM public.bids 
      WHERE vehicle_id = vehicle_record.id
    LOOP
      PERFORM public.create_notification(
        bidder_record.user_id,
        'auction_ending',
        'Lelang Segera Berakhir!',
        'Lelang ' || vehicle_record.brand || ' ' || vehicle_record.model || ' akan berakhir dalam 1 jam',
        '/lelang/' || vehicle_record.id
      );
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Function: Mark notification as read
CREATE OR REPLACE FUNCTION public.mark_notification_read(notification_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.notifications 
  SET read_status = true 
  WHERE id = notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Function: Get unread notification count
CREATE OR REPLACE FUNCTION public.get_unread_count(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(*) INTO count 
  FROM public.notifications 
  WHERE user_id = p_user_id AND read_status = false;
  
  RETURN count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RLS Policies for realtime
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- 10. Grant permissions
GRANT ALL ON public.notifications TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_notification_read TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_unread_count TO authenticated;
