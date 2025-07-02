-- Migration: Add voucher redemptions table
-- Date: 2025-06-27
-- Description: Add table to track partial voucher redemptions

-- Create voucher_redemptions table
CREATE TABLE IF NOT EXISTS voucher_redemptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    voucher_id UUID NOT NULL REFERENCES vouchers(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL DEFAULT 'Behandlung',
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    remaining_after DECIMAL(10,2) NOT NULL CHECK (remaining_after >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_voucher_redemptions_voucher_id ON voucher_redemptions(voucher_id);
CREATE INDEX IF NOT EXISTS idx_voucher_redemptions_redeemed_at ON voucher_redemptions(redeemed_at);

-- Add remaining_amount column to vouchers table (computed field)
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS remaining_amount DECIMAL(10,2);

-- Create function to calculate remaining amount
CREATE OR REPLACE FUNCTION calculate_voucher_remaining_amount(voucher_id_param UUID)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    original_amount DECIMAL(10,2);
    total_redeemed DECIMAL(10,2);
    remaining_amount DECIMAL(10,2);
BEGIN
    -- Get original voucher amount
    SELECT amount INTO original_amount 
    FROM vouchers 
    WHERE id = voucher_id_param;
    
    -- Calculate total redeemed amount
    SELECT COALESCE(SUM(amount), 0) INTO total_redeemed
    FROM voucher_redemptions 
    WHERE voucher_id = voucher_id_param;
    
    -- Calculate remaining amount
    remaining_amount := original_amount - total_redeemed;
    
    RETURN GREATEST(remaining_amount, 0);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update remaining_amount automatically
CREATE OR REPLACE FUNCTION update_voucher_remaining_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE vouchers 
        SET remaining_amount = calculate_voucher_remaining_amount(NEW.voucher_id)
        WHERE id = NEW.voucher_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE vouchers 
        SET remaining_amount = calculate_voucher_remaining_amount(OLD.voucher_id)
        WHERE id = OLD.voucher_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_voucher_remaining_amount ON voucher_redemptions;
CREATE TRIGGER trigger_update_voucher_remaining_amount
    AFTER INSERT OR UPDATE OR DELETE ON voucher_redemptions
    FOR EACH ROW EXECUTE FUNCTION update_voucher_remaining_amount();

-- Initialize remaining_amount for existing vouchers
UPDATE vouchers 
SET remaining_amount = calculate_voucher_remaining_amount(id)
WHERE remaining_amount IS NULL;

-- Add comments for documentation
COMMENT ON TABLE voucher_redemptions IS 'Tracks partial redemptions of vouchers';
COMMENT ON COLUMN voucher_redemptions.voucher_id IS 'Reference to the voucher being redeemed';
COMMENT ON COLUMN voucher_redemptions.amount IS 'Amount redeemed in this transaction';
COMMENT ON COLUMN voucher_redemptions.description IS 'Description of what the redemption was for (e.g., treatment name)';
COMMENT ON COLUMN voucher_redemptions.redeemed_at IS 'When this redemption occurred';
COMMENT ON COLUMN voucher_redemptions.remaining_after IS 'Remaining voucher amount after this redemption';
COMMENT ON COLUMN vouchers.remaining_amount IS 'Current remaining amount on the voucher (auto-calculated)';

-- Add RLS policies for security
ALTER TABLE voucher_redemptions ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read redemptions
CREATE POLICY "Users can view redemptions" ON voucher_redemptions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Only service role can insert/update/delete redemptions
CREATE POLICY "Service role can manage redemptions" ON voucher_redemptions
    FOR ALL USING (auth.role() = 'service_role'); 