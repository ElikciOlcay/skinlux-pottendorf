-- Migration: Add Pottendorf Bank Details
-- Date: 2025-01-03
-- Description: Adds bank details for the Pottendorf studio

-- Insert bank details for Pottendorf studio (using the studio_id from previous migration)
INSERT INTO bank_details (
    studio_id, 
    bank_name, 
    account_holder, 
    iban, 
    bic, 
    reference_template,
    voucher_validity_months,
    send_voucher_as_pdf,
    business_name,
    street_address,
    postal_code,
    city,
    country,
    phone,
    email,
    website
) 
SELECT 
    s.id as studio_id,
    'Beispiel Bank' as bank_name,  -- TODO: Echte Bankdaten eintragen
    'Ebru Bicer' as account_holder,
    'AT00 0000 0000 0000 0000' as iban,  -- TODO: Echte IBAN eintragen
    'BKAUATWW' as bic,  -- TODO: Echten BIC eintragen
    'Gutschein-Bestellung' as reference_template,
    12 as voucher_validity_months,
    false as send_voucher_as_pdf,
    'Skinlux Pottendorf' as business_name,
    'Dr. Heinz-Fischer-Straße 3/2' as street_address,
    '2486' as postal_code,
    'Pottendorf' as city,
    'Österreich' as country,
    '+43 664 91 88 632' as phone,
    'hey@skinlux.at' as email,
    'skinlux.at' as website
FROM studios s 
WHERE s.name = 'skinlux-pottendorf'; 