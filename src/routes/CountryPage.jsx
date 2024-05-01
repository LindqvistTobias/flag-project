import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './CountryPage.css';

const CountryPage = () => {
  const { state } = useLocation();
  const { country, countries } = state || {};
  const navigate = useNavigate();
  const { name } = useParams();

  const [currentCountry, setCurrentCountry] = useState(country);

  useEffect(() => {
    if (countries) {
      const matchingCountry = countries.find((c) => c.name.common === name);
      setCurrentCountry(matchingCountry);
    }
  }, [countries, name]);

  const handleGoBack = () => {
    navigate('/');
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

  return (
    <div className="main-container">
      <button onClick={handleGoBack}>Go Back</button>
      <div className="card-container">
        <img src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
        <div className="text-container">
          <h2>{currentCountry.name.common}</h2>
          <div className="text-info-container">
            <div>
              <p>Population: {currentCountry.population}</p>
              <p>Region: {currentCountry.region}</p>
              <p>Capital: {currentCountry.capital}</p>
              <p>Native name: {currentCountry.name.native?.common || 'Unknown Native Name'}</p>
            </div>
            <div>
              <p>Top Level Domain: {currentCountry.tld}</p>
              <p>
                Currencies: {Object.keys(currentCountry.currencies || {}).map((currencyCode) => (
                  <span key={currencyCode}>{currentCountry.currencies[currencyCode]?.name || 'Unknown Currency'}</span>
                ))}
              </p>
              <p>Language: {Object.values(currentCountry.languages || {})[0]?.name || 'Unknown Language'}</p>
            </div>
          </div>
          <div className="border-countries">
            <p>Border Countries:</p>
            <ul>
              {currentCountry.borders && currentCountry.borders.length > 0 ? (
                currentCountry.borders.map((border) => (
                  <li key={border}>
                    <button onClick={() => handleBorderCountryClick(border)}>
                      {findCountryByCca3(border)?.name.common || 'Unknown Country'}
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

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
// import './CountryPage.css';

// const CountryPage = () => {
//   const { state } = useLocation();
//   const { country, countries } = state || {};
//   const navigate = useNavigate();
//   const { name } = useParams();

//   const [currentCountry, setCurrentCountry] = useState(country);

//   useEffect(() => {
//     if (countries) {
//       const matchingCountry = countries.find((c) => c.name.common === name);
//       setCurrentCountry(matchingCountry);
//     }
//   }, [countries, name]);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const findCountryByCca3 = (cca3Code) => {
//     if (!countries || !Array.isArray(countries)) {
//       return null; // Return a default value or handle the case when countries is undefined or not an array
//     }
  
//     const matchingCountry = countries.find((c) => c.cca3 === cca3Code);
//     return matchingCountry || null; // Return null or handle the case when matchingCountry is not found
//   };

//   const handleBorderCountryClick = (cca3Code) => {
//     const matchingCountry = findCountryByCca3(cca3Code);
//     if (matchingCountry) {
//       // Update the state with the selected border country
//       setCurrentCountry(matchingCountry);

//       // Navigate to the new country page with state containing the updated country and countries list
//       navigate(`/${matchingCountry.name.common}`, { state: { country: matchingCountry, countries } });
//     }
//   };

//   if (!currentCountry) {
//     return <div>Country not found.</div>;
//   }

//   return (
//     <div className="main-container">
//       <button onClick={handleGoBack}>Go Back</button>
//       <div className="card-container">
//         <div className="text-container">
//           <h2>{currentCountry.name.common}</h2>
//           <div className="text-info-container">
//         <img src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
//             <div>
//               <p>Population: {currentCountry.population}</p>
//               <p>Region: {currentCountry.region}</p>
//               <p>Capital: {currentCountry.capital}</p>
//               <p>Native name: {currentCountry.name.native?.common || 'Unknown Native Name'}</p>
//             </div>
//             <div>
//               <p>Top Level Domain: {currentCountry.tld}</p>
//               <p>
//                 Currencies: {Object.keys(currentCountry.currencies || {}).map((currencyCode) => (
//                   <span key={currencyCode}>{currentCountry.currencies[currencyCode]?.name || 'Unknown Currency'}</span>
//                 ))}
//               </p>
//               <p>Language: {Object.values(currentCountry.languages || {})[0]?.name || 'Unknown Language'}</p>
//             </div>
//           </div>
//           <div className="border-countries">
//             <p>Border Countries:</p>
//             <ul>
//               {currentCountry.borders && currentCountry.borders.length > 0 ? (
//                 currentCountry.borders.map((border) => (
//                   <li key={border}>
//                     <Link
//                       to={`/${findCountryByCca3(border)?.name.common}`}
//                       onClick={() => handleBorderCountryClick(border)}
//                     >
//                       {findCountryByCca3(border)?.name.common || 'Unknown Country'}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li>No neighbors</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountryPage;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
// import './CountryPage.css';

// const CountryPage = () => {
//   const { state } = useLocation();
//   const { country, countries } = state || {};
//   const navigate = useNavigate();
//   const { name } = useParams();

//   const [currentCountry, setCurrentCountry] = useState(country);

//   useEffect(() => {
//     if (countries) {
//       const matchingCountry = countries.find((c) => c.name.common === name);
//       setCurrentCountry(matchingCountry);
//     }
//   }, [countries, name]);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const getCurrencyName = (currencyCode) => {
//     return currentCountry?.currencies[currencyCode]?.name || 'Unknown Currency';
//   };

//   const getFirstLanguageName = () => {
//     const languageEntries = Object.entries(currentCountry?.languages || {});
//     return languageEntries.length > 0 ? languageEntries[0][1] || 'Unknown Language' : 'Unknown Language';
//   };

//   const getFirstNativeNameCommon = () => {
//     const { nativeName } = currentCountry?.name || {};
//     const firstNativeName = Object.values(nativeName || {})[0];
//     return firstNativeName?.common || 'Unknown Native Name';
//   };

//   const findCountryNameByCca3 = (cca3Code) => {
//     if (countries) {
//       const matchingCountry = countries.find((c) => c.cca3 === cca3Code);
//       return matchingCountry ? matchingCountry.name.common : 'Unknown Country';
//     }
//     return 'Unknown Country';
//   };

//   const handleBorderCountryClick = (cca3Code) => {
//     const matchingCountry = countries.find((c) => c.cca3 === cca3Code);
//     if (matchingCountry) {
//       setCurrentCountry(matchingCountry);
//       navigate(`/${matchingCountry.name.common}`, { state: { country: matchingCountry, countries } });
//     }
//   };

//   if (!currentCountry) {
//     return <div>Country not found.</div>;
//   }

//   return (
//     <div className='main-container'>
//       <button onClick={handleGoBack}>Go Back</button>
//       <div className="card-container">
//         <img src={currentCountry.flags.png} alt={`Flag of ${currentCountry.name.common}`} />
//         <div className="text-container">
//           <h2>{currentCountry.name.common}</h2>
//           <div className="text-info-container">
//             <div>
//               <p>Population: {currentCountry.population}</p>
//               <p>Region: {currentCountry.region}</p>
//               <p>Capital: {currentCountry.capital}</p>
//               <p>Native name: {getFirstNativeNameCommon()}</p>
//             </div>
//             <div>
//               <p>Top Level Domain: {currentCountry.tld}</p>
//               <p>
//                 Currencies: {Object.keys(currentCountry.currencies || {}).map((currencyCode) => (
//                   <span key={currencyCode}>{getCurrencyName(currencyCode)}</span>
//                 ))}
//               </p>
//               <p>Language: {getFirstLanguageName()}</p>
//             </div>
//           </div>
//           <div className="border-countries">
//             <p>Border Countries:</p>
//             <ul>
//               {currentCountry.borders && currentCountry.borders.length > 0 ? (
//                 currentCountry.borders.map((border) => (
//                   <li key={border}>
//                     <Link
//                       to={`/${findCountryNameByCca3(border)}`}
//                       onClick={() => handleBorderCountryClick(border)}
//                     >
//                       {findCountryNameByCca3(border)}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li>No neighbors</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountryPage;