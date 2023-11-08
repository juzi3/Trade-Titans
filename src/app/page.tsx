"use client";

import React, { useEffect, useState } from "react";
import Players from "../../SampleData";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Team from "./components/Team";

interface TeamState {
  totalValue: number;
  team: { name: string; teamName: string; value: number }[];
}

export default function Home() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [team1, setTeam1] = useState<TeamState>({
    totalValue: 0,
    team: [],
  });
  const [team2, setTeam2] = useState<TeamState>({
    totalValue: 0,
    team: [],
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  // fetch player info on load, prob should just have player info in a db, fetching players everytime too costly
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/3918298/statistics?lang=en&region=us"
  //     );
  //     const data = await res.json();

  //     // setSuggestions2(data);
  //     console.log(data, "data from api");
  //   };

  //   fetchData();
  // }, []);

  const handleAddPlayer = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    teamNum: number
  ) => {
    console.log("handleAddPlayer fired!");
    // check which team is adding player
    if (teamNum === 1) {
      // if player input is empty or team already has player do nothing
      if (!player1 || team1.team.includes(e.target.innerText)) {
        setPlayer1("");
        setSuggestions([]);
        return;
      }

      const match = Players.filter(
        ({ name }) => name.toLowerCase() === e.target.innerText.toLowerCase()
      );
      const matchObj = {
        name: match[0].name,
        teamName: match[0].team,
        value: match[0].tradeValue,
      };
      // else add player to current team array
      // setTeam1([...team1, matchObj]);
      setTeam1({
        totalValue: team1.totalValue + matchObj.value,
        team: [...team1.team, matchObj],
      });
      // clear player input
      setPlayer1("");
    } else {
      if (!player2 || team2.team.includes(e.target.innerText)) {
        setPlayer2("");
        setSuggestions([]);
        return;
      }
      const match = Players.filter(
        ({ name }) => name.toLowerCase() === e.target.innerText.toLowerCase()
      );
      const matchObj = {
        name: match[0].name,
        teamName: match[0].team,
        value: match[0].tradeValue,
      };
      // else add player to current team array
      // setTeam2([...team2, matchObj]);
      setTeam2({
        totalValue: team2.totalValue + matchObj.value,
        team: [...team2.team, matchObj],
      });
      setPlayer2("");
    }
    // clear suggestions
    setSuggestions([]);
  };

  const handleRemovePlayer = (playerName: string, teamNum: number) => {
    console.log("handleRemovePlayer fired!");
    // check which team to remove from
    if (teamNum === 1) {
      // find index of player in team array
      // let playerIdx = team1.indexOf(playerName);
      let playerIdx;
      for (let i = 0; i < team1.team.length; i++) {
        if (team1.team[i].name === playerName) {
          playerIdx = i;
          break;
        }
      }
      // make new array without selected player
      const newTeam = [
        ...team1.team.slice(0, playerIdx),
        ...team1.team.slice(playerIdx + 1),
      ];
      // set team state to new team
      setTeam1({
        totalValue: team1.totalValue - team1.team[playerIdx].value,
        team: newTeam,
      });
    } else {
      let playerIdx;
      for (let i = 0; i < team2.team.length; i++) {
        if (team2.team[i].name === playerName) {
          playerIdx = i;
          break;
        }
      }
      const newTeam = [
        ...team2.team.slice(0, playerIdx),
        ...team2.team.slice(playerIdx + 1),
      ];
      // setTeam2(newTeam);
      setTeam2({
        totalValue: team2.totalValue - team2.team[playerIdx].value,
        team: newTeam,
      });
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    teamNum: number
  ) => {
    // check which team
    let matches: { name: string }[] | null;
    if (teamNum === 1) {
      setPlayer1(e.target.value.toLowerCase());
      matches = Players.filter(({ name }) => {
        return (
          name.toLowerCase().includes(player1) &&
          !team1.team.some((player) => player.name === name) &&
          !team2.team.some((player) => player.name === name)
        );
      });
    } else {
      setPlayer2(e.target.value.toLowerCase());
      matches = Players.filter(({ name }) => {
        return (
          name.toLowerCase().includes(player2) &&
          !team1.team.some((player) => player.name === name) &&
          !team2.team.some((player) => player.name === name)
        );
      });
    }
    const justNames = matches.map(({ name }) => name);
    setSuggestions(justNames.length > 0 ? justNames : ["No Player Found"]);
  };

  const handleAnalyze = () => {
    console.log("handleAnalyze fired!");
    if (!analyzed) {
      setAnalyzed(true);
    } else {
      setAnalyzed(false);
      setTeam1((prevTeam) => Object.assign(prevTeam, { team: [] }));
      setTeam2((prevTeam) => Object.assign(prevTeam, { team: [] }));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-auto relative">
      <Nav />
      <section className="min-h-screen pb-48 pt-24">
        <header className="basis-1/5 py-8 max-w-screen-lg px-2">
          <h1>Trade Analyzer</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            alias mollitia aperiam et quibusdam non? Rerum voluptatibus, tempore
            ad ratione nemo fugit, totam sapiente odit amet facilis culpa animi
            quidem.
          </p>
        </header>
        {analyzed && (
          <section className="flex justify-between w-64 bg-red-500 rounded px-2 py-4 max-w-screen-lg mx-auto">
            <div>
              <h1>Make trade</h1>
            </div>
            <div>X or Check</div>
          </section>
        )}
        <section className="flex flex-wrap basis-3/5">
          <Team
            analyzed={analyzed}
            player={player1}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setPlayer={setPlayer1}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            onChange={onChange}
            teamNum={1}
            team={team1}
          />
          <Team
            analyzed={analyzed}
            player={player2}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setPlayer={setPlayer2}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            onChange={onChange}
            teamNum={2}
            team={team2}
          />
        </section>
        <div className="basis-1/5 py-8 w-full flex flex-col items-center gap-4 max-w-screen-lg">
          {analyzed && (
            <button
              className="px-2 py-4 bg-white rounded w-64"
              onClick={() => setAnalyzed(false)}
            >
              Edit Current Trade
            </button>
          )}
          <button
            disabled={team1.team.length === 0 || team2.team.length === 0}
            className="px-2 py-4 bg-cyan-600 rounded w-64"
            onClick={() => handleAnalyze()}
          >
            {analyzed ? "Start New Trade" : "Analyze Trade"}
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

{
  /* Trending players from sleeper */
}
//  <iframe
//         src="https://sleeper.app/embed/players/nfl/trending/add?lookback_hours=24&limit=25"
//         width="350"
//         height="500"
//       ></iframe>

// ---------- table version of team comp ----------
// <table className="basis-1/2 gap-0.5 table-fixed border-spacing-2">
//   <thead>
//     <tr className="px-2 py-4 ">
//       <th>Name</th>
//       <th>Team</th>
//       <th>Value</th>
//       <th>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//     {team1.map((player) => {
//       return (
//         <tr
//           key={`1${player}`}
//           className="px-2 py-4 border-solid border-black border-2 rounded"
//         >
//           <td>{player}</td>
//           <td>Team</td>
//           <td>0</td>
//           <button onClick={() => handleRemovePlayer(player, 1)}>
//             -
//           </button>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
// <table className="basis-1/2 gap-0.5 table-fixed border-spacing-2">
//   <thead>
//     <tr className="px-2 py-4 ">
//       <th>Name</th>
//       <th>Team</th>
//       <th>Value</th>
//       <th>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//     {team2.map((player) => {
//       return (
//         <tr
//           key={`2${player}`}
//           className="px-2 py-4 border-solid border-black border-2 rounded"
//         >
//           <td>{player}</td>
//           <td>Team</td>
//           <td>0</td>
//           <button onClick={() => handleRemovePlayer(player, 2)}>
//             -
//           </button>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
