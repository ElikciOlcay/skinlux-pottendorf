-- Add admin_created column to distinguish between admin and customer created vouchers
ALTER TABLE vouchers 
ADD COLUMN admin_created BOOLEAN DEFAULT FALSE;

-- Update existing vouchers to mark likely admin-created ones
-- (paid + active + no email = likely admin voucher)
UPDATE vouchers 
SET admin_created = TRUE 
WHERE payment_status = 'paid' 
  AND status = 'active' 
  AND (sender_email IS NULL OR sender_email = '');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_vouchers_admin_created ON vouchers(admin_created); 