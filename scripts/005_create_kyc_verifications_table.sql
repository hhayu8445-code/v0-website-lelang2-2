-- Create KYC verifications table
CREATE TABLE IF NOT EXISTS kyc_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_card_photo TEXT, -- URL foto KTP
  selfie_photo TEXT, -- URL foto selfie dengan KTP
  npwp_number TEXT, -- Nomor NPWP (opsional)
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_kyc_user ON kyc_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON kyc_verifications(verification_status);

-- Enable Row Level Security
ALTER TABLE kyc_verifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own KYC
CREATE POLICY "Users can view own KYC" ON kyc_verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own KYC
CREATE POLICY "Users can submit KYC" ON kyc_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view and update all KYC
CREATE POLICY "Admins can manage KYC" ON kyc_verifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
