import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      fetch(`${APP_URL}/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.meals[0]));
    };
    getRecipe();
  }, [id]);

  return (
    <>
      <div className="flex flex-wrap justify-center align-middle">
        <h1 className="text-center mb-4 text-6xl text-white font-extrabold w-full hover:text-slate-300 hover:underline">
          {recipe.strMeal}
        </h1>
      </div>
      <div className="mt-4 flex flex-wrap flex-row md:gap-96">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ width: "300px", height: "300px" }}
          className=" rounded-xl md:ml-96 shadow-lg md:mt-6 ml-20"
        />
        <div className="md:mx-24  ml-20 mt-8">
          <h2 className="md:text-5xl text-2xl text-white font-bold md:my-4">
            Ingredients
          </h2>
          <ul className="text-white font-medium text-2xl list-disc ml-9">
            {Object.keys(recipe).map((key) => {
              if (key.includes("Ingredient") && recipe[key]) {
                return (
                  <li key={key} className="my-7">
                    {recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-center align-middle md:mb-14 md:pb-14">
        <h2 className="md:text-5xl text-2xl text-white font-bold my-4">
          Instructions
        </h2>
        <p className="text-white font-medium text-2xl md:ml-96 ml-20 md:mr-64 mr-28 break-words whitespace-pre-line">
          {recipe.strInstructions}
        </p>
      </div>
    </>
  );
};

export default Recipe;
