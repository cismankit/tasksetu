# Privacy & Security

## Principles
1. **Data minimization** — collect only what tasks require
2. **User ownership** — users control uploads and deletes
3. **No impersonation** — never present as government
4. **Private by default** — RLS on all user tables, private storage buckets

## Authentication
- Supabase Auth (email/phone OTP in production)
- Session tokens in secure mobile storage

## Document storage
- Supabase Storage private bucket `documents`
- Signed URLs for temporary access
- No public ACL on user documents

## Row Level Security
Every user-scoped table policy pattern:
```sql
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id)
```
Full policies in Phase 6: `supabase/policies/rls_policies.sql`

## What we do NOT do (MVP)
- Aadhaar authentication or e-KYC
- PAN verification APIs
- Bank/UPI transaction access
- Government portal credential storage

## Sensitive data handling
- No secrets in repo (`.env.example` only)
- Service role key server-side only
- Document images encrypted in transit (HTTPS)

## User rights (roadmap)
- Export my data (JSON + files)
- Delete my account and all storage objects
- Privacy policy and consent at upload

## Incident response
- Rotate Supabase keys if leaked
- Disable affected accounts
- Notify users if document exposure confirmed

## Compliance note
Formal legal review required before production launch in India (DPDP Act awareness, terms of service).
