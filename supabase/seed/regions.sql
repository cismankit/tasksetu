-- Seed regions
INSERT INTO regions (id, country, country_code, state, state_code, default_language, supported_languages)
VALUES
  ('in', 'India', 'IN', NULL, NULL, 'en', ARRAY['en', 'hi']),
  ('in-mp', 'India', 'IN', 'Madhya Pradesh', 'MP', 'hi', ARRAY['en', 'hi'])
ON CONFLICT (id) DO NOTHING;
