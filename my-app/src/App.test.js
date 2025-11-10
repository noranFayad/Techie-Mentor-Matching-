import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mentor Speed Dating headline', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Mentor Speed Dating/i });
  expect(heading).toBeInTheDocument();
});
