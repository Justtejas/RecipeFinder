import "tailwindcss/tailwind.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import Recipes from "./components/Recipes";
const APP_URL = import.meta.env.VITE_APP_URL;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const getRecipes = async (search) => {
    const response = await fetch(`${APP_URL}/search.php?s=${search}`);
    const data = await response.json();
    setRecipes(data.meals);
  };
  useEffect(() => {
    getRecipes(search);
  }, []);
  return (
    <>
      <h1 className="text-center my-20 text-7xl text-white font-sans font-extrabold w-full">
        Recipe Finder
      </h1>
      <div className="flex justify-center sm:mx-96 mt-16  mb-24 py-6 px-7 border rounded-full bg-zinc-600 ">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getRecipes(search);
            }
          }}
          className="flex-1 border-none font-extrabold text-3xl pr-4 outline-none text-white bg-zinc-600 "
        />
        <button
          type="submit"
          onClick={() => {
            getRecipes(search);
          }}
          className="py-2 px-5 rounded-lg ml-4 text-gray-900 font-bold tracking-wider text-xl"
        >
          Search
        </button>
      </div>
      {recipes?.length > 0 ? (
        <div className="container w-screen mt-10 flex justify-center align-middle flex-wrap">
          {recipes.map((recipe) => (
            <Recipes recipes={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center sm:mx-96 mt-16 mb-8 py-6 px-7 rounded-md bg-zinc-600">
          <h1 className="text-2xl font-bold text-white">
            Sorry! No recipes found
          </h1>
        </div>
      )}
    </>
  );
}

export default App;
