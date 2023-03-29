import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockedFetch from './helpers/mockedFetch';

describe('Testa a aplicação', () => {
  test('Testa o input de procura', async () => {
    render(<App />);
    global.fetch = jest.fn(mockedFetch);

    waitFor(() => screen.getByText(/gravity/i));
    // waitFor(screen.getByTestId('name-filter'))

    const nameInput = await screen.findByTestId('name-filter');
    userEvent.type(nameInput, 'Tatoo');

    screen.logTestingPlaygroundURL()

    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(1);

  });
})
