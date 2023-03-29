import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { data, nameInput, typesInput } = useContext(planetsContext);
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

  return (
    <div>
      <div>
        {typesInput && typesInput
          .map((type, i) => <div key={ i }>{Object.values(type)}</div>)}
      </div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {data && tableHeader.map((header, i) => <th key={ i }>{header}</th>)}
          </tr>
          {filteredPlanets && filteredByTypes.map((planet, c) => (
            <tr key={ c }>
              {Object.values(planet).map((info, i) => <th key={ i }>{info}</th>)}
            </tr>))}
        </thead>
      </table>
    </div>
  );
}

export default Table;
