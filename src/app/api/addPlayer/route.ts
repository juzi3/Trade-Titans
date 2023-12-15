import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  console.log("post req");

  //   await prisma.player.create({
  //     data: {
  //       Name: "Derek Carr",
  //       Team: {
  //         connect: { id: "1" },
  //       },
  //       Position: "QB",
  //       Image: "https://media-4.api-sports.io/american-football/players/1.png",
  //       Value: 0,
  // }

  // from API
  // Player w/ stats

  // const { i } = req.body;
  const { id } = await req.json();

  // console.log(id, "in for loop in addPlayer route");
  // return NextResponse.json({ message: "test successful" });

  const url = `https://api-american-football.p.rapidapi.com/players/statistics?season=2023&id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "45008274eemshb30b2c46851652dp14b744jsnd1ff12fcf0b0",
      "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.response[0].teams, "team id");
    const searchedResults = await prisma.player.findUnique({
      where: {
        id: String(result.response[0].player.id),
      },
    });
    console.log(searchedResults, "addPlayer route");

    if (
      searchedResults === null &&
      result.response[0].teams[0].groups[0].name !== "Defense"
    ) {
      await prisma.player.create({
        data: {
          id: String(result.response[0].player.id),
          name: String(result.response[0].player.name),
          team: {
            connect: {
              id: String(result.response[0].teams[0].team.id),
            },
          },
          position: "",
          image: "",
          value: 0,
        },
      });
      return NextResponse.json({ message: "successful add", res: result });
    }
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
