
import { render, screen } from '@/__tests__/setup/test-utils';
import Index from '@/pages/Index';

describe('Index Page', () => {
  it('should render the TypingTest component', () => {
    render(<Index />);
    expect(screen.getByText('LynTest')).toBeInTheDocument(); // Assuming TypingTest renders this text
  });
});
