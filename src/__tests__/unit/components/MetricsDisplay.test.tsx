import { render, screen } from '@/__tests__/setup/test-utils';
import { MetricsDisplay } from '@/components/MetricsDisplay';
import { translations } from '@/lib/languages';

describe('MetricsDisplay', () => {
  it('should display the metrics correctly in English', () => {
    const t = translations.en;
    render(<MetricsDisplay wpm={50} accuracy={95} timeLeft={30} isActive={true} language="en" />);

    expect(screen.getByText(t.timeLeft)).toBeInTheDocument();
    expect(screen.getByText('0:30')).toBeInTheDocument();

    expect(screen.getByText(t.wpm)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    expect(screen.getByText(t.accuracy)).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('should display the metrics correctly in Turkish', () => {
    const t = translations.tr;
    render(<MetricsDisplay wpm={50} accuracy={95} timeLeft={30} isActive={true} language="tr" />);

    expect(screen.getByText(t.timeLeft)).toBeInTheDocument();
    expect(screen.getByText(t.wpm)).toBeInTheDocument();
    expect(screen.getByText(t.accuracy)).toBeInTheDocument();
  });

  it('should format the time correctly', () => {
    render(<MetricsDisplay wpm={50} accuracy={95} timeLeft={90} isActive={true} language="en" />);

    expect(screen.getByText('1:30')).toBeInTheDocument();
  });

  it('should show success color for high accuracy', () => {
    render(<MetricsDisplay wpm={50} accuracy={98} timeLeft={30} isActive={true} language="en" />);
    const accuracyElement = screen.getByText('98%');
    expect(accuracyElement).toHaveClass('text-success');
  });

  it('should show warning color for medium accuracy', () => {
    render(<MetricsDisplay wpm={50} accuracy={92} timeLeft={30} isActive={true} language="en" />);
    const accuracyElement = screen.getByText('92%');
    expect(accuracyElement).toHaveClass('text-warning');
  });

  it('should show error color for low accuracy', () => {
    render(<MetricsDisplay wpm={50} accuracy={85} timeLeft={30} isActive={true} language="en" />);
    const accuracyElement = screen.getByText('85%');
    expect(accuracyElement).toHaveClass('text-error');
  });
});