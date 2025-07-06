-- Aktualisiere die Gutschein-Code-Generierung auf einheitliches kurzes Format
-- Format: SLX1234 (7 Zeichen)

CREATE OR REPLACE FUNCTION generate_voucher_code()
RETURNS VARCHAR AS $$
DECLARE
    new_code VARCHAR;
    code_exists BOOLEAN;
BEGIN
    LOOP
        -- Generiere Code im Format: SLX + 4 Zufallszahlen
        new_code := 'SLX' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Prüfe ob Code bereits existiert
        SELECT EXISTS(SELECT 1 FROM vouchers WHERE code = new_code) INTO code_exists;
        
        -- Verlasse Schleife wenn Code eindeutig ist
        EXIT WHEN NOT code_exists;
    END LOOP;
    
    RETURN new_code;
END;
$$ LANGUAGE plpgsql; 