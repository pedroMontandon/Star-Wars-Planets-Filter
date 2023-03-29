import { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetsContext';

function Form() {
  const { setNameInput, setTypesInput, typesInput,
    setSortedData } = useContext(planetContext);

  const [nameSearch, setNameSearch] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [typesArray, setTypesArray] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [typeSearch, setTypeSearch] = useState(typesArray[0]);
  const [sortConfig, setSortConfig] = useState({ order: {
    column: 'population', sort: 'ASC' } });
  const sortTypesArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

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
        value={ typeSearch }
        onChange={ (e) => setTypeSearch(e.target.value) }
        data-testid="column-filter"
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
      <div>
        {typesInput && typesInput
          .map((type, i) => (
            <div key={ i } data-testid="filter">
              <span>{Object.values(type)}</span>
              <button
                type="button"
                onClick={ removeFilter }
                name={ type.type }
                data-testid={ `remove-button-${type.type}` }
              >
                &#128465;
              </button>
            </div>))}
        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>
      </div>
      <div>
        <select
          name="typeSort"
          onChange={ (e) => setSortConfig(
            { order: { ...sortConfig.order, column: e.target.value } },
          ) }
          data-testid="column-sort"
        >
          {sortTypesArray
            .map((type) => <option key={ type } value={ type }>{type}</option>)}
        </select>
        <label htmlFor="asc">
          Ascendente
          <input
            type="radio"
            name="sortDirection"
            id="asc"
            value="ASC"
            onClick={ (e) => setSortConfig(
              { order: { ...sortConfig.order, sort: e.target.value } },
            ) }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="desc">
          Descendente
          <input
            type="radio"
            name="sortDirection"
            id="desc"
            value="DESC"
            onClick={ (e) => setSortConfig(
              { order: { ...sortConfig.order, sort: e.target.value } },
            ) }
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          onClick={ () => setSortedData(sortConfig) }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default Form;
