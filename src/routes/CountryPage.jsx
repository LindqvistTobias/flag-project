import React from 'react';
import { useParams } from 'react-router-dom';

const CountryPage = () => {
  const { name } = useParams();

  return (
    <div>
      {/* <h1>Country Page: {name}</h1> */}
      <h2>Countrypage</h2>
    </div>
  );
};

export default CountryPage;