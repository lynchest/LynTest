import { render, screen, fireEvent } from '@/__tests__/setup/test-utils';
import NotFound from '@/pages/NotFound';
import { useLocation } from 'react-router-dom';

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('NotFound Page', () => {
  const mockUseLocation = useLocation as jest.Mock;
  let originalLocation: Location;

  beforeAll(() => {
    originalLocation = window.location;
  });

  beforeEach(() => {
    const mockLocation = {
      pathname: '',
      assign: jest.fn(),
      // Add other properties of window.location that might be accessed
      // e.g., href, origin, protocol, host, hostname, port, search, hash
    };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: mockLocation,
    });
    mockUseLocation.mockReturnValue({ pathname: '/non-existent-route' });
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    jest.restoreAllMocks();
  });

  it('should render the 404 message and back to home button', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('should log an error to the console on mount', () => {
    render(<NotFound />);
    expect(console.error).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/non-existent-route'
    );
  });

  it('should navigate to home page on button click', () => {
    render(<NotFound />);
    const backButton = screen.getByText('Back to Home');
    fireEvent.click(backButton);
    expect(window.location.assign).toHaveBeenCalledWith('/');
  });
});
