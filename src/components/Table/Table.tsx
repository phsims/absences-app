import {
  Skeleton,
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  TableHead,
  TableBody,
} from "@mui/material";

// * This is overkill for this app but a good example of a reusable table.  */
export type TableRowProps = Record<string, string | number | boolean>;

export type HeaderCellProps = {
  id: string;
  label: string;
};

export type TableProps = {
  height?: number | string;
  width?: number | string;
  loading?: boolean;
  error?: string;
  headerRows: HeaderCellProps[];
  data?: TableRowProps[];
};

export function Table({
  height = 200,
  width = "100%",
  loading = true,
  error,
  headerRows,
  data,
}: TableProps) {
  if (loading) {
    return (
      <Skeleton width={width} height={height} aria-label={`table loading`} />
    );
  }

  return (
    <TableContainer sx={{ width: width }}>
      <MuiTable aria-label="table">
        {headerRows && (
          <TableHead>
            <TableRow>
              {headerRows.map(({id, label}) => (
                <TableCell key={`header-${id}`}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={headerRows.length} align="center">
                {error}
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row) => (
              <TableRow key={row.id} data-testid={row.id}>
                {headerRows.map(({ id }) => (
                  <TableCell key={`${row.id}-${id}`}>
                    {String(row[id] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
