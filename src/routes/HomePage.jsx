import React, { useState, useEffect } from 'react';
import './HomePage.css';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionDropdown from '../components/RegionDropdown';
import { getAllCountriesByRegion, searchCountriesByName } from '../components/Api';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountriesByRegion(selectedRegion);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  useEffect(() => {
    const filteredCountries = searchCountriesByName(countries, searchQuery).filter(country => {
      return selectedRegion === 'All' || country.region === selectedRegion;
    });
    setFilteredCountries(filteredCountries);
  }, [searchQuery, selectedRegion, countries]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };
  
  return (
    <div className='body-container'>
      <div className='searchbar-dropdown-container'>
        <SearchBar onSearch={handleSearch} />
        <RegionDropdown onRegionChange={handleRegionChange} />
      </div>
      <div className="country-grid">
        <CountryCard countries={filteredCountries} allCountries={countries} />
      </div>
    </div>
  );
};


export default HomePage;
