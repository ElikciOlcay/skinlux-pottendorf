-- Migration: Add Pottendorf Studio Entry
-- Date: 2025-01-03
-- Description: Adds a new studio entry for the Pottendorf location

-- Insert new studio for Pottendorf
INSERT INTO studios (name, address, subdomain) 
VALUES (
    'skinlux-pottendorf', 
    'Dr. Heinz-Fischer-Straße 3/2, 2486 Pottendorf', 
    'pottendorf'
); 