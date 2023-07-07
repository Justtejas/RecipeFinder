import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Recipes = ({ recipes }) => {
  const Navigate = useNavigate();

  const handleClick = useCallback(
    (id) => () => {
      Navigate(`/recipes/${id}`);
    },
    [Navigate]
  );
  return (
    <>
      {!recipes ? (
        <div className="flex flex-wrap justify-center align-middle">
          <h1 className="text-center mb-4 text-6xl text-white font-extrabold w-full hover:text-slate-300 hover:underline">
            No recipes found
          </h1>
        </div>
      ) : (
        <div
          className=" recipes m-2 relative rounded-md overflow-hidden border-none shadow-gray-400 hover:shadow-slate-200 hover:scale-95 transition-all duration-150"
          onClick={handleClick(recipes.idMeal)}
        >
          <div className=" w-96">
            <img
              src={
                recipes.strMealThumb !== " "
                  ? recipes.strMealThumb
                  : "https://via.placeholder.com/400"
              }
              alt={recipes.strMeal}
              className="w-full h-full"
            />
          </div>
          <div className=" z-2 bg-slate-500 px-6 pt-4 pb-6 absolute bottom-0 right-0 left-0">
            <span className=" uppercase text-lg tracking-wider font-medium text-white">
              {recipes.strCategory}
            </span>
            <h3 className=" mt-1 text-white">{recipes.id}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipes;
