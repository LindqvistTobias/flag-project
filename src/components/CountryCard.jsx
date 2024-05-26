import React from 'react';
import './CountryCard.css';
import { useNavigate } from 'react-router-dom';


const CountryCard = ({ countries, allCountries }) => {
  const navigate = useNavigate();

  const handleClick = (country) => {
    navigate(`/${country.name.common}`, { state: { country, countries: allCountries } });
  };  

  return (
    <div className='country-cards-container'>                       
      {countries.map((country) => (
        <div className='country-container' key={country.name.common} onClick={() => handleClick(country)}>
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />          
          <div className='country-text-container'>
            <h3>{country.name.common}</h3>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryCard;