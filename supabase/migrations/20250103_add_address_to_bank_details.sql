-- Migration: Add address fields to bank_details table
-- This allows studios to configure their address for vouchers and emails

-- Add address fields to bank_details table
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS business_name TEXT NOT NULL DEFAULT 'Skinlux Bischofshofen';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS street_address TEXT NOT NULL DEFAULT 'Salzburger Straße 45';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS postal_code TEXT NOT NULL DEFAULT '5500';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'Bischofshofen';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'Österreich';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '+43 123 456 789';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT 'hello@skinlux.at';
ALTER TABLE bank_details ADD COLUMN IF NOT EXISTS website TEXT NOT NULL DEFAULT 'skinlux.at';

-- Update existing records with default values (if any exist)
UPDATE bank_details SET 
    business_name = 'Skinlux Bischofshofen',
    street_address = 'Salzburger Straße 45',
    postal_code = '5500',
    city = 'Bischofshofen',
    country = 'Österreich',
    phone = '+43 123 456 789',
    email = 'hello@skinlux.at',
    website = 'skinlux.at'
WHERE business_name IS NULL OR business_name = '';

-- Add comment for documentation
COMMENT ON COLUMN bank_details.business_name IS 'Studio business name for vouchers and emails';
COMMENT ON COLUMN bank_details.street_address IS 'Street address for vouchers and emails';
COMMENT ON COLUMN bank_details.postal_code IS 'Postal code for vouchers and emails';
COMMENT ON COLUMN bank_details.city IS 'City for vouchers and emails';
COMMENT ON COLUMN bank_details.country IS 'Country for vouchers and emails';
COMMENT ON COLUMN bank_details.phone IS 'Phone number for vouchers and emails';
COMMENT ON COLUMN bank_details.email IS 'Contact email for vouchers and emails';
COMMENT ON COLUMN bank_details.website IS 'Website URL for vouchers and emails'; 