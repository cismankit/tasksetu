# MVP Scope

## In scope (MVP)
- [x] Monorepo scaffold (pnpm, Turborepo, TypeScript)
- [x] Core types and engines (`@tasksetu/core`)
- [x] India + MP regional templates (9 templates)
- [x] Rule-based recommendation engine v1
- [x] i18n structure (English + Hindi)
- [x] Supabase schema skeleton + RLS enablement
- [x] Expo mobile scaffold with demo home screen
- [x] Vite web landing scaffold
- [ ] Full onboarding flow (Phase 4)
- [ ] Document vault CRUD with Supabase Storage (Phase 4–6)
- [ ] Task checklist UI (Phase 4)
- [ ] Local Expo notifications (Phase 4)
- [ ] Status tracker screens (Phase 4)
- [ ] Receipt organizer screens (Phase 4)
- [ ] GitHub Pages deploy workflow (Phase 5)

## Out of scope (MVP)
- Government portal scraping or auto-status
- Aadhaar/PAN verification APIs
- Bank/UPI transaction import
- Paid subscriptions (document only)
- Multi-state packs beyond MP sample
- LLM-powered chat interface

## MVP definition of done
1. User completes onboarding and sees personalized dashboard
2. User creates task from MP income certificate template
3. User uploads document to vault
4. User sets reminder and receives local notification
5. User tracks application status manually
6. User saves UPI receipt
7. Recommendations surface missing income certificate for student
8. Landing page live on GitHub Pages with beta CTA

## Timeline (30 days)
| Week | Focus |
|------|-------|
| 1 | Docs + scaffold + core (done) |
| 2 | Mobile onboarding + dashboard |
| 3 | Vault, tasks, reminders |
| 4 | Supabase integration, landing deploy, beta |
