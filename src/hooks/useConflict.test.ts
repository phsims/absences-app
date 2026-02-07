import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConflict } from './useConflict';

describe('useConflict', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useConflict());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.fetchConflict).toBe('function');
  });

  it('fetches conflict successfully with true', async () => {
    const mockData = { conflicts: true };

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockData,
    } as Response);

    const { result } = renderHook(() => useConflict());

    await act(async () => {
      await result.current.fetchConflict(123);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/conflict/123')
    );
  });

  it('fetches conflict successfully with false', async () => {
    const mockData = { conflicts: false };

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockData,
    } as Response);

    const { result } = renderHook(() => useConflict());

    await act(async () => {
      await result.current.fetchConflict(456);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles fetch error', async () => {
    const errorMessage = 'Failed to fetch conflict';

    vi.mocked(fetch).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useConflict());

    await act(async () => {
      await result.current.fetchConflict(123);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('sets loading state during fetch', async () => {
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ json: async () => ({ conflicts: false }) } as Response),
            100
          )
        )
    );

    const { result } = renderHook(() => useConflict());

    act(() => {
      result.current.fetchConflict(123);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(result.current.loading).toBe(false);
  });
});
