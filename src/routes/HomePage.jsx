import React, { useState, useEffect } from 'react';
import './HomePage.css'
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionDropdown from '../components/RegionDropdown';
import { getAllCountriesByRegion, searchCountriesByName } from '../components/Api';


const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch all countries initially
    getAllCountriesByRegion('all')
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching countries', error));
  }, []);

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredCountries(countries); // Reset to all countries if search is empty
    } else {
      const filtered = searchCountriesByName(countries, searchQuery);
      setFilteredCountries(filtered);
    }
  };

  const handleRegionChange = (selectedRegion) => {
    getAllCountriesByRegion(selectedRegion)
      .then(data => {
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching countries by region', error));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <RegionDropdown onRegionChange={handleRegionChange} />
      <div className="country-grid">
        <CountryCard countries={filteredCountries} />
      </div>
    </div>
  );

}

export default HomePage;