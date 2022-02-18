import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Verificando a funcionalidade do componente "About"', () => {
  beforeEach(() => {
    render(<About />);
  });
  test('Se existe uma tag "h2" com o texto "About Pokédex"', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });
  test('Se existe dois paragrafros no componente "About"', () => {
    const firstPhrase = /This application simulates a Pokédex/;
    const firstParagraph = screen.getByText(firstPhrase);
    const secondPhrase = /One can filter Pokémons by type/;
    const secondParagraph = screen.getByText(secondPhrase);
    expect(firstParagraph && secondParagraph).toBeInTheDocument();
  });
  test('Verificando se existe uma imagem no componente "About"', () => {
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const searchImg = screen.getByRole('img');
    expect(searchImg.src).toBe(img);
  });
});
