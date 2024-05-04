import './SearchBar.css'
import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="searchbar-container">
        <input
      type="text"
      placeholder="Search countries..."
      onChange={handleInputChange}
    />
    </div>

    
  );
};

export default SearchBar;