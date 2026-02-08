import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as useAbsencesModule from './hooks/useAbsences';
import * as useConflictModule from './hooks/useConflict';

describe('App Component', () => {
  const mockAbsences = [
    {
      id: 1,
      absenceType: 'ANNUAL_LEAVE',
      approved: true,
      days: 5,
      employee: {
        firstName: 'John',
        lastName: 'Doe',
        id: 'emp1',
      },
      startDate: '2026-02-10T00:00:00.000Z',
    },
  ];

  const mockFetchAbsences = vi.fn();
  const mockFetchConflict = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useAbsencesModule, 'useAbsences').mockReturnValue({
      data: mockAbsences,
      loading: false,
      error: null,
      fetchAbsences: mockFetchAbsences,
    } as any);

    vi.spyOn(useConflictModule, 'useConflict').mockReturnValue({
      data: null,
      loading: false,
      error: null,
      fetchConflict: mockFetchConflict,
    } as any);
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Absences App');
  });

  it('calls fetchAbsences on mount', () => {
    render(<App />);
    expect(mockFetchAbsences).toHaveBeenCalledTimes(1);
  });

  it('renders the table with absences data', () => {
    render(<App />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders modal when closed initially', () => {
    render(<App />);
    expect(screen.queryByText(/Conflict found/)).not.toBeInTheDocument();
  });
});

