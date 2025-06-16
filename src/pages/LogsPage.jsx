// src/pages/LogsPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Box, Table, TableContainer, TableBody, Paper } from "@mui/material";
import SideBarCounch from "../components/SideBarCounch";
import HeaderSimple from "../components/HeaderSimple";
import TableStructureLogs from "../components/TableStructureLogs";
import TableRowLogs from "../components/TableRowLogs";
import TablePagination from "../components/TablePagination";
import { useNavigate } from "react-router-dom";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 9

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/movimentacoes", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Resposta da API não é um array de movimentações.");
        }

        // Mapear cada registro para o formato do front
        const transformedLogs = data.map((entry) => {
          const dateObj = new Date(entry.dataMovimentacao);
          const date = dateObj.toISOString().split("T")[0]; // “2025-05-30”
          const time = dateObj.toTimeString().split(":").slice(0, 2).join(":"); // “17:49”

          // Determinar ação e quantidade:
          // Se houver quantidadeEntrada > 0, então “Entrada” e quantity = quantidadeEntrada.
          // Caso contrário, “Saída” e quantity = quantidadeSaida.
          let action = "Saída";
          let quantity = entry.quantidadeSaida;
          if (entry.quantidadeEntrada && entry.quantidadeEntrada > 0) {
            action = "Entrada";
            quantity = entry.quantidadeEntrada;
          }

          return {
            id: entry.id.toString().padStart(3, "0"),
            date,
            time,
            action,
            quantity,
            type: (entry.tipoPeca || "Peça").toUpperCase(),
            item: entry.nomePeca || "Desconhecido",
          };
        });

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

    // Ordena o array localmente
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
      return log[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const navigate = useNavigate();

  const checarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checarToken();
  }, [checarToken]);

  return (
    <Box
      sx={{
        height: "100%",
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
            component={Paper}
            sx={{
              width: "94%",
              maxHeight: 534,
              borderRadius: "16px",
              marginTop: -2,
            }}
          >
            <Table sx={{ borderRadius: "30%" }}>
              {/* 
                Supondo que TableStructureLogs receba:
                onSort → função de ordenação
                onFilter → função de filtro
                columns → lista de colunas, incluindo “quantity” 
              */}
              <TableStructureLogs
                onSort={handleSort}
                onFilter={handleFilter}
                columns={[
                  { key: "date", label: "Data" },
                  { key: "time", label: "Hora" },
                  { key: "action", label: "Ação" },
                  { key: "quantity", label: "Quantidade" },
                  { key: "type", label: "Tipo" },
                  { key: "item", label: "Item" },
                ]}
              />
              <TableBody>
                {paginatedLogs.map((log, index) => (
                  <TableRowLogs
                    key={index}
                    date={log.date}
                    time={log.time}
                    action={log.action}
                    quantity={log.quantity}
                    type={log.type}
                    item={log.item}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={Math.ceil(filteredLogs.length / rowsPerPage)}
            page={page}
            onChange={setPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LogsPage;
