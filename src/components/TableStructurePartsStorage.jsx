import { TableHead, TableRow, TableCell } from "@mui/material";
import "./TableStructurePartsStorageStyle.css";

const TableStructurePartsStorage = () => (
  <TableHead sx={{ backgroundColor: "var(--primary-color)" }}>
    <TableRow >
      <TableCell sx={{ color: "white" }} align="center">ID</TableCell>
      <TableCell sx={{ color: "white" }} align="center">Peça</TableCell>
      <TableCell sx={{ color: "white" }} align="center">Quantidade</TableCell>
      <TableCell sx={{ color: "white" }} align="center">Status</TableCell>
      <TableCell sx={{ color: "white" }} align="center">Ações</TableCell>
    </TableRow>
  </TableHead>
);

export default TableStructurePartsStorage;
