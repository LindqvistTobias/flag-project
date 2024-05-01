const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountriesByRegion = (region) => {
  const url = region === 'all' ? `${BASE_URL}/all` : `${BASE_URL}/region/${region}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching countries by region', error);
      return [];
    });
};

export const searchCountriesByName = (countries, searchTerm) => {
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
};