import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testando o componente "NotFound"', () => {
  test('Se o componente exibe a mensagem "Page requested not found"', () => {
    render(<NotFound />);
    const notFoundText = screen.getByText(/Page requested not found/);
    expect(notFoundText).toBeInTheDocument();
  });
  test('Se foi renderizada a imagem correta', () => {
    render(<NotFound />);
    const gif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', { name: /Pikachu/i });
    expect(image.src).toBe(gif);
  });
});
