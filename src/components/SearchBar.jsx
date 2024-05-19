import "./SearchBar.css";
import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        required="required"
        onChange={handleInputChange}
      />
      <span>Search for a country</span>
    </div>
  );
};

export default SearchBar;
