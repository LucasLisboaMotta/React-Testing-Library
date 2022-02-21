import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './test components/renderWitchRounter';

const details = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
      const name = screen.getByTestId('pokemon-name');
      expect(name.innerHTML).toBe('Dragonair');
      const type = screen.getByTestId('pokemon-type');
      expect(type.innerHTML).toBe('Dragon');
      const weight = screen.getByTestId('pokemon-weight');
      expect(weight.innerHTML).toBe('Average weight: 16.5 kg');
      const src = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';
      const img = screen.getByRole('img', { name: 'Dragonair sprite' });
      expect(img.src).toBe(src);
    });
  test('Se o card do Pokémon contém um link de navegação para exibir os detalhes',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
      const link = screen.getByRole('link', { name: details });
      expect(link.href).toBe('http://localhost/pokemons/148');
    });
  test('Ao clicar no link de navegação, é feito o redirecionamento da aplicação.',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
      userEvent.click(screen.getByRole('link', { name: details }));
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/148');
    });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
    userEvent.click(screen.getByRole('link', { name: details }));
    userEvent.click(screen.getByRole('checkbox'));
    const starImage = screen.getByRole('img',
      { name: 'Dragonair is marked as favorite' });
    const srcStar = 'http://localhost/star-icon.svg';
    expect(starImage.src).toBe(srcStar);
  });
});
