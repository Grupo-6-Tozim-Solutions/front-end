import React, { useState } from "react";
import { Box, Modal, Typography, Divider } from "@mui/material";
import SofaRowModal from "./SofaRowModal";
import SofaSummaryRowModal from "./SofaSummaryRowModal";
import TitleModal from "./TittleModal";
import CustomButton from "./CustomButton";
import LeftWrapper from "./LeftWrapper";
import RightContainer from "./RightContainer";
import pecas from "../data/DataMock"; // Importa o JSON do DataMock

const EditSofaModal = ({ isOpen, onClose, onSave, title }) => {
  const [leftItems, setLeftItems] = useState(pecas);
  const [rightItems, setRightItems] = useState([]);

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
          modalName={title}
          isEditable={true}
          onClose={onClose}
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
                  key={item.id}
                  text={item.nome}
                  quantidade={Number(item.quantidade)}
                  isEditMode={true}
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
              {/* Botão de salvar */}
              <CustomButton
                imageSrc="./assets/check.png"
                text="Salvar"
                buttonStyle={{
                  display: "flex",
                  alignItems: "center",
                  background: "#B8FFAA",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#16BC00",
                  fontWeight: "bold",
                  width: "100%",
                  justifyContent: "center",
                  height: "100%",
                  transition: "background 0.3s",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  outline: "none",
                  "&:hover": {
                    backgroundColor: "#A8FF88",
                  },
                }}
                imageStyle={{ width: "25px", height: "25px" }}
                onClick={onSave}
                enableHover={true}
              />
            </Box>
          </RightContainer>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditSofaModal;