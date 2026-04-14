# Trade Titans — Polish Pass Kanban

Tracking board for the portfolio polish work described in `PRD.md`. One card moves at a time.

Legend: `[ ]` To Do · `[~]` In Progress · `[x]` Done

---

## To Do

_(nothing — all cards in flight)_

## In Progress

_(nothing)_

## Done

- [x] **T1 — Rewrite README** — replaced boilerplate with About, live link, features, stack, data source, local-dev instructions, "why I built it".
- [x] **T2 — Remove unfinished nav items + placeholder pages** — trimmed `Nav.tsx` + `RankingsMenu.tsx`; deleted `/news`, `/tools`, `/articles`, `/stats` routes and `StatsMenu`/`ToolsMenu`/`ArticlesMenu` components. `tsc --noEmit` passes. Rankings kept as a stub per user decision (build out later).
- [x] **T3 — Player image fallback** — added `PlayerAvatar` client component (`onError` → SVG silhouette), placed placeholder at `public/assets/player-placeholder.svg`, replaced the `<Image>` call in `Team.tsx`. `tsc --noEmit` passes.
- [x] **T4 — Data refresh (schema + seed)** — Player `id` now holds the Sleeper ID (option B); added `updatedAt`; `team.abbreviation` is now unique. Wrote `prisma/seed.ts` (Sleeper-fed upsert with override-able values via `prisma/data/player-values.json`). Wired `npm run db:seed` with `tsx`. `prisma validate`, `tsc --noEmit`, `next lint` all pass. **User still needs to run `npx prisma migrate dev --name refresh_player_schema` + `npm run db:seed` against the Postgres DB.**

---

## Deferred (not this pass)

- Testing infrastructure (Vitest + RTL) — follow-up pass that also extracts trade-math to a pure module.
- Automated data refresh (cron / scheduled function).
- Live value source integration (KTC / FantasyPros).
- Rebuilding News / Stats / Tools / Articles sections.
- Build out the real Rankings pages (currently still stubs at `/rankings`, `/rankings/{ppr,half-ppr,standard}`).
