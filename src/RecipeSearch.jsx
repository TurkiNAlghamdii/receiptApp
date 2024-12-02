import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";
import FilterAndSort from "./FilterAndSort";

const RecipeSearch = ({ darkMode, toggleDarkMode }) => {
  const [query, setQuery] = useState(""); // Current search query
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(""); 

  // Memoize fetchRecipes to prevent unnecessary re-renders
  const fetchRecipes = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setRecipes([]);
      return;
    }

    const API_KEY = "8c8e0cada25344f4b98cbce780007955"; 
    let URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=30`;

    if (cuisine) URL += `&cuisine=${cuisine}`;
    if (diet) URL += `&diet=${diet}`;
    if (maxTime) URL += `&maxReadyTime=${maxTime}`;
    URL += `&sort=${sortBy}`;

    try {
      const response = await axios.get(URL);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [cuisine, diet, maxTime, sortBy]);

  useEffect(() => {
    fetchRecipes(debouncedQuery); // Fetch recipes when debounced query changes
  }, [debouncedQuery, fetchRecipes]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "cuisine") setCuisine(value);
    if (name === "diet") setDiet(value);
    if (name === "maxTime") setMaxTime(value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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

  // Debounce the search query (update `debouncedQuery` after typing)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query); // Set the debounced query after delay
    }, 500);

    return () => clearTimeout(timerId); // Clean up the timeout
  }, [query]);

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

          {/* Filter and Sort Component */}
          <FilterAndSort
            cuisine={cuisine}
            diet={diet}
            maxTime={maxTime}
            sortBy={sortBy}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          <div className="recipe-grid">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => handleCardClick(recipe.id)}
                >
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
              ))
            ) : (
              debouncedQuery && (
                <p className="noRecipesFound">
                  No recipes found. Try searching for something else.
                </p>
              )
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
