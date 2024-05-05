import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CountryPage.css';
import arrowLeftWhite from '../assets/arrow-left.svg';
import arrowLeftDark from '../assets/arrow-left-dark.svg';
import { useDarkMode } from '../../DarkModeContext';

const CountryPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { isDarkMode } = useDarkMode();

  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        const countryData = response.data[0]; // Assuming the first item is the matched country
        setCurrentCountry(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setCurrentCountry(null); // Handle error by setting currentCountry to null
      }
    };

    fetchCountryData();
  }, [name]);

  const getArrowIconSource = () => {
    return isDarkMode ? arrowLeftWhite : arrowLeftDark;
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const renderCountryInfo = () => {
    if (!currentCountry) {
      return <div>Country not found.</div>;
    }

    return (
      <div className="main-container">
        <div className="back-container" onClick={handleGoBack}>
          <img src={getArrowIconSource()} alt="arrow" id="arrow" />
          <p className="back-button">BACK</p>
        </div>
        <div className="card-container">
          <img id="flag-img" src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
          <div className="text-container">
            <h2>{currentCountry.name.common}</h2>
            <div className="text-info-container">
              <div className="text-info">
                <p>Population: {currentCountry.population}</p>
              </div>
              <div className="text-info">
                <p>Region: {currentCountry.region}</p>
              </div>
              <div className="text-info">
                <p>Capital: {currentCountry.capital}</p>
              </div>
              <div className="text-info">
                <p>Native name: {currentCountry.nativeName?.common || 'Unknown Native Name'}</p>
              </div>
              <div className="text-info">
                <p>Top Level Domain: {currentCountry.tld}</p>
              </div>
              <div className="text-info">
                <p>Currencies: {Object.values(currentCountry.currencies || {}).map(currency => currency.name).join(', ') || 'Unknown Currency'}</p>
              </div>
              <div className="text-info">
                <p>Languages: {Object.values(currentCountry.languages || {}).map(language => language.name).join(', ') || 'Unknown Language'}</p>
              </div>
            </div>
            <div className="border-countries">
              <p>Border Countries:</p>
              <ul>
                {currentCountry.borders && currentCountry.borders.length > 0 ? (
                  currentCountry.borders.map((border) => (
                    <li key={border}>
                      <button className="border" onClick={() => handleBorderCountryClick(border)}>
                        {border || 'Unknown Country'}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No neighbors</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderCountryInfo();
};

export default CountryPage;