import React, { useState, useEffect } from "react";
import RecipeSearch from "./RecipeSearch"; // Import RecipeSearch component
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

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
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div>
      <div className="header">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☼" : "☾"}
        </button>
        <h1 className="mainH">Recipe Search App</h1>
      </div>
      <RecipeSearch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default App;
