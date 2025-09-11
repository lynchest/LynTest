import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '@/App';

// Mock child components to simplify testing App.tsx's routing
jest.mock('@/pages/Index', () => () => <div>Mock Index Page</div>);
jest.mock('@/pages/NotFound', () => () => <div>Mock Not Found Page</div>);

describe('App Routing', () => {
  it('should render the Index page for the / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Index Page')).toBeInTheDocument();
  });

  it('should render the NotFound page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Not Found Page')).toBeInTheDocument();
  });
});