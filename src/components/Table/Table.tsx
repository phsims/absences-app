import {
  Skeleton,
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { Order } from "./functions";

// * This is overkill for this app but a good example of a reusable table.  */
export type TableRowProps = {
  id: number;
} & Record<string, string | number | boolean>;

export type HeaderCellProps = {
  id: string | number;
  label: string;
  sortable?: boolean;
};

export type TableProps = {
  height?: number | string;
  width?: number | string;
  loading?: boolean;
  error?: string;
  headerRows: HeaderCellProps[];
  data?: TableRowProps[];
  order: Order;
  orderBy: string;
  selectRow: (id: number) => void;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableRowProps,
  ) => void;
};

export function Table({
  height = 200,
  width = "100%",
  loading = true,
  error,
  headerRows,
  data,
  order,
  orderBy,
  selectRow,
  onRequestSort,
}: TableProps) {

  const createSortHandler =
    (property: keyof TableRowProps) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

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
              {headerRows.map(({ id, label, sortable = true }) => (
                <TableCell
                  key={id}
                  sortDirection={orderBy === id ? order : false}
                >
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : "asc"}
                      onClick={createSortHandler(id as keyof TableRowProps)}
                    >
                      {label}
                      {orderBy === id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
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
              <TableRow
                key={row.id.toString()}
                data-testid={row.id}
                onClick={() => selectRow(row.id)}
                sx={{ ":hover": { backgroundColor: "info.light" } }}
              >
                {headerRows.map(({ id: headerId }) => (
                  <TableCell key={`${row.id}-${headerId}`}>
                    {String(row[headerId] ?? "")}
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

