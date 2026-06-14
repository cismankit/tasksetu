# Technical Architecture

## Overview
```
┌─────────────┐     ┌─────────────┐
│ apps/mobile │     │  apps/web   │
│ Expo Router │     │ Vite React  │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 ▼
       ┌─────────────────┐
       │  @tasksetu/core │  ← business logic, engines, templates
       │  @tasksetu/ui   │  ← shared tokens, web components
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │    Supabase     │
       │ Auth · PG · RLS │
       │ Storage · Edge  │
       └─────────────────┘
```

## Monorepo layout
- **pnpm workspaces** — dependency linking
- **Turborepo** — parallel build/lint/typecheck
- **packages/core** — pure TypeScript, no React dependency
- **packages/ui** — shared design tokens + web components
- **packages/config** — ESLint + TSConfig extends

## Mobile architecture
- Expo SDK 52, Expo Router file-based routing
- `@tasksetu/core` for templates and recommendations
- AsyncStorage for onboarding prefs (until Supabase sync)
- expo-notifications for local reminders (Phase 4)
- Supabase JS client for auth/data (Phase 6)

## Web architecture
- Vite static build, `base: /tasksetu/` for GitHub Pages
- Landing page only in MVP; no authenticated web app

## Backend architecture
- Supabase PostgreSQL with RLS on all user tables
- Private storage bucket for document images
- Task templates seeded from `@tasksetu/core` (or DB mirror)
- Edge functions only for future AI adapter proxy (optional)

## AI layer
- `AIAdapter` interface in `packages/core/src/ai/adapter.ts`
- Default: `RuleBasedAIAdapter`
- Future: OpenAI/Anthropic adapters behind same interface
- Recommendations use rules in MVP, not LLM

## CI/CD
- GitHub Actions: install → build → typecheck → lint
- GitHub Pages: build `apps/web` on main push (Phase 5)

## Key dependencies
| Package | Purpose |
|---------|---------|
| expo, expo-router | Mobile shell |
| vite, react | Web landing |
| typescript | Shared language |
| turbo | Monorepo tasks |
| supabase (future) | Backend |
