import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSimple from "../components/HeaderSimple";
import SideBarCouch from "../components/SideBarCounch";
import MaterialSofaCard from '../components/MaterialSofaCard';
import AddSofaModal from "../components/AddSofaModal";
import EditSofaModal from "../components/EditSofaModal";
import ConfirmationModal from "../components/ConfirmationModals";
import '../styles/counchPageStyle.css';
import AddSofaCard from "../components/AddSofaCard";
import { Box, Typography, Button } from '@mui/material';
import { api } from '../Provider/apiProvider';
import { ErrorAlert } from "../components/ErrorAlert";
import { SuccessAlert } from "../components/SuccessAlert"; // Import SuccessAlert

const CounchPage = () => {
  const [isAddSofaModalOpen, setAddSofaModalOpen] = useState(false);
  const [isEditSofaModalOpen, setEditSofaModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sofaToEdit, setSofaToEdit] = useState(null);
  const [sofaToDelete, setSofaToDelete] = useState(null);
  const [sofas, setSofas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para mensagens de sucesso

  // Verifica o token ao carregar a página
  useEffect(() => {
    checarToken();
  }, []);


  function checarToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }

  const navigate = useNavigate();
  // Função simplificada para carregar apenas os sofás
  const fetchSofas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/sofa');
      const sofasData = Array.isArray(response.data) ? response.data : [];

      // Mapeia os sofás sem buscar peças associadas
      setSofas(sofasData.map(sofa => ({
        ...sofa,
        pecas: [] // Array vazio para manter a estrutura
      })));

    } catch (error) {
      console.error('Erro ao buscar sofás:', error);
      setError('Erro ao carregar sofás. Tente recarregar a página.');
      setSofas([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os sofás quando o componente monta
  useEffect(() => {
    fetchSofas();
  }, []);

  const handleSaveSofa = (newSofa) => {
    // Adiciona o novo sofá localmente sem recarregar
    setSofas(prevSofas => [...prevSofas, {
      ...newSofa,
      pecas: [] // Inicializa sem peças
    }]);
    setAddSofaModalOpen(false);
  };

  const handleEditSofa = (sofa) => {
    setSofaToEdit(sofa);
    setEditSofaModalOpen(true);
  };

  const handleSaveEditedSofa = () => {
    fetchSofas(); // Atualiza a lista com dados do backend
    setEditSofaModalOpen(false);
  };

  const handleDeleteSofa = async (sofaId) => {
    try {
      await api.delete(`/sofa/${sofaId}`);
      // Remove o sofá localmente
      setSofas(prevSofas => prevSofas.filter(sofa => sofa.id !== sofaId));
      setSuccessMessage("Sofá excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir sofá:', error);
      setError('Erro ao excluir sofá. Tente novamente.');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const openDeleteModal = (sofa) => {
    setSofaToDelete(sofa);
    setDeleteModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
        <Typography variant="h6">Carregando sofás...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Remover ErrorAlert daqui */}
        <Typography variant="h6" color="error">{error}</Typography>
        <Button
          variant="contained"
          onClick={fetchSofas}
        >
          Tentar novamente
        </Button>
      </Box>
    );
  }

  return (
    <div className="Counch-Page">
      {/* Exibir ErrorAlert sempre que houver errorMessage */}
      <ErrorAlert
        errorMessage={errorMessage}
        onClose={() => setErrorMessage("")}
      />
      {/* Exibir SuccessAlert sempre que houver successMessage */}
      <SuccessAlert
        successMessage={successMessage}
        onClose={() => setSuccessMessage("")}
      />
      <SideBarCouch />
      <Box sx={{ width: "100%", height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <HeaderSimple
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
        />
        <Box sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 1,
          rowGap: "4%",
          padding: 1.4,
          overflowY: 'auto',
        }}>
          {sofas
            .filter(sofa => sofa && sofa.id)
            .map(sofa => (
              <MaterialSofaCard
                key={sofa.id}
                sofaId={sofa.id}
                name={sofa.modelo}
                image={`http://localhost:8080${sofa.caminhoImagem}`}
                pecas={sofa.pecas}
                onEdit={() => handleEditSofa(sofa)}
                onDelete={() => openDeleteModal(sofa)}
                isEditModalOpen={isEditSofaModalOpen}
                onSuccess={msg => setSuccessMessage(msg)}
                onError={msg => setErrorMessage(msg)}
              />
            ))}

          <AddSofaCard
            onClick={() => setAddSofaModalOpen(true)}
          />
        </Box>
      </Box>

      <AddSofaModal
        isOpen={isAddSofaModalOpen}
        onClose={() => setAddSofaModalOpen(false)}
        onSave={(sofa) => {
          handleSaveSofa(sofa);
          setSuccessMessage("Sofá adicionado com sucesso!");
        }}
        onError={(msg) => setErrorMessage(msg)}
      />

      <EditSofaModal
        isOpen={isEditSofaModalOpen}
        onClose={() => setEditSofaModalOpen(false)}
        onSave={() => {
          handleSaveEditedSofa();
          setSuccessMessage("Sofá editado com sucesso!");
        }}
        sofa={sofaToEdit}
        title={sofaToEdit?.modelo || ""}
        onError={(msg) => setErrorMessage(msg)}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        tituloModal="Excluir"
        title="Excluir Sofá"
        message={`Tem certeza que deseja excluir o sofá "${sofaToDelete?.modelo}"?`}
        textButtonDelete="Excluir"
        imagem="../../public/assets/trashCanPartsStorage.png"
        onConfirm={() => handleDeleteSofa(sofaToDelete?.id)}
      />

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        tituloModal="Sair"
        title="Tem certeza que deseja sair?"
        message="Você precisará fazer login novamente."
        textButtonDelete="Sair"
        imagem="public/assets/logoutImage.png"
        onConfirm={handleLogoutConfirm}
        onAfterSave={fetchSofas}
      />
    </div>
  );
};

export default CounchPage;