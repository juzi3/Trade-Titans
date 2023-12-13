interface SuggestionsProps {
  player: string;
  suggestions: string[];
  setSuggestions: ([]) => void;
  setPlayer: (player: string) => void;
  handleAddPlayer: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    playerNum: number
  ) => void;
  playerNum: number;
}

const Suggestions = ({
  player,
  suggestions,
  setSuggestions,
  setPlayer,
  handleAddPlayer,
  playerNum,
}: SuggestionsProps) => {
  return (
    <ul className="bg-white shadow-lg rounded max-h-52 overflow-auto absolute top-14 w-full z-50">
      {player &&
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
                      setPlayer("");
                    }
                  : (e) => handleAddPlayer(e, playerNum)
              }
            >
              {s}
            </li>
          );
        })}
    </ul>
  );
};

export default Suggestions;
