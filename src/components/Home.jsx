import React, { useEffect, useState, useMemo  } from "react";
import debounce from "lodash.debounce";
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
      });
  };

  useEffect(() => {
    const debounced = debounce(() => getRecipes(search), 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  }
  , [search]);
 let num = 0;
  return (
    <>
      <div className="flex justify-center mt-16 mb-10 lg:w-5/6 py-6 px-7 border rounded-full bg-zinc-600 md:mx-auto lg:ml-52">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getRecipes(search);
            }
          }}
          className="flex-1 border-none font-extrabold text-3xl pr-4 outline-none text-white bg-zinc-600 sm:text-4xl sm:mx-4"
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
      {recipes ? (
        <div className="container w-screen lg:ml-80">
          <div className=" mt-10  flex justify-center align-middle flex-wrap">
            {recipes.map((recipe) => (
              <Recipes key={num++} recipes={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center align-middle">
          <h1 className="text-center mb-4 text-6xl text-white font-extrabold w-full hover:text-slate-300 hover:underline">
            No recipes found
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
