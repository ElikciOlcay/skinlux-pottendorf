-- Migration: Add Admin Access for Pottendorf
-- Date: 2025-01-03
-- Description: Adds admin access entry for the new Pottendorf admin user

-- Insert admin access for Pottendorf studio
-- TODO: Replace 'YOUR_USER_ID_HERE' with the actual user_id from auth.users
INSERT INTO admin_access (
    user_id, 
    studio_id, 
    role, 
    is_active
) 
SELECT 
    'YOUR_USER_ID_HERE'::uuid as user_id,  -- TODO: Echte User-ID hier eintragen
    s.id as studio_id,
    'admin' as role,
    true as is_active
FROM studios s 
WHERE s.name = 'skinlux-pottendorf';

-- Optional: Verify the setup
SELECT 
    aa.user_id,
    aa.role,
    aa.is_active,
    s.name as studio_name,
    s.subdomain
FROM admin_access aa
JOIN studios s ON aa.studio_id = s.id
WHERE s.name = 'skinlux-pottendorf'; 