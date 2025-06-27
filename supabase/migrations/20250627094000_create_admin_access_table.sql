-- Admin-Zugriff Tabelle für Supabase Auth Integration
CREATE TABLE admin_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    studio_id UUID REFERENCES studios(id) ON DELETE SET NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ein User kann nur einmal Admin sein
    UNIQUE(user_id)
);

-- Index für bessere Performance
CREATE INDEX idx_admin_access_user_id ON admin_access(user_id);
CREATE INDEX idx_admin_access_studio_id ON admin_access(studio_id);

-- RLS Policies für Admin-Zugriff
ALTER TABLE admin_access ENABLE ROW LEVEL SECURITY;

-- Admins können nur ihre eigenen Daten sehen
CREATE POLICY "Admins can view own access" ON admin_access
    FOR SELECT USING (auth.uid() = user_id);

-- Nur Super-Admins können Admin-Zugriff verwalten
CREATE POLICY "Super admins can manage admin access" ON admin_access
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_access 
            WHERE user_id = auth.uid() 
            AND role = 'super_admin' 
            AND is_active = true
        )
    );

-- Update Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_access_updated_at 
    BEFORE UPDATE ON admin_access 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Kommentar für Dokumentation
COMMENT ON TABLE admin_access IS 'Verknüpft Supabase Auth Users mit Admin-Rollen und Studios';
COMMENT ON COLUMN admin_access.user_id IS 'Referenz auf auth.users - der Supabase Auth User';
COMMENT ON COLUMN admin_access.studio_id IS 'Welchem Studio ist dieser Admin zugeordnet';
COMMENT ON COLUMN admin_access.role IS 'admin = normaler Admin, super_admin = kann andere Admins verwalten'; 