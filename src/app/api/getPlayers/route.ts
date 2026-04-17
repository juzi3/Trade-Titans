import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

const RESULT_LIMIT = 20;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  const players = await prisma.player.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
    },
    include: {
      team: { select: { abbreviation: true } },
    },
    orderBy: { value: "desc" },
    take: RESULT_LIMIT,
  });

  return NextResponse.json({ players });
}
