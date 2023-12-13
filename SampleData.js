const Players = [
  {
    id: 1,
    name: "Derek Carr",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "LV",
    group: "Offense",
    position: "QB",
    tradeValue: 4,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Tom Brady",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "N/A",
    group: "Offense",
    position: "QB",
    tradeValue: 0,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Pat Mahomes",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "KC",
    group: "Offense",
    position: "QB",
    tradeValue: 15,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Josh Allen",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "BUF",
    group: "Offense",
    position: "QB",
    tradeValue: 15,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "CJ Stroud",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "HOU",
    group: "Offense",
    position: "QB",
    tradeValue: 7,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Bryce Young",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "CAR",
    group: "Offense",
    position: "QB",
    tradeValue: 5,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Justin Herbert",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "LAC",
    group: "Offense",
    position: "QB",
    tradeValue: 14,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Justin Fields",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "CHI",
    group: "Offense",
    position: "QB",
    tradeValue: 8,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Khalil Herbert",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "CHI",
    group: "Offense",
    position: "RB",
    tradeValue: 4,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Khalil Mack",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "LAC",
    group: "Offense",
    position: "LB",
    tradeValue: 4,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
  {
    id: 1,
    name: "Justin Simmons",
    age: 31,
    height: "6' 3\"",
    weight: "210 lbs",
    team: "DEN",
    group: "Offense",
    position: "S",
    tradeValue: 4,
    salary: "$19,375,000",
    experience: 9,
    image: "https://media.api-sports.io/american-football/players/1.png",
  },
];

export default Players;

// Team ID from football API
{
  /* 
Teams
[
  {
    Las Vegas Raiders: 1
  },
  {
    Jacksonville Jaguars: 2
  },
  {
    New England Patriots: 3
  },
  {
    New York Giants: 4
  },
  {
    Houston Texans: 26
  }
]

Players:
[
  {
    Trevor Lawrence: 69
  }
]

From sleeper: 

{
  "3086": {
    "hashtag": "#TomBrady-NFL-NE-12",
    "depth_chart_position": 1,
    "status": "Active",
    "sport": "nfl",
    "fantasy_positions": ["QB"],
    "number": 12,
    "search_last_name": "brady",
    "injury_start_date": null,
    "weight": "220",
    "position": "QB",
    "practice_participation": null,
    "sportradar_id": "",
    "team": "NE",
    "last_name": "Brady",
    "college": "Michigan",
    "fantasy_data_id":17836,
    "injury_status":null,
    "player_id":"3086",
    "height": "6'4\"",
    "search_full_name": "tombrady",
    "age": 40,
    "stats_id": "",
    "birth_country": "United States",
    "espn_id": "",
    "search_rank": 24,
    "first_name": "Tom",
    "depth_chart_order": 1,
    "years_exp": 14,
    "rotowire_id": null,
    "rotoworld_id": 8356,
    "search_first_name": "tom",
    "yahoo_id": null
  },
  ...
}

for (const key in players) {
  if (key.status === 'Active') {
    // need name, team, position
  }
}

*/
}
