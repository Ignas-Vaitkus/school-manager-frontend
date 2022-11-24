import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const CustomTable = ({ columns, rows, component }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState({ title: undefined, text: undefined });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(component);

  return (
    <div className="CustomTable">
      <Paper sx={{ overflow: "hidden", m: 1 }}>
        <TableContainer sx={{ maxHeight: 1500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                <TableCell key={"Actions"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      {auth.getRole() == "1" && component == "schools" ? (
                        <TableCell key={"Actions"}>
                          <Button onClick>Edit</Button>
                          <Button
                            id={row.id}
                            color="error"
                            // onClick={deleteHandler}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell key={"Actions"}>
                          <Button onClick>Assign</Button>
                        </TableCell>
                      )}
                      {component == "requests" && auth.getRole() == "1" ? (
                        <TableCell key={"Actions"}>
                          <Button
                            onClick={(e) => navigate(`request/${row.code}`)}
                          >
                            Approve
                          </Button>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CustomTable;
