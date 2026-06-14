# First Issues — TaskSetu MVP

Create these as GitHub Issues for the **TaskSetu Product OS** project.

---

## 1. Define TaskSetu national product vision
**Labels:** `type: content`, `region: india`, `stage: mvp`, `priority: high`
**Description:** Finalize and socialize `docs/01-vision.md`. Align team on workflow loop and anti-positioning (not a chatbot).

---

## 2. Create India-wide task opportunity map
**Labels:** `type: research`, `region: india`, `stage: mvp`
**Description:** Expand `docs/06-task-opportunity-map.md` with Tier 2/3 validation scores from interviews.

---

## 3. Create MP regional workflow pack
**Labels:** `type: feature`, `region: mp`, `module: forms`, `stage: mvp`, `priority: high`
**Description:** Validate templates in `packages/core/src/region-engine/templates/mp-regional.ts` with 3+ MP users.

---

## 4. Define student, parent, shopkeeper, farmer, gig worker personas
**Labels:** `type: content`, `stage: mvp`
**Description:** Review `docs/03-user-personas.md`; add interview quotes after first research sprint.

---

## 5. Build mobile onboarding flow
**Labels:** `type: engineering`, `module: documents`, `stage: mvp`, `priority: high`
**Description:** Screens: welcome, language, region, user type, categories, family mode. Persist with AsyncStorage.

---

## 6. Build family profile system
**Labels:** `type: engineering`, `user: family`, `stage: mvp`
**Description:** CRUD family members; assign to documents and tasks.

---

## 7. Build document vault MVP
**Labels:** `type: engineering`, `module: documents`, `stage: mvp`, `priority: high`
**Description:** List, add, detail, search; Supabase Storage upload in Phase 6.

---

## 8. Build task checklist assistant MVP
**Labels:** `type: engineering`, `module: forms`, `stage: mvp`, `priority: high`
**Description:** Template search, task detail, step toggle, WhatsApp share using `@tasksetu/core` task-engine.

---

## 9. Build status tracker MVP
**Labels:** `type: engineering`, `module: status-tracker`, `stage: mvp`
**Description:** List/add/edit status cards with follow-up dates.

---

## 10. Build receipt organizer MVP
**Labels:** `type: engineering`, `module: payments`, `stage: mvp`
**Description:** Add receipt with image, amount, category; monthly list view.

---

## 11. Build recommendation engine v1
**Labels:** `type: engineering`, `module: recommendations`, `stage: mvp`, `priority: high`
**Status:** Core implemented in `packages/core/src/recommendation-engine/`. Wire to dashboard UI.

---

## 12. Build GitHub Pages landing page
**Labels:** `type: engineering`, `type: content`, `stage: mvp`
**Description:** Implement full copy from `website/landing-page-copy.md`; deploy workflow.

---

## 13. Create beta signup placeholder
**Labels:** `type: content`, `stage: beta`
**Description:** Email capture on landing page; store in Supabase waitlist table or Formspree.

---

## 14. Create 30-day MVP roadmap
**Labels:** `type: content`, `stage: mvp`
**Status:** Draft in `docs/10-roadmap.md` and `docs/04-mvp-scope.md`. Review weekly.

---

## 15. Create user interview script
**Labels:** `type: research`, `stage: mvp`
**Status:** `research/user-interview-questions.md` created. Schedule 5 interviews.

---

## 16. Create Figma design brief
**Labels:** `type: design`, `stage: mvp`
**Description:** Use `design/figma-brief.md` to start mobile UI kit.

---

## 17. Create privacy/security baseline
**Labels:** `type: content`, `stage: mvp`, `priority: high`
**Status:** `docs/09-privacy-security.md` created. Add privacy policy page before beta.

---

## 18. Create Supabase schema
**Labels:** `type: engineering`, `stage: mvp`, `priority: high`
**Status:** Initial migration in `supabase/migrations/`. Complete RLS in issue #19.

---

## 19. Add RLS policies
**Labels:** `type: engineering`, `stage: mvp`, `priority: high`
**Description:** Implement full policies in `supabase/policies/rls_policies.sql` for all user tables.

---

## 20. Add CI workflow
**Labels:** `type: engineering`, `stage: mvp`
**Status:** `.github/workflows/ci.yml` created. Verify on first push to GitHub.
