"use client";

import React, { useEffect, useState } from "react";
import Team from "./components/Team";
import Layout from "./components/Layout";
import { fetchPlayers, type PlayerSearchResult } from "@/lib/helpers";

interface RosterPlayer {
  id: string;
  name: string;
  teamName: string;
  value: number;
}

interface TeamState {
  totalValue: number;
  team: RosterPlayer[];
}

async function getPlayer(query = "") {
  const { players } = await fetchPlayers(query);
  return players;
}

const cache: Record<string, PlayerSearchResult[]> = {};

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

  const playerCache = async (query: string) => {
    if (query in cache) return cache[query];
    cache[query] = await getPlayer(query);
    return cache[query];
  };

  // Warm the empty-search cache so the first keystroke is instant.
  useEffect(() => {
    playerCache("");
  }, []);

  const handleAddPlayer = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    teamNum: number
  ) => {
    const target = e.target as HTMLElement;
    const match = await playerCache(target.innerText);
    const picked = match[0];
    const matchObj: RosterPlayer = {
      id: picked.id,
      name: picked.name,
      teamName: picked.team.abbreviation,
      value: picked.value,
    };
    if (teamNum === 1) {
      if (
        !player1 ||
        team1.team.some(({ name }) => name === target.innerText)
      ) {
        setPlayer1("");
        setSuggestions([]);
        return;
      }
      setTeam1({
        totalValue: team1.totalValue + matchObj.value,
        team: [...team1.team, matchObj],
      });
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
      setTeam2({
        totalValue: team2.totalValue + matchObj.value,
        team: [...team2.team, matchObj],
      });
      setPlayer2("");
    }
    setSuggestions([]);
  };

  const handleRemovePlayer = (playerName: string, teamNum: number) => {
    if (teamNum === 1) {
      let playerIdx = 0;
      for (let i = 0; i < team1.team.length; i++) {
        if (team1.team[i].name === playerName) {
          playerIdx = i;
          break;
        }
      }
      const newTeam = [
        ...team1.team.slice(0, playerIdx),
        ...team1.team.slice(playerIdx + 1),
      ];
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
      setTeam2({
        totalValue: team2.totalValue - team2.team[playerIdx].value,
        team: newTeam,
      });
    }
  };

  const onChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    teamNum: number
  ) => {
    let matches;
    if (teamNum === 1) {
      setPlayer1(e.target.value);
      matches = await playerCache(player1);
    } else {
      setPlayer2(e.target.value);
      matches = await playerCache(player2);
    }
    const justNames = matches
      .map(({ name }) => name)
      .filter(
        (name) =>
          !team1.team.some((player) => player.name === name) &&
          !team2.team.some((player) => player.name === name)
      );
    setSuggestions(justNames.length > 0 ? justNames : ["No Player Found"]);
  };

  const handleAnalyze = () => {
    if (!analyzed) {
      setAnalyzed(true);
    } else {
      setAnalyzed(false);
      setTeam1({ totalValue: 0, team: [] });
      setTeam2({ totalValue: 0, team: [] });
    }
  };

  return (
    <Layout>
      <section id="home-page" className="min-h-screen">
        <header className="basis-1/5 py-8 max-w-(--breakpoint-lg) px-2">
          <h1 className="font-bold md:text-2xl text-lg mb-2">
            Fantasy Football Trade Analyzer
          </h1>
          <p className="md:text-lg">
            Welcome to Trade Titans, your premier destination for mastering the
            art of strategic player exchanges in the dynamic realm of fantasy
            football. Whether you &apos;re a seasoned fantasy football veteran
            or a newcomer to the game, our user-friendly interface empowers you
            to optimize your roster and dominate your league.
          </p>
        </header>
        {analyzed && (
          <section className="flex justify-center w-64 bg-red text-light-secondary rounded-sm px-2 py-4 max-w-(--breakpoint-lg) mx-auto">
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
        <div className="basis-1/5 py-8 w-full flex flex-col items-center gap-4 max-w-(--breakpoint-lg)">
          {analyzed && (
            <button
              className="px-2 py-4 bg-linear-to-r from-cyan to-dark-secondary rounded-sm w-64 text-white"
              onClick={() => setAnalyzed(false)}
            >
              Edit Current Trade
            </button>
          )}
          <button
            disabled={team1.team.length === 0 || team2.team.length === 0}
            className="px-2 py-4 bg-dark-secondary rounded-sm w-64"
            onClick={() => handleAnalyze()}
          >
            {analyzed ? "Start New Trade" : "Analyze Trade"}
          </button>
        </div>
        <section className="basis-1/5 py-8 max-w-(--breakpoint-lg) px-2">
          <h1 className="font-bold md:text-xl text-lg mb-2">
            How To Use The Trade Analyzer
          </h1>
          <p className="md:text-lg text-black/75">
            Start by typing the names of the players involved on both sides of
            the trade. When all players have been selected, click the
            &apos;Analyze Trade&apos; button. The total value from each side of
            the trade will be displayed and the analyzer will suggest whether or
            not to make the trade. Remember, these are just suggestions based
            off of the players you have selected and does not take into account
            the rest of the players on either team.
          </p>
        </section>
      </section>
    </Layout>
  );
}
