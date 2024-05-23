import "./RegionDropdown.css";
import React, { useState, useEffect, useRef } from "react";

const RegionDropdown = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState("Region");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hasSelected, setHasSelected] = useState(false);

  const handleItemClick = (event) => {
    const selectedRegion = event.target.getAttribute("data-value");
    setSelectedRegion(selectedRegion);
    onRegionChange(selectedRegion);
    setIsOpen(false);
    setHasSelected(true);
  };

  const handleSelectClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (!isOpen) {
      setHasSelected(false); // Reset hasSelected when opening dropdown
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      if (!hasSelected) {
        setSelectedRegion("Region");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasSelected]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className={`dropdown-select ${hasSelected && selectedRegion !== "Region" ? "selected" : ""}`} onClick={handleSelectClick}>
        {isOpen || selectedRegion === "Region" ? (
          <span className="dropdown-selected">{selectedRegion}</span>
        ) : (
          <span className="dropdown-selected">Region</span>
        )}
        <div className={`caret ${isOpen ? "caret-rotate" : ""}`}></div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
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
      )}
    </div>
  );
};

export default RegionDropdown;
