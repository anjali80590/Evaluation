import React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import ProductDetails from "./pages/ProductDetails";
function App() {
  let [theme, setTheme] = useState("white");
  function toggleTheme() {
    setTheme(theme === "white" ? "black" : "white");
  }
  return (
    <div
      className="max-h-full"
      style={{
        backgroundColor: theme,
        color: theme == "black" ? "white" : "black",
      }}
    >
      <BrowserRouter>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
