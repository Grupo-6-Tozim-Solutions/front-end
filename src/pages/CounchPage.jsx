import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSimple from "../components/HeaderSimple";
import SideBarCouch from "../components/SideBarCounch";
import SofaCard from "../components/SofaCard";
import AddSofaModal from "../components/AddSofaModal";
import EditSofaModal from "../components/EditSofaModal";
import ConfirmationModal from "../components/ConfirmationModals";
import '../styles/counchPageStyle.css';
import MaterialSofaCard from '../components/MaterialSofaCard';
import Card from '../components/card'; // Importa o componente Card
import { Box } from '@mui/material';
import AddSofaCard from "../components/AddSofaCard";

const CounchPage = () => {
  const [isAddSofaModalOpen, setAddSofaModalOpen] = useState(false);
  const [isEditSofaModalOpen, setEditSofaModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para o modal de exclusão
  const [sofaToEdit, setSofaToEdit] = useState(null);
  const [sofaToDelete, setSofaToDelete] = useState(null); // Estado para o sofá a ser excluído
  const [sofas, setSofas] = useState([
    { id: 1, name: "Sofá Tipo 1", image: "../../public/assets/sofa-novo.png", pecas: [] },
    { id: 2, name: "Sofá Tipo 2", image: "../../public/assets/sofa-novo.png", pecas: [] },
    { id: 3, name: "Sofá Tipo 3", image: "../../public/assets/sofa-novo.png", pecas: [] },
    { id: 4, name: "Sofá Tipo 4", image: "../../public/assets/sofa-novo.png", pecas: [] },
    { id: 5, name: "Sofá Tipo 5", image: "../../public/assets/sofa-novo.png", pecas: [] },
    { id: 6, name: "Sofá Tipo 6", image: "../../public/assets/sofa-novo.png", pecas: [] },
   
  
  ]);

  const navigate = useNavigate();

  const handleSaveSofa = (newSofa) => {
    const nextId = Math.max(...sofas.map((sofa) => sofa.id), 0) + 1;
    const sofaWithId = { id: nextId, ...newSofa };
    setSofas((prevSofas) => [...prevSofas, sofaWithId]);
    setAddSofaModalOpen(false);
  };

  const handleEditSofa = (sofa) => {
    setSofaToEdit(sofa);
    setEditSofaModalOpen(true);
  };

  const handleSaveEditedSofa = (editedSofa) => {
    setSofas((prevSofas) =>
      prevSofas.map((sofa) => (sofa.id === editedSofa.id ? editedSofa : sofa))
    );
    setEditSofaModalOpen(false);
  };

  const handleDeleteSofa = (sofaId) => {
    setSofas((prevSofas) => prevSofas.filter((sofa) => sofa.id !== sofaId)); // Remove o sofá
    setDeleteModalOpen(false); // Fecha o modal
  };

  const openDeleteModal = (sofa) => {
    setSofaToDelete(sofa); // Define o sofá a ser excluído
    setDeleteModalOpen(true); // Abre o modal de exclusão
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="Counch-Page">
      <SideBarCouch />
      <Box sx={{ width: "100%"}}> 
        <HeaderSimple
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
        />
        <Box sx={{ display: "grid", gridTemplateColumns: " repeat(4,1fr)", gap: 2 , rowGap: "6%", padding: 2 }}>
          
          {sofas.map((sofa) => (
            <MaterialSofaCard
              key={sofa.id}
              name={sofa.name}
              image={sofa.image}
              pecas={sofa.pecas}
              onEdit={() => handleEditSofa(sofa)}
              onDelete={() => openDeleteModal(sofa)} // Passa a função para abrir o modal de exclusão
            />
          ))}
          <AddSofaCard onClick={() => setAddSofaModalOpen(true)} />
        </Box>
      </Box>

      <AddSofaModal
        isOpen={isAddSofaModalOpen}
        onClose={() => setAddSofaModalOpen(false)}
        onSave={handleSaveSofa}
      />

      <EditSofaModal
        isOpen={isEditSofaModalOpen}
        onClose={() => setEditSofaModalOpen(false)}
        onSave={handleSaveEditedSofa}
        sofa={sofaToEdit}
        title={sofaToEdit?.name || ""} // Passa o nome do sofá como título
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} // Fecha o modal ao clicar fora
        title="Excluir Sofá"
        message={`Tem certeza que deseja excluir o sofá "${sofaToDelete?.name}"?`}
        textButtonDelete="Excluir"
        imagem="../../public/assets/trashCanPartsStorage.png"
        onConfirm={() => handleDeleteSofa(sofaToDelete?.id)} // Exclui o sofá ao confirmar
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

export default CounchPage;