# TaskSetu

**Your life admin, handled.** · *Kaam ho simple. Life ho sorted.*

TaskSetu is an adaptive life-admin app for India (global-ready) that guides users through documents, government-form prep, reminders, receipts, and follow-ups — with regional intelligence starting in Madhya Pradesh.

## Quick start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Expo Go app (for mobile testing)

### Install

```bash
cd tasksetu
pnpm install
pnpm build
```

### Development

```bash
# All apps (turbo)
pnpm dev

# Mobile only (Expo)
pnpm dev:mobile

# Web landing page only
pnpm dev:web
```

### Verify core package

```bash
pnpm --filter @tasksetu/core build
pnpm --filter @tasksetu/core typecheck
```

## Folder structure

```
tasksetu/
├── apps/
│   ├── mobile/          # Expo + Expo Router (Android/iOS)
│   └── web/             # Vite + React (GitHub Pages)
├── packages/
│   ├── core/            # Types, engines, regional templates, i18n
│   ├── ui/              # Design tokens + shared components
│   └── config/          # ESLint + TypeScript configs
├── supabase/            # Migrations, RLS, seed
├── docs/                # Product vision, architecture, roadmap
├── research/            # Regional research, interviews
├── product/             # User stories, backlog, first issues
├── design/              # Screen list, design system, Figma brief
└── website/             # Landing page copy, FAQ
```

## What works now (Phases 1–6)

- **Documentation** — 31+ docs across vision, strategy, personas, MP research, GitHub Projects setup
- **`@tasksetu/core`** — Full TypeScript types, 9 task templates (India national + MP regional), rule-based recommendation engine, i18n (en/hi), AI adapter interface
- **Mobile MVP** — 18 Expo Router screens: onboarding (welcome → user type), dashboard, family, documents, tasks, reminders, status tracker, receipts, recommendations, settings. AsyncStorage for preferences + local mock store. React Hook Form + Zod on forms.
- **Web landing page** — Hero, problem, how it works, target users, MVP features, regional intelligence, beta signup placeholder, FAQ
- **Supabase** — Full schema, RLS policies, regions + task template seed, private `documents` storage bucket migration, mobile Supabase client stub

## What's next (Phase 7)

| Phase | Work |
|-------|------|
| 7 | Auth integration, Supabase sync, tests, polish, beta launch |

## Environment

Copy `.env.example` to `.env` and fill Supabase keys when ready:

```bash
cp .env.example .env
```

## GitHub Pages (web)

The Vite app uses a configurable base path for GitHub project pages (default `/tasksetu/`).

### Build locally

```bash
# Default base path /tasksetu/ (see .env.example)
pnpm --filter @tasksetu/web build

# Or override for your repo name
VITE_BASE_PATH=/your-repo-name/ pnpm --filter @tasksetu/web build
```

Output is in `apps/web/dist/`.

### Deploy to GitHub Pages

**Option A — GitHub Actions (recommended)**

The repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). On every push to `main` it builds `apps/web` with `VITE_BASE_PATH=/tasksetu/` and deploys `apps/web/dist` to GitHub Pages.

1. Enable Pages: repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main` (or run the workflow manually via **Actions → Deploy GitHub Pages → Run workflow**)
3. If your GitHub repo name is not `tasksetu`, change `VITE_BASE_PATH` in the workflow to `/<your-repo-name>/`

**Option B — Manual gh-pages branch**

```bash
pnpm --filter @tasksetu/web build
cd apps/web
npx gh-pages -d dist -b gh-pages
```

**Option C — User/org site (`username.github.io`)**

Set `VITE_BASE_PATH=/` in `.env` before building.

Verify: open `https://<user>.github.io/<repo-name>/` after deploy.

## Supabase setup

```bash
# Link project (once)
supabase link --project-ref your-ref

# Apply migrations
supabase db push

# Seed reference data
psql $DATABASE_URL -f supabase/seed/regions.sql
psql $DATABASE_URL -f supabase/seed/task_templates.sql

# Apply RLS + storage policies
psql $DATABASE_URL -f supabase/policies/rls_policies.sql
```

Copy `.env.example` → `.env` and set `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` for mobile sync.

## Regional templates (MP)

- Income certificate · Caste certificate · Domicile
- Scholarship pack · Student exam/admission pack

See `packages/core/src/region-engine/templates/`.

## License

TBD — add before public release.

## Agent continuation

The master Cursor rule lives at the **workspace root**: [`.cursor/rules/tasksetu-product-os.md`](../.cursor/rules/tasksetu-product-os.md) (outside this folder when TaskSetu is a subdirectory). Inside this repo, the same file is linked at [`.cursor/rules/tasksetu-product-os.md`](.cursor/rules/tasksetu-product-os.md).

```
Read .cursor/rules/tasksetu-product-os.md and continue with Phase 7 (auth, Supabase sync, tests, polish).
```
