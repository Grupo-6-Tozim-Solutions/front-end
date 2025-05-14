import React, { useState } from "react";
import { Height, Opacity } from "@mui/icons-material";
import SideBarCounch from "../components/SideBarCounch";
import { Box } from "@mui/material";
import HeaderStorage from "../components/HeaderStorage";
import TableStructureLogs from "../components/TableStructureLogs";
import TableRowLogs from "../components/TableRowLogs";
import { Table, TableContainer, TableBody, Paper } from "@mui/material";

const LogsPage = () => {
  const [logs, setLogs] = useState([
    {
      id: "001",
      date: "2025-02-14",
      time: "10:00",
      action: "Criar",
      type: "Sofá",
      item: "Sofá de 3 lugares",
    },
    {
        id: "002",
        date: "2025-05-14",
        time: "10:30",
        action: "Atualizar",
        type: "Mesa",
        item: "Mesa de jantar",
    },
    // Adicione mais objetos de log conforme necessário
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedLogs = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setLogs(sortedLogs);
  };

  const handleFilter = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
  };

  const filteredLogs = logs.filter((log) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return log[key].toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  return (
    <Box
      sx={{
        Height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SideBarCounch />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderStorage
          subtitle="Tozine Solutions"
          title="Histórico de ações na plataforma dos últimos 60 dias"
          filterText={"Filtros"}
          historyText="Ver histórico"
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <TableContainer
            sx={{
              width: "94%",
              maxHeight: "600px",
              borderRadius: "16px",
            }}
            component={Paper}
          >
            <Table sx={{ borderRadius: "30%" }}>
              <TableStructureLogs onSort={handleSort} onFilter={handleFilter} />
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <TableRowLogs
                    key={index}
                    date={log.date}
                    time={log.time}
                    action={log.action}
                    type={log.type}
                    item={log.item}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default LogsPage;