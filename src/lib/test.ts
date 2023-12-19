export const fetchPlayers = async () => {
  const res = await fetch("/api/getPlayers");
  // console.log("fetchP", res);
  return res.json();
};

export const createData = async () => {
  console.log("createData fired!");
  let res;
  // for (let i = 3; i < 33; i++) {
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
  return res.json();
};
