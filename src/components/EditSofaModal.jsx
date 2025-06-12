import React, { useState, useEffect, useRef } from "react";
import { Box, Modal, Typography, Divider } from "@mui/material";
import SofaRowModal from "./SofaRowModal";
import SofaSummaryRowModal from "./SofaSummaryRowModal";
import TitleModal from "./TittleModal";
import CustomButton from "./CustomButton";
import LeftWrapper from "./LeftWrapper";
import RightContainer from "./RightContainer";
import { api } from '../Provider/apiProvider';

const EditSofaModal = ({ isOpen, onClose, onSave, sofa, title, onError }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sofaName, setSofaName] = useState(sofa?.modelo || '');

  useEffect(() => {
    if (sofa?.modelo) {
      setSofaName(sofa.modelo);
    } else {
      setSofaName('');
    }
  }, [sofa]);

  useEffect(() => {
    if (!isOpen || !sofa?.id) return;

    const loadPecas = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [estoqueResponse, sofaPecasResponse] = await Promise.all([
          api.get('/peca/listarTodas'),
          api.get(`/sofa/listarPecas/${sofa.id}`)
        ]);
        console.log("sofaPecasResponse.data", sofaPecasResponse.data);

        const pecasSofa = (sofaPecasResponse.data || [])
          .filter(item => item && item.id)
          .map(item => ({
            peca: {
              id: item.id,
              nome: item.nome,
              tipo: item.tipo
            },
            quantidade: item.quantidade || 0
          }));

        setRightItems(pecasSofa);

        const todasPecas = (estoqueResponse.data || [])
          .filter(item => item && item.id)
          .map(item => ({
            peca: {
              id: item.id,
              nome: item.nome,
              tipo: item.tipo
            },
            quantidadeEstoque: item.quantidadeEstoque || 0
          }));

        setRightItems(pecasSofa);
        setLeftItems(todasPecas);

      } catch (error) {
        setError('Erro ao carregar peças. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPecas();
  }, [isOpen, sofa?.id]);

  const normalizePeca = (peca) => ({
    peca: {
      id: peca.peca?.id || peca.id || peca.idPeca,
      nome: peca.peca?.nome || peca.nome,
      tipo: peca.peca?.tipo || peca.tipo
    },
    quantidade: peca.quantidade || 1
  });

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsImageSelected(true);
    }
  };

  const handleFastForward = (peca) => {
    const normalized = normalizePeca(peca);
    if (!normalized.peca.id) {
      console.error('Peça sem ID:', peca);
      return;
    }
    setRightItems(prev => {
      const exists = prev.some(item => String(item.peca.id) === String(normalized.peca.id));
      return exists ? prev : [...prev, normalized];
    });
  };

  const handleUpdateQuantity = async (pecaId, newQuantity) => {
    if (!sofa?.id || !pecaId) return;
    try {
      const payload = [{
        idPeca: pecaId,
        quantidade: newQuantity
      }];
      await api.put(`/sofa/adicionarPeca/${sofa.id}`, payload);
      setRightItems(prev =>
        prev.map(item =>
          String(item.peca.id) === String(pecaId) ? { ...item, quantidade: newQuantity } : item
        )
      );
    } catch (error) {
      onError?.("Erro ao atualizar quantidade.");
    }
  };

  const handleDelete = async (pecaId) => {
    if (!sofa?.id || !pecaId) return;
    try {
      const response = await api.delete(`/sofa/removerPeca/${sofa.id}/${pecaId}`);
      if (response.status === 200) {
        setRightItems(prev => prev.filter(item => String(item.peca.id) !== String(pecaId)));
      } else {
        onError?.("Erro ao remover peça. Status: " + response.status);
      }
    } catch (error) {
      onError?.(`Erro ao remover peça: ${error.response?.data?.message || error.message}`);
    }
  };

