-- Add soft delete functionality to vouchers table
ALTER TABLE vouchers 
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE NULL,
ADD COLUMN deleted_by TEXT NULL;

-- Create index for better performance when filtering deleted vouchers
CREATE INDEX IF NOT EXISTS idx_vouchers_deleted_at ON vouchers(deleted_at);

-- Create index for active vouchers (most common query)
CREATE INDEX IF NOT EXISTS idx_vouchers_active ON vouchers(deleted_at) WHERE deleted_at IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN vouchers.deleted_at IS 'Timestamp when voucher was soft deleted (NULL = active)';
COMMENT ON COLUMN vouchers.deleted_by IS 'Admin user who deleted the voucher'; 