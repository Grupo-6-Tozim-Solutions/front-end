import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStorage from "../components/HeaderStorage";
import TableStructurePartsStorage from "../components/TableStructurePartsStorage";
import { api } from '../Provider/apiProvider'
import TableRowPartsStorage from "../components/TableRowPartsStorage";
import AddPartModal from "../components/AddPartModal";
import { ErrorAlert } from "../components/ErrorAlert";
import { SuccessAlert } from "../components/SuccessAlert";
import FilterModal from "../components/FilterModal";
import EditPartModal from "../components/EditPartModal";
import ConfirmationModal from "../components/ConfirmationModals";
import "../styles/PartsStorageStyle.css";
import "../styles/TableBodyScroll.css";
import initialPecas from "../data/DataMock";
import SideBarCounch from "../components/SideBarCounch";
import { Box, Table, TableContainer, TableBody, Paper } from '@mui/material';
import { useEffect } from "react";
import TablePagination from "../components/TablePagination";

export function PartsStorage() {
  const [pecas, setPecas] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    order: null,
  });
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 8;

  const navigate = useNavigate();

  // Buscar peças com paginação do servidor
  const fetchPecas = async (currentPage = page, filter = filterCriteria.name) => {
    try {
      const response = await api.get("/api/v2/pecas/listarPaginado", {
        params: {
          page: currentPage,
          size: rowsPerPage,
          sortBy: 'nome',
          sortDirection: 'asc',
          filter: filter || ''
        }
      });
      
      setPecas(response.data.content);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar peças:", error);
      setErrorMessage("Erro ao carregar peças.");
    }
  };

  useEffect(() => {
    fetchPecas();
  }, []);

  useEffect(() => {
    fetchPecas(page);
  }, [page]);

  const handleEdit = (peca) => {
    setSelectedPart(peca);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedPart) => {
    try {
      const existingPart = pecas.find(p => p.id === updatedPart.id);

      if (updatedPart.nome !== existingPart.nome) {
        await api.put(`/api/v2/pecas/${updatedPart.id}`, {
          nome: updatedPart.nome,
          quantidadeMinima: existingPart.quantidadeMinima,
        });
      }

      const diff = updatedPart.quantidadeEstoque - existingPart.quantidadeEstoque;

      if (diff > 0) {
        await api.put(`/api/v2/pecas/adicionar-estoque/${updatedPart.id}/${diff}`);
      } else if (diff < 0) {
        await api.put(`/api/v2/pecas/remover-estoque/${updatedPart.id}/${Math.abs(diff)}`);
      }
      await fetchPecas(page);
      setEditModalOpen(false);
      setSuccessMessage("Peça editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar peça:", error);
      setErrorMessage("Erro ao editar peça.");
    }
  };

  const handleDelete = (peca) => {
    setSelectedPart(peca);
    setConfirmationModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login');
  };

  const handleApplyFilter = (filteredCriteria) => {
    setFilterCriteria(filteredCriteria);
    setFilterModalOpen(false);
    
    // Resetar para página 1 e buscar com filtro
    setPage(1);
    fetchPecas(1, filteredCriteria.name);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/v2/pecas/${selectedPart.id}`);
      await fetchPecas(page);
      setConfirmationModalOpen(false);
      setSuccessMessage("Peça excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a peça:", error);
      setErrorMessage("Erro ao excluir a peça. Tente novamente.");
    }
  };

  const getSortedParts = () => {
    let sortedParts = [...pecas];

    if (filterCriteria.order === "largest") {
      sortedParts.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);
    } else if (filterCriteria.order === "smallest") {
      sortedParts.sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque);
    }

    return sortedParts;
  };

  const sortedParts = getSortedParts();

  useEffect(() => {
    checarToken();
  }, []);

  function checarToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }

  return (
    <div className="parts-storage">
      <ErrorAlert
        errorMessage={errorMessage}
        onClose={() => setErrorMessage("")}
      />
      <SuccessAlert
        successMessage={successMessage}
        onClose={() => setSuccessMessage("")}
      />
      <SideBarCounch />
      <Box sx={{ width: "100%" }}>
        <HeaderStorage
          title="Gerenciamento de Peças"
          subtitle="Tozine Solutions"
          filterText={"Filtros"}
          addText="Adicionar"
          historyText="Ver histórico"
          logoutText="Sair"
          onFilter={() => setFilterModalOpen(true)}
          onAdd={() => setAddModalOpen(true)}
          onLogout={() => setLogoutModalOpen(true)} />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "40px" }}>
          <TableContainer sx={{ width: "94%", maxHeight: 530, borderRadius: "16px" }} component={Paper}>
            <Table sx={{ borderRadius: "30%" }}>

              <TableStructurePartsStorage />

              <TableBody>
                {sortedParts.map((peca, index) => {
                  const name = peca.nome;
                  const quantity = peca.quantidadeEstoque;
                  const warningLevel = quantity < peca.quantidadeMinima ? "critical" : null;
                  const status = warningLevel === "critical" ? "Estoque Baixo" : "Estoque OK";
                  const formattedId = String(peca.id).padStart(3, "0");

                  // Formatação conforme o tipo
                  let formattedQty;
                  if (peca.tipo === "PEÇA") {
                    formattedQty = String(Math.round(quantity ?? 0)).padStart(2, "0");
                  } else if (peca.tipo === "ESPUMA") {
                    formattedQty = `${(quantity ?? 0).toFixed(2)} m`;
                  } else if (peca.tipo === "TECIDO") {
                    formattedQty = `${(quantity ?? 0).toFixed(2)} kg`;
                  } else {
                    formattedQty = String(quantity ?? 0);
                  }

                  return (
                    <TableRowPartsStorage
                      key={peca.id}
                      id={formattedId}
                      name={name}
                      quantity={formattedQty}
                      status={status}
                      warningLevel={warningLevel}
                      index={index}
                      onEdit={() => handleEdit(peca)}
                      onDelete={() => handleDelete(peca)}
                    />
                  );
                })}
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

      {/* Modais */}
      <AddPartModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={async (newPart) => {
          try {
            const response = await api.post("/api/v2/pecas", {
              nome: newPart.nome,
              quantidadeEstoque: newPart.quantidadeEstoque,
              quantidadeMinima: newPart.quantidadeMinima,
              tipo: newPart.tipo,
            });

            // Recarregar os dados atualizados
            await fetchPecas(page);
            setAddModalOpen(false);
            setSuccessMessage("Peça adicionada com sucesso!");
          } catch (error) {
            console.error("Erro ao salvar a peça:", error.response?.data || error.message);
            setErrorMessage("Erro ao salvar a peça.");
          }
        }}
        onError={(msg) => setErrorMessage(msg)}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={() => setFilterModalOpen(false)}
        items={pecas}
        onFilter={handleApplyFilter}
      />

      <EditPartModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        partData={selectedPart}
        onSave={handleSaveEdit}
        onError={(msg) => setErrorMessage(msg)}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        modalName="Excluir peça"
        tituloModal="Excluir"
        title="Tem certeza que deseja excluir essa peça?"
        message="Ela será retirada de todos os sofás na qual está associada."
        textButtonDelete="Excluir"
        imagem="public/assets/trashCanImage.png"
        onConfirm={handleConfirmDelete}
      />

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        modalName="Sair"
        title="Tem certeza que deseja sair?"
        message="Você precisará fazer login novamente."
        textButtonDelete="Sair"
        imagem="public/assets/logoutImage.png"
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default PartsStorage;