/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import planetsProvider from './planetsContext';

function Provider({ children }) {
  const { fetchData, data, setData } = useFetch();
  const [nameInput, setNameInput] = useState('');
  const [typesInput, setTypesInput] = useState('');
  const [sortedData, setSortedData] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets');
  }, []);

  return (
    <planetsProvider.Provider
      value={ { data,
        setData,
        nameInput,
        setNameInput,
        typesInput,
        setTypesInput,
        sortedData,
        setSortedData } }
    >
      { children }
    </planetsProvider.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
