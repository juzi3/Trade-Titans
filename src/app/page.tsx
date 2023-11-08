"use client";

import React, { useEffect, useState } from "react";
import Players from "../../SampleData";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

interface Team {
  name: string;
  team: string;
  value: number;
}

export default function Home() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [team1, setTeam1] = useState<Team[]>([]);
  const [team2, setTeam2] = useState<Team[]>([]);
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
      if (!player1 || team1.includes(e.target.innerText)) {
        setPlayer1("");
        setSuggestions([]);
        return;
      }

      const match = Players.filter(
        ({ name }) => name.toLowerCase() === e.target.innerText.toLowerCase()
      );
      const matchObj = {
        name: match[0].name,
        team: match[0].team,
        value: match[0].tradeValue,
      };
      // else add player to current team array
      setTeam1([...team1, matchObj]);
      // clear player input
      setPlayer1("");
    } else {
      if (!player2 || team2.includes(e.target.innerText)) {
        setPlayer2("");
        setSuggestions([]);
        return;
      }
      const match = Players.filter(
        ({ name }) => name.toLowerCase() === e.target.innerText.toLowerCase()
      );
      const matchObj = {
        name: match[0].name,
        team: match[0].team,
        value: match[0].tradeValue,
      };
      // else add player to current team array
      setTeam2([...team2, matchObj]);
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
      for (let i = 0; i < team1.length; i++) {
        if (team1[i].name === playerName) {
          playerIdx = i;
          break;
        }
      }
      // make new array without selected player
      const newTeam = [
        ...team1.slice(0, playerIdx),
        ...team1.slice(playerIdx + 1),
      ];
      // set team state to new team
      setTeam1(newTeam);
    } else {
      let playerIdx;
      for (let i = 0; i < team1.length; i++) {
        if (team1[i].name === playerName) {
          playerIdx = i;
          break;
        }
      }
      const newTeam = [
        ...team2.slice(0, playerIdx),
        ...team2.slice(playerIdx + 1),
      ];
      setTeam2(newTeam);
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
          !team1.some((player) => player.name === name) &&
          !team2.some((player) => player.name === name)
        );
      });
    } else {
      setPlayer2(e.target.value.toLowerCase());
      matches = Players.filter(({ name }) => {
        return (
          name.toLowerCase().includes(player2) &&
          !team1.some((player) => player.name === name) &&
          !team2.some((player) => player.name === name)
        );
      });
    }
    const justNames = matches.map(({ name }) => name);
    setSuggestions(justNames.length > 0 ? justNames : ["No Player Found"]);
  };

  const handleAnalyze = () => {
    console.log("handleAnalyze fired!");
    const team1Total = team1.reduce((a, c) => a + c.value, 0);
    const team2Total = team2.reduce((a, c) => a + c.value, 0);
    setAnalyzed(true);
    console.log(team1Total, team2Total);
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-auto relative">
      <Nav />
      <section className="min-h-screen pb-48">
        <header className="basis-1/5 py-8 max-w-screen-lg px-2">
          <h1>Trade Analyzer</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            alias mollitia aperiam et quibusdam non? Rerum voluptatibus, tempore
            ad ratione nemo fugit, totam sapiente odit amet facilis culpa animi
            quidem.
          </p>
        </header>
        {/* <section className="flex justify-evenly container mx-auto gap-4 py-4 basis-1/5"></section> */}
        {/* <section className="flex grow shrink-0 justify-evenly container mx-auto gap-4 basis-2/5"> */}
        {analyzed && (
          <section className="flex justify-between w-64 bg-red-500 rounded px-2 py-4 max-w-screen-lg">
            <div>
              <h1>Make trade</h1>
            </div>
            <div>X or Check</div>
          </section>
        )}
        <section className="flex items-start justify-between container mx-auto py-4 basis-3/5 max-w-screen-lg flex-wrap">
          <section className="flex flex-col shrink-0 grow justify-evenly gap-4 p-4 basis-1/2">
            <section className="flex justify-evenly gap-2 py-4 basis-1/3">
              <div
                id="team1-input"
                className="flex gap-2 flex-col justify-evenly w-full"
              >
                <label htmlFor="team1">Team 1</label>
                <div className="gap-1 flex-col flex">
                  {!analyzed ? (
                    <input
                      className="rounded px-2 py-4 w-full"
                      name="team1"
                      type="text"
                      value={player1}
                      placeholder="Player Name"
                      onBlur={() => {
                        setSuggestions([]);
                        setPlayer1("");
                      }}
                      onChange={(e) => onChange(e, 1)}
                    />
                  ) : (
                    <h2 className="px-4 py-2 bg-red-500 rounded">
                      Total Trade Value:{" "}
                      {team1.reduce((a, c) => a + c.value, 0)}
                    </h2>
                  )}
                  <ul className="bg-white shadow-lg rounded max-h-52 overflow-auto absolute top-72">
                    {player1 &&
                      suggestions.map((s) => {
                        return (
                          <li
                            key={`1${s}`}
                            className="py-2 px-2 hover:bg-cyan-600 cursor-pointer relative"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={
                              s === "No Player Found"
                                ? () => {
                                    setSuggestions([]);
                                    setPlayer1("");
                                  }
                                : (e) => handleAddPlayer(e, 1)
                            }
                          >
                            {s}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </section>
            <section className="flex grow shrink-0 gap-4 basis-2/3">
              <div className="w-full gap-1 flex flex-col">
                <div className="px-2 py-4 flex justify-between">
                  <span className="basis-3/6">Name</span>
                  <span className="basis-1/6">Team</span>
                  <span className="basis-1/6">Value</span>
                  {!analyzed && <span className="basis-1/6">Remove</span>}
                </div>
                {team1.map(({ name, team, value }) => {
                  return (
                    <div
                      key={`1${name}`}
                      className="px-2 py-4 border-solid border-black border-2 rounded flex justify-between"
                    >
                      <span className="basis-3/6">{name}</span>
                      <span className="basis-1/6">{team}</span>
                      <span className="basis-1/6">{value}</span>
                      {!analyzed && (
                        <button
                          onClick={() => handleRemovePlayer(name, 1)}
                          className="basis-1/6"
                        >
                          -
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
          <section className="flex flex-col shrink-0 grow justify-evenly gap-4 p-4 basis-1/2">
            <section className="flex justify-evenly gap-2 py-4 basis-1/3">
              <div
                id="team2-input"
                className="flex gap-2 flex-col justify-evenly w-full"
              >
                <label htmlFor="team2">Team 2</label>
                <div className="gap-1 flex-col flex">
                  {!analyzed ? (
                    <input
                      className="rounded px-2 py-4 w-full"
                      name="team2"
                      type="text"
                      value={player2}
                      placeholder="Player Name"
                      onBlur={() => {
                        setSuggestions([]);
                        setPlayer2("");
                      }}
                      onChange={(e) => onChange(e, 2)}
                    />
                  ) : (
                    <h2 className="px-4 py-2 bg-red-500 rounded">
                      Total Trade Value:{" "}
                      {team2.reduce((a, c) => a + c.value, 0)}
                    </h2>
                  )}
                  <ul className="bg-white shadow-lg rounded max-h-52 overflow-auto absolute top-72">
                    {player2 &&
                      suggestions.map((s) => {
                        return (
                          <li
                            key={`2${s}`}
                            className="py-2 px-2 hover:bg-cyan-600 cursor-pointer relative"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={
                              s === "No Player Found"
                                ? () => {
                                    setSuggestions([]);
                                    setPlayer2("");
                                  }
                                : (e) => handleAddPlayer(e, 2)
                            }
                          >
                            {s}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </section>
            <section className="flex grow shrink-0 gap-4 basis-2/3">
              <div className="w-full gap-1 flex flex-col">
                <div className="px-2 py-4 flex justify-between">
                  <span className="basis-3/6">Name</span>
                  <span className="basis-1/6">Team</span>
                  <span className="basis-1/6">Value</span>
                  {!analyzed && <span className="basis-1/6">Remove</span>}
                </div>
                {team2.map(({ name, team, value }) => {
                  return (
                    <div
                      key={`2${name}`}
                      className="px-2 py-4 border-solid border-black border-2 rounded flex justify-between"
                    >
                      <span className="basis-3/6">{name}</span>
                      <span className="basis-1/6">{team}</span>
                      <span className="basis-1/6">{value}</span>
                      {!analyzed && (
                        <button
                          onClick={() => handleRemovePlayer(name, 2)}
                          className="basis-1/6"
                        >
                          -
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
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
            disabled={team1.length === 0 || team2.length === 0}
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
{
  /* <iframe
        src="https://sleeper.app/embed/players/nfl/trending/add?lookback_hours=24&limit=25"
        width="350"
        height="500"
      ></iframe> */
}

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
