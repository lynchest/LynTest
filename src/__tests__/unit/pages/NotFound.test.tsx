import { render, screen, fireEvent } from '@/__tests__/setup/test-utils';
import NotFound from '@/pages/NotFound';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('NotFound Page', () => {
  const mockUseLocation = useLocation as jest.Mock;
  const mockUseNavigate = useNavigate as jest.Mock;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: '/non-existent-route' });
    navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
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
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
