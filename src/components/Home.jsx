import React, { useEffect, useState } from "react";
import Recipes from "./Recipes";
const APP_URL = import.meta.env.VITE_APP_URL;
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const getRecipes = async (search) => {
    await fetch(`${APP_URL}/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
        console.log(data.meals);
      });
    console.log(recipes);
  };

  useEffect(() => {
    getRecipes(search);
  }, []);
  return (
    <>
      <div className="flex justify-center sm:mx-96 mt-16  mb-10 py-6 px-7 border rounded-full bg-zinc-600 ">
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
      <div className="container w-screen mt-10 flex justify-center align-middle flex-wrap">
        {recipes.map((recipe) => (
          <Recipes key={recipe.id} recipes={recipe} />
        ))}
      </div>
    </>
  );
};

export default Home;
