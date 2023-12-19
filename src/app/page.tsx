"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
// import Players from "../../SampleData";
import Team from "./components/Team";
import Layout from "./components/Layout";
import { createData, fetchPlayers } from "@/lib/test";

interface Teams {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  player: any[];
}

interface Player {
  id: string;
  name: string;
  teamId?: string;
  teamName?: string;
  position?: string;
  image?: string | null;
  value: number;
}

interface TeamState {
  totalValue: number;
  // team: { name: string; teamName: string; value: number; image: string }[];
  team: Player[];
}

async function getPlayer() {
  const players = await fetchPlayers();
  return players.res;
}

async function getTeams() {
  const players = await fetchPlayers();
  return players.res2;
}

async function addPlayer() {
  const added = await createData();
  return added;
}

const cache = {};

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
  const [data, setData] = useState("");
  const [Players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  console.log("players", Players, "teams", teams);

  // const ref = useRef(null);

  // fetch player info on load, prob should just have player info in a db, fetching players everytime too costly
  useEffect(() => {
    async function getPlayer() {
      const players = await fetchPlayers();
      setPlayers(players.res);
    }
    getPlayer();

    async function getTeams() {
      const players = await fetchPlayers();
      setTeams(players.res2);
    }
    getPlayer();
    getTeams();
  }, []);

  const handleAddPlayer = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    teamNum: number
  ) => {
    console.log("handleAddPlayer fired!");
    // check which team is adding player
    const target = e.target as HTMLElement;
    if (teamNum === 1) {
      // if player input is empty or team already has player do nothing
      if (
        !player1 ||
        team1.team.some(({ name }) => name === target.innerText)
      ) {
        setPlayer1("");
        setSuggestions([]);
        return;
      }

      const match = Players.filter(
        ({ name }: { name: string }) =>
          name.toLowerCase() === target.innerText.toLowerCase()
      );
      console.log("match l112", match);
      const matchObj = {
        id: match[0].id,
        name: match[0].name,
        teamName: teams[Number(match[0].teamId) - 1].abbreviation,
        value: match[0].value,
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
      if (
        !player2 ||
        team2.team.some(({ name }) => name === target.innerText)
      ) {
        setPlayer2("");
        setSuggestions([]);
        return;
      }
      const match = Players.filter(
        ({ name }: { name: string }) =>
          name.toLowerCase() === target.innerText.toLowerCase()
      );
      const matchObj = {
        id: match[0].id,
        name: match[0].name,
        teamName: teams[Number(match[0].teamId) - 1].abbreviation,
        value: match[0].value,
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
      let playerIdx = 0;
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
      let playerIdx = 0;
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
    let matches;
    if (teamNum === 1) {
      setPlayer1(e.target.value.toLowerCase());
      matches = Players.filter(({ name }: { name: string }) => {
        return (
          name.toLowerCase().includes(player1) &&
          !team1.team.some((player) => player.name === name) &&
          !team2.team.some((player) => player.name === name)
        );
      });
    } else {
      setPlayer2(e.target.value.toLowerCase());
      matches = Players.filter(({ name }: { name: string }) => {
        return (
          name.toLowerCase().includes(player2) &&
          !team1.team.some((player) => player.name === name) &&
          !team2.team.some((player) => player.name === name)
        );
      });
    }
    console.log(matches, "in onChange");
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
    <Layout>
      <section id="home-page" className="min-h-screen">
        <header className="basis-1/5 py-8 max-w-screen-lg px-2">
          <h1 className="font-bold text-lg">Fantasy Football Trade Analyzer</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            alias mollitia aperiam et quibusdam non? Rerum voluptatibus, tempore
            ad ratione nemo fugit, totam sapiente odit amet facilis culpa animi
            quidem.
          </p>
        </header>
        {analyzed && (
          <section className="flex justify-center w-64 bg-red text-light-secondary rounded px-2 py-4 max-w-screen-lg mx-auto">
            <div className="flex">
              <h1 className="text-center">
                {Math.abs(team1.totalValue - team2.totalValue) <= 2
                  ? "Fair Trade!"
                  : team1.totalValue > team2.totalValue
                  ? "Trade Favors Team 1"
                  : "Trade Favors Team 2"}
              </h1>
            </div>
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
              className="px-2 py-4 bg-gradient-to-r from-cyan to-dark-secondary rounded w-64 text-white"
              onClick={() => setAnalyzed(false)}
            >
              Edit Current Trade
            </button>
          )}
          <button
            disabled={team1.team.length === 0 || team2.team.length === 0}
            className="px-2 py-4 bg-dark-secondary rounded w-64"
            onClick={() => handleAnalyze()}
          >
            {analyzed ? "Start New Trade" : "Analyze Trade"}
          </button>
        </div>
        <section className="basis-1/5 py-8 max-w-screen-lg px-2">
          <h1 className="font-bold text-lg">How To Use The Trade Analyzer</h1>
          <p>
            Start by typing the names of the players involved on both sides of
            the trade. When all players have been selected, click the
            &apos;Analyze Trade&apos; button. The total value from each side of
            the trade will be displayed and the analyzer will suggest whether or
            not to make the trade. Remember, these are just suggestions based
            off of the players you have selected and does not take into account
            the rest of the players on either team.
          </p>
          {/* <button
            className="bg-dark-secondary p-4"
            onClick={async () => {
              const added = await addPlayer();
              console.log("res from home: ");
            }}
          >
            TEst
          </button> */}
        </section>
      </section>
    </Layout>
  );
}
