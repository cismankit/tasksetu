-- Seed task templates (mirrors packages/core region-engine templates)
-- Run after regions seed: psql $DATABASE_URL -f supabase/seed/task_templates.sql

INSERT INTO task_templates (
  id, country, state, language, category, title, description,
  required_documents, steps, official_link, warning_notes,
  estimated_effort, reminder_schedule_days, supported_user_types, tags
) VALUES
(
  'in-national-document-pack', 'IN', NULL, 'en', 'documents',
  'Essential ID Document Pack',
  'Organize your core identity documents in one place for quick access.',
  ARRAY['aadhaar', 'pan', 'voter_id'],
  '[{"id":"s1","order":1,"title":"Gather Aadhaar copy","description":"Front and back if available","isOptional":false},{"id":"s2","order":2,"title":"Add PAN card","isOptional":false},{"id":"s3","order":3,"title":"Add address proof","description":"Utility bill or rental agreement","isOptional":true},{"id":"s4","order":4,"title":"Upload passport-size photo","isOptional":true}]'::jsonb,
  NULL, ARRAY[]::text[], 'low', ARRAY[]::integer[],
  ARRAY['student','parent','professional','family_manager','gig_worker'],
  ARRAY['national','identity','starter']
),
(
  'in-student-pack', 'IN', NULL, 'en', 'education',
  'Student Document Pack',
  'Prepare marksheets, ID, and certificates for admissions and scholarships.',
  ARRAY['marksheet','aadhaar','income_certificate','caste_certificate'],
  '[{"id":"s1","order":1,"title":"Upload latest marksheet","isOptional":false},{"id":"s2","order":2,"title":"Check income certificate validity","isOptional":false},{"id":"s3","order":3,"title":"Add caste certificate if applicable","isOptional":true},{"id":"s4","order":4,"title":"Prepare passport photos","isOptional":false},{"id":"s5","order":5,"title":"Create admission checklist","isOptional":false}]'::jsonb,
  NULL, ARRAY[]::text[], 'medium', ARRAY[]::integer[],
  ARRAY['student','parent'], ARRAY['national','student','education']
),
(
  'in-family-pack', 'IN', NULL, 'en', 'family_reminders',
  'Family Admin Starter Pack',
  'Set up family profiles and shared document reminders.',
  ARRAY['aadhaar','insurance','medical_prescription'],
  '[{"id":"s1","order":1,"title":"Add family members","isOptional":false},{"id":"s2","order":2,"title":"Assign documents to each member","isOptional":false},{"id":"s3","order":3,"title":"Set medicine reminders","isOptional":true},{"id":"s4","order":4,"title":"Track school fee receipts","isOptional":true}]'::jsonb,
  NULL, ARRAY[]::text[], 'medium', ARRAY[]::integer[],
  ARRAY['parent','family_manager','senior_citizen'], ARRAY['national','family']
),
(
  'in-shopkeeper-pack', 'IN', NULL, 'en', 'business_admin',
  'Shopkeeper Monthly Admin Pack',
  'Organize UPI receipts, rent, and business documents monthly.',
  ARRAY['pan','bank_document','rental_agreement'],
  '[{"id":"s1","order":1,"title":"Save UPI receipts for the month","isOptional":false},{"id":"s2","order":2,"title":"Track rent payment proof","isOptional":false},{"id":"s3","order":3,"title":"Review GST/shop license expiry","isOptional":true},{"id":"s4","order":4,"title":"Set monthly reminder","isOptional":false}]'::jsonb,
  NULL, ARRAY[]::text[], 'low', ARRAY[1,28],
  ARRAY['shopkeeper','service_provider'], ARRAY['national','business','receipts']
),
(
  'mp-income-certificate', 'IN', 'MP', 'en', 'government_forms',
  'MP Income Certificate Preparation',
  'Prepare documents and steps to apply for an income certificate in Madhya Pradesh via e-District or Tehsil.',
  ARRAY['aadhaar','pan','voter_id','bank_document'],
  '[{"id":"s1","order":1,"title":"Verify Aadhaar is linked to mobile","isOptional":false},{"id":"s2","order":2,"title":"Collect income proof","isOptional":false},{"id":"s3","order":3,"title":"Gather address proof","isOptional":false},{"id":"s4","order":4,"title":"Get passport-size photos","isOptional":false},{"id":"s5","order":5,"title":"Visit e-District MP portal or Tehsil","isOptional":false},{"id":"s6","order":6,"title":"Pay applicable fee and save receipt","isOptional":false},{"id":"s7","order":7,"title":"Track application status","isOptional":false}]'::jsonb,
  'https://mpedistrict.gov.in/',
  ARRAY['Processing time varies by district — typically 7–15 working days.','TaskSetu does not submit on your behalf.'],
  'medium', ARRAY[3,7,14],
  ARRAY['student','parent','farmer','gig_worker'],
  ARRAY['mp','government','income-certificate']
),
(
  'mp-caste-certificate', 'IN', 'MP', 'en', 'government_forms',
  'MP Caste Certificate Preparation',
  'Checklist for SC/ST/OBC caste certificate application in Madhya Pradesh.',
  ARRAY['aadhaar','birth_certificate','voter_id'],
  '[{"id":"s1","order":1,"title":"Confirm caste category eligibility","isOptional":false},{"id":"s2","order":2,"title":"Collect parent/guardian caste certificate if available","isOptional":true},{"id":"s3","order":3,"title":"Get birth certificate or school leaving certificate","isOptional":false},{"id":"s4","order":4,"title":"Affidavit from competent authority if required","isOptional":true},{"id":"s5","order":5,"title":"Apply via e-District MP or local Tehsil","isOptional":false},{"id":"s6","order":6,"title":"Save application number for tracking","isOptional":false}]'::jsonb,
  'https://mpedistrict.gov.in/',
  ARRAY['First-time applicants may need field verification.'],
  'high', ARRAY[]::integer[],
  ARRAY['student','parent'], ARRAY['mp','government','caste-certificate']
),
(
  'mp-domicile-certificate', 'IN', 'MP', 'en', 'government_forms',
  'MP Domicile / Residence Certificate',
  'Prepare domicile certificate for admissions, jobs, and government schemes in MP.',
  ARRAY['aadhaar','voter_id','birth_certificate','rental_agreement'],
  '[{"id":"s1","order":1,"title":"Prove continuous residence in MP","isOptional":false},{"id":"s2","order":2,"title":"Collect address proof","isOptional":false},{"id":"s3","order":3,"title":"Affidavit for domicile if applicable","isOptional":true},{"id":"s4","order":4,"title":"Apply on e-District MP portal","isOptional":false},{"id":"s5","order":5,"title":"Set follow-up reminder in 10 days","isOptional":false}]'::jsonb,
  'https://mpedistrict.gov.in/',
  ARRAY['Requirements may differ for students vs job applicants.'],
  'medium', ARRAY[]::integer[],
  ARRAY['student','parent','professional'], ARRAY['mp','government','domicile']
),
(
  'mp-scholarship-pack', 'IN', 'MP', 'en', 'education',
  'MP Scholarship Document Pack',
  'Bundle documents commonly needed for state and central scholarships in MP.',
  ARRAY['aadhaar','marksheet','income_certificate','caste_certificate','bank_document'],
  '[{"id":"s1","order":1,"title":"Verify income certificate is current year","isOptional":false},{"id":"s2","order":2,"title":"Link Aadhaar to bank account","isOptional":false},{"id":"s3","order":3,"title":"Upload latest marksheet","isOptional":false},{"id":"s4","order":4,"title":"Add caste certificate if category-based scheme","isOptional":true},{"id":"s5","order":5,"title":"Check scholarship portal deadline","isOptional":false},{"id":"s6","order":6,"title":"Save application screenshot and reference ID","isOptional":false}]'::jsonb,
  'https://scholarshipportal.mp.gov.in/',
  ARRAY['Deadlines vary by scheme — set reminders early.'],
  'medium', ARRAY[7,3,1],
  ARRAY['student','parent'], ARRAY['mp','scholarship','education']
),
(
  'mp-student-exam-pack', 'IN', 'MP', 'en', 'education',
  'MP Student Exam & Admission Pack',
  'Prepare for board exams, MPBSE processes, and college admission document requirements.',
  ARRAY['aadhaar','marksheet','birth_certificate','domicile_certificate'],
  '[{"id":"s1","order":1,"title":"Confirm exam registration details","isOptional":false},{"id":"s2","order":2,"title":"Collect admit card and ID proof copies","isOptional":false},{"id":"s3","order":3,"title":"Prepare domicile if applying to state quota seats","isOptional":true},{"id":"s4","order":4,"title":"Organize 10th/12th marksheets and certificates","isOptional":false},{"id":"s5","order":5,"title":"Track counselling dates and document verification list","isOptional":false},{"id":"s6","order":6,"title":"Create WhatsApp share list for missing docs from family","isOptional":true}]'::jsonb,
  'https://mpbse.nic.in/',
  ARRAY['Keep both original and photocopies ready for verification centres.'],
  'high', ARRAY[]::integer[],
  ARRAY['student','parent'], ARRAY['mp','exam','admission','education']
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  steps = EXCLUDED.steps,
  updated_at = now();
