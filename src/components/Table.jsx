import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { data, nameInput, typesInput, sortedData } = useContext(planetsContext);
  const tableHeader = data && Object.keys(data[0]);

  const filteredPlanets = data && data.filter(({ name }) => name.includes(nameInput));
  const filteredByTypes = !typesInput ? filteredPlanets : typesInput
    .reduce((acc, { type, number, comparison }) => {
      acc = acc.filter((planet) => {
        if (comparison === 'maior que') return (planet[type] > Number(number));
        if (comparison === 'menor que') return (planet[type] < Number(number));
        return (planet[type] === number);
      });
      return acc;
    }, [...filteredPlanets]);

  const unknownArray = [];
  const sortedPlanets = !sortedData ? filteredByTypes : filteredByTypes
    .reduce((acc, curr, index) => {
      const { order: { column, sort } } = sortedData;
      if (curr[column] === 'unknown') unknownArray.push(curr);
      if (curr[column] !== 'unknown') acc.push(curr);
      if (sort === 'ASC') {
        acc.sort((a, b) => Number(a[column]) - Number(b[column]));
      }
      if (sort === 'DESC') {
        acc.sort((a, b) => Number(b[column]) - Number(a[column]));
      }
      if (index === filteredByTypes.length - 1) acc.push(...unknownArray);
      return acc;
    }, []);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {data && tableHeader.map((header, i) => <th key={ i }>{header}</th>)}
          </tr>
          {filteredPlanets && sortedPlanets.map((planet, c) => (
            <tr key={ c }>
              {Object.values(planet).map((info, i) => (
                <td key={ i } data-testid={ i === 0 && 'planet-name' }>
                  {info}
                </td>))}
            </tr>))}
        </thead>
      </table>
    </div>
  );
}

export default Table;
