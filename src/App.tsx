import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useAbsences } from "./hooks/useAbsences";
import { useConflict } from "./hooks/useConflict";
import { Box, Container, Modal, Skeleton, Typography } from "@mui/material";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function App() {
  const {
    data: absences = [],
    loading: loadingAbsences,
    error: errorAbsences,
    fetchAbsences,
  } = useAbsences();

  const {
    data: conflict,
    loading: loadingConflict,
    fetchConflict,
  } = useConflict();

  useEffect(() => {
    fetchAbsences();
  }, []);

  // Modal state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Map absences data to the format needed for the table.  */
  const mappedData = useMemo(() => {
    return absences?.map(
      ({ id, employee, startDate, approved, absenceType, days }) => ({
        id,
        startDate: new Date(startDate).toLocaleDateString("en-GB"),
        endDate: new Date(getEndDate(startDate, days)).toLocaleDateString(
          "en-GB",
        ),
        employeeName: `${employee.firstName} ${employee.lastName}`,
        approved: approved ? "Yes" : "No",
        absenceType: getAbsenceTypeLabel(absenceType), // Convert to more user-friendly format
      }),
    );
  }, [absences]);

  // Derive selected data from state (no setState needed)
  const selectedAbsence = selectedId
    ? absences?.find((absence) => absence.id === selectedId)
    : null;


  const handleOpen = (id: number) => {
    setSelectedId(id);
    fetchConflict(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <Container>
        <Typography variant="h2">Absences App</Typography>
        <Table
          loading={loadingAbsences}
          error={errorAbsences ?? undefined}
          height={300}
          width="100%"
          headerRows={headerRows}
          data={mappedData ?? undefined}
          selectRow={(id) => handleOpen(id)}
        />
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loadingConflict ? (
            <Skeleton width="100%" height={100} aria-label="conflict loading" data-testid="conflict-loading" />
          ) : conflict?.conflicts ? (
            <Typography variant="body1">
              Conflict found for {selectedAbsence?.employee.firstName}{" "}
              {selectedAbsence?.employee.lastName}'s absence starting on{" "}
              {new Date(selectedAbsence?.startDate ?? "").toLocaleDateString(
                "en-GB",
              )}
              .
            </Typography>
          ) : (
            <Typography variant="body1">
              No conflicts found for this absence.
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default App;
