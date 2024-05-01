import './CountryCard.css'
import React from 'react';


const CountryCard = ({ countries }) => {
    console.log(countries)
    return (
        <div className='country-cards-container'>                       
            {countries.map((country) => (
                <div className='country-container' key={country.name.common}>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                    <h3>{country.name.common}</h3>
                    <div className='country-text-container'>
                        <p>Population: {country.population}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital}</p>
                    </div>
                </div>
            ))}
        </div>
    );
  };
  
export default CountryCard