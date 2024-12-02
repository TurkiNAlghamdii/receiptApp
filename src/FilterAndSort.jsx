import React from "react";
import "./FilterAndSort.css";

const FilterAndSort = ({ cuisine, diet, maxTime, sortBy, onFilterChange, onSortChange }) => {
  return (
    <div className="filters">
      <select name="cuisine" value={cuisine} onChange={onFilterChange}>
        <option value="">Select Cuisine</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Asian">Asian</option>
        {/* Add more options */}
      </select>

      <select name="diet" value={diet} onChange={onFilterChange}>
        <option value="">Select Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten free">Gluten Free</option>
        {/* Add more options */}
      </select>

      <select name="maxTime" value={maxTime} onChange={onFilterChange}>
        <option value="">Max Time (in minutes)</option>
        <option value="30">30 min</option>
        <option value="60">60 min</option>
        <option value="120">120 min</option>
        {/* Add more options */}
      </select>

      <div className="sorting">
        <select value={sortBy} onChange={onSortChange}>
          <option value="popularity">Sort by Popularity</option>
          <option value="readyInMinutes">Sort by Preparation Time</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;
