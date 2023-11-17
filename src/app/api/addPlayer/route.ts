import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST() {
  console.log("post req");
  await prisma.player.create({
    data: {
      Name: "Derek Carr",
      Team: {
        connect: { id: "1" },
      },
      Position: "QB",
      Image: "https://media-4.api-sports.io/american-football/players/1.png",
      Value: 0,
    },
  });
  // const res2 = prisma.team.create({
  //   data: {
  //     id: "26",
  //     Name: "Houston Texans",
  //     Abbreviation: "Hou",
  //     City: "Houston",
  //   },
  // });
  return NextResponse.json({ message: "successful add" });
}
