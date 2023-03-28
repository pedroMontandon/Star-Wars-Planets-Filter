import { useContext, useState } from 'react';
import planetContext from '../context/planetsContext';

function Form() {
  const [nameSearch, setNameSearch] = useState('');
  const { setNameInput } = useContext(planetContext);

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
    </div>
  );
}

export default Form;
