
import { render, screen, within } from '@/__tests__/setup/test-utils';
import { TypingHistory } from '@/components/TypingHistory';
import { translations } from '@/lib/languages';

const mockHistory = [
  { wpm: 50, accuracy: 95, duration: 60, timestamp: new Date('2023-10-26T10:00:00Z') },
  { wpm: 60, accuracy: 98, duration: 60, timestamp: new Date('2023-10-26T11:00:00Z') },
  { wpm: 55, accuracy: 97, duration: 30, timestamp: new Date('2023-10-26T12:00:00Z') },
];

describe('TypingHistory', () => {
  it('should display "No tests yet" when history is empty', () => {
    const t = translations.en;
    render(<TypingHistory history={[]} language="en" />);
    expect(screen.getByText(t.noTestsYet)).toBeInTheDocument();
  });

  it('should calculate and display best and average WPM', () => {
    const t = translations.en;
    render(<TypingHistory history={mockHistory} language="en" />);
    expect(screen.getByText(t.bestWpm)).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument(); 
    expect(screen.getByText(t.avgWpm)).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument(); 
  });

  it('should render a list of recent tests', () => {
    render(<TypingHistory history={mockHistory} language="en" />);
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(mockHistory.length);
  });

  it('should display correct data for each test', () => {
    render(<TypingHistory history={mockHistory} language="en" />);
    
    const firstTest = screen.getByText('50 WPM').closest('div.p-3');
    if (!(firstTest instanceof HTMLElement)) throw new Error('firstTest not found');
    expect(within(firstTest).getByText('95% accuracy')).toBeInTheDocument();
    expect(within(firstTest).getByText('60s')).toBeInTheDocument();

    const secondTest = screen.getByText('60 WPM').closest('div.p-3');
    if (!(secondTest instanceof HTMLElement)) throw new Error('secondTest not found');
    expect(within(secondTest).getByText('98% accuracy')).toBeInTheDocument();
    expect(within(secondTest).getByText('60s')).toBeInTheDocument();

    const thirdTest = screen.getByText('55 WPM').closest('div.p-3');
    if (!(thirdTest instanceof HTMLElement)) throw new Error('thirdTest not found');
    expect(within(thirdTest).getByText('97% accuracy')).toBeInTheDocument();
    expect(within(thirdTest).getByText('30s')).toBeInTheDocument();
  });
});
