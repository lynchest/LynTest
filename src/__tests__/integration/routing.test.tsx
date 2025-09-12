import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '@/App';

// Mock child components to simplify testing App.tsx's routing
jest.mock('@/pages/Index', () => () => <div>Mock Index Page</div>);
jest.mock('@/pages/NotFound', () => () => <div>Mock Not Found Page</div>);

describe('App Routing', () => {
  it('should render the Index page for the / route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mock Index Page')).toBeInTheDocument();
  });

  it('should render the NotFound page for an unknown route', async () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mock Not Found Page')).toBeInTheDocument();
  });
});
