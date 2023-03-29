import { useContext, useState } from 'react';
import planetContext from '../context/planetsContext';

function Form() {
  const [nameSearch, setNameSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('population');
  const [numberInput, setNumberInput] = useState(0);
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const { setNameInput, setTypesInput } = useContext(planetContext);

  const filterByName = ({ target: { value } }) => {
    setNameSearch(value);
    setNameInput(value);
  };

  return (
    <div>
      <h1>Form</h1>
      <input
        type="text"
        name="nameSearch"
        value={ nameSearch }
        onChange={ filterByName }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        value={ typeSearch }
        onChange={ (e) => setTypeSearch(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ comparisonInput }
        onChange={ (e) => setComparisonInput(e.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="numberInput"
        value={ numberInput }
        onChange={ (e) => setNumberInput(e.target.value) }
        data-testid="value-filter"
      />
      <button
        type="button"
        onClick={ () => setTypesInput({ type: typeSearch,
          comparison: comparisonInput,
          number: numberInput }) }
        data-testid="button-filter"
      >
        Filter by Number

      </button>
    </div>
  );
}

export default Form;
