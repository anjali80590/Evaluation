import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "pink",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Navbar;
