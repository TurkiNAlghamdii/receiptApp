import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails"; // Import RecipeDetails component

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // New state for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Persist dark mode preference
      return newMode;
    });
  };

  // Apply dark mode class to body when darkMode state changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const fetchRecipes = async () => {
    const API_KEY = "8c8e0cada25344f4b98cbce780007955";
    const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`;
    try {
      const response = await axios.get(URL);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
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
    <div className="recipe-search">
      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☼" : "☾"}
      </button>

      {!selectedRecipe ? (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchRecipes}>Search</button>
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleCardClick(recipe.id)}
              >
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
      )}
    </div>
  );
};

export default RecipeSearch;