import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './test components/renderWitchRounter';

const next = 'Próximo pokémon';
describe('Testando o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se página contém um heading "h2" com o texto "Encountered pokémons"',
    () => {
      const title = screen.getByRole('heading',
        { name: 'Encountered pokémons', level: 2 });
      expect(title).toBeInTheDocument();
    });
  test('Teste se é exibido o próximo Pokémon da lista'
    + ' quando o botão Próximo pokémon é clicado.', () => {
    const button = screen.getByText(next);
    const ALL_POKEMONS = 9;
    for (let i = 1; i < ALL_POKEMONS; i += 1) {
      userEvent.click(button);
    }
    const lastPokemon = screen.getByText('Dragonair');
    expect(lastPokemon).toBeInTheDocument();
    userEvent.click(button);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal',
      'Dragon'];
    types.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
      userEvent.click(screen.getByRole('button', { name: 'All' }));
    });
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    const firstFirePokemon = screen.getByText('Charmander');
    expect(firstFirePokemon).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: next }));
    const secondFirePokemon = screen.getByText('Rapidash');
    expect(secondFirePokemon).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: next }));
    const thirdFirePokemon = screen.getByText('Charmander');
    expect(thirdFirePokemon).toBeInTheDocument();
  });
});
