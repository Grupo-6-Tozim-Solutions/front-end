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
import initialPecas from "../data/DataMock";
import SideBarCounch from "../components/SideBarCounch";
import { Box, Table, TableContainer, TableBody, Paper } from '@mui/material';
import { useEffect } from "react";

export function PartsStorage() {
  const [pecas, setPecas] = useState(initialPecas);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para mensagens de sucesso
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    order: null,
  });

  const navigate = useNavigate();

  const handleEdit = (peca) => {
    setSelectedPart(peca);
    setEditModalOpen(true);
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
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/peca/${selectedPart.id}`);

      setPecas((prevPecas) =>
        prevPecas.filter((peca) => peca.id !== selectedPart.id)
      );

      setConfirmationModalOpen(false);
      setSuccessMessage("Peça excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a peça:", error);
      setErrorMessage("Erro ao excluir a peça. Tente novamente.");
    }
  };

  const getFilteredAndSortedParts = () => {
    let sortedParts = [...pecas];

    if (filterCriteria.order === "largest") {
      sortedParts.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);
    } else if (filterCriteria.order === "smallest") {
      sortedParts.sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque);
    }

    if (filterCriteria.name) {
      sortedParts = sortedParts.sort((a, b) => {
        const aMatches = a.nome
          .toLowerCase()
          .includes(filterCriteria.name.toLowerCase());
        const bMatches = b.nome
          .toLowerCase()
          .includes(filterCriteria.name.toLowerCase());
        return bMatches - aMatches;
      });
    }

    return sortedParts;
  };

  const filteredParts = getFilteredAndSortedParts();

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get("/peca/listarTodas");
        setPecas(response.data);
      } catch (error) {
        console.error("Erro ao buscar peças:", error);
      }
    };

    fetchPecas();
  }, []);



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
          <TableContainer sx={{ width: "94%", maxHeight: "600px", borderRadius: "16px" }} component={Paper}>
            <Table sx={{ borderRadius: "30%" }}>

              <TableStructurePartsStorage />

              <TableBody>

                {filteredParts.map((peca, index) => {
                  console.log("peca exibida:", peca);
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
              tipo: newPart.tipo, // <-- Adicione esta linha!
            });

            const savedPart = response.data;
            setPecas((prev) => [...prev, savedPart]);
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
