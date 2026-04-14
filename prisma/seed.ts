import { PrismaClient } from "@prisma/client";
import valueOverrides from "./data/player-values.json";

const prisma = new PrismaClient();

const NFL_TEAMS = [
  { abbreviation: "ARI", name: "Cardinals", city: "Arizona" },
  { abbreviation: "ATL", name: "Falcons", city: "Atlanta" },
  { abbreviation: "BAL", name: "Ravens", city: "Baltimore" },
  { abbreviation: "BUF", name: "Bills", city: "Buffalo" },
  { abbreviation: "CAR", name: "Panthers", city: "Carolina" },
  { abbreviation: "CHI", name: "Bears", city: "Chicago" },
  { abbreviation: "CIN", name: "Bengals", city: "Cincinnati" },
  { abbreviation: "CLE", name: "Browns", city: "Cleveland" },
  { abbreviation: "DAL", name: "Cowboys", city: "Dallas" },
  { abbreviation: "DEN", name: "Broncos", city: "Denver" },
  { abbreviation: "DET", name: "Lions", city: "Detroit" },
  { abbreviation: "GB", name: "Packers", city: "Green Bay" },
  { abbreviation: "HOU", name: "Texans", city: "Houston" },
  { abbreviation: "IND", name: "Colts", city: "Indianapolis" },
  { abbreviation: "JAX", name: "Jaguars", city: "Jacksonville" },
  { abbreviation: "KC", name: "Chiefs", city: "Kansas City" },
  { abbreviation: "LAC", name: "Chargers", city: "Los Angeles" },
  { abbreviation: "LAR", name: "Rams", city: "Los Angeles" },
  { abbreviation: "LV", name: "Raiders", city: "Las Vegas" },
  { abbreviation: "MIA", name: "Dolphins", city: "Miami" },
  { abbreviation: "MIN", name: "Vikings", city: "Minnesota" },
  { abbreviation: "NE", name: "Patriots", city: "New England" },
  { abbreviation: "NO", name: "Saints", city: "New Orleans" },
  { abbreviation: "NYG", name: "Giants", city: "New York" },
  { abbreviation: "NYJ", name: "Jets", city: "New York" },
  { abbreviation: "PHI", name: "Eagles", city: "Philadelphia" },
  { abbreviation: "PIT", name: "Steelers", city: "Pittsburgh" },
  { abbreviation: "SEA", name: "Seahawks", city: "Seattle" },
  { abbreviation: "SF", name: "49ers", city: "San Francisco" },
  { abbreviation: "TB", name: "Buccaneers", city: "Tampa Bay" },
  { abbreviation: "TEN", name: "Titans", city: "Tennessee" },
  { abbreviation: "WAS", name: "Commanders", city: "Washington" },
];

const FANTASY_POSITIONS = new Set(["QB", "RB", "WR", "TE", "K", "DEF"]);
const SLEEPER_PLAYERS_URL = "https://api.sleeper.app/v1/players/nfl";
// How many players to keep after filtering + ranking.
const ROSTER_SIZE = 300;

type SleeperPlayer = {
  player_id: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  team?: string | null;
  active?: boolean;
  search_rank?: number;
};

type ValueOverride = {
  sleeper_id: string;
  value: number;
  note?: string;
};

const overrides: Record<string, number> = Object.fromEntries(
  (valueOverrides as ValueOverride[]).map((o) => [o.sleeper_id, o.value])
);

// Exponential decay so top picks separate clearly, tail compresses to a floor.
const valueFromRank = (rank: number): number => {
  const v = Math.round(100 * Math.exp(-rank / 100));
  return Math.max(1, v);
};

async function upsertTeams() {
  for (const t of NFL_TEAMS) {
    await prisma.team.upsert({
      where: { abbreviation: t.abbreviation },
      update: { name: t.name, city: t.city },
      create: t,
    });
  }
  console.log(`Upserted ${NFL_TEAMS.length} teams.`);
}

async function fetchSleeperPlayers(): Promise<Record<string, SleeperPlayer>> {
  const res = await fetch(SLEEPER_PLAYERS_URL);
  if (!res.ok) {
    throw new Error(`Sleeper fetch failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Record<string, SleeperPlayer>;
}

async function seedPlayers() {
  const sleeper = await fetchSleeperPlayers();

  const ranked = Object.values(sleeper)
    .filter((p) => {
      if (!p.active || !p.team) return false;
      if (!p.position || !FANTASY_POSITIONS.has(p.position)) return false;
      if (typeof p.search_rank !== "number" || p.search_rank <= 0) return false;
      return true;
    })
    .sort((a, b) => (a.search_rank ?? 0) - (b.search_rank ?? 0))
    .slice(0, ROSTER_SIZE);

  console.log(`Seeding ${ranked.length} players from Sleeper.`);

  const teamIdByAbbr = new Map<string, string>();
  for (const team of await prisma.team.findMany()) {
    teamIdByAbbr.set(team.abbreviation, team.id);
  }

  // Fresh slate: the PK scheme changed from cuid to Sleeper ID.
  await prisma.player.deleteMany({});

  let inserted = 0;
  let skipped = 0;
  for (let idx = 0; idx < ranked.length; idx++) {
    const p = ranked[idx];
    const teamId = p.team ? teamIdByAbbr.get(p.team) : undefined;
    if (!teamId) {
      skipped++;
      continue;
    }
    const name = p.full_name ?? `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim();
    const override = overrides[p.player_id];
    const value = override ?? valueFromRank(idx + 1);

    await prisma.player.create({
      data: {
        id: p.player_id,
        name,
        position: p.position ?? "",
        teamId,
        value,
      },
    });
    inserted++;
  }

  console.log(`Inserted ${inserted} players. Skipped ${skipped}.`);
}

async function main() {
  await upsertTeams();
  await seedPlayers();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
