import React from "react";
import DOMPurify from "dompurify"; // For sanitizing HTML
import "./RecipeDetails.css";

const RecipeDetails = ({ recipe, onBack }) => {
  return (
    <div className="recipe-details">
      <button onClick={onBack} className="back-button">
        ← Back
      </button>
      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <h1 className="recipe-title">{recipe.title}</h1>
      </div>
      <div className="recipe-meta">
        <p>
          <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>
      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h2>Instructions</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(recipe.instructions || "No instructions provided."),
          }}
        ></div>
      </div>
    </div>
  );
};

export default RecipeDetails;
