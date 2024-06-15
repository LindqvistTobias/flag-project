import React, { useState, useEffect } from "react";
import "./HomePage.css";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionDropdown from "../components/RegionDropdown";
import {
  getAllCountriesByRegion,
  searchCountriesByName,
} from "../components/Api";
import FooterBar from "../components/FooterBar";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCountryCard from "../components/SkeletonCountryCard";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountriesByRegion(selectedRegion);
        setCountries(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching countries", error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filteredCountries = searchCountriesByName(
      countries,
      searchQuery
    ).filter((country) => {
      return selectedRegion === "All" || country.region === selectedRegion;
    });
    setFilteredCountries(filteredCountries);
  }, [searchQuery, selectedRegion, countries]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const toggleLoadingState = () => {
    setIsLoading((prevLoading) => !prevLoading);
  };

  return (
    <div>
      <div className="body-container">
        <div className="searchbar-dropdown-container">
          <SearchBar onSearch={handleSearch} />
          <RegionDropdown onRegionChange={handleRegionChange} />
        </div>
        {isLoading ? (
          <SkeletonCountryCard />
        ) : (
          <CountryCard countries={filteredCountries} allCountries={countries} />
        )}
      </div>
      <FooterBar
        isLoading={isLoading}
        toggleLoadingState={toggleLoadingState}
      />
    </div>
  );
};

export default HomePage;
