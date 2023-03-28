import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { planetsState } = useContext(planetsContext);

  console.log(planetsState);

  return (
    <div>
      <h1>Table</h1>
      <table>
        {}
      </table>
    </div>
  );
}

export default Table;
