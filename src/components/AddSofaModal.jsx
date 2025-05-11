import React, { useState, useRef } from "react";
import { Box, Modal, Typography, Button, Divider } from "@mui/material";
import SofaRowModal from "./SofaRowModal";
import SofaSummaryRowModal from "./SofaSummaryRowModal";
import TitleModal from "./TittleModal";
import CustomButton from "./CustomButton";
import LeftWrapper from "./LeftWrapper";
import RightContainer from "./RightContainer";
import pecas from "../data/DataMock"; // Importa o JSON do DataMock

const AddSofaModal = ({ isOpen, onClose, onSave }) => {
  const [leftItems, setLeftItems] = useState(pecas);
  const [rightItems, setRightItems] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [sofaName, setSofaName] = useState("Novo Sofá");

  const fileInputRef = useRef(null);

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
      setIsImageSelected(true);
    }
  };

  const handleFastForward = (item) => {
    setRightItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleDelete = (id) => {
    setRightItems((prev) => prev.filter((item) => item.id !== id));
  };

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
        {/* Título */}
        <TitleModal
          modalName={sofaName}
          isEditable={true}
          onClose={onClose}
          onNameChange={(newName) => setSofaName(newName)}
        />

        {/* Conteúdo */}
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
          {/* Lista esquerda */}
          <LeftWrapper>
            {leftItems.map((item, index) => (
              <SofaRowModal
                key={item.id}
                text={item.nome}
                quantity={item.quantidade || 0}
                onDecrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Math.max(Number(i.quantidade) - 1, 0) }
                        : i
                    )
                  )
                }
                onIncrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Number(i.quantidade) + 1 }
                        : i
                    )
                  )
                }
                onFastForward={() => handleFastForward(item)}
                isEven={index % 2 === 0}
              />
            ))}
          </LeftWrapper>

          {/* Resumo à direita */}
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
              Resumo
            </Typography>
            <Divider sx={{}}/>
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
                  key={item.id}
                  text={item.nome}
                  quantidade={Number(item.quantidade)}
                  isEditMode={false}
                  onDelete={() => handleDelete(item.id)}
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
              {/* Botão de adicionar foto */}
              <CustomButton
                imageSrc={isImageSelected ? "./assets/folderSave.png" : "./assets/folder.png"}
                text="Adicionar foto"
                buttonStyle={{
                  display: "flex",
                  alignItems: "center",
                  background: "#E0E0E0",
                  height: "35px",
                  borderRadius: "5px",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  color: "black",
                  width: "52%",
                  fontWeight: isImageSelected ? "600" : "normal",
                  "&:hover": {
                    backgroundColor: "#D6D6D6", // Proper hover color
                  },
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
                  outline: "none",
                  "&:hover": {
                    backgroundColor: "#A8FF88", // Proper hover color
                  },
                }}
                imageStyle={{ width: "25px", height: "25px" }}
                onClick={() => {
                  const newSofa = {
                    name: sofaName,
                    image: "../../public/assets/sofa-novo.png",
                  };
                  onSave(newSofa);
                }}
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
