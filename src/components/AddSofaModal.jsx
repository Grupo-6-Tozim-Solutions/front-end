import React, { useState, useRef, useEffect } from "react";
import { Box, Modal, Typography, Divider } from "@mui/material";
import SofaRowModal from "./SofaRowModal";
import SofaSummaryRowModal from "./SofaSummaryRowModal";
import TitleModal from "./TittleModal";
import CustomButton from "./CustomButton";
import LeftWrapper from "./LeftWrapper";
import RightContainer from "./RightContainer";
import { api } from '../Provider/apiProvider';

const AddSofaModal = ({ isOpen, onClose, onSave }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [sofaName, setSofaName] = useState("Novo Sofá");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get("/peca/listarTodas");
        setLeftItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar peças:", error);
        alert("Erro ao carregar peças do estoque");
      }
    };

    if (isOpen) fetchPecas();
  }, [isOpen]);

  const handleFastForward = (peca) => {
  setRightItems(prev => {
    const exists = prev.some(item => item.peca.id === peca.id);
    if (!exists) {
      return [...prev, { peca, quantidade: 1 }]; // Quantidade inicial
    }
    return prev;
  });
};

  const handleUpdateQuantity = (pecaId, newQuantity) => {
    setRightItems(prev => 
      prev.map(item => 
        item.peca.id === pecaId ? { ...item, quantidade: newQuantity } : item
      )
    );
  };

  const handleDelete = (pecaId) => {
    setRightItems(prev => prev.filter(item => item.peca.id !== pecaId));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
      setIsImageSelected(true);
    }
  };

  const handleSave = async () => {
    try {
      // Cria o sofá
      const sofaResponse = await api.post('/sofa', {
        modelo: sofaName,
        descricao: "Descrição do novo sofá"
      });
      
      // Adiciona as peças com quantidades
      if (rightItems.length > 0) {
        const pecasPayload = rightItems.map(item => ({
          idPeca: item.peca.id,
          quantidade: item.quantidade
        }));
        
        await api.put(`/sofa/adicionarPeca/${sofaResponse.data.id}`, pecasPayload);
      }

      onSave(sofaResponse.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar sofá:", error.response?.data || error.message);
      alert("Erro ao salvar sofá. Verifique os dados e tente novamente.");
    }
  };

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
          onNameChange={(newName) => setSofaName(newName)}
        />

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
              Peças Do Estoque
            </Typography>
            {leftItems.map((item, index) => (
              <SofaRowModal
                key={item.id}
                text={item.nome}
                onFastForward={() => handleFastForward(item)}
                isEven={index % 2 === 0}
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
              Peças e quantidades utilizadas no Sofá
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
              {rightItems.map((item) => (
                <SofaSummaryRowModal
                  key={item.peca.id}
                  text={item.peca.nome}
                  quantidade={item.quantidade}
                  isEditMode={true}
                  onDelete={() => handleDelete(item.peca.id)}
                  onQuantityChange={(newQty) => 
                    handleUpdateQuantity(item.peca.id, newQty)
                  }
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
                text="Adicionar foto"
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
                onClick={handleFileChange}
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
                text="Salvar"
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
                }}
                imageStyle={{ width: "25px", height: "25px" }}
                onClick={handleSave}
                enableHover={true}
              />
            </Box>
          </RightContainer>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSofaModal;