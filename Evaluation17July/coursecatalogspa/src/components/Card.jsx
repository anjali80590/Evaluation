import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../redux/favSlice";
import { Link, useNavigate } from "react-router-dom";
function Card({ c }) {
  console.log(c);
  let navigate = useNavigate();
  let fav = useSelector((s) => s.fav);
  console.log("fav", fav);
  let dispatch = useDispatch();
  let isFav = fav.find((f) => f.id === c.id);
  return (
    <div>
      <img src={c.thumbnail} alt={c.title} />
      <div style={{cursor:"pointer"}} onClick={() => navigate(`/products/${c.id}`)}>{c.title}</div>
      <button
        className={isFav ? "text-blue-600" : "text-red-500"}
        onClick={() =>
          isFav ? dispatch(removeFav(c.id)) : dispatch(addFav(c))
        }
      >
        {isFav ? "Remove" : "Add to Favourite "}
      </button>
    </div>
  );
}

export default React.memo(Card);
