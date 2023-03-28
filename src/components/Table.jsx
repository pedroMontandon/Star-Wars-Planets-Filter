import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { data } = useContext(planetsContext);
  const tableHeader = data && Object.keys(data[0]);
  console.log(data);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {data && tableHeader.map((header, i) => <th key={ i }>{header}</th>)}
          </tr>
          {data && data.map((planet, c) => (
            <tr key={ c }>
              {Object.values(planet).map((info, i) => <th key={ i }>{info}</th>)}
            </tr>))}
        </thead>
      </table>
    </div>
  );
}

export default Table;
