import { render, screen } from '@testing-library/react';
import HomePage from '../routes/HomePage/HomePage';

test('renders learn react link', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
