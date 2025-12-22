-- Create KYC verifications table
CREATE TABLE IF NOT EXISTS public.kyc_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ktp_url TEXT,
  selfie_url TEXT,
  npwp_url TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_kyc_user_id ON public.kyc_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON public.kyc_verifications(verification_status);
CREATE INDEX IF NOT EXISTS idx_kyc_created_at ON public.kyc_verifications(created_at DESC);

-- Update trigger
CREATE TRIGGER update_kyc_updated_at
  BEFORE UPDATE ON public.kyc_verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for KYC table
-- Users can view their own KYC records
CREATE POLICY "Users can view own KYC"
  ON public.kyc_verifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own KYC submissions
CREATE POLICY "Users can create own KYC"
  ON public.kyc_verifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all KYC records
CREATE POLICY "Admins can view all KYC"
  ON public.kyc_verifications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Admins can update KYC records
CREATE POLICY "Admins can update KYC"
  ON public.kyc_verifications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

COMMENT ON TABLE public.kyc_verifications IS 'KYC verification submissions and status';
