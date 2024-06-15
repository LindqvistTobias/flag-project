const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountriesByRegion = async (region) => {
  const url = region === 'All' ? `${BASE_URL}/all` : `${BASE_URL}/region/${region}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    
    const sortedData = data.sort((a, b) => {
      const nameA = a.name.common || ""; 
      const nameB = b.name.common || ""; 
      return nameA.localeCompare(nameB);
    });

    return sortedData;
  } catch (error) {
    console.error('Error fetching countries by region', error);
    return [];
  }
};

export const searchCountriesByName = (countries, searchTerm) => {
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
};