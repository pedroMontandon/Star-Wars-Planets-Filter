import { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetsContext';
import rectifyingWords from '../helpers/rectifyingWords';
import translate from '../helpers/translateIntoEnglish';

function Form() {
  const { setNameInput, setTypesInput, typesInput } = useContext(planetContext);

  const [nameSearch, setNameSearch] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [typesArray, setTypesArray] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [typeSearch, setTypeSearch] = useState(typesArray[0]);

  useEffect(() => {
    setTypeSearch(typesArray[0]);
  }, [setTypeSearch, typesArray]);

  const filterByName = ({ target: { value } }) => {
    setNameSearch(value);
    setNameInput(value);
  };

  const handleTypeFilter = () => {
    setTypesArray(typesArray.filter((type) => type !== typeSearch));

    setTypesInput([...typesInput, { type: typeSearch,
      comparison: comparisonInput,
      number: numberInput }]);
  };

  const removeFilter = ({ target: { name } }) => {
    setTypesInput(typesInput.filter(({ type }) => type !== name));
    setTypesArray([...typesArray, name]);
  };

  const removeAllFilters = () => {
    setTypesInput('');
    setTypesArray(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          type="text"
          name="nameSearch"
          placeholder="Search by planet name"
          value={ nameSearch }
          onChange={ filterByName }
          data-testid="name-filter"
          className=" bg-indigo-300 p-1 m-1 rounded-md"
        />
        <select
          value={ typeSearch }
          onChange={ (e) => setTypeSearch(e.target.value) }
          data-testid="column-filter"
          className=" bg-indigo-300 p-1 m-1 rounded-md"
        >
          {typesArray.map((type) => (
            <option key={ type } value={ type }>{rectifyingWords(type)}</option>))}
        </select>
        <select
          value={ comparisonInput }
          onChange={ (e) => setComparisonInput(e.target.value) }
          data-testid="comparison-filter"
          className=" bg-indigo-300 p-1 m-1 rounded-md"
        >
          <option value="maior que">Greater than</option>
          <option value="menor que">Less than</option>
          <option value="igual a">Equal to</option>
        </select>
        <input
          type="number"
          name="numberInput"
          value={ numberInput }
          onChange={ (e) => setNumberInput(e.target.value) }
          data-testid="value-filter"
          className=" bg-indigo-300 p-1 m-1 rounded-md"
        />
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={ handleTypeFilter }
          data-testid="button-filter"
          className="bg-yellow-300 px-2 py-1 rounded-md m-2 font-bold hover:bg-yellow-600"
        >
          Add Filter
        </button>
        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
          className="bg-yellow-300 px-2 py-1 rounded-md m-2 font-bold hover:bg-yellow-600"
        >
          Remove Filters
        </button>
      </div>
      <div className="flex flex-row">
        {typesInput && typesInput
          .map((type, i) => (
            <div
              key={ i }
              data-testid="filter"
              className="m-1 p-1 bg-indigo-900/90 rounded-md"
            >
              <span className="mx-1 font-semibold">
                {`${rectifyingWords(Object
                  .values(type)[0])} ${translate(Object
                  .values(type)[1])} ${Object.values(type)[2]}`}
              </span>
              <button
                type="button"
                onClick={ removeFilter }
                name={ type.type }
                data-testid={ `remove-button-${type.type}` }
              >
                &#128465;
              </button>
            </div>))}
      </div>
    </div>
  );
}

export default Form;
