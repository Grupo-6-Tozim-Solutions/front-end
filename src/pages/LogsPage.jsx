import React, { useEffect, useState, useCallback } from "react";
import { Box, Table, TableContainer, TableBody, Paper } from "@mui/material";
import SideBarCounch from "../components/SideBarCounch";
import HeaderSimple from "../components/HeaderSimple";
import TableStructureLogs from "../components/TableStructureLogs";
import TableRowLogs from "../components/TableRowLogs";
import TablePagination from "../components/TablePagination";
import { useNavigate } from "react-router-dom";
import { api } from '../Provider/apiProvider';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 9;
  const fetchLogs = async (currentPage = page, currentFilters = filters) => {
    try {
      const response = await api.get("/api/v2/logs-movimentacao/listarPaginado", {
        params: {
          page: currentPage,
          size: rowsPerPage,
          sortBy: 'dataMovimentacao',
          sortDirection: 'desc',
          filter: currentFilters.item || '',
          tipoPeca: currentFilters.type || '',
          acao: currentFilters.action || ''
        }
      });
      
      const data = response.data.content;
      
      if (!Array.isArray(data)) {
        throw new Error("Resposta da API não é um array de logs.");
      }
      const transformedLogs = data.map((log, index) => {
        const dateObj = new Date(log.dataMovimentacao);
        const date = dateObj.toISOString().split("T")[0];
        const time = dateObj.toTimeString().split(":").slice(0, 2).join(":");

        let action = "Saída";
        let quantity = log.quantidadeSaida || 0;
        if (log.quantidadeEntrada && log.quantidadeEntrada > 0) {
          action = "Entrada";
          quantity = log.quantidadeEntrada;
        }

        return {
          id: log.id ? log.id.toString().padStart(3, "0") : `000-${index}`,
          date,
          time,
          action,
          quantity,
          type: (log.tipoPeca || "Peça").toUpperCase(),
          item: log.nomePeca || "Desconhecido",
          originalData: log
        };
      });

      setLogs(transformedLogs);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
      
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

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
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);
    setPage(1);
    fetchLogs(1, newFilters);
  };

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
          title="Histórico de ações na plataforma"
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
                {logs.map((log, index) => (
                  <TableRowLogs
                    key={log.id}
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
            count={totalPages}
            page={page}
            onChange={setPage}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LogsPage;