import "./TableRowPartsStorageStyle.css";
import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableRowPartsStorage = ({ id, name, quantity, status, warningLevel, index, onEdit, onDelete }) => {
  const isEven = index % 2 === 0;

  const rowClass = `table-row ${isEven ? "even" : "odd"}`;
  const statusClass = warningLevel === "critical" ? "critical" :
      warningLevel === "warning" ? "warning" : "";

  return (
    <TableRow className={`${rowClass} ${statusClass}`}>
      <TableCell align="center" className={`col-id ${statusClass}`}>{id}</TableCell>
      <TableCell align="center" className={`col-name ${statusClass}`}>{name}</TableCell>
      <TableCell align="center" className={`col-quantity ${statusClass}`}>{quantity}</TableCell>
      <TableCell align="center" className={`col-status ${statusClass}`}>{status}</TableCell>
      <TableCell align="center" className="col-actions">
        <IconButton onClick={onDelete} color="error" className="action-icon trashcan">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onEdit} color="primary" className="action-icon pencil">
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};


export default TableRowPartsStorage;




