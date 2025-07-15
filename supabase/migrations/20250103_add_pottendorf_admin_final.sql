-- Migration: Add Admin Access for Pottendorf (Final)
-- Date: 2025-01-03
-- Description: Adds admin access entry for Pottendorf admin user (hey@skinlux.at)

-- Insert admin access for Pottendorf studio with real user data
INSERT INTO admin_access (
    user_id, 
    studio_id, 
    role, 
    is_active
) 
SELECT 
    '61d96c00-1e08-4136-a916-226ce32aeb6e'::uuid as user_id,
    s.id as studio_id,
    'admin' as role,
    true as is_active
FROM studios s 
WHERE s.name = 'skinlux-pottendorf';

-- Verify the setup
SELECT 
    u.email,
    aa.user_id,
    aa.role,
    aa.is_active,
    s.name as studio_name,
    s.subdomain,
    aa.created_at
FROM admin_access aa
JOIN auth.users u ON aa.user_id = u.id
JOIN studios s ON aa.studio_id = s.id
WHERE aa.user_id = '61d96c00-1e08-4136-a916-226ce32aeb6e'::uuid; 