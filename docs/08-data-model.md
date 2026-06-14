# Data Model

## Entity relationship summary
```
auth.users
  └── profiles (1:1)
  └── family_members (1:n)
  └── documents (1:n) ──► document_packs (n:m via ids)
  └── tasks (1:n) ──► task_templates (reference)
  └── reminders (1:n)
  └── receipts (1:n)
  └── status_trackers (1:n)
```

## Core entities

### profiles
User display info + `preferences` JSONB (language, region, userType, categories).

### family_members
Linked to profile owner; optional `user_type` per member.

### documents
`document_type_id` enum aligned with `@tasksetu/core` types. Optional `storage_path` in Supabase Storage.

### tasks
`steps` stored as JSONB array with `completed` flags. Optional `template_id` reference.

### reminders
`scheduled_at`, `type`, links to task/document/status tracker.

### receipts
Amount, category, payment_method, optional image_path.

### status_trackers
Manual status tracking; no automated portal sync.

### task_templates / regions
Reference data; MVP templates live in code, DB mirror optional.

## TypeScript source of truth
`packages/core/src/types/` — keep in sync with SQL migrations.

## Migration files
- `supabase/migrations/20250614000000_initial_schema.sql`

## Future considerations
- Soft delete for documents
- Audit log for family access
- Encryption at rest (Supabase default + client-side optional for high-sensitivity)
