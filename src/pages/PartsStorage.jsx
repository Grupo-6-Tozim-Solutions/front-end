import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import HeaderStorage from "../components/HeaderStorage";
import TableStructurePartsStorage from "../components/TableStructurePartsStorage";
import SideBar from "../components/SideBar";
import TableRowPartsStorage from "../components/TableRowPartsStorage";
import AddPartModal from "../components/AddPartModal";
import FilterModal from "../components/FilterModal";
import EditPartModal from "../components/EditPartModal";
import ConfirmationModal from "../components/ConfirmationModals";
import "../styles/PartsStorageStyle.css";
import initialPecas from "../data/DataMock"; // Importa os dados iniciais
import SideBarCounch from "../components/SideBarCounch";

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

  const handleSaveEdit = (updatedPart) => {
    // Atualiza a peça editada na lista
    setPecas((prevPecas) =>
      prevPecas.map((peca) => (peca.id === updatedPart.id ? updatedPart : peca))
    );
    setEditModalOpen(false); // Fecha o modal de edição
  };

  const handleDelete = (peca) => {
    setSelectedPart(peca);
    setConfirmationModalOpen(true);
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login'); // Redireciona para a página de login
  };

  const handleApplyFilter = (filteredCriteria) => {
    setFilterCriteria(filteredCriteria); // Atualiza os critérios de filtro
    setFilterModalOpen(false); // Fecha o modal de filtro
  };

  const handleConfirmDelete = () => {
    // Remove a peça selecionada
    setPecas((prevPecas) =>
      prevPecas.filter((peca) => peca.id !== selectedPart.id)
    );
    setConfirmationModalOpen(false); // Fecha o modal de confirmação
  };

  // Ordena e filtra os itens dinamicamente
  const getFilteredAndSortedParts = () => {
    let sortedParts = [...pecas];

    // Ordenar por maior ou menor número de peças
    if (filterCriteria.order === "largest") {
      sortedParts.sort((a, b) => b.quantidade - a.quantidade);
    } else if (filterCriteria.order === "smallest") {
      sortedParts.sort((a, b) => a.quantidade - b.quantidade);
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

  return (
    <div className="parts-storage">
          <SideBarCounch />
        <div className="main-container">
          <HeaderStorage
            title="Gerenciamento de Peças"
            subtitle="Tozine Solutions"
            filterText="Filtro"
            filterIcon="../../public/assets/filterIcon.png"
            filterWidth="10vw"
            filterBackgroundColor="#FFFAC9"
            filterTextColor="#FF8E0D"
            addText="Adicionar"
            addIcon="../../public/assets/addPartsStorage.png"
            addWidth="15vw"
            addBackgroundColor="rgba(201, 231, 255, 1)"
            addTextColor="rgba(7, 64, 218, 1)"
            historyText="Ver Histórico"
            historyIcon="../../public/assets/historyPartsStorage.png"
            historyWidth="16vw"
            historyBackgroundColor="rgba(201, 231, 255, 1)"
            historyTextColor="rgba(7, 64, 218, 1)"
            logoutText="Sair"
            logoutIcon="../../public/assets/logoutPartsStorage.png"
            logoutWidth="7.5vw"
            logoutBackgroundColor="rgba(255, 201, 201, 1)"
            logoutTextColor="rgba(255, 13, 13, 1)"
            buttonMarginLeft="2%"
            headerMarginBottom="5%" // Set bottom margin
            onFilter={() => setFilterModalOpen(true)}
            onAdd={() => setAddModalOpen(true)}
            onHistory={() => alert("Histórico")}
            onLogout={() => setLogoutModalOpen(true)} // Abre o modal de confirmação
          />
          <div className="table-container">
            <TableStructurePartsStorage />

            {filteredParts.map((peca, index) => {
              const name = peca.nome;
              const quantity = peca.quantidade;

              // Define o nível de alerta como "critical" se a quantidade for menor que o limite de estoque baixo
              const warningLevel =
                quantity < peca.lowStockThreshold ? "critical" : null;

              // Define o status como "Estoque Baixo" se o nível de alerta for "critical"
              const status =
                warningLevel === "critical" ? "Estoque Baixo" : "Estoque OK";

              const formattedId = String(peca.id).padStart(3, "0");
              const formattedQty = String(quantity).padStart(2, "0");

              return (
                <TableRowPartsStorage
                  key={peca.id}
                  id={formattedId}
                  name={name}
                  quantity={formattedQty}
                  status={status}
                  warningLevel={warningLevel} // Passa o nível de alerta para estilização
                  index={index}
                  onEdit={() => handleEdit(peca)}
                  onDelete={() => handleDelete(peca)}
                />
              );
            })}
          </div>
        </div>
   
      {/* Modais */}
      <AddPartModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newPart) => {
          // Calcula o próximo ID com base no maior ID existente
          const nextId = Math.max(...pecas.map((peca) => peca.id), 0) + 1;

          // Adiciona o ID ao objeto da nova peça
          const partWithId = { id: nextId, ...newPart };

          // Atualiza o estado com a nova peça
          setPecas((prevPecas) => [...prevPecas, partWithId]);
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
