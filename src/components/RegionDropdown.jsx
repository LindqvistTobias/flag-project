import './RegionDropdown.css'
import React from 'react';

const RegionDropdown = ({ onRegionChange }) => {
  const handleSelectChange = (event) => {
    const selectedRegion = event.target.value;
    onRegionChange(selectedRegion);
  };

  return (    
    <div className="dropdown-container">
      <select onChange={handleSelectChange}>
      <option value="all">All</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
    </div>
  );
};

export default RegionDropdown;