import { describe, it, expect } from 'vitest';
import { getEndDate, getAbsenceTypeLabel, formatLabelIfIsoDate } from './utils';

describe('utils', () => {
  describe('getEndDate', () => {
    it('calculates end date correctly with positive days', () => {
      const startDate = '2026-02-01T00:00:00.000Z';
      const result = getEndDate(startDate, 5);
      const expected = new Date('2026-02-06T00:00:00.000Z').toISOString();
      
      expect(result).toBe(expected);
    });

    it('handles month boundary correctly', () => {
      const startDate = '2026-01-28T13:12:13.562Z';
      const result = getEndDate(startDate, 5);
      const resultDate = new Date(result);
      
      expect(resultDate.getDate()).toBe(2);
      expect(resultDate.getMonth()).toBe(1); // February (0-indexed)
      expect(resultDate.getFullYear()).toBe(2026);
    });

    it('handles year boundary correctly', () => {
      const startDate = '2025-12-28T00:00:00.000Z';
      const result = getEndDate(startDate, 5);
      const resultDate = new Date(result);
      
      expect(resultDate.getDate()).toBe(2);
      expect(resultDate.getMonth()).toBe(0); // January
      expect(resultDate.getFullYear()).toBe(2026);
    });

    it('returns same date when days is 0', () => {
      const startDate = '2026-02-01T14:30:00.000Z';
      const result = getEndDate(startDate, 0);
      const resultDate = new Date(result);
      
      expect(resultDate.getDate()).toBe(1);
      expect(resultDate.getMonth()).toBe(1); // February
    });

    it('handles leap year correctly', () => {
      const startDate = '2024-02-27T10:00:00.000Z'; // 2024 is a leap year
      const result = getEndDate(startDate, 3);
      const resultDate = new Date(result);
      
      expect(resultDate.getDate()).toBe(1);
      expect(resultDate.getMonth()).toBe(2); // March
      expect(resultDate.getFullYear()).toBe(2024);
    });

    it('returns ISO format string like API', () => {
      const startDate = '2026-02-01T13:12:13.562Z';
      const result = getEndDate(startDate, 5);
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });

  describe('getAbsenceTypeLabel', () => {
    it('converts ANNUAL_LEAVE to Annual Leave', () => {
      const result = getAbsenceTypeLabel('ANNUAL_LEAVE');
      expect(result).toBe('Annual Leave');
    });

    it('converts SICKNESS to Sickness', () => {
      const result = getAbsenceTypeLabel('SICKNESS');
      expect(result).toBe('Sickness');
    });

    it('converts MATERNITY_LEAVE to Maternity Leave', () => {
      const result = getAbsenceTypeLabel('MATERNITY_LEAVE');
      expect(result).toBe('Maternity Leave');
    });

    it('converts UNPAID_LEAVE to Unpaid Leave', () => {
      const result = getAbsenceTypeLabel('UNPAID_LEAVE');
      expect(result).toBe('Unpaid Leave');
    });

    it('handles single word without underscore', () => {
      const result = getAbsenceTypeLabel('VACATION');
      expect(result).toBe('Vacation');
    });

    it('handles lowercase input', () => {
      const result = getAbsenceTypeLabel('annual_leave');
      expect(result).toBe('Annual Leave');
    });

    it('handles mixed case input', () => {
      const result = getAbsenceTypeLabel('Annual_Leave');
      expect(result).toBe('Annual Leave');
    });
  });

  describe('formatLabelIfIsoDate', () => {
    it('formats ISO date string to en-GB locale', () => {
      const result = formatLabelIfIsoDate('2026-02-08');
      expect(result).toBe('08/02/2026');
    });

    it('formats ISO date string with timestamp', () => {
      const result = formatLabelIfIsoDate('2026-02-08T10:30:00.000Z');
      expect(result).toBe('08/02/2026');
    });

    it('formats ISO date string with different year', () => {
      const result = formatLabelIfIsoDate('2020-03-31');
      expect(result).toBe('31/03/2020');
    });

    it('returns non-ISO string unchanged', () => {
      const result = formatLabelIfIsoDate('Start date');
      expect(result).toBe('Start date');
    });

    it('returns empty string unchanged', () => {
      const result = formatLabelIfIsoDate('');
      expect(result).toBe('');
    });

    it('handles date with partial timestamp format', () => {
      const result = formatLabelIfIsoDate('2021-10-19T06:48:24.8627');
      expect(result).toBe('19/10/2021');
    });
  });
});
