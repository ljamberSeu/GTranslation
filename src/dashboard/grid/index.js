import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { getComparator, stableSort } from "./utils";
import EmptyGrid from "./components/empty-grid";
import LoadingGrid from "./components/loading-grid";
import EnhancedTableHead from "./components/grid-head";
import EnhancedTableToolbar from "./components/grid-toolbar";
import TranslationRow from "./components/grid-row";
import { TranslationContext } from "../../data";
import { TranslationStatus } from "./components/constants";
import APIStatus from "../components/api/api-status";

export default function EnhancedTable () {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("score");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { rows, setRows, showAll, setShowAll, query } = React.useContext(TranslationContext);

  React.useEffect(() => {
    setPage(0);
  }, [rows.length]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const rowsWithStatusFilter =
    React.useMemo(() => showAll ? rows : rows?.filter(r => r.status === TranslationStatus.UNKNOEN), [rows, showAll]);

  const visibleRows = React.useMemo(
    () =>
      stableSort(rowsWithStatusFilter, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rowsWithStatusFilter]
  );

  const isEmpty = React.useMemo(() => visibleRows.length <= 0, [visibleRows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsWithStatusFilter.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}/>
        <APIStatus />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, display: isEmpty ? "block" : undefined }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            { isEmpty && query?.IsAPIcallInProgress?.()
              ? <LoadingGrid />
              : isEmpty
                ? <EmptyGrid />
                : <TableBody>
                  {visibleRows.map((row, index) =>
                    <TranslationRow
                      row={row}
                      index={index}
                      selected={selected}
                      setSelected={setSelected}
                      setRows={setRows} />
                  )}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
            }
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <FormControlLabel
        control={<Switch checked={!showAll} onChange={(event) => setShowAll(!event.target.checked)} />}
        label={"Filter all pendings strings"}
      />
    </Box>
  );
}
