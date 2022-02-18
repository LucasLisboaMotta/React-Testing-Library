import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './test components/renderWitchRounter';
import App from '../App';

describe('', () => {
  test('Existe um link com o texto "Home" e direciona para o "/"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /home/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Existe um link com o texto "About" e direciona para o "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Existe um link com o texto "Favorite Pokémons" e direciona para o "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(aboutLink).toBeInTheDocument();
      userEvent.click(aboutLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('Deve ser redirecionado para uma rota "not found" caso a rota seja inexistente',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');
      const notFoundTitle = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(notFoundTitle).toBeInTheDocument();
    });
});
