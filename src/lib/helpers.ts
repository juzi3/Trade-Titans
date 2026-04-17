export interface PlayerSearchResult {
  id: string;
  name: string;
  position: string;
  value: number;
  team: { abbreviation: string };
}

export const fetchPlayers = async (
  search: string
): Promise<{ players: PlayerSearchResult[] }> => {
  const res = await fetch(
    `/api/getPlayers?search=${encodeURIComponent(search)}`
  );
  return res.json();
};
