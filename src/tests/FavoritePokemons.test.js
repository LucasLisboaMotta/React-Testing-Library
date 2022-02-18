import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './test components/renderWitchRounter';
import App from '../App';

describe('Testando o component FavoritePokemons', () => {
  test('Caso o não tenha nenhum pokemon favoritado,'
  + ' Exibe a mensagem "No favorite pokemon found"',
  () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Se a os pokemons ficam salvos na aba de favoritos', () => {
    renderWithRouter(<App />);
    const details = 'More details';
    userEvent.click(screen.getByText('Fire'));
    userEvent.click(screen.getByRole('link', { name: details }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByText('Bug'));
    userEvent.click(screen.getByRole('link', { name: details }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByText('Dragon'));
    userEvent.click(screen.getByRole('link', { name: details }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const firstPokemon = screen.getByText('Charmander');
    const secondPokemon = screen.getByText('Caterpie');
    const thirdPokemon = screen.getByText('Dragonair');
    expect(firstPokemon && secondPokemon && thirdPokemon).toBeInTheDocument();
  });
});
