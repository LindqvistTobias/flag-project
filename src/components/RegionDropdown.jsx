import "./RegionDropdown.css";
import React, { useState, useEffect, useRef } from "react";

// const RegionDropdown = ({ onRegionChange }) => {
//   const handleSelectChange = (event) => {
//     const selectedRegion = event.target.value;
//     onRegionChange(selectedRegion);
//   };

const RegionDropdown = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState("Region");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleItemClick = (event) => {
    const selectedRegion = event.target.getAttribute("data-value");
    setSelectedRegion(selectedRegion);
    onRegionChange(selectedRegion);
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef} onClick={handleSelectClick}>
      <div className="dropdown-select" >
        <span className="dropdown-selected">{selectedRegion}</span>
        <div className={`caret ${isOpen ? "caret-rotate" : ""}`}></div>
      </div>
      <ul className={`dropdown-menu ${isOpen ? "dropdown-menu-open" : ""}`}>
        {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(region => (
          <li
            key={region}
            data-value={region}
            onClick={handleItemClick}
            className={selectedRegion === region ? "active" : ""}
          >
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionDropdown;

//   return (
//     <div className="dropdown-menu">

//       <select onChange={handleSelectChange}>
//         <option value="" hidden disabled></option>
//         <option value="all">All</option>
//         <option value="Africa">Africa</option>
//         <option value="Americas">Americas</option>
//         <option value="Asia">Asia</option>
//         <option value="Europe">Europe</option>
//         <option value="Oceania">Oceania</option>
//       </select>
//       <span>Region</span>
//     </div>
//   );
// };

