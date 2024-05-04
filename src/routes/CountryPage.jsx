import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './CountryPage.css';
import arrowLeftWhite from '../assets/arrow-left.svg';
import arrowLeftDark from '../assets/arrow-left-dark.svg';
import { useDarkMode } from '../../DarkModeContext';

const CountryPage = () => {
  const { state } = useLocation();
  const { country, countries } = state || {};
  const navigate = useNavigate();
  const { name } = useParams();  
  const [currentCountry, setCurrentCountry] = useState(country);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (countries) {
      const matchingCountry = countries.find((c) => c.name.common === name);
      setCurrentCountry(matchingCountry);
    }
  }, [countries, name]);

  const getArrowIconSource = () => {
    console.log('isDarkMode:', isDarkMode); 
    console.log('currentCountry:', currentCountry);

    return isDarkMode ? arrowLeftWhite : arrowLeftDark;
  };


  const handleGoBack = () => {
    navigate('/');
  };

  const getFirstNativeNameCommon = () => {
        const { nativeName } = currentCountry?.name || {};
        const firstNativeName = Object.values(nativeName || {})[0];
        return firstNativeName?.common || 'Unknown Native Name';
  };

  const getFirstLanguageName = () => {
        const languageEntries = Object.entries(currentCountry?.languages || {});
        return languageEntries.length > 0 ? languageEntries[0][1] || 'Unknown Language' : 'Unknown Language';
  };

  const findCountryByCca3 = (cca3Code) => {
    if (!countries || !Array.isArray(countries)) {
      return null;
    }
  
    const matchingCountry = countries.find((c) => c.cca3 === cca3Code);
    return matchingCountry || null;
  };

  const handleBorderCountryClick = (cca3Code) => {
    const matchingCountry = findCountryByCca3(cca3Code);
    if (matchingCountry) {
      // Navigate to the new country page with state
      navigate(`/${matchingCountry.name.common}`, { state: { country: matchingCountry, countries } });
    }
  };

  if (!currentCountry) {
    return <div>Country not found.</div>;
  }

  console.log(currentCountry)

  return (
    <div className="main-container">

      <div className='back-container' onClick={handleGoBack}>
        <img src={getArrowIconSource()} alt="arrow" id='arrow' />
        <p className='back-button'>BACK</p>
      </div>
      <div className="card-container">
        <img id='flag-img' src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
        <div className="text-container">
          <h2>{currentCountry.name.common}</h2>
          <div className="text-info-container">
            <div>
              <div className='text-info'><p>Population: </p> {currentCountry.population}</div>
              <div className='text-info'><p>Region: </p> {currentCountry.region}</div>
              <div className='text-info'><p>Capital: </p> {currentCountry.capital}</div>
              <div className='text-info'><p>Native name: </p> {getFirstNativeNameCommon()}</div>
            </div>
            <div>
              <div className='text-info'><p>Top Level Domain: </p> {currentCountry.tld}</div>
              <div className='text-info'><p>Currencies: </p> {Object.keys(currentCountry.currencies || {}).map((currencyCode) => (
                  <span key={currencyCode}>{currentCountry.currencies[currencyCode]?.name || 'Unknown Currency'}</span>
                ))}</div>
              <div className='text-info'><p>Language: </p> {getFirstLanguageName()}</div>                        
            </div>
          </div>
          <div className="border-countries">
            <p>Border Countries:</p>
            <ul>
              {currentCountry.borders && currentCountry.borders.length > 0 ? (
                currentCountry.borders.map((border) => (
                  <li key={border}>
                    <button className='border' onClick={() => handleBorderCountryClick(border)}>
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

export default CountryPage;