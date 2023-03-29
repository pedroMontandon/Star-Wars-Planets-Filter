import { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetsContext';

function Form() {
  const [nameSearch, setNameSearch] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [typesArray, setTypesArray] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [typeSearch, setTypeSearch] = useState(typesArray[0]);
  const [hiddenTypes, setHiddenTypes] = ('');
  const { setNameInput, setTypesInput, typesInput } = useContext(planetContext);
  // const typesArray = ['population', 'orbital_period', 'diameter', 'rotation_period',
  //   'surface_water'];

  useEffect(() => {
    setTypeSearch(typesArray[0]);
  }, [setTypeSearch, typesArray]);

  const filterByName = ({ target: { value } }) => {
    setNameSearch(value);
    setNameInput(value);
  };

  const handleTypeFilter = () => {
    setTypesArray(typesArray.filter((type) => type !== typeSearch));
    // setTypeSearch(typesArray[0]);
    // setHiddenTypes(hiddenTypes ? [...hiddenTypes, typeSearch] : [typeSearch]);

    setTypesInput([...typesInput, { type: typeSearch,
      comparison: comparisonInput,
      number: numberInput }]);
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
        {typesArray.map((type) => <option key={ type } value={ type }>{type}</option>)}
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
        onClick={ handleTypeFilter }
        data-testid="button-filter"
      >
        Filter by Number
      </button>
    </div>
  );
}

export default Form;
