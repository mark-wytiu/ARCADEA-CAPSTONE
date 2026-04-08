import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app shell with header', () => {
  render(<App />);
  expect(screen.getByText('Arcadea')).toBeInTheDocument();
});
