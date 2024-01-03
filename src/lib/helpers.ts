// fetches players from db using the search term gathered from frontend
export const fetchPlayers = async (search: string) => {
  const res = await fetch(`/api/getPlayers?search=${search}`);
  const data = await res.json();
  console.log("fetchP", data);
  return data;
};

// adds active players from all teams to db, if not in db already
export const createData = async () => {
  console.log("createData fired!");
  // let res;

  // for (let i = 1; i < 33; i++) {
  // const data = await res.json();
  //   res = await fetch("/api/addPlayer", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: i,
  //     }),
  //   });
  //   if (i === 32) console.log(i);
  // }
  // const res = await fetch("/api/addPlayer", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     id: 2,
  //   }),
  // });

  // const data = await res.json();
  // return data;
  return;
};
