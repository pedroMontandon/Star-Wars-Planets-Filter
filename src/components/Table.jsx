import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { data, nameInput, typesInput } = useContext(planetsContext);
  const tableHeader = data && Object.keys(data[0]);

  // const filteredPlanets = data && data.filter(({ name }) => name.includes(nameInput));
  const filteredPlanets = data && data.filter(({ name }) => name.includes(nameInput))
    .filter((planet) => {
      const { type, number, comparison } = typesInput;
      if (!typesInput) return planet;

      if (typesInput.comparison === 'maior que') return (planet[type] > Number(number));
      if (comparison === 'menor que') return (planet[type] < Number(number));
      return (planet[type] === number);
    });

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {data && tableHeader.map((header, i) => <th key={ i }>{header}</th>)}
          </tr>
          {filteredPlanets && filteredPlanets.map((planet, c) => (
            <tr key={ c }>
              {Object.values(planet).map((info, i) => <th key={ i }>{info}</th>)}
            </tr>))}
        </thead>
      </table>
    </div>
  );
}

export default Table;
