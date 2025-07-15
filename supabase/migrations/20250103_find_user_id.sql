-- Helper: Find User ID for Admin Access
-- Date: 2025-01-03
-- Description: Queries to find the user_id of the newly created admin user

-- 1. List all users to find the correct one
-- Run this to see all users and their details
SELECT 
    id,
    email,
    created_at,
    last_sign_in_at,
    email_confirmed_at
FROM auth.users 
ORDER BY created_at DESC;

-- 2. Find user by email (replace with actual email)
-- SELECT id FROM auth.users WHERE email = 'admin@skinlux.at';

-- 3. Copy the user_id from the results above and use it in the admin_access migration
-- Replace 'YOUR_USER_ID_HERE' in 20250103_add_pottendorf_admin_access.sql with the actual ID

-- Example of what the final INSERT should look like:
-- INSERT INTO admin_access (user_id, studio_id, role, is_active) 
-- SELECT 
--     '12345678-1234-1234-1234-123456789012'::uuid as user_id,
--     s.id as studio_id,
--     'admin' as role,
--     true as is_active
-- FROM studios s 
-- WHERE s.name = 'skinlux-pottendorf'; 