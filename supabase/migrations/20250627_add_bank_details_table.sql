-- Migration: Add bank_details table for persistent storage
-- This replaces the in-memory cache with proper database storage

-- Create bank_details table
CREATE TABLE IF NOT EXISTS bank_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,
    account_holder TEXT NOT NULL,
    iban TEXT NOT NULL,
    bic TEXT NOT NULL,
    reference_template TEXT NOT NULL DEFAULT 'Gutschein-Bestellung',
    voucher_validity_months INTEGER NOT NULL DEFAULT 12,
    send_voucher_as_pdf BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint to ensure one bank detail per studio
CREATE UNIQUE INDEX IF NOT EXISTS idx_bank_details_studio_unique 
ON bank_details(studio_id);

-- Enable RLS
ALTER TABLE bank_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Enable read access for authenticated users" ON bank_details
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON bank_details
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON bank_details
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON bank_details
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert default bank details for existing studios
INSERT INTO bank_details (studio_id, bank_name, account_holder, iban, bic, reference_template, voucher_validity_months, send_voucher_as_pdf)
SELECT 
    id as studio_id,
    'Sparkasse Pongau' as bank_name,
    'Skinlux Bischofshofen' as account_holder,
    'AT00 0000 0000 0000 0000' as iban,
    'SPALAT2G' as bic,
    'Gutschein-Bestellung' as reference_template,
    12 as voucher_validity_months,
    false as send_voucher_as_pdf
FROM studios
WHERE NOT EXISTS (
    SELECT 1 FROM bank_details WHERE bank_details.studio_id = studios.id
);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bank_details_updated_at 
    BEFORE UPDATE ON bank_details 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 