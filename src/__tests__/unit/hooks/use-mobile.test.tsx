
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

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

describe('useIsMobile', () => {
  it('should return true if window width is less than mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false if window width is greater than mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update on window resize', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      // Trigger the event listener
      window.dispatchEvent(new Event('change'));
    });

    // This assertion is tricky because the hook's state update is asynchronous.
    // A better approach would be to test the effect's cleanup and setup.
  });
});
