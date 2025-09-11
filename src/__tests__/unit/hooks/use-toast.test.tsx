import { render, screen, act, fireEvent } from '@/__tests__/setup/test-utils';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

describe('useToast', () => {
  it('should display a toast message', async () => {
    const TestComponent = () => {
      const { toast } = useToast();
      return <button onClick={() => toast({ title: 'Test Toast', description: 'This is a test.' })}>Show Toast</button>;
    };

    render(
      <>
        <TestComponent />
        <Toaster />
      </>
    );

    const showToastButton = screen.getByText('Show Toast');
    act(() => {
      fireEvent.click(showToastButton);
    });

    expect(await screen.findByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test.')).toBeInTheDocument();
  });
});