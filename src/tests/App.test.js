import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockedFetch from './helpers/mockedFetch';
import { act } from 'react-dom/test-utils';

describe('Testa a aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockedFetch);
  });
  it('Testa o input de procura', async () => {
     await act(async () => {
      render(<App />);
      }); 

    const nameInput = await screen.findByTestId('name-filter');
    userEvent.type(nameInput, 'Tatoo');

    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(1);
  });
  it('Testa a filtragem por número', async () => {
    await act(async () => {
      render(<App />);
      });
    const typeInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')

    userEvent.selectOptions(typeInput, 'diameter')
    userEvent.selectOptions(comparisonInput, 'menor que')
    userEvent.type(numberInput, '10000')
    userEvent.click(filterButton)

    expect(screen.getAllByTestId('planet-name')).toHaveLength(3)

    userEvent.clear(numberInput)
    userEvent.selectOptions(typeInput, 'rotation_period')
    userEvent.selectOptions(comparisonInput, 'maior que')
    userEvent.type(numberInput, '20')
    userEvent.click(filterButton)

    expect(screen.getAllByTestId('planet-name')).toHaveLength(2)

    userEvent.clear(numberInput)
    userEvent.selectOptions(typeInput, 'surface_water')
    userEvent.selectOptions(comparisonInput, 'igual a')
    userEvent.type(numberInput, '8')
    userEvent.click(filterButton)

    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)

    const removeButton = screen.getByTestId('remove-button-diameter')
    userEvent.click(removeButton)
    
    const removeAllButton = screen.getByTestId('button-remove-filters')
    userEvent.click(removeAllButton)
  })
  it('Testa a ordenação dos elementos na tabela', async () => {
    await act(async () => {
      render(<App />);
      });

      const typeSort = screen.getByTestId('column-sort')
      const asc = screen.getByTestId('column-sort-input-asc')
      const desc = screen.getByTestId('column-sort-input-desc')
      const sortButton = screen.getByTestId('column-sort-button')

      userEvent.selectOptions(typeSort, 'population')
      userEvent.click(desc)
      userEvent.click(sortButton)
      userEvent.click(asc)
      userEvent.click(sortButton)

      const planetsList = screen.getAllByTestId('planet-name')
      expect(planetsList[1]).toHaveTextContent('Tatooine')
  })
})
