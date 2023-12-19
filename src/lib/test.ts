export const fetchPlayers = async () => {
  const res = await fetch("/api/getPlayers");
  // console.log("fetchP", res);
  return res.json();
};

export const createData = async () => {
  console.log("createData");
  let res;
  for (let i = 2107; i < 2407; i++) {
    res = await fetch("/api/addPlayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: i,
      }),
    });
    if (i === 2406) console.log(i);
  }

  // const data = await res.json();
  return res.json();
};
