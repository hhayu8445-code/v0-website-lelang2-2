-- Add fields for manual deposit approval with payment proof
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS bank_account_name TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS bank_account_number TEXT;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Create index for faster queries on pending transactions
CREATE INDEX IF NOT EXISTS idx_transactions_status_created ON transactions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_status ON transactions(user_id, status);
