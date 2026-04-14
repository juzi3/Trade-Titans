# Trade Titans — Portfolio Polish PRD

## Problem

Trade Titans is a fantasy football trade analyzer deployed at https://trade-titans.vercel.app/. As a portfolio piece it currently reads as unfinished:

- The top nav advertises five sections (Rankings, Stats, Tools, Articles, News) but only the homepage trade analyzer works. Clicking any other item lands on a "Temp ___ Page" stub.
- Player images load from an external API the owner no longer has access to and silently fail with no fallback.
- The README is boilerplate — no description, no stack, no live link, no story.
- Player data is frozen in December 2023. Rosters are stale (e.g. Christian McCaffrey on SF, Travis Etienne on JAC) and every player's `value` is `0`, so the trade analyzer can't actually evaluate anything.

The net effect: a visitor who clicks around for more than 10 seconds concludes the project is abandoned.

## Goal

Ship a single polish pass so the live demo feels intentional, complete, and easy to understand — good enough to link on a résumé or portfolio site without apologizing for it.

## Non-Goals

- Building out News, Stats, Tools, or Articles. These are removed, not delayed.
- Integrating a live player-value source (KeepTradeCut, FantasyPros, etc.). Values are hand-curated once.
- Adding a test suite / test runner. Deferred to a follow-up pass that also extracts the trade-value math into a pure module worth testing.
- Automated nightly data refresh (cron / scheduled function). Manual `npm run db:seed` is fine for a portfolio demo.
- Re-adding an `image` column to the Player schema. The fallback handles broken images without schema churn.

## User Stories

1. **As a recruiter** looking at the live demo, I want every visible link to lead somewhere real, so the app feels finished.
2. **As a recruiter** reading the README, I want to know in 30 seconds what the app does, the stack, and where to try it.
3. **As a fantasy football user** testing the trade analyzer, I want current rosters (2026 season) so the analyzer matches what I see on my real league.
4. **As a fantasy football user** adding players to a trade, I want meaningful value differences so "Fair Trade" / "Team A wins" results actually mean something.
5. **As a visitor** scanning a player card, I want a clean avatar even when the external image CDN fails, so nothing looks broken.

## Scope & Acceptance Criteria

### 1. README rewrite
- README contains: logo, one-paragraph About, live-demo link, feature bullets, tech-stack bullets, data-source note, local-dev instructions with env vars, short "why I built it" paragraph.
- GitHub renders it cleanly; no lorem ipsum or TODOs.

### 2. Nav & placeholder-page cleanup
- Top nav (desktop + mobile) shows only Rankings (with PPR / Half-PPR / Standard submenu). No Stats, Tools, Articles, News.
- `/news`, `/tools`, `/articles`, `/stats` return 404.
- `RankingsMenu` has no "Rest of Season" section (routes don't exist).
- No dead components left in `src/app/components/` for the removed sections.

### 3. Player image fallback
- When the api-sports image URL 404s, the player card renders a local placeholder silhouette instead of a broken image.
- Fallback asset lives at `public/assets/player-placeholder.png` (or `.svg`).
- No console errors from the failed image load path.

### 4. Data refresh
- Schema has an `updatedAt` timestamp on the Player model; a migration exists.
- `prisma/seed.ts` exists and is wired via `package.json` `prisma.seed`.
- `prisma/data/player-values.json` contains ~200 curated fantasy-relevant players (`sleeper_id`, `name`, `position`, `value`).
- Seed fetches https://api.sleeper.app/v1/players/nfl, joins on `sleeper_id`, upserts teams + players with *current* team assignments.
- Running `npm run db:seed` against a clean DB produces ~200 players; searching "McCaffrey" and "Etienne" returns their current teams, not SF / JAC.
- The existing fair-trade threshold (`<= 2` diff in `src/app/page.tsx`) continues to feel right — values scaled into a ~0–100 range.

## Success Criteria

A recruiter opening https://trade-titans.vercel.app/ in April 2026 can:
1. Read the README in under a minute and know what the app does + how to run it.
2. Open every visible nav link without hitting a "Temp ___ Page" stub.
3. Search for a current NFL star, see them on the right team with a non-broken avatar, and run a trade comparison that returns a sensible fair/unfair verdict.

## Workflow

This PRD is paired with `KANBAN.md` at repo root. Work is done one card at a time; the board is updated live so progress is always visible.
