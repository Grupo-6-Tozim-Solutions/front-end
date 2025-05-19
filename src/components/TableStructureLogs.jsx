import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import React from "react";
import "./TableStructurePartsStorageStyle.css";

const TableStructureLogs = ({ onSort, sortConfig = { key: null, direction: "asc" } }) => {
  return (
    <TableHead sx={{ backgroundColor: "var(--primary-color)" }}>
      <TableRow>
        <TableCell sx={{ color: "white" }} align="center">
          <TableSortLabel
            active={sortConfig.key === "date"}
            direction={sortConfig.key === "date" ? sortConfig.direction : "asc"}
            onClick={() => onSort("date")}
          >
            Data
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          Horário
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          Ação
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          Tipo
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          Item
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableStructureLogs;
