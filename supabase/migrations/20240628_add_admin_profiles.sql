CREATE TABLE IF NOT EXISTS admin_profiles (
    id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id uuid NOT NULL,
    studio_id uuid NOT NULL REFERENCES studios(id),
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, studio_id)
); 