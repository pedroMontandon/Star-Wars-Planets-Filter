import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import rectifyingWords from '../helpers/rectifyingWords';
import sortByClick from '../helpers/sortByHeaderClick';

function Table() {
  const { data, nameInput, typesInput, sortedData,
    setSortedData } = useContext(planetsContext);
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
    <div className="bg-indigo-200/30 rounded-lg p-3 m-5">
      <table>
        <thead>
          <tr
            onClick={ ({ target: { id } }) => (
              setSortedData(sortByClick(sortedData, id))) }
          >
            {data && tableHeader.map((header, i) => (
              <th
                key={ i }
                id={ header }
                className="p-3 border-b-2
                border-b-indigo-300 hover:cursor-pointer"
              >
                {rectifyingWords(header)}
              </th>))}
          </tr>
          {filteredPlanets && sortedPlanets.map((planet, c) => (
            <tr key={ c } className="hover:bg-indigo-300/50">
              {Object.values(planet).map((info, i) => (
                <td
                  key={ i }
                  data-testid={ i === 0 && 'planet-name' }
                  className="p-3 text-center"
                >
                  {info}
                </td>))}
            </tr>))}
        </thead>
      </table>
    </div>
  );
}

export default Table;
