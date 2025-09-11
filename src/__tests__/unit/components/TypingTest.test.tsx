
import { render, screen, fireEvent, act } from '@/__tests__/setup/test-utils';
import { TypingTest } from '@/components/TypingTest';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TypingTest', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the initial state correctly', () => {
    render(<TypingTest />);
    expect(screen.getByText('LynTest')).toBeInTheDocument();
    expect(screen.getByText('Start Test')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Click Start to begin typing...')).toBeInTheDocument();
  });

  it('should start the test on button click', () => {
    render(<TypingTest />);
    const startButton = screen.getByText('Start Test');
    fireEvent.click(startButton);

    expect(screen.queryByText('Start Test')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type the text above...')).toBeInTheDocument();
  });

  it('should handle user input', () => {
    render(<TypingTest />);
    fireEvent.click(screen.getByText('Start Test'));

    const input = screen.getByPlaceholderText('Type the text above...');
    fireEvent.change(input, { target: { value: 'hello ' } });

    // Check if the first word is marked as typed
    // This requires a more specific assertion based on the component's rendering logic
  });

  it('should stop the test when time runs out', () => {
    render(<TypingTest />);
    fireEvent.click(screen.getByText('Start Test'));

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText('Test Complete!')).toBeInTheDocument();
  });

  it('should restart the test', () => {
    render(<TypingTest />);
    fireEvent.click(screen.getByText('Start Test'));

    const input = screen.getByPlaceholderText('Type the text above...');
    fireEvent.change(input, { target: { value: 'some text ' } });

    const restartButton = screen.getByText('Restart');
    fireEvent.click(restartButton);

    expect(screen.getByPlaceholderText('Click Start to begin typing...')).toBeInTheDocument();
  });

  it('should change language', () => {
    render(<TypingTest />);
    const languageButton = screen.getByText('EN');
    fireEvent.click(languageButton);

    expect(screen.getByText('TR')).toBeInTheDocument();
  });
});
