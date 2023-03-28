import { useState } from 'react';

function useFetch() {
  const [data, setData] = useState('');

  const fetchData = async (url) => {
    const { results } = await (await fetch(url)).json();
    results.forEach((planet) => {
      delete planet.residents;
    });
    setData(results);
  };

  return { data, fetchData };
}

export default useFetch;
