import './RegionDropdown.css'
import React from 'react';

const RegionDropdown = ({ onRegionChange }) => {
  const handleSelectChange = (event) => {
    const selectedRegion = event.target.value;
    onRegionChange(selectedRegion);
  };

  return (    
    <div className="dropdown-container">
       <div className='dropdown-name'>Region</div>     
      <div className="dropdown-menu">
        <select onChange={handleSelectChange}>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        </select>
      </div>          
    </div>
  );
};

export default RegionDropdown;