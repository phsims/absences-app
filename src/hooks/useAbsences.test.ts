import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAbsences } from './useAbsences';

describe('useAbsences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useAbsences());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.fetchAbsences).toBe('function');
  });

  it('fetches absences successfully', async () => {
    const mockData = [
      {
        id: 1,
        absenceType: 'ANNUAL_LEAVE',
        approved: true,
        days: 5,
        employee: {
          firstName: 'John',
          lastName: 'Doe',
          id: 'emp123',
        },
        startDate: '"2022-02-08T08:02:47.543Z"',
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockData,
    } as Response);

    const { result } = renderHook(() => useAbsences());

    await act(async () => {
      await result.current.fetchAbsences();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles fetch error', async () => {
    const errorMessage = 'Network error';
    
    vi.mocked(fetch).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useAbsences());
    
    await act(async () => {
      await result.current.fetchAbsences();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('sets loading state during fetch', async () => {
    vi.mocked(fetch).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ json: async () => [] } as Response), 100))
    );

    const { result } = renderHook(() => useAbsences());
    
    act(() => {
      result.current.fetchAbsences();
    });

    expect(result.current.loading).toBe(true);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.loading).toBe(false);
  });
});
