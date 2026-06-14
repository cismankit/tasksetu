# Regional Adaptation Model

## Hierarchy
```
Country (IN)
  └── State (MP, RJ, UP, ...)
        └── District (optional)
              └── Language overlay (en, hi, ...)
```

## Template inheritance
1. **Global defaults** — generic task shapes (track repair, medicine reminder)
2. **National pack (India)** — Aadhaar culture, common document types, UPI receipts
3. **State pack (MP)** — e-District links, MPBSE, state scholarship portal
4. **District overrides** (future) — Tehsil-specific notes

## Template schema fields
Each regional template includes: `country`, `state`, `district?`, `language`, `category`, `title`, `description`, `requiredDocuments[]`, `steps[]`, `officialLink?`, `warningNotes[]`, `estimatedEffort`, `reminderScheduleDays[]`, `supportedUserTypes[]`, `tags[]`

## Language strategy
- UI strings via i18n keys (`packages/core/src/i18n/`)
- Template content duplicated per language (not machine-translated in MVP)
- Hindi-first for MP marketing; English for professional users

## Validation process for new regions
1. Research pain points (`research/`)
2. Draft templates with official link placeholders
3. User interview validation (3–5 users)
4. Legal review (no impersonation language)
5. Ship as labeled "community verified" or "TaskSetu verified"

## MP pilot rationale
- Central India representation
- Active e-District (`mpedistrict.gov.in`)
- Large student population
- Founding team familiarity (assumption)

## Expansion order (see `research/india-state-expansion-plan.md`)
MP → Rajasthan → Uttar Pradesh → Maharashtra → Bihar
