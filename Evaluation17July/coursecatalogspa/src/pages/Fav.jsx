import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
function Fav({}) {
  let fav = useSelector((s) => s.fav);
  console.log(fav);
  return (
    <div className="grid grid-cols-5 p-10">
      {fav.length === 0 ? (
        <p>No Favourite</p>
      ) : (
        fav.map((c) => <Card key={c.id} c={c} />)
      )}
    </div>
  );
}

export default Fav;
