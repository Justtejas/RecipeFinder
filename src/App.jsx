import "./App.css";
import React from "react";
import Home from "./components/Home";
import Recipe from "./components/recipe";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-center mt-8 mb-20 md:text-7xl text-5xl text-white font-sans font-extrabold hover:text-gray-300 hover:underline">
        <a href="/">Recipe Finder</a>
      </h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipes/:id" element={<Recipe />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
