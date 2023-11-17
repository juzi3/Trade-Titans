export const fetchPlayers = async () => {
  const res = await fetch("/api/getPlayers");
  console.log("fetchP", res);
  return res.json();
};

export const createData = async () => {
  console.log("createData");
  const res = await fetch("/api/addPlayer", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  // const data = await res.json();
  return res.json();
};
