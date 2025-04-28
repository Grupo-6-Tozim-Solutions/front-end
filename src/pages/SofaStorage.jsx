import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStorage from "../components/HeaderStorage";
import ConfirmationModal from "../components/ConfirmationModals";

const SofaStorage = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="sofa-storage">
      <HeaderStorage
        title="Gerenciamento de Sofás"
        subtitle="Tozine Solutions"
        filterText="Adicionar Sofá"
        filterIcon="../../public/assets/addPartsStorage.png"
        filterWidth="10vw"
        filterBackgroundColor="#C9E7FF"
        filterTextColor="rgba(7, 64, 218, 1)"
        onFilter={() => alert("Adicionar Sofá")}
        addText="Produzir"
        addWidth="15vw"
        addBackgroundColor="rgba(201, 231, 255, 1)"
        addTextColor="rgba(7, 64, 218, 1)"
        onAdd={() => alert("Produzir Sofá")}
        historyText="Histórico de Sofás"
        historyIcon="../../public/assets/historyPartsStorage.png"
        historyWidth="18vw"
        historyBackgroundColor="rgba(201, 231, 255, 1)"
        historyTextColor="rgba(7, 64, 218, 1)"
        logoutText="Sair"
        logoutIcon="../../public/assets/logoutPartsStorage.png"
        logoutWidth="7vw"
        logoutBackgroundColor="rgba(255, 201, 201, 1)"
        logoutTextColor="rgba(255, 13, 13, 1)"
        buttonMarginLeft="20px"
        onHistory={() => alert("Histórico de Sofás")}
        onLogout={() => setLogoutModalOpen(true)}
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
};

export default SofaStorage;