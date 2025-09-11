
import { render, screen } from '@testing-library/react';
import App from '@/App';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByText('LynTest')).toBeInTheDocument(); // Assuming LynTest is always rendered
  });
});
