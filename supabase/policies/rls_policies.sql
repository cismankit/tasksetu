-- TaskSetu RLS policies (Phase 6)
-- Apply after initial schema migration:
--   psql $DATABASE_URL -f supabase/policies/rls_policies.sql

-- Enable RLS on all user tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_trackers ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

-- Reference data: readable by everyone (including anon for landing/app bootstrap)
CREATE POLICY "regions_select_all" ON regions
  FOR SELECT USING (true);

CREATE POLICY "task_templates_select_all" ON task_templates
  FOR SELECT USING (true);

-- Profiles
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "profiles_delete_own" ON profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Family members
CREATE POLICY "family_members_select_own" ON family_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "family_members_insert_own" ON family_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "family_members_update_own" ON family_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "family_members_delete_own" ON family_members
  FOR DELETE USING (auth.uid() = user_id);

-- Documents
CREATE POLICY "documents_select_own" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "documents_insert_own" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "documents_update_own" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "documents_delete_own" ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- Document packs
CREATE POLICY "document_packs_select_own" ON document_packs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "document_packs_insert_own" ON document_packs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "document_packs_update_own" ON document_packs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "document_packs_delete_own" ON document_packs
  FOR DELETE USING (auth.uid() = user_id);

-- Tasks
CREATE POLICY "tasks_select_own" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "tasks_insert_own" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tasks_update_own" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "tasks_delete_own" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Reminders
CREATE POLICY "reminders_select_own" ON reminders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "reminders_insert_own" ON reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reminders_update_own" ON reminders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "reminders_delete_own" ON reminders
  FOR DELETE USING (auth.uid() = user_id);

-- Receipts
CREATE POLICY "receipts_select_own" ON receipts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "receipts_insert_own" ON receipts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "receipts_update_own" ON receipts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "receipts_delete_own" ON receipts
  FOR DELETE USING (auth.uid() = user_id);

-- Status trackers
CREATE POLICY "status_trackers_select_own" ON status_trackers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "status_trackers_insert_own" ON status_trackers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "status_trackers_update_own" ON status_trackers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "status_trackers_delete_own" ON status_trackers
  FOR DELETE USING (auth.uid() = user_id);

-- Storage policies for private documents bucket (see migration 20250614000001)
-- Users can only access files under their own user_id prefix.

CREATE POLICY "documents_bucket_select_own" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "documents_bucket_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "documents_bucket_update_own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "documents_bucket_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
