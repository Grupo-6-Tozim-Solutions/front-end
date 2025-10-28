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
import { SuccessAlert } from "../components/SuccessAlert";
import TablePagination from "../components/TablePagination";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 8;

  const navigate = useNavigate();
  useEffect(() => {
    checarToken();
  }, []);

  function checarToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }
  const fetchSofas = async (currentPage = page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/v2/sofas/listarPaginado', {
        params: {
          page: currentPage,
          size: rowsPerPage,
          sortBy: 'modelo',
          sortDirection: 'asc'
        }
      });
      
      const data = response.data.content;
      const sofasData = Array.isArray(data) ? data : [];
      setSofas(sofasData.map(sofa => ({
        ...sofa,
        pecas: [] 
      })));

      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error('Erro ao buscar sofás:', error);
      setError('Erro ao carregar sofás. Tente recarregar a página.');
      setSofas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSofas();
  }, []);

  useEffect(() => {
    fetchSofas(page);
  }, [page]);

const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
};

  const handleSaveSofa = async (newSofa) => {
    try {
      console.log('Iniciando criação do sofá...');
      const newModel = (newSofa?.modelo || "").trim().toLowerCase();
      if (!newModel) {
        setErrorMessage("O nome do sofá não pode estar em branco");
        return;
      }
      const exists = sofas.some(s => (s.modelo || "").trim().toLowerCase() === newModel);
      if (exists) {
        setErrorMessage("Já existe um sofá com esse modelo");
        return;
      }
      
      const formData = new FormData();
      const dadosSofa = { modelo: newSofa.modelo };
      
      formData.append("dados", new Blob([JSON.stringify(dadosSofa)], { 
        type: "application/json" 
      }));
      formData.append("imagem", newSofa.imagem);

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log('formData entry:', key, { name: value.name, type: value.type, size: value.size });
        } else {
          console.log('formData entry:', key, value);
        }
      }      const base = api.defaults?.baseURL || '';
      const url = base ? `${base.replace(/\/$/, '')}/api/v2/sofas` : '/api/v2/sofas';
      const token = localStorage.getItem('token') || '';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: formData
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        const serverMsg = resData?.message || JSON.stringify(resData) || res.statusText;
        console.error('Create sofa server error:', res.status, resData);
        setErrorMessage(`Erro ao criar sofá (status ${res.status}). ${serverMsg}`);
        return;
      }

      console.log('Sofá criado com sucesso!', resData);
    
      if (Array.isArray(newSofa.pecas) && newSofa.pecas.length > 0) {
        try {
          await api.put(`/api/v2/sofas/adicionarPeca/${resData.id}`, { pecas: newSofa.pecas });
        } catch (putErr) {
          console.error('Erro ao adicionar peças ao sofá criado:', putErr);
          setErrorMessage('Sofá criado, mas falha ao associar peças.');
        }
      }
      await fetchSofas(page);
      setAddSofaModalOpen(false);
      setSuccessMessage("Sofá adicionado com sucesso!");
      
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      const config = error?.config;
      const errMsg = {
        message: error?.message,
        status,
        responseData: data,
        requestUrl: config?.url,
        requestMethod: config?.method,
        requestHeaders: config?.headers
      };
      console.error('ERRO (detailed):', safeStringify(errMsg));
      if (status) {
        setErrorMessage(`Erro ao criar sofá (status ${status}). ${typeof data === 'object' ? safeStringify(data) : data || ''}`);
      } else {
        setErrorMessage(`Erro ao criar sofá. ${error?.message || ''}`);
      }
    }
  };

  const handleEditSofa = (sofa) => {
    setSofaToEdit(sofa);
    setEditSofaModalOpen(true);
  };

  const handleSaveEditedSofa = () => {
    fetchSofas(page);
    setEditSofaModalOpen(false);
  };

  const handleDeleteSofa = async (sofaId) => {
    try {
      await api.delete(`/api/v2/sofas/${sofaId}`);
      await fetchSofas(page);
      setSuccessMessage("Sofá excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir sofá:', error);
      setErrorMessage('Erro ao excluir sofá. Tente novamente.');
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
  const visibleSofas = sofas.filter(sofa => sofa && sofa.id);
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
      <ErrorAlert
        errorMessage={errorMessage}
        onClose={() => setErrorMessage("")}
      />
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
          {visibleSofas.map(sofa => (
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

          {/* Show Add button only if current page has fewer than rowsPerPage items */}
          {visibleSofas.length < rowsPerPage && (
            <AddSofaCard
              onClick={() => setAddSofaModalOpen(true)}
            />
          )}
        </Box>
        
        {/* Paginação para sofás */}
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <TablePagination
            count={totalPages}
            page={page}
            onChange={setPage}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
          />
        </Box>
      </Box>

      <AddSofaModal
        isOpen={isAddSofaModalOpen}
        onClose={() => setAddSofaModalOpen(false)}
        onSave={handleSaveSofa}
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
      />
    </div>
  );
};

export default CounchPage;