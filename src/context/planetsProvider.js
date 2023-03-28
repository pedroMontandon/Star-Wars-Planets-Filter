import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import planetsProvider from './planetsContext';

function Provider({ children }) {
  const { fetchData } = useFetch();
  const [planetsState, setPlanetsState] = useState('');

  useEffect(() => {
    const planets = fetchData('https://swapi.dev/api/planets');
    setPlanetsState(planets);
  }, []);

  return (
    <planetsProvider.Provider value={ { planetsState, setPlanetsState } }>
      { children }
    </planetsProvider.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
