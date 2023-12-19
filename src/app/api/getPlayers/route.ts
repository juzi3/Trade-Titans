import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// export async function GET(request: Request) {
export async function GET() {
  // finds all players and teams
  const res = await prisma.player.findMany();
  const res2 = await prisma.team.findMany();
  return NextResponse.json({ res, res2 });
}

// const { searchParams } = new URL(request.url);
// const playerName = searchParams.get("name");
// const teamName = searchParams.get("team");

// try {
//   if (!playerName || !teamName)
//     throw new Error("Player and team names required");
//   await sql`INSERT INTO "Player" (Name, Team) VALUES (${playerName}, ${teamName});`;
//  INSERT INTO "Player" (Name, Team, Position, Image, Value) VALUES ('Trevor Lawrence', 'Jacksonville Jaguars', 'QB', 'https://media-4.api-sports.io/american-football/players/69.png');
// } catch (error) {
//   return NextResponse.json({ error }, { status: 500 });
// }

// const players = await sql`SELECT * FROM players;`;
// const client = await db.connect({
//   POSTGRES_URL: process.env.developmental.local.POSTGRES_URL,
// });
//     const searchedResults = await prisma.player.findMany({
//       where: {
//         id: "2",
//       },
//     });
// console.log(searchedResults, "in getPlayers route");
//   await sql`SELECT * FROM player WHERE position('t' in name)>0;`; //how to find searched player`
// return NextResponse.json({ searchedResults }, { status: 200 });
