import { useEffect, useMemo } from "react";
import "./App.css";
import { useAbsences } from "./hooks/useAbsences";
import { useConflict } from "./hooks/useConflict";
import { Container, Typography } from "@mui/material";
import { Table, type TableProps } from "./components/Table/Table";
import { getAbsenceTypeLabel, getEndDate } from "./utils/utils";

// static header for the table, could be dynamic if needed but not necessary for this app.
// would be moved to a constants file if this app were to grow.

// eslint-disable-next-line react-refresh/only-export-components
export const headerRows: TableProps["headerRows"] = [
  { id: "employeeName", label: "Employee name" },
  { id: "startDate", label: "Start date" },
  { id: "endDate", label: "End date" },
  { id: "approved", label: "Approved" },
    { id: "absenceType", label: "Absence type" },
];

function App() {
  const {
    data: absences = [],
    loading: loadingAbsences,
    error: errorAbsences,
    fetchAbsences,
  } = useAbsences();

  // const { data: conflict, fetchConflict } = useConflict();


  useEffect(() => {
    fetchAbsences();
    // fetchConflict(18);
  }, [fetchAbsences]);


console.log("Absences:", absences);


  // Map absences data to the format needed for the table.  */
  const mappedData = useMemo(() => {
    return absences?.map(
      ({ id, employee, startDate, approved, absenceType ,days}) => ({
        id: id.toString(),
        startDate: new Date(startDate).toLocaleDateString('en-GB'),
        endDate: new Date(getEndDate(startDate, days)).toLocaleDateString('en-GB'), // Not in Absence type
        employeeName: `${employee.firstName} ${employee.lastName}`,
        approved: approved ? "Yes" : "No",
        absenceType: getAbsenceTypeLabel(absenceType), // Convert to more user-friendly format
      }),
    );
  }, [absences]);


  // console.log("Absences:", absences);
  // console.log("Conflicts:", conflict);

  return (
    <Container>
      <Typography variant="h2">Absences App</Typography>
      <Table
        loading={loadingAbsences}
        error={errorAbsences ?? undefined}
        height={300}
        width="100%"
        headerRows={headerRows}
        data={mappedData ?? undefined}
      />
    </Container>
  );
}

export default App;
