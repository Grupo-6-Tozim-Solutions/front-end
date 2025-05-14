import "./TableRowPartsStorageStyle.css";
import { TableRow, TableCell } from "@mui/material";

const TableRowLogs = ({ date, time, action, type, item, index }) => {
  const isEven = index % 2 === 0;

  const rowClass = `table-row ${isEven ? "even" : "odd"}`;

  return (
    <TableRow className={rowClass}>
      <TableCell align="center" className="col-date">{date}</TableCell>
      <TableCell align="center" className="col-time">{time}</TableCell>
      <TableCell align="center" className="col-action">{action}</TableCell>
      <TableCell align="center" className="col-type">{type}</TableCell>
      <TableCell align="center" className="col-item">{item}</TableCell>
    </TableRow>
  );
};

export default TableRowLogs;
