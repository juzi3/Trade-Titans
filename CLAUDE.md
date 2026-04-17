# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Trade Titans — a fantasy football trade analyzer (portfolio piece). Next.js App Router + Prisma + Vercel Postgres. Live at https://trade-titans.vercel.app/.

## Commands

```bash
npm run dev              # Next dev server (http://localhost:3000)
npm run build            # `prisma generate && next build`
npm run start            # serve production build
npm run lint             # next lint
npm run db:seed          # tsx prisma/seed.ts — refreshes players/teams from Sleeper
npx prisma migrate dev   # apply schema changes locally
npx prisma studio        # inspect the DB visually
```

Node 22 is required (`engines.node` pins it). There is no test runner yet — see `PRD.md` "Non-Goals" and `KANBAN.md` "Next pass".

Env vars needed: `POSTGRES_PRISMA_URL` (pooled, used by the app), `POSTGRES_URL_NON_POOLING` (direct, used by migrations). Both come from a Vercel Postgres instance.

## Workflow

`PRD.md` + `KANBAN.md` live at the repo root and drive the work. Move one card at a time; update the board live. Cards already shipped are in the Done column — don't revisit them without a reason. The "Next pass" section lists the planned follow-up (real Rankings pages, plus extracting the trade math into `src/lib/trade.ts` behind Vitest).

## Architecture

**Data flow.** Sleeper's public player endpoint (`https://api.sleeper.app/v1/players/nfl`) is the source of truth for rosters; `prisma/data/player-values.json` supplies curated values that override the rank-based default. Both merge in `prisma/seed.ts` — nothing else writes to the DB in normal operation.

**Player ID scheme.** `player.id` *is* the Sleeper ID (string, not a cuid). Keep it that way — `PlayerAvatar` and any future Sleeper re-sync depend on it. `team.abbreviation` is unique and is what the seed upserts against.

**Seed logic to preserve (`prisma/seed.ts`).**
- Filters to active players on a real team, in `FANTASY_POSITIONS` (QB/RB/WR/TE/K/DEF), with a positive `search_rank`.
- Takes the top `ROSTER_SIZE` (300) by `search_rank`.
- `valueFromRank` is an exponential decay (`100 * exp(-rank/100)`, floored at 1) tuned so the fair-trade threshold of `<= 2` in `src/app/page.tsx` still feels right. If you retune one, retune the other.
- Does `deleteMany` on players before inserting — a full refresh, not an incremental merge. Teams are upserted, never deleted.

**App shape.**
- `src/app/page.tsx` is the whole trade analyzer — a big client component holding both teams' state, the in-memory search cache, and the fair-trade verdict. Trade math lives inline here today; the planned extraction target is `src/lib/trade.ts`.
- `src/app/api/getPlayers/route.ts` is the only read endpoint the UI calls (via `src/lib/helpers.ts#fetchPlayers`). `src/app/api/addPlayer/route.ts` exists but is effectively dead — the seed handles inserts.
- `src/lib/prisma.ts` is the standard Next + Prisma singleton (reuse `global.prisma` in dev to survive HMR).
- `src/app/components/PlayerAvatar.tsx` loads headshots from `media-4.api-sports.io` and falls back to `/assets/player-placeholder.svg` on error. The remote host is allowlisted in `next.config.js` — if you change the image source, update `remotePatterns` too.
- Nav has been trimmed to Rankings only (see KANBAN T2). Don't re-add Stats/Tools/Articles/News routes or menu components.

## Conventions

- App Router, client components where needed (`"use client"` at the top of `page.tsx`, `PlayerAvatar`, `Nav`, etc.).
- Tailwind for styling; custom colors (`dark-secondary`, `light-secondary`, `red`, `cyan`) are defined in `tailwind.config.ts`.
- Prettier + `eslint-config-next` are on; run `npm run lint` before declaring a task done.
- Prisma models are lowercase (`player`, `team`) — match that casing when writing queries.
