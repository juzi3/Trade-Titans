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

## Next pass (planned)

- **Build out Rankings pages** (`/rankings`, `/rankings/{ppr,half-ppr,standard}`) — real tables, not stubs.
- **Testing infrastructure** — extract trade math from `src/app/page.tsx` into `src/lib/trade.ts`, add Vitest, cover fair-trade threshold + value summing.
- **Find a new player-photo API** — current `media-4.api-sports.io` source is inaccessible to the owner so every card falls back to the silhouette placeholder. Research alternatives (Sleeper CDN `sleepercdn.com/content/nfl/players/{id}.jpg`, ESPN, etc.), pick one that keys off `sleeper_id`, update `PlayerAvatar.tsx` + `next.config.js` `remotePatterns`.
- **Update the player search** — `/api/getPlayers` currently does a case-sensitive `contains` match, returns the full teams list on every keystroke, and has no result cap; `fetchPlayers` in `src/lib/helpers.ts` has a leftover debug log and the dead `createData` stub. Move to case-insensitive search with a sane `take` limit, split teams into its own endpoint (or fetch once on mount), and clean up `helpers.ts`.

## Deferred (later)

- Automated data refresh (cron / scheduled function).
- Live value source integration (KTC / FantasyPros).
- Rebuilding News / Stats / Tools / Articles sections.

---

Polish pass shipped 2026-04-14: schema migrated via `prisma db push --force-reset`, seeded from Sleeper, trade analyzer working end-to-end.