const handleSave = async () => {
  if (!sofa?.id) return;
  setIsLoading(true);
  try {
    const formData = new FormData();
    const dadosSofa = { modelo: sofaName };
    formData.append("sofa", JSON.stringify(dadosSofa));
    if (selectedImage) {
      formData.append("imagem", selectedImage);
    }
    await api.put(`/sofa/atualizar/${sofa.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const payload = rightItems.map(item => ({
      idPeca: item.peca.id,
      quantidade: item.quantidade
    }));
    await api.put(`/sofa/adicionarPeca/${sofa.id}`, payload);

    onSave();
    onClose();
  } catch (error) {
    onError?.('Erro ao salvar alterações.');
  } finally {
    setIsLoading(false);
  }
};

  const uniqueLeftItems = Array.from(
    new Map(leftItems.filter(item => item && item.peca && item.peca.id).map(item => [String(item.peca.id), item])).values()
  );
  const uniqueRightItems = Array.from(
    new Map(rightItems.filter(item => item && item.peca && item.peca.id).map(item => [String(item.peca.id), item])).values()
  );

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "10px",
          width: "70%",
          height: "72%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <TitleModal
          modalName={sofaName}
          isEditable={true}
          onClose={onClose}
          onNameChange={setSofaName}
        />

        {isLoading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Typography>Carregando peças...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography color="error">{error}</Typography>
            <CustomButton
              text="Tentar novamente"
              onClick={() => window.location.reload()}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "2%",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              padding: "20px",
            }}
          >
            <LeftWrapper>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "10px 16px 0 0",
                }}
              >
                Peças do estoque
              </Typography>
              {uniqueLeftItems.map((item, index) => (
                <SofaRowModal
                  key={`estoque-${item.peca.id}`}
                  text={item.peca.nome}
                  quantity={item.quantidadeEstoque || 0}
                  onFastForward={() => handleFastForward(item)}
                  isEven={index % 2 === 0}
                  isFastForwardDisabled={uniqueRightItems.some(ri => ri && ri.peca && String(ri.peca.id) === String(item.peca.id))}
                />
              ))}
            </LeftWrapper>

            <RightContainer>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "10px 16px 0 0",
                }}
              >
                Peças do sofá
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                {uniqueRightItems.map((item) => (
                  <SofaSummaryRowModal
                    key={`sofa-${item.peca.id}`}
                    text={item.peca.nome}
                    quantidade={item.quantidade}
                    tipo={item.peca.tipo}
                    pecaId={item.peca.id}
                    isEditMode={true}
                    onDelete={() => handleDelete(item.peca.id)}
                    onQuantityChange={(newQty) => handleUpdateQuantity(item.peca.id, newQty)}
                  />
                ))}
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  gap: "5%",
                  padding: "12px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomButton
                  imageSrc={isImageSelected ? "./assets/folderSave.png" : "./assets/folder.png"}
                  text="Editar foto"
                  buttonStyle={{
                    display: "flex",
                    alignItems: "center",
                    background: "#E0E0E0",
                    height: "35px",
                    borderRadius: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "black",
                    width: "52%",
                    fontWeight: isImageSelected ? "600" : "normal",
                    "&:hover": { backgroundColor: "#D6D6D6" },
                  }}
                  imageStyle={{ width: "25px", height: "25px" }}
                  onClick={handleAddPhotoClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <CustomButton
                  imageSrc="./assets/check.png"
                  text={isLoading ? "Salvando..." : "Salvar"}
                  buttonStyle={{
                    display: "flex",
                    alignItems: "center",
                    background: "#B8FFAA",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0px 16px",
                    cursor: "pointer",
                    color: "#16BC00",
                    fontWeight: "bold",
                    width: "38%",
                    justifyContent: "center",
                    height: "100%",
                    "&:hover": { backgroundColor: "#A8FF88" },
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  imageStyle={{ width: "25px", height: "25px" }}
                  onClick={handleSave}
                  enableHover={!isLoading}
                  disabled={isLoading}
                />
              </Box>
            </RightContainer>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default EditSofaModal;