-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vouchers table
CREATE TABLE vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
    payment_reference VARCHAR(255),
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 year'),
    studio_id uuid REFERENCES studios(id)
);

-- Create voucher_orders table
CREATE TABLE voucher_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    voucher_id UUID REFERENCES vouchers(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL DEFAULT 'bank_transfer',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'cancelled')),
    bank_reference VARCHAR(255),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    studio_id uuid REFERENCES studios(id)
);

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    studio_id uuid REFERENCES studios(id)
);

-- Create function to generate voucher codes
CREATE OR REPLACE FUNCTION generate_voucher_code()
RETURNS VARCHAR AS $$
DECLARE
    new_code VARCHAR;
    code_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate code in format: SLX-YYYY-XXXX
        new_code := 'SLX-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM vouchers WHERE code = new_code) INTO code_exists;
        
        -- Exit loop if code is unique
        EXIT WHEN NOT code_exists;
    END LOOP;
    
    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate voucher code
CREATE OR REPLACE FUNCTION set_voucher_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.code IS NULL THEN
        NEW.code := generate_voucher_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_voucher
    BEFORE INSERT ON vouchers
    FOR EACH ROW
    EXECUTE FUNCTION set_voucher_code();

-- Create function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR AS $$
DECLARE
    new_order_number VARCHAR;
    order_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate order number in format: ORD-YYYYMMDD-XXXX
        new_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Check if order number already exists
        SELECT EXISTS(SELECT 1 FROM voucher_orders WHERE order_number = new_order_number) INTO order_exists;
        
        -- Exit loop if order number is unique
        EXIT WHEN NOT order_exists;
    END LOOP;
    
    RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_voucher_order
    BEFORE INSERT ON voucher_orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_voucher_orders_updated_at
    BEFORE UPDATE ON voucher_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_vouchers_code ON vouchers(code);
CREATE INDEX idx_vouchers_payment_status ON vouchers(payment_status);
CREATE INDEX idx_vouchers_created_at ON vouchers(created_at DESC);
CREATE INDEX idx_vouchers_sender_email ON vouchers(sender_email);
CREATE INDEX idx_voucher_orders_voucher_id ON voucher_orders(voucher_id);
CREATE INDEX idx_voucher_orders_order_number ON voucher_orders(order_number);

-- Row Level Security (RLS)
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE voucher_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view all vouchers" ON vouchers
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Admins can create vouchers" ON vouchers
    FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Admins can update vouchers" ON vouchers
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'super_admin');

-- Public can create vouchers (for the shop)
CREATE POLICY "Public can create vouchers" ON vouchers
    FOR INSERT WITH CHECK (true);

-- Sample data (remove in production)
-- INSERT INTO admin_users (email, password_hash, name, role) 
-- VALUES ('admin@skinlux.at', 'hashed_password_here', 'Admin User', 'super_admin'); 

-- 1. Neue Tabelle für Studios (nur ausführen, wenn sie noch nicht existiert)
CREATE TABLE IF NOT EXISTS studios (
    id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Spalte studio_id zu admin_users
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS studio_id uuid REFERENCES studios(id);

-- 3. Spalte studio_id zu vouchers
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS studio_id uuid REFERENCES studios(id);

-- 4. Spalte studio_id zu voucher_orders
ALTER TABLE voucher_orders ADD COLUMN IF NOT EXISTS studio_id uuid REFERENCES studios(id); 