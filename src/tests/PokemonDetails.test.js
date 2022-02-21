import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './test components/renderWitchRounter';

const details = 'More details';
describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
    userEvent.click(screen.getByRole('link', { name: details }));
  });
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const title = screen.getByRole('heading', { name: 'Dragonair Details', level: 2 });
      expect(title).toBeInTheDocument();
      const link = screen.queryByRole('link', { name: details });
      expect(link).not.toBeInTheDocument();
      const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(summary).toBeInTheDocument();
      const detail = /They say that if it emits an aura/;
      const paragraph = screen.getByText(detail);
      expect(paragraph).toBeInTheDocument();
    });
  test('Se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const location = screen.getByRole('heading',
        { name: 'Game Locations of Dragonair', level: 2 });
      expect(location).toBeInTheDocument();
      const firstMapName = screen.getByText('Johto Dragon\'s Den');
      const secondMapName = screen.getByText('Johto Route 45');
      expect(firstMapName && secondMapName).toBeInTheDocument();
      const images = screen.getAllByRole('img', { name: 'Dragonair location' });
      expect(images.length).toBe(2);
      const src = ['https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
        'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png'];
      expect(images[0].src).toBe(src[0]);
      expect(images[1].src).toBe(src[1]);
    });
  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const checkbox = screen.getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.disabled).toBe(false);
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      const pokemon = screen.getByText('Dragonair');
      expect(pokemon).toBeInTheDocument();
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
      userEvent.click(screen.getByRole('link', { name: details }));
      userEvent.click(screen.getByRole('checkbox'));
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      const unfavoriePokemon = screen.queryByText('Dragonair');
      expect(unfavoriePokemon).not.toBeInTheDocument();
    });
});
