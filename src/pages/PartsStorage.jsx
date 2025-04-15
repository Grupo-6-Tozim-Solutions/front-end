import React, { useState } from "react";
import HeaderStorage from "../components/HeaderStorage";
import TableStructurePartsStorage from "../components/TableStructurePartsStorage";
import SideBar from "../components/SideBar";
import TableRowPartsStorage from "../components/TableRowPartsStorage";
import pecas from "../data/DataMock";
import AddPartModal from "../components/AddPartModal";
import FilterModal from "../components/FilterModal";
import EditPartModal from "../components/EditPartModal";
import ConfirmationModal from "../components/ConfirmationModals";
import "./PartsStorageStyle.css";

export function PartsStorage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const handleEdit = (peca) => {
    setSelectedPart(peca);
    setEditModalOpen(true);
  };

  const handleDelete = (peca) => {
    setSelectedPart(peca);
    setConfirmationModalOpen(true);
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleApplyFilter = () => {
    console.log("Filtro aplicado!");
    setFilterModalOpen(false);
  };

  const handleSave = (updatedPart) => {
    console.log("Peça salva:", updatedPart);
    setEditModalOpen(false);
    setAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Peça excluída:", selectedPart);
    setConfirmationModalOpen(false);
  };

  return (
    <div className="SideBarContainer">
      <SideBar />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Peças"
          subtitle="Tozine Solutions"
          onFilter={() => setFilterModalOpen(true)}
          onAdd={() => setAddModalOpen(true)}
          onHistory={() => alert("Histórico")}
          onLogout={handleLogout}
        />

        <div className="table-container">
          <TableStructurePartsStorage />

          {pecas.map((peca, index) => {
            const name = peca.nome;
            const quantity = peca.quantidade;

            let warningLevel = null;
            if (quantity < 6) warningLevel = "critical";
            else if (quantity < 15) warningLevel = "warning";

            const status =
              warningLevel === "critical"
                ? "Estoque próximo do fim!"
                : warningLevel === "warning"
                ? "Estoque baixo"
                : "Estoque OK";

            const formattedId = String(peca.id).padStart(3, "0");
            const formattedQty = String(quantity).padStart(2, "0");

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
        </div>
      </div>

      {/* Modais */}
      <AddPartModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSave}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleApplyFilter}
      />

      <EditPartModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        partData={selectedPart}
        onSave={handleSave}
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
        NameStyle={{
          fontSize: '15px',
          fontWeight: 'Bold',
          fotFamily: 'Inter',
          color: 'white',
          display: 'flex',
          marginLeft: '17vw',
          flex: '1',
        }}

      />

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        modalName="Sair"
        title="Tem certeza que deseja sair?"
        message="Você precisará fazer login novamente."
        textButtonDelete="Sair"
        imagem="public/assets/logoutImage.png"
        onConfirm={() => console.log("Usuário deslogado!")}
        NameStyle={{
          fontSize: '15px',
          fontWeight: 'Bold',
          fotFamily: 'Inter',
          color: 'white',
          display: 'flex',
          marginLeft: '20vw',
          flex: '1',
        }}
      />
    </div>
  );
}

export default PartsStorage;