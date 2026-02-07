export const getEndDate = (startDate: string, days: number) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + days);
  return end.toISOString();
};

export const getAbsenceTypeLabel = (absenceType: string) => {
  return absenceType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
