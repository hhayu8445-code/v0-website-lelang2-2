-- Enable Realtime for tables that need live updates

-- Enable realtime for bids table (for live auction updates)
ALTER PUBLICATION supabase_realtime ADD TABLE bids;

-- Enable realtime for notifications table (for live notifications)
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- Enable realtime for vehicles table (for auction status updates)
ALTER PUBLICATION supabase_realtime ADD TABLE vehicles;

-- Enable realtime for transactions table (for live transaction updates)
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
