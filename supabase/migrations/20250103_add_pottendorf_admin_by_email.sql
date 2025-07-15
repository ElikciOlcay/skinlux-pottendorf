-- Migration: Add Admin Access for Pottendorf (by Email)
-- Date: 2025-01-03
-- Description: Adds admin access entry for Pottendorf admin using email to find user

-- Insert admin access for Pottendorf studio using email
-- TODO: Replace 'admin@example.com' with the actual email of the new admin user
INSERT INTO admin_access (
    user_id, 
    studio_id, 
    role, 
    is_active
) 
SELECT 
    u.id as user_id,
    s.id as studio_id,
    'admin' as role,
    true as is_active
FROM auth.users u
CROSS JOIN studios s 
WHERE u.email = 'admin@example.com'  -- TODO: Echte E-Mail hier eintragen
AND s.name = 'skinlux-pottendorf';

-- Verify the setup
SELECT 
    u.email,
    aa.role,
    aa.is_active,
    s.name as studio_name,
    s.subdomain,
    aa.created_at
FROM admin_access aa
JOIN auth.users u ON aa.user_id = u.id
JOIN studios s ON aa.studio_id = s.id
WHERE s.name = 'skinlux-pottendorf'; 