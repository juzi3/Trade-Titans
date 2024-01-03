import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  // get the search term from the frontend
  const { searchParams } = new URL(req.url);
  const playerName = searchParams.get("search") as string;
  // lookup that player in the db
  const searchRes = await prisma.player.findMany({
    where: {
      name: { contains: playerName },
    },
  });
  // finds all players
  // const players = await prisma.player.findMany();
  // find all teams
  const teams = await prisma.team.findMany();
  return NextResponse.json({ searchRes, teams });
}
