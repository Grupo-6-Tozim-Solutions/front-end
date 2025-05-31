import React, { useEffect, useState } from "react";
import { Box, Table, TableContainer, TableBody, Paper } from "@mui/material";
import SideBarCounch from "../components/SideBarCounch";
import HeaderSimple from "../components/HeaderSimple";
import TableStructureLogs from "../components/TableStructureLogs";
import TableRowLogs from "../components/TableRowLogs";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});

useEffect(() => {
  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8080/movimentacaoEstoque", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // ou outra forma de obter o token
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      const transformedLogs = data.map((log) => ({
        id: log.id,
        date: log.data.split("T")[0],
        time: log.data.split("T")[1].split(".")[0],
        action: log.quantidadeEntrada > 0 ? "Entrada" : "Saída",
        type: "Peça",
        item: log.peca.nome,
      }));

      setLogs(transformedLogs);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    }
  };

  fetchLogs();
}, []);

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
    <Box sx={{ Height: "100%", width: "100%", display: "flex", flexDirection: "row" }}>
      <SideBarCounch />
      <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <HeaderSimple
          subtitle="Tozine Solutions"
          title="Histórico de ações na plataforma dos últimos 60 dias"
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
