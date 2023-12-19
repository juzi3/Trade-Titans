import * as dotenv from "dotenv";
dotenv.config();

import { NextResponse } from "next/server";

interface Player {
  id: string;
  name: string;
  teamId?: string;
  teamName?: string;
  position?: string;
  image?: string | null;
  value: number;
}

export async function POST(req: Request) {
  // from API
  // Player w/ stats

  // const { i } = req.body;
  const { id } = await req.json();

  // console.log(id, "in for loop in addPlayer route");
  // return NextResponse.json({ message: "test successful" });

  // get by playerid
  // const url = `https://api-american-football.p.rapidapi.com/players/statistics?season=2023&id=${id}`;
  // get by team id
  const url = `https://api-american-football.p.rapidapi.com/players/statistics?season=2023&team=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // for (const { player, teams } of result.response)
    //   result.response.map(async ({ player, teams }) => {
    //     const searchedResults = await prisma.player.findUnique({
    //       where: {
    //         id: String(player.id),
    //       },
    //     });
    //     console.log(searchedResults, "addPlayer route");

    //     if (searchedResults === null && teams[0].groups[0].name !== "Defense") {
    //       await prisma.player.create({
    //         data: {
    //           id: String(player.id),
    //           name: String(player.name),
    //           team: {
    //             connect: {
    //               id: String(teams[0].team.id),
    //             },
    //           },
    //           image: "",
    //           position: "",
    //           value: 0,
    //         },
    //       });
    //       return NextResponse.json({ message: "successful add", res: result });
    //     }
    //     return NextResponse.json({
    //       message: "already added or defensive player",
    //       res: result,
    //     });
    //   });
    return NextResponse.json({
      message: "already added or defensive player",
      res: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "add failed" });
  }
}

/* 
Data from API

Player w/ stats
id: result.response[0].player.id  
name: result.response[0].player.name
teamId: result.response[0].player.teams[0].team.id

{"get":"players\/statistics","parameters":{"season":"2022","id":"10"},"errors":[],"results":1,"response":[{"player":{"id":10,"name":"Davante Adams","image":"https:\/\/media-4.api-sports.io\/american-football\/players\/10.png"},"teams":[{"team":{"id":1,"name":"Las Vegas Raiders","logo":"https:\/\/media-4.api-sports.io\/american-football\/teams\/1.png"},

Team
id: result.response[0].id
name: result.response[0].name
abbreviation 
city         
{
"get": "teams",
"parameters": {
"id": "1"
},
"errors": [],
"results": 1,
"response": [
{
  "id": 1,
  "name": "Las Vegas Raiders",
  "code": null,
  "city": null,
  "logo": "https://media-4.api-sports.io/american-football/teams/1.png",
  "country": {
    "name": "USA",
    "code": "US",
    "flag": "https://media-4.api-sports.io/flags/us.svg"
  }
}
]
}
*/
// const res2 = prisma.team.create({
//   data: {
//     id: "26",
//     Name: "Houston Texans",
//     Abbreviation: "Hou",
//     City: "Houston",
//   },
// });
