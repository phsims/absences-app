

export type Absence = {
  id: number;
  absenceType: string; // e.g., "SICKNESS", "ANNUAL_LEAVE" if thse are fixed types, consider using an enum
  approved: boolean;
  days: number;
  employee: {
    firstName: string;
    lastName: string;
    id: string;
  };
  startDate: string; 
};
