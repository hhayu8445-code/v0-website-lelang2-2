-- Update contact numbers to 0882022783493
UPDATE site_settings 
SET value = '"+62 882-0227-83493"'
WHERE key = 'contact_phone';

UPDATE site_settings 
SET value = '"6282022783493"'
WHERE key = 'contact_whatsapp';
