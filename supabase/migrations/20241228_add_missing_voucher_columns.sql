-- Migration: Add missing columns to vouchers table
-- Date: 2024-12-28
-- Description: Add message, sender_phone, order_number, status, and valid_until columns

-- Add message column for personal messages
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS message TEXT;

-- Add sender_phone column for customer phone numbers
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS sender_phone VARCHAR(50);

-- Add order_number column for unique order identification
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS order_number VARCHAR(100) UNIQUE;

-- Add status column for voucher lifecycle (pending, active, redeemed, expired)
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';

-- Add valid_until column (alternative to expires_at for better naming)
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS valid_until TIMESTAMP WITH TIME ZONE;

-- Create index for better performance on order_number lookups
CREATE INDEX IF NOT EXISTS idx_vouchers_order_number ON vouchers(order_number);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON vouchers(status);

-- Update existing records to have default status if NULL
UPDATE vouchers SET status = 'pending' WHERE status IS NULL;

-- Copy expires_at to valid_until for consistency (if you want to use valid_until)
UPDATE vouchers SET valid_until = expires_at WHERE valid_until IS NULL AND expires_at IS NOT NULL;

-- Add constraint to ensure status has valid values
ALTER TABLE vouchers ADD CONSTRAINT check_voucher_status 
CHECK (status IN ('pending', 'active', 'redeemed', 'expired', 'cancelled'));

COMMENT ON COLUMN vouchers.message IS 'Personal message from sender to recipient';
COMMENT ON COLUMN vouchers.sender_phone IS 'Phone number of the person ordering the voucher';
COMMENT ON COLUMN vouchers.order_number IS 'Unique order identification number';
COMMENT ON COLUMN vouchers.status IS 'Current status of the voucher (pending, active, redeemed, expired, cancelled)';
COMMENT ON COLUMN vouchers.valid_until IS 'Date until when the voucher is valid'; 