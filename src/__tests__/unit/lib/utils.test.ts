
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('should merge classes correctly', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('should handle conditional classes', () => {
    expect(cn('a', null, 'c')).toBe('a c');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-1 bg-red-500', 'p-3 bg-blue-500')).toBe('p-3 bg-blue-500');
  });
});
