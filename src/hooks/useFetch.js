import { useState } from 'react';

function useFetch() {
  const [data, setData] = useState('');

  const fetchData = async (url) => {
    const { results } = await (await fetch(url)).json();
    results.forEach((planet) => {
      delete planet.residents;
      delete planet.films;
      delete planet.created;
      delete planet.edited;
      delete planet.url;
    });
    setData(results);
  };
  return { data, fetchData, setData };
}

export default useFetch;
