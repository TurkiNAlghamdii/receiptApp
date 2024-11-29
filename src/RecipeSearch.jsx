import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails"; // Import RecipeDetails component

const RecipeSearch = ({ darkMode, toggleDarkMode }) => {
  const [query, setQuery] = useState(""); // Current search query
  const [recipes, setRecipes] = useState([]); // Recipe results
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Selected recipe for details view

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Function to fetch recipes based on the query
  const fetchRecipes = async (searchQuery) => {
    if (!searchQuery) {
      setRecipes([]); // Clear recipes if query is empty
      return; // Stop further processing if no query
    }

    const API_KEY = "8c8e0cada25344f4b98cbce780007955"; // API key
    const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=30`;

    try {
      const response = await axios.get(URL);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Handle the search query change and set debounced value
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query); // Set the debounced query after delay
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(timerId); // Clean up the timeout on every change
  }, [query]);

  // Fetch recipes when the debounced query changes
  useEffect(() => {
    fetchRecipes(debouncedQuery);
  }, [debouncedQuery]);

  // Handle input change for the search
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to fetch recipe details
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

  // Handle recipe card click
  const handleCardClick = (id) => {
    fetchRecipeDetails(id);
  };

  // Handle back to search results
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
              debouncedQuery && <p className="noRecipesFound">No recipes found. Try searching for something else.</p>
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
