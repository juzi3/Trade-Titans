import Suggestions from "./Suggestions";

interface TeamState {
  totalValue: number;
  team: { name: string; teamName: string; value: number }[];
}

interface TeamProps {
  analyzed: boolean;
  player: string;
  suggestions: string[];
  setSuggestions: ([]) => void;
  setPlayer: (player: string) => void;
  handleAddPlayer: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    playerNum: number
  ) => void;
  handleRemovePlayer: (playerName: string, teamNum: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, teamNum: number) => void;
  teamNum: number;
  team: TeamState;
}

const Team = ({
  analyzed,
  player,
  suggestions,
  setSuggestions,
  setPlayer,
  handleAddPlayer,
  handleRemovePlayer,
  onChange,
  teamNum,
  team,
}: TeamProps) => {
  return (
    <section className="flex flex-col shrink-0 grow sm:grow-0 justify-start gap-4 p-4 sm:basis-1/2 z-40">
      <section className="flex gap-2 py-4 basis-1/3 max-h-[88px]">
        <div
          id={teamNum === 1 ? "team1-input" : "team2-input"}
          className="flex gap-2 flex-col  w-full"
        >
          <label htmlFor={teamNum === 1 ? "team1" : "team2"}>
            {teamNum === 1 ? "Team 1" : "Team 2"}
          </label>
          <div className="gap-1 flex-col flex relative">
            {!analyzed ? (
              <input
                className="rounded px-2 py-4 w-full"
                name={teamNum === 1 ? "team1" : "team2"}
                type="text"
                value={player}
                placeholder="Player Name"
                onBlur={() => {
                  setSuggestions([]);
                  setPlayer("");
                }}
                onChange={(e) => onChange(e, teamNum)}
              />
            ) : (
              <h2 className="px-4 py-2 bg-red-500 rounded">
                Total Trade Value: {team.totalValue}
              </h2>
            )}
            <Suggestions
              player={player}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              setPlayer={setPlayer}
              handleAddPlayer={handleAddPlayer}
              playerNum={teamNum}
            />
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
          {team.team.map(({ name, teamName, value }) => {
            return (
              <div
                key={`${teamNum === 1 ? 1 : 2}${name}`}
                className="px-2 py-4 border-solid border-black border-2 rounded flex justify-between"
              >
                <span className="basis-3/6">{name}</span>
                <span className="basis-1/6">{teamName}</span>
                <span className="basis-1/6">{value}</span>
                {!analyzed && (
                  <button
                    onClick={() => handleRemovePlayer(name, teamNum)}
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
  );
};

export default Team;
