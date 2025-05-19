import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import HeaderStorage from "../components/HeaderStorage";
import TableStructurePartsStorage from "../components/TableStructurePartsStorage";
import { api } from '../Provider/apiProvider'
import TableRowPartsStorage from "../components/TableRowPartsStorage";
import AddPartModal from "../components/AddPartModal";
import FilterModal from "../components/FilterModal";
import EditPartModal from "../components/EditPartModal";
import ConfirmationModal from "../components/ConfirmationModals";
import "../styles/PartsStorageStyle.css";
import initialPecas from "../data/DataMock"; // Importa os dados iniciais
import SideBarCounch from "../components/SideBarCounch";
import { Box, Table, TableContainer, TableBody, Paper } from '@mui/material';
import { useEffect } from "react";

export function PartsStorage() {
  const [pecas, setPecas] = useState(initialPecas); // Estado para armazenar as peças
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    order: null,
  }); // Critérios de filtro

  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleEdit = (peca) => {
    setSelectedPart(peca); // Define a peça selecionada
    setEditModalOpen(true); // Abre o modal de edição
  };

  const handleSaveEdit = async (updatedPart) => {
    try {
      const existingPart = pecas.find(p => p.id === updatedPart.id);

      if (updatedPart.nome !== existingPart.nome) {
        await api.put(`/peca/${updatedPart.id}`, {
          nome: updatedPart.nome,
          quantidadeMinima: existingPart.quantidadeMinima,
        });
      }

      const diff = updatedPart.quantidadeEstoque - existingPart.quantidadeEstoque;

      if (diff > 0) {
        await api.put(`/peca/adicionarQuantidade/${updatedPart.id}/${diff}`);
      } else if (diff < 0) {
        await api.put(`/peca/removerQuantidade/${updatedPart.id}/${Math.abs(diff)}`);
      }

      const response = await api.get("/peca/listarTodas");

      setPecas(response.data);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar peça:", error);
      alert("Erro ao editar peça.");
    }
  };

  const handleDelete = (peca) => {
    setSelectedPart(peca);
    setConfirmationModalOpen(true);
  };


  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login'); // Redireciona para a página de login
  };

  const handleApplyFilter = (filteredCriteria) => {
    setFilterCriteria(filteredCriteria); // Atualiza os critérios de filtro
    setFilterModalOpen(false); // Fecha o modal de filtro
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/peca/${selectedPart.id}`);

      // Remove do estado local
      setPecas((prevPecas) =>
        prevPecas.filter((peca) => peca.id !== selectedPart.id)
      );

      setConfirmationModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao excluir a peça:", error);
      alert("Erro ao excluir a peça. Tente novamente.");
    }
  };

  // Ordena e filtra os itens dinamicamente
  const getFilteredAndSortedParts = () => {
    let sortedParts = [...pecas];

    // Ordenar por maior ou menor número de peças
    if (filterCriteria.order === "largest") {
      sortedParts.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);
    } else if (filterCriteria.order === "smallest") {
      sortedParts.sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque);
    }

    // Filtrar por nome (não oculta itens, mas prioriza os correspondentes)
    if (filterCriteria.name) {
      sortedParts = sortedParts.sort((a, b) => {
        const aMatches = a.nome
          .toLowerCase()
          .includes(filterCriteria.name.toLowerCase());
        const bMatches = b.nome
          .toLowerCase()
          .includes(filterCriteria.name.toLowerCase());
        return bMatches - aMatches; // Itens correspondentes aparecem primeiro
      });
    }

    return sortedParts;
  };

  const filteredParts = getFilteredAndSortedParts();

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get("/peca/listarTodas");
        setPecas(response.data); // Dados do backend
      } catch (error) {
        console.error("Erro ao buscar peças:", error);
      }
    };

    fetchPecas();
  }, []);


  return (
    <div className="parts-storage">
      <SideBarCounch />
      <Box sx={{ width: "100%" }}>
        <HeaderStorage
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
          filterText={ "Filtros"}
          addText="Adicionar"
          historyText="Ver histórico"
          logoutText="Sair"
          onFilter={() => setFilterModalOpen(true)}
          onAdd={() => setAddModalOpen(true)}
          onLogout={() => setLogoutModalOpen(true)} />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "40px" }}>
          <TableContainer sx={{ width: "94%", maxHeight: "600px", borderRadius: "16px" }} component={Paper}>
            <Table sx={{ borderRadius: "30%" }}>

              <TableStructurePartsStorage />

              <TableBody>
                {filteredParts.map((peca, index) => {
                  const name = peca.nome;
                  const quantity = peca.quantidadeEstoque;
                  const warningLevel = quantity < peca.quantidadeMinima ? "critical" : null;
                  const status = warningLevel === "critical" ? "Estoque Baixo" : "Estoque OK";
                  const formattedId = String(peca.id).padStart(3, "0");
                  const formattedQty = String(quantity ?? 0).padStart(2, "0");

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
        </Box>
      </Box>

      {/* Modais */}
      <AddPartModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={async (newPart) => {
          try {
            const response = await api.post("/peca", {
              nome: newPart.nome,
              quantidadeEstoque: newPart.quantidadeEstoque,
              quantidadeMinima: newPart.quantidadeMinima,
            });

            const savedPart = response.data;
            console.log("Nova peça:", newPart);

            // Adiciona a peça retornada do back (com id e campos corretos)
            setPecas((prev) => [...prev, savedPart]);
          } catch (error) {
            console.error("Erro ao salvar a peça:", error);
            alert("Erro ao salvar a peça. Verifique os dados.");
          }
        }}
      />


      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={() => setFilterModalOpen(false)}
        items={pecas} // Passa os itens originais para o modal
        onFilter={handleApplyFilter} // Lida com os critérios de filtro
      />

      <EditPartModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        partData={selectedPart}
        onSave={handleSaveEdit}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        modalName="Excluir peça"
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
        onConfirm={handleLogoutConfirm} // Redireciona para login ao confirmar
      />
    </div>
  );
}

export default PartsStorage;
