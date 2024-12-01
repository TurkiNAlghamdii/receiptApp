import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";

const RecipeSearch = ({ darkMode, toggleDarkMode }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const fetchRecipes = async (searchQuery) => {
    if (!searchQuery) {
      setRecipes([]);
      return;
    }

    const API_KEY = "8c8e0cada25344f4b98cbce780007955";
    const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=30`;

    try {
      const response = await axios.get(URL);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    fetchRecipes(debouncedQuery);
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchRecipeDetails = async (id) => {
    const API_KEY = "8c8e0cada25344f4b98cbce780007955";
    const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    try {
      const response = await axios.get(URL);
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleCardClick = (id) => {
    fetchRecipeDetails(id);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className={`recipe-search ${darkMode ? "dark-mode" : ""}`}>
      {!selectedRecipe ? (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={handleInputChange}
            />
          </div>

          <div className="recipe-grid">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => handleCardClick(recipe.id)}
                  >
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                ))
              : debouncedQuery && (
                  <p className="noRecipesFound">
                    No recipes found. Try searching for something else.
                  </p>
                )}
          </div>
        </>
      ) : (
        <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
      )}
    </div>
  );
};

export default RecipeSearch;
